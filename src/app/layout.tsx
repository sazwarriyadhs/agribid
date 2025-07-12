'use client';

import { useState, useEffect } from 'react';
import type { Metadata } from 'next';
import './globals.css';
import { AppHeader } from '@/components/header';
import { AppFooter } from '@/components/footer';
import { Toaster } from "@/components/ui/toaster";
import { I18nProvider } from '@/context/i18n';
import { AuthProvider } from '@/context/auth';
import { SplashScreen } from '@/components/splash-screen';

/*
export const metadata: Metadata = {
  title: 'AgriBid - The Agricultural Marketplace',
  description: 'A digital marketplace for farmers, ranchers, and businesses to trade agricultural goods.',
};
*/

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 4000); // Show splash screen for 4 seconds
    return () => clearTimeout(timer);
  }, []);

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>AgriBid - The Agricultural Marketplace</title>
        <meta name="description" content="A digital marketplace for farmers, ranchers, and businesses to trade agricultural goods." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        {loading ? (
          <SplashScreen />
        ) : (
          <AuthProvider>
            <I18nProvider>
              <div className="flex flex-col min-h-screen">
                <AppHeader />
                <main className="flex-grow">{children}</main>
                <AppFooter />
              </div>
              <Toaster />
            </I18nProvider>
          </AuthProvider>
        )}
      </body>
    </html>
  );
}