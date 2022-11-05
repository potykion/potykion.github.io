import {Note} from "./notes.js";

export class ApiCli {
    baseUrl = 'https://functions.yandexcloud.net/d4evmq3b5u0kmmehthvf';

    /**
     * @param {'daily'|'weekly'} noteType
     * @return {Promise<Note[]>}
     */
    async listNotes(noteType) {
        const res = await fetch(`${this.baseUrl}?mode=${noteType}`)
        const notes = (await res.json()).map(n => new Note(n));
        return notes
    }

    /**
     *
     * @param {string} noteId
     * @param {string} noteText
     * @param {string} userToken
     * @return {Promise<void>}
     */
    async updateNote(noteId, noteText, userToken) {
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
    async createNote(noteType, noteText, userToken) {
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