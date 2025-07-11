'use client'

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tractor, Wheat, Fish, Handshake, Search, Gavel, Plane } from 'lucide-react';
import { useI18n } from '@/context/i18n';
import { FeaturedCommodities } from '@/components/featured-commodities';
import { FeaturedProcessedProducts } from '@/components/featured-processed-products';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Autoplay from "embla-carousel-autoplay";

const heroSlides = [
    {
        src: 'https://placehold.co/1920x1080.png',
        aiHint: 'farm sunset',
        titleKey: 'hero_title',
        subtitleKey: 'hero_subtitle'
    },
    {
        src: 'https://placehold.co/1920x1080.png',
        aiHint: 'rice paddy',
        titleKey: 'hero_title_2',
        subtitleKey: 'hero_subtitle_2'
    },
    {
        src: 'https://placehold.co/1920x1080.png',
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
    currentBid: 4500,
    category: 'Grains',
    category_id: 'Biji-bijian',
  },
  {
    id: '2',
    name: 'Fresh Atlantic Salmon',
    name_id: 'Salmon Atlantik Segar',
    image: 'https://placehold.co/600x400.png',
    aiHint: 'fresh salmon',
    currentBid: 1200,
    category: 'Marine Fishery',
    category_id: 'Perikanan Laut',
  },
  {
    id: '3',
    name: 'Palm Oil Kernels',
    name_id: 'Biji Kelapa Sawit',
    image: 'https://placehold.co/600x400.png',
    aiHint: 'palm oil plantation',
    currentBid: 800,
    category: 'Plantation',
    category_id: 'Perkebunan',
  },
    {
    id: '4',
    name: 'Teak Wood Logs',
    name_id: 'Kayu Jati Gelondongan',
    image: 'https://placehold.co/600x400.png',
    aiHint: 'teak wood',
    currentBid: 7800,
    category: 'Forestry Products',
    category_id: 'Hasil Hutan',
  },
  {
    id: '5',
    name: 'Freshwater Catfish',
    name_id: 'Ikan Lele Segar',
    image: 'https://placehold.co/600x400.png',
    aiHint: 'catfish farm',
    currentBid: 500,
    category: 'Inland Fishery',
    category_id: 'Perikanan Darat',
  },
  {
    id: '6',
    name: 'Granny Smith Apples',
    name_id: 'Apel Granny Smith',
    image: 'https://placehold.co/600x400.png',
    aiHint: 'apple orchard',
    currentBid: 850,
    category: 'Fruits & Vegetables',
    category_id: 'Buah & Sayuran',
  },
  {
    id: '7',
    name: 'Grass-Fed Angus Beef',
    name_id: 'Daging Sapi Angus',
    image: 'https://placehold.co/600x400.png',
    aiHint: 'cattle ranch',
    currentBid: 7800,
    category: 'Livestock',
    category_id: 'Ternak',
  },
  {
    id: '8',
    name: 'Natural Rubber Sheets',
    name_id: 'Lembaran Karet Alam',
    image: 'https://placehold.co/600x400.png',
    aiHint: 'rubber tree farm',
    currentBid: 2100,
    category: 'Plantation',
    category_id: 'Perkebunan',
  }
];

const partners = [
    { name: 'FarmFresh Logistics', logo: Tractor },
    { name: 'CropCare Fertilizers', logo: Wheat },
    { name: 'Oceanic Shipping', logo: Fish },
    { name: 'Agri-Finance Corp', logo: Handshake },
]

export default function Home() {
  const { t, formatCurrency, language } = useI18n();
  
  return (
    <div className="flex flex-col">
      <section className="relative w-full h-[60vh] md:h-[70vh] text-white">
        <Carousel 
            opts={{ loop: true }}
            plugins={[ Autoplay({ delay: 5000, stopOnInteraction: false }) ]}
            className="w-full h-full"
        >
            <CarouselContent className="h-full">
                {heroSlides.map((slide, index) => (
                    <CarouselItem key={index} className="h-full">
                        <div className="relative w-full h-full flex items-center justify-center text-center">
                            <Image
                                src={slide.src}
                                alt={t(slide.titleKey as any)}
                                data-ai-hint={slide.aiHint}
                                fill
                                className="object-cover -z-10 brightness-50"
                            />
                            <div className="container px-4 md:px-6 animate-fade-in-up">
                                <h1 className="text-4xl md:text-6xl font-headline font-bold tracking-tight">
                                    {t(slide.titleKey as any)}
                                </h1>
                                <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-primary-foreground/90">
                                    {t(slide.subtitleKey as any)}
                                </p>
                                <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                                    <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                                    <Link href="#featured-auctions">{t('browse_auctions')}</Link>
                                    </Button>
                                    <Button asChild size="lg" variant="secondary">
                                    <Link href="/signup">{t('become_a_seller')}</Link>
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

      <section id="featured-auctions" className="py-16 md:py-24 bg-background">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold text-center font-headline">{t('featured_auctions')}</h2>
          <p className="text-center text-muted-foreground mt-2 mb-12">{t('featured_auctions_subtitle')}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredAuctions.map((auction) => (
              <Card key={auction.id} className="overflow-hidden group hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="p-0">
                  <div className="relative h-48 w-full">
                    <Image src={auction.image} alt={language === 'id' ? auction.name_id : auction.name} data-ai-hint={auction.aiHint} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                    <Badge className="absolute top-2 right-2 bg-primary/80 backdrop-blur-sm">{language === 'id' ? auction.category_id : auction.category}</Badge>
                  </div>
                  <div className="p-6 pb-2">
                    <CardTitle className="text-xl font-semibold leading-snug">{language === 'id' ? auction.name_id : auction.name}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground">{t('current_bid')}</div>
                  <div className="text-2xl font-bold text-primary">{formatCurrency(auction.currentBid)}</div>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full bg-primary hover:bg-primary/90">
                    <Link href={`/auctions/${auction.id}`}>{t('view_auction')}</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <FeaturedCommodities />
      
      <FeaturedProcessedProducts />

      <section className="py-16 md:py-24 bg-background">
        <div className="container px-4 md:px-6">
           <h2 className="text-3xl font-bold text-center font-headline">{t('how_it_works_title')}</h2>
           <p className="text-center text-muted-foreground mt-2 mb-12">{t('how_it_works_subtitle')}</p>
           <div className="grid md:grid-cols-3 gap-8 text-center">
             <div className="flex flex-col items-center">
               <div className="bg-primary/10 p-4 rounded-full mb-4"><Search className="h-10 w-10 text-primary" /></div>
               <h3 className="text-xl font-semibold font-headline">{t('find_products_title')}</h3>
               <p className="text-muted-foreground mt-2">{t('find_products_desc')}</p>
             </div>
             <div className="flex flex-col items-center">
                <div className="bg-primary/10 p-4 rounded-full mb-4"><Gavel className="h-10 w-10 text-primary" /></div>
               <h3 className="text-xl font-semibold font-headline">{t('place_bids_title')}</h3>
               <p className="text-muted-foreground mt-2">{t('place_bids_desc')}</p>
             </div>
             <div className="flex flex-col items-center">
                <div className="bg-primary/10 p-4 rounded-full mb-4"><Handshake className="h-10 w-10 text-primary" /></div>
               <h3 className="text-xl font-semibold font-headline">{t('win_ship_title')}</h3>
               <p className="text-muted-foreground mt-2">{t('win_ship_desc')}</p>
             </div>
           </div>
        </div>
      </section>
      
      <section className="py-16 md:py-24 bg-secondary/50">
        <div className="container grid md:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col items-start text-left">
                <div className="bg-primary/10 p-3 rounded-full mb-4">
                    <Plane className="h-8 w-8 text-primary" />
                </div>
                <h2 className="text-3xl font-bold font-headline">{t('export_feature_title')}</h2>
                <p className="text-muted-foreground mt-4 mb-6">{t('export_feature_desc')}</p>
                <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                    <Link href="/export-partner">{t('learn_more_and_apply')}</Link>
                </Button>
            </div>
             <div className="relative h-80 rounded-xl overflow-hidden">
                <Image src="https://placehold.co/600x400.png" alt={t('export_feature_title')} data-ai-hint="cargo ship port" layout="fill" className="object-cover" />
             </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold text-center font-headline">{t('trusted_partners_title')}</h2>
          <p className="text-center text-muted-foreground mt-2 mb-12">{t('trusted_partners_subtitle')}</p>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8">
            {partners.map(p => (
                <div key={p.name} className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors">
                    <p.logo className="h-8 w-8 text-primary"/>
                    <span className="text-lg font-medium">{p.name}</span>
                </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
