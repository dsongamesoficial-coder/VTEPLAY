
import React, { useState } from 'react';
import { Users, CreditCard, TrendingUp, ShieldCheck, X, Trash2, Edit, Clock, CheckCircle, Ban } from 'lucide-react';
import { User } from '../types';

interface AdminDashboardProps {
  onClose: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'payments' | 'users'>('overview');

  const stats = [
    { label: 'Total Usuários', value: '1.284', icon: <Users className="text-blue-500" /> },
    { label: 'Assinantes Ativos', value: '452', icon: <ShieldCheck className="text-green-500" /> },
    { label: 'Receita Mensal (PIX)', value: 'R$ 13.514', icon: <CreditCard className="text-[#fb0334]" /> },
    { label: 'Aguardando PIX', value: '8', icon: <Clock className="text-yellow-500" /> },
  ];

  const mockUsers: User[] = [
    { id: '1', name: 'Admin VTE', email: 'admin@vteplay.com', role: 'admin', isSubscribed: true, createdAt: '2023-01-01' },
    { id: '2', name: 'João Silva', email: 'joao@email.com', role: 'user', isSubscribed: true, createdAt: '2023-05-12' },
    { id: '3', name: 'Maria Souza', email: 'maria@test.com', role: 'user', isSubscribed: false, createdAt: '2023-11-20' },
  ];

  const pendingPayments = [
    { id: 'p1', user: 'Ricardo Montes', plan: 'Anual', value: 'R$ 299,00', time: 'Há 5 min', status: 'pending' },
    { id: 'p2', user: 'Julia Lima', plan: 'Mensal', value: 'R$ 29,90', time: 'Há 12 min', status: 'pending' },
    { id: 'p3', user: 'Marcos Braz', plan: 'Mensal', value: 'R$ 29,90', time: 'Há 45 min', status: 'pending' },
  ];

  return (
    <div className="fixed inset-0 z-[200] bg-[#060606] overflow-y-auto font-sans">
      <div className="container mx-auto px-6 py-10">
        <div className="flex justify-between items-start mb-10 border-b border-white/10 pb-8">
          <div>
            <h1 className="text-4xl font-black text-[#fb0334] italic uppercase tracking-tighter mb-2">Painel do Dono VTEPLAY</h1>
            <p className="text-gray-400 font-medium">Controle total da sua plataforma de streaming</p>
          </div>
          <button onClick={onClose} className="p-4 bg-white/5 hover:bg-white/10 rounded-2xl transition-all border border-white/5">
            <X size={32} />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-4 mb-10">
          <button 
            onClick={() => setActiveTab('overview')}
            className={`px-6 py-3 rounded-xl font-bold uppercase text-xs tracking-widest transition-all ${activeTab === 'overview' ? 'bg-[#fb0334] text-white' : 'bg-white/5 text-gray-500 hover:bg-white/10'}`}
          >
            Visão Geral
          </button>
          <button 
            onClick={() => setActiveTab('payments')}
            className={`px-6 py-3 rounded-xl font-bold uppercase text-xs tracking-widest transition-all flex items-center gap-2 ${activeTab === 'payments' ? 'bg-[#fb0334] text-white' : 'bg-white/5 text-gray-500 hover:bg-white/10'}`}
          >
            Aprovar PIX <span className="bg-white/20 px-1.5 py-0.5 rounded text-[10px]">{pendingPayments.length}</span>
          </button>
          <button 
            onClick={() => setActiveTab('users')}
            className={`px-6 py-3 rounded-xl font-bold uppercase text-xs tracking-widest transition-all ${activeTab === 'users' ? 'bg-[#fb0334] text-white' : 'bg-white/5 text-gray-500 hover:bg-white/10'}`}
          >
            Usuários
          </button>
        </div>

        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {stats.map((stat, i) => (
              <div key={i} className="bg-[#111] p-8 rounded-3xl border border-white/5 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform"></div>
                <div className="flex items-center justify-between mb-6 relative">
                  <div className="p-3 bg-white/5 rounded-2xl border border-white/5">{stat.icon}</div>
                </div>
                <p className="text-gray-500 text-xs font-black uppercase tracking-widest mb-2">{stat.label}</p>
                <h3 className="text-3xl font-black">{stat.value}</h3>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'payments' && (
          <div className="bg-[#111] rounded-[2rem] border border-white/10 overflow-hidden shadow-2xl animate-in fade-in duration-500">
            <div className="p-8 border-b border-white/5 bg-white/5">
              <h3 className="text-xl font-black uppercase tracking-widest">Aguardando Aprovação (Comprovante PIX)</h3>
            </div>
            <div className="p-8 space-y-4">
              {pendingPayments.map((p) => (
                <div key={p.id} className="bg-white/5 p-6 rounded-2xl border border-white/5 flex items-center justify-between group hover:bg-white/[0.07] transition-all">
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 bg-[#fb0334]/20 rounded-full flex items-center justify-center text-[#fb0334] font-black italic">V</div>
                    <div>
                      <h4 className="font-bold text-lg">{p.user}</h4>
                      <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">{p.plan} • <span className="text-[#fb0334]">{p.value}</span> • {p.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all">
                      <CheckCircle size={16} /> Aprovar
                    </button>
                    <button className="flex items-center gap-2 bg-white/5 hover:bg-red-600/20 hover:text-red-500 text-gray-400 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all border border-white/10">
                      <Ban size={16} /> Recusar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="bg-[#111] rounded-[2rem] border border-white/10 overflow-hidden shadow-2xl animate-in fade-in duration-500">
            <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white/5">
              <h3 className="text-xl font-black uppercase tracking-widest">Gestão de Clientes</h3>
              <div className="flex gap-4">
                <input type="text" placeholder="Buscar usuário..." className="bg-black/40 border border-white/10 px-4 py-2 rounded-xl text-sm focus:outline-none focus:border-[#fb0334] transition-all" />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-[10px] font-black text-gray-500 uppercase tracking-[2px] bg-white/5">
                    <th className="px-8 py-6">Usuário</th>
                    <th className="px-8 py-6">E-mail</th>
                    <th className="px-8 py-6">Status</th>
                    <th className="px-8 py-6 text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {mockUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-white/5 transition-colors">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-3 font-bold">
                           <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-[10px]">{user.name.charAt(0)}</div>
                           {user.name}
                        </div>
                      </td>
                      <td className="px-8 py-6 text-gray-400 font-medium">{user.email}</td>
                      <td className="px-8 py-6">
                        {user.isSubscribed ? (
                          <span className="bg-green-500/10 text-green-500 text-[10px] font-black px-3 py-1 rounded-full uppercase border border-green-500/20">Ativo</span>
                        ) : (
                          <span className="bg-gray-500/10 text-gray-400 text-[10px] font-black px-3 py-1 rounded-full uppercase border border-white/10">Gratuito</span>
                        )}
                      </td>
                      <td className="px-8 py-6 text-right">
                        <div className="flex justify-end gap-2">
                          <button className="p-3 bg-white/5 hover:text-[#fb0334] rounded-xl transition-all border border-white/5"><Edit size={16} /></button>
                          <button className="p-3 bg-white/5 hover:text-red-500 rounded-xl transition-all border border-white/5"><Trash2 size={16} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
