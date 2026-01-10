import React from 'react';
import { User as UserType, Language } from '../types';
import { t } from '../services/i18n';
import { 
  Trophy, Globe, Swords, Skull, Target, TrendingUp, 
  Crosshair, History, Star, Zap, Shield, ChevronRight, Settings 
} from 'lucide-react';

interface ProfileProps {
  user: UserType | null;
  onOpenSettings: () => void;
  language: Language;
}

const Profile: React.FC<ProfileProps> = ({ user, onOpenSettings, language }) => {
  // Mock data for the profile if no real stats exist yet
  const stats = {
    level: 82,
    xp: 8450,
    maxXp: 10000,
    rank: 'Legend',
    clan: '[NAVI] Team',
    region: 'EU West',
    playTime: language === 'ru' ? '1,240 ч.' : '1,240 h.',
    kd: '2.45',
    winRate: '68.5%',
    hsPercent: '42%',
    totalMatches: 854
  };

  const matches = [
    { id: 1, type: language === 'ru' ? 'Рейтинг' : 'Ranked', result: 'win', map: 'Dust Cyberpunk', score: '16 - 12', kda: '24 / 8 / 5', color: 'text-green-400', border: 'border-green-500' },
    { id: 2, type: language === 'ru' ? 'Рейтинг' : 'Ranked', result: 'loss', map: 'Neon City Loop', score: '10 - 16', kda: '15 / 18 / 2', color: 'text-accent-red', border: 'border-accent-red' },
    { id: 3, type: language === 'ru' ? 'Турнир' : 'Tournament', result: 'win', map: 'Factory Raid', score: '16 - 4', kda: '32 / 5 / 10', color: 'text-green-400', border: 'border-green-500' },
    { id: 4, type: language === 'ru' ? 'Рейтинг' : 'Ranked', result: 'win', map: 'Subway Station', score: '16 - 14', kda: '21 / 15 / 6', color: 'text-green-400', border: 'border-green-500' },
  ];

  const weapons = [
    { name: 'Plasma Rifle X-1', kills: '5,210', accuracy: 85, color: 'bg-accent-cyan' },
    { name: 'Railgun Sniper', kills: '2,800', accuracy: 60, color: 'bg-purple-500' },
    { name: 'Volt SMG', kills: '1,450', accuracy: 72, color: 'bg-accent-red' },
  ];

  const avatarSrc = user?.avatarUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.username || 'Striker'}&backgroundColor=0b0e11`;

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 animate-fade-in">
      {/* Profile Header HUD */}
      <section className="glass rounded-none p-8 md:p-12 mb-8 relative overflow-hidden hud-corners">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-accent-cyan/5 to-transparent pointer-events-none" />
        
        <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
          <div className="relative">
            <div className="w-40 h-40 rounded bg-dark-bg p-1 border-2 border-accent-cyan shadow-[0_0_30px_rgba(0,240,255,0.2)] overflow-hidden">
              <img 
                src={avatarSrc} 
                alt="Avatar" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-3 -right-3 bg-dark-bg p-2 border border-accent-cyan/50 shadow-lg hud-corners">
              <Trophy className="w-8 h-8 text-accent-cyan" />
            </div>
          </div>

          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-col md:flex-row items-center gap-6 mb-4">
              <div className="flex items-center gap-4">
                <h1 className="text-5xl font-gaming font-black italic tracking-tighter uppercase leading-none">
                  {user?.username || 'GUEST_OPERATIVE'}
                </h1>
                <span className="px-4 py-1.5 bg-accent-cyan/10 text-accent-cyan border border-accent-cyan/30 text-[10px] font-black uppercase tracking-[3px] italic shadow-[0_0_15px_rgba(0,240,255,0.1)]">
                  {stats.rank} Rank
                </span>
              </div>
              <button 
                onClick={onOpenSettings}
                className="p-3 bg-white/5 border border-white/10 hover:border-accent-cyan hover:text-accent-cyan transition-all group"
              >
                <Settings size={20} className="group-hover:rotate-90 transition-transform" />
              </button>
            </div>

            {user?.bio && (
              <p className="text-gray-400 text-sm italic mb-6 max-w-xl font-medium tracking-wide border-l-2 border-accent-cyan/30 pl-4">
                "{user.bio}"
              </p>
            )}
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 max-w-2xl mx-auto md:mx-0 mb-8">
              <div>
                <p className="text-gray-600 text-[10px] font-black tracking-[3px] uppercase mb-1" data-i18n="profile.region_label">
                  {t('profile.region_label', language)}
                </p>
                <p className="font-bold flex items-center justify-center md:justify-start gap-2 text-sm uppercase">
                  <Globe size={14} className="text-gray-500" /> {stats.region}
                </p>
              </div>
              <div>
                <p className="text-gray-600 text-[10px] font-black tracking-[3px] uppercase mb-1" data-i18n="profile.clan_label">
                  {t('profile.clan_label', language)}
                </p>
                <p className="font-bold text-accent-cyan text-sm uppercase italic">{stats.clan}</p>
              </div>
              <div className="hidden sm:block">
                <p className="text-gray-600 text-[10px] font-black tracking-[3px] uppercase mb-1" data-i18n="profile.playtime_label">
                  {t('profile.playtime_label', language)}
                </p>
                <p className="font-bold text-sm uppercase">{stats.playTime}</p>
              </div>
            </div>

            <div className="max-w-2xl">
              <div className="flex justify-between text-[10px] mb-2 font-black uppercase tracking-[4px]">
                <span data-i18n="common.level">{t('common.level', language)} {stats.level}</span>
                <span className="text-accent-cyan">{stats.xp} / {stats.maxXp} XP</span>
              </div>
              <div className="h-2 bg-white/5 rounded-none overflow-hidden border border-white/5">
                <div 
                  className="h-full bg-accent-cyan shadow-[0_0_10px_rgba(0,240,255,0.5)] transition-all duration-1000" 
                  style={{ width: `${(stats.xp / stats.maxXp) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Stats Grid */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { icon: Crosshair, value: stats.kd, label: 'K/D Ratio', color: 'text-accent-cyan', border: 'border-accent-cyan/30' },
          { icon: TrendingUp, value: stats.winRate, label: language === 'ru' ? 'Винрейт' : 'Winrate', color: 'text-green-400', border: 'border-green-500/30' },
          { icon: Skull, value: stats.hsPercent, label: 'Headshot %', color: 'text-accent-red', border: 'border-accent-red/30' },
          { icon: Swords, value: stats.totalMatches, label: language === 'ru' ? 'Всего матчей' : 'Total matches', color: 'text-white', border: 'border-white/10' },
        ].map((stat, i) => (
          <div key={i} className={`glass p-8 rounded-none border-b-2 ${stat.border} flex items-center gap-6 group hover:bg-white/5 transition-all`}>
            <div className={`p-3 bg-white/5 border border-white/5 rounded group-hover:scale-110 transition-transform ${stat.color}`}>
              <stat.icon size={28} />
            </div>
            <div>
              <h3 className="text-4xl font-gaming font-black leading-none">{stat.value}</h3>
              <p className="text-[10px] text-gray-600 font-black tracking-[3px] uppercase mt-1">{stat.label}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Details Section */}
      <section className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 glass rounded-none border border-white/5 flex flex-col">
          <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/5">
            <h3 className="font-gaming font-black text-xl tracking-widest uppercase flex items-center gap-3 italic">
              <History size={20} className="text-accent-cyan" /> {language === 'ru' ? 'История матчей' : 'Match history'}
            </h3>
          </div>
          <div className="p-6 space-y-4 max-h-[600px] overflow-y-auto scrollbar-thin">
            {matches.map((match) => (
              <div key={match.id} className={`flex items-center justify-between p-5 glass border-l-4 ${match.border} hover:bg-white/5 transition-all group cursor-pointer`}>
                <div className="flex items-center gap-6">
                  <div className="text-center w-20">
                    <p className={`font-gaming font-black text-lg uppercase italic leading-none ${match.color}`}>
                      {match.result === 'win' ? (language === 'ru' ? 'Победа' : 'Win') : (language === 'ru' ? 'Пораж.' : 'Loss')}
                    </p>
                    <p className="text-[9px] text-gray-600 font-black tracking-widest uppercase mt-1">{match.type}</p>
                  </div>
                  <div className="h-10 w-px bg-white/10" />
                  <div>
                    <p className="font-bold text-sm text-white uppercase tracking-wider">{match.map}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{language === 'ru' ? 'Счет' : 'Score'}: <span className="text-white font-mono">{match.score}</span></p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-gaming font-black text-2xl tracking-tighter group-hover:text-accent-cyan transition-colors">{match.kda}</p>
                  <p className="text-[9px] text-gray-600 font-black tracking-widest uppercase">K / D / A</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass rounded-none border border-white/5">
          <div className="p-6 border-b border-white/5 bg-white/5">
            <h3 className="font-gaming font-black text-xl tracking-widest uppercase flex items-center gap-3 italic">
              <Target size={20} className="text-accent-cyan" /> {language === 'ru' ? 'Арсенал' : 'Arsenal'}
            </h3>
          </div>
          <div className="p-6 space-y-8">
            {weapons.map((w, i) => (
              <div key={i} className="space-y-3">
                <div className="flex justify-between items-end">
                   <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white/5 border border-white/10 flex items-center justify-center">
                         <Zap size={18} className="text-accent-cyan" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm uppercase tracking-wider">{w.name}</h4>
                        <p className="text-[10px] text-gray-600 font-black tracking-widest uppercase">{w.kills} {language === 'ru' ? 'Устранений' : 'Kills'}</p>
                      </div>
                   </div>
                   <div className="text-right">
                      <span className="text-xs font-gaming font-black text-accent-cyan italic uppercase">{w.accuracy}% ACC</span>
                   </div>
                </div>
                <div className="h-1 bg-white/5 overflow-hidden">
                   <div className={`h-full ${w.color}`} style={{ width: `${w.accuracy}%` }} />
                </div>
              </div>
            ))}

            <div className="mt-12 p-6 bg-accent-cyan/5 border border-accent-cyan/20 hud-corners text-center">
               <Star className="text-accent-cyan mx-auto mb-4" size={24} />
               <p className="text-[10px] font-black text-gray-400 uppercase tracking-[2px] leading-relaxed">
                  {language === 'ru' 
                    ? 'Ваши достижения синхронизируются с серверами Teams War в реальном времени.'
                    : 'Your achievements are synchronized with Teams War servers in real-time.'}
               </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Profile;