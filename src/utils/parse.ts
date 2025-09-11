import { PATTERN_VIDEO_ID_GROUPS, YOUTUBE_URL_PATTERNS } from '../consts';

export const getYouTubeOEmbedUrl = (videoId: string): string => {
  return `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`;
};

export const convertYouTubeToEmbedUrl = (youtubeUrl: string): string | null => {
  const videoId = extractYouTubeVideoId(youtubeUrl);
  if (!videoId) {
    return null;
  }

  try {
    const url = new URL(youtubeUrl.trim());
    const params = new URLSearchParams(url.search);

    params.delete('v');

    const embedUrl = `https://www.youtube.com/embed/${videoId}`;
    const paramString = params.toString();

    return paramString ? `${embedUrl}?${paramString}` : embedUrl;
  } catch {
    return `https://www.youtube.com/embed/${videoId}`;
  }
};

export const extractYouTubeVideoId = (url: string): string | null => {
  const cleanUrl = url.trim();

  for (let index = 0; index < YOUTUBE_URL_PATTERNS.length; index += 1) {
    const pattern = YOUTUBE_URL_PATTERNS[index];
    if (pattern) {
      const match = cleanUrl.match(pattern);

      if (match) {
        const videoIdGroupIndex = PATTERN_VIDEO_ID_GROUPS[index];
        return match[videoIdGroupIndex] || null;
      }
    }
  }

  return null;
};
