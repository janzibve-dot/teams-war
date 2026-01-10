import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Search, Send, UserPlus, Mail, Terminal, User, MessageSquare } from 'lucide-react';
import { User as UserType, Language } from '../types';
import { t } from '../services/i18n';
import { authService } from '../services/authService';

interface MessengerProps {
  currentUser: UserType | null;
  language: Language;
  onLoginPrompt: () => void;
  onAddNotification: (message: string, type?: 'success' | 'error' | 'info', title?: string) => void;
}

interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: Date;
}

interface ChatSession {
  targetUser: UserType;
  messages: Message[];
  online: boolean;
}

const Messenger: React.FC<MessengerProps> = ({ currentUser, language, onLoginPrompt, onAddNotification }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const searchResults = useMemo(() => {
    return authService.searchUsers(searchTerm).filter(u => u.id !== currentUser?.id);
  }, [searchTerm, currentUser]);

  const [activeSessions, setActiveSessions] = useState<ChatSession[]>([
    {
      targetUser: { id: 'v_king', username: 'Viper_King', email: 'v@w.com', avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Viper' },
      messages: [{ id: 'm1', senderId: 'v_king', text: language === 'ru' ? 'Слышал, ты неплохо стреляешь. Готов к турниру?' : 'Heard you are a good shot. Ready for the tournament?', timestamp: new Date(Date.now() - 3600000) }],
      online: true
    }
  ]);

  const currentChat = activeSessions.find(s => s.targetUser.id === selectedChatId);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentChat?.messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return onLoginPrompt();
    if (!inputMessage.trim() || !selectedChatId) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: currentUser.id,
      text: inputMessage,
      timestamp: new Date()
    };

    setActiveSessions(prev => prev.map(s => {
      if (s.targetUser.id === selectedChatId) {
        return { ...s, messages: [...s.messages, newMessage] };
      }
      return s;
    }));
    setInputMessage('');

    // Mock bot response
    setTimeout(() => {
      const response: Message = {
        id: (Date.now() + 1).toString(),
        senderId: selectedChatId,
        text: language === 'ru' ? 'Принято. Свяжусь позже.' : 'Copy that. Talk later.',
        timestamp: new Date()
      };
      setActiveSessions(prev => prev.map(s => {
        if (s.targetUser.id === selectedChatId) {
          return { ...s, messages: [...s.messages, response] };
        }
        return s;
      }));
    }, 1200);
  };

  const startChat = (user: UserType) => {
    if (!activeSessions.find(s => s.targetUser.id === user.id)) {
      setActiveSessions(prev => [{
        targetUser: user,
        messages: [],
        online: Math.random() > 0.3
      }, ...prev]);
    }
    setSelectedChatId(user.id);
    setSearchTerm('');
    onAddNotification(
      language === 'ru' ? `Переписка с ${user.username} начата` : `Chat with ${user.username} started`,
      'success',
      language === 'ru' ? 'Мессенджер' : 'Messenger'
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-6 h-[calc(100vh-120px)] flex flex-col animate-fade-in">
      <div className="flex-1 flex bg-dark-surface/40 border border-white/10 overflow-hidden shadow-2xl hud-corners backdrop-blur-xl">
        {/* Left: Chat List & Search */}
        <div className="w-80 md:w-96 border-r border-white/5 flex flex-col bg-black/40">
          <div className="p-6">
            <h3 className="font-gaming font-black text-xl uppercase italic mb-4" data-i18n="navbar.messenger">
              {t('navbar.messenger', language)}
            </h3>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" size={16} />
              <input 
                id="user-search"
                type="text" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={t('messenger.search_placeholder', language)}
                className="w-full bg-white/5 border border-white/10 rounded-full pl-10 pr-4 py-3 text-xs outline-none focus:border-accent-cyan transition text-white"
              />
              
              {searchTerm.length >= 2 && (
                <div id="chat-list" className="absolute top-full left-0 w-full mt-2 bg-dark-surface border border-white/10 z-50 shadow-2xl overflow-hidden rounded-xl">
                  {searchResults.length > 0 ? searchResults.map(u => (
                    <div 
                      key={u.id} 
                      onClick={() => startChat(u)}
                      className="p-4 flex items-center gap-4 hover:bg-white/5 cursor-pointer transition border-b border-white/5"
                    >
                      <img src={u.avatarUrl} className="w-8 h-8 rounded-full border border-white/10" alt="" />
                      <span className="font-bold text-xs text-white">{u.username}</span>
                    </div>
                  )) : <div className="p-4 text-xs text-gray-500 italic text-center">No operators found</div>}
                </div>
              )}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto scrollbar-thin">
            {activeSessions.map((session) => (
              <div 
                key={session.targetUser.id}
                onClick={() => setSelectedChatId(session.targetUser.id)}
                className={`p-4 flex items-center gap-4 cursor-pointer transition border-b border-white/5 ${
                  selectedChatId === session.targetUser.id ? 'bg-accent-cyan/10' : 'hover:bg-white/5'
                }`}
              >
                <div className="relative">
                  <img 
                    src={session.targetUser.avatarUrl} 
                    className={`w-12 h-12 rounded-full border-2 ${session.online ? 'border-accent-cyan' : 'border-white/10'}`} 
                    alt="" 
                  />
                  {session.online && <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-dark-bg shadow-[0_0_10px_rgba(34,197,94,0.5)]" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm text-white truncate">{session.targetUser.username}</p>
                  <p className="text-[10px] text-gray-500 truncate mt-0.5">
                    {session.messages.length > 0 ? session.messages[session.messages.length - 1].text : 'Start a secure channel...'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Chat Window */}
        <div className="flex-1 flex flex-col relative">
          {currentChat ? (
            <>
              <div className="p-4 border-b border-white/5 flex justify-between items-center bg-white/5 backdrop-blur-md">
                <div className="flex items-center gap-4">
                  <div className="relative" id="active-chat-avatar">
                    <img src={currentChat.targetUser.avatarUrl} className="w-10 h-10 rounded-full border border-accent-cyan/50" alt="" />
                    {currentChat.online && <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-black" />}
                  </div>
                  <div>
                    <p id="active-chat-name" className="font-bold text-white">{currentChat.targetUser.username}</p>
                    <p className={`text-[10px] uppercase font-black ${currentChat.online ? 'text-green-500' : 'text-gray-500'}`}>
                      {currentChat.online ? t('messenger.online', language) : t('messenger.offline', language)}
                    </p>
                  </div>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 transition group">
                  <UserPlus className="w-4 h-4 text-accent-cyan group-hover:scale-110 transition-transform" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">{t('messenger.add_to_chat', language)}</span>
                </button>
              </div>

              <div id="messages-container" className="flex-1 p-8 space-y-4 overflow-y-auto scrollbar-thin bg-black/20">
                {currentChat.messages.length === 0 && (
                  <div className="text-center text-gray-600 text-xs italic mt-20">Secure connection established with {currentChat.targetUser.username}. Start messaging...</div>
                )}
                {currentChat.messages.map((msg) => {
                  const isMine = currentUser && msg.senderId === currentUser.id;
                  return (
                    <div key={msg.id} className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[70%] px-6 py-4 rounded-2xl shadow-lg border ${
                        isMine 
                        ? 'bg-accent-cyan text-black border-accent-cyan font-bold' 
                        : 'bg-dark-surface border-white/5 text-gray-300'
                      }`}>
                        <p className="text-sm">{msg.text}</p>
                        <p className={`text-[8px] mt-2 font-black uppercase ${isMine ? 'text-black/50' : 'text-gray-600'}`}>
                          {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>

              <div className="p-6 bg-black/40 border-t border-white/5">
                <form onSubmit={handleSendMessage} className="flex gap-4">
                  <input 
                    type="text" 
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder={t('messenger.type_message', language)}
                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-6 py-4 outline-none focus:border-accent-cyan text-white transition-all font-medium"
                  />
                  <button type="submit" className="w-14 h-14 bg-accent-cyan text-black rounded-xl flex items-center justify-center hover:bg-white transition-all shadow-[0_0_20px_rgba(0,240,255,0.2)]">
                    <Send size={24} />
                  </button>
                </form>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-12">
              <div className="w-20 h-20 bg-accent-cyan/10 border border-accent-cyan/30 rounded-full flex items-center justify-center mb-6 animate-pulse">
                <MessageSquare className="text-accent-cyan" size={40} />
              </div>
              <h2 className="text-3xl font-gaming font-black italic uppercase tracking-tighter mb-4 text-white">
                {t('messenger.no_chat_selected', language)}
              </h2>
              <p className="text-gray-500 text-xs uppercase tracking-[4px] font-bold">Encrypted P2P Link Pending...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messenger;