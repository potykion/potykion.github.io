export class NotePoint {
    category;
    value;

    constructor({category, value = ''}) {
        this.category = category;
        this.value = value;
    }



    /** @param {Note} note */
    static fromNote(note) {
        return note.text.split('\n').map(this.fromText);
    }

    /** @param {string} text */
    static fromText(text) {
        let emojiRegex = /^\p{Emoji}/gu;
        return new NotePoint({
            category: text.match(emojiRegex)[0],
            value: text.replace(emojiRegex, '').trim(),
        });
    }
}