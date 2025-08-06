import { DownloadIcon, Loader2 } from 'lucide-react';
import { useState } from 'react';

export default function DownloadButton() {
  const [isLoading, setIsLoading] = useState(false);

  const handleDownload = async () => {
    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
    } catch (error) {
      console.error('Download failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative inline-block">
      <div
        onClick={handleDownload}
        className="relative flex items-center justify-center cursor-pointer w-fit bg-pink-600/40 text-black dark:text-white font-sans border-[3px] border-rose-900/30 px-[15px] py-[10px] hover:bg-white hover:text-black transition-colors duration-300 rounded-2xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed hover:dark:bg-pink-900/90 hover:dark:text-black hover:dark:border-rose-500/30"
      >
        {/* Button content */}
        <div className="flex items-center gap-2">
          {isLoading ? (
            <Loader2 size={48} className="animate-spin text-2xl" />
          ) : (
            <DownloadIcon size={24} />
          )}
          <span>{isLoading ? '' : 'DOWNLOAD'}</span>
        </div>
      </div>
    </div>
  );
}
