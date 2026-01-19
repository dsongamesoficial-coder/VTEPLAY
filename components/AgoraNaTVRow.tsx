
import React from 'react';
import { Play } from 'lucide-react';
import { ContentItem, User } from '../types';

interface AgoraNaTVRowProps {
  items: ContentItem[];
  onPlay: (item: ContentItem) => void;
  onShowAll: () => void;
  user: User | null;
}

const AgoraNaTVRow: React.FC<AgoraNaTVRowProps> = ({ items, onPlay, onShowAll, user }) => {
  return (
    <div className="py-10 px-4 md:px-12 relative z-20 bg-black">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-xl md:text-2xl font-black uppercase tracking-tighter flex items-center gap-3">
          <span className="w-1.5 h-8 bg-[#fb0334] rounded-full"></span>
          Agora na TV
        </h3>
        <button 
          onClick={onShowAll}
          className="text-[10px] font-black text-gray-400 hover:text-white hover:bg-white/5 transition-all uppercase tracking-[2px] border border-white/10 px-4 py-2 rounded-full cursor-pointer"
        >
          Ver Grade Completa
        </button>
      </div>
      
      <div className="flex gap-6 md:gap-10 overflow-x-auto pb-6 scrollbar-hide no-scrollbar snap-x">
        {items.map((item) => (
          <div 
            key={item.id}
            onClick={() => onPlay(item)}
            className="flex-none flex flex-col items-center group cursor-pointer snap-start"
          >
            <div className="relative w-20 h-20 md:w-32 md:h-32 rounded-full p-1 bg-gradient-to-tr from-white/5 to-white/20 group-hover:from-[#fb0334] group-hover:to-[#ff2b56] transition-all duration-500 shadow-2xl">
              <div className="w-full h-full rounded-full bg-[#111] overflow-hidden relative">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Play Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Play fill="white" size={24} className="text-white" />
                </div>

                {/* Live Pulse Dot */}
                <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-red-600 px-2 py-0.5 rounded-full border border-white/20 shadow-lg">
                  <div className="w-1 h-1 bg-white rounded-full animate-pulse"></div>
                  <span className="text-[8px] font-black text-white">LIVE</span>
                </div>
              </div>
            </div>
            
            <span className="mt-4 font-bold text-[10px] md:text-xs text-center text-gray-300 group-hover:text-white transition-colors max-w-[80px] md:max-w-[128px] truncate uppercase tracking-widest">
              {item.title}
            </span>
            <span className="mt-1 text-[8px] font-black text-[#fb0334] opacity-0 group-hover:opacity-100 transition-opacity">
              AO VIVO
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AgoraNaTVRow;
