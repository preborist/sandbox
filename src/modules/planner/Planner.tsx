import dayjs from 'dayjs';
import { ChevronLeft, ChevronRight, Trash2, Edit2 } from 'lucide-react';
import { useMemo, useState } from 'react';
import { twMerge } from 'tailwind-merge';

import { addEvent, CalendarEvent, deleteEvent, editEvent } from '@src/store/calendarSlice';
import { useAppDispatch, useAppSelector } from '@src/store/store';
import Modal from '@src/ui/Modal';

import CalendarDay from './CalendarDay';
import EventForm from './EventForm';
import { generateCalendarGrid } from './calendarUtils';

const Planner = () => {
  const dispatch = useAppDispatch();
  const allEvents = useAppSelector(state => state.calendar.events);

  const [currentDate, setCurrentDate] = useState(dayjs());
  const [selectedDay, setSelectedDay] = useState<dayjs.Dayjs | null>(null);
  const [isEventsModalOpen, setIsEventsModalOpen] = useState(false);

  const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(null);
  const [eventToDelete, setEventToDelete] = useState<CalendarEvent | null>(null);

  const calendarGrid = useMemo(() => {
    return generateCalendarGrid(currentDate);
  }, [currentDate]);

  const eventsByDate = useMemo(() => {
    return allEvents.reduce(
      (acc, event) => {
        const dateKey = dayjs(event.dateTime).format('YYYY-MM-DD');
        if (!acc[dateKey]) {
          acc[dateKey] = [];
        }
        acc[dateKey].push(event);
        acc[dateKey].sort((a, b) => dayjs(a.dateTime).diff(dayjs(b.dateTime)));
        return acc;
      },
      {} as Record<string, CalendarEvent[]>,
    );
  }, [allEvents]);

  const eventsForSelectedDay = useMemo(() => {
    if (!selectedDay) return [];
    const dateKey = selectedDay.format('YYYY-MM-DD');
    const filtered = allEvents.filter(e => dayjs(e.dateTime).format('YYYY-MM-DD') === dateKey);

    return filtered.sort((a, b) => dayjs(a.dateTime).diff(dayjs(b.dateTime)));
  }, [allEvents, selectedDay]);

  const handleDateClick = (day: dayjs.Dayjs) => {
    setSelectedDay(day);
    setEditingEvent(null);
    setIsEventsModalOpen(true);
  };

  const handleEditClick = (event: CalendarEvent) => {
    setEditingEvent(event);
    setSelectedDay(dayjs(event.dateTime));
  };

  const handleDeleteClick = () => {
    if (eventToDelete) {
      if (editingEvent?.id === eventToDelete.id) setEditingEvent(null);
      dispatch(deleteEvent(eventToDelete.id));
      setEventToDelete(null);
    }
  };

  const handleSaveEvent = (eventToSave: CalendarEvent) => {
    if (editingEvent) {
      dispatch(editEvent(eventToSave));
    } else {
      dispatch(addEvent(eventToSave));
    }
    setEditingEvent(null);
    setSelectedDay(dayjs(eventToSave.dateTime));
  };

  const handleCancelEdit = () => {
    setEditingEvent(null);
    setSelectedDay(selectedDay);
  };

  const daysOfWeek = dayjs.weekdaysMin(true);

  return (
    <div className="mx-auto max-w-5xl min-w-xl rounded-xl bg-white shadow-lg">
      <div className="flex items-center justify-between bg-slate-800 p-6 text-white">
        <h2 className="text-2xl font-bold capitalize">{currentDate.format('MMMM YYYY')}</h2>
        <div className="flex gap-2">
          <button onClick={() => setCurrentDate(currentDate.subtract(1, 'month'))} className="rounded-full p-2 hover:bg-slate-700">
            <ChevronLeft />
          </button>
          <button
            onClick={() => setCurrentDate(dayjs())}
            className="rounded border border-slate-500 px-4 py-1 text-sm hover:bg-slate-700"
          >
            Today
          </button>
          <button onClick={() => setCurrentDate(currentDate.add(1, 'month'))} className="rounded-full p-2 hover:bg-slate-700">
            <ChevronRight />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 border-b bg-gray-50 text-center">
        {daysOfWeek.map(day => (
          <div key={day} className="border-r py-2 font-semibold text-gray-600 last:border-r-0">
            {day}
          </div>
        ))}
      </div>

      <div className="grid auto-rows-[100px] grid-cols-7">
        {calendarGrid.map(day => {
          const dateKey = day.format('YYYY-MM-DD');
          const dayEvents = eventsByDate[dateKey] || [];
          return <CalendarDay key={dateKey} day={day} dayEvents={dayEvents} currentDate={currentDate} onDateClick={handleDateClick} />;
        })}
      </div>

      <Modal
        isOpen={isEventsModalOpen}
        onClose={() => {
          setIsEventsModalOpen(false);
          setEditingEvent(null);
        }}
        title={selectedDay ? `Events on ${selectedDay.format('D MMMM')}` : ''}
      >
        <div className="space-y-4">
          <div className="max-h-60 space-y-2 overflow-y-auto">
            {eventsForSelectedDay.length === 0 ? (
              <p className="py-4 text-center text-gray-500">No scheduled events</p>
            ) : (
              eventsForSelectedDay.map(event => (
                <div
                  key={event.id}
                  className={twMerge(
                    'group flex items-center justify-between rounded bg-gray-50 p-3 hover:bg-gray-100',
                    event.id === editingEvent?.id && 'border border-blue-500',
                  )}
                >
                  <div className="flex">
                    <p className="mr-3 font-bold">{dayjs(event.dateTime).format('HH:mm')}</p>
                    <div className="wrap-anywhere">
                      <p className="mb-1 font-medium">{event.title}</p>
                      <p className="text-sm">{event.description}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => handleEditClick(event)} className="text-blue-500 hover:text-blue-700">
                      <Edit2 size={16} />
                    </button>
                    <button onClick={() => setEventToDelete(event)} className="text-red-500 hover:text-red-700">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          <hr />

          {selectedDay && (
            <EventForm
              initialEvent={editingEvent}
              initialDate={selectedDay}
              onSubmit={handleSaveEvent}
              onCancelEdit={handleCancelEdit}
            />
          )}
        </div>
      </Modal>

      <Modal
        isOpen={eventToDelete !== null}
        onClose={() => setEventToDelete(null)}
        title={`Would you like to delete the event "${eventToDelete?.title}"?`}
      >
        <div className="flex gap-4">
          <button onClick={handleDeleteClick} className="text-red-500 hover:text-red-700">
            Delete
          </button>
          <button onClick={() => setEventToDelete(null)} className="text-blue-500 hover:text-blue-700">
            Close
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Planner;
