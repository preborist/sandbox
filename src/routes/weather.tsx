import type { MetaFunction } from 'react-router';

import Weather from '@src/modules/weather';

export const meta: MetaFunction = () => [{ title: 'Weather - Sandbox' }, { name: 'description', content: '' }];

export default function Route() {
  return <Weather />;
}
