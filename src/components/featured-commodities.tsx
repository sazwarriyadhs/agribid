'use client';
import { useI18n } from '@/context/i18n';
import { Wheat, Leaf, Coffee, Sprout, Layers, CookingPot, Grape, Carrot, Shell, Square, CigaretteOff, Milk, UtensilsCrossed, Waves } from 'lucide-react';

const commodities = [
    { key: "rice", Icon: Wheat },
    { key: "palm_oil", Icon: Leaf },
    { key: "coffee", Icon: Coffee },
    { key: "cocoa", Icon: Sprout },
    { key: "rubber", Icon: Layers },
    { key: "spices", Icon: CookingPot },
    { key: "tropical_fruits", Icon: Grape },
    { key: "cassava", Icon: Shell },
    { key: "sweet_potato", Icon: Carrot },
    { key: "corn", Icon: Square },
    { key: "tea", Icon: UtensilsCrossed },
    { key: "sugarcane", Icon: Milk },
    { key: "coconut", Icon: Waves },
    { key: "tobacco", Icon: CigaretteOff },
];

export function FeaturedCommodities() {
  const { t } = useI18n();

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold text-center font-headline">{t('featured_commodities_title')}</h2>
        <p className="text-center text-muted-foreground mt-2 mb-12">{t('featured_commodities_subtitle')}</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {commodities.map(({ key, Icon }) => (
            <div key={key} className="flex flex-col items-center text-center p-4 rounded-lg bg-card hover:shadow-lg transition-shadow">
              <div className="bg-primary/10 p-4 rounded-full mb-4">
                <Icon className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-lg font-semibold font-headline">{t(key as any)}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
