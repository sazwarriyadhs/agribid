
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


export default function LoginPage() {
  const { toast } = useToast();
  const router = useRouter();
  const { t } = useI18n();
  const [isQrScannerOpen, setIsQrScannerOpen] = useState(false);


  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: t('login_success_title'),
      description: t('login_success_desc'),
    });
    // This is a simulation. In a real app, you'd get a token
    // and update a global state or cookie.
    // We can simulate this by telling the header to update.
    // For now, we just redirect.
    router.push('/dashboard');
  };

  const handleQrScanSuccess = (data: string) => {
    console.log('Scanned QR Data:', data);
    // In a real app, you would verify the QR data (e.g., a token) with the backend
    // For this demo, we'll assume the QR code contains a valid user identifier.
    try {
        const qrData = JSON.parse(data);
        if (qrData.userId === 'DP248017356') {
             toast({
                title: t('login_success_title'),
                description: `Welcome back, ${qrData.name}!`,
            });
            router.push('/dashboard');
        } else {
            throw new Error('Invalid QR code');
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
              Enter your email below to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">{t('email_address')}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                 <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link href="#" className="ml-auto inline-block text-sm underline">
                    Forgot your password?
                  </Link>
                </div>
                <Input id="password" type="password" required />
              </div>
              <Button type="submit" className="w-full">
                {t('log_in')}
              </Button>
               <div className="relative my-2">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                      Or continue with
                    </span>
                  </div>
                </div>
              <Button variant="outline" className="w-full" type="button" onClick={() => setIsQrScannerOpen(true)}>
                <QrCode className="mr-2 h-4 w-4" />
                Login with QR
              </Button>
            </form>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{' '}
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
