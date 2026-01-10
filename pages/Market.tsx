import React, { useState } from 'react';
import { ShoppingBag, Tag, Search, Filter, ArrowUpDown, Zap, Shield, Target, Plus, Star } from 'lucide-react';
import { Language } from '../types';
import { t } from '../services/i18n';

interface MarketProps {
  language: Language;
}

const MOCK_ITEMS: any[] = [
  { id: 1, name: 'M4A4', skin: 'Neon Dragon', price: 450.00, rarity: 'Legendary', type: 'Rifle', image: 'https://www.pngplay.com/wp-content/uploads/13/Guns-Transparent-PNG.png' },
  { id: 2, name: 'Glock-18', skin: 'Violet Night', price: 12.50, rarity: 'Rare', type: 'Pistol', image: 'https://purepng.com/public/uploads/large/purepng.com-gunweaponsgunfirearm-12115216301323sk9o.png' },
  { id: 3, name: 'AK-47', skin: 'Cyberpunk Red', price: 320.00, rarity: 'Legendary', type: 'Rifle', image: 'https://www.pngplay.com/wp-content/uploads/13/Guns-Transparent-PNG.png' },
  { id: 4, name: 'Tactical Blade', skin: 'Obsidian', price: 1200.00, rarity: 'Legendary', type: 'Melee', image: 'https://www.freeiconspng.com/uploads/combat-knife-png-20.png' },
];

const Market: React.FC<MarketProps> = ({ language }) => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  const rarityStyles: any = {
    Legendary: { border: 'border-yellow-500/50', bg: 'bg-yellow-500/10', text: 'text-yellow-500', shadow: 'shadow-[0_0_20px_rgba(234,179,8,0.2)]' },
    Rare: { border: 'border-purple-500/50', bg: 'bg-purple-500/10', text: 'text-purple-400', shadow: 'shadow-[0_0_20px_rgba(168,85,247,0.2)]' },
    Uncommon: { border: 'border-accent-cyan/50', bg: 'bg-accent-cyan/10', text: 'text-accent-cyan', shadow: 'shadow-[0_0_20px_rgba(0,240,255,0.1)]' },
    Common: { border: 'border-gray-500/50', bg: 'bg-gray-500/10', text: 'text-gray-400', shadow: 'none' },
  };

  const filteredItems = MOCK_ITEMS.filter(item => 
    (item.name.toLowerCase().includes(search.toLowerCase()) || item.skin.toLowerCase().includes(search.toLowerCase())) &&
    (filter === 'All' || item.type === filter)
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 animate-fade-in space-y-12">
      {/* Market Header */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <ShoppingBag size={32} className="text-accent-cyan" />
            <h1 className="text-5xl md:text-6xl font-gaming font-black italic uppercase tracking-tighter leading-none">
              {t('market.title', language)} <span className="text-accent-cyan">{t('market.subtitle', language)}</span>
            </h1>
          </div>
          <p className="text-gray-500 font-bold uppercase tracking-[4px] text-xs">Genesis Global Market // Assets & Skins</p>
        </div>
        
        <div className="flex gap-4">
          <div className="flex flex-col items-end">
            <span className="text-[10px] text-gray-600 font-black tracking-widest uppercase mb-1">{t('market.balance', language)}</span>
            <div className="flex items-center gap-3 px-6 py-3 bg-white/5 border border-accent-cyan/20 hud-corners group cursor-pointer hover:bg-accent-cyan/10 transition-all">
              <span className="text-white font-gaming font-bold text-2xl tracking-tighter">$1,250.00</span>
              <Plus size={18} className="text-accent-cyan group-hover:rotate-90 transition-transform" />
            </div>
          </div>
        </div>
      </div>

      {/* Controls HUD */}
      <div className="glass p-6 hud-corners border-white/5 bg-black/40 flex flex-col lg:flex-row gap-6 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
          <input 
            type="text" 
            placeholder={t('market.search', language)}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-black/60 border border-white/10 rounded-none pl-12 pr-4 py-4 text-xs font-black tracking-widest focus:outline-none focus:border-accent-cyan transition-all text-white uppercase"
          />
        </div>
      </div>

      {/* Item Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {filteredItems.map((item) => {
          const style = rarityStyles[item.rarity];
          return (
            <div 
              key={item.id} 
              className={`glass rounded-none border border-white/10 flex flex-col group cursor-pointer hover:border-white/30 transition-all duration-300 relative overflow-hidden h-full ${style.shadow}`}
            >
              <div className="aspect-square bg-[#15191C] relative flex items-center justify-center p-8 overflow-hidden">
                <div className={`absolute inset-0 opacity-10 ${style.bg} blur-3xl group-hover:opacity-30 transition-opacity`} />
                <img src={item.image} alt={item.name} className="w-full h-auto drop-shadow-[0_10px_15px_rgba(0,0,0,0.5)] group-hover:scale-110 transition-transform duration-500 relative z-10" />
                <div className={`absolute top-4 right-4 px-2 py-0.5 ${style.bg} ${style.text} text-[8px] font-black uppercase tracking-widest border ${style.border}`}>
                  {item.rarity}
                </div>
              </div>
              
              <div className="p-5 space-y-3 flex-1 flex flex-col border-t border-white/5">
                <div>
                  <h3 className="font-bold text-xs text-white tracking-widest uppercase mb-1">{item.name}</h3>
                  <p className="font-gaming font-black text-sm italic text-gray-400 group-hover:text-accent-cyan transition-colors uppercase">{item.skin}</p>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-white/5 mt-auto">
                  <span className="font-gaming font-black text-lg text-white">${item.price.toFixed(2)}</span>
                  <button className="p-2 bg-white/5 border border-white/10 text-gray-500 hover:text-accent-cyan transition-all">
                    <ShoppingBag size={14} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Market;