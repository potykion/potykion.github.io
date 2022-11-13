import {defineStore} from "pinia";
import type {Ref} from "vue";
import {computed, ref} from "vue";
import type {Mode} from "@/logic/mode";


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

        const setMode = (newMode: Mode) => {
            mode.value = newMode;

            // todo
            //   if (this.mode === 'daily') {
            //       this.groups = getWeekDays();
            //   } else if (this.mode === 'weekly') {
            //       this.groups = getMonthWeeks();
            //   }
            //   this.loadNotes();
        };

        return {
            mode,
            modeStr,
            setMode,
        };
    }
);