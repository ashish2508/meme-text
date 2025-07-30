import { DownloadIcon } from 'lucide-react';
import React from 'react';

export default function DownloadButton() {
  return (
    <div className="relative inline-block">
      <button className="group relative flex items-center justify-center cursor-pointer w-fit bg-black text-gray-300 font-sans font-bold border-[3px] border-white transition-all duration-100 ease-out px-[15px] py-[10px] overflow-hidden hover:scale-105 active:scale-95 active:bg-white active:text-black active:border-black">

        {/* Sliding shine effect */}
        <div className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-emerald-600/60 to-transparent z-[1] opacity-0 group-hover:opacity-100 group-hover:animate-[slide_2s_infinite]" />

        {/* Button content */}
        <div className="flex items-center gap-2 text-[18px] transition-transform duration-200 ease-out relative z-[1] group-hover:skew-x-[-5deg] group-active:skew-x-[5deg] group-hover:text-[19px] group-hover:tracking-wider">
          <DownloadIcon size={24} />
          <span>DOWNLOAD</span>
        </div>
      </button>

      <style jsx>{`
        @keyframes slide {
          0% { left: -100%; }
          100% { left: 100%; }
        }
      `}</style>
    </div>
  );
};
