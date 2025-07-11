
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
import { Home, Users, Package, Gavel, Settings } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const menuItems = [
  { href: "/dashboard/admin", label: "admin_dashboard_title", icon: Home },
  { href: "/dashboard/admin/users", label: "user_management", icon: Users },
  { href: "/dashboard/admin/products", label: "pending_product_verifications", icon: Package },
  { href: "/dashboard/admin/auctions", label: "active_auctions", icon: Gavel },
  { href: "/dashboard/admin/settings", label: "settings", icon: Settings }
];

function AdminSidebar() {
    const { t } = useI18n();
    const pathname = usePathname();

    return (
        <Sidebar>
            <SidebarHeader>
                 <Link href="/" className="flex items-center justify-between p-2">
                    <AgriBidLogo className="h-10" />
                </Link>
            </SidebarHeader>
            <SidebarContent>
                <SidebarMenu>
                    <SidebarGroupLabel>{t('navigation')}</SidebarGroupLabel>
                    {menuItems.map(item => (
                         <SidebarMenuItem key={item.href}>
                             <SidebarMenuButton 
                                asChild
                                isActive={pathname.startsWith(item.href)} 
                                tooltip={{children: t(item.label as any)}}
                            >
                                 <Link href={item.href}>
                                    <item.icon />
                                    <span>{t(item.label as any, item.label)}</span>
                                </Link>
                             </SidebarMenuButton>
                         </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarContent>
        </Sidebar>
    )
}


export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
        <div className="flex">
            <AdminSidebar />
            <SidebarInset>
                <main className="flex-1 space-y-8 p-4 md:p-8 pt-6">
                    {children}
                </main>
            </SidebarInset>
        </div>
    </SidebarProvider>
  );
}
