
'use client';
import { useRef } from 'react';
import Image from 'next/image';
import html2canvas from 'html2canvas';
import { AgriBidLogo } from './icons';
import { useI18n } from '@/context/i18n';
import QRCode from 'qrcode.react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { ShieldCheck, ShieldAlert, Download } from 'lucide-react';
import { allowedRoles, type Role } from '@/lib/roles';
import { Button } from './ui/button';
import { roleLabels } from '@/lib/roles';


interface UserForCard {
    id: string;
    name: string;
    role: string;
    role_label: string;
    role_label_id: string;
    role_desc: string;
    verified?: boolean;
    expires: string;
    slug: string;
    code: string;
    avatarUrl: string;
    avatarFallback: string;
    qrCodeData: any;
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

export function MemberCardFront({ user }: MemberCardProps) {
    const { t, language } = useI18n();
    const isValidRole = allowedRoles.includes(user.role as Role);

    if (!isValidRole) {
      return (
        <div className="p-4 text-red-500 font-medium bg-destructive/10 rounded-lg border border-destructive">
          ⚠️ Peran <strong>{user.role}</strong> tidak valid. Kartu tidak bisa ditampilkan.
        </div>
      );
    }

    return (
        <div className="w-[350px] bg-card p-0 rounded-2xl shadow-xl flex flex-col font-sans overflow-hidden border">
             <div className="bg-primary/10 text-primary-foreground text-center relative h-28 w-full p-4 flex items-center justify-center">
                <AgriBidLogo className="h-16" />
            </div>
            <div className="p-6 flex flex-col flex-grow">
                 <div className="flex justify-end items-start -mt-12">
                     <Badge variant={user.verified ? "default" : "destructive"}>
                        {user.verified ? (
                            <ShieldCheck className="mr-2 h-4 w-4" />
                        ) : (
                            <ShieldAlert className="mr-2 h-4 w-4" />
                        )}
                        {t(user.verified ? 'status_verified' : 'status_unverified', user.verified ? 'Verified' : 'Unverified')}
                    </Badge>
                 </div>
                <div className="flex justify-center -mt-8">
                    <Avatar className="h-28 w-28 border-4 border-background shadow-md">
                        <AvatarImage src={user.avatarUrl} data-ai-hint="portrait photo" />
                        <AvatarFallback>{user.avatarFallback}</AvatarFallback>
                    </Avatar>
                </div>
                <div className="text-center space-y-1 my-4">
                    <p className="font-bold text-xl tracking-wide uppercase">{user.name}</p>
                    <p className="text-primary font-medium">{language === 'id' ? user.role_label_id : user.role_label}</p>
                </div>
                 <div className="text-center my-4">
                    <p className="text-sm text-muted-foreground">{t('membership_id')}</p>
                    <p className="font-mono font-bold text-lg">{user.id}</p>
                </div>
                <div className="flex items-end justify-between mt-auto flex-grow">
                    <div className="text-center">
                        <div className="bg-white p-1.5 rounded-md inline-block">
                            <QRCode value={JSON.stringify(user.qrCodeData)} size={70} />
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-sm text-muted-foreground">{t('valid_until')}</p>
                        <p className="font-semibold text-lg">{user.expires}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export function MemberCardBack() {
    const { t } = useI18n();
    return (
        <div className="w-[350px] bg-card p-6 rounded-2xl shadow-xl flex flex-col font-sans border h-full">
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
    )
}

export function MemberCard({ user }: { user: any }) {
    const { t } = useI18n();
    const frontCardRef = useRef<HTMLDivElement>(null);

    const userForCard: UserForCard = {
        id: `U-${user.id.slice(0, 4).toUpperCase()}`,
        name: user.name.charAt(0).toUpperCase() + user.name.slice(1).replace(/-/g, ' '),
        role: user.role,
        role_label: roleLabels[user.role as keyof typeof roleLabels] || user.role,
        role_label_id: t(`role_${user.role}`),
        role_desc: "Penjual", // Can be enhanced later
        verified: user.verified,
        expires: "30/04/2025",
        slug: user.name,
        code: `${user.role.charAt(0).toUpperCase()}${user.id.slice(0, 3)}`,
        avatarUrl: `https://placehold.co/150x150.png?text=${user.name.charAt(0).toUpperCase()}`,
        avatarFallback: user.name.charAt(0).toUpperCase(),
        qrCodeData: {
          userId: `U-${user.id.slice(0, 4).toUpperCase()}`,
          name: (user.name.charAt(0).toUpperCase() + user.name.slice(1).replace(/-/g, ' ')).toUpperCase(),
          validUntil: "30/04/2025",
          code: `${user.role.charAt(0).toUpperCase()}${user.id.slice(0, 3)}`,
          slug: user.name,
          role: user.role
        }
    };

    const handleDownload = () => {
        if (frontCardRef.current) {
            html2canvas(frontCardRef.current, {
                useCORS: true,
                backgroundColor: null,
                scale: 2 // Increase resolution
            }).then((canvas) => {
                const link = document.createElement('a');
                link.download = `agribid-member-card-${userForCard.slug}.png`;
                link.href = canvas.toDataURL('image/png');
                link.click();
            });
        }
    };
    
    return (
        <div className="flex flex-col items-center">
             <div className="grid md:grid-cols-2 gap-8 justify-items-center">
                <div ref={frontCardRef}>
                    <MemberCardFront user={userForCard} />
                </div>
                <MemberCardBack />
            </div>
            {userForCard.verified && (
                <Button onClick={handleDownload} className="mt-6">
                    <Download className="mr-2 h-4 w-4" />
                    {t('download_card', 'Download Card')}
                </Button>
            )}
        </div>
    );
}
