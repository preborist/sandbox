import type { Config } from '@react-router/dev/config';

const repoName = 'sandbox'; 
const isProd = process.env.NODE_ENV === 'production';

export default {
  ssr: false,
  appDirectory: 'src',
  basename: isProd ? `/${repoName}` : undefined,
} satisfies Config;
