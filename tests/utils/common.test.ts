import { describe, expect, it } from 'vitest';
import { isValidUrl } from '../../src/utils/common';
import { TEST_URLS } from '../consts';

describe('common utilities', () => {
  describe('isValidUrl', () => {
    it('should return true for valid HTTP URLs', () => {
      expect(isValidUrl('https://example.com')).toBe(true);
      expect(isValidUrl('http://example.com')).toBe(true);
    });

    it('should return true for valid YouTube URLs', () => {
      expect(isValidUrl(TEST_URLS.VALID_WATCH)).toBe(true);
      expect(isValidUrl(TEST_URLS.VALID_SHORT)).toBe(true);
      expect(isValidUrl(TEST_URLS.VALID_EMBED)).toBe(true);
    });

    it('should return false for invalid URLs', () => {
      expect(isValidUrl('not-a-url')).toBe(false);
      expect(isValidUrl('')).toBe(false);
    });

    it('should return false for null and undefined', () => {
      expect(isValidUrl(null as any)).toBe(false);
      expect(isValidUrl(undefined as any)).toBe(false);
    });

    it('should handle malformed URLs', () => {
      expect(isValidUrl('http://')).toBe(false);
      expect(isValidUrl('https://')).toBe(false);
    });

    it('should handle URLs without protocols', () => {
      expect(isValidUrl('example.com')).toBe(false);
      expect(isValidUrl('www.example.com')).toBe(false);
      expect(isValidUrl('youtube.com/watch?v=abc')).toBe(false);
    });

    it('should handle different protocols', () => {
      expect(isValidUrl('ftp://example.com')).toBe(true);
      expect(isValidUrl('file://example.com')).toBe(true);
      expect(isValidUrl('data:text/html,hello')).toBe(true);
    });

    it('should handle URLs with different domains', () => {
      expect(isValidUrl(TEST_URLS.INVALID_NON_YOUTUBE)).toBe(true);
      expect(isValidUrl(TEST_URLS.INVALID_VIMEO)).toBe(true);
    });

    it('should handle edge case URLs', () => {
      expect(isValidUrl('https://')).toBe(false);
      expect(isValidUrl('http://')).toBe(false);
      expect(isValidUrl('https:// ')).toBe(false);
      expect(isValidUrl('  https://example.com  ')).toBe(true);
    });
  });
});
