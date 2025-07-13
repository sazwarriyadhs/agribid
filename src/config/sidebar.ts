
import type { LucideIcon } from 'lucide-react';
import { LayoutDashboard, Users, Package, Gavel, Handshake, Plane, FilePlus, ShieldCheck, BookUser, Search, Banknote, LineChart, Truck } from 'lucide-react';

export type Role = "seller" | "buyer" | "admin" | "vendor" | "exporter";

export interface NavItem {
  name: string;
  path: string;
  icon: LucideIcon;
  labelKey?: string;
}

export const sidebarByRole: Record<Role, NavItem[]> = {
  seller: [ 
    { name: "Dashboard", path: "/dashboard/seller", icon: LayoutDashboard, labelKey: 'dashboard' },
    { name: "Create New Auction", path: "/sell", icon: FilePlus, labelKey: 'create_new_auction' },
  ],
  buyer: [
    { name: "Dashboard", path: "/dashboard/buyer", icon: LayoutDashboard, labelKey: 'dashboard' },
    { name: "Active Auctions", path: "/", icon: Search, labelKey: 'auctions' },
    { name: "My Bids", path: "/dashboard/buyer", icon: Gavel, labelKey: 'my_bids' },
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
  "pengolah hasil hutan": "Dashboard Kehutanan",
  eksportir: "Dashboard Ekspor",
  mitra: "Dashboard Vendor",
  buyer: "Dashboard Pembeli",
  default: "Dashboard"
};

    
