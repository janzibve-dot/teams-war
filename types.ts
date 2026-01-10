export interface User {
  id: string;
  username: string;
  email: string;
  bio?: string;
  avatarUrl?: string;
}

export interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category: 'Обновление' | 'Событие' | 'Сообщество';
  imageUrl: string;
}

export type Language = 'ru' | 'en';

export enum Page {
  Home = 'home',
  News = 'news',
  Play = 'play',
  Leaderboard = 'leaderboard',
  SystemRequirements = 'requirements',
  BugReport = 'bug-report',
  About = 'about',
  Community = 'community',
  Forum = 'forum',
  Messenger = 'messenger',
  Profile = 'profile',
  Tournaments = 'tournaments',
  Market = 'market',
  Clan = 'clan'
}

export interface ChatMessage {
  id: string;
  user: string;
  text: string;
  timestamp: Date;
  isAi?: boolean;
}

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'info';
  title?: string;
  message: string;
}