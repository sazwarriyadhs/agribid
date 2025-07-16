'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { useI18n } from '@/context/i18n';
import { useEffect, useState } from 'react';

const heroSlides = [
  {
    src: '/images/hero1.png',
    aiHint: 'farmer field sunrise',
    titleKey: 'hero_title',
    subtitleKey: 'hero_subtitle',
  },
  {
    src: '/images/hero2.png',
    aiHint: 'agricultural trade market',
    titleKey: 'hero_title_2',
    subtitleKey: 'hero_subtitle_2',
  },
  {
    src: '/images/hero3.png',
    aiHint: 'fresh produce export logistics',
    titleKey: 'hero_title_3',
    subtitleKey: 'hero_subtitle_3',
  },
];

export default function HeroSlider() {
  const { t } = useI18n();
  const [plugin, setPlugin] = useState<any>(null);

  useEffect(() => {
    const autoplay = Autoplay({
      delay: 5000,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    });
    setPlugin(() => autoplay);
  }, []);

  return (
    <section className="relative w-full h-[90vh] lg:h-screen overflow-hidden">
      <Carousel
        opts={{ loop: true }}
        plugins={plugin ? [plugin] : []}
        className="relative w-full h-full"
      >
        <CarouselContent className="flex h-full transition-transform duration-700 ease-in-out">
          {heroSlides.map((slide, index) => (
            <CarouselItem
              key={index}
              className="flex-1 relative h-full shrink-0 grow-0 basis-full transition-opacity duration-700 ease-in-out"
            >
              <Image
                src={slide.src}
                alt={t(slide.titleKey) || 'Hero image'}
                fill
                className="object-cover transition-opacity duration-700 ease-in-out"
                priority={index === 0}
              />
              <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center px-4">
                <div className="max-w-3xl text-white">
                  <h1 className="text-3xl md:text-5xl font-headline font-bold tracking-tight">
                    {t(slide.titleKey)}
                  </h1>
                  <p className="mt-4 text-lg text-primary-foreground/90">
                    {t(slide.subtitleKey)}
                  </p>
                  <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      asChild
                      size="lg"
                      className="bg-accent hover:bg-accent/90 text-accent-foreground"
                    >
                      <Link href="#featured-auctions">{t('browse_auctions')}</Link>
                    </Button>
                    <Button asChild size="lg" variant="secondary">
                      <Link href="/signup">{t('become_a_producer')}</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10 hidden md:flex" />
        <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10 hidden md:flex" />
      </Carousel>
    </section>
  );
}
