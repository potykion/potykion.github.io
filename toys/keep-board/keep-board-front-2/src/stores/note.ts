import { ref } from "vue";
import type { Ref } from "vue";
import { Note, NoteBoard, NoteCache } from "@/logic/note";
import { useModeStore } from "@/stores/mode";
import { useDateRangeStore } from "./date-range";
import { useUserStore } from "./user";
import { usePointStore } from "./point";

import { defineStore, acceptHMRUpdate } from "pinia"

interface NoteStoreState {
    loading: boolean;
    notes: Note[];
    selectedNote: Note | null;
    saving: boolean;
}
interface NoteStoreGetters {
    noteBoard: (state: NoteStoreState) => NoteBoard;
    [key: string]: any;
}
interface NoteStoreActions {

}

export const useNoteStore = defineStore<string, NoteStoreState, NoteStoreGetters, NoteStoreActions>("note", {
    state: () => ({
        loading: false,
        notes: [],
        selectedNote: null,
        saving: false,

    } as NoteStoreState),
    getters: {
        noteBoard: (state,) => {

            const { mode } = useModeStore();
            const { dateRanges } = useDateRangeStore()
            switch (mode) {
                case "daily":
                    return NoteBoard.buildDaily(state.notes, dateRanges);
                case "weekly":
                    return NoteBoard.buildWeekly(state.notes, dateRanges);
            }

        }
    },
    actions: {
        selectNote(note: Note) {
            this.selectedNote = note;
        },
        setNotes(newNotes: Note[]) {
            this.notes = newNotes;
        },

        async loadNotes(reset = false) {
            const { mode } = useModeStore();
            this.loading = true;
            try {
                this.setNotes(
                    Note.loadFromCache(mode, reset) ??
                    (await Note.loadFromBack(mode))
                );
            } finally {
                this.loading = false;
            }
        },



        async saveNote() {
            const { mode } = useModeStore();
            const { user } = useUserStore();
            const { pointsForm } = usePointStore();

            this.saving = true;
            try {
                await this.selectedNote!.save(user!, pointsForm!);
                NoteCache.save(this.notes, mode);
            } finally {
                this.saving = false;
                // closeModal();
            }
        },
        async createNote() {
            const { mode } = useModeStore();
            const { user } = useUserStore();
            const { pointsForm } = usePointStore();

            this.saving = true;
            try {
                const note = await Note.create(mode, user!, pointsForm!);
                this.notes.push(note);
                NoteCache.save(this.notes, mode);
            } finally {
                this.saving = false;
                // closeModal();
            }
        },

    },
})
