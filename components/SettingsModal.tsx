import React, { useState, useEffect } from 'react';
import { X, User, Link as LinkIcon, FileText, Save } from 'lucide-react';
import { User as UserType, Language } from '../types';
import { t } from '../services/i18n';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserType | null;
  onUpdate: (data: { username: string; bio: string; avatarUrl: string }) => void;
  language: Language;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose, user, onUpdate, language }) => {
  const [nickname, setNickname] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [bio, setBio] = useState('');

  useEffect(() => {
    if (user) {
      setNickname(user.username);
      setAvatarUrl(user.avatarUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`);
      setBio(user.bio || '');
    }
  }, [user, isOpen]);

  if (!isOpen || !user) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate({ username: nickname, bio, avatarUrl });
  };

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-fade-in">
      <div className="absolute inset-0" onClick={onClose}></div>
      <div className="relative w-full max-w-lg glass p-10 border-t-4 border-accent-cyan hud-corners animate-in zoom-in-95 duration-300">
        <button onClick={onClose} className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors">
          <X size={24} />
        </button>

        <h2 className="text-3xl font-gaming font-black italic uppercase tracking-tighter mb-8" data-i18n="profile.settings_title">
          {t('profile.settings_title', language)}
        </h2>
        
        <form onSubmit={handleSave} className="space-y-8">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 bg-dark-bg border-2 border-accent-cyan flex items-center justify-center overflow-hidden shrink-0 shadow-[0_0_20px_rgba(0,240,255,0.2)]">
              <img 
                src={avatarUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${nickname}`} 
                alt="Preview" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${nickname}`;
                }}
              />
            </div>
            <div className="flex-1">
              <label className="block text-[10px] font-black uppercase text-gray-500 mb-2 tracking-widest" data-i18n="profile.avatar_label">
                {t('profile.avatar_label', language)}
              </label>
              <div className="relative">
                <LinkIcon size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" />
                <input 
                  type="text" 
                  value={avatarUrl} 
                  onChange={(e) => setAvatarUrl(e.target.value)}
                  placeholder="https://..." 
                  className="w-full bg-black/40 border border-white/10 rounded-none pl-10 pr-3 py-3 text-xs focus:border-accent-cyan outline-none text-white font-bold"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-black uppercase text-gray-500 mb-2 tracking-widest" data-i18n="profile.nickname_label">
              {t('profile.nickname_label', language)}
            </label>
            <div className="relative">
              <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" />
              <input 
                type="text" 
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="Major_Striker" 
                className="w-full bg-black/40 border border-white/10 rounded-none pl-10 pr-3 py-4 text-sm focus:border-accent-cyan outline-none text-white font-black uppercase tracking-widest"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-black uppercase text-gray-500 mb-2 tracking-widest" data-i18n="profile.bio_label">
              {t('profile.bio_label', language)}
            </label>
            <div className="relative">
              <FileText size={14} className="absolute left-3 top-4 text-gray-600" />
              <textarea 
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={3} 
                placeholder={t('profile.bio_placeholder', language)}
                className="w-full bg-black/40 border border-white/10 rounded-none pl-10 pr-3 py-4 text-sm focus:border-accent-cyan outline-none text-white font-medium resize-none"
              ></textarea>
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <button 
              type="submit" 
              className="flex-1 py-5 bg-accent-cyan text-black font-gaming font-black uppercase skew-btn tracking-widest flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:bg-white"
            >
              <Save size={18} />
              <span data-i18n="profile.save_btn">{t('profile.save_btn', language)}</span>
            </button>
            <button 
              type="button" 
              onClick={onClose} 
              className="px-8 py-5 bg-white/5 border border-white/10 text-white font-gaming font-black uppercase skew-btn tracking-widest hover:bg-white/10"
              data-i18n="profile.cancel_btn"
            >
              {t('profile.cancel_btn', language)}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SettingsModal;