import React, { createContext, useContext, useEffect, useState } from 'react';

type User = { id: number; email: string; firstName?: string; lastName?: string; companyId?: number | null } | null;

type AuthContextValue = {
  user: User;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, firstName?: string, lastName?: string, company?: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const STORAGE_KEY = 'easybid_auth_v1';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw);
      if (parsed?.token && parsed?.expiry && Date.now() < parsed.expiry) {
        setToken(parsed.token);
        setUser(parsed.user || null);
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch (e) {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  const persist = (token: string, user: User, ttlMs = 60 * 60 * 1000) => {
    const expiry = Date.now() + ttlMs;
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ token, user, expiry }));
  };

  const login = async (email: string, password: string) => {
    const res = await fetch('/api/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) throw new Error('Invalid credentials');
    const data = await res.json();
    setToken(data.token);
    // normalize user shape to include companyId
    const u = { ...data.user, companyId: data.user?.companyId ?? null };
    setUser(u);
    persist(data.token, u, 60 * 60 * 1000);
  };

  const signup = async (email: string, password: string, firstName?: string, lastName?: string, company?: string) => {
    const res = await fetch('/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, firstName, lastName, company }),
    });
    if (!res.ok) throw new Error('Signup failed');
    const data = await res.json();
    setToken(data.token);
    const u = { ...data.user, companyId: data.user?.companyId ?? null };
    setUser(u);
    persist(data.token, u, 60 * 60 * 1000);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
