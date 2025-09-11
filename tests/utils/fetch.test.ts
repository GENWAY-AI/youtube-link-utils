import axios from 'axios';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { YOUTUBE_URLS } from '../../src/consts';
import { getYouTubeVideoInfo } from '../../src/utils/fetch';
import { MOCK_VIDEO_INFO, TEST_URLS, TEST_VIDEO_IDS } from '../consts';

const mockedAxios = axios as any;

describe('Fetch Functions', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getYouTubeVideoInfo', () => {
    it('should return video info for valid YouTube URLs', async () => {
      mockedAxios.get.mockResolvedValue({
        status: 200,
        data: MOCK_VIDEO_INFO.GENERIC,
      });

      const result = await getYouTubeVideoInfo(TEST_URLS.VALID_WATCH);

      expect(result).toEqual(MOCK_VIDEO_INFO.GENERIC);
      expect(mockedAxios.get).toHaveBeenCalledWith(
        expect.stringContaining(YOUTUBE_URLS.OEMBED),
        expect.objectContaining({
          headers: { 'Content-Type': 'application/json' },
        })
      );
    });

    it('should return video info for different YouTube URL formats', async () => {
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
        const result = await getYouTubeVideoInfo(url);
        expect(result).toEqual(MOCK_VIDEO_INFO.GENERIC);
      }
    });

    it('should return video info for URLs with parameters', async () => {
      mockedAxios.get.mockResolvedValue({
        status: 200,
        data: MOCK_VIDEO_INFO.GENERIC,
      });

      const result = await getYouTubeVideoInfo(
        TEST_URLS.VALID_WATCH_WITH_PARAMS
      );
      expect(result).toEqual(MOCK_VIDEO_INFO.GENERIC);
    });

    it('should handle URLs with whitespace', async () => {
      mockedAxios.get.mockResolvedValue({
        status: 200,
        data: MOCK_VIDEO_INFO.GENERIC,
      });

      const result = await getYouTubeVideoInfo(TEST_URLS.VALID_WITH_WHITESPACE);
      expect(result).toEqual(MOCK_VIDEO_INFO.GENERIC);
    });

    it('should return null for invalid YouTube URLs', async () => {
      const invalidUrls = [
        TEST_URLS.INVALID_NOT_URL,
        TEST_URLS.INVALID_NON_YOUTUBE,
        TEST_URLS.INVALID_VIMEO,
        TEST_URLS.INVALID_EMPTY_VIDEO_ID,
        TEST_URLS.INVALID_NO_PARAMS,
      ];

      for (const url of invalidUrls) {
        const result = await getYouTubeVideoInfo(url);
        expect(result).toBeNull();
      }

      expect(mockedAxios.get).not.toHaveBeenCalled();
    });

    it('should return null for URLs without extractable video IDs', async () => {
      const result = await getYouTubeVideoInfo(
        TEST_URLS.INVALID_EMPTY_VIDEO_ID
      );
      expect(result).toBeNull();
      expect(mockedAxios.get).not.toHaveBeenCalled();
    });

    it('should return null when video does not exist', async () => {
      mockedAxios.get.mockRejectedValue(new Error('Video not found'));

      const result = await getYouTubeVideoInfo(TEST_URLS.VALID_WATCH);
      expect(result).toBeNull();
    });

    it('should return null on network errors', async () => {
      mockedAxios.get.mockRejectedValue(new Error('Network error'));

      const result = await getYouTubeVideoInfo(TEST_URLS.VALID_WATCH);
      expect(result).toBeNull();
    });

    it('should return null on HTTP errors', async () => {
      mockedAxios.get.mockRejectedValue({ response: { status: 404 } });

      const result = await getYouTubeVideoInfo(TEST_URLS.VALID_WATCH);
      expect(result).toBeNull();
    });

    it('should return null on axios timeout', async () => {
      mockedAxios.get.mockRejectedValue(
        new Error('timeout of 5000ms exceeded')
      );

      const result = await getYouTubeVideoInfo(TEST_URLS.VALID_WATCH);
      expect(result).toBeNull();
    });

    it('should handle malformed response data', async () => {
      mockedAxios.get.mockResolvedValue({
        status: 200,
        data: null,
      });

      const result = await getYouTubeVideoInfo(TEST_URLS.VALID_WATCH);
      expect(result).toBeNull();
    });

    it('should handle missing response data fields', async () => {
      mockedAxios.get.mockResolvedValue({
        status: 200,
        data: { title: 'Test Video' },
      });

      const result = await getYouTubeVideoInfo(TEST_URLS.VALID_WATCH);
      expect(result).toEqual({ title: 'Test Video' });
    });

    it('should call correct oEmbed URL with video id', async () => {
      mockedAxios.get.mockResolvedValue({
        status: 200,
        data: MOCK_VIDEO_INFO.GENERIC,
      });

      await getYouTubeVideoInfo(TEST_URLS.VALID_WATCH);

      expect(mockedAxios.get).toHaveBeenCalledWith(
        `${YOUTUBE_URLS.OEMBED}?url=${YOUTUBE_URLS.WATCH}?v=${TEST_VIDEO_IDS.RICK_ROLL}&format=json`,
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );
    });

    it('should handle different video IDs correctly', async () => {
      mockedAxios.get.mockResolvedValue({
        status: 200,
        data: MOCK_VIDEO_INFO.GENERIC,
      });

      await getYouTubeVideoInfo(TEST_URLS.VALID_WATCH_HTTP);

      expect(mockedAxios.get).toHaveBeenCalledWith(
        `${YOUTUBE_URLS.OEMBED}?url=${YOUTUBE_URLS.WATCH}?v=abc123DEF45&format=json`,
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );
    });

    it('should handle null and undefined inputs', async () => {
      expect(await getYouTubeVideoInfo(null as any)).toBeNull();
      expect(await getYouTubeVideoInfo(undefined as any)).toBeNull();
      expect(await getYouTubeVideoInfo('')).toBeNull();

      expect(mockedAxios.get).not.toHaveBeenCalled();
    });

    it('should handle non-string inputs', async () => {
      expect(await getYouTubeVideoInfo(123 as any)).toBeNull();
      expect(await getYouTubeVideoInfo({} as any)).toBeNull();
      expect(await getYouTubeVideoInfo([] as any)).toBeNull();

      expect(mockedAxios.get).not.toHaveBeenCalled();
    });

    it('should handle axios instance response format', async () => {
      const mockResponse = {
        data: MOCK_VIDEO_INFO.GENERIC,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {},
      };

      mockedAxios.get.mockResolvedValue(mockResponse);

      const result = await getYouTubeVideoInfo(TEST_URLS.VALID_WATCH);
      expect(result).toEqual(MOCK_VIDEO_INFO.GENERIC);
    });

    it('should maintain request headers consistency', async () => {
      mockedAxios.get.mockResolvedValue({
        status: 200,
        data: MOCK_VIDEO_INFO.GENERIC,
      });

      await getYouTubeVideoInfo(TEST_URLS.VALID_WATCH);
      await getYouTubeVideoInfo(TEST_URLS.VALID_SHORT);

      // Verify headers are consistent across calls
      expect(mockedAxios.get).toHaveBeenCalledTimes(2);
      expect(mockedAxios.get).toHaveBeenNthCalledWith(
        1,
        expect.any(String),
        expect.objectContaining({
          headers: { 'Content-Type': 'application/json' },
        })
      );
      expect(mockedAxios.get).toHaveBeenNthCalledWith(
        2,
        expect.any(String),
        expect.objectContaining({
          headers: { 'Content-Type': 'application/json' },
        })
      );
    });
  });
});
