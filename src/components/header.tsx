'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AgriBidLogo } from './icons';
import { Button } from '@/components/ui/button';
import { Bell, User, LogOut, LayoutDashboard, Gavel, Settings } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from './ui/separator';
import { useToast } from "@/hooks/use-toast"


const notifications = [
    { title: "Outbid!", description: "You've been outbid on 'Organic Wheat Harvest'." },
    { title: "Auction Ending Soon", description: "'Fresh Atlantic Salmon' auction ends in 1 hour." },
    { title: "You Won!", description: "Congratulations! You won the auction for 'Granny Smith Apples'." },
]

export function AppHeader() {
  // Mock authentication state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { toast } = useToast()

  const handleLoginToggle = () => {
    setIsLoggedIn(!isLoggedIn);
    toast({
      title: isLoggedIn ? "Logged Out" : "Logged In",
      description: isLoggedIn ? "You have successfully logged out." : "Welcome back to AgriBid!",
    })
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center px-4 md:px-6">
        <Link href="/" className="mr-6 flex items-center">
          <AgriBidLogo className="h-8 w-8" />
          <span className="ml-2 text-lg font-bold font-headline">AgriBid</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="#featured-auctions" className="text-muted-foreground transition-colors hover:text-foreground">Auctions</Link>
          <Link href="#" className="text-muted-foreground transition-colors hover:text-foreground">About</Link>
          <Link href="#" className="text-muted-foreground transition-colors hover:text-foreground">Partners</Link>
        </nav>
        <div className="flex flex-1 items-center justify-end gap-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
                <span className="sr-only">Toggle notifications</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
                <div className="grid gap-4">
                    <div className="space-y-2">
                        <h4 className="font-medium leading-none">Notifications</h4>
                        <p className="text-sm text-muted-foreground">
                            You have {notifications.length} unread messages.
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
                <DropdownMenuItem asChild><Link href="/profile"><LayoutDashboard className="mr-2 h-4 w-4" /><span>Profile</span></Link></DropdownMenuItem>
                <DropdownMenuItem><Gavel className="mr-2 h-4 w-4" /><span>My Bids</span></DropdownMenuItem>
                <DropdownMenuItem><Settings className="mr-2 h-4 w-4" /><span>Settings</span></DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLoginToggle}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button asChild variant="ghost">
                <Link href="/login">Log In</Link>
              </Button>
              <Button asChild onClick={handleLoginToggle} className="bg-accent hover:bg-accent/90 text-accent-foreground">
                 <Link href="/signup">Sign Up</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
