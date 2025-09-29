# React Hook Tests

This directory contains tests for React hooks provided by the youtube-link-utils library.

## Setup

The tests use:

- **Vitest** as the test runner
- **React Testing Library** (specifically `@testing-library/react-hooks` for hook testing)
- **Happy DOM** as the DOM environment
- **Mocked utilities** for isolated testing

## Testing Strategy

### useYouTubeValidationLoading Hook Tests

The `useYouTubeValidationLoading.test.ts` file tests:

1. **Initialization**: Verifies default state and function availability
2. **Validation logic**: Tests different URL validation scenarios
3. **Loading states**: Ensures proper loading state management during async operations
4. **Error handling**: Tests behavior when validation fails or throws errors
5. **Caching**: Verifies that the same URL won't be validated twice
6. **State clearing**: Tests the clearValidation functionality
7. **Hook stability**: Ensures function references remain stable across re-renders

### Key Testing Patterns

- **Mocking**: External dependencies (`isValidYouTubeUrl`, `validateYouTubeVideoExists`) are mocked
- **Async testing**: Uses controlled promises with timeouts to properly test loading states
- **Act wrapping**: Properly wraps state updates in `act()` calls
- **Isolation**: Each test clears mocks to ensure clean state

## Running Tests

```bash
# Run all tests
npm test

# Run only React hook tests
npm test -- tests/react/hooks/useYouTubeValidationLoading.test.ts

# Run tests in watch mode
npm run test:watch
```

## Coverage

The tests provide comprehensive coverage of all hook functionality, including edge cases and error scenarios.
