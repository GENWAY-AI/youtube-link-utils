import { YOUTUBE_URL_PATTERNS, YOUTUBE_URLS } from '../consts';

export const getYouTubeOEmbedUrl = (videoId: string): string => {
  return `${YOUTUBE_URLS.OEMBED}?url=${YOUTUBE_URLS.WATCH}?v=${videoId}&format=json`;
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

    const embedUrl = `${YOUTUBE_URLS.EMBED}/${videoId}`;
    const paramString = params.toString();

    return paramString ? `${embedUrl}?${paramString}` : embedUrl;
  } catch {
    return `${YOUTUBE_URLS.EMBED}/${videoId}`;
  }
};

export const extractYouTubeVideoId = (url: string): string | null => {
  const cleanUrl = url.trim();

  for (const { pattern, videoIdGroup } of YOUTUBE_URL_PATTERNS) {
    const match = cleanUrl.match(pattern);

    if (match) {
      return match[videoIdGroup] || null;
    }
  }

  return null;
};
