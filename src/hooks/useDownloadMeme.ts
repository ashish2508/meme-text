import { useState } from 'react';
import { downloadMeme, type DownloadMemeOptions } from '@/lib/downloadMeme';

export const useDownloadMeme = () => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const download = async (options: DownloadMemeOptions) => {
    setIsDownloading(true);
    setError(null);

    try {
      await downloadMeme(options);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Download failed';
      setError(errorMessage);
      console.error('Download error:', err);
    } finally {
      setIsDownloading(false);
    }
  };

  return {
    download,
    isDownloading,
    error,
    clearError: () => setError(null),
  };
};
