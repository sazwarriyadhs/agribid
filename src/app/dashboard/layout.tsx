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


function DashboardSidebar() {
    const { t } = useI18n();
    const pathname = usePathname();
    const { user } = useAuth();
    
    // Use the role from auth context, fallback to detecting from URL if not logged in, default to 'bidder'
    const roleFromAuth = user?.role;
    const pathSegments = pathname.split('/');
    const roleFromUrl = pathSegments[2] as keyof typeof sidebarByRole;
    
    const role = roleFromAuth || (roleFromUrl in sidebarByRole ? roleFromUrl : 'bidder');
    
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
                        const isActive = pathname === item.path || (item.path !== '/' && pathname.startsWith(item.path));
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
  return (
    <SidebarProvider>
        <div className="flex">
            <DashboardSidebar />
            <SidebarInset>
                <div className="flex-1 space-y-8 p-4 md:p-8 pt-6">
                    {children}
                </div>
            </SidebarInset>
        </div>
    </SidebarProvider>
  );
}