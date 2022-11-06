import {test, expect} from "vitest";
import {getMonthWeeks} from "./date";


/**
 * Paste this to date.js before tests:
 *
 * import dayjs from "dayjs";
 * import isBetween from "dayjs/plugin/isBetween";
 * import "dayjs/locale/ru";
 *
 * dayjs.locale('ru')
 * dayjs.extend(isBetween);
 */
test(
    'get month weeks', () => {
        let weeks;

        weeks = getMonthWeeks('2022-10-01');
        expect(weeks[0]).toBe('2022-08-29 - 2022-09-04');
        expect(weeks[weeks.length - 1]).toBe('2022-09-26 - 2022-10-02');

        weeks = getMonthWeeks('2022-10-08');
        expect(weeks[0]).toBe('2022-10-03 - 2022-10-09');
        expect(weeks[weeks.length - 1]).toBe('2022-10-24 - 2022-10-30');

        weeks = getMonthWeeks('2022-11-01');
        expect(weeks[0]).toBe('2022-10-31 - 2022-11-06');
        expect(weeks[weeks.length - 1]).toBe('2022-11-21 - 2022-11-27');

        weeks = getMonthWeeks('2022-11-06');
        expect(weeks[0]).toBe('2022-10-31 - 2022-11-06');
        expect(weeks[weeks.length - 1]).toBe('2022-11-21 - 2022-11-27');

        weeks = getMonthWeeks('2022-11-08');
        expect(weeks[0]).toBe('2022-10-31 - 2022-11-06');
        expect(weeks[weeks.length - 1]).toBe('2022-11-21 - 2022-11-27');

        weeks = getMonthWeeks('2022-12-01');
        expect(weeks[0]).toBe('2022-11-28 - 2022-12-04');
        expect(weeks[weeks.length - 1]).toBe('2022-12-26 - 2023-01-01');
    }
);

