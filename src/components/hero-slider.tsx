
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
import { useEffect } from 'react';

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

  useEffect(() => {
    console.log("HeroSlider mounted");
  }, []);

  return (
    <section className="relative w-full h-[90vh] lg:h-screen text-white overflow-hidden">
      <Carousel
        opts={{ loop: true }}
        plugins={[Autoplay({ delay: 5000, stopOnInteraction: false })]}
        className="w-full h-full"
      >
        <CarouselContent className="h-full">
          {heroSlides.map((slide, index) => (
            <CarouselItem key={index} className="relative w-full h-full">
                <Image
                    src={slide.src}
                    alt={t(slide.titleKey)}
                    data-ai-hint={slide.aiHint}
                    fill
                    className="object-cover"
                    priority={index === 0}
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                    <h1 className="text-4xl md:text-6xl font-bold font-headline drop-shadow-lg">
                    {t(slide.titleKey)}
                    </h1>
                    <p className="mt-4 max-w-2xl text-lg md:text-xl drop-shadow-md">
                    {t(slide.subtitleKey)}
                    </p>
                    <div className="mt-8 flex gap-4">
                    <Button asChild size="lg">
                        <Link href="#featured-auctions">{t('browse_auctions')}</Link>
                    </Button>
                    <Button asChild size="lg" variant="secondary">
                        <Link href="/signup">{t('become_a_producer')}</Link>
                    </Button>
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
