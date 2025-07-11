
'use client';

import { AgriBidLogo } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Download, QrCode } from 'lucide-react';
import { useI18n } from '@/context/i18n';

const cardInfo = {
    name: "JESSICA SUTRISNO",
    role: "Producer",
    role_id: "Produsen",
    id: "DP248017356",
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

export default function MembershipCardPage() {
    const { t, language } = useI18n();

    return (
        <div className="bg-secondary/70 min-h-screen py-12 px-4">
            <div className="container mx-auto max-w-4xl">
                 <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold font-headline">{t('membership_card_title')}</h1>
                    <p className="text-muted-foreground mt-2">{t('membership_card_subtitle')}</p>
                    <Button className="mt-4">
                        <Download className="mr-2" />
                        {t('download_as_pdf')}
                    </Button>
                </div>

                <div className="grid md:grid-cols-2 gap-8 justify-items-center">
                    {/* Front Card */}
                    <div className="w-[350px] bg-card p-0 rounded-2xl shadow-xl flex flex-col font-sans overflow-hidden">
                        <div className="bg-primary/20 text-primary-foreground p-3 text-center">
                             <p className="font-bold text-lg tracking-wider text-primary">{t('membership_card')}</p>
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
                                    <QrCode className="h-20 w-20 mx-auto" />
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
            </div>
        </div>
    );
}
