import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { Send, MessageSquare, X, Minus, Maximize2, Bot, Volume2, VolumeX, Play, User as UserIcon, Terminal } from 'lucide-react';
import { ChatMessage, User as UserType, Language } from '../types';
import { getAiResponse, generateSpeech } from '../services/geminiService';
import { t } from '../services/i18n';

interface ChatProps {
  user: UserType | null;
  onLoginPrompt: () => void;
  language: Language;
}

const Chat: React.FC<ChatProps> = ({ user, onLoginPrompt, language }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  
  const guestName = useMemo(() => `OP_${Math.floor(1000 + Math.random() * 9000)}`, []);

  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '1', user: 'SYSTEM', text: 'КАНАЛ СВЯЗИ УСТАНОВЛЕН. ТЕРМИНАЛ АКТИВИРОВАН.', timestamp: new Date() },
    { id: '2', user: t('chat.botName', language), text: 'На связи! Я готов помочь с тактикой или ответить на вопросы об игре.', timestamp: new Date(), isAi: true },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  const getAudioContext = async () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
    }
    if (audioContextRef.current.state === 'suspended') {
      await audioContextRef.current.resume();
    }
    return audioContextRef.current;
  };

  const playNotificationSound = async () => {
    if (isMuted) return;
    const ctx = await getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'square';
    osc.frequency.setValueAtTime(1000, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.05);
    
    gain.gain.setValueAtTime(0.02, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.05);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start();
    osc.stop(ctx.currentTime + 0.05);
  };

  const decodeAndPlay = async (base64: string) => {
    const ctx = await getAudioContext();
    setIsSpeaking(true);
    
    try {
      const binaryString = atob(base64);
      const len = binaryString.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      
      const dataInt16 = new Int16Array(bytes.buffer);
      const audioBuffer = ctx.createBuffer(1, dataInt16.length, 24000);
      const channelData = audioBuffer.getChannelData(0);
      for (let i = 0; i < dataInt16.length; i++) {
        channelData[i] = dataInt16[i] / 32768.0;
      }
      
      const source = ctx.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(ctx.destination);
      source.onended = () => setIsSpeaking(false);
      source.start();
    } catch (e) {
      console.error("Audio Playback Error:", e);
      setIsSpeaking(false);
    }
  };

  const speak = useCallback(async (msg: ChatMessage) => {
    if (isMuted) return;

    if (msg.isAi) {
      const audioData = await generateSpeech(msg.text);
      if (audioData) {
        await decodeAndPlay(audioData);
      }
    } else {
      const utterance = new SpeechSynthesisUtterance(`${msg.user} говорит: ${msg.text}`);
      utterance.lang = language === 'ru' ? 'ru-RU' : 'en-US';
      utterance.rate = 1.2;
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    }
  }, [isMuted, language]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping, isMinimized, isOpen]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    await getAudioContext();

    const currentUserName = user ? user.username : guestName;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      user: currentUserName,
      text: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');

    if (input.toLowerCase().includes('бот') || input.toLowerCase().includes('bot') || input.toLowerCase().includes('помощь') || Math.random() > 0.7) {
      setIsTyping(true);
      const aiText = await getAiResponse(input);
      setIsTyping(false);
      
      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        user: t('chat.botName', language),
        text: aiText,
        timestamp: new Date(),
        isAi: true
      };
      
      setMessages(prev => [...prev, aiMsg]);
      await playNotificationSound();
      speak(aiMsg);
    }
  };

  const toggleMute = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const newMuteState = !isMuted;
    setIsMuted(newMuteState);
    if (!newMuteState) {
      await getAudioContext();
      playNotificationSound();
    } else {
      window.speechSynthesis.cancel();
    }
  };

  const currentDisplayName = user ? user.username : guestName;

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-dark-surface border border-accent-cyan flex items-center justify-center shadow-[0_0_20px_rgba(0,240,255,0.2)] hover:bg-accent-cyan group transition-all z-50 skew-x-[-10deg]"
      >
        <div className="skew-x-[10deg] relative">
          <Terminal className="text-accent-cyan group-hover:text-black transition-colors" />
          {isSpeaking && (
            <span className="absolute -top-4 -right-4 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-red opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-accent-red"></span>
            </span>
          )}
        </div>
      </button>
    );
  }

  return (
    <div className={`fixed right-6 bottom-6 w-80 md:w-96 glass border border-accent-cyan/30 shadow-2xl flex flex-col transition-all z-50 hud-corners ${isMinimized ? 'h-12' : 'h-[480px]'}`}>
      <div className="h-12 border-b border-white/10 flex items-center justify-between px-4 cursor-pointer bg-black/40" onClick={() => isMinimized && setIsMinimized(false)}>
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-pulse"></div>
          <h3 className="font-gaming font-black text-xs tracking-[2px] uppercase" data-i18n="chat.title">{t('chat.title', language)}</h3>
        </div>
        <div className="flex items-center gap-1">
          <button 
            onClick={toggleMute} 
            className={`p-1.5 transition-colors ${isMuted ? 'text-gray-600' : 'text-accent-cyan'}`}
          >
            {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} className={isSpeaking ? "animate-bounce" : ""} />}
          </button>
          <button onClick={(e) => { e.stopPropagation(); setIsMinimized(!isMinimized); }} className="text-gray-500 hover:text-white p-1.5">
            {isMinimized ? <Maximize2 size={14} /> : <Minus size={14} />}
          </button>
          <button onClick={(e) => { e.stopPropagation(); setIsOpen(false); }} className="text-gray-500 hover:text-accent-red p-1.5">
            <X size={14} />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-black/20 scrollbar-thin">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex flex-col ${msg.user === currentDisplayName ? 'items-end' : 'items-start'}`}>
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-[9px] font-black tracking-widest uppercase italic ${msg.isAi ? 'text-accent-cyan' : 'text-gray-500'}`}>
                    {msg.user}
                  </span>
                  <span className="text-[8px] text-gray-600">
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                  <button onClick={() => speak(msg)} className="text-gray-700 hover:text-accent-cyan transition-colors"><Play size={8} /></button>
                </div>
                <div className={`max-w-[90%] px-3 py-2 text-xs border ${
                  msg.user === currentDisplayName 
                    ? 'bg-accent-cyan/10 border-accent-cyan/40 text-white rounded-bl-lg' 
                    : msg.isAi 
                      ? 'bg-accent-red/5 border-accent-red/30 text-accent-red/90 rounded-br-lg'
                      : 'bg-white/5 border-white/10 text-gray-300 rounded-br-lg'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex items-center gap-2 text-gray-600 text-[10px] italic font-bold">
                <Bot size={10} className="animate-bounce" /> <span data-i18n="chat.typing">{t('chat.botName', language).toUpperCase()} {t('chat.typing', language)}</span>
              </div>
            )}
          </div>

          <div className="p-4 bg-black/60 border-t border-white/5">
            <form onSubmit={handleSend} className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t('chat.placeholder', language)}
                data-i18n-placeholder="chat.placeholder"
                className="w-full bg-black/50 border border-white/10 rounded-none px-4 py-3 pr-10 text-[11px] font-bold tracking-widest focus:outline-none focus:border-accent-cyan transition-all text-white"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-600 hover:text-accent-cyan transition-colors"
              >
                <Send size={18} />
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default Chat;