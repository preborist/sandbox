import dayjs from 'dayjs';

/**
 * Generate a full calendar grid (dayjs.Dayjs[]) for a given month,
 * including days from the previous and next months.
 * The logic respects the Day.js locale (e.g., the week starts on Monday for UK/UA, Sunday for US).
 * @param currentDate - Any date within the month for which the grid should be generated.
 * @returns An array of Dayjs objects representing each day in the grid.
 */
export const generateCalendarGrid = (currentDate: dayjs.Dayjs): dayjs.Dayjs[] => {
  const startOfMonth = currentDate.startOf('month');
  const endOfMonth = currentDate.endOf('month');

  const startDayIndex = startOfMonth.weekday();

  // 1. Prev month leading days (Leading Days)
  const leadingDays: dayjs.Dayjs[] = [];
  if (startDayIndex > 0) {
    // Number of days to add = startDayIndex.
    for (let i = startDayIndex - 1; i >= 0; i--) {
      // Count backwards from the first day of the current month
      leadingDays.unshift(startOfMonth.subtract(i + 1, 'day'));
    }
  }

  // 2. Current month days
  const daysInMonth: dayjs.Dayjs[] = [];
  const daysCount = startOfMonth.daysInMonth();
  for (let i = 0; i < daysCount; i++) {
    daysInMonth.push(startOfMonth.add(i, 'day'));
  }

  const totalDays = [...leadingDays, ...daysInMonth];

  // 3. Calculate next month trailing days (Trailing Days)
  const remainder = totalDays.length % 7;
  let daysToFill: number;

  if (remainder === 0) {
    daysToFill = 0;
  } else {
    daysToFill = 7 - remainder;
  }

  const trailingDays: dayjs.Dayjs[] = [];

  for (let i = 1; i <= daysToFill; i++) {
    trailingDays.push(endOfMonth.add(i, 'day'));
  }

  return [...totalDays, ...trailingDays];
};
