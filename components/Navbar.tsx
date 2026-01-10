import React from 'react';
import { Page, User as UserType, Language } from '../types';
import { Trophy, Newspaper, Gamepad2, Home, Monitor, LogOut, User, Bug, Info, MessageSquare, Swords, ShoppingBag, Shield, Mail, MessageSquareText } from 'lucide-react';
import { t } from '../services/i18n';

interface NavbarProps {
  currentPage: Page;
  setPage: (page: Page) => void;
  user: UserType | null;
  onLoginClick: () => void;
  onLogout: () => void;
  language: Language;
  onToggleLanguage: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ 
  currentPage, 
  setPage, 
  user, 
  onLoginClick, 
  onLogout,
  language,
  onToggleLanguage
}) => {
  const navItems = [
    { id: Page.Home, label: t('navbar.hub', language), icon: Home, key: 'navbar.hub' },
    { id: Page.News, label: t('navbar.news', language), icon: Newspaper, key: 'navbar.news' },
    { id: Page.Market, label: t('navbar.market', language), icon: ShoppingBag, key: 'navbar.market' },
    { id: Page.Clan, label: t('navbar.clan', language), icon: Shield, key: 'navbar.clan' },
    { id: Page.Tournaments, label: t('navbar.tournaments', language), icon: Swords, key: 'navbar.tournaments' },
    { id: Page.Messenger, label: t('navbar.messenger', language), icon: Mail, key: 'navbar.messenger' },
    { id: Page.Forum, label: t('navbar.forum', language), icon: MessageSquareText, key: 'navbar.forum' },
    { id: Page.Community, label: t('navbar.community', language), icon: MessageSquare, key: 'navbar.community' },
    { id: Page.Leaderboard, label: t('navbar.rating', language), icon: Trophy, key: 'navbar.rating' },
  ];

  return (
    <nav className="sticky top-0 z-40 w-full bg-dark-bg/90 backdrop-blur-xl border-b border-white/5 h-20 transition-all">
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between gap-4">
        <div 
          className="flex items-center gap-3 cursor-pointer group shrink-0" 
          onClick={() => setPage(Page.Home)}
        >
          <div className="w-10 h-10 bg-accent-cyan border border-white/20 flex items-center justify-center transform group-hover:rotate-12 transition-transform shadow-[0_0_15px_rgba(0,240,255,0.3)]">
            <Gamepad2 className="text-black" size={24} />
          </div>
          <h1 className="font-gaming text-3xl font-black italic tracking-tighter text-white uppercase sm:block">
            TEAMS <span className="text-accent-cyan">WAR</span>
          </h1>
        </div>

        <div className="hidden xl:flex items-center gap-1 overflow-x-auto scrollbar-none flex-1 justify-center">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setPage(item.id)}
              className={`flex items-center gap-2 font-gaming text-[11px] font-bold tracking-[0.2em] transition-all h-10 px-4 rounded uppercase skew-x-[-10deg] whitespace-nowrap ${
                currentPage === item.id 
                ? 'bg-accent-cyan text-black shadow-[0_0_15px_rgba(0,240,255,0.2)]' 
                : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <span className="skew-x-[10deg] flex items-center gap-2" data-i18n={item.key}>
                 <item.icon size={14} />
                 {item.label}
              </span>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4 shrink-0">
          <div className="flex items-center ml-2">
              <button 
                  onClick={onToggleLanguage}
                  id="lang-btn"
                  className="px-3 py-1.5 border-2 border-accent-cyan text-accent-cyan font-black text-[11px] uppercase tracking-tighter hover:bg-accent-cyan hover:text-black transition-all duration-300 shadow-[0_0_10px_rgba(0,240,255,0.3)] skew-x-[-10deg]"
              >
                  <span className="inline-block skew-x-[10deg]">{language === 'ru' ? 'RU / EN' : 'EN / RU'}</span>
              </button>
          </div>

          {user ? (
            <div className="flex items-center gap-4">
              <div 
                className={`hidden sm:flex items-center gap-3 px-3 py-1.5 bg-white/5 border rounded cursor-pointer transition-all ${currentPage === Page.Profile ? 'border-accent-cyan' : 'border-white/10 hover:border-white/30'}`}
                onClick={() => setPage(Page.Profile)}
              >
                <div className="w-6 h-6 rounded bg-accent-cyan/20 flex items-center justify-center">
                   <User size={14} className="text-accent-cyan" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-gaming font-bold text-white leading-none uppercase">{user.username}</span>
                  <span className="text-[8px] text-accent-cyan uppercase">Level 82</span>
                </div>
              </div>
              <button 
                onClick={onLogout}
                className="p-2 text-gray-500 hover:text-accent-red transition-colors"
                title="Exit"
              >
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            <div className="flex gap-2">
              <button 
                onClick={onLoginClick}
                className="px-6 h-10 border border-white/20 text-white font-gaming font-bold text-xs tracking-widest hover:bg-white/5 transition-all skew-x-[-10deg] uppercase"
              >
                <span className="skew-x-[10deg]" data-i18n="common.login">{t('common.login', language)}</span>
              </button>
              <button 
                onClick={() => setPage(Page.Play)}
                className="px-6 h-10 bg-accent-cyan text-black font-gaming font-bold text-xs tracking-widest hover:bg-white transition-all skew-x-[-10deg] uppercase shadow-[0_0_20px_rgba(0,240,255,0.2)]"
              >
                <span className="skew-x-[10deg]" data-i18n="common.play">{t('common.play', language)}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;