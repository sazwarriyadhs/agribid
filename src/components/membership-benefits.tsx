
'use client';

import { useI18n } from '@/context/i18n';
import { Button } from './ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from '@/components/ui/dialog';
import { AgriBidLogo } from './icons';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { QrCode } from 'lucide-react';
import QRCode from 'qrcode.react';
import { useAuth } from '@/context/auth';

const staticCardInfo = {
    name: "JESSICA SUTRISNO",
    role: "Producer",
    role_id: "Produsen",
    id: "DP248017356",
    code: "P001",
    slug: "jessica-sutrisno",
    role_slug: "producer",
    expires: "30/04/2025",
    avatarUrl: 'https://placehold.co/150x150.png',
    avatarFallback: 'JS'
}

const regulations = [
    "regulation_1",
    "regulation_2",
    "regulation_3",
    "regulation_4",
];


export function MembershipBenefits() {
    const { t, language } = useI18n();
    const { user } = useAuth();

    // Use logged-in user data if available, otherwise use static data
    const cardInfo = user ? {
        name: user.name.toUpperCase().replace(/-/g, ' '),
        role: user.role.charAt(0).toUpperCase() + user.role.slice(1),
        role_id: t(`role_${user.role}`),
        id: `U-${user.id.slice(0, 4).toUpperCase()}${Date.now().toString().slice(-4)}`,
        code: `${user.role.charAt(0).toUpperCase()}${user.id.slice(0, 3)}`,
        slug: user.name,
        role_slug: user.role,
        expires: "30/04/2025",
        avatarUrl: `https://placehold.co/150x150.png?text=${user.name.charAt(0).toUpperCase()}`,
        avatarFallback: user.name.charAt(0).toUpperCase()
    } : staticCardInfo;

    const qrCodeData = JSON.stringify({
        userId: cardInfo.id,
        name: cardInfo.name,
        validUntil: cardInfo.expires,
        code: cardInfo.code,
        slug: cardInfo.slug,
        role: cardInfo.role_slug
    });

    return (
        <section className="py-16 md:py-24 bg-secondary/50">
            <div className="container grid md:grid-cols-2 gap-12 items-center">
                <div className="relative h-[500px] w-full max-w-sm mx-auto order-last md:order-first">
                    <Dialog>
                        <DialogTrigger asChild>
                             <div className="cursor-pointer">
                                <Image src="/images/kartu.png" alt={t('membership_benefits_title')} layout="fill" className="object-contain" />
                            </div>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl bg-transparent border-none shadow-none p-0">
                             <DialogTitle className="sr-only">{t('membership_card')}</DialogTitle>
                            <div className="grid md:grid-cols-2 gap-8 justify-items-center">
                                {/* Front Card */}
                                <div className="w-[350px] bg-card p-0 rounded-2xl shadow-xl flex flex-col font-sans overflow-hidden">
                                    <div className="bg-primary/20 text-primary-foreground text-center relative h-36 w-full">
                                      <Image
                                        src="/images/kartu.png"
                                        alt="Member Card"
                                        fill
                                        className="object-cover"
                                      />
                                      <p className="absolute inset-0 flex items-center justify-center font-bold text-lg tracking-wider text-primary z-10">
                                        {t('membership_card')}
                                      </p>
                                    </div>
                                    <div className="p-6 flex flex-col flex-grow">
                                        <div className="text-center my-4">
                                            <AgriBidLogo className="h-16 w-auto mx-auto" />
                                        </div>
                                        <div className="flex justify-center my-4">
                                            <Avatar className="h-28 w-28 border-4 border-card shadow-md">
                                                <AvatarImage src={cardInfo.avatarUrl} data-ai-hint="woman portrait" />
                                                <AvatarFallback>{cardInfo.avatarFallback}</AvatarFallback>
                                            </Avatar>
                                        </div>
                                        <div className="text-center space-y-1 my-4">
                                            <p className="font-bold text-xl tracking-wide uppercase">{cardInfo.name}</p>
                                            <p className="text-primary font-medium">{language === 'id' ? cardInfo.role_id : cardInfo.role}</p>
                                        </div>
                                         <div className="text-center my-4">
                                            <p className="text-sm text-muted-foreground">{t('membership_id')}</p>
                                            <p className="font-mono font-bold text-lg">{cardInfo.id}</p>
                                        </div>
                                        <div className="flex items-end justify-between mt-auto flex-grow">
                                            <div className="text-center">
                                                <div className="bg-white p-1.5 rounded-md inline-block">
                                                    <QRCode value={qrCodeData} size={70} />
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm text-muted-foreground">{t('valid_until')}</p>
                                                <p className="font-semibold text-lg">{cardInfo.expires}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Back Card */}
                                <div className="w-[350px] bg-card p-6 rounded-2xl shadow-xl flex flex-col font-sans">
                                    <div className="border-b-2 border-primary/20 pb-2 mb-4">
                                         <p className="text-primary font-bold text-lg tracking-wider">{t('regulations_title')}</p>
                                    </div>
                                    <ul className="space-y-4 text-muted-foreground mt-4 text-base">
                                        {regulations.map(reg => (
                                            <li key={reg} className="flex gap-3">
                                                <span className="mt-1.5">&#x2022;</span>
                                                <span>{t(reg as any)}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
                <div className="flex flex-col items-start text-left">
                    <h2 className="text-3xl font-bold font-headline">{t('membership_benefits_title')}</h2>
                    <p className="text-muted-foreground mt-4 mb-6 text-lg">{t('membership_benefits_subtitle')}</p>
                    <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                        <Link href="/signup">{t('join_now')}</Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
