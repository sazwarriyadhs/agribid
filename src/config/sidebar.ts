
import type { LucideIcon } from 'lucide-react';
import { LayoutDashboard, Users, Package, Gavel, Handshake, Plane, FilePlus, ShieldCheck, BookUser, Search, Banknote, LineChart, Truck, ShoppingCart, Globe } from 'lucide-react';
import type { Role } from '@/lib/roles';

export type GeneralRole = 'seller' | 'buyer' | 'admin' | 'vendor' | 'exporter' | 'international_buyer';

export interface NavItem {
  name: string;
  path: string;
  icon: LucideIcon;
  labelKey?: string;
}

export const sidebarByRole: Record<GeneralRole, NavItem[]> = {
  seller: [ 
    { name: "Dashboard", path: "/dashboard/seller", icon: LayoutDashboard, labelKey: 'dashboard' },
    { name: "Create New Auction", path: "/sell", icon: FilePlus, labelKey: 'create_new_auction' },
  ],
  buyer: [
    { name: "Dashboard", path: "/dashboard/buyer", icon: LayoutDashboard, labelKey: 'dashboard' },
    { name: "Active Auctions", path: "/dashboard/auctions", icon: Search, labelKey: 'auctions' },
    { name: "My Orders", path: "/dashboard/buyer", icon: ShoppingCart, labelKey: 'my_orders_title' },
  ],
  international_buyer: [
    { name: "Dashboard", path: "/dashboard/international-buyer", icon: LayoutDashboard, labelKey: 'dashboard' },
    { name: "Browse Commodities", path: "/dashboard/auctions", icon: Search, labelKey: 'browse_export_commodities' },
    { name: "Post a Request", path: "/dashboard/international-buyer/post-request", icon: FilePlus, labelKey: 'post_request_title' },
    { name: "My Imports", path: "/dashboard/international-buyer#my-imports", icon: Plane, labelKey: 'my_imports_title' },
  ],
  admin: [
    { name: "Overview", path: "/dashboard/admin", icon: LayoutDashboard, labelKey: 'admin_dashboard_title' },
    { name: "Financial Reports", path: "/dashboard/admin#financial-reports", icon: LineChart, labelKey: 'financial_reports' },
    { name: "Payments", path: "/dashboard/admin#payment-management", icon: Banknote, labelKey: 'payments' },
    { name: "Product Verification", path: "/dashboard/admin", icon: ShieldCheck, labelKey: 'pending_product_verifications' },
    { name: "User Management", path: "/dashboard/admin", icon: Users, labelKey: 'user_management' },
  ],
  vendor: [
      { name: "Dashboard", path: "/dashboard/vendor", icon: LayoutDashboard, labelKey: 'dashboard' },
      { name: "Shipping Orders", path: "/dashboard/vendor", icon: Truck, labelKey: 'shipping_orders_title' },
  ],
  exporter: [
      { name: "Dashboard", path: "/dashboard/exporter", icon: LayoutDashboard, labelKey: 'dashboard' },
      { name: "My Shipments", path: "/dashboard/exporter", icon: Plane, labelKey: 'my_shipments' },
      { name: "Mentored Producers", path: "/dashboard/exporter", icon: BookUser, labelKey: 'mentored_producers_title' },
  ]
};

export const dashboardLabel: { [key: string]: string } = {
  admin: "Dashboard Admin",
  petani: "Dashboard Petani",
  nelayan: "Dashboard Nelayan",
  peternak: "Dashboard Peternak",
  peladang: "Dashboard Peladang",
  pengolah: "Dashboard Pengolah",
  "pengolah hasil hutan": "Dashboard Kehutanan",
  eksportir: "Dashboard Ekspor",
  mitra: "Dashboard Vendor",
  vendor: "Dashboard Vendor",
  producer: "Dashboard Produsen",
  seller: "Dashboard Penjual",
  buyer: "Dashboard Pembeli",
  international_buyer: "International Buyer Dashboard",
  pelaku_usaha: "Dashboard Pelaku Usaha",
  klien: "Dashboard Klien",
  default: "Dashboard"
};

export const roleToDashboardMap: Record<Role, string> = {
    admin: '/dashboard/admin',
    petani: '/dashboard/seller',
    nelayan: '/dashboard/seller',
    peternak: '/dashboard/seller',
    peladang: '/dashboard/seller',
    pengolah: '/dashboard/seller',
    seller: '/dashboard/seller',
    producer: '/dashboard/seller',
    buyer: '/dashboard/buyer',
    international_buyer: '/dashboard/international-buyer',
    pelaku_usaha: '/dashboard/buyer',
    bidder: '/dashboard/buyer', // legacy
    eksportir: '/dashboard/exporter',
    exporter: '/dashboard/exporter',
    mitra: '/dashboard/vendor',
    vendor: '/dashboard/vendor',
    partner: '/dashboard/vendor', // legacy
    klien: '/dashboard/buyer', // default for now
};

export const roleToGeneralRoleMap: Record<Role, GeneralRole> = {
  admin: 'admin',
  petani: 'seller',
  nelayan: 'seller',
  peternak: 'seller',
  peladang: 'seller',
  pengolah: 'seller',
  producer: 'seller',
  seller: 'seller',
  buyer: 'buyer',
  international_buyer: 'international_buyer',
  pelaku_usaha: 'buyer',
  bidder: 'buyer', // legacy
  klien: 'buyer',
  eksportir: 'exporter',
  exporter: 'exporter',
  mitra: 'vendor',
  vendor: 'vendor',
  partner: 'vendor', // legacy
};
