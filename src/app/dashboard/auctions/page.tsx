
'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useI18n } from '@/context/i18n';
import { allActiveAuctions } from '@/lib/mock-data';
import { useAuth } from '@/context/auth';

const categories = [
    { key: "all", label: "All Categories" },
    { key: "Pertanian", label: "Pertanian" },
    { key: "Peternakan", label: "Peternakan" },
    { key: "Perikanan", label: "Perikanan" },
    { key: "Perkebunan", label: "Perkebunan" },
    { key: "Hasil Hutan", label: "Hasil Hutan" }
];

const ITEMS_PER_PAGE = 9;

export default function DashboardAuctionsPage() {
  const { t, formatCurrency, language } = useI18n();
  const { user } = useAuth();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredAuctions = useMemo(() => {
    let auctions = allActiveAuctions;

    // If the user is an international buyer, only show products from exporters.
    if (user?.role === 'international_buyer') {
      auctions = allActiveAuctions.filter(item => item.sellerRole === 'exporter');
    }

    return auctions.filter(item => {
      const nameMatches = language === 'id'
        ? item.name_id.toLowerCase().includes(searchTerm.toLowerCase())
        : item.name.toLowerCase().includes(searchTerm.toLowerCase());
      
      const categoryMatches = selectedCategory === 'All Categories' || item.category === selectedCategory;

      return nameMatches && categoryMatches;
    });
  }, [allActiveAuctions, searchTerm, selectedCategory, language, user]);

  const totalPages = Math.ceil(filteredAuctions.length / ITEMS_PER_PAGE);
  const paginatedAuctions = filteredAuctions.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const getHighestBidder = (bidders: {name: string, bid: number, avatar: string}[]) => {
    if (!bidders || bidders.length === 0) return null;
    return bidders.sort((a, b) => b.bid - a.bid)[0];
  };

  return (
    <>
        <header>
            <h1 className="text-3xl font-bold tracking-tight">{t('auctions')}</h1>
            <p className="text-muted-foreground">{t('featured_auctions_subtitle')}</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input 
                placeholder={t('find_products_desc')}
                className="md:col-span-2 text-base"
                value={searchTerm}
                onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                }}
            />
            <Select onValueChange={(value) => {
                setSelectedCategory(value);
                setCurrentPage(1);
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
                                <span>{t(item.sellerRole === 'exporter' ? 'exporter' : 'sold_by')}: <span className="font-medium text-primary">{language === 'id' ? item.seller_id : item.seller}</span></span>
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
            <div className="text-center py-16 text-muted-foreground col-span-full">
                <p className="text-lg font-medium">{t('no_auctions_found', 'No auctions found.')}</p>
                <p>{t('try_different_search', 'Try adjusting your search or category filters.')}</p>
            </div>
        )}

        {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-8 col-span-full">
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
    </>
  );
}
