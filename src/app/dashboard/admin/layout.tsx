
'use client';

// This file is intentionally kept, but the logic is now in /dashboard/layout.tsx
// to allow for role-specific sidebars. The content of this file is now just a pass-through.
export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
