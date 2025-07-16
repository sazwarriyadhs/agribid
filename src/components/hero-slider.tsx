
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
    src: 'https://placehold.co/1920x1080.png',
    aiHint: 'farmer field sunrise',
    titleKey: 'hero_title',
    subtitleKey: 'hero_subtitle',
  },
  {
    src: 'https://placehold.co/1920x1080.png',
    aiHint: 'agricultural trade market',
    titleKey: 'hero_title_2',
    subtitleKey: 'hero_subtitle_2',
  },
  {
    src: 'https://placehold.co/1920x1080.png',
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
        className="absolute inset-0 w-full h-full"
      >
        <CarouselContent className="h-full">
          {heroSlides.map((slide, index) => (
            <CarouselItem key={index} className="relative w-full h-full">
              <div className="relative w-full h-full">
                <Image
                  src={slide.src}
                  alt={t(slide.titleKey) || 'Slide image'}
                  data-ai-hint={slide.aiHint}
                  fill
                  sizes="100vw"
                  className="object-cover"
                  priority={index === 0}
                />
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
