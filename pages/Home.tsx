import React from 'react';
import { Page, Language } from '../types';
import { ChevronRight, PlayCircle, Shield, Target, Zap, Download } from 'lucide-react';
import { t } from '../services/i18n';

interface HomeProps {
  setPage: (page: Page) => void;
  language: Language;
}

const Home: React.FC<HomeProps> = ({ setPage, language }) => {
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="relative z-10 text-center px-4 flex flex-col items-center">
          
          {/* Developer Neon Sign */}
          <div className="mb-10">
            <div className="dev-neon-sign">
              <span>NiksOnGame</span>
            </div>
          </div>

          <div className="inline-block px-4 py-1 border border-accent-cyan text-accent-cyan text-[10px] font-bold uppercase tracking-[4px] mb-8 animate-bounce" data-i18n="home.season">
            {t('home.season', language)}
          </div>
          
          <h1 className="text-7xl md:text-[11rem] font-gaming font-black italic tracking-tighter leading-none mb-6 neon-glow">
            <span data-i18n="home.heroTitle1">{t('home.heroTitle1', language)}</span> <span className="text-white opacity-90" data-i18n="home.heroTitle2">{t('home.heroTitle2', language)}</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto mb-12 font-light tracking-wide leading-relaxed">
            <span data-i18n="home.heroSubtitle">{t('home.heroSubtitle', language)}</span> <br/>
            <span className="text-accent-cyan font-bold italic" data-i18n="home.motto">{t('home.motto', language)}</span>
          </p>
          
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
            <button 
              onClick={() => setPage(Page.Play)}
              className="skew-btn w-72 py-6 bg-accent-cyan text-black font-gaming font-black text-2xl uppercase shadow-lg shadow-accent-cyan/20"
            >
              <span data-i18n="common.battle">{t('common.battle', language)}</span>
            </button>
            <button 
              onClick={() => setPage(Page.About)}
              className="skew-btn w-72 py-6 bg-white/5 border border-white/10 text-white font-gaming font-black text-2xl uppercase backdrop-blur-md"
            >
              <span data-i18n="common.trailer">{t('common.trailer', language)}</span>
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-dark-surface/50 border-y border-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="flex flex-col items-center text-center p-10 glass rounded-none border-b-4 border-accent-cyan">
            <div className="w-16 h-16 bg-accent-cyan/10 border border-accent-cyan/30 rounded flex items-center justify-center mb-6">
              <Shield className="w-8 h-8 text-accent-cyan" />
            </div>
            <h3 className="text-3xl font-gaming font-black uppercase mb-3">Fair Play</h3>
            <p className="text-gray-500 text-sm tracking-wide uppercase font-bold">Anti-Cheat Sentinel v2.0</p>
          </div>
          
          <div className="flex flex-col items-center text-center p-10 glass rounded-none border-b-4 border-accent-red">
            <div className="w-16 h-16 bg-accent-red/10 border border-accent-red/30 rounded flex items-center justify-center mb-6">
              <Zap className="w-8 h-8 text-accent-red" />
            </div>
            <h3 className="text-3xl font-gaming font-black uppercase mb-3">128 Tickrate</h3>
            <p className="text-gray-500 text-sm tracking-wide uppercase font-bold">No-lag Network Core</p>
          </div>
          
          <div className="flex flex-col items-center text-center p-10 glass rounded-none border-b-4 border-accent-cyan">
            <div className="w-16 h-16 bg-accent-cyan/10 border border-accent-cyan/30 rounded flex items-center justify-center mb-6">
              <Target className="w-8 h-8 text-accent-cyan" />
            </div>
            <h3 className="text-3xl font-gaming font-black uppercase mb-3">Tactical Core</h3>
            <p className="text-gray-500 text-sm tracking-wide uppercase font-bold">Realistic Ballistics</p>
          </div>
        </div>
      </section>

      {/* Action Banner */}
      <section className="py-32 container mx-auto px-6">
        <div className="relative group overflow-hidden">
          <div className="absolute inset-0 bg-accent-cyan/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-3xl"></div>
          <div className="relative glass p-16 md:p-24 border border-accent-cyan/20 flex flex-col md:flex-row items-center justify-between gap-12 hud-corners">
            <div className="text-center md:text-left space-y-4">
              <h2 className="text-6xl md:text-7xl font-gaming font-black italic uppercase leading-none">
                <span data-i18n="home.readyTitle1">{t('home.readyTitle1', language)}</span> <br/><span className="text-accent-cyan neon-glow" data-i18n="home.readyTitle2">{t('home.readyTitle2', language)}</span>
              </h2>
              <p className="text-gray-400 font-bold uppercase tracking-[4px] text-sm" data-i18n="home.readySubtitle">
                {t('home.readySubtitle', language)}
              </p>
            </div>
            <button 
              onClick={() => setPage(Page.Play)}
              className="skew-btn px-16 py-6 bg-white text-black font-gaming font-black text-2xl uppercase tracking-[4px] hover:bg-accent-cyan transition-all"
            >
              <span data-i18n="home.actionDownload">{t('home.actionDownload', language)}</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;