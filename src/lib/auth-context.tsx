'use client';

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { api, type User } from './api';

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (token: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthState>({
  user: null,
  token: null,
  loading: true,
  login: async () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('alykul_token');
    if (stored) {
      api.getMe(stored)
        .then(u => { setUser(u); setToken(stored); })
        .catch(() => localStorage.removeItem('alykul_token'))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (newToken: string) => {
    localStorage.setItem('alykul_token', newToken);
    setToken(newToken);
    const u = await api.getMe(newToken);
    setUser(u);
  };

  const logout = () => {
    localStorage.removeItem('alykul_token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
