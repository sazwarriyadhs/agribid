
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AgriBidLogo } from './icons';
import { Button } from '@/components/ui/button';
import { Bell, User, LogOut, LayoutDashboard, Settings, Globe, ChevronDown, Plane } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, DropdownMenuRadioGroup, DropdownMenuRadioItem } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from "@/hooks/use-toast"
import { useI18n } from '@/context/i18n';

const notifications = [
    { title: "Outbid!", description: "You've been outbid on 'Organic Wheat Harvest'." },
    { title: "Auction Ending Soon", description: "'Fresh Atlantic Salmon' auction ends in 1 hour." },
    { title: "You Won!", description: "Congratulations! You won the auction for 'Granny Smith Apples'." },
]

export function AppHeader() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // This would be managed by a global auth context in a real app
  const { toast } = useToast()
  const { t, language, setLanguage, currency, setCurrency } = useI18n();

  const handleLogout = () => {
    setIsLoggedIn(false);
    toast({
      title: t('logout_success_title'),
      description: t('logout_success_desc'),
    })
  };

  // This is a simulation function. It's triggered by the login button for demo purposes.
  // In a real app, the login page would set the auth state.
  const handleLogin = () => {
    setIsLoggedIn(true);
  };


  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center px-4 md:px-6">
        <Link href="/" className="mr-6 flex items-center">
          <AgriBidLogo className="h-10" />
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="/#featured-auctions" className="text-muted-foreground transition-colors hover:text-foreground">{t('auctions')}</Link>
          <Link href="/export-partner" className="text-muted-foreground transition-colors hover:text-foreground flex items-center gap-2">
            <Plane className="h-4 w-4"/> {t('export')}
          </Link>
          <Link href="#" className="text-muted-foreground transition-colors hover:text-foreground">{t('about')}</Link>
          <Link href="#" className="text-muted-foreground transition-colors hover:text-foreground">{t('partners')}</Link>
        </nav>
        <div className="flex flex-1 items-center justify-end gap-2">
           <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-1">
                  <Globe className="h-4 w-4" />
                  <span className="hidden sm:inline">{language.toUpperCase()} / {currency.toUpperCase()}</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuLabel>{t('change_language')}</DropdownMenuLabel>
                <DropdownMenuRadioGroup value={language} onValueChange={(value) => setLanguage(value as 'id' | 'en')}>
                    <DropdownMenuRadioItem value="id">Bahasa Indonesia (ID)</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="en">English (EN)</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
                <DropdownMenuSeparator />
                <DropdownMenuLabel>{t('change_currency')}</DropdownMenuLabel>
                <DropdownMenuRadioGroup value={currency} onValueChange={(value) => setCurrency(value as 'idr' | 'usd')}>
                    <DropdownMenuRadioItem value="idr">Rupiah (IDR)</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="usd">US Dollar (USD)</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
                <span className="sr-only">{t('toggle_notifications')}</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
                <div className="grid gap-4">
                    <div className="space-y-2">
                        <h4 className="font-medium leading-none">{t('notifications')}</h4>
                        <p className="text-sm text-muted-foreground">
                            {t('unread_messages', { count: notifications.length })}
                        </p>
                    </div>
                    <div className="grid gap-2">
                        {notifications.map((n, i) => (
                             <div key={i} className="grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
                                <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                                <div className="grid gap-1">
                                    <p className="text-sm font-medium">{n.title}</p>
                                    <p className="text-sm text-muted-foreground">{n.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </PopoverContent>
          </Popover>
          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="https://placehold.co/100x100.png" alt="User avatar" />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">John Farmer</p>
                    <p className="text-xs leading-none text-muted-foreground">john.farmer@email.com</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild><Link href="/dashboard/bidder"><LayoutDashboard className="mr-2 h-4 w-4" /><span>{t('dashboard')}</span></Link></DropdownMenuItem>
                <DropdownMenuItem asChild><Link href="/u/P001/jessica-sutrisno"><User className="mr-2 h-4 w-4" /><span>{t('profile')}</span></Link></DropdownMenuItem>
                <DropdownMenuItem><Settings className="mr-2 h-4 w-4" /><span>{t('settings')}</span></DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>{t('log_out')}</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button asChild variant="outline">
                <Link href="/login">{t('log_in')}</Link>
              </Button>
              <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
                 <Link href="/signup">{t('sign_up')}</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
