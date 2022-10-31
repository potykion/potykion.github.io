import {groupBy, makeClickableLinks, prettifyLinks, zip} from "./utils.js";
import {formatDateRange, getWeekDays} from "./date.js";

export class Note {
    created;
    title;
    text;
    labels;
    url;
    image;

    constructor({created, title, text, labels, url, image}) {
        this.created = created;
        this.title = title;
        this.text = text;
        this.labels = labels;
        this.url = url;
        this.image = image;
    }

    static loadFromCache(type, reset) {
        const notesCache = JSON.parse(localStorage.getItem(`${type}_notes`));
        const notesCacheExpired = !(
            notesCache &&
            (notesCache.notes ?? []).length &&
            dayjs() < dayjs(notesCache.exp ?? dayjs()) &&
            !reset
        )
        return notesCacheExpired ? null : notesCache.notes.map(n => new Note(n));
    }

    static loadFromBack = async type => {
        const res = await fetch(`https://functions.yandexcloud.net/d4evmq3b5u0kmmehthvf?mode=${type}`)
        const notes = (await res.json())
            .map(n => new Note(n));
        localStorage.setItem(
            `${type}_notes`,
            JSON.stringify({notes, exp: dayjs().add(1, 'd')}),
        );
        return notes;
    };
}

export class NoteVM extends Note {
    note;

    constructor(note) {
        super(note);
        this.text = prettifyLinks(makeClickableLinks(this.text));
        this.note = note;
    }

    static buildDaily(notes, groups) {
        notes = notes.map(note => new NoteVM(note));

        const weekdays = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'];
        const dailyNotes_ = groupBy(notes, 'created');
        return zip(
            groups.map((wd, index) => `<b>${weekdays[index]}</b><br /><span class="content is-small">${wd}</span>`),
            groups.map(wd => dailyNotes_[wd] ?? []),
        );
    }

    static buildWeekly(notes, groups) {
        notes = notes.map(note => new NoteVM(note));

        const weeklyNotes = groupBy(notes, (note) => formatDateRange(getWeekDays(note.created)))
        return zip(
            groups.map((week, index) => `<b>Неделя ${index + 1}</b><br /><span class="content is-small">${week}</span> `),
            groups.map(week => weeklyNotes[week] ?? []),
        );
    }
}