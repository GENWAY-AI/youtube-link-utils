import { YOUTUBE_URLS } from '../src/consts';

export const TEST_VIDEO_IDS = {
  RICK_ROLL: 'dQw4w9WgXcQ',
  TEST_ID_1: 'abc123DEF45',
  TEST_ID_2: 'test123test',
  TEST_ID_SPECIAL: 'test_video-1',
} as const;

// Valid YouTube URLs for testing
export const TEST_URLS = {
  // Standard youtube.com watch URLs
  VALID_WATCH: `${YOUTUBE_URLS.WATCH}?v=${TEST_VIDEO_IDS.RICK_ROLL}`,
  VALID_WATCH_HTTP: `http://youtube.com/watch?v=${TEST_VIDEO_IDS.TEST_ID_1}`,
  VALID_WATCH_WITH_PARAMS: `${YOUTUBE_URLS.WATCH}?v=${TEST_VIDEO_IDS.TEST_ID_2}&t=30s`,
  VALID_WATCH_11_CHARS: `${YOUTUBE_URLS.WATCH}?v=${TEST_VIDEO_IDS.TEST_ID_2}`,

  // youtu.be short URLs
  VALID_SHORT: `${YOUTUBE_URLS.SHORT_BASE}/${TEST_VIDEO_IDS.RICK_ROLL}`,
  VALID_SHORT_HTTP: `http://youtu.be/${TEST_VIDEO_IDS.TEST_ID_1}`,
  VALID_SHORT_WITH_PARAMS: `${YOUTUBE_URLS.SHORT_BASE}/${TEST_VIDEO_IDS.TEST_ID_2}?t=30`,
  VALID_SHORT_11_CHARS: `${YOUTUBE_URLS.SHORT_BASE}/${TEST_VIDEO_IDS.TEST_ID_2}`,

  // Embed URLs
  VALID_EMBED: `${YOUTUBE_URLS.EMBED}/${TEST_VIDEO_IDS.RICK_ROLL}`,
  VALID_EMBED_HTTP: `http://youtube.com/embed/${TEST_VIDEO_IDS.TEST_ID_1}`,
  VALID_EMBED_WITH_PARAMS: `${YOUTUBE_URLS.EMBED}/${TEST_VIDEO_IDS.TEST_ID_2}?autoplay=1`,

  // YouTube Shorts URLs
  VALID_SHORTS: `${YOUTUBE_URLS.SHORTS}/${TEST_VIDEO_IDS.RICK_ROLL}`,
  VALID_SHORTS_HTTP: `http://youtube.com/shorts/${TEST_VIDEO_IDS.TEST_ID_1}`,
  VALID_SHORTS_WITH_PARAMS: `${YOUTUBE_URLS.SHORTS}/${TEST_VIDEO_IDS.TEST_ID_2}?si=abc123`,

  // URLs with whitespace
  VALID_WITH_WHITESPACE: `  ${YOUTUBE_URLS.WATCH}?v=${TEST_VIDEO_IDS.RICK_ROLL}  `,

  // Invalid URLs for testing
  INVALID_EMPTY_VIDEO_ID: `${YOUTUBE_URLS.WATCH}?v=`,
  INVALID_NO_PARAMS: `${YOUTUBE_URLS.WATCH}`,
  INVALID_NO_PROTOCOL: 'youtube.com/watch?v=abc123',
  INVALID_EMPTY_EMBED: `${YOUTUBE_URLS.BASE_NO_WWW}/embed/`,
  INVALID_EMPTY_SHORT: `${YOUTUBE_URLS.SHORT_BASE}/`,
  INVALID_EMPTY_SHORTS: `${YOUTUBE_URLS.SHORTS}/`,
  INVALID_NON_YOUTUBE: 'https://www.example.com',
  INVALID_VIMEO: 'https://vimeo.com/123456',
  INVALID_NOT_URL: 'not-a-url',

  // Test video IDs for error cases
  INVALID_VIDEO_ID: `${YOUTUBE_URLS.WATCH}?v=invalid123`,
  INVALID_VIDEO_ID_11_CHARS: `${YOUTUBE_URLS.WATCH}?v=invalid123z`,
} as const;

// Expected oEmbed URLs
export const TEST_OEMBED_URLS = {
  RICK_ROLL: `${YOUTUBE_URLS.OEMBED}?url=${YOUTUBE_URLS.WATCH}?v=${TEST_VIDEO_IDS.RICK_ROLL}&format=json`,
} as const;

// Expected embed URLs
export const TEST_EMBED_URLS = {
  RICK_ROLL: `${YOUTUBE_URLS.EMBED}/${TEST_VIDEO_IDS.RICK_ROLL}?autoplay=1&controls=1&disablekb=1&modestbranding=1&rel=0`,
  TEST_ID_1: `${YOUTUBE_URLS.EMBED}/${TEST_VIDEO_IDS.TEST_ID_1}?autoplay=1&controls=1&disablekb=1&modestbranding=1&rel=0`,
} as const;

export const MOCK_VIDEO_INFO = {
  GENERIC: {
    title: 'Test Video',
    author_name: 'Test Author',
    thumbnail_url: 'https://example.com/thumb.jpg',
    html: '<iframe>...</iframe>',
  },
} as const;
