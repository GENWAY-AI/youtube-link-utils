export type YouTubeValidationResult = {
  isValid: boolean;
  isValidFormat: boolean;
  videoExists?: boolean;
  videoInfo?: {
    title: string;
    author_name: string;
    thumbnail_url: string;
  } | null;
  error?: string;
};
