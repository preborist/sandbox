import { isAxiosError } from 'axios';

export function getAxiosErrorMessage(error?: unknown): string | undefined {
  if (error && isAxiosError(error)) {
    if (error.response?.data?.errors) return Object.values(error.response.data.errors).flat().join(' ');
    return error.response?.data?.message || error.response?.data?.detail || error?.message;
  }
}
