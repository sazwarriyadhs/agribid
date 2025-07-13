
'use client';
import { useI18n } from '@/context/i18n';
import InteractiveMap from './interactive-map';

export function GlobalDemand() {
  const { t } = useI18n();

  return (
    <section className="py-16 md:py-24 bg-secondary/50">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold text-center font-headline">{t('global_demand_title')}</h2>
        <p className="text-center text-muted-foreground mt-2 mb-12">{t('global_demand_subtitle')}</p>
        <div className="w-full h-[500px] bg-card rounded-lg shadow-md overflow-hidden">
          <InteractiveMap />
        </div>
      </div>
    </section>
  );
}
