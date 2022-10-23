import {makeClickableLinks} from "./utils.js";

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
        if (
            notesCache &&
            (notesCache.notes ?? []).length &&
            dayjs() < dayjs(notesCache.exp ?? dayjs()) &&
            !reset
        ) {
            return notesCache.notes.map(n => new Note(n));
        } else {
            return null;
        }
    }

    static loadFromBack = async type => {
        const res = await fetch(`https://functions.yandexcloud.net/d4evmq3b5u0kmmehthvf?mode=${type}`)
        const notes = (await res.json())
            .map(note => ({...note, text: makeClickableLinks(note.text)}))
            .map(n => new Note(n));
        localStorage.setItem(
            `${type}_notes`,
            JSON.stringify({notes, exp: dayjs().add(1, 'd')}),
        );
        return notes;
    };
}