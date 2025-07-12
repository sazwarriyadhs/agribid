
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
import { Home, Users, Package, Gavel, Handshake, Plane, BarChart2, UploadCloud, ShieldCheck, FilePlus, FileClock, Bell } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { LucideIcon } from 'lucide-react';

interface NavItem {
  name: string;
  path: string;
  icon: LucideIcon;
  labelKey?: keyof ReturnType<typeof useI18n>['t'] | string;
}

const sidebarByRole: Record<string, NavItem[]> = {
  producer: [ // Mapped from 'seller'
    { name: "Dashboard", path: "/dashboard/producer", icon: Home, labelKey: 'dashboard' },
    { name: "Unggah Produk", path: "/sell", icon: FilePlus, labelKey: 'create_new_auction' },
    { name: "Riwayat Produk", path: "/dashboard/producer", icon: FileClock, labelKey: 'my_products' },
    { name: "Notifikasi", path: "#", icon: Bell, labelKey: 'notifications' },
  ],
  bidder: [ // Mapped from 'buyer'
    { name: "Dashboard", path: "/dashboard/bidder", icon: Home, labelKey: 'dashboard' },
    { name: "Lelang Aktif", path: "/#featured-auctions", icon: Gavel, labelKey: 'auctions' },
    { name: "Penawaran Saya", path: "/dashboard/bidder", icon: BarChart2, labelKey: 'my_bids' },
  ],
  admin: [
    { name: "Verifikasi Produk", path: "/dashboard/admin", icon: ShieldCheck, labelKey: 'pending_product_verifications' },
    { name: "Kelola User", path: "/dashboard/admin", icon: Users, labelKey: 'user_management' },
    { name: "Kelola Lelang", path: "/dashboard/admin", icon: Gavel, labelKey: 'active_auctions' },
  ],
  partner: [
      { name: "Permintaan Verifikasi", path: "/dashboard/partner", icon: Handshake, labelKey: 'producer_verification_requests' },
      { name: "Jadwal Mentoring", path: "/dashboard/partner", icon: Gavel, labelKey: 'mentoring_schedule' },
  ],
  exporter: [
      { name: "Pengiriman Saya", path: "/dashboard/exporter", icon: Plane, labelKey: 'my_shipments' },
      { name: "Unggah Dokumen", path: "/export-partner", icon: UploadCloud, labelKey: 'upload_documents' },
  ]
};


function DashboardSidebar() {
    const { t } = useI18n();
    const pathname = usePathname();
    
    const pathSegments = pathname.split('/');
    const role = pathSegments[2] in sidebarByRole ? pathSegments[2] : 'bidder';
    // Fallback to bidder if role not found
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
                    {menuItems.map(item => {
                        const label = t(item.labelKey || item.name.toLowerCase().replace(/ /g, '_'), item.name);
                        return (
                         <SidebarMenuItem key={item.path}>
                             <SidebarMenuButton 
                                asChild
                                isActive={pathname === item.path} 
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
