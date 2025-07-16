
'use client';
import { useRef } from 'react';
import Image from 'next/image';
import html2canvas from 'html2canvas';
import { AgriBidLogo } from './icons';
import { useI18n } from '@/context/i18n';
import QRCode from 'qrcode.react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { ShieldCheck, ShieldAlert, Download, Globe } from 'lucide-react';
import { allowedRoles, type Role } from '@/lib/roles';
import { Button } from './ui/button';
import { roleLabels } from '@/lib/roles';


interface UserForCard {
    id: string;
    name: string;
    role: string;
    role_label: string;
    role_label_id: string;
    verified?: boolean;
    expires: string;
    slug: string;
    code: string;
    avatarUrl: string;
    avatarFallback: string;
    qrCodeData: any;
    country?: string;
}

// Function to get flag emoji from country code (approximated)
const getFlagEmoji = (countryName?: string): string => {
    if (!countryName) return '';
    
    // Simple mapping for demo purposes. In a real app, use a library or a more robust mapping.
    const countryCodeMap: { [key: string]: string } = {
        'USA': 'US',
        'Netherlands': 'NL',
        'Japan': 'JP',
        'China': 'CN',
        'India': 'IN',
        'Germany': 'DE',
        'France': 'FR',
        'Vietnam': 'VN',
        'Malaysia': 'MY',
        'Singapore': 'SG',
        'Australia': 'AU',
        'Canada': 'CA',
        'United Kingdom': 'GB',
        'Brazil': 'BR',
        'Spain': 'ES',
        'Portugal': 'PT',
    };

    const code = countryCodeMap[countryName];
    if (!code) return '🏳️'; // Default flag

    const codePoints = code
        .toUpperCase()
        .split('')
        .map(char => 127397 + char.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
};


interface MemberCardProps {
    user: UserForCard;
}

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

    const flagEmoji = getFlagEmoji(user.country);

    return (
        <div className="w-[350px] h-[550px] bg-card p-6 rounded-2xl shadow-xl flex flex-col font-sans overflow-hidden border">
             <header className="text-center mb-4">
                <h2 className="text-xl font-bold uppercase text-primary tracking-wide">
                    {t('membership_card', 'KARTU MEMBER')}
                </h2>
             </header>

            <div className="text-center my-2">
                <AgriBidLogo className="h-16 w-auto mx-auto" />
            </div>

            <div className="flex justify-center my-6">
                 <Avatar className="h-36 w-36 border-4 border-background shadow-md">
                    <AvatarImage src={user.avatarUrl} data-ai-hint="portrait photo" />
                    <AvatarFallback>{user.avatarFallback}</AvatarFallback>
                </Avatar>
            </div>

            <div className="text-center space-y-1">
                <h3 className="font-bold text-2xl text-primary tracking-wide uppercase">{user.name}</h3>
                <div className="flex items-center justify-center gap-2">
                    <p className="text-muted-foreground font-medium italic">{language === 'id' ? user.role_label_id : user.role_label}</p>
                    {user.country && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span className="text-lg">{flagEmoji}</span>
                            <span>({user.country})</span>
                        </div>
                    )}
                </div>
                <p className="text-sm text-foreground/80 pt-2">
                    <span className="font-semibold">{t('membership_id', 'No. Induk')}:</span> {user.id}
                </p>
            </div>

            <div className="flex items-end justify-between mt-auto pt-6 flex-grow">
                <div className="text-center">
                    <div className="bg-white p-2 rounded-md inline-block shadow-inner">
                        <QRCode value={JSON.stringify(user.qrCodeData)} size={80} />
                    </div>
                </div>
                <div className="text-right">
                    <p className="text-sm text-muted-foreground">{t('valid_until', 'Berlaku hingga')}</p>
                    <p className="font-semibold text-lg text-accent">{user.expires}</p>
                </div>
            </div>
        </div>
    )
}

export function MemberCardBack() {
    const { t } = useI18n();
    return (
        <div className="w-[350px] h-[550px] bg-card p-6 rounded-2xl shadow-xl flex flex-col font-sans border">
            <div className="border-b-2 border-primary/20 pb-2 mb-4">
                 <p className="text-primary font-bold text-lg tracking-wider">Peraturan Kartu / Card Rules</p>
            </div>
            <div className="space-y-4 text-muted-foreground mt-4 text-xs overflow-y-auto pr-2">
                <div className="space-y-2">
                    <p className="font-bold text-sm">🇮🇩 Bahasa Indonesia:</p>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>Kartu ini adalah identitas resmi sebagai anggota AgriBid Indonesia.</li>
                        <li>Hanya boleh digunakan oleh pemilik sah, tidak boleh dipindah-tangankan.</li>
                        <li>Tunjukkan kartu ini saat mengikuti lelang, pengiriman, atau kerja sama ekspor.</li>
                        <li>Jika kartu hilang, rusak, atau masa berlakunya habis, segera hubungi tim AgriBid.</li>
                        <li>Masa berlaku kartu sesuai tanggal yang tercantum dan dapat diperpanjang.</li>
                        <li>Pelanggaran terhadap aturan dapat menyebabkan keanggotaan dibekukan.</li>
                    </ul>
                </div>
                 <div className="space-y-2">
                    <p className="font-bold text-sm">🇬🇧 English Version:</p>
                    <ul className="list-disc pl-5 space-y-1">
                        <li>This card is an official identification as a member of AgriBid Indonesia.</li>
                        <li>It is strictly personal and non-transferable.</li>
                        <li>Present this card when joining auctions, shipping, or export collaborations.</li>
                        <li>If the card is lost, damaged, or expired, please contact the AgriBid team immediately.</li>
                        <li>Validity period follows the date listed and can be renewed.</li>
                        <li>Violation of the rules may result in membership suspension.</li>
                    </ul>
                </div>
            </div>
             <div className="mt-auto pt-4 border-t border-primary/10 text-center text-xs text-muted-foreground">
                <p>Informasi resmi tersedia di:</p>
                <p className="font-semibold text-primary">www.agribid.id</p>
            </div>
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
        },
        country: user.country,
    };

    const handleDownload = () => {
        if (frontCardRef.current) {
            html2canvas(frontCardRef.current!, {
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
