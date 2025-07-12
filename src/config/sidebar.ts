import type { LucideIcon } from 'lucide-react';
import { Home, Users, Package, Gavel, Handshake, Plane, BarChart2, UploadCloud, ShieldCheck, FilePlus, FileClock, Bell } from 'lucide-react';

export type Role = "producer" | "bidder" | "admin" | "partner" | "exporter";

export interface NavItem {
  name: string;
  path: string;
  icon: LucideIcon;
  labelKey?: string;
}

export const sidebarByRole: Record<Role, NavItem[]> = {
  producer: [ 
    { name: "Dashboard", path: "/dashboard/producer", icon: Home, labelKey: 'dashboard' },
    { name: "Create New Auction", path: "/sell", icon: FilePlus, labelKey: 'create_new_auction' },
    { name: "Notifications", path: "#", icon: Bell, labelKey: 'notifications' },
  ],
  bidder: [
    { name: "Dashboard", path: "/dashboard/bidder", icon: Home, labelKey: 'dashboard' },
    { name: "Active Auctions", path: "/#featured-auctions", icon: Gavel, labelKey: 'auctions' },
    { name: "My Bids", path: "/dashboard/bidder", icon: BarChart2, labelKey: 'my_bids' },
  ],
  admin: [
    { name: "Product Verification", path: "/dashboard/admin", icon: ShieldCheck, labelKey: 'pending_product_verifications' },
    { name: "User Management", path: "/dashboard/admin", icon: Users, labelKey: 'user_management' },
    { name: "Auction Management", path: "/dashboard/admin", icon: Gavel, labelKey: 'active_auctions' },
  ],
  partner: [
      { name: "Verification Requests", path: "/dashboard/partner", icon: Handshake, labelKey: 'producer_verification_requests' },
      { name: "Mentoring Schedule", path: "/dashboard/partner", icon: Gavel, labelKey: 'mentoring_schedule' },
  ],
  exporter: [
      { name: "My Shipments", path: "/dashboard/exporter", icon: Plane, labelKey: 'my_shipments' },
      { name: "Upload Documents", path: "/export-partner", icon: UploadCloud, labelKey: 'upload_documents' },
  ]
};
