import {Note} from "./note";
import type {RawNote} from "./note";
import type {Mode} from "@/logic/mode";

export class ApiCli {
    baseUrl = 'https://functions.yandexcloud.net/d4evmq3b5u0kmmehthvf';

    /**
     * @param {'daily'|'weekly'} noteType
     * @return {Promise<Note[]>}
     */
    async listNotes(noteType: Mode) {
        const res = await fetch(`${this.baseUrl}?mode=${noteType}`)
        const notes = (await res.json() as RawNote[]).map(n => new Note(n));
        return notes
    }

    /**
     *
     * @param {string} noteId
     * @param {string} noteText
     * @param {string} userToken
     * @return {Promise<void>}
     */
    async updateNote(noteId: string, noteText: string, userToken: string) {
        await fetch(`${this.baseUrl}?mode=update`, {
            method: 'POST',
            body: JSON.stringify({note_id: noteId, note_text: noteText}),
            headers: {
                'Content-Type': 'application/json',
                'KB-Authorization': userToken,
            }
        });
    }

    /**
     *
     * @param {'daily'|'weekly'} noteType
     * @param {string} noteText
     * @param {string} userToken
     * @return {Promise<Note>}
     */
    async createNote(noteType: Mode, noteText: string, userToken: string) {
        const resp = await fetch(`${this.baseUrl}?mode=create`, {
            method: 'POST',
            body: JSON.stringify({note_type: noteType, note_text: noteText}),
            headers: {
                'Content-Type': 'application/json',
                'KB-Authorization': userToken,
            }
        });
        const note = (await resp.json());
        return new Note(note);
    }
}