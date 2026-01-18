
import React, { useState } from 'react';
// Added Play to imports
import { X, Copy, Check, Lock, ShieldCheck, Mail, Play } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="bg-[#111] w-full max-w-md rounded-3xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-black italic text-[#fb0334]">VTEPLAY</h2>
            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors"><X /></button>
          </div>
          <h3 className="text-xl font-bold mb-6">Entre na sua conta</h3>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-400 uppercase">E-mail ou Usuário</label>
              <div className="relative">
                <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[#fb0334] transition-colors" placeholder="seu@email.com" />
                <Mail className="absolute right-4 top-3.5 text-gray-500" size={18} />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-400 uppercase">Senha</label>
              <div className="relative">
                <input type="password" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[#fb0334] transition-colors" placeholder="••••••••" />
                <Lock className="absolute right-4 top-3.5 text-gray-500" size={18} />
              </div>
            </div>
            <button className="w-full bg-[#fb0334] text-white py-4 rounded-xl font-bold text-lg shadow-xl shadow-[#fb0334]/20 hover:bg-[#ff2b56] transition-all">
              ENTRAR
            </button>
          </form>
          <div className="mt-6 text-center space-y-4">
            <a href="#" className="text-sm text-[#fb0334] hover:underline block">Esqueceu a senha?</a>
            <p className="text-sm text-gray-400">Não tem conta? <a href="#" className="text-white font-bold hover:underline">Crie uma agora</a></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const PlansModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const pixKey = "0d08c383-9251-4d6d-a7c4";
  const [copied, setCopied] = useState(false);

  const copyPix = () => {
    navigator.clipboard.writeText(pixKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="bg-[#111] w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-300 my-8">
        <div className="bg-[#fb0334] p-8 text-center text-white relative">
          <button onClick={onClose} className="absolute top-4 right-4 p-2 hover:bg-black/10 rounded-full transition-colors"><X /></button>
          <h2 className="text-3xl font-black uppercase mb-2">Planos VTE Premium</h2>
          <p className="font-semibold opacity-90">Escolha o melhor para você e sua família</p>
        </div>
        <div className="p-8 grid md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl border-2 border-[#fb0334] bg-black/20 flex flex-col items-center text-center">
            <h4 className="text-xl font-bold mb-2">Mensal</h4>
            <div className="text-4xl font-black mb-1">R$ 29,90</div>
            <p className="text-xs text-gray-400 mb-6">Cobrado mensalmente</p>
            <ul className="text-sm text-left w-full space-y-3 mb-8">
              <li className="flex items-center gap-2"><Check size={16} className="text-green-500" /> 4 Telas simultâneas</li>
              <li className="flex items-center gap-2"><Check size={16} className="text-green-500" /> Qualidade 4K Ultra HD</li>
              <li className="flex items-center gap-2"><Check size={16} className="text-green-500" /> Todos os canais liberados</li>
            </ul>
            <div className="mt-auto w-full space-y-4">
              <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                <p className="text-[10px] uppercase font-bold text-gray-500 mb-1 text-left">Chave PIX para pagamento</p>
                <div className="flex items-center justify-between gap-2">
                  <code className="text-xs truncate text-[#fb0334] font-mono">{pixKey}</code>
                  <button onClick={copyPix} className="p-2 bg-[#fb0334] rounded text-white hover:bg-[#ff2b56] transition-all">
                    {copied ? <Check size={14} /> : <Copy size={14} />}
                  </button>
                </div>
              </div>
              <p className="text-[10px] text-gray-500 italic">Após o pagamento, envie o comprovante para nosso suporte.</p>
            </div>
          </div>
          
          <div className="p-6 rounded-2xl border border-white/10 bg-white/5 flex flex-col items-center text-center relative overflow-hidden">
            <div className="absolute top-4 right-[-35px] bg-green-500 text-white text-[10px] font-bold px-10 py-1 rotate-45">MELHOR VALOR</div>
            <h4 className="text-xl font-bold mb-2">Anual</h4>
            <div className="text-4xl font-black mb-1">R$ 299,00</div>
            <p className="text-xs text-gray-400 mb-6">Equivale a R$ 24,91/mês</p>
            <ul className="text-sm text-left w-full space-y-3 mb-8">
              <li className="flex items-center gap-2"><Check size={16} className="text-green-500" /> Mesmas vantagens Premium</li>
              <li className="flex items-center gap-2"><Check size={16} className="text-green-500" /> Economize 2 meses</li>
              <li className="flex items-center gap-2"><Check size={16} className="text-green-500" /> Suporte VIP 24h</li>
            </ul>
            <button className="mt-auto w-full border-2 border-[#fb0334] text-[#fb0334] hover:bg-[#fb0334] hover:text-white py-3 rounded-xl font-bold transition-all uppercase tracking-wider">
              Escolher Anual
            </button>
          </div>
        </div>
        <div className="px-8 pb-8 flex items-center justify-center gap-8 text-gray-500 opacity-50">
          <div className="flex items-center gap-2"><ShieldCheck size={20} /> <span className="text-xs font-bold">100% SEGURO</span></div>
          <div className="flex items-center gap-2"><Lock size={20} /> <span className="text-xs font-bold">DADOS CRIPTOGRAFADOS</span></div>
        </div>
      </div>
    </div>
  );
};

export const PlayerModal: React.FC<{ isOpen: boolean; onClose: () => void; item: any }> = ({ isOpen, onClose, item }) => {
  if (!isOpen || !item) return null;
  return (
    <div className="fixed inset-0 z-[150] bg-black flex flex-col items-center justify-center animate-in fade-in duration-500">
      <div className="absolute top-6 left-6 flex items-center gap-4 z-20">
        <button onClick={onClose} className="p-3 bg-white/10 hover:bg-[#fb0334] rounded-full transition-all backdrop-blur-md">
          <X size={28} />
        </button>
        <div>
          <h2 className="text-2xl font-bold leading-none">{item.title}</h2>
          <span className="text-sm text-gray-400 uppercase tracking-widest">{item.category}</span>
        </div>
      </div>
      
      {/* Fake Player */}
      <div className="w-full aspect-video bg-[#0c0c0c] flex items-center justify-center relative group">
        <img src={item.image} className="absolute inset-0 w-full h-full object-cover opacity-20 blur-xl" />
        <div className="relative text-center z-10 p-8">
          <div className="w-24 h-24 border-4 border-[#fb0334] rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
            <div className="w-4 h-4 bg-[#fb0334] rounded-full"></div>
          </div>
          <h3 className="text-3xl font-black mb-2">CARREGANDO TRANSMISSÃO</h3>
          <p className="text-gray-400">Verificando sua conexão com o servidor de VTEPLAY...</p>
        </div>
        
        {/* Mock Controls */}
        <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="flex items-center gap-6">
            <Play fill="white" size={32} />
            <div className="w-[400px] h-1.5 bg-white/20 rounded-full overflow-hidden">
              <div className="w-1/3 h-full bg-[#fb0334]"></div>
            </div>
          </div>
          <div className="flex items-center gap-4">
             <span className="text-sm font-mono">00:34 / 02:15:00</span>
          </div>
        </div>
      </div>
    </div>
  );
};
