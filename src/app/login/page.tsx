
'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useI18n } from '@/context/i18n';
import { Input } from '@/components/ui/input';
import { QrCode } from 'lucide-react';
import { useState } from 'react';
import { QrScannerDialog } from '@/components/qr-scanner-dialog';
import { useAuth } from '@/context/auth';
import { roleToDashboardMap } from '@/config/sidebar';
import type { Role } from '@/lib/roles';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';


export default function LoginPage() {
  const { toast } = useToast();
  const router = useRouter();
  const { t } = useI18n();
  const { login } = useAuth();
  const [isQrScannerOpen, setIsQrScannerOpen] = useState(false);

  const formSchema = z.object({
    email: z.string().email({
      message: t('email_invalid_message', 'Please enter a valid email address.'),
    }),
    password: z.string().min(1, {
      message: t('password_required_message', 'Password is required.'),
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    const loggedInUser = login(values.email, values.password);
    
    if (!loggedInUser) {
         toast({
            variant: 'destructive',
            title: t('login_failed_title', 'Login Failed'),
            description: t('login_failed_desc', 'Invalid credentials. Please try again.'),
        });
        form.setError("root", { type: "manual", message: t('login_failed_desc', 'Invalid credentials. Please try again.') });
        return;
    }
    
    const path = roleToDashboardMap[loggedInUser.role as Role] || '/dashboard/buyer';

    toast({
      title: t('login_success_title'),
      description: t('login_success_desc'),
    });
    
    router.push(path);
  };

  const handleQrScanSuccess = (data: string) => {
    setIsQrScannerOpen(false);
    try {
        const qrData = JSON.parse(data);
        if (qrData.userId && qrData.name && qrData.code && qrData.slug && qrData.role) {
             const userEmail = `${qrData.role.toLowerCase()}@agribid.com`;
             const loggedInUser = login(userEmail, 'password'); // Bypass password for QR login
             if (!loggedInUser) {
                throw new Error('Invalid role in QR code data');
             };
             
             toast({
                title: t('login_success_title'),
                description: `Welcome back, ${qrData.name}!`,
            });
            
            const membershipId = qrData.userId;
            router.push(`/u/${membershipId}/${qrData.slug}`);
        } else {
            throw new Error('Invalid QR code data');
        }
    } catch (error) {
        toast({
            variant: 'destructive',
            title: t('login_failed_title'),
            description: t('login_failed_qr_desc', 'Invalid or expired QR code.'),
        });
    }
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
              <span className="text-xs">{t('demo_login_instructions')}</span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('email_address')}</FormLabel>
                      <FormControl>
                        <Input placeholder="role@agribid.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                        <div className="flex items-center">
                            <FormLabel>{t('password', 'Password')}</FormLabel>
                            <Link href="#" className="ml-auto inline-block text-sm underline">
                                {t('forgot_password', 'Forgot your password?')}
                            </Link>
                        </div>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 {form.formState.errors.root && (
                  <FormMessage>{form.formState.errors.root.message}</FormMessage>
                )}
                <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                  {t('log_in')}
                </Button>
              </form>
            </Form>
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
