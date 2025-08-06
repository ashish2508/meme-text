import { HeartFilledIcon } from '@radix-ui/react-icons';
import { Heart } from 'lucide-react';
import { ReactNode, useState } from 'react';

interface ButtonProps {
  icon: ReactNode;
}

export default function FavButton({ isFavorited }: boolean) {
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
        className="relative flex items-center justify-center cursor-pointer w-fit bg-pink-600/40 text-black dark:text-white font-sans border-[3px] border-rose-900/30 px-[15px] py-[10px] hover:bg-amber-200/40 hover:text-black scale-80 hover:scale-110 transition-colors duration-300 rounded-2xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed hover:dark:bg-pink-900/90 hover:dark:text-black hover:dark:border-rose-500/30"
      >

        {isFavorited ? <HeartFilledIcon className="text-black" /> : <Heart />}

      </div>
    </div>
  );
}
