// import dayjs from "dayjs";
// import isBetween from "dayjs/plugin/isBetween";
// import "dayjs/locale/ru";
//
// dayjs.locale('ru')
// dayjs.extend(isBetween);

export const formatDateRange = dateRange => `${dateRange[0]} - ${dateRange[dateRange.length - 1]}`;

/**
 * По дню генерирует массив дней недели
 */
export const getWeekDays = (today = null) => {
    today = dayjs(today ?? dayjs());
    const weekStart = today.add(-getWeekday(today), 'd');
    return [...Array(7).keys()].map(i => weekStart.add(i, 'd').format('YYYY-MM-DD'));
};

/**
 * Monday > 0
 * Sunday > 6
 *
 */
function getWeekday(dayjs_) {
    return (dayjs_.day() + 6) % 7
}

const Weekdays = {
    Mon: 0,
    Tue: 1,
    Wed: 2,
    Thu: 3,
    Fri: 4,
    Sat: 5,
    Sun: 6,
}

export function getMonthWeeks(today) {
    today = today ? dayjs(today) : dayjs();

    let weeks = [
        formatDateRange(getWeekDays(today)),
    ];

    let currentDay = today.startOf('month');
    if (getWeekday(currentDay) <= Weekdays.Thu) {
        weeks.push(formatDateRange(getWeekDays(currentDay)));
    } else {
        const monthStartWeek = getWeekDays(currentDay)
        if (today.isBetween(monthStartWeek[0], monthStartWeek[monthStartWeek.length - 1], 'day', '[]')) {
            currentDay = currentDay.subtract(1, 'M');
            if (getWeekday(currentDay) <= Weekdays.Thu) {
                weeks.push(formatDateRange(getWeekDays(currentDay)));
            }
        }
    }

    const monthEnd = currentDay.endOf('month');

    while (true) {
        currentDay = currentDay.add(1, 'w');
        let week = getWeekDays(currentDay);

        if (monthEnd.isBetween(week[0], week[week.length - 1], 'day', '[]')) {
            if (getWeekday(monthEnd) > Weekdays.Thu) {
                weeks.push(formatDateRange(week));
            }
            break;
        }

        weeks.push(formatDateRange(week));
    }

    weeks = [...new Set(weeks)].sort();
    return weeks;
}

/**
 * Двигает массив дней недели на неделю вперед или назад
 */
export const shiftWeek = (weeks = 1, today = null) => getWeekDays(dayjs(today ?? dayjs()).add(weeks, 'w'));

export const shiftMonth = (months = 1, today = null) => getMonthWeeks(dayjs(today ?? dayjs()).add(months, 'M'));


