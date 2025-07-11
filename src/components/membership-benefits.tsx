
'use client';

import { useI18n } from '@/context/i18n';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Gavel, ShieldCheck, Headset, IdCard } from 'lucide-react';
import { Button } from './ui/button';
import Link from 'next/link';

const benefits = [
    {
        icon: Gavel,
        titleKey: "benefit_exclusive_auctions_title",
        descKey: "benefit_exclusive_auctions_desc"
    },
    {
        icon: ShieldCheck,
        titleKey: "benefit_verified_network_title",
        descKey: "benefit_verified_network_desc"
    },
    {
        icon: Headset,
        titleKey: "benefit_priority_support_title",
        descKey: "benefit_priority_support_desc"
    },
    {
        icon: IdCard,
        titleKey: "benefit_membership_card_title",
        descKey: "benefit_membership_card_desc"
    }
];

export function MembershipBenefits() {
    const { t } = useI18n();

    return (
        <section className="py-16 md:py-24 bg-secondary/50">
            <div className="container px-4 md:px-6">
                <h2 className="text-3xl font-bold text-center font-headline">{t('membership_benefits_title')}</h2>
                <p className="text-center text-muted-foreground mt-2 mb-12">{t('membership_benefits_subtitle')}</p>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {benefits.map((benefit, index) => (
                        <Card key={index} className="text-center">
                            <CardHeader className="items-center">
                                <div className="bg-primary/10 p-4 rounded-full mb-4">
                                    <benefit.icon className="h-10 w-10 text-primary" />
                                </div>
                                <CardTitle className="font-headline text-xl">{t(benefit.titleKey as any)}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">{t(benefit.descKey as any)}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
                <div className="text-center mt-12">
                    <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                        <Link href="/signup">{t('join_now')}</Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
