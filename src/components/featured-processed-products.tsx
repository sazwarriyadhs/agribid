'use client';
import { useI18n } from '@/context/i18n';
import { Coffee, Shrimp, Package, CakeSlice, Leaf, Component, Square } from 'lucide-react';

const processedProducts = [
    { key: "instant_coffee", Icon: Coffee },
    { key: "packaged_shrimp", Icon: Shrimp },
    { key: "tapioca_flour", Icon: Package },
    { key: "taro_cake", Icon: CakeSlice },
    { key: "taro_chips", Icon: Leaf },
    { key: "processed_cocoa_products", Icon: Component },
    { key: "processed_coffee_products", Icon: Square },
];

export function FeaturedProcessedProducts() {
  const { t } = useI18n();

  return (
    <section className="py-16 md:py-24 bg-secondary/50">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold text-center font-headline">{t('featured_processed_products_title')}</h2>
        <p className="text-center text-muted-foreground mt-2 mb-12">{t('featured_processed_products_subtitle')}</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 justify-center">
          {processedProducts.map(({ key, Icon }) => (
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
