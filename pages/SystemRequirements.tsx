
import React from 'react';
import { Monitor, Cpu, HardDrive, Zap, Info, ShieldCheck } from 'lucide-react';

const SystemRequirements: React.FC = () => {
  const requirements = [
    {
      title: "Минимальные",
      os: "Windows 10",
      cpu: "Intel Core i7-4710HQ",
      ram: "8 Гб (Двухканальный режим)",
      gpu: "NVIDIA GeForce RTX 2060",
      storage: "??",
      other: "SSD / DirectX 11(Default) / RS-1920x1080",
      color: "border-slate-600"
    },
    {
      title: "Рекомендуемые",
      os: "Windows 10",
      cpu: "Intel Core i7-13620H / i5-7400 / AMD Ryzen-7 6800H",
      ram: "16 ГБ (Двухканальный режим)",
      gpu: "NVIDIA GeForce RTX 4060 / AMD Radeon RX 580 / RTX 3050",
      storage: "??",
      other: "SSD / DirectX 12 / RS-1920x1080",
      color: "border-red-600",
      featured: true
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center mb-16">
        <h2 className="text-5xl font-gaming font-bold tracking-tight uppercase">СИСТЕМНЫЕ <span className="text-red-500">ТРЕБОВАНИЯ</span></h2>
        <p className="text-slate-400 mt-4 max-w-2xl mx-auto">
          Убедитесь, что ваша боевая станция готова к развертыванию. Для стабильной игры на высоких настройках рекомендуется использовать SSD.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {requirements.map((req, idx) => (
          <div 
            key={idx} 
            className={`glass p-8 rounded-2xl border-2 ${req.color} relative overflow-hidden flex flex-col transition-transform hover:scale-[1.01]`}
          >
            {req.featured && (
              <div className="absolute top-0 right-0 bg-red-600 text-white text-[10px] font-bold tracking-widest px-4 py-1 uppercase rounded-bl-xl shadow-lg">
                РЕКОМЕНДУЕМО
              </div>
            )}
            
            <div className="flex items-center gap-4 mb-8">
              <div className={`p-3 rounded-lg bg-black/40 border ${req.color}`}>
                <Monitor className={req.featured ? "text-red-500" : "text-slate-400"} size={32} />
              </div>
              <h3 className="text-3xl font-gaming font-bold uppercase tracking-wider">{req.title}</h3>
            </div>

            <div className="space-y-6 flex-1">
              <div className="flex items-start gap-4">
                <Info className="text-blue-500 mt-1 shrink-0" size={20} />
                <div>
                  <span className="text-slate-500 text-[10px] uppercase font-bold tracking-widest block mb-1">Операционная система</span>
                  <p className="text-white font-bold">{req.os}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Cpu className="text-blue-500 mt-1 shrink-0" size={20} />
                <div>
                  <span className="text-slate-500 text-[10px] uppercase font-bold tracking-widest block mb-1">Процессор</span>
                  <p className="text-white font-bold">{req.cpu}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Zap className="text-blue-500 mt-1 shrink-0" size={20} />
                <div>
                  <span className="text-slate-500 text-[10px] uppercase font-bold tracking-widest block mb-1">Оперативная память</span>
                  <p className="text-white font-bold">{req.ram}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <ShieldCheck className="text-blue-500 mt-1 shrink-0" size={20} />
                <div>
                  <span className="text-slate-500 text-[10px] uppercase font-bold tracking-widest block mb-1">Видеокарта</span>
                  <p className="text-white font-bold">{req.gpu}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <HardDrive className="text-blue-500 mt-1 shrink-0" size={20} />
                <div>
                  <span className="text-slate-500 text-[10px] uppercase font-bold tracking-widest block mb-1">Место на диске</span>
                  <p className="text-white font-bold">{req.storage}</p>
                </div>
              </div>

              <div className="p-4 bg-black/40 border border-white/5 rounded-xl mt-4">
                <span className="text-slate-500 text-[10px] uppercase font-bold tracking-widest block mb-2">Другое</span>
                <p className="text-slate-300 text-sm italic">{req.other}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 p-6 glass rounded-xl border border-red-600/20 text-center">
        <p className="text-slate-500 text-sm italic">
          * Технические данные могут изменяться в процессе оптимизации игры. Следите за обновлениями в разделе «РАЗВЕДКА».
        </p>
      </div>
    </div>
  );
};

export default SystemRequirements;
