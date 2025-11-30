'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import dayjs from 'dayjs';
import localeData from 'dayjs/plugin/localeData';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import weekday from 'dayjs/plugin/weekday';
import { useState } from 'react';
import { Provider as StoreProvider } from 'react-redux';
import type { LinksFunction } from 'react-router';
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router';
import { Toaster } from 'sonner';

import MainLayout from './modules/layout';
import { store } from './store/store';

import 'dayjs/locale/en-ca';
import 'dayjs/locale/uk';

import './index.css';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(localizedFormat);
dayjs.extend(weekday);
dayjs.extend(localeData);
const userLocale = (typeof navigator !== 'undefined' && navigator.language) || 'en';
dayjs.locale(userLocale);

export const links: LinksFunction = () => [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  { rel: 'icon', href: '/favicon.ico', type: 'image/x-icon' },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap',
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnReconnect: true,
            refetchOnMount: false,
            refetchOnWindowFocus: false,
            retry: false,
            staleTime: 5 * 60 * 1000, // 5 min
          },
        },
      }),
  );
  return (
    <QueryClientProvider client={queryClient}>
      <StoreProvider store={store}>
        <MainLayout>
          <Outlet />
          <Toaster position="top-center" richColors />
        </MainLayout>
      </StoreProvider>
    </QueryClientProvider>
  );
}

export function HydrateFallback() {
  return (
    <div id="hydrate-fallback" className="flex h-full items-center justify-center">
      Loading...
    </div>
  );
}
