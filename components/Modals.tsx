
import React, { useState, useEffect, useRef } from 'react';
import { X, Copy, Check, Lock, ShieldCheck, Mail, Play, User as UserIcon, QrCode, ArrowRight, Smartphone, Volume2, VolumeX, Maximize, Pause, Settings, RefreshCw, Minimize, Search } from 'lucide-react';
import { User, ContentItem } from '../types';
import { CANAIS } from '../data';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin?: (user: User) => void;
  onSubscriptionSuccess?: () => void;
}

export const AuthModal: React.FC<ModalProps> = ({ isOpen, onClose, onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isAdmin = email === 'admin@vteplay.com';
    const mockUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: name || (isAdmin ? 'Proprietário Admin' : 'Usuário VTE'),
      email: email,
      role: isAdmin ? 'admin' : 'user',
      isSubscribed: isAdmin,
      createdAt: new Date().toISOString().split('T')[0]
    };
    if (onLogin) {
      onLogin(mockUser);
      onClose();
    }
  };

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="bg-[#111] w-full max-w-md rounded-3xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300 border border-white/5">
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-black italic text-[#fb0334]">VTEPLAY</h2>
            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors"><X /></button>
          </div>
          <div className="flex gap-4 mb-8">
            <button onClick={() => setIsLogin(true)} className={`flex-1 py-2 font-bold text-sm border-b-2 transition-all uppercase tracking-wider ${isLogin ? 'border-[#fb0334] text-[#fb0334]' : 'border-transparent text-gray-500'}`}>Entrar</button>
            <button onClick={() => setIsLogin(false)} className={`flex-1 py-2 font-bold text-sm border-b-2 transition-all uppercase tracking-wider ${!isLogin ? 'border-[#fb0334] text-[#fb0334]' : 'border-transparent text-gray-500'}`}>Criar Conta</button>
          </div>
          <form className="space-y-4" onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Nome Completo</label>
                <div className="relative">
                  <input required type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[#fb0334] transition-colors" placeholder="Seu nome" />
                  <UserIcon className="absolute right-4 top-3.5 text-gray-500" size={18} />
                </div>
              </div>
            )}
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">E-mail</label>
              <div className="relative">
                <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[#fb0334] transition-colors" placeholder="seu@email.com" />
                <Mail className="absolute right-4 top-3.5 text-gray-500" size={18} />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Senha</label>
              <div className="relative">
                <input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[#fb0334] transition-colors" placeholder="••••••••" />
                <Lock className="absolute right-4 top-3.5 text-gray-500" size={18} />
              </div>
            </div>
            <button className="w-full bg-[#fb0334] text-white py-4 rounded-xl font-bold text-lg shadow-xl shadow-[#fb0334]/20 hover:bg-[#ff2b56] transition-all uppercase tracking-widest">
              {isLogin ? 'Entrar' : 'Cadastrar'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export const PlansModal: React.FC<ModalProps> = ({ isOpen, onClose, onSubscriptionSuccess }) => {
  const pixKey = "0d08c383-9251-4d6d-a7c4-e6412895b5c6";
  const [step, setStep] = useState<'selection' | 'checkout' | 'success'>('selection');
  const [selectedPlan, setSelectedPlan] = useState<{ name: string, price: string } | null>(null);
  const [copied, setCopied] = useState(false);

  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&margin=2&data=${encodeURIComponent(pixKey)}`;

  const copyPix = () => {
    navigator.clipboard.writeText(pixKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSelectPlan = (name: string, price: string) => {
    setSelectedPlan({ name, price });
    setStep('checkout');
  };

  const handleConfirmPayment = () => {
    if (onSubscriptionSuccess) {
      onSubscriptionSuccess();
    }
    setStep('success');
  };

  const resetModal = () => {
    setStep('selection');
    setSelectedPlan(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl overflow-y-auto">
      <div className="bg-[#0c0c0c] w-full max-w-2xl rounded-[2.5rem] overflow-hidden shadow-[0_0_80px_rgba(251,3,52,0.5)] border border-white/10 animate-in zoom-in-95 duration-300 my-8">
        
        {step === 'selection' && (
          <>
            <div className="bg-[#fb0334] p-12 text-center text-white relative">
              <button onClick={onClose} className="absolute top-6 right-6 p-2 hover:bg-black/10 rounded-full transition-colors"><X size={24} /></button>
              <h2 className="text-4xl md:text-5xl font-black uppercase mb-3 tracking-tighter italic">VTE PREMIUM</h2>
              <p className="font-bold text-lg opacity-90">Libere a transmissão de todos os canais agora!</p>
            </div>
            
            <div className="p-8 grid md:grid-cols-2 gap-8">
              <div className="p-8 rounded-[2rem] border-2 border-white/5 bg-white/5 hover:border-[#fb0334]/50 transition-all flex flex-col">
                <h4 className="text-2xl font-black mb-2 uppercase tracking-tight">Mensal</h4>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-black text-[#fb0334]">R$ 29,90</span>
                  <span className="text-gray-500 font-bold">/mês</span>
                </div>
                <ul className="text-sm space-y-4 mb-8 flex-grow">
                  <li className="flex items-center gap-3 font-medium"><Check size={18} className="text-green-500" /> Canais Ao Vivo 4K</li>
                  <li className="flex items-center gap-3 font-medium"><Check size={18} className="text-green-500" /> Filmes e Séries Liberados</li>
                </ul>
                <button 
                  onClick={() => handleSelectPlan('Mensal', 'R$ 29,90')}
                  className="w-full bg-[#fb0334] text-white py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-[#ff2b56] transition-all flex items-center justify-center gap-2"
                >
                  ASSINAR <ArrowRight size={18} />
                </button>
              </div>

              <div className="p-8 rounded-[2rem] border-2 border-[#fb0334] bg-[#fb0334]/10 relative overflow-hidden flex flex-col shadow-[inset_0_0_40px_rgba(251,3,52,0.2)]">
                <div className="absolute top-5 right-[-35px] bg-green-500 text-white text-[10px] font-black px-10 py-1.5 rotate-45 shadow-lg border-b border-white/20 uppercase tracking-widest">Economize</div>
                <h4 className="text-2xl font-black mb-2 uppercase tracking-tight">Anual</h4>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-5xl font-black text-[#fb0334]">R$ 299,00</span>
                </div>
                <p className="text-[14px] font-black text-white/80 mb-6 uppercase tracking-[1px]">R 24,91/mês</p>
                <ul className="text-sm space-y-4 mb-8 flex-grow">
                  <li className="flex items-center gap-3 font-bold"><Check size={18} className="text-green-500" /> Mesmas vantagens Premium</li>
                  <li className="flex items-center gap-3 font-bold text-[#fb0334]"><Check size={18} /> Suporte VIP 24h</li>
                </ul>
                <button 
                  onClick={() => handleSelectPlan('Anual', 'R$ 299,00')}
                  className="w-full bg-white text-black py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-[#fb0334] hover:text-white transition-all shadow-xl flex items-center justify-center gap-2"
                >
                  ESCOLHER ANUAL <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </>
        )}

        {step === 'checkout' && (
          <div className="p-10 text-center animate-in slide-in-from-right-10 duration-500 relative">
            <button onClick={() => setStep('selection')} className="absolute top-6 left-10 text-gray-500 hover:text-white font-black uppercase text-[10px] tracking-widest flex items-center gap-2 transition-colors">
               ← Voltar
            </button>
            <h2 className="text-4xl font-black mb-2 uppercase italic tracking-tighter">PAGAMENTO PIX</h2>
            <p className="text-gray-400 mb-8 font-bold uppercase text-xs tracking-widest">
              Total a pagar: <span className="text-white">{selectedPlan?.price}</span>
            </p>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-10 max-w-2xl mx-auto">
              <div className="bg-white p-4 rounded-[2rem] w-72 h-72 shadow-2xl flex items-center justify-center border-[6px] border-[#fb0334]">
                <img src={qrCodeUrl} alt="QR Code PIX" className="w-full h-full object-contain" />
              </div>

              <div className="flex-1 space-y-6 w-full text-left">
                <div className="p-5 bg-white/5 rounded-[1.5rem] border border-white/10 relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-2 h-full bg-[#fb0334]"></div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-[2px] mb-3">Chave Pix Copia e Cola</p>
                  <div className="flex items-center justify-between gap-3">
                    <div className="bg-black/50 px-4 py-4 rounded-xl border border-white/10 text-[9px] font-mono text-[#fb0334] break-all flex-grow leading-relaxed font-bold">
                      {pixKey}
                    </div>
                    <button 
                      onClick={copyPix}
                      className={`p-4 rounded-xl transition-all shadow-xl flex-shrink-0 ${copied ? 'bg-green-500 text-white' : 'bg-[#fb0334] text-white hover:bg-[#ff2b56]'}`}
                    >
                      {copied ? <Check size={24} /> : <Copy size={24} />}
                    </button>
                  </div>
                  {copied && <p className="text-[10px] text-green-500 font-bold mt-2 animate-bounce uppercase tracking-widest text-center">Copiado!</p>}
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-5 bg-blue-500/10 rounded-2xl border border-blue-500/20">
                    <Smartphone className="text-blue-400 flex-shrink-0" size={24} />
                    <p className="text-[12px] text-gray-300 font-bold leading-snug">
                      Abra o banco, aponte a câmera para o QR Code ou cole a chave acima.
                    </p>
                  </div>
                  
                  <button 
                    onClick={handleConfirmPayment}
                    className="w-full bg-green-600 text-white py-5 rounded-[1.5rem] font-black uppercase tracking-[3px] hover:bg-green-500 transition-all shadow-2xl text-base"
                  >
                    JÁ REALIZEI O PAGAMENTO
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 'success' && (
          <div className="p-20 text-center animate-in zoom-in-95 duration-500">
            <div className="w-32 h-32 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-10 border-[8px] border-green-500 animate-bounce">
              <Check size={64} className="text-green-500" strokeWidth={5} />
            </div>
            <h2 className="text-5xl font-black mb-4 uppercase italic tracking-tighter">PAGAMENTO CONFIRMADO!</h2>
            <p className="text-gray-400 text-xl mb-12 max-w-sm mx-auto font-bold opacity-90">
              Sua conta <span className="text-white">VTE Premium</span> foi liberada. A transmissão agora está funcionando!
            </p>
            <button 
              onClick={resetModal}
              className="px-20 py-6 bg-[#fb0334] text-white rounded-[2rem] font-black uppercase tracking-[3px] hover:bg-[#ff2b56] transition-all shadow-2xl text-xl"
            >
              COMEÇAR A ASSISTIR
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export const ChannelsModal: React.FC<{ isOpen: boolean; onClose: () => void; onPlay: (item: ContentItem) => void }> = ({ isOpen, onClose, onPlay }) => {
  const [search, setSearch] = useState('');
  const filteredCanais = CANAIS.filter(c => c.title.toLowerCase().includes(search.toLowerCase()));

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[120] bg-[#060606] flex flex-col animate-in fade-in duration-300">
      {/* Header Modal */}
      <div className="p-6 md:p-10 flex items-center justify-between border-b border-white/5 bg-black/50 backdrop-blur-xl">
        <div className="flex items-center gap-6">
          <button onClick={onClose} className="p-3 hover:bg-white/10 rounded-full transition-colors text-white">
            <X size={32} />
          </button>
          <h2 className="text-2xl md:text-3xl font-black uppercase italic tracking-tighter text-[#fb0334]">Grade Completa</h2>
        </div>
        <div className="relative w-full max-w-md hidden md:block">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
          <input 
            type="text" 
            placeholder="Buscar canal..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-full py-3 pl-12 pr-6 focus:outline-none focus:border-[#fb0334] transition-all font-bold text-sm"
          />
        </div>
      </div>

      {/* Grid de Canais */}
      <div className="flex-grow overflow-y-auto p-8 md:p-16">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-8 md:gap-12">
          {filteredCanais.map((item) => (
            <div 
              key={item.id}
              onClick={() => { onPlay(item); onClose(); }}
              className="flex flex-col items-center group cursor-pointer"
            >
              <div className="relative w-24 h-24 md:w-36 md:h-36 rounded-full p-1 bg-gradient-to-tr from-white/5 to-white/10 group-hover:from-[#fb0334] group-hover:to-[#ff2b56] transition-all duration-500 shadow-xl">
                <div className="w-full h-full rounded-full bg-[#111] overflow-hidden relative">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Play fill="white" size={32} className="text-white" />
                  </div>
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-red-600 px-3 py-0.5 rounded-full border border-white/20 shadow-lg">
                    <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                    <span className="text-[10px] font-black text-white">LIVE</span>
                  </div>
                </div>
              </div>
              <span className="mt-4 font-bold text-xs md:text-sm text-center text-gray-300 group-hover:text-white transition-colors truncate w-full uppercase tracking-widest">
                {item.title}
              </span>
            </div>
          ))}
          {filteredCanais.length === 0 && (
            <div className="col-span-full py-20 text-center">
              <p className="text-gray-500 font-black uppercase tracking-widest text-xl">Nenhum canal encontrado para "{search}"</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const PlayerModal: React.FC<{ isOpen: boolean; onClose: () => void; item: ContentItem | null }> = ({ isOpen, onClose, item }) => {
  const [isConnecting, setIsConnecting] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(100);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerContainerRef = useRef<HTMLDivElement>(null);

  const videoSources = [
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
  ];

  useEffect(() => {
    if (isOpen && item) {
      setIsConnecting(true);
      setIsPlaying(false);
      const timer = setTimeout(() => {
        setIsConnecting(false);
        setIsPlaying(true);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [isOpen, item]);

  useEffect(() => {
    if (!isConnecting && isOpen && videoRef.current) {
      videoRef.current.play().catch(err => {
        console.warn("Autoplay bloqueado:", err);
        setIsPlaying(false);
      });
    }
  }, [isConnecting, isOpen]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      const newMuted = !isMuted;
      videoRef.current.muted = newMuted;
      setIsMuted(newMuted);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value);
    setVolume(val);
    if (videoRef.current) {
      videoRef.current.volume = val / 100;
      setIsMuted(val === 0);
    }
  };

  const toggleFullScreen = () => {
    if (!playerContainerRef.current) return;
    if (!document.fullscreenElement) {
      playerContainerRef.current.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch(err => {
        console.error("Erro tela cheia:", err);
      });
    } else {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false);
      });
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      setDuration(videoRef.current.duration);
    }
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const formatTime = (time: number) => {
    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60);
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
  };

  if (!isOpen || !item) return null;

  return (
    <div 
      className="fixed inset-0 z-[150] bg-black flex flex-col items-center justify-center animate-in fade-in duration-500 overflow-hidden" 
      ref={playerContainerRef}
    >
      <div className="absolute top-0 left-0 right-0 p-8 flex items-center justify-between z-30 bg-gradient-to-b from-black/90 to-transparent">
        <div className="flex items-center gap-6">
          <button onClick={onClose} className="p-3 bg-white/10 hover:bg-[#fb0334] rounded-full transition-all backdrop-blur-md">
            <X size={28} />
          </button>
          <div>
            <h2 className="text-2xl font-black italic tracking-tighter text-white uppercase">{item.title}</h2>
            <div className="flex items-center gap-3 mt-1">
              <span className="text-xs text-[#fb0334] font-black uppercase tracking-[3px]">{item.category}</span>
              <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
              <span className="text-[10px] text-gray-300 font-bold uppercase tracking-widest">4K ULTRA HD</span>
            </div>
          </div>
        </div>
        <div className="bg-red-600 px-4 py-1.5 rounded-lg flex items-center gap-2 shadow-[0_0_20px_rgba(220,38,38,0.5)] animate-pulse">
          <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
          <span className="text-[11px] font-black uppercase tracking-[2px] text-white">AO VIVO</span>
        </div>
      </div>

      <div className="w-full h-full relative flex items-center justify-center group">
        {isConnecting ? (
          <div className="absolute inset-0 z-20 bg-black flex flex-col items-center justify-center gap-8 text-center">
            <div className="relative">
              <RefreshCw size={100} className="text-[#fb0334] animate-spin opacity-50" strokeWidth={1} />
              <div className="absolute inset-0 flex items-center justify-center">
                 <h2 className="text-3xl font-black italic text-[#fb0334] animate-pulse">VTE</h2>
              </div>
            </div>
            <div className="space-y-3 px-4">
              <h3 className="text-2xl font-bold uppercase tracking-[6px] animate-pulse text-white">Conectando ao sinal...</h3>
              <p className="text-gray-500 text-[10px] font-black uppercase tracking-[3px]">Transmissão Premium VTEPLAY</p>
            </div>
          </div>
        ) : (
          <video 
            ref={videoRef}
            className="w-full h-full object-contain cursor-pointer"
            onTimeUpdate={handleTimeUpdate}
            onClick={togglePlay}
            src={videoSources[0]}
            loop
            playsInline
          >
            <source src={videoSources[0]} type="video/mp4" />
            <source src={videoSources[1]} type="video/mp4" />
          </video>
        )}

        {!isConnecting && !isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 z-10 cursor-pointer" onClick={togglePlay}>
            <div className="w-32 h-32 bg-[#fb0334] rounded-full flex items-center justify-center shadow-[0_0_60px_rgba(251,3,52,0.6)] hover:scale-110 active:scale-95 transition-all">
              <Play fill="white" size={48} className="ml-2 text-white" />
            </div>
          </div>
        )}

        {!isConnecting && (
          <div className="absolute bottom-0 left-0 right-0 p-10 bg-gradient-to-t from-black via-black/80 to-transparent flex flex-col gap-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 z-30">
            <div className="relative w-full">
              <input 
                type="range"
                min="0"
                max={duration || 100}
                value={currentTime}
                onChange={handleProgressChange}
                className="w-full h-1.5 bg-white/20 rounded-full appearance-none cursor-pointer accent-[#fb0334]"
              />
              <div 
                className="absolute top-0 left-0 h-1.5 bg-[#fb0334] rounded-full pointer-events-none shadow-[0_0_15px_rgba(251,3,52,0.6)]" 
                style={{ width: `${(currentTime / (duration || 1)) * 100}%` }}
              ></div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-10">
                <button onClick={togglePlay} className="text-white hover:text-[#fb0334] transition-all">
                  {isPlaying ? <Pause fill="white" size={36} /> : <Play fill="white" size={36} />}
                </button>
                <div className="flex items-center gap-4 group/volume">
                  <button onClick={toggleMute} className="text-white hover:text-[#fb0334] transition-colors">
                    {isMuted || volume === 0 ? <VolumeX size={32} /> : <Volume2 size={32} />}
                  </button>
                  <div className="w-24">
                    <input 
                      type="range" 
                      min="0"
                      max="100"
                      value={volume}
                      onChange={handleVolumeChange}
                      className="w-full accent-[#fb0334] cursor-pointer" 
                    />
                  </div>
                </div>
                <div className="text-sm font-mono font-bold text-gray-300">
                  <span className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 bg-red-600 rounded-full animate-pulse"></span>
                    AO VIVO • VTEPLAY PREMIUM SIGNAL
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-8">
                  <button className="flex items-center gap-2 text-[10px] font-black uppercase text-gray-400 hover:text-white transition-colors">
                    <Settings size={22} />
                    <span>Configurações</span>
                  </button>
                  <button onClick={toggleFullScreen} className="text-white hover:text-[#fb0334] transition-all hover:scale-125">
                    {isFullscreen ? <Minimize size={32} /> : <Maximize size={32} />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="absolute bottom-10 left-10 opacity-10 pointer-events-none">
        <h3 className="text-6xl font-black italic tracking-tighter text-white">VTEPLAY</h3>
      </div>
    </div>
  );
};
