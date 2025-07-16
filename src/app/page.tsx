
'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tractor, Wheat, Fish, Handshake, Search, Gavel, Plane, Crown, ArrowLeft, ArrowRight } from 'lucide-react';
import { useI18n } from '@/context/i18n';
import { MembershipBenefits } from '@/components/membership-benefits';
import { GlobalDemand } from '@/components/global-demand';
import HeroSlider from '@/components/hero-slider';
import { DirectFromProducer } from '@/components/direct-from-producer';
import { InternationalDemand } from '@/components/international-demand';
import CategoryGrid from '@/components/category-grid';
import { FeaturedProcessedProducts } from '@/components/featured-processed-products';


// TODO: Connect to the database and fetch real data.
// This is placeholder data based on user's database query.
const allActiveAuctions = [
    {
      id: '1',
      name: 'Lelang Cabai Organik',
      name_id: 'Lelang Cabai Organik',
      image: 'https://placehold.co/600x400.png',
      aiHint: 'organic chili',
      seller: 'Petani Lokal',
      seller_id: 'Petani Lokal',
      currentBid: 30000,
      bidders: [],
      category: 'Pertanian'
    },
    {
      id: '2',
      name: 'Lelang Jagung Manis',
      name_id: 'Lelang Jagung Manis',
      image: 'https://placehold.co/600x400.png',
      aiHint: 'sweet corn',
      seller: 'Petani Lokal',
      seller_id: 'Petani Lokal',
      currentBid: 15000,
      bidders: [],
      category: 'Pertanian'
    },
    {
      id: '5',
      name: 'Lelang Telur Ayam Kampung',
      name_id: 'Lelang Telur Ayam Kampung',
      image: 'https://placehold.co/600x400.png',
      aiHint: 'free range eggs',
      seller: 'Peternak Lokal',
      seller_id: 'Peternak Lokal',
      currentBid: 20000,
      bidders: [],
      category: 'Peternakan'
    },
    {
      id: '6',
      name: 'Lelang Sayur Bayam Organik',
      name_id: 'Lelang Sayur Bayam Organik',
      image: 'https://placehold.co/600x400.png',
      aiHint: 'organic spinach',
      seller: 'Petani Lokal',
      seller_id: 'Petani Lokal',
      currentBid: 10000,
      bidders: [],
      category: 'Pertanian'
    },
     {
      id: '12',
      name: 'Lelang Ikan Tuna Segar',
      name_id: 'Lelang Ikan Tuna Segar',
      image: 'https://placehold.co/600x400.png',
      aiHint: 'fresh tuna fish',
      seller: 'Nelayan Sejahtera',
      seller_id: 'Nelayan Sejahtera',
      currentBid: 55000,
      bidders: [],
      category: 'Perikanan'
    },
    {
      id: '8',
      name: 'Lelang Padi IR64',
      name_id: 'Lelang Padi IR64',
      image: 'https://placehold.co/600x400.png',
      aiHint: 'rice paddy',
      seller: 'Petani Lokal',
      seller_id: 'Petani Lokal',
      currentBid: 40000,
      bidders: [],
      category: 'Pertanian'
    },
    {
      id: '12',
      name: 'Lelang Ikan Nila Segar',
      name_id: 'Lelang Ikan Nila Segar',
      image: 'https://placehold.co/600x400.png',
      aiHint: 'fresh tilapia fish',
      seller: 'Nelayan Lokal',
      seller_id: 'Nelayan Lokal',
      currentBid: 25000,
      bidders: [],
      category: 'Perikanan'
    },
    {
      id: '13',
      name: 'Lelang Udang Windu Beku',
      name_id: 'Lelang Udang Windu Beku',
      image: 'https://placehold.co/600x400.png',
      aiHint: 'frozen tiger prawn',
      seller: 'Nelayan Lokal',
      seller_id: 'Nelayan Lokal',
      currentBid: 78000,
      bidders: [],
      category: 'Perikanan'
    },
    {
      id: '10',
      name: 'Lelang Tomat Merah Segar',
      name_id: 'Lelang Tomat Merah Segar',
      image: 'https://placehold.co/600x400.png',
      aiHint: 'fresh tomatoes',
      seller: 'Petani Lokal',
      seller_id: 'Petani Lokal',
      currentBid: 12000,
      bidders: [],
      category: 'Pertanian'
    },
    {
      id: '3',
      name: 'Lelang Daging Sapi Segar',
      name_id: 'Lelang Daging Sapi Segar',
      image: 'https://placehold.co/600x400.png',
      aiHint: 'fresh beef',
      seller: 'Peternak Lokal',
      seller_id: 'Peternak Lokal',
      currentBid: 85000,
      bidders: [],
      category: 'Peternakan'
    },
    {
      id: '11',
      name: 'Lelang Ayam Broiler Hidup',
      name_id: 'Lelang Ayam Broiler Hidup',
      image: 'https://placehold.co/600x400.png',
      aiHint: 'live broiler chicken',
      seller: 'Peternak Lokal',
      seller_id: 'Peternak Lokal',
      currentBid: 60000,
      bidders: [],
      category: 'Peternakan'
    },
    {
      id: '14',
      name: 'Lelang Kopi Arabika Gayo',
      name_id: 'Lelang Kopi Arabika Gayo',
      image: 'https://placehold.co/600x400.png',
      aiHint: 'arabica coffee beans',
      seller: 'Petani Kopi',
      seller_id: 'Petani Kopi',
      currentBid: 65000,
      bidders: [],
      category: 'Perkebunan'
    },
    {
      id: '15',
      name: 'Lelang Kakao Kering Fermentasi',
      name_id: 'Lelang Kakao Kering Fermentasi',
      image: 'https://placehold.co/600x400.png',
      aiHint: 'fermented dried cocoa beans',
      seller: 'Petani Kakao',
      seller_id: 'Petani Kakao',
      currentBid: 72000,
      bidders: [],
      category: 'Perkebunan'
    }
];

const categories = [
    { key: "all", label: "All Categories" },
    { key: "Pertanian", label: "Pertanian" },
    { key: "Peternakan", label: "Peternakan" },
    { key: "Perikanan", label: "Perikanan" },
    { key: "Perkebunan", label: "Perkebunan" },
    { key: "Hasil Hutan", label: "Hasil Hutan" }
];

const productCategories = [
    { category: "Beras", image_url: "https://placehold.co/400x300.png", aiHint: "rice field" },
    { category: "Sayuran", image_url: "https://placehold.co/400x300.png", aiHint: "fresh vegetables" },
    { category: "Buah", image_url: "https://placehold.co/400x300.png", aiHint: "tropical fruits" },
    { category: "Ikan", image_url: "https://placehold.co/400x300.png", aiHint: "fresh fish" },
    { category: "Daging", image_url: "https://placehold.co/400x300.png", aiHint: "raw meat" },
    { category: "Kopi", image_url: "https://placehold.co/400x300.png", aiHint: "coffee beans" },
    { category: "Rempah", image_url: "https://placehold.co/400x300.png", aiHint: "spices market" },
    { category: "Kelapa Sawit", image_url: "https://placehold.co/400x300.png", aiHint: "palm oil" }
];


const ITEMS_PER_PAGE = 6;

export default function Home() {
  const { t, formatCurrency, language } = useI18n();
  // const allActiveAuctions = productDatabase.getProductsByStatus('Active'); // Replaced with placeholder

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredAuctions = useMemo(() => {
    // TODO: Implement search and filter logic with database query.
    return allActiveAuctions.filter(item => {
      const nameMatches = language === 'id'
        ? item.name_id.toLowerCase().includes(searchTerm.toLowerCase())
        : item.name.toLowerCase().includes(searchTerm.toLowerCase());
      
      const categoryMatches = selectedCategory === 'All Categories' || item.category === selectedCategory;

      return nameMatches && categoryMatches;
    });
  }, [allActiveAuctions, searchTerm, selectedCategory, language]);

  const totalPages = Math.ceil(filteredAuctions.length / ITEMS_PER_PAGE);
  const paginatedAuctions = filteredAuctions.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const getHighestBidder = (bidders: {name: string, bid: number, avatar: string}[]) => {
    if (!bidders || bidders.length === 0) return null;
    return bidders.sort((a, b) => b.bid - a.bid)[0];
  };

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

  return (
    <div className="flex flex-col">
      <HeroSlider />

      <section id="featured-auctions" className="py-12 md:py-24 bg-background">
        <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold text-center font-headline">{t('featured_auctions')}</h2>
            <p className="text-center text-muted-foreground mt-2 mb-8">{t('featured_auctions_subtitle')}</p>
            
            <div className="max-w-3xl mx-auto mb-12 grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input 
                    placeholder={t('find_products_desc')}
                    className="md:col-span-2 text-base"
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setCurrentPage(1); // Reset to first page on search
                    }}
                />
                <Select onValueChange={(value) => {
                    setSelectedCategory(value);
                    setCurrentPage(1); // Reset to first page on category change
                }} value={selectedCategory}>
                    <SelectTrigger>
                        <SelectValue placeholder={t('select_category_placeholder')} />
                    </SelectTrigger>
                    <SelectContent>
                        {categories.map((cat) => (
                           <SelectItem key={cat.key} value={cat.label}>
                                {cat.key === 'all' ? t('all_categories', 'All Categories') : t(cat.label.toLowerCase() as any, cat.label)}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {paginatedAuctions.map((item) => {
                    const highestBidder = getHighestBidder(item.bidders || []);
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
             {filteredAuctions.length === 0 && (
                <div className="text-center py-16 text-muted-foreground">
                    <p className="text-lg font-medium">{t('no_auctions_found', 'No auctions found.')}</p>
                    <p>{t('try_different_search', 'Try adjusting your search or category filters.')}</p>
                </div>
            )}

            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-4 mt-12">
                    <Button 
                        variant="outline" 
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" /> {t('previous_page', 'Previous')}
                    </Button>
                    <span className="text-sm font-medium">
                        {t('page_info', 'Page {{currentPage}} of {{totalPages}}', {currentPage, totalPages})}
                    </span>
                    <Button 
                        variant="outline" 
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                    >
                        {t('next_page', 'Next')} <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            )}
        </div>
      </section>

      <InternationalDemand />

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

      <section className="py-16 md:py-24 bg-background">
        <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold text-center font-headline">{t('browse_by_category')}</h2>
            <p className="text-center text-muted-foreground mt-2 mb-12">{t('browse_by_category_subtitle')}</p>
            <CategoryGrid categories={productCategories} onCategorySelect={setSelectedCategory} />
        </div>
      </section>
      
      <DirectFromProducer />

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
