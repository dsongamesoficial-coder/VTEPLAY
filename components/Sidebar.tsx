
import React from 'react';
import { X, Home, Tv, Film, MonitorPlay, Heart, Settings, HelpCircle, Package } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const menuItems = [
    { icon: <Home size={20} />, label: 'Início', active: true },
    { icon: <Tv size={20} />, label: 'Agora na TV' },
    { icon: <Film size={20} />, label: 'Filmes' },
    { icon: <MonitorPlay size={20} />, label: 'Séries' },
    { icon: <Package size={20} />, label: 'Novelas' },
    { icon: <Heart size={20} />, label: 'Minha Lista' },
    { icon: <Settings size={20} />, label: 'Configurações' },
    { icon: <HelpCircle size={20} />, label: 'Ajuda' },
  ];

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      
      {/* Menu Panel */}
      <div className={`fixed top-0 left-0 bottom-0 w-[280px] md:w-[320px] bg-[#0c0c0c] z-[70] shadow-2xl transition-transform duration-500 ease-out border-r border-white/5 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 flex flex-col h-full">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl font-black text-[#fb0334] italic">VTEPLAY</h2>
            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
              <X size={24} />
            </button>
          </div>

          <nav className="flex-grow space-y-2">
            {menuItems.map((item, i) => (
              <button
                key={i}
                className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${item.active ? 'bg-[#fb0334] text-white' : 'hover:bg-white/5 text-gray-400 hover:text-white'}`}
              >
                {item.icon}
                <span className="font-bold">{item.label}</span>
              </button>
            ))}
          </nav>

          <div className="mt-auto pt-6 border-t border-white/10">
            <div className="p-4 bg-gradient-to-br from-[#fb0334]/20 to-transparent rounded-2xl border border-[#fb0334]/30">
              <p className="text-xs font-bold text-[#fb0334] uppercase mb-1">Oferta Exclusiva</p>
              <h4 className="font-bold text-sm mb-3">Assine o plano VTE Premium</h4>
              <button className="w-full bg-[#fb0334] text-white py-2 rounded-lg text-sm font-bold shadow-lg shadow-[#fb0334]/20">
                VER PLANOS
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
