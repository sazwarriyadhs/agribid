
'use client';

import {
  Sidebar as SidebarComponent,
  SidebarContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuItem,
  SidebarGroupLabel,
  SidebarProvider,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { useI18n } from '@/context/i18n';
import { AgriBidLogo } from '@/components/icons';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/auth';
import { sidebarByRole, NavItem } from '@/config/sidebar';
import type { Role } from '@/config/sidebar';
import { DashboardHeader } from '@/components/dashboard-header';

function Sidebar() {
    const { t } = useI18n();
    const pathname = usePathname();
    const { user } = useAuth();
    
    // Default to 'buyer' if no user is logged in, or if the role is not in the config.
    const role: Role = (user?.role && user.role in sidebarByRole) ? user.role : 'buyer';
    const menuItems = sidebarByRole[role] || [];

    const getRoleTitle = (role: Role) => {
        const key = `role_${role}`;
        return t(key, role.charAt(0).toUpperCase() + role.slice(1));
    }

    return (
        <SidebarComponent>
            <SidebarHeader>
                 <Link href="/" className="flex items-center justify-center p-2">
                    <AgriBidLogo className="h-10" />
                </Link>
            </SidebarHeader>
            <SidebarContent>
                <SidebarMenu>
                    <SidebarGroupLabel>{getRoleTitle(role)} {t('navigation')}</SidebarGroupLabel>
                    {menuItems.map((item: NavItem) => {
                        const label = t(item.labelKey || item.name.toLowerCase().replace(/ /g, '_'), item.name);
                        
                        let isActive = false;
                        if (item.path === `/dashboard/${role}`) {
                            isActive = pathname === item.path;
                        } else if (item.path === '/') {
                             // The root path '/' is a special case for the buyer's "Active Auctions" link.
                             // It should only be active if the pathname is exactly '/'
                            isActive = pathname === item.path;
                        } else {
                            isActive = pathname.startsWith(item.path);
                        }

                        const uniqueKey = `${item.path}-${item.labelKey || item.name}`;

                        return (
                         <SidebarMenuItem key={uniqueKey}>
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
        </SidebarComponent>
    )
}


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <SidebarProvider>
        <div className="flex min-h-screen bg-background">
            <Sidebar />
            <SidebarInset>
                <DashboardHeader />
                <main className="flex-1 space-y-8 p-4 md:p-8 pt-6">
                    {children}
                </main>
            </SidebarInset>
        </div>
    </SidebarProvider>
  );
}
