
import React from 'react';
// Added Gamepad2 to the imports
import { Info, Shield, Users, Download, UserCheck, Calendar, Layers, ShieldAlert, Gamepad2 } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center mb-16">
        <h2 className="text-5xl font-gaming font-bold tracking-tight uppercase">О ПРОЕКТЕ <span className="text-blue-500">TEAMS WAR</span></h2>
        <p className="text-slate-400 mt-4 max-w-2xl mx-auto">
          Узнайте больше о технических характеристиках и ключевых особенностях самого динамичного тактического шутера современности.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {/* Техническая Спецификация */}
        <div className="glass p-8 rounded-2xl border-2 border-red-600 space-y-6">
          <div className="flex items-center gap-3 border-b border-red-600/20 pb-4">
            <Info className="text-red-500" size={24} />
            <h3 className="text-2xl font-gaming font-bold uppercase">ОСНОВНАЯ ИНФОРМАЦИЯ</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b border-white/5 pb-2">
              <span className="text-slate-400 text-sm flex items-center gap-2"><Layers size={16} className="text-red-500" /> Жанр</span>
              <span className="text-white font-bold text-sm">Тактический командный шутер</span>
            </div>
            <div className="flex justify-between items-center border-b border-white/5 pb-2">
              <span className="text-slate-400 text-sm flex items-center gap-2"><UserCheck size={16} className="text-red-500" /> Издатель</span>
              <span className="text-blue-400 font-bold text-sm">NiksOnGame</span>
            </div>
            <div className="flex justify-between items-center border-b border-white/5 pb-2">
              <span className="text-slate-400 text-sm flex items-center gap-2"><Shield size={16} className="text-red-500" /> Разработчик</span>
              <span className="text-white font-bold text-sm">Александров Н.А.</span>
            </div>
            <div className="flex justify-between items-center border-b border-white/5 pb-2">
              <span className="text-slate-400 text-sm flex items-center gap-2"><Calendar size={16} className="text-red-500" /> Дата выхода</span>
              <span className="text-white font-bold text-sm">01.08.2025</span>
            </div>
            <div className="flex justify-between items-center border-b border-white/5 pb-2">
              <span className="text-slate-400 text-sm flex items-center gap-2"><Info size={16} className="text-red-500" /> Версия игры</span>
              <div className="text-right">
                <span className="text-white font-bold text-sm block">0.7.8.1</span>
                <span className="text-slate-500 text-[10px]">от 08.01.2026</span>
              </div>
            </div>
          </div>
        </div>

        {/* Характеристики клиента */}
        <div className="glass p-8 rounded-2xl border-2 border-red-600 space-y-6">
          <div className="flex items-center gap-3 border-b border-red-600/20 pb-4">
            <Download className="text-red-500" size={24} />
            <h3 className="text-2xl font-gaming font-bold uppercase">ХАРАКТЕРИСТИКИ</h3>
          </div>

          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-red-600/20 border border-red-600 text-red-400 text-[10px] font-bold tracking-widest rounded uppercase">Клиентская</span>
              <span className="px-3 py-1 bg-blue-600/20 border border-blue-600 text-blue-400 text-[10px] font-bold tracking-widest rounded uppercase">Бесплатная</span>
              <span className="px-3 py-1 bg-green-600/20 border border-green-600 text-green-400 text-[10px] font-bold tracking-widest rounded uppercase">Многопользовательская</span>
              <span className="px-3 py-1 bg-purple-600/20 border border-purple-600 text-purple-400 text-[10px] font-bold tracking-widest rounded uppercase">Онлайн-игра</span>
            </div>
            
            <div className="p-4 bg-black/40 border border-white/5 rounded-xl">
              <div className="flex justify-between items-center mb-2">
                <span className="text-slate-400 text-sm">Размер дистрибутива</span>
                <span className="text-white font-gaming font-bold text-xl">19.9 ГБ</span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-red-600 h-full w-1/3"></div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-red-900/10 border border-red-600/20 rounded-xl">
              <ShieldAlert className="text-red-500 shrink-0" size={20} />
              <div>
                <span className="text-white font-bold text-sm block">Возрастное ограничение 6+</span>
                <p className="text-slate-500 text-[10px] leading-tight">
                  Содержит материалы, не рекомендуемые к просмотру лицам младше 6 лет
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Особенности игры */}
      <div className="space-y-8">
        <h3 className="text-3xl font-gaming font-bold uppercase text-center border-b border-red-600/20 pb-4 w-fit mx-auto">ОСОБЕННОСТИ ИГРЫ</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass p-6 rounded-xl border border-white/5 hover:border-red-600 transition-colors">
            <Users className="text-blue-500 mb-4" size={32} />
            <h4 className="font-gaming font-bold text-xl mb-2 uppercase">КЛАНОВАЯ СИСТЕМА</h4>
            <p className="text-slate-400 text-sm">Объединяйтесь в отряды и создавайте кланы для доминирования в глобальных рейтингах.</p>
          </div>
          <div className="glass p-6 rounded-xl border border-white/5 hover:border-red-600 transition-colors">
            <Shield className="text-red-500 mb-4" size={32} />
            <h4 className="font-gaming font-bold text-xl mb-2 uppercase">РЕАЛИСТИЧНЫЙ БАЛАНС</h4>
            <p className="text-slate-400 text-sm">Уникальная механика веса брони и баллистики, требующая тактического мышления.</p>
          </div>
          <div className="glass p-6 rounded-xl border border-white/5 hover:border-red-600 transition-colors">
            <Gamepad2 className="text-green-500 mb-4" size={32} />
            <h4 className="font-gaming font-bold text-xl mb-2 uppercase">ПОСТОЯННЫЙ РОСТ</h4>
            <p className="text-slate-400 text-sm">Регулярные обновления контента и глубокая оптимизация игрового клиента.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
