
'use client';
import { useI18n } from '@/context/i18n';
import { Button } from './ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { Handshake, ShieldCheck, Zap } from 'lucide-react';

const benefits = [
    {
        icon: Zap,
        titleKey: "benefit_supply_chain_title",
        descKey: "benefit_supply_chain_desc"
    },
    {
        icon: ShieldCheck,
        titleKey: "benefit_guaranteed_quality_title",
        descKey: "benefit_guaranteed_quality_desc"
    },
    {
        icon: Handshake,
        titleKey: "benefit_transparent_transaction_title",
        descKey: "benefit_transparent_transaction_desc"
    }
];

export function DirectFromProducer() {
  const { t } = useI18n();

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-last md:order-first">
                <h2 className="text-3xl font-bold font-headline">{t('direct_from_producer_title')}</h2>
                <p className="text-muted-foreground mt-4 mb-8 text-lg">{t('direct_from_producer_desc')}</p>
                
                <ul className="space-y-6">
                    {benefits.map((benefit) => (
                        <li key={benefit.titleKey} className="flex items-start gap-4">
                            <div className="bg-primary/10 p-3 rounded-full mt-1">
                                <benefit.icon className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-xl">{t(benefit.titleKey)}</h3>
                                <p className="text-muted-foreground mt-1">{t(benefit.descKey)}</p>
                            </div>
                        </li>
                    ))}
                </ul>

                <Button asChild size="lg" className="mt-8">
                    <Link href="/export-partner">{t('learn_about_export_program')}</Link>
                </Button>
            </div>
            <div className="aspect-square relative rounded-xl overflow-hidden shadow-lg">
                <Image
                    src="https://placehold.co/800x800.png"
                    data-ai-hint="farmer holding produce"
                    alt={t('direct_from_producer_title')}
                    fill
                    className="object-cover"
                />
            </div>
        </div>
      </div>
    </section>
  );
}
