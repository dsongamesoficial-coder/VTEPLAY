
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import HeroSlider from './components/HeroSlider';
import ContentRow from './components/ContentRow';
import AgoraNaTVRow from './components/AgoraNaTVRow';
import Sidebar from './components/Sidebar';
import AdminDashboard from './components/AdminDashboard';
import { AuthModal, PlansModal, PlayerModal, ChannelsModal } from './components/Modals';
import { CANAIS, FILMES, SERIES, NOVELAS } from './data';
import { ContentItem, User } from './types';
import { Search } from 'lucide-react';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isPlansOpen, setIsPlansOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isChannelsOpen, setIsChannelsOpen] = useState(false);
  const [playingItem, setPlayingItem] = useState<ContentItem | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Carrega usuário do localStorage se existir
  useEffect(() => {
    const savedUser = localStorage.getItem('vteplay_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = (newUser: User) => {
    setUser(newUser);
    localStorage.setItem('vteplay_user', JSON.stringify(newUser));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('vteplay_user');
    setIsAdminOpen(false);
  };

  const handleSubscriptionSuccess = () => {
    let updatedUser: User;
    if (user) {
      updatedUser = { ...user, isSubscribed: true };
    } else {
      updatedUser = {
        id: 'user-' + Math.random().toString(36).substr(2, 9),
        name: 'Cliente Premium',
        email: 'assinante@vteplay.com',
        role: 'user',
        isSubscribed: true,
        createdAt: new Date().toISOString()
      };
    }
    setUser(updatedUser);
    localStorage.setItem('vteplay_user', JSON.stringify(updatedUser));
  };

  const handlePlay = (item: any) => {
    if (!user) {
      setIsAuthOpen(true);
      return;
    }
    
    if (user.isSubscribed) {
      setPlayingItem(item);
    } else {
      setIsPlansOpen(true);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query.toLowerCase());
  };

  const handleGoHome = () => {
    setSearchQuery('');
    setIsAdminOpen(false);
    setIsChannelsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filterItems = (items: ContentItem[]) => {
    if (!searchQuery) return items;
    return items.filter(item => 
      item.title.toLowerCase().includes(searchQuery) || 
      item.category.toLowerCase().includes(searchQuery)
    );
  };

  const filteredCanais = filterItems(CANAIS);
  const filteredFilmes = filterItems(FILMES);
  const filteredSeries = filterItems(SERIES);
  const filteredNovelas = filterItems(NOVELAS);

  return (
    <div className="min-h-screen relative bg-[#060606]">
      <Header 
        user={user}
        onOpenMenu={() => setIsMenuOpen(true)} 
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenPlans={() => setIsPlansOpen(true)}
        onLogout={handleLogout}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onSearch={handleSearch}
        onGoHome={handleGoHome}
      />
      
      <Sidebar 
        user={user}
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)} 
        onOpenAdmin={() => setIsAdminOpen(true)}
      />
      
      {isAdminOpen && <AdminDashboard onClose={() => setIsAdminOpen(false)} />}
      
      <main className="relative z-10">
        {!searchQuery && <HeroSlider onPlay={handlePlay} />}
        
        {/* Divisor Diagonal Abaixo do Slider */}
        <div className={`diagonal-divider ${searchQuery ? 'mt-24' : '-mt-24 md:-mt-32 shadow-[0_-20px_50px_rgba(0,0,0,0.8)]'}`}></div>
        
        <div className="relative bg-black pt-12">
          {/* Agora na TV - Canais Redondos Estilo Globoplay */}
          {!searchQuery && filteredCanais.length > 0 && (
            <AgoraNaTVRow 
              items={filteredCanais} 
              onPlay={handlePlay} 
              onShowAll={() => setIsChannelsOpen(true)} 
              user={user} 
            />
          )}

          {searchQuery && filteredCanais.length > 0 && (
            <ContentRow title="Canais Ao Vivo" items={filteredCanais} onPlay={handlePlay} user={user} />
          )}
          
          <div className="diagonal-divider-reverse my-12 opacity-60"></div>
          
          {filteredFilmes.length > 0 && (
            <ContentRow title="Cinema VTE: Netflix & Globoplay" items={filteredFilmes} onPlay={handlePlay} user={user} />
          )}
          
          <div className="diagonal-divider my-12 opacity-60"></div>
          
          {filteredSeries.length > 0 && (
            <ContentRow title="Séries de Sucesso: Netflix & Globoplay" items={filteredSeries} onPlay={handlePlay} user={user} />
          )}
          
          <div className="diagonal-divider-reverse my-12 opacity-60"></div>
          
          {filteredNovelas.length > 0 && (
            <ContentRow title="Novelas: Globoplay, Netflix & SBT+" items={filteredNovelas} onPlay={handlePlay} user={user} />
          )}
          
          <div className="diagonal-divider mt-24"></div>
          <footer className="bg-[#0c0c0c] py-20 px-4 md:px-12 text-center relative overflow-hidden border-t border-white/5">
            <h2 className="text-5xl font-black text-[#fb0334] italic mb-6 tracking-tighter cursor-pointer" onClick={handleGoHome}>VTEPLAY</h2>
            <p className="text-gray-500 max-w-lg mx-auto mb-10 font-bold uppercase text-[10px] tracking-[4px]">
              O entretenimento que você merece está aqui. Transmissão 100% liberada para assinantes Premium.
            </p>
            <div className="flex flex-wrap justify-center gap-10 mb-16">
              <a href="#" className="text-xs font-black text-gray-400 hover:text-[#fb0334] transition-colors tracking-widest uppercase">Privacidade</a>
              <a href="#" className="text-xs font-black text-gray-400 hover:text-[#fb0334] transition-colors tracking-widest uppercase">Termos de Uso</a>
              <a href="#" className="text-xs font-black text-gray-400 hover:text-[#fb0334] transition-colors tracking-widest uppercase">Ajuda</a>
            </div>
            <p className="text-[10px] text-gray-700 font-black uppercase tracking-[3px]">&copy; 2024 VTEPLAY. BRASIL. SISTEMA PREMIUM DE STREAMING.</p>
          </footer>
        </div>
      </main>

      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} onLogin={handleLogin} />
      <PlansModal isOpen={isPlansOpen} onClose={() => setIsPlansOpen(false)} onSubscriptionSuccess={handleSubscriptionSuccess} />
      <PlayerModal isOpen={!!playingItem} onClose={() => setPlayingItem(null)} item={playingItem} />
      <ChannelsModal isOpen={isChannelsOpen} onClose={() => setIsChannelsOpen(false)} onPlay={handlePlay} />
    </div>
  );
}

export default App;
