
'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { Role } from '@/lib/roles';

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
    
    const sellerRoles: Role[] = ['petani', 'nelayan', 'peternak', 'peladang', 'pengolah', 'producer', 'seller'];
    const adminRoles: Role[] = ['admin'];
    const vendorRoles: Role[] = ['mitra', 'partner', 'vendor'];
    const exporterRoles: Role[] = ['eksportir', 'exporter'];
    const buyerRoles: Role[] = ['buyer', 'bidder', 'pelaku_usaha'];
    
    let isVerified = false;

    if (sellerRoles.includes(emailPrefix as Role)) {
        role = emailPrefix as Role;
        isVerified = true;
    } else if (adminRoles.includes(emailPrefix as Role)) {
        role = 'admin';
        isVerified = true;
    } else if (vendorRoles.includes(emailPrefix as Role)) {
        role = 'vendor';
        isVerified = true;
    } else if (exporterRoles.includes(emailPrefix as Role)) {
        role = 'exporter';
        isVerified = true;
    } else if (buyerRoles.includes(emailPrefix as Role)) {
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
