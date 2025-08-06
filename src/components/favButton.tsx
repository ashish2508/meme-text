import { HeartFilledIcon } from '@radix-ui/react-icons';
import { Heart, Loader2 } from 'lucide-react';
import { useState } from 'react';

interface ButtonProps {
  isFavorited: boolean;
}

export default function FavButton({ isFavorited }: ButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  
    const handleDownload = async () => {
      setIsLoading(true);
  
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } catch (error) {
        console.error('Download failed:', error);
      } finally {
        setIsLoading(false);
      }
    };
  return (
    <div className="relative inline-block" onClick={handleDownload}>
      <button
        type="submit"
        className="relative flex items-center justify-center cursor-pointer w-fit bg-pink-600/40 text-black dark:text-white font-sans border-[3px] border-rose-900/30 px-[15px] py-[10px] hover:bg-amber-200/40 hover:text-black scale-80 hover:scale-110 transition-colors duration-300 rounded-2xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed hover:dark:bg-pink-900/90 hover:dark:text-black hover:dark:border-rose-500/30"
      >
        {isLoading ? (
          <Loader2 size={20} className="animate-spin" />
        ) : (isFavorited ? (
          <HeartFilledIcon className="text-black w-5 h-5" />
        ) : (
          <Heart size={20} />
        ) )}
      </button>
    </div>
  );
}
