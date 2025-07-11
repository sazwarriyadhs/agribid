
'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useI18n } from '@/context/i18n';

const users = [
  { role: 'Produsen', role_key: 'role_producer', email: 'produsen@agribid.id', password: 'produsen123', path: '/dashboard/producer' },
  { role: 'Penawar', role_key: 'role_bidder', email: 'penawar@agribid.id', password: 'penawar123', path: '/dashboard/bidder' },
  { role: 'Mitra', role_key: 'role_partner', email: 'mitra@agribid.id', password: 'mitra123', path: '/dashboard/partner' },
  { role: 'Eksportir', role_key: 'role_exporter', email: 'eksportir@agribid.id', password: 'eksportir123', path: '/dashboard/exporter' },
];

export default function MultiLoginPage() {
  const { toast } = useToast();
  const router = useRouter();
  const { t } = useI18n();

  const handleLogin = (role: string, path: string) => {
    toast({
      title: `${t('login_success_title')} sebagai ${role}`,
      description: t('login_success_desc'),
    });
    router.push(path);
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-14rem)] bg-background px-4 py-12">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-headline">Quick Login</CardTitle>
          <CardDescription>
            Select a user role to log in for testing purposes.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Role</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Password</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.role}>
                  <TableCell className="font-medium">{t(user.role_key as any)}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell className="font-mono">{user.password}</TableCell>
                  <TableCell className="text-right">
                    <Button onClick={() => handleLogin(t(user.role_key as any), user.path)}>Login</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
           <div className="mt-6 text-center text-sm">
            Want to create a new account?{' '}
            <Link href="/signup" className="underline">
              Sign up here
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
