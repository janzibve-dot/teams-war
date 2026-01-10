
import React, { useEffect } from 'react';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';
import { Notification } from '../types';

interface ToastProps {
  notification: Notification;
  onClose: (id: string) => void;
}

const Toast: React.FC<ToastProps> = ({ notification, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(notification.id);
    }, 5000);
    return () => clearTimeout(timer);
  }, [notification.id, onClose]);

  const config = {
    success: { icon: CheckCircle, color: 'text-green-500', border: 'border-green-500/50', bg: 'bg-green-500/10' },
    error: { icon: AlertCircle, color: 'text-accent-red', border: 'border-accent-red/50', bg: 'bg-accent-red/10' },
    info: { icon: Info, color: 'text-accent-cyan', border: 'border-accent-cyan/50', bg: 'bg-accent-cyan/10' },
  };

  const { icon: Icon, color, border, bg } = config[notification.type];

  return (
    <div className={`glass p-4 border-l-4 ${border} ${bg} hud-corners animate-in slide-in-from-right duration-300 flex items-start gap-4 shadow-xl`}>
      <Icon className={`${color} shrink-0 mt-0.5`} size={20} />
      <div className="flex-1">
        <p className={`text-[10px] font-black uppercase tracking-[3px] mb-1 ${color}`}>
          {notification.title || (notification.type === 'success' ? 'MISSION SUCCESS' : notification.type === 'error' ? 'SYSTEM ERROR' : 'INCOMING DATA')}
        </p>
        <p className="text-xs font-bold text-white leading-relaxed uppercase tracking-wider">{notification.message}</p>
      </div>
      <button onClick={() => onClose(notification.id)} className="text-gray-600 hover:text-white transition-colors p-1">
        <X size={14} />
      </button>
    </div>
  );
};

export default Toast;
