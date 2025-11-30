import type { MetaFunction } from 'react-router';

import Planner from '@src/modules/planner';

export const meta: MetaFunction = () => [{ title: 'Planner - Sandbox' }, { name: 'description', content: '' }];

export default function Route() {
  return <Planner />;
}
