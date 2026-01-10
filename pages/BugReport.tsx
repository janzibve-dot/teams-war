
import React, { useState } from 'react';
import { Bug, Send, AlertTriangle, CheckCircle2 } from 'lucide-react';

const BugReport: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    type: 'gameplay',
    priority: 'medium',
    description: '',
    steps: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
    setFormData({ title: '', type: 'gameplay', priority: 'medium', description: '', steps: '' });
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center mb-12">
        <h2 className="text-5xl font-gaming font-bold tracking-tight uppercase">ОТЧЕТ ОБ <span className="text-red-500">ОШИБКЕ</span></h2>
        <p className="text-slate-400 mt-4 max-w-xl mx-auto">Помогите нам сделать Teams War лучше. Сообщите о найденных багах, и наша команда инженеров немедленно приступит к их устранению.</p>
      </div>

      {submitted ? (
        <div className="glass p-12 rounded-2xl border-2 border-green-500 text-center space-y-4">
          <CheckCircle2 size={64} className="text-green-500 mx-auto" />
          <h3 className="text-3xl font-gaming font-bold uppercase">ОТЧЕТ ПРИНЯТ!</h3>
          <p className="text-slate-400">Благодарим за службу, боец. Мы изучим предоставленные данные.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="glass p-8 rounded-2xl border-2 border-red-600 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold tracking-widest text-slate-400 uppercase">Заголовок проблемы</label>
              <input 
                type="text" 
                required
                value={formData.title}
                onChange={e => setFormData({...formData, title: e.target.value})}
                placeholder="Напр: Пропадают текстуры на карте 'Неон'"
                className="w-full bg-slate-900 border border-red-600/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-600 transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold tracking-widest text-slate-400 uppercase">Тип бага</label>
              <select 
                value={formData.type}
                onChange={e => setFormData({...formData, type: e.target.value})}
                className="w-full bg-slate-900 border border-red-600/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-600 transition-colors"
              >
                <option value="gameplay">Геймплей</option>
                <option value="graphics">Графика</option>
                <option value="audio">Звук</option>
                <option value="ui">Интерфейс</option>
                <option value="network">Сетевой код</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold tracking-widest text-slate-400 uppercase">Приоритет</label>
            <div className="flex gap-4">
              {['low', 'medium', 'high', 'critical'].map(p => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setFormData({...formData, priority: p})}
                  className={`flex-1 py-2 rounded-lg border font-gaming text-xs tracking-widest uppercase transition-all ${
                    formData.priority === p 
                    ? 'bg-red-600 border-red-400 text-white shadow-lg shadow-red-600/20' 
                    : 'bg-slate-900 border-red-600/30 text-slate-500 hover:border-red-600/60'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold tracking-widest text-slate-400 uppercase">Описание ошибки</label>
            <textarea 
              required
              rows={4}
              value={formData.description}
              onChange={e => setFormData({...formData, description: e.target.value})}
              placeholder="Подробно опишите, что произошло..."
              className="w-full bg-slate-900 border border-red-600/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-600 transition-colors resize-none"
            ></textarea>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold tracking-widest text-slate-400 uppercase">Шаги для воспроизведения</label>
            <textarea 
              rows={3}
              value={formData.steps}
              onChange={e => setFormData({...formData, steps: e.target.value})}
              placeholder="1. Зайти в лобби... 2. Выбрать персонажа... 3. Нажать..."
              className="w-full bg-slate-900 border border-red-600/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-600 transition-colors resize-none"
            ></textarea>
          </div>

          <div className="pt-4">
            <button 
              type="submit"
              className="w-full py-4 bg-red-600 hover:bg-red-500 text-white font-gaming font-bold tracking-widest rounded-lg transition-all shadow-lg shadow-red-600/30 flex items-center justify-center gap-3 uppercase"
            >
              ОТПРАВИТЬ РАПОРТ <Send size={20} />
            </button>
          </div>
        </form>
      )}

      <div className="mt-12 p-6 glass rounded-xl border border-red-600/20 flex items-start gap-4">
        <AlertTriangle className="text-red-500 shrink-0" size={24} />
        <p className="text-slate-500 text-sm italic">
          Внимание: Ложные репорты могут привести к временному ограничению доступа к системе обратной связи. Пожалуйста, прикрепляйте скриншоты, если это возможно (функция скоро появится).
        </p>
      </div>
    </div>
  );
};

export default BugReport;
