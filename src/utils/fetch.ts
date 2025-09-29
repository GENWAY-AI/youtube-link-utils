import axios from 'axios';
import { extractYouTubeVideoId, getYouTubeOEmbedUrl } from './parse';
import { isValidYouTubeUrl } from './validate';

export const getYouTubeVideoInfo = async (
  url: string
): Promise<{
  title: string;
  author_name: string;
  thumbnail_url: string;
  html: string;
} | null> => {
  try {
    if (!isValidYouTubeUrl(url)) {
      return null;
    }

    const videoId = extractYouTubeVideoId(url);
    if (!videoId) {
      return null;
    }

    const oembedUrl = getYouTubeOEmbedUrl(videoId);

    const response = await axios.get(oembedUrl, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch {
    return null;
  }
};
