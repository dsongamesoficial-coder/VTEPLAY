
import React, { useState } from 'react';
import Header from './components/Header';
import HeroSlider from './components/HeroSlider';
import ContentRow from './components/ContentRow';
import Sidebar from './components/Sidebar';
import { AuthModal, PlansModal, PlayerModal } from './components/Modals';
import { CANAIS, FILMES, SERIES, NOVELAS } from './data';
import { ContentItem } from './types';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isPlansOpen, setIsPlansOpen] = useState(false);
  const [playingItem, setPlayingItem] = useState<ContentItem | null>(null);

  const handlePlay = (item: any) => {
    setPlayingItem(item);
  };

  return (
    <div className="min-h-screen relative">
      <Header 
        onOpenMenu={() => setIsMenuOpen(true)} 
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenPlans={() => setIsPlansOpen(true)}
      />
      
      <Sidebar isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      
      <main className="relative z-10">
        <HeroSlider onPlay={handlePlay} />
        
        <div className="diagonal-divider -mt-24 md:-mt-32"></div>
        
        <div className="relative bg-black pt-12">
          <ContentRow title="Agora na TV" items={CANAIS} onPlay={handlePlay} />
          
          <div className="diagonal-divider-reverse my-16 opacity-50"></div>
          
          <ContentRow title="Filmes de Sucesso" items={FILMES} onPlay={handlePlay} />
          
          <div className="diagonal-divider my-16 opacity-50"></div>
          
          <ContentRow title="Séries Imperdíveis" items={SERIES} onPlay={handlePlay} />
          
          <div className="diagonal-divider-reverse my-16 opacity-50"></div>
          
          <ContentRow title="Novelas Inesquecíveis" items={NOVELAS} onPlay={handlePlay} />
          
          {/* Footer Area with diagonal look */}
          <div className="diagonal-divider mt-24"></div>
          <footer className="bg-[#0c0c0c] pt-20 pb-12 px-4 md:px-12">
            <div className="container mx-auto grid md:grid-cols-4 gap-12">
              <div className="col-span-1 md:col-span-2">
                <h2 className="text-4xl font-black text-[#fb0334] italic mb-6">VTEPLAY</h2>
                <p className="text-gray-400 max-w-md mb-8">
                  Assista a milhares de filmes, séries e as melhores novelas do Brasil. O melhor entretenimento está aqui.
                </p>
                <div className="flex gap-4">
                  <a href="#" className="p-3 bg-white/5 hover:bg-[#fb0334] rounded-full transition-all"><i className="fab fa-facebook"></i></a>
                  <a href="#" className="p-3 bg-white/5 hover:bg-[#fb0334] rounded-full transition-all"><i className="fab fa-instagram"></i></a>
                  <a href="#" className="p-3 bg-white/5 hover:bg-[#fb0334] rounded-full transition-all"><i className="fab fa-twitter"></i></a>
                </div>
              </div>
              <div>
                <h4 className="font-bold mb-6 uppercase text-sm tracking-widest text-[#fb0334]">Institucional</h4>
                <ul className="space-y-4 text-sm text-gray-500">
                  <li><a href="#" className="hover:text-white transition-colors">Quem Somos</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Termos de Uso</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Privacidade</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Segurança</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-6 uppercase text-sm tracking-widest text-[#fb0334]">Suporte</h4>
                <ul className="space-y-4 text-sm text-gray-500">
                  <li><a href="#" className="hover:text-white transition-colors">Central de Ajuda</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Dúvidas Frequentes</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Atendimento PIX</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Contato</a></li>
                </ul>
              </div>
            </div>
            <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] text-gray-600 font-bold uppercase tracking-[2px]">
              <p>&copy; 2024 VTEPLAY Entretenimento Ltda. Todos os direitos reservados.</p>
              <div className="flex gap-6">
                <span>Made for fans</span>
                <span>Brasil</span>
              </div>
            </div>
          </footer>
        </div>
      </main>

      {/* Modals */}
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
      <PlansModal isOpen={isPlansOpen} onClose={() => setIsPlansOpen(false)} />
      <PlayerModal isOpen={!!playingItem} onClose={() => setPlayingItem(null)} item={playingItem} />
    </div>
  );
}

export default App;
