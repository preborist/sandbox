import Planner from '@src/modules/planner';
import type { MetaFunction } from 'react-router';

export const meta: MetaFunction = () => [{ title: 'Planner - Sandbox' }, { name: 'description', content: '' }];

export default function Route() {
  return <Planner />;
}
