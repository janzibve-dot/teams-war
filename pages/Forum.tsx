
import React, { useState } from 'react';
import { MessageSquareText, Plus, User, Clock, Filter, BarChart3, Info, X, MessageSquare } from 'lucide-react';
import { Language, User as UserType } from '../types';
import { t } from '../services/i18n';

interface ForumTopic {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  authorAvatar?: string;
  category: 'bug' | 'idea' | 'general';
  responses: number;
  votes?: number;
  timestamp: string;
}

interface ForumProps {
  language: Language;
  user: UserType | null;
  onLoginPrompt: () => void;
  onAddNotification: (message: string, type?: 'success' | 'error' | 'info', title?: string) => void;
}

const Forum: React.FC<ForumProps> = ({ language, user, onLoginPrompt, onAddNotification }) => {
  const [filter, setFilter] = useState<'all' | 'bug' | 'idea'>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTopic, setNewTopic] = useState({ title: '', category: 'general' as const, content: '' });

  const [topics, setTopics] = useState<ForumTopic[]>([
    {
      id: '4120',
      category: 'bug',
      title: language === 'ru' ? 'Пропадает текстура на карте "Dust-Neon" возле точки А' : 'Texture disappears on "Dust-Neon" near point A',
      excerpt: language === 'ru' ? 'Заметил, что при игре за сторону защиты, если подойти к ящикам...' : 'Noticed that when playing for defense side, if you approach the crates...',
      author: 'Admin_Neo',
      responses: 24,
      timestamp: `2 ${t('forum.hours', language)} ${t('forum.ago', language)}`,
    },
    {
      id: '4121',
      category: 'idea',
      title: language === 'ru' ? 'Добавить режим "Только снайперы" в еженедельные ротации' : 'Add "Snipers only" mode to weekly rotations',
      excerpt: language === 'ru' ? 'Было бы круто раз в неделю вводить фановые режимы для отдыха от рейтинга...' : 'It would be cool to introduce fun modes once a week to rest from ranking...',
      author: 'Sniper_Pro',
      votes: 156,
      responses: 12,
      timestamp: t('forum.yesterday', language),
    }
  ]);

  const filteredTopics = topics.filter(t => filter === 'all' || t.category === filter);

  const handleCreateTopic = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      onLoginPrompt();
      return;
    }
    if (!newTopic.title.trim()) {
      onAddNotification(
        language === 'ru' ? 'Введите заголовок!' : 'Enter a title!',
        'error',
        language === 'ru' ? 'Штаб' : 'HQ'
      );
      return;
    }

    const topic: ForumTopic = {
      id: Math.floor(Math.random() * 10000).toString(),
      title: newTopic.title,
      excerpt: newTopic.content.substring(0, 100) + (newTopic.content.length > 100 ? '...' : ''),
      author: user.username,
      authorAvatar: user.avatarUrl,
      category: newTopic.category,
      responses: 0,
      timestamp: t('forum.just_now', language),
    };

    setTopics([topic, ...topics]);
    setIsModalOpen(false);
    setNewTopic({ title: '', category: 'general', content: '' });
    onAddNotification(
      language === 'ru' ? 'Тема успешно создана!' : 'Topic successfully created!',
      'success',
      language === 'ru' ? 'Штаб' : 'HQ'
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 animate-fade-in font-sans">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <div>
          <h1 className="text-5xl font-black font-display italic uppercase tracking-tighter leading-none">
            {t('forum.title', language)} <span className="text-accent-cyan">{t('forum.subtitle', language)}</span>
          </h1>
          <p className="text-gray-500 mt-2 uppercase text-[10px] font-bold tracking-[3px]">
            {t('forum.desc', language)}
          </p>
        </div>
        
        <div className="flex gap-2">
          <button 
            onClick={() => setFilter('all')}
            className={`px-4 py-2 text-[10px] font-bold uppercase rounded transition-all ${filter === 'all' ? 'bg-accent-cyan text-black' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}
          >
            {t('forum.filter_all', language)}
          </button>
          <button 
            onClick={() => setFilter('bug')}
            className={`px-4 py-2 text-[10px] font-bold uppercase rounded transition-all ${filter === 'bug' ? 'bg-accent-cyan text-black' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}
          >
            {t('forum.filter_bugs', language)}
          </button>
          <button 
            onClick={() => setFilter('idea')}
            className={`px-4 py-2 text-[10px] font-bold uppercase rounded transition-all ${filter === 'idea' ? 'bg-accent-cyan text-black' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}
          >
            {t('forum.filter_ideas', language)}
          </button>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="ml-4 skew-btn px-6 py-2 bg-accent-cyan hover:bg-white text-black font-display font-black uppercase text-[12px] tracking-widest transition-all h-10"
          >
            <span>{t('forum.new_topic', language)}</span>
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3 space-y-4">
          {filteredTopics.map((topic) => (
            <div 
              key={topic.id}
              className="glass-panel p-6 border-l-4 border-transparent forum-row transition-all duration-300 cursor-pointer group"
            >
              <div className="flex gap-4">
                <div className="hidden md:flex flex-col items-center justify-center w-16 h-16 bg-white/5 rounded-lg border border-white/5">
                  <span className={`text-xl font-bold font-display ${topic.votes ? 'text-accent-cyan' : 'text-white'}`}>
                    {topic.votes || topic.responses}
                  </span>
                  <span className="text-[8px] uppercase text-gray-500 font-black">
                    {topic.votes ? t('forum.votes', language) : t('forum.responses', language)}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase ${
                      topic.category === 'bug' ? 'badge-bug' : 
                      topic.category === 'idea' ? 'badge-idea' : 
                      'bg-white/10 text-white border border-white/5'
                    }`}>
                      {topic.category === 'bug' ? t('forum.badge_bug', language) : (topic.category === 'idea' ? t('forum.badge_idea', language) : t('forum.badge_general', language))}
                    </span>
                    <span className="text-gray-600 text-[10px] font-bold">#{topic.id}</span>
                  </div>
                  <h3 className="text-xl font-bold group-hover:text-accent-cyan transition uppercase tracking-tight truncate">{topic.title}</h3>
                  <p className="text-gray-500 text-sm mt-1 line-clamp-1 italic">{topic.excerpt}</p>
                  <div className="flex items-center gap-4 mt-4 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                    <span className="flex items-center gap-1">
                      <User size={12} className="text-accent-cyan" /> {topic.author === user?.username ? t('forum.author_you', language) : topic.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} className="text-gray-500" /> {topic.timestamp}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {filteredTopics.length === 0 && (
            <div className="glass-panel p-20 text-center space-y-4 rounded-3xl">
              <MessageSquareText size={48} className="mx-auto text-gray-700" />
              <p className="text-gray-500 font-black uppercase tracking-[4px]">{language === 'ru' ? 'ТЕМ НЕ НАЙДЕНО' : 'NO TOPICS FOUND'}</p>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="glass-panel p-6 rounded-2xl">
            <h4 className="font-display font-black uppercase text-gray-400 mb-4 tracking-widest italic flex items-center gap-2">
              <BarChart3 size={18} className="text-accent-cyan" /> {t('forum.stats', language)}
            </h4>
            <div className="space-y-4">
              <div className="flex justify-between text-xs">
                <span className="text-gray-500 uppercase font-bold tracking-wider">{t('forum.total_topics', language)}:</span>
                <span className="font-bold text-accent-cyan">12,450</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-500 uppercase font-bold tracking-wider">{t('forum.users', language)}:</span>
                <span className="font-bold text-accent-cyan">85,200</span>
              </div>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-2xl border-t-2 border-accent-red/50">
            <h4 className="font-display font-black uppercase text-accent-red mb-4 tracking-widest italic flex items-center gap-2">
              <Info size={18} /> {t('forum.rules', language)}
            </h4>
            <ul className="text-[10px] text-gray-400 space-y-3 leading-relaxed font-bold uppercase">
              <li>{t('forum.rule1', language)}</li>
              <li>{t('forum.rule2', language)}</li>
              <li>{t('forum.rule3', language)}</li>
            </ul>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/95 backdrop-blur-sm animate-fade-in">
          <div className="absolute inset-0" onClick={() => setIsModalOpen(false)}></div>
          <div className="relative w-full max-w-2xl glass-panel rounded-3xl p-8 border border-white/10 shadow-2xl animate-in zoom-in-95 duration-300">
            <h2 className="text-3xl font-black font-display italic uppercase mb-8">
              {t('forum.modal_title', language).split(' ')[0]} <span className="text-accent-cyan">{t('forum.modal_title', language).split(' ').slice(1).join(' ')}</span>
            </h2>
            
            <form onSubmit={handleCreateTopic} className="space-y-6">
              <div>
                <label className="block text-[10px] font-bold uppercase text-gray-500 mb-2">{t('forum.modal_label_title', language)}</label>
                <input 
                  type="text" 
                  value={newTopic.title}
                  onChange={(e) => setNewTopic({...newTopic, title: e.target.value})}
                  placeholder={t('forum.modal_placeholder_title', language)}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-sm focus:border-accent-cyan outline-none transition-all text-white font-bold uppercase tracking-widest"
                />
              </div>
              
              <div>
                <label className="block text-[10px] font-bold uppercase text-gray-500 mb-2">{t('forum.modal_label_cat', language)}</label>
                <select 
                  value={newTopic.category}
                  onChange={(e) => setNewTopic({...newTopic, category: e.target.value as any})}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-sm focus:border-accent-cyan outline-none transition-all text-white font-bold uppercase tracking-widest appearance-none"
                >
                  <option value="general">{t('forum.cat_general', language)}</option>
                  <option value="bug">{t('forum.cat_bug', language)}</option>
                  <option value="idea">{t('forum.cat_idea', language)}</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase text-gray-500 mb-2">{t('forum.modal_label_desc', language)}</label>
                <textarea 
                  value={newTopic.content}
                  onChange={(e) => setNewTopic({...newTopic, content: e.target.value})}
                  rows={6} 
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-sm focus:border-accent-cyan outline-none text-white font-medium resize-none" 
                  placeholder={t('forum.modal_placeholder_desc', language)}
                ></textarea>
              </div>

              <div className="flex gap-4">
                <button 
                  type="submit" 
                  className="flex-1 py-5 bg-accent-cyan text-black font-black uppercase skew-btn transition-all text-sm tracking-[3px]"
                >
                  {t('forum.modal_submit', language)}
                </button>
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)} 
                  className="px-8 py-5 bg-white/5 font-black uppercase skew-btn transition-all text-sm text-white tracking-[3px]"
                >
                  {t('forum.modal_cancel', language)}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Forum;
