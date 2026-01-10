
import React from 'react';
import { Trophy, Medal, Star, TrendingUp, Search } from 'lucide-react';

interface Player {
  rank: number;
  name: string;
  level: number;
  kd: string;
  winRate: string;
  points: number;
  status: 'online' | 'offline';
}

const MOCK_LEADERS: Player[] = [
  { rank: 1, name: 'Major_Striker', level: 42, kd: '2.45', winRate: '68%', points: 12500, status: 'online' },
  { rank: 2, name: 'CyberPhantom', level: 39, kd: '2.10', winRate: '62%', points: 11200, status: 'offline' },
  { rank: 3, name: 'IronClad_88', level: 41, kd: '1.95', winRate: '59%', points: 10850, status: 'online' },
  { rank: 4, name: 'NeonViper', level: 35, kd: '1.88', winRate: '55%', points: 9400, status: 'online' },
  { rank: 5, name: 'Ghost_Ops', level: 37, kd: '1.82', winRate: '54%', points: 8900, status: 'offline' },
  { rank: 6, name: 'AlphaPrime', level: 33, kd: '1.75', winRate: '52%', points: 8200, status: 'online' },
  { rank: 7, name: 'ShadowEdge', level: 30, kd: '1.70', winRate: '50%', points: 7600, status: 'offline' },
];

const Leaderboard: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <div>
          <h2 className="text-5xl font-gaming font-bold tracking-tight uppercase">ЗАЛ <span className="text-blue-500">СЛАВЫ</span></h2>
          <p className="text-slate-400 mt-2">Элита Teams War. Лучшие оперативники текущего сезона.</p>
        </div>
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
          <input 
            type="text" 
            placeholder="Поиск игрока..." 
            className="w-full bg-slate-900 border border-red-600/20 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-red-600 transition-all text-white"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {MOCK_LEADERS.slice(0, 3).map((player, idx) => (
          <div key={player.name} className={`glass p-8 rounded-3xl border-2 relative overflow-hidden flex flex-col items-center text-center ${
            idx === 0 ? 'border-yellow-500/50 scale-105 z-10' : idx === 1 ? 'border-slate-400/50' : 'border-amber-700/50'
          }`}>
            <div className={`absolute top-0 right-0 px-4 py-1 font-gaming font-bold text-xs uppercase ${
              idx === 0 ? 'bg-yellow-500 text-black' : idx === 1 ? 'bg-slate-400 text-black' : 'bg-amber-700 text-white'
            }`}>
              {idx === 0 ? 'Champion' : idx === 1 ? 'Challenger' : 'Elite'}
            </div>
            
            <div className="relative mb-6">
              <div className={`w-24 h-24 rounded-2xl flex items-center justify-center border-2 ${
                idx === 0 ? 'border-yellow-500 shadow-[0_0_30px_rgba(234,179,8,0.2)]' : 'border-white/10'
              }`}>
                {idx === 0 ? <Trophy size={48} className="text-yellow-500" /> : idx === 1 ? <Medal size={48} className="text-slate-400" /> : <Star size={48} className="text-amber-700" />}
              </div>
              <span className={`absolute -bottom-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                 idx === 0 ? 'bg-yellow-500 text-black' : idx === 1 ? 'bg-slate-400 text-black' : 'bg-amber-700 text-white'
              }`}>
                {player.rank}
              </span>
            </div>

            <h3 className="text-2xl font-gaming font-bold uppercase mb-1">{player.name}</h3>
            <p className="text-blue-400 text-xs font-bold tracking-widest uppercase mb-4">Level {player.level}</p>
            
            <div className="grid grid-cols-2 gap-4 w-full pt-4 border-t border-white/5">
              <div>
                <span className="text-[10px] text-slate-500 uppercase tracking-widest block">K/D Ratio</span>
                <span className="text-white font-bold">{player.kd}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 uppercase tracking-widest block">Win Rate</span>
                <span className="text-white font-bold">{player.winRate}</span>
              </div>
            </div>
            
            <div className="mt-6 w-full py-2 bg-white/5 rounded-lg font-gaming font-bold text-xl tracking-tighter">
              {player.points.toLocaleString()} PTS
            </div>
          </div>
        ))}
      </div>

      <div className="glass rounded-3xl overflow-hidden border border-white/5">
        <table className="w-full text-left">
          <thead className="bg-black/40 border-b border-white/10">
            <tr>
              <th className="px-6 py-4 font-gaming text-xs uppercase tracking-widest text-slate-400">Ранг</th>
              <th className="px-6 py-4 font-gaming text-xs uppercase tracking-widest text-slate-400">Игрок</th>
              <th className="px-6 py-4 font-gaming text-xs uppercase tracking-widest text-slate-400 text-center">Уровень</th>
              <th className="px-6 py-4 font-gaming text-xs uppercase tracking-widest text-slate-400 text-center">K/D</th>
              <th className="px-6 py-4 font-gaming text-xs uppercase tracking-widest text-slate-400 text-center">Победы</th>
              <th className="px-6 py-4 font-gaming text-xs uppercase tracking-widest text-slate-400 text-right">Очки</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {MOCK_LEADERS.slice(3).map((player) => (
              <tr key={player.name} className="hover:bg-white/5 transition-colors">
                <td className="px-6 py-4">
                  <span className="font-gaming font-bold text-xl text-slate-500">#{player.rank}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-slate-800 border border-white/10 flex items-center justify-center overflow-hidden">
                       <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${player.name}`} alt="avatar" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="font-bold text-sm">{player.name}</p>
                      <div className="flex items-center gap-1">
                        <div className={`w-1.5 h-1.5 rounded-full ${player.status === 'online' ? 'bg-green-500' : 'bg-slate-600'}`}></div>
                        <span className="text-[10px] text-slate-500 uppercase">{player.status}</span>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="text-blue-400 font-bold text-sm">{player.level}</span>
                </td>
                <td className="px-6 py-4 text-center font-medium text-sm">{player.kd}</td>
                <td className="px-6 py-4 text-center font-medium text-sm text-green-400">{player.winRate}</td>
                <td className="px-6 py-4 text-right">
                  <span className="font-gaming font-bold text-lg text-white">{player.points.toLocaleString()}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-12 flex items-center justify-center gap-4 p-8 glass border border-red-600/20 rounded-2xl">
        <TrendingUp className="text-red-500" size={24} />
        <p className="text-slate-400 text-sm">Ваш ранг обновляется каждые 30 минут. Продолжайте сражаться, чтобы попасть в топ-100!</p>
      </div>
    </div>
  );
};

export default Leaderboard;
