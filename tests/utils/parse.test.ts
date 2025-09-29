import { describe, expect, it } from 'vitest';
import { YOUTUBE_URLS } from '../../src/consts';
import {
  convertYouTubeToEmbedUrl,
  extractYouTubeVideoId,
  getYouTubeOEmbedUrl,
} from '../../src/utils/parse';
import { TEST_URLS, TEST_VIDEO_IDS } from '../consts';

describe('Parse Functions', () => {
  describe('extractYouTubeVideoId', () => {
    it('should extract video ID from standard YouTube URLs', () => {
      expect(extractYouTubeVideoId(TEST_URLS.VALID_WATCH)).toBe(
        TEST_VIDEO_IDS.RICK_ROLL
      );
      expect(extractYouTubeVideoId(TEST_URLS.VALID_WATCH_HTTP)).toBe(
        TEST_VIDEO_IDS.TEST_ID_1
      );
      expect(extractYouTubeVideoId(TEST_URLS.VALID_WATCH_11_CHARS)).toBe(
        TEST_VIDEO_IDS.TEST_ID_2
      );
    });

    it('should extract video ID from youtu.be URLs', () => {
      expect(extractYouTubeVideoId(TEST_URLS.VALID_SHORT)).toBe(
        TEST_VIDEO_IDS.RICK_ROLL
      );
      expect(extractYouTubeVideoId(TEST_URLS.VALID_SHORT_HTTP)).toBe(
        TEST_VIDEO_IDS.TEST_ID_1
      );
      expect(extractYouTubeVideoId(TEST_URLS.VALID_SHORT_11_CHARS)).toBe(
        TEST_VIDEO_IDS.TEST_ID_2
      );
    });

    it('should extract video ID from embed URLs', () => {
      expect(extractYouTubeVideoId(TEST_URLS.VALID_EMBED)).toBe(
        TEST_VIDEO_IDS.RICK_ROLL
      );
      expect(extractYouTubeVideoId(TEST_URLS.VALID_EMBED_HTTP)).toBe(
        TEST_VIDEO_IDS.TEST_ID_1
      );
    });

    it('should extract video ID from URLs with extra parameters', () => {
      expect(extractYouTubeVideoId(TEST_URLS.VALID_WATCH_WITH_PARAMS)).toBe(
        TEST_VIDEO_IDS.TEST_ID_2
      );

      expect(extractYouTubeVideoId(TEST_URLS.VALID_SHORT_WITH_PARAMS)).toBe(
        TEST_VIDEO_IDS.TEST_ID_2
      );
    });

    it('should handle URLs with whitespace', () => {
      expect(extractYouTubeVideoId(TEST_URLS.VALID_WITH_WHITESPACE)).toBe(
        TEST_VIDEO_IDS.RICK_ROLL
      );
    });

    it('should return null for invalid URLs', () => {
      expect(extractYouTubeVideoId(TEST_URLS.INVALID_EMPTY_VIDEO_ID)).toBe(
        null
      );
      expect(extractYouTubeVideoId(TEST_URLS.INVALID_NO_PARAMS)).toBe(null);
    });
  });

  describe('getYouTubeOEmbedUrl', () => {
    it('should return the correct oembed URL for valid YouTube video IDs', () => {
      const result = getYouTubeOEmbedUrl(TEST_VIDEO_IDS.RICK_ROLL);
      expect(result).toBe(
        `${YOUTUBE_URLS.OEMBED}?url=${YOUTUBE_URLS.WATCH}?v=${TEST_VIDEO_IDS.RICK_ROLL}&format=json`
      );
    });

    it('should return the oembed URL for any input (no validation)', () => {
      const result = getYouTubeOEmbedUrl('invalid-url');
      expect(result).toBe(
        `${YOUTUBE_URLS.OEMBED}?url=${YOUTUBE_URLS.WATCH}?v=invalid-url&format=json`
      );
    });

    it('should work with video IDs extracted from URLs', () => {
      const videoId = extractYouTubeVideoId(TEST_URLS.VALID_WATCH);
      const result = getYouTubeOEmbedUrl(videoId!);
      expect(result).toBe(
        `${YOUTUBE_URLS.OEMBED}?url=${YOUTUBE_URLS.WATCH}?v=${TEST_VIDEO_IDS.RICK_ROLL}&format=json`
      );
    });
  });

  describe('convertYouTubeToEmbedUrl', () => {
    it('should convert regular watch URLs to embed URLs', () => {
      const result = convertYouTubeToEmbedUrl(TEST_URLS.VALID_WATCH);
      expect(result).toBe(`${YOUTUBE_URLS.EMBED}/${TEST_VIDEO_IDS.RICK_ROLL}`);
    });

    it('should convert youtu.be URLs to embed URLs', () => {
      const result = convertYouTubeToEmbedUrl(TEST_URLS.VALID_SHORT_HTTP);
      expect(result).toBe(`${YOUTUBE_URLS.EMBED}/${TEST_VIDEO_IDS.TEST_ID_1}`);
    });

    it('should return null for invalid URLs', () => {
      const result = convertYouTubeToEmbedUrl(TEST_URLS.INVALID_NOT_URL);
      expect(result).toBe(null);
    });

    it('should preserve existing parameters from the original URL', () => {
      const result = convertYouTubeToEmbedUrl(
        TEST_URLS.VALID_WATCH_WITH_PARAMS
      );
      expect(result).toBe(
        `${YOUTUBE_URLS.EMBED}/${TEST_VIDEO_IDS.TEST_ID_2}?t=30s`
      );
    });

    it('should preserve parameters from youtu.be URLs', () => {
      const result = convertYouTubeToEmbedUrl(
        TEST_URLS.VALID_SHORT_WITH_PARAMS
      );
      expect(result).toBe(
        `${YOUTUBE_URLS.EMBED}/${TEST_VIDEO_IDS.TEST_ID_2}?t=30`
      );
    });
  });
});
