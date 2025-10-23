import axios from 'axios';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { YOUTUBE_URLS } from '../../src/consts';
import {
  isValidYouTubeUrl,
  validateYouTubeUrlComprehensive,
  validateYouTubeVideoExists,
} from '../../src/utils/validate';
import { MOCK_VIDEO_INFO, TEST_URLS } from '../consts';

const mockedAxios = axios as any;

describe('Validation Functions', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('isValidYouTubeUrl', () => {
    it('should return true for valid YouTube URLs', () => {
      expect(isValidYouTubeUrl(TEST_URLS.VALID_WATCH)).toBe(true);
      expect(isValidYouTubeUrl(TEST_URLS.VALID_WATCH_HTTP)).toBe(true);
      expect(isValidYouTubeUrl(TEST_URLS.VALID_SHORT)).toBe(true);
      expect(isValidYouTubeUrl(TEST_URLS.VALID_SHORT_HTTP)).toBe(true);
      expect(isValidYouTubeUrl(TEST_URLS.VALID_EMBED)).toBe(true);
      expect(isValidYouTubeUrl(TEST_URLS.VALID_EMBED_HTTP)).toBe(true);
      expect(isValidYouTubeUrl(TEST_URLS.VALID_SHORTS)).toBe(true);
      expect(isValidYouTubeUrl(TEST_URLS.VALID_SHORTS_HTTP)).toBe(true);
    });

    it('should return true for YouTube URLs with parameters', () => {
      expect(isValidYouTubeUrl(TEST_URLS.VALID_WATCH_WITH_PARAMS)).toBe(true);
      expect(isValidYouTubeUrl(TEST_URLS.VALID_SHORT_WITH_PARAMS)).toBe(true);
      expect(isValidYouTubeUrl(TEST_URLS.VALID_EMBED_WITH_PARAMS)).toBe(true);
      expect(isValidYouTubeUrl(TEST_URLS.VALID_SHORTS_WITH_PARAMS)).toBe(true);
    });

    it('should handle URLs with whitespace', () => {
      expect(isValidYouTubeUrl(TEST_URLS.VALID_WITH_WHITESPACE)).toBe(true);
    });

    it('should return false for invalid YouTube URLs', () => {
      expect(isValidYouTubeUrl(TEST_URLS.INVALID_EMPTY_VIDEO_ID)).toBe(false);
      expect(isValidYouTubeUrl(TEST_URLS.INVALID_NO_PARAMS)).toBe(false);
      expect(isValidYouTubeUrl(TEST_URLS.INVALID_NO_PROTOCOL)).toBe(false);
      expect(isValidYouTubeUrl(TEST_URLS.INVALID_EMPTY_EMBED)).toBe(false);
      expect(isValidYouTubeUrl(TEST_URLS.INVALID_EMPTY_SHORT)).toBe(false);
      expect(isValidYouTubeUrl(TEST_URLS.INVALID_EMPTY_SHORTS)).toBe(false);
      expect(isValidYouTubeUrl(TEST_URLS.INVALID_NON_YOUTUBE)).toBe(false);
      expect(isValidYouTubeUrl(TEST_URLS.INVALID_VIMEO)).toBe(false);
      expect(isValidYouTubeUrl(TEST_URLS.INVALID_NOT_URL)).toBe(false);
    });

    it('should handle null and undefined inputs', () => {
      expect(isValidYouTubeUrl(null as any)).toBe(false);
      expect(isValidYouTubeUrl(undefined as any)).toBe(false);
      expect(isValidYouTubeUrl('')).toBe(false);
    });

    it('should handle non-string inputs', () => {
      expect(isValidYouTubeUrl(123 as any)).toBe(false);
      expect(isValidYouTubeUrl({} as any)).toBe(false);
      expect(isValidYouTubeUrl([] as any)).toBe(false);
    });
  });

  describe('validateYouTubeVideoExists', () => {
    it('should return true for existing YouTube videos', async () => {
      mockedAxios.get.mockResolvedValue({
        status: 200,
        data: MOCK_VIDEO_INFO.GENERIC,
      });

      const result = await validateYouTubeVideoExists(TEST_URLS.VALID_WATCH);
      expect(result).toBe(true);
      expect(mockedAxios.get).toHaveBeenCalledWith(
        expect.stringContaining(YOUTUBE_URLS.OEMBED),
        expect.objectContaining({
          headers: { 'Content-Type': 'application/json' },
        })
      );
    });

    it('should return false for non-existing YouTube videos', async () => {
      mockedAxios.get.mockRejectedValue(new Error('Video not found'));

      const result = await validateYouTubeVideoExists(TEST_URLS.VALID_WATCH);
      expect(result).toBe(false);
    });

    it('should return false for invalid YouTube URLs', async () => {
      const result = await validateYouTubeVideoExists(
        TEST_URLS.INVALID_NOT_URL
      );
      expect(result).toBe(false);
      expect(mockedAxios.get).not.toHaveBeenCalled();
    });

    it('should return false for URLs without video IDs', async () => {
      const result = await validateYouTubeVideoExists(
        TEST_URLS.INVALID_EMPTY_VIDEO_ID
      );
      expect(result).toBe(false);
      expect(mockedAxios.get).not.toHaveBeenCalled();
    });

    it('should handle network errors gracefully', async () => {
      mockedAxios.get.mockRejectedValue(new Error('Network error'));

      const result = await validateYouTubeVideoExists(TEST_URLS.VALID_WATCH);
      expect(result).toBe(false);
    });

    it('should handle HTTP error responses', async () => {
      mockedAxios.get.mockResolvedValue({ status: 404, data: null });

      const result = await validateYouTubeVideoExists(TEST_URLS.VALID_WATCH);
      expect(result).toBe(false);
    });
  });

  describe('validateYouTubeUrlComprehensive', () => {
    it('should return comprehensive validation for valid existing videos', async () => {
      mockedAxios.get.mockResolvedValue({
        status: 200,
        data: MOCK_VIDEO_INFO.GENERIC,
      });

      const result = await validateYouTubeUrlComprehensive(
        TEST_URLS.VALID_WATCH
      );

      expect(result.isValid).toBe(true);
      expect(result.isValidFormat).toBe(true);
      expect(result.videoExists).toBe(true);
      expect(result.videoInfo).toEqual(MOCK_VIDEO_INFO.GENERIC);
      expect(result.error).toBeUndefined();
    });

    it('should return validation result for valid format without existence check', async () => {
      const result = await validateYouTubeUrlComprehensive(
        TEST_URLS.VALID_WATCH,
        false
      );

      expect(result.isValid).toBe(true);
      expect(result.isValidFormat).toBe(true);
      expect(result.videoExists).toBeUndefined();
      expect(result.videoInfo).toBeUndefined();
      expect(result.error).toBeUndefined();
      expect(mockedAxios.get).not.toHaveBeenCalled();
    });

    it('should return error for invalid URL format', async () => {
      const result = await validateYouTubeUrlComprehensive(
        TEST_URLS.INVALID_NOT_URL
      );

      expect(result.isValid).toBe(false);
      expect(result.isValidFormat).toBe(false);
      expect(result.videoExists).toBeUndefined();
      expect(result.videoInfo).toBeUndefined();
      expect(result.error).toBe('Invalid YouTube URL format');
      expect(mockedAxios.get).not.toHaveBeenCalled();
    });

    it('should return error for non-existing videos', async () => {
      mockedAxios.get.mockRejectedValue(new Error('Video not found'));

      const result = await validateYouTubeUrlComprehensive(
        TEST_URLS.VALID_WATCH
      );

      expect(result.isValid).toBe(false);
      expect(result.isValidFormat).toBe(true);
      expect(result.videoExists).toBe(false);
      expect(result.videoInfo).toBeUndefined();
      expect(result.error).toBe('YouTube video not found or not accessible');
    });

    it('should handle validation errors gracefully', async () => {
      mockedAxios.get.mockRejectedValue(new Error('Unexpected error'));

      const result = await validateYouTubeUrlComprehensive(
        TEST_URLS.VALID_WATCH
      );

      expect(result.isValid).toBe(false);
      expect(result.isValidFormat).toBe(true);
      expect(result.error).toBe('YouTube video not found or not accessible');
    });

    it('should handle different YouTube URL formats', async () => {
      mockedAxios.get.mockResolvedValue({
        status: 200,
        data: MOCK_VIDEO_INFO.GENERIC,
      });

      const urls = [
        TEST_URLS.VALID_WATCH,
        TEST_URLS.VALID_SHORT,
        TEST_URLS.VALID_EMBED,
      ];

      for (const url of urls) {
        const result = await validateYouTubeUrlComprehensive(url);
        expect(result.isValid).toBe(true);
        expect(result.isValidFormat).toBe(true);
      }
    });

    it('should handle whitespace in URLs', async () => {
      mockedAxios.get.mockResolvedValue({
        status: 200,
        data: MOCK_VIDEO_INFO.GENERIC,
      });

      const result = await validateYouTubeUrlComprehensive(
        TEST_URLS.VALID_WITH_WHITESPACE
      );

      expect(result.isValid).toBe(true);
      expect(result.isValidFormat).toBe(true);
      expect(result.videoExists).toBe(true);
    });
  });

  describe('Cross-function consistency', () => {
    it('should maintain consistency between validation functions', () => {
      const testUrl = TEST_URLS.VALID_WATCH;
      expect(isValidYouTubeUrl(testUrl)).toBe(true);
    });

    it('should handle invalid URLs consistently across functions', async () => {
      const invalidUrls = [
        TEST_URLS.INVALID_EMPTY_VIDEO_ID,
        TEST_URLS.INVALID_NO_PARAMS,
        TEST_URLS.INVALID_NON_YOUTUBE,
        TEST_URLS.INVALID_NOT_URL,
      ];

      for (const url of invalidUrls) {
        expect(isValidYouTubeUrl(url)).toBe(false);

        const existsResult = await validateYouTubeVideoExists(url);
        expect(existsResult).toBe(false);

        const comprehensiveResult = await validateYouTubeUrlComprehensive(url);
        expect(comprehensiveResult.isValidFormat).toBe(false);
      }
    });
  });
});
