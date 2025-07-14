
'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { Role } from '@/config/sidebar';

interface User {
  id: string;
  name: string; // Will store the specific role, e.g., 'petani', 'buyer'
  email: string;
  role: Role; // Will store the abstract role, e.g., 'seller', 'buyer'
  verified: boolean;
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
    const adminRoles = ['admin'];
    const vendorRoles = ['mitra', 'partner', 'vendor'];
    const exporterRoles = ['eksportir', 'exporter'];
    const buyerRoles = ['buyer', 'bidder'];
    
    let isVerified = false;

    if (sellerRoles.includes(emailPrefix)) {
        role = 'seller';
        isVerified = false;
    } else if (adminRoles.includes(emailPrefix)) {
        role = 'admin';
        isVerified = true;
    } else if (vendorRoles.includes(emailPrefix)) {
        role = 'vendor';
        isVerified = true;
    } else if (exporterRoles.includes(emailPrefix)) {
        role = 'exporter';
        isVerified = true;
    } else if (buyerRoles.includes(emailPrefix)) {
        role = 'buyer';
        isVerified = false;
    } else {
        role = 'buyer';
        isVerified = false;
    }

    const mockUser: User = {
      id: `usr_${Math.random().toString(36).substring(2, 9)}`,
      name: emailPrefix, // Use email prefix as the specific role name and slug
      email: email,
      role: role,
      verified: isVerified,
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
