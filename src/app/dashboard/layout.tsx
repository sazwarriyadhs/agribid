
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
import { Home, Users, Package, Gavel, Settings, Handshake, Plane, BarChart2, List, UploadCloud } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { LucideIcon } from 'lucide-react';

interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

const roleNavigations: Record<string, NavItem[]> = {
  admin: [
    { href: "/dashboard/admin", label: "admin_dashboard_title", icon: Home },
    // { href: "/dashboard/admin/users", label: "user_management", icon: Users },
    // { href: "/dashboard/admin/products", label: "pending_product_verifications", icon: Package },
    // { href: "/dashboard/admin/auctions", label: "active_auctions", icon: Gavel },
    // { href: "/dashboard/admin/settings", label: "settings", icon: Settings }
  ],
  producer: [
      { href: "/dashboard/producer", label: "my_products", icon: Package },
      { href: "/sell", label: "create_new_auction", icon: Gavel },
      // { href: "/dashboard/producer/stats", label: "view_statistics", icon: BarChart2 },
  ],
  bidder: [
      { href: "/dashboard/bidder", label: "bidder_dashboard_title", icon: Gavel },
      // { href: "/dashboard/bidder/history", label: "bid_history", icon: List },
      { href: "/u/B001/john-farmer", label: "profile", icon: Users },
  ],
  partner: [
      { href: "/dashboard/partner", label: "producer_verification_requests", icon: Handshake },
      // { href: "/dashboard/partner/schedule", label: "mentoring_schedule", icon: Gavel },
  ],
  exporter: [
      { href: "/dashboard/exporter", label: "my_shipments", icon: Plane },
      { href: "/export-partner", label: "upload_documents", icon: UploadCloud },
  ]
};


function DashboardSidebar() {
    const { t } = useI18n();
    const pathname = usePathname();
    
    // Determine role from the URL, default to 'bidder' if it's just /dashboard
    const pathSegments = pathname.split('/');
    const role = pathSegments.length > 2 && pathSegments[2] in roleNavigations ? pathSegments[2] : 'bidder';
    const menuItems = roleNavigations[role] || roleNavigations['bidder'];

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
                                isActive={pathname === item.href} 
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
