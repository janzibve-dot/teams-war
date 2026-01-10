
import React, { useState, useEffect, useRef } from 'react';
import { Send, Hash, Users, Shield, Trophy, Zap, Search, Bell, Settings, Terminal, Star } from 'lucide-react';
import { User as UserType } from '../types';

interface CommunityProps {
  user: UserType | null;
}

const STORAGE_KEY = 'teams_war_community_messages';

const Community: React.FC<CommunityProps> = ({ user }) => {
  const [activeChannel, setActiveChannel] = useState('общий-чат');
  const [message, setMessage] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  const channels = [
    { id: 'общий-чат', icon: Hash, label: 'общий-чат', desc: 'Глобальный канал связи' },
    { id: 'поиск-команды', icon: Users, label: 'поиск-команды', desc: 'Сбор отрядов для спецопераций' },
    { id: 'турниры', icon: Trophy, label: 'турниры', desc: 'Сетка вещания и квалификации' },
    { id: 'тех-поддержка', icon: Shield, label: 'тех-поддержка', desc: 'Рапорты в штаб' },
  ];

  const [chatMessages, setChatMessages] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
    return [
      { id: 1, user: 'Major_Striker', text: 'Нужен один саппорт в рейтинговый матч! 🎯 Пинг не выше 30.', time: '14:20', color: 'text-accent-cyan', role: 'Elite' },
      { id: 2, user: 'Admin_Neo', text: 'Завтра в 18:00 МСК профилактика серверов. Всем быть наготове.', time: '14:25', color: 'text-accent-red', role: 'Staff' },
      { id: 3, user: 'Killer_77', text: 'Ищу клан. Ранг: Алмаз. Стата 1.8 K/D.', time: '14:30', color: 'text-white', role: 'Player' },
    ];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(chatMessages));
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newMessage = {
      id: Date.now(),
      user: user ? user.username : 'GUEST_' + Math.floor(1000 + Math.random() * 9000),
      text: message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      color: 'text-white',
      role: user ? 'Registered' : 'Guest'
    };

    setChatMessages([...chatMessages, newMessage]);
    setMessage('');
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 animate-fade-in flex flex-col h-[calc(100vh-120px)]">
      {/* HUD Header */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <Terminal size={20} className="text-accent-cyan" />
            <h2 className="text-4xl font-gaming font-black italic tracking-tighter uppercase leading-none">
              ЦЕНТР <span className="text-accent-cyan">СВЯЗИ</span>
            </h2>
          </div>
          <p className="text-gray-500 font-bold uppercase tracking-[4px] text-[10px]"> Genesis-Prime Link // Node: Stable</p>
        </div>
        
        <div className="flex gap-8">
           <div className="flex flex-col items-end">
              <span className="text-[10px] text-gray-600 font-black tracking-widest uppercase">Live OPS</span>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full online-pulse" />
                <span className="text-white font-gaming font-bold text-2xl tracking-tighter">1,240</span>
              </div>
           </div>
           <div className="flex flex-col items-end">
              <span className="text-[10px] text-gray-600 font-black tracking-widest uppercase">Grid Status</span>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-accent-cyan rounded-full" />
                <span className="text-accent-cyan font-gaming font-bold text-2xl tracking-tighter uppercase">Online</span>
              </div>
           </div>
        </div>
      </div>

      {/* Main Layout */}
      <div className="flex-1 flex bg-dark-surface/40 border border-white/10 overflow-hidden shadow-2xl backdrop-blur-xl hud-corners">
        
        {/* Sidebar */}
        <div className="w-72 bg-black/60 p-6 border-r border-white/5 flex flex-col hidden lg:flex">
          <div className="relative mb-8">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" size={14} />
            <input 
              type="text" 
              placeholder="ПОИСК ПО КАНАЛАМ..." 
              className="w-full bg-black/50 border border-white/10 rounded-none px-8 py-3 text-[10px] font-bold tracking-widest focus:outline-none focus:border-accent-cyan transition text-white"
            />
          </div>

          <div className="flex-1 space-y-6 overflow-y-auto pr-2 scrollbar-thin">
            <section>
              <h4 className="text-[10px] font-black text-gray-600 uppercase tracking-[4px] mb-4 border-b border-white/5 pb-2">Узлы связи</h4>
              <div className="space-y-1">
                {channels.map((ch) => (
                  <button
                    key={ch.id}
                    onClick={() => setActiveChannel(ch.id)}
                    className={`w-full group flex flex-col p-4 transition-all border-l-2 ${
                      activeChannel === ch.id 
                      ? 'bg-accent-cyan/5 border-accent-cyan text-accent-cyan' 
                      : 'border-transparent text-gray-500 hover:bg-white/5 hover:text-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <ch.icon size={16} />
                      <span className="font-gaming font-bold tracking-widest uppercase text-base">{ch.label}</span>
                    </div>
                  </button>
                ))}
              </div>
            </section>

            <section>
              <h4 className="text-[10px] font-black text-gray-600 uppercase tracking-[4px] mb-4 border-b border-white/5 pb-2">Лидеры Квадранта</h4>
              <div className="space-y-3">
                {[
                  { tag: 'AX', name: 'Apex Legion', color: 'text-accent-red', bg: 'bg-accent-red/10', border: 'border-accent-red' },
                  { tag: 'SW', name: 'Shadow Wolves', color: 'text-accent-cyan', bg: 'bg-accent-cyan/10', border: 'border-accent-cyan' }
                ].map((clan, i) => (
                  <div key={i} className="flex items-center gap-3 p-2 hover:bg-white/5 transition cursor-pointer group">
                    <div className={`w-10 h-10 ${clan.bg} border ${clan.border} flex items-center justify-center font-black ${clan.color} text-sm italic transform group-hover:rotate-12 transition-transform`}>
                      {clan.tag}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-gray-300 uppercase">{clan.name}</span>
                      <span className="text-[8px] text-gray-500 font-black tracking-widest">S-RANK // ACTIVE</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="mt-6 pt-6 border-t border-white/5">
             <div className="flex items-center gap-3 p-3 bg-white/5 border border-white/5">
                <div className="w-10 h-10 bg-accent-cyan/10 border border-accent-cyan/30 flex items-center justify-center font-black text-accent-cyan text-xs">OP</div>
                <div className="flex flex-col overflow-hidden">
                   <span className="text-[10px] font-black text-white truncate uppercase">{user?.username || 'GUEST_OPERATIVE'}</span>
                   <span className="text-[8px] text-accent-cyan font-bold tracking-widest">SYNCHRONIZED</span>
                </div>
                <Settings size={14} className="ml-auto text-gray-600 hover:text-white cursor-pointer" />
             </div>
          </div>
        </div>

        {/* Chat Feed */}
        <div className="flex-1 flex flex-col bg-black/20">
          <div className="h-20 flex items-center justify-between px-8 border-b border-white/5 bg-white/5 backdrop-blur-sm">
            <div className="flex items-center gap-4">
              <Hash size={24} className="text-accent-cyan" />
              <div>
                <h3 className="font-gaming font-black text-2xl tracking-tighter uppercase">{activeChannel}</h3>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <Search size={20} className="text-gray-500 hover:text-white cursor-pointer transition-colors" />
              <Bell size={20} className="text-gray-500 hover:text-white cursor-pointer transition-colors" />
              <Users size={20} className="text-gray-500 hover:text-white cursor-pointer transition-colors" />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-8 space-y-8 scrollbar-thin">
            {chatMessages.map((msg: any) => (
              <div key={msg.id} className="flex gap-5 group animate-fade-in items-start">
                <div className="shrink-0">
                  <div className={`w-14 h-14 bg-dark-bg border ${msg.role === 'Staff' ? 'border-accent-red shadow-[0_0_15px_rgba(255,0,85,0.2)]' : 'border-white/10'} p-0.5 transform group-hover:scale-105 transition-all duration-300`}>
                    <img 
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${msg.user}&backgroundColor=0b0e11`} 
                      alt="avatar" 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all"
                    />
                  </div>
                </div>
                <div className="flex flex-col max-w-2xl">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`font-gaming font-bold text-base tracking-widest italic uppercase ${msg.color || 'text-white'}`}>
                      {msg.user}
                    </span>
                    {msg.role && (
                      <span className={`text-[9px] px-2 py-0.5 font-black uppercase tracking-tighter ${
                        msg.role === 'Staff' ? 'bg-accent-red text-white' : 
                        msg.role === 'Elite' ? 'bg-yellow-500 text-black' : 'bg-white/10 text-gray-400'
                      }`}>
                        {msg.role}
                      </span>
                    )}
                    <span className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">{msg.time}</span>
                  </div>
                  <div className="relative p-4 bg-white/5 border border-white/5 hover:border-accent-cyan/20 transition-all group-hover:bg-white/10">
                    <p className="text-gray-300 text-sm leading-relaxed">{msg.text}</p>
                  </div>
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Chat Input */}
          <div className="p-8 bg-black/40 border-t border-white/5">
            <form onSubmit={handleSendMessage} className="relative group">
              <div className="absolute -inset-0.5 bg-accent-cyan/20 blur opacity-0 group-focus-within:opacity-100 transition duration-500"></div>
              <div className="relative flex items-center gap-4 bg-black/80 border border-white/10 px-6 py-5 focus-within:border-accent-cyan transition-all">
                <Terminal size={20} className="text-accent-cyan" />
                <input 
                  type="text" 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={`ВВОД СООБЩЕНИЯ В #${activeChannel.toUpperCase()}...`} 
                  className="flex-1 bg-transparent text-sm font-bold focus:outline-none text-white tracking-[1px] placeholder:text-gray-700 uppercase"
                />
                <button type="submit" className="text-accent-cyan hover:text-white transition-colors p-2">
                  <Send size={24} />
                </button>
              </div>
            </form>
            <div className="mt-4 flex justify-between items-center text-[10px] font-black text-gray-600 uppercase tracking-[3px] italic">
              <div className="flex gap-6">
                <span className="flex items-center gap-2"><div className="w-1 h-1 bg-gray-600 rounded-full" /> Shift + Enter (NL)</span>
                <span className="flex items-center gap-2"><div className="w-1 h-1 bg-gray-600 rounded-full" /> /CMD LIST</span>
              </div>
              <div className="flex items-center gap-2 text-accent-cyan">
                <Zap size={10} className="animate-pulse" />
                WAR-BOT LINK: ENCRYPTED
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
