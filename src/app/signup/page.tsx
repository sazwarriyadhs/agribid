
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useI18n } from '@/context/i18n';

const roles = [
  { key: 'role_producer', value: 'producer' },
  { key: 'role_bidder', value: 'bidder' },
  { key: 'role_partner', value: 'partner' },
  { key: 'role_exporter', value: 'exporter' },
];

export default function SignupPage() {
  const { t } = useI18n();

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-14rem)] bg-background px-4 py-12">
      <Card className="mx-auto max-w-md w-full">
        <CardHeader>
          <CardTitle className="text-xl font-headline">{t('sign_up')}</CardTitle>
          <CardDescription>
            Enter your information to create an account and choose your role
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="first-name">First name</Label>
                <Input id="first-name" placeholder="Max" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="last-name">Last name</Label>
                <Input id="last-name" placeholder="Robinson" required />
              </div>
            </div>
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
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required />
            </div>
            
            <div className="grid gap-2">
                <Label>Choose your role</Label>
                <RadioGroup defaultValue="bidder" className="grid grid-cols-2 gap-4">
                    {roles.map(role => (
                        <div key={role.value}>
                            <RadioGroupItem value={role.value} id={role.value} className="peer sr-only" />
                            <Label
                                htmlFor={role.value}
                                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                            >
                               {t(role.key as any)}
                            </Label>
                        </div>
                    ))}
                </RadioGroup>
            </div>

            <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
              Create an account
            </Button>
            <Button variant="outline" className="w-full">
              Sign up with Google
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Already have an account?{' '}
            <Link href="/login" className="underline">
              {t('log_in')}
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
