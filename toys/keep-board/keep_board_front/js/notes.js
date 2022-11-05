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

export class NoteVM extends Note {
    note;

    constructor(note) {
        super(note);
        this.text = prettifyLinks(makeClickableLinks(this.text));
        this.note = note;
    }

    static buildDaily = (notes, groups) => {
        notes = notes.map(note => new NoteVM(note));

        const weekdays = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'];
        const dailyNotes_ = groupBy(notes, 'created');
        return zip(
            groups.map((wd, index) => `<b>${weekdays[index]}</b><br /><span class="content is-small">${wd}</span>`),
            groups.map(wd => dailyNotes_[wd] ?? []),
        );
    };

    static buildWeekly = (notes, groups) => {
        notes = notes.map(note => new NoteVM(note));

        const weeklyNotes = groupBy(notes, (note) => formatDateRange(getWeekDays(note.created)))
        return zip(
            groups.map((week, index) => `<b>Неделя ${index + 1}</b><br /><span class="content is-small">${week}</span> `),
            groups.map(week => weeklyNotes[week] ?? []),
        );
    };
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