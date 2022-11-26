import {formatDateRange, getMonthWeeks, getWeekDays} from "@/logic/date";
import { Note } from "@/logic/note";
import { NotePointForm } from "@/logic/points";
import { groupBy } from "@/logic/utils";
import { defineStore } from "pinia";
import { ref, type Ref } from "vue";
import { useCategoryStore } from "./category";
import { useNoteStore } from "./note";

export const usePointStore = defineStore(
    'point',
    () => {

        const pointsForm: Ref<NotePointForm | null> = ref(null);

        const { selectNote } = useNoteStore();
        const { categories } = useCategoryStore();
        const openEditNoteModal = (note: Note) => {
            selectNote(note);

            pointsForm.value = NotePointForm
                .fromNote(note)
                .syncWithCategories(categories)
                .sortByCategories(categories);

            //  openModal();
        };
        const openCreateNoteModal = () => {
            pointsForm.value = new NotePointForm()
                .syncWithCategories(categories);

            
        };
        const fillWeeklyFormWithDaily = () => {
            const notes = Note.loadFromCache('daily');
            const allDailyNotes = groupBy(notes!, 'created')
            // @ts-ignore
            const weeklyDailyNotes = getWeekDays().flatMap(g => allDailyNotes[g] ?? []);

            pointsForm.value = NotePointForm
                .fromNotes(weeklyDailyNotes)
                .syncWithCategories(categories)
                .sortByCategories(categories);
        };
        const fillMonthlyFormWithWeekly = () => {
            const notes = Note.loadFromCache('weekly');
            const allWeeklyNotes = groupBy(notes!, (note) => formatDateRange(getWeekDays(note.created)));
            // @ts-ignore
            const monthlyWeeklyNotes = getMonthWeeks().flatMap(g => allWeeklyNotes[g] ?? []);

            pointsForm.value = NotePointForm
                .fromNotes(monthlyWeeklyNotes)
                .syncWithCategories(categories)
                .sortByCategories(categories);
        };

        return { pointsForm, openEditNoteModal, openCreateNoteModal, fillWeeklyFormWithDaily, fillMonthlyFormWithWeekly };
    });