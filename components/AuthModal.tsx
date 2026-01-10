import React, { useState } from 'react';
import { X, Mail, User, ShieldCheck, Lock, Chrome, Terminal, Zap } from 'lucide-react';
import { authService } from '../services/authService';
import { User as UserType } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess: (user: UserType) => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulate network delay for effect
    setTimeout(() => {
      if (isLogin) {
        const user = authService.login(email);
        if (user) {
          onAuthSuccess(user);
          onClose();
        } else {
          setError('ОШИБКА АУТЕНТИФИКАЦИИ: ОПЕРАТИВНИК НЕ НАЙДЕН');
        }
      } else {
        if (!username) {
          setError('ОШИБКА: ИМЯ ОПЕРАТИВНИКА ОБЯЗАТЕЛЬНО');
          setLoading(false);
          return;
        }
        const user = authService.register(username, email);
        if (user) {
          onAuthSuccess(user);
          onClose();
        } else {
          setError('ОШИБКА: ДАННЫЕ УЖЕ СУЩЕСТВУЮТ В БАЗЕ ГЕНЕЗИС');
        }
      }
      setLoading(false);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in">
      <div 
        className="absolute inset-0" 
        onClick={onClose} 
      />
      
      <div className="relative w-full max-w-md glass border border-white/10 rounded-none shadow-[0_0_50px_rgba(0,0,0,0.5)] hud-corners animate-in zoom-in-95 duration-300 overflow-hidden">
        <div className="h-1.5 bg-gradient-to-r from-accent-cyan via-blue-600 to-accent-cyan animate-pulse"></div>
        
        <div className="p-10">
          <button 
            onClick={onClose} 
            className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors p-2"
          >
            <X size={24} />
          </button>

          <div className="text-center mb-10">
            <div className="inline-block p-3 bg-accent-cyan/10 border border-accent-cyan/30 mb-6">
              <Terminal size={32} className="text-accent-cyan" />
            </div>
            <h2 className="text-4xl font-gaming font-black italic uppercase tracking-tighter leading-none">
              {isLogin ? 'ВХОД В' : 'РЕГИСТРАЦИЯ'} <span className="text-accent-cyan">СИСТЕМУ</span>
            </h2>
            <p className="text-gray-500 text-[10px] uppercase tracking-[5px] mt-4 font-black">
              {isLogin ? 'ИНИЦИАЛИЗАЦИЯ ЛИЧНОГО ЖУРНАЛА' : 'РЕГИСТРАЦИЯ НОВОГО ОПЕРАТИВНИКА'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div>
                <label className="block text-[10px] uppercase font-black text-gray-600 mb-2 tracking-widest">ИМЯ ПРОФИЛЯ (CALLSIGN)</label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 group-focus-within:text-accent-cyan transition-colors" />
                  <input 
                    type="text" 
                    required 
                    placeholder="MAJOR_STRIKER" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full bg-black/60 border border-white/10 rounded-none pl-12 pr-4 py-5 text-xs font-black focus:outline-none focus:border-accent-cyan transition-all text-white tracking-[2px] uppercase placeholder:text-gray-800"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-[10px] uppercase font-black text-gray-600 mb-2 tracking-widest">EMAIL ИДЕНТИФИКАТОР</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 group-focus-within:text-accent-cyan transition-colors" />
                <input 
                  type="email" 
                  required 
                  placeholder="OPS@GENESIS.NET" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-black/60 border border-white/10 rounded-none pl-12 pr-4 py-5 text-xs font-black focus:outline-none focus:border-accent-cyan transition-all text-white tracking-[2px] uppercase placeholder:text-gray-800"
                />
              </div>
            </div>

            {error && (
              <div className="bg-accent-red/10 border border-accent-red/30 text-accent-red text-[10px] font-black uppercase tracking-widest p-4 text-center animate-pulse">
                {error}
              </div>
            )}

            <button 
              type="submit" 
              disabled={loading}
              className={`skew-btn w-full py-6 bg-accent-cyan hover:bg-white text-black font-gaming font-black uppercase tracking-[5px] text-xl transition-all shadow-[0_0_30px_rgba(0,240,255,0.2)] flex items-center justify-center gap-3 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {loading ? (
                <>
                  <Zap size={20} className="animate-spin" />
                  <span>СИНХРОНИЗАЦИЯ...</span>
                </>
              ) : (
                <span>{isLogin ? 'ВОЙТИ В БОЙ' : 'ЗАРЕГИСТРИРОВАТЬСЯ'}</span>
              )}
            </button>
          </form>

          <div className="relative my-12 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/5"></div>
            </div>
            <span className="relative bg-[#15191C] px-6 text-[9px] text-gray-600 uppercase font-black tracking-[4px]">ВНЕШНИЕ КАНАЛЫ</span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-3 py-5 bg-white/5 border border-white/10 hover:bg-white/10 transition-all group active:scale-95">
              <img src="https://upload.wikimedia.org/wikipedia/commons/8/83/Steam_icon_logo.svg" className="w-6 h-6 grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all" alt="Steam" />
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-500 group-hover:text-white">Steam</span>
            </button>
            <button className="flex items-center justify-center gap-3 py-5 bg-white/5 border border-white/10 hover:bg-white/10 transition-all group active:scale-95">
              <Chrome size={20} className="text-gray-600 group-hover:text-accent-red transition-colors" />
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-500 group-hover:text-white">Google</span>
            </button>
          </div>

          <p className="text-center text-[10px] text-gray-600 mt-12 font-black uppercase tracking-widest">
            {isLogin ? 'ВЫ — НОВЫЙ БОЕЦ?' : 'УЖЕ СЛУЖИТЕ?'} 
            <button 
              onClick={() => setIsLogin(!isLogin)} 
              className="text-accent-cyan hover:text-white hover:underline ml-3 transition-all cursor-pointer"
            >
              {isLogin ? 'СОЗДАТЬ ПРОФИЛЬ' : 'АВТОРИЗОВОВАТЬСЯ'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;