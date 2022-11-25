import {defineStore} from "pinia";
import {ref, type Ref} from "vue";
import {getQuarterMonths, getWeekDays, shiftMonth, shiftWeek} from "@/logic/date";
import {useModeStore} from "@/stores/mode";
import dayjs from "dayjs";

export const useDateRangeStore = defineStore(
    'date-range',
    () => {
        const dateRanges: Ref<string[]> = ref(getWeekDays());

        const modeStore = useModeStore();

        const setDateRanges = (newDateRanges: string[]) => dateRanges.value = newDateRanges;

        const shift = function (by = 1) {
            switch (modeStore.mode) {
                case "daily":
                    dateRanges.value = shiftWeek(by, dayjs(dateRanges.value[0]));
                    break;
                case "weekly":
                    dateRanges.value = shiftMonth(by, dayjs(dateRanges.value[0].split(' - ')[1]));
                    break;
                case "monthly":
                    dateRanges.value = getQuarterMonths(
                        dayjs(dateRanges.value[0]).add(by * 4, 'month'),
                    );
                    break;

            }
        };

        return {
            dateRanges,
            shift,
            setDateRanges,
        };
    }
);
