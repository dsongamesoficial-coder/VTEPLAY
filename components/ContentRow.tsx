
import React from 'react';
import { Play } from 'lucide-react';
import { ContentItem } from '../types';

interface ContentRowProps {
  title: string;
  items: ContentItem[];
  onPlay: (item: ContentItem) => void;
}

const ContentRow: React.FC<ContentRowProps> = ({ title, items, onPlay }) => {
  return (
    <div className="py-8 px-4 md:px-12 relative z-20 bg-black">
      <h3 className="text-xl md:text-2xl font-bold mb-6 flex items-center gap-3 uppercase tracking-tighter">
        <span className="w-1 h-8 bg-[#fb0334] rounded-full"></span>
        {title}
      </h3>
      
      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide no-scrollbar snap-x snap-mandatory">
        {items.map((item) => (
          <div 
            key={item.id}
            onClick={() => onPlay(item)}
            className="flex-none w-[160px] md:w-[240px] group cursor-pointer snap-start relative"
          >
            <div className="relative aspect-[2/3] rounded-lg overflow-hidden transition-all duration-300 group-hover:scale-105 group-hover:ring-4 ring-[#fb0334]/50 shadow-xl">
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                <div className="w-12 h-12 bg-[#fb0334] rounded-full flex items-center justify-center opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 shadow-2xl">
                  <Play fill="white" className="text-white ml-1" size={20} />
                </div>
              </div>
              
              {/* Live Badge for Channels */}
              {item.category === 'canais' && (
                <div className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-black px-1.5 py-0.5 rounded flex items-center gap-1 shadow-lg">
                  <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                  AO VIVO
                </div>
              )}
            </div>
            <div className="mt-3">
              <h4 className="font-bold text-sm md:text-base group-hover:text-[#fb0334] transition-colors truncate">
                {item.title}
              </h4>
              <p className="text-xs text-gray-400 mt-1 uppercase">
                {item.category === 'canais' ? 'Canal Aberto' : (item.year || 'Assista Agora')}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContentRow;
