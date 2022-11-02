export class NotePoint {
    category;
    value;

    constructor({category, value = ''}) {
        this.category = category;
        this.value = value;
    }


    /** @param {string} text */
    static fromText(text) {
        let emojiRegex = /^\p{Emoji}/gu;
        return new NotePoint({
            category: text.match(emojiRegex)[0]
                .replaceAll('⚒', '🚧')
                .replaceAll('🏋', '💪')
                .replaceAll('🖼', '📷'),
            value: text.replace(emojiRegex, '').trim(),
        });
    }
}


export class NotePointForm {
    /** @type {NotePoint[]} */
    points;

    constructor(points) {
        this.points = points;
    }

    /** @param {Note} note */
    static fromNote(note) {
        let preparedText = note.text;
        return new NotePointForm(preparedText.split('\n').map(NotePoint.fromText));
    }

    /** @param {object} categories */
    syncWithCategories(categories) {
        this.points = [
            ...this.points,
            ...Object.keys(categories).flatMap(
                category => this.points.map(p => p.category).includes(category)
                    ? []
                    : [new NotePoint({category})]
            ),
        ];
        return this;
    }

    /** @param {object} categories */
    sortByCategories(categories) {
        this.points.sort(
            (p1, p2) => {
                let catIndex1 = Object.keys(categories).indexOf(p1.category);
                let catIndex2 = Object.keys(categories).indexOf(p2.category);
                return catIndex1 - catIndex2;
            }
        );
        return this;
    }

    addPoint(category, index) {
        this.points.splice(index + 1, 0, {category, value: ''});
    }

    removePoint(point, index) {
        if (this.points.filter(p => p.category === point.category).length === 1) {
            point.value = '';
        } else {
            this.points.splice(index, 1);
        }
    }
}