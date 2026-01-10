import React from 'react';
import { Calendar, Tag, ChevronRight, ArrowRight, Zap, Shield, MessageSquare, Newspaper, Terminal, ExternalLink } from 'lucide-react';
import { Language } from '../types';
import { t } from '../services/i18n';

interface NewsProps {
  language: Language;
}

const News: React.FC<NewsProps> = ({ language }) => {
  const latestPatches = [
    { date: language === 'ru' ? '08 ЯНВАРЯ, 2026' : 'JANUARY 08, 2026', title: language === 'ru' ? 'Патч 1.2.4: Баланс оружия' : 'Patch 1.2.4: Weapon Balance', desc: language === 'ru' ? 'Уменьшена отдача AK-47, исправлены баги на карте Dust Cyberpunk.' : 'Reduced AK-47 recoil, fixed bugs on Dust Cyberpunk map.', color: 'border-accent-cyan', text: 'text-accent-cyan' },
    { date: language === 'ru' ? '05 ЯНВАРЯ, 2026' : 'JANUARY 05, 2026', title: language === 'ru' ? 'Технические работы' : 'Server Maintenance', desc: language === 'ru' ? 'Улучшение стабильности серверов в регионе EU West.' : 'Improving server stability in EU West region.', color: 'border-white/20', text: 'text-gray-400' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 animate-fade-in space-y-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Newspaper size={32} className="text-accent-cyan" />
            <h1 className="text-5xl md:text-6xl font-gaming font-black italic uppercase tracking-tighter leading-none">
              {t('news.title', language)} <span className="text-accent-cyan">{t('news.subtitle', language)}</span>
            </h1>
          </div>
          <p className="text-gray-500 font-bold uppercase tracking-[4px] text-xs">Registry // Patch Archive // Ops Newsfeed</p>
        </div>
        <div className="flex gap-4">
          <div className="flex flex-col items-end">
            <span className="text-[10px] text-gray-600 font-black tracking-widest uppercase mb-1">Status</span>
            <div className="flex items-center gap-2 px-4 py-2 bg-accent-cyan/10 border border-accent-cyan/30 hud-corners">
              <div className="w-2 h-2 bg-accent-cyan rounded-full animate-pulse" />
              <span className="text-accent-cyan font-gaming font-bold text-sm uppercase tracking-widest">v1.2.4.RC1 Live</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hero: Major Update Section */}
      <div className="grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 relative group overflow-hidden glass hud-corners border-none h-[550px] cursor-pointer">
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors z-10" />
          <img 
            src="https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2070" 
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 opacity-70" 
            alt="Ice Storm"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-transparent to-transparent z-20" />
          
          <div className="absolute bottom-0 p-12 z-30 space-y-5">
            <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-accent-cyan text-black text-[11px] font-black uppercase italic tracking-[3px] shadow-[0_0_20px_rgba(0,240,255,0.4)]">
              <Zap size={14} fill="currentColor" /> Major Update
            </div>
            <h2 className="text-6xl md:text-7xl font-gaming font-black italic uppercase tracking-tighter leading-[0.9]">
              {t('news.major_title', language)} <br/><span className="text-accent-cyan neon-glow">{t('news.major_subtitle', language)}</span>
            </h2>
            <p className="text-gray-300 max-w-xl text-sm leading-relaxed font-medium uppercase tracking-wider">
              {language === 'ru' 
                ? 'Новая карта в условиях вечной мерзлоты, 3 новых оперативника и полностью переработанная система стрельбы.' 
                : 'New frostbite map, 3 new operatives, and completely reworked shooting mechanics.'}
            </p>
            <button className="flex items-center gap-4 text-accent-cyan font-gaming font-black uppercase text-lg tracking-[4px] hover:gap-8 transition-all group/btn pt-6">
              {t('news.changelog', language)} <ArrowRight size={24} className="group-hover/btn:translate-x-3 transition-transform" />
            </button>
          </div>
        </div>

        {/* Patch History Sidebar */}
        <div className="space-y-6">
          <div className="flex items-center justify-between mb-2 border-b border-white/10 pb-4">
            <h3 className="font-gaming font-black text-sm text-gray-500 uppercase tracking-[4px]">Latest Patches</h3>
            <Terminal size={18} className="text-gray-600" />
          </div>
          
          <div className="space-y-4">
            {latestPatches.map((patch, i) => (
              <div 
                key={i} 
                className={`p-6 glass rounded-none border-l-4 ${patch.color} hover:bg-white/5 transition-all cursor-pointer group relative overflow-hidden`}
              >
                <div className="absolute top-0 right-0 w-16 h-16 bg-white/5 -mr-8 -mt-8 rotate-45 transform group-hover:scale-125 transition-transform" />
                <p className={`text-[10px] font-black mb-1 tracking-[3px] ${patch.text}`}>{patch.date}</p>
                <h4 className="font-bold text-base text-white uppercase tracking-wider mb-2">{patch.title}</h4>
                <p className="text-xs text-gray-500 font-medium italic leading-relaxed">{patch.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default News;