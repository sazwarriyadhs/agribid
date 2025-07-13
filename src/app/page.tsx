
'use client'

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tractor, Wheat, Fish, Handshake, Search, Gavel, Plane, Crown } from 'lucide-react';
import { useI18n } from '@/context/i18n';
import { FeaturedCommodities } from '@/components/featured-commodities';
import { FeaturedProcessedProducts } from '@/components/featured-processed-products';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Autoplay from "embla-carousel-autoplay";
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { MembershipBenefits } from '@/components/membership-benefits';
import { GlobalDemand } from '@/components/global-demand';

const heroSlides = [
  {
    src: '/images/hero1.jpeg',
    aiHint: 'farm sunset',
    titleKey: 'hero_title',
    subtitleKey: 'hero_subtitle'
  },
  {
    src: '/images/hero2.jpeg',
    aiHint: 'rice paddy',
    titleKey: 'hero_title_2',
    subtitleKey: 'hero_subtitle_2'
  },
  {
    src: '/images/hero3.jpeg',
    aiHint: 'fishing boat',
    titleKey: 'hero_title_3',
    subtitleKey: 'hero_subtitle_3'
  }
];

const featuredAuctions = [
    {
      id: '1',
      name: 'Organic Wheat Harvest',
      name_id: 'Panen Gandum Organik',
      image: 'https://placehold.co/600x400.png',
      aiHint: 'wheat field',
      seller: 'Green Valley Farms',
      seller_id: 'Green Valley Farms',
      currentBid: 4500,
      bidders: [
        { name: 'Bakery Co.', bid: 4500, avatar: 'B' },
        { name: 'Mill & Co.', bid: 4400, avatar: 'M' },
        { name: 'Artisan Breads', bid: 4300, avatar: 'A' },
      ],
    },
    {
      id: '2',
      name: 'Fresh Atlantic Salmon',
      name_id: 'Salmon Atlantik Segar',
      image: 'https://placehold.co/600x400.png',
      aiHint: 'salmon seafood',
      seller: 'Ocean Fresh',
      seller_id: 'Ocean Fresh',
      currentBid: 1200,
      bidders: [
        { name: 'Seafood World', bid: 1200, avatar: 'S' },
        { name: 'Fine Dining Group', bid: 1150, avatar: 'F' },
        { name: 'Sushi Express', bid: 1100, avatar: 'S' },
      ],
    },
    {
      id: '3',
      name: 'Palm Oil Kernels',
      name_id: 'Biji Kelapa Sawit',
      image: 'https://placehold.co/600x400.png',
      aiHint: 'palm oil plantation',
      seller: 'Nusantara Palms',
      seller_id: 'Nusantara Palms',
      currentBid: 850,
      bidders: [
        { name: 'Bio-Fuels Inc.', bid: 850, avatar: 'B' },
        { name: 'Commodity Traders', bid: 800, avatar: 'C' },
      ],
    },
];

const howItWorks = [
    {
        icon: Search,
        title: "find_products_title",
        description: "find_products_desc"
    },
    {
        icon: Gavel,
        title: "place_bids_title",
        description: "place_bids_desc"
    },
    {
        icon: Plane,
        title: "win_ship_title",
        description: "win_ship_desc"
    }
];

export default function Home() {
  const { t, formatCurrency, language } = useI18n();

  const getHighestBidder = (bidders: {name: string, bid: number, avatar: string}[]) => {
    if (!bidders || bidders.length === 0) return null;
    return bidders.sort((a, b) => b.bid - a.bid)[0];
  };

  return (
    <div className="flex flex-col">
       <section className="w-full text-white">
        <Carousel
          opts={{ loop: true }}
          plugins={[Autoplay({ delay: 5000, stopOnInteraction: false })]}
          className="w-full"
        >
          <CarouselContent className="aspect-[3/4] lg:aspect-video">
            {heroSlides.map((slide, index) => (
              <CarouselItem key={index} className="relative">
                <div className="relative w-full h-full">
                  <Image
                    src={slide.src}
                    alt={t(slide.titleKey as any)}
                    data-ai-hint={slide.aiHint}
                    fill
                    className="object-cover brightness-50"
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center bg-black/40 p-8">
                    <div className="max-w-3xl">
                      <h1 className="text-3xl md:text-5xl font-headline font-bold tracking-tight">
                        {t(slide.titleKey as any)}
                      </h1>
                      <p className="mt-4 text-lg text-primary-foreground/90">
                        {t(slide.subtitleKey as any)}
                      </p>
                      <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
                        <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                          <Link href="#featured-auctions">{t('browse_auctions')}</Link>
                        </Button>
                        <Button asChild size="lg" variant="secondary">
                          <Link href="/signup">{t('become_a_producer')}</Link>
                        </Button>
                      </div>
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

      <section id="featured-auctions" className="py-16 md:py-24 bg-background relative z-10 mt-[-20px] md:mt-[-40px]">
        <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold text-center font-headline">{t('featured_auctions')}</h2>
            <p className="text-center text-muted-foreground mt-2 mb-12">{t('featured_auctions_subtitle')}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredAuctions.map((item) => {
                    const highestBidder = getHighestBidder(item.bidders);
                    return (
                        <Card key={item.id} className="overflow-hidden flex flex-col">
                            <div className="aspect-video overflow-hidden">
                                <Image
                                    src={item.image}
                                    alt={language === 'id' ? item.name_id : item.name}
                                    data-ai-hint={item.aiHint}
                                    width={600}
                                    height={400}
                                    className="w-full h-full object-cover transition-transform hover:scale-105"
                                />
                            </div>
                            <CardHeader>
                                <CardTitle className="font-headline text-xl h-14">{language === 'id' ? item.name_id : item.name}</CardTitle>
                                <div className="flex justify-between items-center text-sm text-muted-foreground">
                                    <span>{t('sold_by')}: <span className="font-medium text-primary">{language === 'id' ? item.seller_id : item.seller}</span></span>
                                </div>
                            </CardHeader>
                            <CardContent className="flex-grow">
                                <div className="space-y-2">
                                     <div>
                                        <p className="text-sm text-muted-foreground">{t('current_bid')}</p>
                                        <p className="text-2xl font-bold text-primary">{formatCurrency(item.currentBid)}</p>
                                    </div>
                                    {highestBidder && (
                                        <div>
                                            <p className="text-sm text-muted-foreground">{t('highest_bid')}</p>
                                            <div className="flex items-center gap-2">
                                                <Avatar className="h-6 w-6 text-xs">
                                                    <AvatarFallback>{highestBidder.avatar}</AvatarFallback>
                                                </Avatar>
                                                <span className="font-semibold">{highestBidder.name}</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button asChild className="w-full">
                                    <Link href={`/auctions/${item.id}`}>{t('view_auction')}</Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    );
                })}
            </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-secondary/50">
        <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold text-center font-headline">{t('how_it_works_title')}</h2>
            <p className="text-center text-muted-foreground mt-2 mb-12">{t('how_it_works_subtitle')}</p>
            <div className="grid md:grid-cols-3 gap-8 text-center">
                {howItWorks.map((step, index) => (
                    <div key={index} className="flex flex-col items-center">
                        <div className="bg-primary/10 p-4 rounded-full mb-4">
                           <step.icon className="h-10 w-10 text-primary" />
                        </div>
                        <h3 className="text-xl font-bold font-headline">{t(step.title as any)}</h3>
                        <p className="text-muted-foreground mt-2">{t(step.description as any)}</p>
                    </div>
                ))}
            </div>
        </div>
      </section>

      <FeaturedCommodities />
      <FeaturedProcessedProducts />

      <section className="py-16 md:py-24 bg-background">
          <div className="container px-4 md:px-6 text-center">
              <div className="inline-block bg-primary/10 p-4 rounded-full mb-4">
                  <Crown className="h-12 w-12 text-primary" />
              </div>
              <h2 className="text-3xl font-bold font-headline">{t('export_feature_title')}</h2>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">{t('export_feature_desc')}</p>
              <Button asChild size="lg" className="mt-6">
                  <Link href="/export-partner">{t('learn_more_and_apply')}</Link>
              </Button>
          </div>
      </section>

      <MembershipBenefits />
      <GlobalDemand />

    </div>
  );
}
