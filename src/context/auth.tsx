
'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { Role } from '@/config/sidebar';

interface User {
  id: string;
  name: string; // Will store the specific role, e.g., 'petani', 'buyer'
  email: string;
  role: Role; // Will store the abstract role, e.g., 'seller', 'buyer'
}

interface AuthContextType {
  user: User | null;
  login: (email: string) => User | null;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string): User | null => {
    let role: Role = 'buyer'; // Default role
    const emailPrefix = email.split('@')[0].toLowerCase();
    
    const sellerRoles = ['petani', 'nelayan', 'peternak', 'peladang', 'pengolah hasil hutan', 'producer', 'seller'];
    if (sellerRoles.includes(emailPrefix)) {
        role = 'seller';
    } else if (emailPrefix === 'admin') {
        role = 'admin';
    } else if (['mitra', 'partner', 'vendor'].includes(emailPrefix)) {
        role = 'vendor';
    } else if (['eksportir', 'exporter'].includes(emailPrefix)) {
        role = 'exporter';
    } else if (['buyer', 'bidder'].includes(emailPrefix)) {
        role = 'buyer';
    } else {
        // If no specific role matches, we can't create a user.
        // Or default to 'buyer'. Let's default.
        role = 'buyer';
    }

    const mockUser: User = {
      id: `usr_${Math.random().toString(36).substring(2, 9)}`,
      name: emailPrefix, // Use email prefix as the specific role name and slug
      email: email,
      role: role,
    };
    setUser(mockUser);
    return mockUser;
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
