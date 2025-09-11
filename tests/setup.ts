import { vi } from 'vitest';

/**
 * Test setup file - runs before all test files
 * Registers global mocks that will be applied before any imports
 */

// Mock axios before any imports
vi.mock('axios', () => import('./mocks/axios'));
