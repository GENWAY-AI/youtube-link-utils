// YouTube URL base constants
export const YOUTUBE_URLS = {
  BASE: 'https://www.youtube.com',
  BASE_NO_WWW: 'https://youtube.com',
  SHORT_BASE: 'https://youtu.be',
  WATCH: 'https://www.youtube.com/watch',
  EMBED: 'https://www.youtube.com/embed',
  OEMBED: 'https://www.youtube.com/oembed',
} as const;

// YouTube URL patterns to match various YouTube URL formats
export const YOUTUBE_URL_PATTERNS = [
  /^https?:\/\/(www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})(&.*)?$/,
  /^https?:\/\/youtu\.be\/([a-zA-Z0-9_-]{11})(\?.*)?$/,
  /^https?:\/\/(www\.)?youtube\.com\/embed\/([a-zA-Z0-9_-]{11})(\?.*)?$/,
  /^https?:\/\/(www\.)?youtube\.com\/playlist\?list=([a-zA-Z0-9_-]+)(&.*)?$/,
] as const;

// Mapping of pattern index to the capture group index that contains the video/playlist ID
export const PATTERN_VIDEO_ID_GROUPS = [
  2, // youtube.com/watch - video ID is in group 2
  1, // youtu.be - video ID is in group 1
  2, // youtube.com/embed - video ID is in group 2
  2, // youtube.com/playlist - playlist ID is in group 2
] as const;
