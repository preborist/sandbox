import Stopwatch from '@src/modules/stopwatch';
import type { MetaFunction } from 'react-router';

export const meta: MetaFunction = () => [{ title: 'Stopwatch - Sandbox' }, { name: 'description', content: '' }];

export default function Route() {
  return <Stopwatch />;
}
