// YouTube URL base constants
export const YOUTUBE_URLS = {
  BASE: 'https://www.youtube.com',
  BASE_NO_WWW: 'https://youtube.com',
  SHORT_BASE: 'https://youtu.be',
  WATCH: 'https://www.youtube.com/watch',
  EMBED: 'https://www.youtube.com/embed',
  SHORTS: 'https://www.youtube.com/shorts',
  OEMBED: 'https://www.youtube.com/oembed',
} as const;

// YouTube URL patterns combined with their corresponding video ID capture groups
export const YOUTUBE_URL_PATTERNS = [
  {
    pattern:
      /^https?:\/\/(www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})(&.*)?$/,
    videoIdGroup: 2, // youtube.com/watch - video ID is in group 2
  },
  {
    pattern: /^https?:\/\/youtu\.be\/([a-zA-Z0-9_-]{11})(\?.*)?$/,
    videoIdGroup: 1, // youtu.be - video ID is in group 1
  },
  {
    pattern:
      /^https?:\/\/(www\.)?youtube\.com\/embed\/([a-zA-Z0-9_-]{11})(\?.*)?$/,
    videoIdGroup: 2, // youtube.com/embed - video ID is in group 2
  },
  {
    pattern:
      /^https?:\/\/(www\.)?youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})(\?.*)?$/,
    videoIdGroup: 2, // youtube.com/shorts - video ID is in group 2
  },
  {
    pattern:
      /^https?:\/\/(www\.)?youtube\.com\/playlist\?list=([a-zA-Z0-9_-]+)(&.*)?$/,
    videoIdGroup: 2, // youtube.com/playlist - playlist ID is in group 2
  },
] as const;
