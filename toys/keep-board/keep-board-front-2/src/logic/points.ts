import type {Note} from "@/logic/note";

export class NotePoint {
    category: string;
    value: string;

    constructor({ category, value = '' }: { category: string, value: string }) {
        this.category = category;
        this.value = value;
    }


    /** @param {string} text */
    static fromText(text: string) {
        let emojiRegex = /^\p{Emoji}/gu;
        return new NotePoint({
            category: text.match(emojiRegex)![0]
                .replaceAll('⚒', '🚧')
                .replaceAll('🏋', '💪')
                .replaceAll('🖼', '📷'),
            value: text.replace(emojiRegex, '').trim(),
        });
    }

    static fromNote(note: Note): NotePoint[] {
        return note.text.split('\n').map(NotePoint.fromText)
    }
}


export class NotePointForm {
    points: NotePoint[];

    constructor(points: NotePoint[] | null = null) {
        this.points = points ?? [];
    }

    /** @param {Note} note */
    static fromNote(note: Note) {
        return new NotePointForm(NotePoint.fromNote(note));
    }

    static fromNotes(notes: Note[]) {
        return new NotePointForm(notes.flatMap(note => NotePoint.fromNote(note)));
    }

    syncWithCategories(categories: object) {
        this.points = [
            ...this.points,
            ...Object.keys(categories).flatMap(
                category => this.points.map(p => p.category).includes(category)
                    ? []
                    : [new NotePoint({ category, value: '' })]
            ),
        ];
        return this;
    }

    sortByCategories(categories: object) {
        this.points.sort(
            (p1, p2) => {
                let catIndex1 = Object.keys(categories).indexOf(p1.category);
                let catIndex2 = Object.keys(categories).indexOf(p2.category);
                return catIndex1 - catIndex2;
            }
        );
        return this;
    }

    addPoint(category: string, index: number) {
        this.points.splice(index + 1, 0, { category, value: '' });
    }

    removePoint(point: NotePoint, index: number) {
        if (this.points.filter(p => p.category === point.category).length === 1) {
            point.value = '';
        } else {
            this.points.splice(index, 1);
        }
    }

    toText() {
        return this.points
            .filter(p => p.value)
            .map(p => `${p.category} ${p.value}`)
            .join('\n');
    }
}