import { vi } from 'vitest';

/**
 * Axios mock - provides all common axios methods as Vitest mock functions
 * This allows tests to control axios behavior without making actual HTTP requests
 */
export default {
  get: vi.fn(),
  post: vi.fn(),
  put: vi.fn(),
  delete: vi.fn(),
  patch: vi.fn(),
  create: vi.fn(() => ({
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
    patch: vi.fn(),
  })),
};
