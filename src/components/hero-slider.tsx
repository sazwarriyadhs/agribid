'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Autoplay from "embla-carousel-autoplay"
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useI18n } from '@/context/i18n';
import React from 'react';

const heroSlides = [
  {
    src: 'https://placehold.co/1920x1080.png',
    alt: 'Farmer showing produce on a laptop',
    titleKey: 'hero_title',
    subtitleKey: 'hero_subtitle',
    aiHint: 'farmer agriculture technology'
  },
  {
    src: 'https://placehold.co/1920x1080.png',
    alt: 'Indonesian rice paddy fields',
    titleKey: 'hero_title_2',
    subtitleKey: 'hero_subtitle_2',
    aiHint: 'rice paddy fields'
  },
  {
    src: 'https://placehold.co/1920x1080.png',
    alt: 'Fishing boats at sea',
    titleKey: 'hero_title_3',
    subtitleKey: 'hero_subtitle_3',
    aiHint: 'fishing boats'
  },
];


export default function HeroSlider() {
  const { t } = useI18n();

  return (
    <section className="relative w-full h-[60vh] md:h-[80vh] group" id="hero">
      <Carousel
        className="w-full h-full"
        plugins={[
          Autoplay({
            delay: 5000,
          }),
        ]}
        opts={{
          loop: true,
        }}
      >
        <CarouselContent>
          {heroSlides.map((slide, index) => (
            <CarouselItem key={index} className="h-full">
              <div className="relative w-full h-full">
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  data-ai-hint={slide.aiHint}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
                <div className="absolute inset-0 bg-black/50" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-4">
                  <h1 className="text-4xl md:text-6xl font-bold font-headline drop-shadow-lg">
                    {t(slide.titleKey)}
                  </h1>
                  <p className="mt-4 max-w-2xl text-lg md:text-xl drop-shadow-md">
                    {t(slide.subtitleKey)}
                  </p>
                  <div className="mt-8 flex gap-4">
                    <Button asChild size="lg">
                      <Link href="/#featured-auctions">{t('browse_auctions')}</Link>
                    </Button>
                    <Button asChild variant="secondary" size="lg">
                      <Link href="/sell">{t('become_a_producer')}</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
        <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
      </Carousel>
    </section>
  );
}
