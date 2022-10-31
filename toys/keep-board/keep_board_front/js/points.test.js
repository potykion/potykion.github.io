import {NotePoint} from "./points";
import {Note} from "./notes";
import {test, expect} from "vitest";

test(
    'points from text', () => {
        expect(NotePoint.fromText('😭 Альт иуда грид + агнец'))
            .toStrictEqual(new NotePoint({category: '😭', value: 'Альт иуда грид + агнец'}))
    }
);

test(
    'points from note', () => {
        expect(NotePoint.fromNote(new Note({
            text: '😭 Альт иуда грид + агнец\n🏥 Эцпшка\n📱 Джанго врыв, тестики\n📝 Утилитки\n📝 Удалил старье\n🤔 Удаление всех кард-орг при сохранении'
        }))).toStrictEqual([
            new NotePoint({category: '😭', value: 'Альт иуда грид + агнец'}),
            new NotePoint({category: '🏥', value: 'Эцпшка'}),
            new NotePoint({category: '📱', value: 'Джанго врыв, тестики'}),
            new NotePoint({category: '📝', value: 'Утилитки'}),
            new NotePoint({category: '📝', value: 'Удалил старье'}),
            new NotePoint({category: '🤔', value: 'Удаление всех кард-орг при сохранении'}),
        ])
    }
);