'use client';
import { useI18n } from '@/context/i18n';
import { Wheat, Fish, Beef, Coffee, Leaf } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const categories: { key: string; Icon: LucideIcon }[] = [
    { key: "Pertanian", Icon: Wheat },
    { key: "Peternakan", Icon: Beef },
    { key: "Perikanan", Icon: Fish },
    { key: "Perkebunan", Icon: Coffee },
    { key: "Hasil Hutan", Icon: Leaf }
];

export function FeaturedCommodities() {
  const { t } = useI18n();

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold text-center font-headline">{t('browse_by_category')}</h2>
        <p className="text-center text-muted-foreground mt-2 mb-12">{t('browse_by_category_subtitle')}</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
          {categories.map(({ key, Icon }) => (
            <div key={key} className="flex flex-col items-center text-center p-4 rounded-lg bg-card hover:shadow-lg transition-shadow cursor-pointer">
              <div className="bg-primary/10 p-4 rounded-full mb-4">
                <Icon className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-lg font-semibold font-headline">{t(key.toLowerCase() as any, key)}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
