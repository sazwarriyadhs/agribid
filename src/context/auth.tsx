
'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { allowedRoles, type Role } from '@/lib/roles';
import { roleToGeneralRoleMap } from '@/config/sidebar';

interface User {
  id: string;
  name: string; // Will store the specific role, e.g., 'petani', 'buyer'
  email: string;
  role: Role; // Will store the abstract role, e.g., 'seller', 'buyer'
  verified: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password?: string) => User | null;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, password?: string): User | null => {
    // For demo purposes, we allow QR login to bypass password check
    if (password && password !== 'password') {
        return null;
    }
      
    const emailPrefix = email.split('@')[0].toLowerCase();

    // Check if the role from email is valid
    if (!allowedRoles.includes(emailPrefix as Role)) {
        return null;
    }
    
    const generalRole = roleToGeneralRoleMap[emailPrefix as Role];
    if (!generalRole) return null;

    // Simulate verification status based on role
    const sellerRoles: Role[] = ['petani', 'nelayan', 'peternak', 'peladang', 'pengolah', 'producer', 'seller'];
    const adminRoles: Role[] = ['admin'];
    const vendorRoles: Role[] = ['mitra', 'partner', 'vendor'];
    const exporterRoles: Role[] = ['eksportir', 'exporter'];
    
    const isVerified = 
        sellerRoles.includes(emailPrefix as Role) ||
        adminRoles.includes(emailPrefix as Role) ||
        vendorRoles.includes(emailPrefix as Role) ||
        exporterRoles.includes(emailPrefix as Role);


    const mockUser: User = {
      id: `usr_${Math.random().toString(36).substring(2, 9)}`,
      name: emailPrefix, // Use email prefix as the specific role name and slug
      email: email,
      role: emailPrefix as Role, // The specific role
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
