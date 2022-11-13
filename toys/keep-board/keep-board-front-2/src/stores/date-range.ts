import {defineStore} from "pinia";
import {ref} from "vue";
import {getWeekDays, shiftMonth, shiftWeek} from "@/logic/date";
import {useModeStore} from "@/stores/mode";
import dayjs from "dayjs";

export const useDateRangeStore = defineStore(
    'date-range',
    () => {
        const dateRanges = ref(getWeekDays());

        const {mode} = useModeStore();

        const shift = function (by = 1) {
            if (mode === 'daily') {
                let today = dateRanges.value[0];
                dateRanges.value = shiftWeek(by, dayjs(today));
            } else {
                let today = dateRanges.value[0].split(' - ')[1];
                dateRanges.value = shiftMonth(by, dayjs(today));
            }
        };

        return {
            dateRanges,
            shift,
        };
    }
);