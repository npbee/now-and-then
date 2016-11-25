import range from 'ramda/src/range';
import equals from 'ramda/src/equals';
import compose from 'ramda/src/compose';
import until from 'ramda/src/until';
import lt from 'ramda/src/lt';
import curry from 'ramda/src/curry';
import unary from 'ramda/src/unary';
import flip from 'ramda/src/flip';
import __ from 'ramda/src/__';
import map from 'ramda/src/map';
import reverse from 'ramda/src/reverse';
import pipe from 'ramda/src/pipe';
import reduce from 'ramda/src/reduce';
import addIndex from 'ramda/src/addIndex';
import memoize from 'ramda/src/memoize';
import differenceInMinutes from 'date-fns/difference_in_minutes';

export const MONTHS = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];


const clone = date => new Date(date.getTime());
const dayOfWeek = d => d.getDay();
const firstDayOfMonth = d => new Date(d.getFullYear(), d.getMonth(), 1);
export const isSameDay = memoize((d1, d2) => {
    return d1.getFullYear() === d2.getFullYear() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getDate() === d2.getDate();
});

export const format = d => {
    const date = d.getDate();
    const month = MONTHS[d.getMonth()];
    const year = d.getFullYear();

    return `${month} ${date}, ${year}`;
};

const indexedReduce = addIndex(reduce);

const subtractDays = curry((count, date) => {
    const d = clone(date);

    d.setDate(date.getDate() - count);

    return d;
});

const addDays = curry((count, date) => {
    const d = clone(date);

    d.setDate(date.getDate() + count);

    return d;
});

export const addMonths = curry((count, date) => {
    const d = clone(date);

    d.setMonth(date.getMonth() + count);

    return d;
});

export const subtractMonths = curry((count, date) => {
    const d = clone(date);

    d.setMonth(date.getMonth() - count);

    return d;
});

const lastDayOfMonth = compose(
    subtractDays(1),
    addMonths(1),
    firstDayOfMonth
);

export const daysOfMonth = memoize((date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = firstDayOfMonth(date);
    const lastDay = lastDayOfMonth(firstDay);

    return range(1, lastDay.getDate() + 1)
        .map(d => new Date(year, month, d));
});

function padWeek(week) {
    if (week.lenth === 7) {
        return week;
    }

    const firstDay = dayOfWeek(week[0]);
    const subtractRange = range(1, firstDay + 1);
    const startingOffsets = compose(
        reverse,
        map(subtractDays(__, week[0]))
    )(subtractRange);

    const lastDay = dayOfWeek(week[week.length - 1]);
    const addRange = range(1, 7 - lastDay);
    const endingOffsets = compose(
        map(addDays(__, week[week.length - 1]))
    )(addRange);

    return [
        ...startingOffsets,
        ...week,
        ...endingOffsets,
    ];
}

export const weeksInMonth = memoize((date) => {
    const daysInMonth = daysOfMonth(date);
    const buildWeeks = function(weeks, day, index) {
        const currentWeek = weeks[weeks.length - 1];
        const weekday = dayOfWeek(day);

        if (weekday === 0 && currentWeek.length !== 0) {
            weeks.push([day]);
        } else {
            currentWeek.push(day);
        }

        return weeks;
    };

    const weeks = compose(
        map(padWeek),
        indexedReduce(buildWeeks, [[]])
    )(daysInMonth);

    return weeks;
});

export function diffDates(aDate, aTime, bDate, bTime) {
    const dateA = new Date(aDate.getFullYear(), aDate.getMonth(), aDate.getDate(), ...aTime);
    const dateB = new Date(bDate.getFullYear(), bDate.getMonth(), bDate.getDate(), ...bTime);
    const minutesDiff = differenceInMinutes(dateA, dateB);
    const hours = Math.floor(minutesDiff / 60);
    const minutes = minutesDiff % 60;

    return [hours, minutes];
}
