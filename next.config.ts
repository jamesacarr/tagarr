import type { NextConfig } from 'next';
import { withWorkflow } from 'workflow/next';

const config: NextConfig = {
  output: 'standalone',

  // Remove the x-powered-by: next headers
  poweredByHeader: false,

  typedRoutes: true,
};

export default withWorkflow(config);
