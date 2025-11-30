import type { MetaFunction } from 'react-router';

import Stopwatch from '@src/modules/stopwatch';

export const meta: MetaFunction = () => [{ title: 'Stopwatch - Sandbox' }, { name: 'description', content: '' }];

export default function Route() {
  return <Stopwatch />;
}
