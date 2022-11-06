import {groupBy, makeClickableLinks, prettifyLinks, zip} from "./utils.js";
import {formatDateRange, getWeekDays} from "./date.js";
import {ApiCli} from "./apiCli.js";

export class Note {
    id;
    created;
    title;
    text;
    labels;
    url;
    image;

    constructor({id, created, title, text, labels, url, image}) {
        this.id = id;
        this.created = created;
        this.title = title;
        this.text = text;
        this.labels = labels;
        this.url = url;
        this.image = image;
    }

    static loadFromCache = (type, reset) => NoteCache.load(type, reset);

    static loadFromBack = async type => {
        const notes = await new ApiCli().listNotes(type);
        NoteCache.save(notes, type);
        return notes;
    };

    /**
     * @param {User} user
     * @param {NotePointForm} pointsForm
     * @returns {Promise<void>}
     */
    async save(user, pointsForm) {
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
    static create = async (noteType, user, pointsForm) =>
        await new ApiCli().createNote(noteType, pointsForm.toText(), user.token);
}


export class NoteCache {
    static load = (type, reset) => {
        const notesCache = JSON.parse(localStorage.getItem(`${type}_notes`));
        const notesCacheExpired = !(
            notesCache &&
            (notesCache.notes ?? []).length &&
            dayjs() < dayjs(notesCache.exp ?? dayjs()) &&
            !reset
        )
        return notesCacheExpired ? null : notesCache.notes.map(n => new Note(n));
    };

    static save = (notes, type) => {
        localStorage.setItem(
            `${type}_notes`,
            JSON.stringify({notes, exp: dayjs().add(1, 'd')}),
        );
    };
}

export class NoteBoard {
    /**  @type {NoteBoardCol[]} */
    cols;

    constructor(cols) {
        this.cols = cols;
    }

    /**
     *
     * @param {Note[]} notes
     * @param {string[]} groups
     * @return {NoteBoard}
     */
    static buildDaily = (notes, groups) => {
        const dailyNotes_ = groupBy(notes, 'created');
        return new NoteBoard(
            groups.map(g => new DailyNoteBoardCol(g, dailyNotes_[g] ?? []))
        );
    };

    /**
     *
     * @param {Note[]} notes
     * @param {string[]} groups
     * @return {NoteBoard}
     */
    static buildWeekly = (notes, groups) => {
        const weeklyNotes = groupBy(notes, (note) => formatDateRange(getWeekDays(note.created)));
        return new NoteBoard(
            groups.map((g, index) => new WeeklyNoteBoardCol(index, g, weeklyNotes[g] ?? []))
        );
    };


    static formatNoteText(note) {
        return prettifyLinks(makeClickableLinks(note.text))
    }
}

export class NoteBoardCol {
    notes;

    constructor(notes) {
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

    constructor(weekday, notes) {
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

    constructor(weekIndex, week, notes) {
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