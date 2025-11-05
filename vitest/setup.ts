import '@testing-library/jest-dom/vitest'; // eslint-disable-line import/no-unassigned-import
import 'vitest-axe/extend-expect'; // eslint-disable-line import/no-unassigned-import

import { cleanup } from '@testing-library/react/pure';
import { afterEach } from 'vitest';

afterEach(() => {
  cleanup();
});
