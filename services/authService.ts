
import { User } from '../types';

const USERS_KEY = 'teams_war_users';
const SESSION_KEY = 'teams_war_session';

export interface UserStats {
  level: number;
  xp: number;
  maxXp: number;
  rank: string;
  clan: string;
  region: string;
  playTime: string;
  kd: string;
  winRate: string;
  hsPercent: string;
  totalMatches: number;
}

const DEFAULT_STATS: UserStats = {
  level: 1,
  xp: 0,
  maxXp: 1000,
  rank: 'Recruit',
  clan: 'NONE',
  region: 'EU West',
  playTime: '0 ч.',
  kd: '0.00',
  winRate: '0%',
  hsPercent: '0%',
  totalMatches: 0
};

// --- БАЗА ПОЛЬЗОВАТЕЛЕЙ ДЛЯ ПОИСКА (Имитация) ---
const MOCK_GLOBAL_USERS: User[] = [
  { id: 'v_king', username: 'Viper_King', email: 'v@w.com', avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Viper' },
  { id: 'g_hunt', username: 'Ghost_Hunter', email: 'g@w.com', avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ghost' },
  { id: 'c_nova', username: 'Cyber_Nova', email: 'c@w.com', avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Nova' },
  { id: 'm_strik', username: 'Major_Striker', email: 'm@w.com', avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Striker' }
];

export const authService = {
  register: (username: string, email: string): User | null => {
    const users: (User & { stats: UserStats })[] = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
    if (users.find(u => u.email === email || u.username === username)) {
      return null;
    }
    const newUser: User & { stats: UserStats } = {
      id: Math.random().toString(36).substr(2, 9),
      username,
      email,
      avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`,
      stats: { ...DEFAULT_STATS }
    };
    users.push(newUser);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    localStorage.setItem(SESSION_KEY, JSON.stringify(newUser));
    return newUser;
  },

  login: (email: string): User | null => {
    const users: (User & { stats: UserStats })[] = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
    const user = users.find(u => u.email === email);
    if (user) {
      localStorage.setItem(SESSION_KEY, JSON.stringify(user));
      return user;
    }
    return null;
  },

  logout: () => {
    localStorage.removeItem(SESSION_KEY);
  },

  updateProfile: (userId: string, data: { username: string; bio: string; avatarUrl: string }): User | null => {
    const users: (User & { stats: UserStats })[] = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
    const userIndex = users.findIndex(u => u.id === userId);
    
    if (userIndex !== -1) {
      const nameConflict = users.find((u, idx) => u.username === data.username && idx !== userIndex);
      if (nameConflict) return null;

      users[userIndex] = {
        ...users[userIndex],
        username: data.username,
        bio: data.bio,
        avatarUrl: data.avatarUrl
      };
      
      localStorage.setItem(USERS_KEY, JSON.stringify(users));
      localStorage.setItem(SESSION_KEY, JSON.stringify(users[userIndex]));
      return users[userIndex];
    }
    return null;
  },

  getCurrentUser: (): (User & { stats: UserStats }) | null => {
    const session = localStorage.getItem(SESSION_KEY);
    return session ? JSON.parse(session) : null;
  },

  searchUsers: (query: string): User[] => {
    const registered: User[] = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
    const combined = [...MOCK_GLOBAL_USERS, ...registered];
    const unique = Array.from(new Map(combined.map(u => [u.username, u])).values());
    
    if (!query || query.length < 2) return [];
    return unique.filter(u => u.username.toLowerCase().includes(query.toLowerCase()));
  }
};
