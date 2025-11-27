import '@testing-library/jest-dom/vitest'; // eslint-disable-line import/no-unassigned-import
import 'vitest-axe/extend-expect'; // eslint-disable-line import/no-unassigned-import

import { cleanup } from '@testing-library/react/pure';
import { afterAll, afterEach, beforeAll } from 'vitest';

import { server } from '@/mocks/server';

// Start MSW server before all tests
beforeAll(() => {
  server.listen({ onUnhandledRequest: 'warn' });
});

// Reset handlers after each test to ensure test isolation
afterEach(() => {
  cleanup();
  server.resetHandlers();
});

// Clean up after all tests
afterAll(() => {
  server.close();
});
