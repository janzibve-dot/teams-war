import React from 'react';
import { Shield, Users, Trophy, Calendar, UserCheck, Crown, Medal, Flame, Award, Target, ArrowRight, Zap } from 'lucide-react';
import { Language } from '../types';
import { t } from '../services/i18n';

interface ClanProps {
  onAddNotification: (message: string, type?: 'success' | 'error' | 'info', title?: string) => void;
  language: Language;
}

const Clan: React.FC<ClanProps> = ({ onAddNotification, language }) => {
  const roster = [
    { name: 'Alex_Striker', role: language === 'ru' ? 'Лидер Клана' : 'Clan Leader', rank: 'Legend', status: 'online', isLeader: true },
    { name: 'Neon_Viper', role: language === 'ru' ? 'Офицер / Снайпер' : 'Officer / Sniper', rank: 'Elite', status: 'online' },
    { name: 'Ghost_Rider', role: language === 'ru' ? 'Штурмовик' : 'Entry Fragger', rank: 'Diamond', status: 'offline' },
  ];

  const handleJoinRequest = () => {
    onAddNotification(
      language === 'ru' ? 'Запрос отправлен. Ожидайте подтверждения.' : 'Request sent. Waiting for approval.',
      'info',
      language === 'ru' ? 'ЗАЯВКА В КЛАН' : 'CLAN REQUEST'
    );
  };

  return (
    <div className="animate-fade-in pb-20">
      <section className="relative h-[450px] flex items-end overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070')] bg-cover bg-center">
          <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-dark-bg/60 to-accent-cyan/10" />
        </div>
        
        <div className="max-w-7xl mx-auto w-full px-6 pb-12 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="relative group">
              <div className="w-32 h-32 md:w-44 md:h-44 bg-dark-bg border-4 border-accent-cyan rounded-none flex items-center justify-center shadow-[0_0_40px_rgba(0,240,255,0.3)] hud-corners">
                <Shield size={80} className="text-accent-cyan group-hover:scale-110 transition-transform duration-500" />
              </div>
            </div>

            <div className="text-center md:text-left space-y-4">
              <div className="flex flex-col md:flex-row items-center gap-4">
                <h1 className="text-6xl md:text-8xl font-gaming font-black italic uppercase tracking-tighter leading-none">
                  {t('clan.title', language)} <span className="text-accent-cyan neon-glow">{t('clan.subtitle', language)}</span>
                </h1>
                <span className="text-3xl font-gaming font-bold text-gray-500 italic tracking-widest">[CK]</span>
              </div>
              
              <div className="flex flex-wrap gap-8 text-[10px] font-black uppercase tracking-[3px] text-gray-400 justify-center md:justify-start">
                <span className="flex items-center gap-2"><Users size={16} className="text-accent-cyan" /> 48 / 50 {t('clan.members', language)}</span>
                <span className="flex items-center gap-2"><Trophy size={16} className="text-accent-cyan" /> {t('clan.region', language)}</span>
                <span className="flex items-center gap-2"><Calendar size={16} className="text-accent-cyan" /> {t('clan.created', language)}</span>
              </div>
            </div>

            <div className="md:ml-auto">
              <button onClick={handleJoinRequest} className="skew-btn px-10 py-5 bg-accent-cyan text-black font-gaming font-black text-xl uppercase tracking-widest shadow-[0_0_30px_rgba(0,240,255,0.3)]">
                <span>{t('clan.join', language)}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2 space-y-10">
            <div className="flex items-center gap-6">
              <h2 className="text-4xl font-gaming font-black italic uppercase tracking-tighter">{t('clan.roster', language)} <span className="text-accent-cyan">{t('clan.roster2', language)}</span></h2>
              <div className="h-px flex-1 bg-white/10" />
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {roster.map((member, i) => (
                <div key={i} className="glass p-6 hud-corners group transition-all border-l-4 border-accent-cyan/30 hover:border-accent-cyan flex items-center gap-6 cursor-pointer">
                  <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${member.name}&backgroundColor=0b0e11`} className="w-14 h-14 rounded-none border border-white/10 grayscale group-hover:grayscale-0 transition-all" alt={member.name} />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-white uppercase tracking-wider">{member.name}</p>
                      {member.isLeader && <Crown size={14} className="text-yellow-500" />}
                    </div>
                    <p className="text-[9px] font-black uppercase tracking-[2px] text-accent-cyan/70">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-12">
            <div className="glass p-10 hud-corners border-accent-cyan/20">
              <h3 className="text-2xl font-gaming font-black italic uppercase mb-8 tracking-widest text-accent-cyan">{t('clan.stats', language)}</h3>
              <div className="space-y-6 text-xs text-gray-500 font-black uppercase tracking-widest">
                <div className="flex justify-between border-b border-white/5 pb-3"><span>Win / Loss</span> <span className="text-white">420 / 115</span></div>
                <div className="flex justify-between border-b border-white/5 pb-3"><span>Winrate</span> <span className="text-green-400">78.5%</span></div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Clan;