import type { LinksFunction } from 'react-router';
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router';

import './index.css';
import MainLayout from './modules/layout';
import { Provider as StoreProvider } from 'react-redux';
import { store } from './store/store';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import weekday from 'dayjs/plugin/weekday';
import localeData from 'dayjs/plugin/localeData';
import 'dayjs/locale/en-ca';
import 'dayjs/locale/uk';

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
  return (
    <StoreProvider store={store}>
      <MainLayout>
        <Outlet />
      </MainLayout>
    </StoreProvider>
  );
}

export function HydrateFallback() {
  return (
    <div id="hydrate-fallback" className="flex h-full items-center justify-center">
      Loading...
    </div>
  );
}
