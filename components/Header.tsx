
import React, { useState, useEffect, useRef } from 'react';
import { Menu, User, Search, X, LogIn, CreditCard, Shield, LogOut } from 'lucide-react';
import { User as UserType } from '../types';

interface HeaderProps {
  user: UserType | null;
  onOpenMenu: () => void;
  onOpenAuth: () => void;
  onOpenPlans: () => void;
  onLogout: () => void;
  onOpenAdmin: () => void;
  onSearch: (query: string) => void;
  onGoHome: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  user, 
  onOpenMenu, 
  onOpenAuth, 
  onOpenPlans, 
  onLogout, 
  onOpenAdmin, 
  onSearch,
  onGoHome
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchToggle = () => {
    if (isSearchOpen) {
      setSearchQuery('');
      onSearch('');
      setIsSearchOpen(false);
    } else {
      setIsSearchOpen(true);
      setTimeout(() => searchInputRef.current?.focus(), 100);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearch(value);
  };

  const handleLogoClick = () => {
    setSearchQuery('');
    setIsSearchOpen(false);
    onGoHome();
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-black/95 py-2 shadow-2xl' : 'bg-gradient-to-b from-black/80 to-transparent py-6'}`}>
      <div className="container mx-auto px-4 relative flex items-center justify-between">
        
        {/* Menu Button - Left */}
        <div className="flex items-center gap-4">
          <button 
            onClick={onOpenMenu}
            className="p-2 hover:bg-white/10 rounded-full transition-colors text-white flex items-center gap-2"
          >
            <Menu size={32} />
            <span className="hidden md:inline font-bold uppercase text-[10px] tracking-[2px]">Menu</span>
          </button>
        </div>

        {/* Logo VTEPLAY Centralizado com Divisor Diagonal Abaixo */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
          <button 
            onClick={handleLogoClick}
            className="hover:scale-105 active:scale-95 transition-all duration-300 group z-50 relative"
            aria-label="Voltar para o início"
          >
            <h1 className="text-4xl md:text-5xl font-black text-[#fb0334] tracking-tighter italic select-none drop-shadow-[0_0_15px_rgba(251,3,52,0.3)] group-hover:drop-shadow-[0_0_25px_rgba(251,3,52,0.6)] transition-all">
              VTEPLAY
            </h1>
            
            {/* O Divisor Diagonal abaixo do nome */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 md:w-32 h-[3px] bg-gradient-to-r from-transparent via-[#fb0334] to-transparent transform -skew-x-[45deg] group-hover:w-full transition-all duration-500 shadow-[0_2px_10px_rgba(251,3,52,0.8)]"></div>
          </button>
        </div>

        {/* User Actions & Search - Right */}
        <div className="flex items-center gap-4">
          <div className={`flex items-center transition-all duration-300 ${isSearchOpen ? 'w-[150px] md:w-[250px] bg-white/10 rounded-full px-4 py-1.5' : 'w-10'}`}>
            <button 
              onClick={handleSearchToggle}
              className={`p-2 hover:bg-white/10 rounded-full transition-colors ${isSearchOpen ? 'text-[#fb0334]' : 'text-white'}`}
            >
              {isSearchOpen ? <X size={20} /> : <Search size={28} />}
            </button>
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Buscar..."
              className={`bg-transparent border-none outline-none text-sm font-medium w-full ml-2 text-white ${isSearchOpen ? 'block' : 'hidden'}`}
            />
          </div>

          <div className="relative">
            <button 
              onClick={() => user ? setShowDropdown(!showDropdown) : onOpenAuth()}
              className="flex items-center gap-2 hover:scale-105 transition-transform"
            >
              {user ? (
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-black text-white border-2 ${user.role === 'admin' ? 'bg-[#fb0334] border-[#fb0334]/50' : 'bg-blue-600 border-blue-400/50'}`}>
                  {user.name.charAt(0).toUpperCase()}
                </div>
              ) : (
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-[#fb0334] transition-colors">
                  <User size={24} />
                </div>
              )}
            </button>

            {user && showDropdown && (
              <div className="absolute right-0 mt-4 w-64 bg-[#111] border border-white/10 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.8)] overflow-hidden animate-in fade-in slide-in-from-top-2">
                <div className="p-5 border-b border-white/5 bg-white/5">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Assinante VTE Premium</p>
                  <p className="font-bold text-white truncate">{user.name}</p>
                </div>
                <div className="p-2">
                  {user.role === 'admin' && (
                    <button 
                      onClick={() => { onOpenAdmin(); setShowDropdown(false); }}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
                    >
                      <Shield size={18} className="text-[#fb0334]" />
                      Painel do Dono
                    </button>
                  )}
                  <button 
                    onClick={() => { onLogout(); setShowDropdown(false); }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-500 hover:bg-red-500/10 rounded-xl transition-colors font-bold"
                  >
                    <LogOut size={18} />
                    Sair da Conta
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
