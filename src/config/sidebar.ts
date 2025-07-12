import type { LucideIcon } from 'lucide-react';
import { LayoutDashboard, Users, Package, Gavel, Handshake, Plane, BarChart2, FilePlus, ShieldCheck, BookUser, Building, Tractor, DollarSign, Search } from 'lucide-react';

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
    { name: "Active Auctions", path: "/#featured-auctions", icon: Search, labelKey: 'auctions' },
    { name: "My Bids", path: "/dashboard/buyer", icon: Gavel, labelKey: 'my_bids' },
  ],
  admin: [
    { name: "Overview", path: "/dashboard/admin", icon: LayoutDashboard, labelKey: 'admin_dashboard_title' },
    { name: "Product Verification", path: "/dashboard/admin", icon: ShieldCheck, labelKey: 'pending_product_verifications' },
    { name: "User Management", path: "/dashboard/admin", icon: Users, labelKey: 'user_management' },
  ],
  vendor: [
      { name: "Dashboard", path: "/dashboard/vendor", icon: LayoutDashboard, labelKey: 'dashboard' },
      { name: "Verification Requests", path: "/dashboard/vendor", icon: Handshake, labelKey: 'producer_verification_requests' },
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
