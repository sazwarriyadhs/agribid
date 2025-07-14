
'use client';
import Image from 'next/image';

import { AgriBidLogo } from './icons';
import { useI18n } from '@/context/i18n';
import QRCode from 'qrcode.react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { ShieldCheck, ShieldAlert } from 'lucide-react';

interface UserForCard {
    id: string;
    name: string;
    role: string;
    email: string;
    verified?: boolean;
}

interface MemberCardProps {
    user: UserForCard;
}

const regulations = [
    "regulation_1",
    "regulation_2",
    "regulation_3",
    "regulation_4",
];

export function MemberCard({ user }: MemberCardProps) {
    const { t, language } = useI18n();
    
    const cardInfo = {
        name: user.name.toUpperCase().replace(/-/g, ' '),
        role: user.role.charAt(0).toUpperCase() + user.role.slice(1),
        role_id: t(`role_${user.role}`),
        id: `U-${user.id.slice(0, 4).toUpperCase()}${Date.now().toString().slice(-4)}`,
        code: `${user.role.charAt(0).toUpperCase()}${user.id.slice(0, 3)}`,
        slug: user.name,
        role_slug: user.role,
        expires: "30/04/2025",
        avatarUrl: `https://placehold.co/150x150.png?text=${user.name.charAt(0).toUpperCase()}`,
        avatarFallback: user.name.charAt(0).toUpperCase(),
        verified: user.verified ?? false,
    };
    
     const qrCodeData = JSON.stringify({
        userId: cardInfo.id,
        name: cardInfo.name,
        validUntil: cardInfo.expires,
        code: cardInfo.code,
        slug: cardInfo.slug,
        role: cardInfo.role_slug
    });


    return (
        <div className="grid md:grid-cols-2 gap-8 justify-items-center">
            {/* Front Card */}
            <div className="w-[350px] bg-card p-0 rounded-2xl shadow-xl flex flex-col font-sans overflow-hidden border">
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
                     <div className="flex justify-between items-start">
                        <AgriBidLogo className="h-12" />
                         <Badge variant={cardInfo.verified ? "default" : "destructive"}>
                            {cardInfo.verified ? (
                                <ShieldCheck className="mr-2 h-4 w-4" />
                            ) : (
                                <ShieldAlert className="mr-2 h-4 w-4" />
                            )}
                            {t(cardInfo.verified ? 'status_verified' : 'status_unverified', cardInfo.verified ? 'Verified' : 'Unverified')}
                        </Badge>
                     </div>
                    <div className="flex justify-center my-4">
                        <Avatar className="h-28 w-28 border-4 border-card shadow-md">
                            <AvatarImage src={cardInfo.avatarUrl} data-ai-hint="portrait photo" />
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
            <div className="w-[350px] bg-card p-6 rounded-2xl shadow-xl flex flex-col font-sans border">
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
    );
}
