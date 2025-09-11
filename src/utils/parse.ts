import { YOUTUBE_URL_PATTERNS } from '../consts';

export const getYouTubeOEmbedUrl = (videoId: string): string => {
  return `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`;
};

export const convertYouTubeToEmbedUrl = (youtubeUrl: string): string | null => {
  const videoId = extractYouTubeVideoId(youtubeUrl);
  if (!videoId) {
    return null;
  }
  return `https://www.youtube.com/embed/${videoId}?autoplay=1&controls=1&disablekb=1&modestbranding=1&rel=0`;
};

export const extractYouTubeVideoId = (url: string): string | null => {
  const cleanUrl = url.trim();

  for (let index = 0; index < YOUTUBE_URL_PATTERNS.length; index += 1) {
    const pattern = YOUTUBE_URL_PATTERNS[index];
    if (pattern) {
      const match = cleanUrl.match(pattern);

      if (match) {
        return match[2] || match[1] || null;
      }
    }
  }

  return null;
};
