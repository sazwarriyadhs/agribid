
'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { allowedRoles, type Role } from '@/lib/roles';
import { roleToGeneralRoleMap } from '@/config/sidebar';
import slugify from 'slugify';

interface User {
  id: string;
  name: string; // The display name (full name or company name)
  slug: string; // a slugified version of the name
  email: string;
  role: Role; 
  verified: boolean;
  type: 'individual' | 'company';
  firstName?: string;
  lastName?: string;
  companyName?: string;
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
    
    const isCompany = ['pelaku_usaha', 'buyer', 'klien', 'mitra', 'vendor', 'partner', 'eksportir', 'exporter', 'admin'].includes(emailPrefix);
    const userType = isCompany ? 'company' : 'individual';

    const name = emailPrefix.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    
    const mockUser: User = {
      id: `usr_${Math.random().toString(36).substring(2, 9)}`,
      name: name, 
      slug: slugify(name, { lower: true, strict: true }),
      email: email,
      role: emailPrefix as Role,
      verified: isVerified,
      type: userType,
      ...(userType === 'individual' ? { firstName: name.split(' ')[0], lastName: name.split(' ')[1] || '' } : { companyName: name }),
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
