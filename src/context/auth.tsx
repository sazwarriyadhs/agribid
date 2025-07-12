'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { Role } from '@/config/sidebar';

interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
}

interface AuthContextType {
  user: User | null;
  login: (email: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string) => {
    // This is a mock login function. In a real app, you would validate credentials
    // with a backend and the backend would return the user's data including their role.

    // Determine role from email for this demo
    let role: Role = 'bidder'; // Default role
    if (email.startsWith('producer@')) role = 'producer';
    else if (email.startsWith('admin@')) role = 'admin';
    else if (email.startsWith('partner@')) role = 'partner';
    else if (email.startsWith('exporter@')) role = 'exporter';

    // Mock user data based on role
    const mockUser: User = {
      id: 'usr_123',
      name: email.split('@')[0].replace(/^\w/, c => c.toUpperCase()),
      email: email,
      role: role,
    };
    setUser(mockUser);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
