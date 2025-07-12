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
  login: (email: string) => Role | null;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string): Role | null => {
    let role: Role = 'buyer'; // Default role
    const emailPrefix = email.split('@')[0];
    
    // New role mapping based on detailed user types
    const sellerRoles = ['petani', 'nelayan', 'peternak', 'peladang', 'pengolah hasil hutan'];
    if (sellerRoles.includes(emailPrefix)) {
        role = 'seller';
    } else if (emailPrefix === 'admin') {
        role = 'admin';
    } else if (emailPrefix === 'mitra') {
        role = 'vendor';
    } else if (emailPrefix === 'ekportir') {
        role = 'exporter';
    } else if (emailPrefix === 'buyer') {
        role = 'buyer';
    } else if (email.startsWith('producer@')) { // Keep old ones for fallback
        role = 'seller';
    } else if (email.startsWith('bidder@')) {
        role = 'buyer';
    } else if (email.startsWith('partner@')) {
        role = 'vendor';
    } else if (email.startsWith('exporter@')) {
        role = 'exporter';
    }

    const mockUser: User = {
      id: 'usr_123',
      name: email.split('@')[0].replace(/^\w/, c => c.toUpperCase()),
      email: email,
      role: role,
    };
    setUser(mockUser);
    return role;
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
