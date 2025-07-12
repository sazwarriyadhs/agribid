import type { LucideIcon } from 'lucide-react';
import { LayoutDashboard, Users, Package, Gavel, Handshake, Plane, BarChart2, FilePlus, Bell, ShieldCheck, UploadCloud, BookUser } from 'lucide-react';

export type Role = "producer" | "bidder" | "admin" | "partner" | "exporter";

export interface NavItem {
  name: string;
  path: string;
  icon: LucideIcon;
  labelKey?: string;
}

export const sidebarByRole: Record<Role, NavItem[]> = {
  producer: [ 
    { name: "Dashboard", path: "/dashboard/producer", icon: LayoutDashboard, labelKey: 'dashboard' },
    { name: "Create New Auction", path: "/sell", icon: FilePlus, labelKey: 'create_new_auction' },
    { name: "My Products", path: "/dashboard/producer", icon: Package, labelKey: 'my_products' },
  ],
  bidder: [
    { name: "Dashboard", path: "/dashboard/bidder", icon: LayoutDashboard, labelKey: 'dashboard' },
    { name: "Active Auctions", path: "/#featured-auctions", icon: Gavel, labelKey: 'auctions' },
    { name: "My Bids", path: "/dashboard/bidder", icon: BarChart2, labelKey: 'my_bids' },
  ],
  admin: [
    { name: "Overview", path: "/dashboard/admin", icon: LayoutDashboard, labelKey: 'admin_dashboard_title' },
    { name: "Product Verification", path: "/dashboard/admin", icon: ShieldCheck, labelKey: 'pending_product_verifications' },
    { name: "User Management", path: "/dashboard/admin", icon: Users, labelKey: 'user_management' },
  ],
  partner: [
      { name: "Dashboard", path: "/dashboard/partner", icon: LayoutDashboard, labelKey: 'dashboard' },
      { name: "Verification Requests", path: "/dashboard/partner", icon: Handshake, labelKey: 'producer_verification_requests' },
  ],
  exporter: [
      { name: "Dashboard", path: "/dashboard/exporter", icon: LayoutDashboard, labelKey: 'dashboard' },
      { name: "My Shipments", path: "/dashboard/exporter", icon: Plane, labelKey: 'my_shipments' },
      { name: "Mentored Producers", path: "/dashboard/exporter", icon: BookUser, labelKey: 'mentored_producers_title' },
      { name: "Upload Documents", path: "/export-partner", icon: UploadCloud, labelKey: 'upload_documents' },
  ]
};
