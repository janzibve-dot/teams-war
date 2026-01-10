
import React from 'react';
import { Trophy, Users, Zap, Shield, ChevronRight, Clock, Star, Calendar, MapPin } from 'lucide-react';

const Tournaments: React.FC = () => {
  const matches = [
    { team1: 'CyberVipers', team2: 'NeonShields', time: 'СЕГОДНЯ • 21:00', stage: 'Group Stage', logo1: 'zap', logo2: 'shield' },
    { team1: 'ShadowEdge', team2: 'AlphaPrime', time: 'ЗАВТРА • 18:00', stage: 'Group Stage', logo1: 'target', logo2: 'swords' },
    { team1: 'Ghost_Ops', team2: 'IronClad_88', time: '12 ЯНВ • 20:00', stage: 'Playoffs', logo1: 'skull', logo2: 'trending-up' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 animate-fade-in space-y-16">
      {/* Featured Tournament Hero */}
      <section className="relative glass p-12 hud-corners overflow-hidden border-none min-h-[400px] flex items-center">
        <div className="absolute inset-0 bg-gradient-to-r from-accent-cyan/20 via-transparent to-transparent z-0" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[url('https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070')] bg-cover bg-center opacity-30 mix-blend-overlay" />
        
        <div className="relative z-10 w-full flex flex-col lg:flex-row justify-between items-center gap-12">
          <div className="max-w-2xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent-cyan text-black text-[10px] font-black uppercase tracking-widest italic animate-pulse">
              LIVE NOW // GLOBAL OPS
            </div>
            <h1 className="text-6xl md:text-8xl font-gaming font-black italic uppercase tracking-tighter leading-[0.85]">
              PRO LEAGUE <br/><span className="text-accent-cyan neon-glow">SEASON 5</span>
            </h1>
            <div className="flex flex-wrap gap-8 text-gray-400 uppercase text-xs font-black tracking-widest pt-4">
              <div className="flex items-center gap-3"><Trophy className="text-accent-cyan" size={18} /> $50,000 PRIZE POOL</div>
              <div className="flex items-center gap-3"><Users className="text-accent-cyan" size={18} /> 32 TEAMS ELITE</div>
              <div className="flex items-center gap-3"><MapPin className="text-accent-cyan" size={18} /> STOCKHOLM ARENA</div>
            </div>
            <div className="pt-6">
              <button className="skew-btn px-12 py-5 bg-accent-cyan text-black font-gaming font-black text-xl uppercase tracking-widest shadow-[0_0_30px_rgba(0,240,255,0.3)]">
                <span>УЧАСТВОВАТЬ</span>
              </button>
            </div>
          </div>

          <div className="glass p-10 hud-corners border-accent-cyan/30 text-center min-w-[280px] bg-black/60 backdrop-blur-md">
            <p className="text-[10px] text-gray-500 uppercase font-black tracking-[4px] mb-6">ФИНАЛ ЧЕРЕЗ:</p>
            <div className="flex gap-6 justify-center font-gaming text-5xl font-black italic text-white">
              <div>02<span className="block text-[10px] text-accent-cyan font-bold tracking-widest not-italic mt-2">ДН</span></div>
              <div className="text-accent-cyan animate-pulse">:</div>
              <div>14<span className="block text-[10px] text-accent-cyan font-bold tracking-widest not-italic mt-2">ЧАС</span></div>
              <div className="text-accent-cyan animate-pulse">:</div>
              <div>45<span className="block text-[10px] text-accent-cyan font-bold tracking-widest not-italic mt-2">МИН</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Matches */}
      <section className="space-y-8">
        <div className="flex items-center gap-6">
          <h2 className="text-4xl font-gaming font-black italic uppercase tracking-tighter">БЛИЖАЙШИЕ <span className="text-accent-cyan">МАТЧИ</span></h2>
          <div className="h-px flex-1 bg-white/10" />
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {matches.map((match, i) => (
            <div key={i} className="glass p-8 hud-corners group hover:bg-white/5 transition-all cursor-pointer border-white/5 hover:border-accent-cyan/30">
              <div className="flex justify-between items-center mb-10 border-b border-white/5 pb-4">
                <span className="text-[10px] text-gray-500 font-black uppercase tracking-widest">{match.time}</span>
                <span className="px-3 py-1 bg-white/5 text-[9px] font-black text-accent-cyan uppercase tracking-widest border border-white/10">{match.stage}</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <div className="text-center flex-1 space-y-4">
                  <div className="w-20 h-20 mx-auto bg-accent-red/10 border border-accent-red/20 flex items-center justify-center transform group-hover:rotate-12 transition-transform shadow-[0_0_15px_rgba(255,0,85,0.1)]">
                    <Zap className="text-accent-red" size={32} />
                  </div>
                  <p className="font-gaming font-black text-sm uppercase italic tracking-wider">{match.team1}</p>
                </div>
                <div className="text-3xl font-gaming font-black italic text-gray-800 group-hover:text-accent-cyan transition-colors">VS</div>
                <div className="text-center flex-1 space-y-4">
                  <div className="w-20 h-20 mx-auto bg-accent-cyan/10 border border-accent-cyan/20 flex items-center justify-center transform group-hover:-rotate-12 transition-transform shadow-[0_0_15px_rgba(0,240,255,0.1)]">
                    <Shield className="text-accent-cyan" size={32} />
                  </div>
                  <p className="font-gaming font-black text-sm uppercase italic tracking-wider">{match.team2}</p>
                </div>
              </div>
              <button className="w-full mt-10 py-4 bg-white/5 hover:bg-white/10 text-[10px] font-black uppercase tracking-[4px] border border-white/10 transition-all text-gray-400 group-hover:text-white">
                ПОСТАВИТЬ ПРОГНОЗ
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Bracket Section */}
      <section className="space-y-8">
        <div className="flex items-center gap-6">
          <h2 className="text-4xl font-gaming font-black italic uppercase tracking-tighter">СЕТКА <span className="text-accent-cyan">ТУРНИРА</span></h2>
          <div className="h-px flex-1 bg-white/10" />
        </div>

        <div className="glass p-12 hud-corners overflow-x-auto bg-black/40">
          <div className="flex justify-between items-center min-w-[1000px] gap-16 relative">
            {/* Column 1: Quarterfinals */}
            <div className="space-y-12 flex-1">
              <p className="text-[10px] text-gray-600 font-black uppercase tracking-[4px] text-center mb-8">Quarterfinals</p>
              <div className="space-y-4">
                <div className="p-4 bg-white/5 border-l-4 border-accent-cyan text-xs font-bold uppercase tracking-wider flex justify-between items-center group cursor-pointer hover:bg-white/10 transition">
                  Team Alpha <span className="font-gaming text-xl text-accent-cyan italic">2</span>
                </div>
                <div className="p-4 bg-white/5 border-l-4 border-gray-800 text-xs font-bold uppercase tracking-wider flex justify-between items-center opacity-40">
                  Team Delta <span className="font-gaming text-xl text-gray-700 italic">1</span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-white/5 border-l-4 border-accent-cyan text-xs font-bold uppercase tracking-wider flex justify-between items-center group cursor-pointer hover:bg-white/10 transition">
                  Team Sigma <span className="font-gaming text-xl text-accent-cyan italic">2</span>
                </div>
                <div className="p-4 bg-white/5 border-l-4 border-gray-800 text-xs font-bold uppercase tracking-wider flex justify-between items-center opacity-40">
                  Team Omega <span className="font-gaming text-xl text-gray-700 italic">0</span>
                </div>
              </div>
            </div>

            {/* Separator icon */}
            <div className="flex-none opacity-20"><ChevronRight size={32} /></div>

            {/* Column 2: Semifinals */}
            <div className="space-y-24 flex-1 pt-16">
              <p className="text-[10px] text-gray-600 font-black uppercase tracking-[4px] text-center mb-8">Semifinals</p>
              <div className="space-y-8">
                <div className="p-6 bg-accent-cyan/5 border border-accent-cyan/30 text-xs font-black uppercase tracking-[2px] flex flex-col gap-4 text-center hud-corners">
                  <div className="text-accent-cyan">MATCH #15</div>
                  <div className="flex justify-around items-center">
                    <span className="text-white">Team Alpha</span>
                    <span className="text-gray-600 italic">VS</span>
                    <span className="text-white">Team Sigma</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Separator icon */}
            <div className="flex-none opacity-20"><ChevronRight size={32} /></div>

            {/* Column 3: Grand Final */}
            <div className="flex-1 text-center pt-16">
              <p className="text-[10px] text-accent-cyan font-black uppercase tracking-[5px] mb-8">GRAND FINAL</p>
              <div className="p-12 bg-gradient-to-b from-accent-cyan/20 via-black/40 to-transparent border-t-4 border-accent-cyan hud-corners relative group overflow-hidden">
                <div className="absolute inset-0 bg-accent-cyan/5 blur-3xl group-hover:opacity-100 opacity-0 transition-opacity" />
                <Trophy className="w-20 h-20 text-accent-cyan mx-auto mb-6 drop-shadow-[0_0_20px_rgba(0,240,255,0.5)]" />
                <p className="text-2xl font-gaming font-black italic uppercase tracking-widest text-white">TBD</p>
                <div className="mt-6 text-[10px] text-gray-600 font-black uppercase tracking-[3px]">CHAMPIONSHIP STAGE</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rewards call to action */}
      <section className="grid md:grid-cols-2 gap-8">
        <div className="glass p-10 hud-corners flex items-center gap-8 group cursor-pointer border-white/5 hover:border-accent-cyan/30 transition-all">
          <div className="p-5 bg-accent-cyan/10 border border-accent-cyan/30 text-accent-cyan group-hover:scale-110 transition-transform">
            <Star size={32} />
          </div>
          <div>
            <h4 className="text-2xl font-gaming font-black italic uppercase tracking-wider mb-2">Награды за просмотр</h4>
            <p className="text-xs text-gray-500 font-bold uppercase tracking-widest leading-relaxed">Смотрите трансляции на Twitch и получайте эксклюзивные кейсы Genesis.</p>
          </div>
        </div>
        <div className="glass p-10 hud-corners flex items-center gap-8 group cursor-pointer border-white/5 hover:border-accent-red/30 transition-all">
          <div className="p-5 bg-accent-red/10 border border-accent-red/30 text-accent-red group-hover:scale-110 transition-transform">
            <Shield size={32} />
          </div>
          <div>
            <h4 className="text-2xl font-gaming font-black italic uppercase tracking-wider mb-2">Создать Турнир</h4>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest leading-relaxed">Организуйте собственное соревнование для кланов и друзей.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Tournaments;
