import React, { useState, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';
import Navbar from './components/Navbar';
import Chat from './components/Chat';
import Home from './pages/Home';
import News from './pages/News';
import BugReport from './pages/BugReport';
import About from './pages/About';
import SystemRequirements from './pages/SystemRequirements';
import Leaderboard from './pages/Leaderboard';
import Community from './pages/Community';
import Messenger from './pages/Messenger';
import Forum from './pages/Forum';
import Profile from './pages/Profile';
import Tournaments from './pages/Tournaments';
import Market from './pages/Market';
import Clan from './pages/Clan';
import AuthModal from './components/AuthModal';
import SettingsModal from './components/SettingsModal';
import Toast from './components/Toast';
import { Page, User as UserType, Notification, Language } from './types';
import { authService } from './services/authService';
import { t } from './services/i18n';
import { Github, Twitter, Instagram, Youtube, Download } from 'lucide-react';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.Home);
  const [user, setUser] = useState<UserType | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [language, setLanguage] = useState<Language>('ru');

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  const addNotification = useCallback((message: string, type: 'success' | 'error' | 'info' = 'info', title?: string) => {
    const id = Date.now().toString();
    setNotifications(prev => [...prev, { id, message, type, title }]);
  }, []);

  const removeNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  const toggleLanguage = () => {
    setLanguage(prev => {
      const newLang = prev === 'ru' ? 'en' : 'ru';
      addNotification(
        newLang === 'ru' ? 'ЯЗЫК ИЗМЕНЕН: РУССКИЙ' : 'LANGUAGE UPDATED: ENGLISH',
        'info',
        newLang === 'ru' ? 'СИСТЕМА' : 'SYSTEM'
      );
      return newLang;
    });
  };

  const handleLogout = () => {
    authService.logout();
    setUser(null);
    setCurrentPage(Page.Home);
    addNotification(
      language === 'ru' ? 'ВЫ ВЫШЛИ ИЗ СИСТЕМЫ. СЕАНС ЗАВЕРШЕН.' : 'LOGGED OUT. SESSION TERMINATED.',
      'info',
      language === 'ru' ? 'СИСТЕМА' : 'SYSTEM'
    );
  };

  const handleProfileUpdate = (data: { username: string; bio: string; avatarUrl: string }) => {
    if (!user) return;
    const updated = authService.updateProfile(user.id, data);
    if (updated) {
      setUser(updated);
      setIsSettingsModalOpen(false);
      addNotification(
        language === 'ru' ? 'Данные оперативника обновлены!' : 'Operative data updated!',
        'success',
        language === 'ru' ? 'Успех' : 'Success'
      );
    } else {
      addNotification(
        language === 'ru' ? 'ОШИБКА: НИКНЕЙМ УЖЕ ЗАНЯТ' : 'ERROR: NICKNAME ALREADY TAKEN',
        'error',
        language === 'ru' ? 'СИСТЕМА' : 'SYSTEM'
      );
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case Page.Home:
        return <Home setPage={setCurrentPage} language={language} />;
      case Page.News:
        return <News language={language} />;
      case Page.Community:
        return <Community user={user} />;
      case Page.Messenger:
        return <Messenger currentUser={user} language={language} onLoginPrompt={() => setIsAuthModalOpen(true)} onAddNotification={addNotification} />;
      case Page.Forum:
        return <Forum language={language} user={user} onLoginPrompt={() => setIsAuthModalOpen(true)} onAddNotification={addNotification} />;
      case Page.Tournaments:
        return <Tournaments />;
      case Page.Market:
        return <Market language={language} />;
      case Page.Clan:
        return <Clan onAddNotification={addNotification} language={language} />;
      case Page.About:
        return <About />;
      case Page.BugReport:
        return <BugReport />;
      case Page.SystemRequirements:
        return <SystemRequirements />;
      case Page.Leaderboard:
        return <Leaderboard />;
      case Page.Profile:
        return <Profile user={user} onOpenSettings={() => setIsSettingsModalOpen(true)} language={language} />;
      case Page.Play:
        return (
          <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-6 animate-fade-in">
             <div className="w-24 h-24 bg-accent-cyan/10 border-2 border-accent-cyan rounded-full flex items-center justify-center mb-8 animate-pulse shadow-[0_0_30px_rgba(0,240,255,0.2)]">
                <Download size={48} className="text-accent-cyan" />
             </div>
            <h2 className="text-6xl font-gaming font-black italic mb-4 uppercase leading-none">
              РАЗВЕРТЫВАНИЕ <span className="text-accent-cyan">КЛИЕНТА</span>
            </h2>
            <p className="text-gray-500 max-w-md font-medium text-lg mb-10 leading-relaxed">
              Инициализация боевых систем. Скачайте официальный лаунчер Teams War для подключения к серверам Genesis.
            </p>
            <button 
              onClick={() => addNotification('ПРОВЕРЬТЕ ПАНЕЛЬ ЗАГРУЗОК.', 'success', 'ЗАГРУЗКА ИНИЦИИРОВАНА')}
              className="px-16 py-6 bg-accent-cyan text-black font-gaming font-black text-2xl tracking-[4px] hover:bg-white transition-all skew-x-[-10deg] uppercase shadow-[0_0_40px_rgba(0,240,255,0.3)]"
            >
              <span className="skew-x-[10deg]">СКАЧАТЬ ЛАУНЧЕР</span>
            </button>
          </div>
        );
      default:
        return <Home setPage={setCurrentPage} language={language} />;
    }
  };

  const NotificationPortal = () => {
    const container = document.getElementById('notification-container');
    if (!container) return null;
    return ReactDOM.createPortal(
      <>
        {notifications.map(n => (
          <Toast key={n.id} notification={n} onClose={removeNotification} />
        ))}
      </>,
      container
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-dark-bg selection:bg-accent-cyan selection:text-black">
      <Navbar 
        currentPage={currentPage} 
        setPage={setCurrentPage} 
        user={user}
        onLoginClick={() => setIsAuthModalOpen(true)}
        onLogout={handleLogout}
        language={language}
        onToggleLanguage={toggleLanguage}
      />
      
      <main className="flex-1">
        {renderPage()}
      </main>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        onAuthSuccess={(u: UserType) => {setUser(u); setCurrentPage(Page.Profile);}}
      />

      <SettingsModal 
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        user={user}
        onUpdate={handleProfileUpdate}
        language={language}
      />

      <Chat user={user} onLoginPrompt={() => setIsAuthModalOpen(true)} language={language} />

      <NotificationPortal />

      <footer className="bg-black py-20 px-6 border-t border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent-cyan/5 blur-[150px] -mr-64 -mt-64 pointer-events-none" />
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-start gap-16 relative z-10">
          <div className="space-y-8 max-sm">
            <h2 className="font-gaming text-4xl font-black italic tracking-tighter text-white uppercase">
              TEAMS <span className="text-accent-cyan">WAR</span>
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed font-medium" data-i18n="footer.desc">
              {t('footer.desc', language)}
            </p>
            <div className="flex gap-4">
              {[Twitter, Youtube, Instagram, Github].map((Icon, i) => (
                <div key={i} className="w-10 h-10 border border-white/10 rounded flex items-center justify-center text-gray-400 hover:text-accent-cyan hover:border-accent-cyan transition-all cursor-pointer group">
                  <Icon size={20} className="group-hover:scale-110 transition-transform" />
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-16">
            <div className="space-y-6">
              <h4 className="font-gaming text-accent-cyan font-black tracking-[3px] text-xs uppercase italic" data-i18n="footer.game">{t('footer.game', language)}</h4>
              <ul className="space-y-3 text-gray-500 text-[11px] font-black uppercase tracking-widest">
                <li onClick={() => setCurrentPage(Page.News)} className="hover:text-white cursor-pointer transition">Patch notes</li>
                <li className="hover:text-white cursor-pointer transition">Operatives</li>
                <li className="hover:text-white cursor-pointer transition">Weapons</li>
                <li onClick={() => setCurrentPage(Page.Market)} className="hover:text-white cursor-pointer transition text-accent-cyan font-bold tracking-widest" data-i18n="navbar.market">{t('navbar.market', language)}</li>
              </ul>
            </div>
            <div className="space-y-6">
              <h4 className="font-gaming text-accent-cyan font-black tracking-[3px] text-xs uppercase italic" data-i18n="footer.community">{t('footer.community', language)}</h4>
              <ul className="space-y-3 text-gray-500 text-[11px] font-black uppercase tracking-widest">
                <li onClick={() => setCurrentPage(Page.Community)} className="hover:text-white cursor-pointer transition" data-i18n="navbar.community">{t('navbar.community', language)}</li>
                <li onClick={() => setCurrentPage(Page.Messenger)} className="hover:text-white cursor-pointer transition" data-i18n="navbar.messenger">{t('navbar.messenger', language)}</li>
                <li onClick={() => setCurrentPage(Page.Forum)} className="hover:text-white cursor-pointer transition" data-i18n="navbar.forum">{t('navbar.forum', language)}</li>
                <li onClick={() => setCurrentPage(Page.Tournaments)} className="hover:text-white cursor-pointer transition">Tournaments</li>
                <li onClick={() => setCurrentPage(Page.Clan)} className="hover:text-white cursor-pointer transition">Clans</li>
              </ul>
            </div>
            <div className="space-y-6">
              <h4 className="font-gaming text-accent-cyan font-black tracking-[3px] text-xs uppercase italic" data-i18n="footer.support">{t('footer.support', language)}</h4>
              <ul className="space-y-3 text-gray-500 text-[11px] font-black uppercase tracking-widest">
                <li onClick={() => setCurrentPage(Page.BugReport)} className="hover:text-white cursor-pointer transition">Help Center</li>
                <li className="hover:text-white cursor-pointer transition">Anti-Cheat</li>
                <li className="hover:text-white cursor-pointer transition">Status</li>
                <li className="hover:text-white cursor-pointer transition">Privacy</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-gray-600 text-[9px] font-black tracking-[3px] uppercase italic">
          <span data-i18n="footer.rights">{t('footer.rights', language)}</span>
          <div className="flex gap-8">
            <span className="hover:text-gray-400 cursor-pointer">Terms of Service</span>
            <span className="hover:text-gray-400 cursor-pointer">EULA</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;