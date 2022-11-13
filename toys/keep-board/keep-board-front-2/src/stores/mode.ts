import { defineStore } from "pinia";
import type { Ref } from "vue";
import { computed, ref } from "vue";
import type { Mode } from "@/logic/mode";
import { useDateRangeStore } from "./date-range";
import { getMonthWeeks, getWeekDays } from "@/logic/date";
import { useNoteStore } from "./note";


export const useModeStore = defineStore(
    'mode',
    () => {
        const mode: Ref<Mode> = ref("daily");

        const modeStr = computed(() => {
            switch (mode.value) {
                case "daily":
                    return 'Дейли';
                case "weekly":
                    return 'Викли';
            }
        });

        const { setDateRanges } = useDateRangeStore();
        const { loadNotes } = useNoteStore();
        const setMode = (newMode: Mode) => {
            mode.value = newMode;


            if (mode.value === 'daily') {
                setDateRanges(getWeekDays());
            } else if (mode.value === 'weekly') {
                setDateRanges(getMonthWeeks());
            }
            loadNotes();
        };

        return {
            mode,
            modeStr,
            setMode,
        };
    }
);