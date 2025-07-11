
'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuLabel,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';
import { useI18n } from '@/context/i18n';
import { AgriBidLogo } from '@/components/icons';
import { Home, Users, Package, Gavel, Settings, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const menuItems = [
    { href: "/dashboard/admin", label: "dashboard", icon: Home },
    { href: "/dashboard/admin/users", label: "user_management", icon: Users },
    { href: "/dashboard/admin/products", label: "pending_product_verifications", icon: Package },
    { href: "/dashboard/admin/auctions", label: "active_auctions", icon: Gavel },
    { href: "/dashboard/admin/settings", label: "settings", icon: Settings }
];


function AdminSidebar() {
    const { t } = useI18n();
    const pathname = usePathname();
    const { state, setOpen } = useSidebar();
    
    const isExpanded = state === 'expanded';

    return (
        <Sidebar>
            <SidebarHeader>
                 <div className="flex items-center justify-between">
                    {isExpanded && <AgriBidLogo className="h-10" />}
                     <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => setOpen(!isExpanded)} 
                        className="text-muted-foreground"
                    >
                       {isExpanded ? <ChevronLeft /> : <ChevronRight />} 
                    </Button>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarMenu>
                    <SidebarMenuLabel>{t('navigation')}</SidebarMenuLabel>
                    {menuItems.map(item => (
                         <SidebarMenuItem key={item.href}>
                             <SidebarMenuButton 
                                asChild
                                isActive={pathname === item.href} 
                                tooltip={{children: t(item.label as any)}}
                            >
                                 <Link href={item.href}>
                                    <item.icon />
                                    <span>{t(item.label as any)}</span>
                                </Link>
                             </SidebarMenuButton>
                         </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarContent>
        </Sidebar>
    )
}


export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
        <div className="flex">
            <AdminSidebar />
            <SidebarInset>
                {children}
            </SidebarInset>
        </div>
    </SidebarProvider>
  );
}
