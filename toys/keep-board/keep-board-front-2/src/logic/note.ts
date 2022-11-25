import {groupBy, makeClickableLinks, prettifyLinks} from "./utils";
import {formatDateRange, getWeekDays} from "./date.js";
import {ApiCli} from "./api-cli";
import dayjs from "dayjs";
import type {Mode} from "@/logic/mode";
import type {User} from "@/logic/auth";
import type {NotePointForm} from "@/logic/points";
import {wrapB} from "@/logic/html-utils";


export type RawNote = {
    id: string,
    created: string,
    title: string,
    text: string,
    labels: string[],
    url: string,
    image: string | null,
};

export class Note {
    id: string;
    created: string;
    title: string;
    text: string;
    labels: string[];
    url: string;
    image: string | null;

    constructor(rawNote: RawNote) {
        this.id = rawNote.id;
        this.created = rawNote.created;
        this.title = rawNote.title;
        this.text = rawNote.text;
        this.labels = rawNote.labels;
        this.url = rawNote.url;
        this.image = rawNote.image;
    }

    static loadFromCache = (type: Mode, reset?: boolean) => NoteCache.load(type, reset);

    static loadFromBack = async (type: Mode) => {
        const notes = await new ApiCli().listNotes(type);
        NoteCache.save(notes, type);
        return notes;
    };

    /**
     * @param {User} user
     * @param {NotePointForm} pointsForm
     * @returns {Promise<void>}
     */
    async save(user: User, pointsForm: NotePointForm) {
        this.text = pointsForm.toText();
        await new ApiCli().updateNote(this.id, this.text, user.token);
    }

    /**
     *
     * @param {'daily', 'weekly'} noteType
     * @param {User} user
     * @param {NotePointForm} pointsForm
     * @return {Promise<Note>}
     */
    static create = async (noteType: Mode, user: User, pointsForm: NotePointForm) =>
        await new ApiCli().createNote(noteType, pointsForm.toText(), user.token);

    get formattedText() {
        return prettifyLinks(makeClickableLinks(this.text));
    }
}


export class NoteCache {
    static load: (type: Mode, reset?: boolean) => Note[] | null = (type: Mode, reset?: boolean) => {
        const notesCache = JSON.parse(localStorage.getItem(`${type}_notes`) ?? '[]');
        const notesCacheExpired = !(
            notesCache &&
            (notesCache.notes ?? []).length &&
            dayjs() < dayjs(notesCache.exp ?? dayjs()) &&
            !reset
        )
        return notesCacheExpired ? null : notesCache.notes.map((n: RawNote) => new Note(n));
    };

    static save = (notes: Note[], type: Mode) => {
        localStorage.setItem(
            `${type}_notes`,
            JSON.stringify({notes, exp: dayjs().add(1, 'h')}),
        );
    };
}

export class NoteBoard {
    /**  @type {NoteBoardCol[]} */
    cols;

    constructor(cols: NoteBoardCol[]) {
        this.cols = cols;
    }

    /**
     *
     * @param {Note[]} notes
     * @param {string[]} groups
     * @return {NoteBoard}
     */
    static buildDaily = (notes: Note[], groups: string[]) => {
        const dailyNotes_ = groupBy(notes, 'created');
        return new NoteBoard(
            groups.map(g => new DailyNoteBoardCol(g, (dailyNotes_[g] as Note[]) ?? []))
        );
    };

    /**
     *
     * @param {Note[]} notes
     * @param {string[]} groups
     * @return {NoteBoard}
     */
    static buildWeekly = (notes: Note[], groups: string[]) => {
        const weeklyNotes = groupBy(notes, (note) => formatDateRange(getWeekDays(note.created)));
        return new NoteBoard(
            groups.map((g, index) =>
                new WeeklyNoteBoardCol(index, g, (weeklyNotes[g] as Note[]) ?? []))
        );
    };


    static buildMonthly(notes: Note[], dateRanges: string[]) {
        const monthlyNotes = groupBy(notes, (note) => dayjs(note.created).format('YYYY-MM'));
        return new NoteBoard(
            dateRanges.map((month) => new MonthlyNoteBoardCol(month, monthlyNotes[month] ?? [])),
        );
    }
}

export class NoteBoardCol {
    notes;

    constructor(notes: Note[]) {
        this.notes = notes;
    }

    get title() {
        return 'Please fill me ~~with cum~~'
    }

    get isToday() {
        return false;
    }
}

export class DailyNoteBoardCol extends NoteBoardCol {
    /** @type {string} */
    weekday;

    constructor(weekday: string, notes: Note[]) {
        super(notes);
        this.weekday = weekday;
    }

    get title() {
        let weekdayShort = `<b>${dayjs(this.weekday).format('dd').toUpperCase()}</b>`;
        if (this.isToday) {
            weekdayShort = `<u>${weekdayShort}</u>`;
        }
        return `${weekdayShort}<br /><span class="content is-small">${this.weekday}</span>`;
    }

    get isToday() {
        return dayjs(this.weekday).isSame(dayjs(), 'day');
    }
}

export class WeeklyNoteBoardCol extends NoteBoardCol {
    /** @type {string} */
    week;
    /** @type {int} */
    weekIndex;

    constructor(weekIndex: number, week: string, notes: Note[]) {
        super(notes);
        this.weekIndex = weekIndex;
        this.week = week;
    }

    get title() {
        let weekIndex = `<b>Неделя ${this.weekIndex + 1}</b>`;
        if (this.isToday) {
            weekIndex = `<u>${weekIndex}</u>`;
        }
        return `${weekIndex}<br />
                <span class="content is-small">${this.week}</span> `
    }

    get isToday() {
        const [weekStart, weekEnd] = this.week.split(' - ').map(w => dayjs(w));
        return dayjs().isBetween(weekStart, weekEnd, 'day', '[]');
    }
}

export class MonthlyNoteBoardCol extends NoteBoardCol {
    constructor(public month: string, notes: Note[]) {
        super(notes);
    }


    get title() {
        let title_ = this.month;
        title_ = this.isToday ? wrapB(title_) : title_;
        return title_;
    }

    get isToday() {
        return dayjs().startOf('month').isSame(dayjs(this.month));
    }
}
