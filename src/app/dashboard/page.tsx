
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

// This page now acts as a redirector to the default dashboard role.
export default function DashboardRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the default 'bidder' dashboard if someone lands here.
    router.replace('/dashboard/bidder');
  }, [router]);

  return (
    <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
    </div>
  );
}
