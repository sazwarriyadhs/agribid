
'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroupLabel,
  SidebarProvider,
} from '@/components/ui/sidebar';
import { useI18n } from '@/context/i18n';
import { AgriBidLogo } from '@/components/icons';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/auth';
import { sidebarByRole, NavItem } from '@/config/sidebar';
import { Users, ShieldCheck, Gavel } from 'lucide-react';


function AdminSidebar() {
    const { t } = useI18n();
    const pathname = usePathname();
    const menuItems = sidebarByRole.admin;

    return (
        <Sidebar>
            <SidebarHeader>
                <Link href="/" className="flex items-center justify-center p-2">
                    <AgriBidLogo className="h-10" />
                </Link>
            </SidebarHeader>
            <SidebarContent>
                <SidebarMenu>
                    <SidebarGroupLabel>{t('admin_dashboard_title', 'Admin Menu')}</SidebarGroupLabel>
                    {menuItems.map((item: NavItem) => {
                        const label = t(item.labelKey || item.name.toLowerCase().replace(/ /g, '_'), item.name);
                        const isActive = pathname === item.path;
                        return (
                            <SidebarMenuItem key={item.path}>
                                <SidebarMenuButton 
                                    asChild
                                    isActive={isActive} 
                                    tooltip={{children: label}}
                                >
                                    <Link href={item.path}>
                                        <item.icon />
                                        <span>{label}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        )
                    })}
                </SidebarMenu>
            </SidebarContent>
        </Sidebar>
    );
}

function DefaultSidebar() {
    const { t } = useI18n();
    const pathname = usePathname();
    const { user } = useAuth();
    
    // Default to 'bidder' if no user is logged in, or if the role is not in the config.
    const role = (user?.role && user.role in sidebarByRole) ? user.role : 'bidder';
    const menuItems = sidebarByRole[role] || sidebarByRole['bidder'];

    return (
        <Sidebar>
            <SidebarHeader>
                 <Link href="/" className="flex items-center justify-center p-2">
                    <AgriBidLogo className="h-10" />
                </Link>
            </SidebarHeader>
            <SidebarContent>
                <SidebarMenu>
                    <SidebarGroupLabel>{t('navigation')}</SidebarGroupLabel>
                    {menuItems.map((item: NavItem) => {
                        const label = t(item.labelKey || item.name.toLowerCase().replace(/ /g, '_'), item.name);
                        const isActive = pathname === item.path || (item.path !== '/dashboard' && pathname.startsWith(item.path));
                        return (
                         <SidebarMenuItem key={item.path}>
                             <SidebarMenuButton 
                                asChild
                                isActive={isActive} 
                                tooltip={{children: label}}
                            >
                                 <Link href={item.path}>
                                    <item.icon />
                                    <span>{label}</span>
                                </Link>
                             </SidebarMenuButton>
                         </SidebarMenuItem>
                    )})}
                </SidebarMenu>
            </SidebarContent>
        </Sidebar>
    )
}


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();

  return (
    <SidebarProvider>
        <div className="flex">
            {/* DYNAMIC LAYOUT: Show a different sidebar for admins */}
            {user?.role === 'admin' ? <AdminSidebar /> : <DefaultSidebar />}
            
            <SidebarInset>
                <div className="flex-1 space-y-8 p-4 md:p-8 pt-6">
                    {children}
                </div>
            </SidebarInset>
        </div>
    </SidebarProvider>
  );
}
