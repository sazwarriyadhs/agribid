
'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
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
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Banknote, Building, User, Globe } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const roles = [
  { key: 'role_producer', value: 'producer', fee: 25000 },
  { key: 'role_bidder', value: 'bidder', fee: 25000 },
  { key: 'role_partner', value: 'partner', fee: 50000 },
  { key: 'role_international_buyer', value: 'international_buyer', fee: 50000 },
];

// In a real app, this would come from a database or a more robust source
const countries = [
  "USA", "China", "India", "Netherlands", "Germany", "Japan", "Vietnam", "Malaysia", "Singapore", "Australia", "Canada", "United Kingdom"
];

export default function SignupPage() {
  const { t, formatCurrency } = useI18n();
  const { toast } = useToast();
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState('bidder');
  const [userType, setUserType] = useState<'individual' | 'company'>('individual');
  const [country, setCountry] = useState('');

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRole === 'international_buyer' && !country) {
        toast({
            variant: 'destructive',
            title: t('error'),
            description: t('country_selection_required', 'Please select your country to register as an International Buyer.'),
        });
        return;
    }

    toast({
      title: t('registration_submitted_title', "Registration Submitted"),
      description: t('registration_submitted_desc', "Your account is pending admin approval. You will be notified upon activation."),
    });
    router.push('/login');
  };
  
  const usdEquivalentFee = (feeInIdr: number) => {
    // This is an approximation. In a real app, you'd use a proper exchange rate service.
    return feeInIdr / 15000;
  }

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-14rem)] bg-background px-4 py-12">
      <Card className="mx-auto max-w-md w-full">
        <CardHeader>
          <CardTitle className="text-xl font-headline">{t('sign_up')}</CardTitle>
          <CardDescription>
            {t('signup_page_desc', 'Enter your information to create an account and choose your role')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignup} className="grid gap-4">
            
            <div className="grid gap-2">
              <Label>{t('user_type', 'User Type')}</Label>
              <RadioGroup defaultValue="individual" onValueChange={(value) => setUserType(value as 'individual' | 'company')} className="grid grid-cols-2 gap-4">
                  <div>
                    <RadioGroupItem value="individual" id="individual" className="peer sr-only" />
                    <Label htmlFor="individual" className="flex items-center justify-center gap-2 rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                      <User className="h-5 w-5"/>
                      {t('individual', 'Individual')}
                    </Label>
                  </div>
                   <div>
                    <RadioGroupItem value="company" id="company" className="peer sr-only" />
                    <Label htmlFor="company" className="flex items-center justify-center gap-2 rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">
                      <Building className="h-5 w-5" />
                      {t('company', 'Company')}
                    </Label>
                  </div>
              </RadioGroup>
            </div>
            
            {userType === 'individual' ? (
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="first-name">{t('first_name', 'First name')}</Label>
                  <Input id="first-name" placeholder="Max" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="last-name">{t('last_name', 'Last name')}</Label>
                  <Input id="last-name" placeholder="Robinson" required />
                </div>
              </div>
            ) : (
              <div className="grid gap-2">
                <Label htmlFor="company-name">{t('company_name', 'Company Name')}</Label>
                <Input id="company-name" placeholder={t('company_name_placeholder', 'e.g. PT Agri Jaya')} required />
              </div>
            )}

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
              <Label htmlFor="password">{t('password', 'Password')}</Label>
              <Input id="password" type="password" required />
            </div>
            
            <div className="grid gap-2">
                <Label>{t('choose_your_role', 'Choose your role')}</Label>
                <RadioGroup 
                    defaultValue="bidder" 
                    className="grid grid-cols-2 gap-4"
                    onValueChange={setSelectedRole}
                    value={selectedRole}
                >
                    {roles.map(role => (
                        <div key={role.value}>
                            <RadioGroupItem value={role.value} id={role.value} className="peer sr-only" />
                            <Label
                                htmlFor={role.value}
                                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                            >
                               {t(role.key as any)}
                               <span className="text-xs text-muted-foreground mt-2">{t('registration_fee', 'Registration Fee')}</span>
                               <span className="font-bold text-primary">{formatCurrency(usdEquivalentFee(role.fee))}</span>
                            </Label>
                        </div>
                    ))}
                </RadioGroup>
            </div>

            {selectedRole === 'international_buyer' && (
                <div className="grid gap-2">
                    <Label htmlFor="country">{t('country', 'Country')}</Label>
                     <Select onValueChange={setCountry} value={country}>
                        <SelectTrigger id="country">
                            <SelectValue placeholder={t('select_your_country', 'Select your country')} />
                        </SelectTrigger>
                        <SelectContent>
                            {countries.map((c) => (
                                <SelectItem key={c} value={c}>{c}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            )}
            
             <Alert>
                <Banknote className="h-4 w-4"/>
                <AlertTitle className="font-semibold">{t('payment_instruction_title', 'Payment Instruction')}</AlertTitle>
                <AlertDescription>
                    {t('payment_instruction_desc', 'Payment instructions will be provided after your account has been approved by the admin.')}
                </AlertDescription>
            </Alert>


            <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
              {t('submit_for_approval', 'Submit for Approval')}
            </Button>
            <Button variant="outline" className="w-full" type="button">
              {t('signup_with_google', 'Sign up with Google')}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            {t('already_have_account', 'Already have an account?')}
            <Link href="/login" className="underline">
              {t('log_in')}
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
