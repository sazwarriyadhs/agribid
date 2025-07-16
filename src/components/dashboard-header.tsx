
'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Bell, User, LogOut, LayoutDashboard, Settings, Globe, ChevronDown, Plane, Contact2 } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, DropdownMenuRadioGroup, DropdownMenuRadioItem } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from "@/hooks/use-toast"
import { useI18n, type Language, type Currency } from '@/context/i18n';
import { useAuth } from '@/context/auth';
import { SidebarTrigger } from './ui/sidebar';
import { AppHeader } from './header';

const notifications = [
    { title: "Outbid!", description: "You've been outbid on 'Organic Wheat Harvest'." },
    { title: "Auction Ending Soon", description: "'Fresh Atlantic Salmon' auction ends in 1 hour." },
    { title: "You Won!", description: "Congratulations! You won the auction for 'Granny Smith Apples'." },
]

export function DashboardHeader() {
  const { toast } = useToast()
  const { t, language, setLanguage, currency, setCurrency } = useI18n();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    toast({
      title: t('logout_success_title'),
      description: t('logout_success_desc'),
    })
  };

  const membershipId = user ? `U-USR-${user.id.replace('usr_', '').slice(0, 4).toUpperCase()}` : '';
  const profileUrl = user ? `/u/${membershipId}/${user.slug}` : '/login';

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center px-4 md:px-6">
        <div className="md:hidden">
            <SidebarTrigger />
        </div>
        
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
                <DropdownMenuRadioGroup value={language} onValueChange={(value) => setLanguage(value as Language)}>
                    <DropdownMenuRadioItem value="id">Bahasa Indonesia (ID)</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="en">English (EN)</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="ar">العربية (AR)</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="zh">中文 (ZH)</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="es">Español (ES)</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="pt">Português (PT)</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="fr">Français (FR)</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="ja">日本語 (JA)</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
                <DropdownMenuSeparator />
                <DropdownMenuLabel>{t('change_currency')}</DropdownMenuLabel>
                <DropdownMenuRadioGroup value={currency} onValueChange={(value) => setCurrency(value as Currency)}>
                    <DropdownMenuRadioItem value="idr">Rupiah (IDR)</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="usd">US Dollar (USD)</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="eur">Euro (EUR)</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="jpy">Japanese Yen (JPY)</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="cny">Chinese Yuan (CNY)</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="brl">Brazilian Real (BRL)</DropdownMenuRadioItem>
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
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={`https://placehold.co/100x100.png?text=${user.name.charAt(0).toUpperCase()}`} alt="User avatar" />
                    <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild><Link href={`/dashboard/${user.role}`}><LayoutDashboard className="mr-2 h-4 w-4" /><span>{t('dashboard')}</span></Link></DropdownMenuItem>
                <DropdownMenuItem asChild><Link href={profileUrl}><Contact2 className="mr-2 h-4 w-4" /><span>{t('profile')}</span></Link></DropdownMenuItem>
                <DropdownMenuItem><Settings className="mr-2 h-4 w-4" /><span>{t('settings')}</span></DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>{t('log_out')}</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
             <AppHeader />
          )}
        </div>
      </div>
    </header>
  );
}
