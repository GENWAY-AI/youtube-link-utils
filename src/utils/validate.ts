import axios from 'axios';
import { YOUTUBE_URL_PATTERNS } from '../consts';
import { YouTubeValidationResult } from '../types';
import { isValidUrl } from './common';
import { getYouTubeVideoInfo } from './fetch';
import { extractYouTubeVideoId, getYouTubeOEmbedUrl } from './parse';

export const isValidYouTubeUrl = (url: string): boolean => {
  if (!url || typeof url !== 'string') {
    return false;
  }

  const cleanUrl = url.trim();

  if (!isValidUrl(cleanUrl)) {
    return false;
  }

  return YOUTUBE_URL_PATTERNS.some(({ pattern }) => pattern.test(cleanUrl));
};

export const validateYouTubeVideoExists = async (
  url: string
): Promise<boolean> => {
  try {
    if (!isValidYouTubeUrl(url)) {
      return false;
    }

    const videoId = extractYouTubeVideoId(url);
    if (!videoId) {
      return false;
    }

    const oembedUrl = getYouTubeOEmbedUrl(videoId);

    const response = await axios.get(oembedUrl, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.status === 200;
  } catch {
    return false;
  }
};

export const validateYouTubeUrlComprehensive = async (
  url: string,
  checkExists: boolean = true
): Promise<YouTubeValidationResult> => {
  const result: YouTubeValidationResult = {
    isValid: false,
    isValidFormat: false,
  };

  try {
    result.isValidFormat = isValidYouTubeUrl(url);

    if (!result.isValidFormat) {
      result.error = 'Invalid YouTube URL format';
      return result;
    }

    if (checkExists) {
      result.videoExists = await validateYouTubeVideoExists(url);

      if (result.videoExists) {
        result.videoInfo = await getYouTubeVideoInfo(url);
        result.isValid = true;
      } else {
        result.error = 'YouTube video not found or not accessible';
      }
    } else {
      result.isValid = true;
    }

    return result;
  } catch (error) {
    result.error = `Validation failed: ${
      error instanceof Error ? error.message : 'Unknown error'
    }`;
    return result;
  }
};
