
import React, { useState } from 'react';
import { Menu, User, Search, X, LogIn, CreditCard } from 'lucide-react';

interface HeaderProps {
  onOpenMenu: () => void;
  onOpenAuth: () => void;
  onOpenPlans: () => void;
}

const Header: React.FC<HeaderProps> = ({ onOpenMenu, onOpenAuth, onOpenPlans }) => {
  const [scrolled, setScrolled] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-black/95 py-2 shadow-2xl' : 'bg-gradient-to-b from-black/80 to-transparent py-4'}`}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        
        {/* Menu Button - Left */}
        <div className="flex items-center gap-4">
          <button 
            onClick={onOpenMenu}
            className="p-2 hover:bg-white/10 rounded-full transition-colors text-white"
          >
            <Menu size={28} />
          </button>
          <div className="hidden md:flex items-center gap-6 text-sm font-semibold uppercase tracking-wider ml-4">
            <a href="#" className="hover:text-[#fb0334] transition-colors">Agora na TV</a>
            <a href="#" className="hover:text-[#fb0334] transition-colors">Catálogo</a>
          </div>
        </div>

        {/* Logo - Center */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
          <h1 className="text-3xl md:text-4xl font-black text-[#fb0334] tracking-tighter italic select-none">
            VTEPLAY
          </h1>
        </div>

        {/* User Actions - Right */}
        <div className="flex items-center gap-2 md:gap-4">
          <button className="p-2 hover:bg-white/10 rounded-full transition-colors hidden sm:block">
            <Search size={22} />
          </button>
          <button 
            onClick={onOpenPlans}
            className="hidden sm:flex items-center gap-2 bg-[#fb0334] hover:bg-[#ff2b56] px-4 py-1.5 rounded-full text-xs font-bold uppercase transition-all shadow-lg"
          >
            <CreditCard size={16} />
            Assinar
          </button>
          <button 
            onClick={onOpenAuth}
            className="flex items-center gap-2 hover:text-[#fb0334] transition-colors"
          >
            <User size={24} />
            <span className="hidden md:inline text-sm font-semibold">Entrar</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
