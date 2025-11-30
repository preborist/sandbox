import dayjs from 'dayjs';
import { memo } from 'react';
import { twMerge } from 'tailwind-merge';

import { CalendarEvent } from '@src/store/calendarSlice';

interface CalendarDayProps {
  day: dayjs.Dayjs;
  currentDate: dayjs.Dayjs;
  dayEvents: CalendarEvent[];
  onDateClick: (day: dayjs.Dayjs) => void;
}

const MAX_EVENTS_VISIBLE = 2;

const CalendarDay = memo(({ day, currentDate, dayEvents, onDateClick }: CalendarDayProps) => {
  const today = dayjs();
  const isToday = day.isSame(today, 'day');
  const isCurrentMonth = day.isSame(currentDate, 'month');
  const isPastDay = day.isBefore(today, 'day');

  return (
    <button
      onClick={() => onDateClick(day)}
      className={twMerge(
        'relative cursor-pointer border-r border-b p-2 transition hover:bg-blue-50',
        !isCurrentMonth && 'bg-gray-50 text-gray-400',
        isPastDay && '&& opacity-50 hover:bg-transparent',
      )}
    >
      <div
        className={twMerge(
          'mb-1 flex h-7 w-7 items-center justify-center rounded-full text-sm font-medium',
          isToday && isCurrentMonth && 'bg-blue-600 text-white',
          !isCurrentMonth && 'text-gray-400',
          isToday && !isCurrentMonth && 'border border-blue-600 bg-transparent text-blue-600',
        )}
      >
        {day.format('D')}
      </div>

      <div className="flex h-[50px] flex-col gap-1 overflow-hidden">
        {dayEvents.slice(0, MAX_EVENTS_VISIBLE).map(event => (
          <div
            key={event.id}
            className={twMerge(
              'flex w-full truncate rounded px-1 text-[10px]',
              isCurrentMonth ? 'bg-blue-100 text-blue-800' : 'bg-gray-200 text-gray-500',
            )}
          >
            <span className="mr-1 font-bold">{dayjs(event.dateTime).format('HH:mm')}</span>
            <span title={event.title}>{event.title}</span>
          </div>
        ))}
        {dayEvents.length > MAX_EVENTS_VISIBLE && (
          <span className={twMerge('pl-1 text-[10px]', isCurrentMonth ? 'text-gray-500' : 'text-gray-400')}>
            + {dayEvents.length - MAX_EVENTS_VISIBLE} more
          </span>
        )}
      </div>
    </button>
  );
});

CalendarDay.displayName = 'CalendarDay';
export default CalendarDay;
