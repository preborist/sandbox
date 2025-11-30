import { type RouteConfig } from '@react-router/dev/routes';
import { flatRoutes } from '@react-router/fs-routes';

export default flatRoutes({
  // Ignore backup/temp files so they are not treated as routes
  ignoredRouteFiles: ['**/*.bak', '**/*.tmp', '**/~*', '**/#*#', '**/.#*', '**/*.swp'],
}) satisfies RouteConfig;
