
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play, Info } from 'lucide-react';
import { HERO_SLIDES } from '../data';

interface HeroSliderProps {
  onPlay: (item: any) => void;
}

const HeroSlider: React.FC<HeroSliderProps> = ({ onPlay }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const next = () => setCurrent((prev) => (prev + 1) % HERO_SLIDES.length);
  const prev = () => setCurrent((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);

  return (
    <section className="relative h-[85vh] md:h-[95vh] w-full overflow-hidden bg-black">
      {HERO_SLIDES.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === current ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
          </div>

          {/* Content */}
          <div className="absolute bottom-[20%] left-4 md:left-12 max-w-2xl animate-in fade-in slide-in-from-bottom-10 duration-700">
            <span className="bg-[#fb0334] text-white text-[10px] md:text-xs font-bold uppercase px-2 py-1 rounded mb-4 inline-block">
              {slide.category}
            </span>
            <h2 className="text-4xl md:text-7xl font-black mb-4 drop-shadow-2xl italic leading-tight uppercase">
              {slide.title}
            </h2>
            <p className="text-lg md:text-xl text-gray-300 mb-8 line-clamp-3 md:line-clamp-none max-w-xl">
              {slide.description}
            </p>
            
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => onPlay(slide)}
                className="bg-white text-black hover:bg-[#fb0334] hover:text-white transition-all px-8 py-4 rounded-lg font-bold flex items-center gap-3 text-lg group"
              >
                <Play fill="currentColor" size={24} className="group-hover:scale-110 transition-transform" />
                ASSISTIR
              </button>
              <button className="bg-white/20 hover:bg-white/30 backdrop-blur-md text-white transition-all px-8 py-4 rounded-lg font-bold flex items-center gap-3 text-lg border border-white/20">
                <Info size={24} />
                MAIS INFORMAÇÕES
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Dots */}
      <div className="absolute bottom-10 right-12 flex gap-3 z-20">
        {HERO_SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-1.5 transition-all duration-300 rounded-full ${i === current ? 'w-12 bg-[#fb0334]' : 'w-4 bg-white/30 hover:bg-white/50'}`}
          />
        ))}
      </div>

      {/* Side Arrows */}
      <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/20 hover:bg-black/50 text-white rounded-full backdrop-blur-sm transition-all z-20 border border-white/10">
        <ChevronLeft size={32} />
      </button>
      <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/20 hover:bg-black/50 text-white rounded-full backdrop-blur-sm transition-all z-20 border border-white/10">
        <ChevronRight size={32} />
      </button>
    </section>
  );
};

export default HeroSlider;
