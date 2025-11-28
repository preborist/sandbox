import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CalendarEvent {
  id: string;
  title: string;
  dateTime: string; // ISO string
  description?: string;
}

interface CalendarState {
  events: CalendarEvent[];
}

const loadEventsFromStorage = (): CalendarEvent[] => {
  try {
    const serializedState = localStorage.getItem('calendar_events');
    if (serializedState === null) {
      return [];
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return [];
  }
};

const initialState: CalendarState = {
  events: loadEventsFromStorage(),
};

const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    addEvent: (state, action: PayloadAction<CalendarEvent>) => {
      state.events.push(action.payload);
      localStorage.setItem('calendar_events', JSON.stringify(state.events));
    },
    editEvent: (state, action: PayloadAction<CalendarEvent>) => {
      const index = state.events.findIndex(e => e.id === action.payload.id);
      if (index !== -1) {
        state.events[index] = action.payload;
        localStorage.setItem('calendar_events', JSON.stringify(state.events));
      }
    },
    deleteEvent: (state, action: PayloadAction<string>) => {
      state.events = state.events.filter(e => e.id !== action.payload);
      localStorage.setItem('calendar_events', JSON.stringify(state.events));
    },
  },
});

export const { addEvent, editEvent, deleteEvent } = calendarSlice.actions;
export default calendarSlice.reducer;
