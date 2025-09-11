import { act, renderHook } from '@testing-library/react-hooks';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { YOUTUBE_URLS } from '../../../src';
import { useYouTubeValidationLoading } from '../../../src/react/hooks/useYouTubeValidationLoading';
import { TEST_URLS } from '../../consts';

vi.mock('../../../src/utils', () => ({
  isValidYouTubeUrl: vi.fn(),
  validateYouTubeVideoExists: vi.fn(),
}));

const mockIsValidYouTubeUrl = vi.mocked(
  (await import('../../../src/utils')).isValidYouTubeUrl
);
const mockValidateYouTubeVideoExists = vi.mocked(
  (await import('../../../src/utils')).validateYouTubeVideoExists
);

describe('useYouTubeValidationLoading', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should initialize with default values', () => {
    const { result } = renderHook(() => useYouTubeValidationLoading());

    expect(result.current.isValidating).toBe(false);
    expect(typeof result.current.validateWithLoading).toBe('function');
    expect(typeof result.current.clearValidation).toBe('function');
  });

  describe('validateWithLoading', () => {
    it('should return true for empty or whitespace-only URL without validation', async () => {
      const { result } = renderHook(() => useYouTubeValidationLoading());

      await act(async () => {
        const emptyResult = await result.current.validateWithLoading('');
        expect(emptyResult).toBe(true);

        const whitespaceResult =
          await result.current.validateWithLoading('   ');
        expect(whitespaceResult).toBe(true);
      });

      expect(mockIsValidYouTubeUrl).not.toHaveBeenCalled();
      expect(mockValidateYouTubeVideoExists).not.toHaveBeenCalled();
      expect(result.current.isValidating).toBe(false);
    });

    it('should return true for the same URL without revalidation', async () => {
      const { result } = renderHook(() => useYouTubeValidationLoading());
      const testUrl = TEST_URLS.VALID_WATCH;

      mockIsValidYouTubeUrl.mockReturnValue(true);
      mockValidateYouTubeVideoExists.mockResolvedValue(true);

      await act(async () => {
        await result.current.validateWithLoading(testUrl);
      });

      expect(mockValidateYouTubeVideoExists).toHaveBeenCalledTimes(1);

      await act(async () => {
        const result2 = await result.current.validateWithLoading(testUrl);
        expect(result2).toBe(true);
      });

      expect(mockValidateYouTubeVideoExists).toHaveBeenCalledTimes(1);
    });

    it('should return false for invalid YouTube URL format', async () => {
      const { result } = renderHook(() => useYouTubeValidationLoading());
      const invalidUrl = 'https://example.com/not-youtube';

      mockIsValidYouTubeUrl.mockReturnValue(false);

      await act(async () => {
        const validationResult =
          await result.current.validateWithLoading(invalidUrl);
        expect(validationResult).toBe(false);
      });

      expect(mockIsValidYouTubeUrl).toHaveBeenCalledWith(invalidUrl);
      expect(mockValidateYouTubeVideoExists).not.toHaveBeenCalled();
      expect(result.current.isValidating).toBe(false);
    });

    it('should handle successful validation with loading states', async () => {
      const { result } = renderHook(() => useYouTubeValidationLoading());
      const validUrl = TEST_URLS.VALID_WATCH;

      mockIsValidYouTubeUrl.mockReturnValue(true);

      const delayedPromise = new Promise<boolean>(resolve => {
        setTimeout(() => resolve(true), 100);
      });
      mockValidateYouTubeVideoExists.mockReturnValue(delayedPromise);

      let validationPromise: Promise<boolean> | undefined = undefined;
      act(() => {
        validationPromise = result.current.validateWithLoading(validUrl);
      });

      expect(result.current.isValidating).toBe(true);

      let validationResult: boolean | undefined = undefined;
      await act(async () => {
        validationResult = await validationPromise;
      });

      expect(validationResult).toBe(true);
      expect(mockIsValidYouTubeUrl).toHaveBeenCalledWith(validUrl);
      expect(mockValidateYouTubeVideoExists).toHaveBeenCalledWith(validUrl);
      expect(result.current.isValidating).toBe(false);
    });

    it('should handle validation failure with loading states', async () => {
      const { result } = renderHook(() => useYouTubeValidationLoading());
      const validUrl = `${YOUTUBE_URLS.WATCH}?v=nonexistent`;

      mockIsValidYouTubeUrl.mockReturnValue(true);

      const delayedPromise = new Promise<boolean>(resolve => {
        setTimeout(() => resolve(false), 100);
      });
      mockValidateYouTubeVideoExists.mockReturnValue(delayedPromise);

      let validationPromise: Promise<boolean> | undefined = undefined;
      act(() => {
        validationPromise = result.current.validateWithLoading(validUrl);
      });

      expect(result.current.isValidating).toBe(true);

      let validationResult: boolean | undefined = undefined;
      await act(async () => {
        validationResult = await validationPromise;
      });

      expect(validationResult).toBe(false);
      expect(mockValidateYouTubeVideoExists).toHaveBeenCalledWith(validUrl);
      expect(result.current.isValidating).toBe(false);
    });

    it('should handle validation error with loading states', async () => {
      const { result } = renderHook(() => useYouTubeValidationLoading());
      const validUrl = `${YOUTUBE_URLS.WATCH}?v=error`;

      mockIsValidYouTubeUrl.mockReturnValue(true);

      const delayedPromise = new Promise<boolean>((_, reject) => {
        setTimeout(() => reject(new Error('Network error')), 100);
      });
      mockValidateYouTubeVideoExists.mockReturnValue(delayedPromise);

      let validationPromise: Promise<boolean> | undefined = undefined;
      act(() => {
        validationPromise = result.current.validateWithLoading(validUrl);
      });

      expect(result.current.isValidating).toBe(true);

      let validationResult: boolean | undefined = undefined;
      await act(async () => {
        validationResult = await validationPromise;
      });

      expect(validationResult).toBe(false);
      expect(mockValidateYouTubeVideoExists).toHaveBeenCalledWith(validUrl);
      expect(result.current.isValidating).toBe(false);
    });

    it('should trim URLs before validation', async () => {
      const { result } = renderHook(() => useYouTubeValidationLoading());
      const urlWithSpaces = `  ${YOUTUBE_URLS.WATCH}?v=test123  `;
      const trimmedUrl = `${YOUTUBE_URLS.WATCH}?v=test123`;

      mockIsValidYouTubeUrl.mockReturnValue(true);
      mockValidateYouTubeVideoExists.mockResolvedValue(true);

      await act(async () => {
        await result.current.validateWithLoading(urlWithSpaces);
      });

      expect(mockIsValidYouTubeUrl).toHaveBeenCalledWith(trimmedUrl);
      expect(mockValidateYouTubeVideoExists).toHaveBeenCalledWith(trimmedUrl);
    });

    it('should handle concurrent validations properly', async () => {
      const { result } = renderHook(() => useYouTubeValidationLoading());
      const url1 = `${YOUTUBE_URLS.WATCH}?v=test1`;
      const url2 = `${YOUTUBE_URLS.WATCH}?v=test2`;

      mockIsValidYouTubeUrl.mockReturnValue(true);
      mockValidateYouTubeVideoExists
        .mockImplementationOnce(
          () => new Promise(resolve => setTimeout(() => resolve(true), 100))
        )
        .mockImplementationOnce(() => Promise.resolve(false));

      await act(async () => {
        const promise1 = result.current.validateWithLoading(url1);
        const promise2 = result.current.validateWithLoading(url2);

        const [result1, result2] = await Promise.all([promise1, promise2]);

        expect(result1).toBe(true);
        expect(result2).toBe(false);
      });

      expect(mockValidateYouTubeVideoExists).toHaveBeenCalledWith(url1);
      expect(mockValidateYouTubeVideoExists).toHaveBeenCalledWith(url2);
    });
  });

  describe('clearValidation', () => {
    it('should reset validation state', async () => {
      const { result } = renderHook(() => useYouTubeValidationLoading());
      const validUrl = TEST_URLS.VALID_WATCH;

      mockIsValidYouTubeUrl.mockReturnValue(true);
      mockValidateYouTubeVideoExists.mockResolvedValue(true);

      await act(async () => {
        await result.current.validateWithLoading(validUrl);
      });

      act(() => {
        result.current.clearValidation();
      });

      expect(result.current.isValidating).toBe(false);

      await act(async () => {
        await result.current.validateWithLoading(validUrl);
      });

      expect(mockValidateYouTubeVideoExists).toHaveBeenCalledTimes(2);
    });

    it('should stop loading state when clearing validation', async () => {
      const { result } = renderHook(() => useYouTubeValidationLoading());
      const validUrl = TEST_URLS.VALID_WATCH;

      mockIsValidYouTubeUrl.mockReturnValue(true);
      mockValidateYouTubeVideoExists.mockImplementation(
        () => new Promise(resolve => setTimeout(() => resolve(true), 1000))
      );

      act(() => {
        result.current.validateWithLoading(validUrl);
      });

      expect(result.current.isValidating).toBe(true);

      act(() => {
        result.current.clearValidation();
      });

      expect(result.current.isValidating).toBe(false);
    });
  });
});
