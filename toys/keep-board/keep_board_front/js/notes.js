import {groupBy, makeClickableLinks, prettifyLinks, zip} from "./utils.js";
import {formatDateRange, getWeekDays} from "./date.js";

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
        const res = await fetch(`https://functions.yandexcloud.net/d4evmq3b5u0kmmehthvf?mode=${type}`)
        const notes = (await res.json())
            .map(n => new Note(n));
        NoteCache.save(notes, type);
        return notes;
    };

    /**
     * @param {User} user
     * @param {NotePointForm} pointsForm
     * @returns {Promise<void>}
     */
    async save(user, pointsForm) {
        this.text = pointsForm.points.filter(p => p.value).map(p => `${p.category} ${p.value}`).join('\n');
        await fetch(`https://functions.yandexcloud.net/d4evmq3b5u0kmmehthvf?mode=update&id=${this.id}`, {
            method: 'POST',
            body: JSON.stringify({text: this.text}),
            headers: {
                'Content-Type': 'application/json',
                'KB-Authorization': user.token,
            }
        })
    }
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