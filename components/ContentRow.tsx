
import React from 'react';
import { Play, Lock } from 'lucide-react';
import { ContentItem, User } from '../types';

interface ContentRowProps {
  title: string;
  items: ContentItem[];
  onPlay: (item: ContentItem) => void;
  user: User | null;
}

const ContentRow: React.FC<ContentRowProps> = ({ title, items, onPlay, user }) => {
  const isSubscribed = user?.isSubscribed;

  return (
    <div className="py-8 px-4 md:px-12 relative z-20 bg-black">
      <h3 className="text-xl md:text-2xl font-bold mb-6 flex items-center gap-3 uppercase tracking-tighter">
        <span className="w-1.5 h-8 bg-[#fb0334] rounded-full"></span>
        {title}
      </h3>
      
      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide no-scrollbar snap-x snap-mandatory">
        {items.map((item) => (
          <div 
            key={item.id}
            onClick={() => onPlay(item)}
            className="flex-none w-[160px] md:w-[240px] group cursor-pointer snap-start relative"
          >
            <div className="relative aspect-[2/3] rounded-xl overflow-hidden transition-all duration-300 group-hover:scale-105 group-hover:ring-4 ring-[#fb0334]/50 shadow-2xl bg-[#111]">
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              
              {/* Overlay with play or lock icon */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all flex flex-col items-center justify-center gap-2">
                <div className={`w-14 h-14 rounded-full flex items-center justify-center opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 shadow-2xl ${isSubscribed ? 'bg-[#fb0334]' : 'bg-white/10 backdrop-blur-md'}`}>
                  {isSubscribed ? (
                    <Play fill="white" className="text-white ml-1" size={24} />
                  ) : (
                    <Lock className="text-white" size={24} />
                  )}
                </div>
                {!isSubscribed && (
                  <span className="text-[10px] font-black uppercase tracking-widest text-white opacity-0 group-hover:opacity-100 transition-opacity">Assine para assistir</span>
                )}
              </div>
              
              {/* Category Badges */}
              <div className="absolute top-3 right-3 flex flex-col gap-2">
                {item.category === 'canais' && (
                  <div className="bg-red-600 text-white text-[9px] font-black px-2 py-0.5 rounded-full flex items-center gap-1.5 shadow-lg border border-white/20">
                    <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                    AO VIVO
                  </div>
                )}
                {!isSubscribed && (
                  <div className="bg-[#fb0334] text-white text-[9px] font-black px-2 py-0.5 rounded-full shadow-lg border border-white/20 uppercase tracking-tighter">
                    Premium
                  </div>
                )}
              </div>
            </div>
            <div className="mt-4 px-1">
              <h4 className="font-bold text-sm md:text-base group-hover:text-[#fb0334] transition-colors truncate">
                {item.title}
              </h4>
              <p className="text-[10px] font-bold text-gray-500 mt-1 uppercase tracking-widest">
                {item.category === 'canais' ? 'Canal Aberto' : (item.year || 'Original VTEPLAY')}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContentRow;
