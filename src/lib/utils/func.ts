import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

export function getRTKQueryErrorMessage(error?: FetchBaseQueryError | SerializedError | unknown): string | undefined {
  if (!error) return undefined;

  if ('status' in (error as FetchBaseQueryError)) {
    const fetchError = error as FetchBaseQueryError;
    const data = fetchError.data as any;

    if (data?.errors) {
      return Object.values(data.errors).flat().join(' ');
    }

    return data?.message || data?.detail || JSON.stringify(fetchError.data);
  }

  if ('message' in (error as SerializedError)) {
    return (error as SerializedError).message;
  }

  return 'An unknown error occurred';
}