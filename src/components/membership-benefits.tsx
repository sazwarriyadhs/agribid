
'use client';

import { useI18n } from '@/context/i18n';
import { Button } from './ui/button';
import Link from 'next/link';
import Image from 'next/image';

export function MembershipBenefits() {
    const { t } = useI18n();

    return (
        <section className="py-16 md:py-24 bg-secondary/50">
            <div className="container grid md:grid-cols-2 gap-12 items-center">
                <div className="relative h-[500px] w-full max-w-sm mx-auto rounded-xl overflow-hidden shadow-xl order-last md:order-first">
                   <Image src="/images/kartu.png" alt={t('membership_benefits_title')} layout="fill" className="object-cover" />
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
