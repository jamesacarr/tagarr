import type { NextConfig } from 'next';
import { withWorkflow } from 'workflow/next';

const config: NextConfig = {
  compiler: {
    reactRemoveProperties: true,
  },
  output: 'standalone',
  // Remove the x-powered-by: next headers
  poweredByHeader: false,
  serverExternalPackages: ['pino'],
  typedRoutes: true,
};

export default withWorkflow(config);
