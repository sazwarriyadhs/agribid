
'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useI18n } from '@/context/i18n';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { QrCode } from 'lucide-react';
import { useState } from 'react';
import { QrScannerDialog } from '@/components/qr-scanner-dialog';
import { useAuth } from '@/context/auth';

const dashboardRedirect: Record<string, string> = {
  admin: "/dashboard/admin",
  petani: "/dashboard/seller",
  nelayan: "/dashboard/seller",
  peternak: "/dashboard/seller",
  peladang: "/dashboard/seller",
  "pengolah hasil hutan": "/dashboard/seller",
  eksportir: "/dashboard/exporter",
  mitra: "/dashboard/vendor",
  buyer: "/dashboard/buyer",
  producer: "/dashboard/seller", // fallback
  bidder: "/dashboard/buyer", // fallback
  partner: "/dashboard/vendor", // fallback
  exporter: "/dashboard/exporter" // fallback
};


export default function LoginPage() {
  const { toast } = useToast();
  const router = useRouter();
  const { t } = useI18n();
  const { login } = useAuth();
  const [isQrScannerOpen, setIsQrScannerOpen] = useState(false);
  const [email, setEmail] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    const userRole = login(email); // login now returns the role
    const emailPrefix = email.split('@')[0];

    const path = dashboardRedirect[emailPrefix] || '/dashboard/buyer';

    toast({
      title: t('login_success_title'),
      description: t('login_success_desc'),
    });
    
    router.push(path);
  };

  const handleQrScanSuccess = (data: string) => {
    console.log('Scanned QR Data:', data);
    try {
        const qrData = JSON.parse(data);
        if (qrData.userId && qrData.name && qrData.code && qrData.slug && qrData.role) {
             const userEmail = `${qrData.role.toLowerCase()}@agribid.com`;
             login(userEmail);
             
             toast({
                title: t('login_success_title'),
                description: `Welcome back, ${qrData.name}!`,
            });
            
            router.push(`/u/${qrData.code}/${qrData.slug}`);
        } else {
            throw new Error('Invalid QR code data');
        }
    } catch (error) {
        toast({
            variant: 'destructive',
            title: 'Login Gagal',
            description: 'Kode QR tidak valid atau kedaluwarsa.',
        });
    }
    setIsQrScannerOpen(false);
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-[calc(100vh-14rem)] bg-background px-4 py-12">
        <Card className="w-full max-w-sm mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-headline">{t('log_in')}</CardTitle>
            <CardDescription>
              {t('login_page_desc', 'Enter your email below to login to your account.')}
              <br />
              <span className="text-xs">Use role@agribid.com (e.g., petani@agribid.com)</span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">{t('email_address')}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="role@agribid.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                 <div className="flex items-center">
                  <Label htmlFor="password">{t('password', 'Password')}</Label>
                  <Link href="#" className="ml-auto inline-block text-sm underline">
                    {t('forgot_password', 'Forgot your password?')}
                  </Link>
                </div>
                <Input id="password" type="password" defaultValue="password" required />
              </div>
              <Button type="submit" className="w-full">
                {t('log_in')}
              </Button>
            </form>
             <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    {t('or_continue_with', 'Or')}
                  </span>
                </div>
              </div>
            <Button variant="outline" className="w-full" type="button" onClick={() => setIsQrScannerOpen(true)}>
              <QrCode className="mr-2 h-4 w-4" />
              {t('login_with_qr', 'Login with Membership QR')}
            </Button>
            <div className="mt-4 text-center text-sm">
              {t('dont_have_account', "Don't have an account?")}{' '}
              <Link href="/signup" className="underline">
                {t('sign_up')}
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
      <QrScannerDialog 
        open={isQrScannerOpen} 
        onOpenChange={setIsQrScannerOpen}
        onScanSuccess={handleQrScanSuccess}
      />
    </>
  );
}
