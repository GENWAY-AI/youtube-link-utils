import { useCallback, useRef, useState } from 'react';
import { isValidYouTubeUrl, validateYouTubeVideoExists } from '../../utils';

export const useYouTubeValidationLoading = () => {
  const [isValidating, setIsValidating] = useState(false);
  const currentValidationRef = useRef<string>('');

  const validateWithLoading = useCallback(
    async (url: string): Promise<boolean> => {
      const trimmedUrl = url.trim();

      if (!trimmedUrl || currentValidationRef.current === trimmedUrl) {
        return true;
      }

      if (!isValidYouTubeUrl(trimmedUrl)) {
        return false;
      }

      currentValidationRef.current = trimmedUrl;
      setIsValidating(true);

      try {
        const result = await validateYouTubeVideoExists(trimmedUrl);
        setIsValidating(false);
        return result;
      } catch {
        setIsValidating(false);
        return false;
      }
    },
    []
  );

  const clearValidation = useCallback(() => {
    setIsValidating(false);
    currentValidationRef.current = '';
  }, []);

  return {
    isValidating,
    validateWithLoading,
    clearValidation,
  };
};
