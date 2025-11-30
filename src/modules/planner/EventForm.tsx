import dayjs from 'dayjs';
import { Plus, SaveIcon, X } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { CalendarEvent } from '@src/store/calendarSlice';

const MAX_TEXTAREA_HEIGHT = 250;

interface FormInputs {
  title: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  description?: string;
}

interface EventFormProps {
  initialEvent: CalendarEvent | null;
  initialDate: dayjs.Dayjs;
  onSubmit: (data: CalendarEvent) => void;
  onCancelEdit: () => void;
}

const EventForm = ({ initialEvent, initialDate, onSubmit, onCancelEdit }: EventFormProps) => {
  const isEditing = !!initialEvent;

  const { register, handleSubmit, reset, formState, watch } = useForm<FormInputs>();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const descriptionValue = watch('description');

  const resizeTextarea = () => {
    if (textareaRef.current) {
      const el = textareaRef.current;
      el.style.height = 'auto';

      if (el.scrollHeight <= MAX_TEXTAREA_HEIGHT) {
        el.style.height = el.scrollHeight + 'px';
        el.style.overflowY = 'hidden';
      } else {
        el.style.height = `${MAX_TEXTAREA_HEIGHT}px`;
        el.style.overflowY = 'auto';
      }
    }
  };

  useEffect(() => {
    reset({
      title: initialEvent?.title || '',
      description: initialEvent?.description || '',
      date: initialEvent ? dayjs(initialEvent.dateTime).format('YYYY-MM-DD') : initialDate.format('YYYY-MM-DD'),
      time: initialEvent ? dayjs(initialEvent.dateTime).format('HH:mm') : '09:00',
    });
  }, [initialEvent, initialDate]);

  useEffect(() => {
    resizeTextarea();
  }, [descriptionValue]);

  const handleFormSubmit: SubmitHandler<FormInputs> = data => {
    const combinedDateTime = dayjs(`${data.date} ${data.time}`).toISOString();

    const eventToSave: CalendarEvent = {
      id: initialEvent?.id || crypto.randomUUID(),
      title: data.title,
      description: data.description,
      dateTime: combinedDateTime,
    };

    onSubmit(eventToSave);

    reset({ title: '', description: '', date: initialDate.format('YYYY-MM-DD'), time: '09:00' });
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-3">
      <p className="font-semibold">{isEditing ? 'Edit Event' : 'New Event'}</p>
      <div className="flex gap-2">
        <input
          type="date"
          required
          {...register('date')}
          className="rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none disabled:bg-gray-100"
        />
        <input
          type="time"
          required
          {...register('time')}
          className="rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
        />
      </div>

      <div className="flex flex-col gap-2">
        <input
          type="text"
          required
          placeholder={isEditing ? 'Change event title...' : 'Add event title...'}
          {...register('title')}
          className="rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
        />
        <textarea
          {...register('description')}
          rows={1}
          placeholder={isEditing ? 'Change event description...' : 'Add event description...'}
          className="flex resize-none overflow-hidden rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
          ref={e => {
            register('description').ref(e);
            textareaRef.current = e;
          }}
        />
      </div>
      <div className="flex gap-2">
        <button
          type="submit"
          className="rounded bg-blue-600 p-2 text-white transition hover:bg-blue-700 disabled:opacity-50"
          disabled={!formState.isDirty}
        >
          <div className="flex items-center gap-2">
            {isEditing ? (
              <>
                <SaveIcon size={20} />
                <span>Update</span>
              </>
            ) : (
              <>
                <Plus size={20} />
                <span>Add</span>
              </>
            )}
          </div>
        </button>
        {isEditing && (
          <button
            type="button"
            onClick={onCancelEdit}
            className="flex items-center gap-2 rounded bg-gray-300 p-2 text-gray-700 hover:bg-gray-400"
          >
            <X size={20} /> Close
          </button>
        )}
      </div>
    </form>
  );
};

export default EventForm;
