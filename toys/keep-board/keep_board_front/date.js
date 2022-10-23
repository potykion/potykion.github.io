export const formatDateRange = dateRange => `${dateRange[0]} - ${dateRange[dateRange.length - 1]}`;

/**
 * По дню генерирует массив дней недели
 */
export const getWeekDays = (today = null) => {
    today = dayjs(today ?? dayjs());
    const weekStart = today.add(-((today.day() + 6) % 7), 'd');
    return [...Array(7).keys()].map(i => weekStart.add(i, 'd').format('YYYY-MM-DD'));
};

export function getMonthWeeks(today = null) {
    /** @type {string[]} */
    let groups = [];

    today = today ? dayjs(today) : dayjs(getWeekDays()[0]);
    const monthStart = today.startOf('M');
    const monthEnd = today.endOf('M');

    let curWeek = getWeekDays(monthStart);
    while (true) {
        if (dayjs(curWeek[0]).isBefore(monthStart, 'day')) {
            curWeek = getWeekDays(dayjs(curWeek[0]).add(1, 'w'));
            continue;
        }

        groups.push(formatDateRange(curWeek));
        curWeek = getWeekDays(dayjs(curWeek[0]).add(1, 'w'));

        if (monthEnd.isBetween(curWeek[0], curWeek[curWeek.length - 1], 'day', '[]')) {
            groups.push(formatDateRange(curWeek));
            break
        }
    }

    return groups;
}

/**
 * Двигает массив дней недели на неделю вперед или назад
 */
export const shiftWeek = (weeks = 1, today = null) => getWeekDays(dayjs(today ?? dayjs()).add(weeks, 'w'));

export const shiftMonth = (months = 1, today = null) => getMonthWeeks(dayjs(today ?? dayjs()).add(months, 'M'));


