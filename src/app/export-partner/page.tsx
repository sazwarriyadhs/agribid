
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useI18n } from '@/context/i18n';
import { CheckCircle, FileText, Globe, Handshake, Plane, ShieldCheck, UserCheck, Award } from 'lucide-react';
import Link from 'next/link';

export default function ExportPartnerPage() {
    const { t } = useI18n();

    const benefits = [
        { icon: Globe, title: "benefit_1_title", description: "benefit_1_desc" },
        { icon: ShieldCheck, title: "benefit_2_title", description: "benefit_2_desc" },
        { icon: Handshake, title: "benefit_3_title", description: "benefit_3_desc" },
    ];

    const howItWorks = [
        { icon: UserCheck, title: "exporter_step_1_title", description: "exporter_step_1_desc" },
        { icon: Award, title: "exporter_step_2_title", description: "exporter_step_2_desc" },
        { icon: FileText, title: "exporter_step_3_title", description: "exporter_step_3_desc" },
        { icon: Plane, title: "exporter_step_4_title", description: "exporter_step_4_desc" },
    ];

    return (
        <div className="container mx-auto max-w-5xl px-4 py-8 md:py-16">
            <section className="text-center">
                <div className="inline-block bg-primary/10 p-4 rounded-full mb-4">
                    <Plane className="h-12 w-12 text-primary" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold font-headline">{t('export_partner_program_title')}</h1>
                <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">{t('export_partner_program_subtitle')}</p>
            </section>

            <section className="py-16">
                <h2 className="text-3xl font-bold text-center font-headline">{t('why_join_title')}</h2>
                <p className="text-center text-muted-foreground mt-2 mb-12">{t('why_join_subtitle')}</p>
                <div className="grid md:grid-cols-3 gap-8 text-left">
                    {benefits.map((benefit, index) => (
                        <Card key={index}>
                            <CardHeader className="flex flex-row items-center gap-4">
                                <div className="bg-primary/10 p-3 rounded-full">
                                    <benefit.icon className="h-6 w-6 text-primary" />
                                </div>
                                <CardTitle className="font-headline text-xl">{t(benefit.title as any)}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">{t(benefit.description as any)}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            <section className="py-16 bg-secondary/50 rounded-xl">
                 <div className="container px-4 md:px-6">
                    <h2 className="text-3xl font-bold text-center font-headline">{t('how_it_works_title_export')}</h2>
                    <p className="text-center text-muted-foreground mt-2 mb-12">{t('how_it_works_subtitle_exporter')}</p>
                    <div className="relative">
                        <div className="absolute left-1/2 top-10 bottom-10 w-0.5 bg-border -translate-x-1/2 hidden md:block"></div>
                        {howItWorks.map((step, index) => (
                            <div key={index} className={`flex md:items-center gap-8 mb-12 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                                <div className="hidden md:flex flex-col items-center">
                                    <div className="bg-primary/10 p-4 rounded-full border-4 border-background">
                                        <step.icon className="h-10 w-10 text-primary" />
                                    </div>
                                </div>
                                <Card className="w-full md:w-1/2">
                                     <CardHeader>
                                        <div className="flex md:hidden items-center gap-4 mb-2">
                                            <div className="bg-primary/10 p-3 rounded-full"><step.icon className="h-8 w-8 text-primary" /></div>
                                            <CardTitle className="font-headline text-xl">{t(step.title as any)}</CardTitle>
                                        </div>
                                        <CardTitle className="font-headline text-xl hidden md:block">{t(step.title as any)}</CardTitle>
                                     </CardHeader>
                                     <CardContent>
                                        <p className="text-muted-foreground">{t(step.description as any)}</p>
                                     </CardContent>
                                </Card>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            
            <section id="apply" className="py-16 text-center">
                <Card className="max-w-2xl mx-auto">
                    <CardHeader>
                        <CardTitle className="text-3xl font-bold font-headline">{t('ready_to_become_producer')}</CardTitle>
                        <CardDescription>{t('start_your_journey_now')}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button asChild size="lg">
                            <Link href="/signup">
                                <UserCheck className="mr-2 h-5 w-5" />
                                {t('become_a_producer')}
                            </Link>
                        </Button>
                    </CardContent>
                </Card>
            </section>
        </div>
    );
}
