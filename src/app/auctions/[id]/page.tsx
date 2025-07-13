
'use client'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Gavel, Heart, Info, Timer, Banknote, Package, Clock, Shield, ShieldCheck } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useI18n } from '@/context/i18n'
import { useToast } from '@/hooks/use-toast'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { useParams } from 'next/navigation'

const initialAuctionItem = {
  id: '1',
  name: 'Organic Wheat Harvest - 10 Tons',
  name_id: 'Panen Gandum Organik - 10 Ton',
  image: 'https://placehold.co/800x600.png',
  aiHint: 'wheat harvest',
  seller: 'Green Valley Farms',
  seller_id: 'Green Valley Farms',
  currentBid: 4500,
  startingBid: 1000,
  bidIncrement: 100,
  endDate: new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
  description: 'Premium quality organic hard red winter wheat, harvested this season. Perfect for artisan breads and high-quality flour production. Protein content: 14.5%. Moisture: 11%.',
  description_id: 'Gandum musim dingin merah keras organik kualitas premium, dipanen musim ini. Sempurna untuk roti artisan dan produksi tepung berkualitas tinggi. Kadar protein: 14,5%. Kelembaban: 11%.',
  origin: 'Kansas, USA',
  origin_id: 'Kansas, AS',
  shipping: 'FOB (Freight on Board). Buyer arranges shipping from our facility.',
  shipping_id: 'FOB (Freight on Board). Pembeli mengatur pengiriman dari fasilitas kami.',
  quantity: '10 Ton',
  quantity_id: '10 Ton',
  shelfLife: 'Up to 12 months if stored properly.',
  shelfLife_id: 'Hingga 12 bulan jika disimpan dengan benar.',
  packaging: 'Packed in 50kg polypropylene bags.',
  packaging_id: 'Dikemas dalam karung polipropilena 50kg.',
  guarantee: 'Product quality is guaranteed to match the description. Full refund available if the product is not as described upon receival, subject to verification.',
  guarantee_id: 'Kualitas produk dijamin sesuai dengan deskripsi. Pengembalian dana penuh tersedia jika produk tidak sesuai deskripsi saat diterima, tergantung pada verifikasi.',
}

const initialBidHistory = [
  { user: 'Bakery Co.', avatar: 'B', bid: 4500, time: '2 minutes ago', time_id: '2 menit yang lalu' },
  { user: 'Mill & Co.', avatar: 'M', bid: 4400, time: '15 minutes ago', time_id: '15 menit yang lalu' },
  { user: 'Artisan Breads', avatar: 'A', bid: 4300, time: '1 hour ago', time_id: '1 jam yang lalu' },
  { user: 'Global Grains', avatar: 'G', bid: 4000, time: '3 hours ago', time_id: '3 jam yang lalu' },
]

export default function AuctionPage() {
  const params = useParams();
  const [timeLeft, setTimeLeft] = useState('');
  const [auctionItem, setAuctionItem] = useState(initialAuctionItem);
  const [bidHistory, setBidHistory] = useState(initialBidHistory);
  const [bidAmount, setBidAmount] = useState<number | string>('');
  const { toast } = useToast();
  const { t, formatCurrency, language } = useI18n();
  
  const minBidAmount = auctionItem.currentBid + auctionItem.bidIncrement;

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = auctionItem.endDate.getTime() - now;
      
      if (distance < 0) {
        clearInterval(timer);
        setTimeLeft(t('auction_ended'));
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      
      if (language === 'id') {
        setTimeLeft(`${days}h ${hours}j ${minutes}m ${seconds}d`);
      } else {
        setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [t, language, auctionItem.endDate]);

  const handlePlaceBid = (e: React.FormEvent) => {
    e.preventDefault();

    if (!bidAmount) {
        toast({
            variant: 'destructive',
            title: t('error'),
            description: t('bid_placeholder', { amount: formatCurrency(minBidAmount) }),
        });
        return;
    }

    const bidValue = Number(bidAmount);

    if (bidValue < minBidAmount) {
        toast({
            variant: 'destructive',
            title: t('error'),
            description: t('bid_must_be_higher', { amount: formatCurrency(minBidAmount) }),
        });
        return;
    }
    
    // In a real app, this would be a server action
    // For now, we simulate the update on the client
    const newBid = {
        user: 'You',
        user_id: 'Anda',
        avatar: 'Y',
        bid: bidValue,
        time: 'Just now',
        time_id: 'Baru saja'
    };

    setAuctionItem(prev => ({ ...prev, currentBid: bidValue }));
    setBidHistory(prev => [newBid, ...prev]);
    setBidAmount(''); // Reset input

    toast({
        title: t('bid_placed_title'),
        description: t('bid_placed_desc', { amount: formatCurrency(bidValue) }),
    });
  }

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8 md:py-12">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        <div className="flex flex-col gap-4">
            <div className="aspect-video overflow-hidden rounded-xl border">
                <Image
                    src={auctionItem.image}
                    alt={language === 'id' ? auctionItem.name_id : auctionItem.name}
                    data-ai-hint={auctionItem.aiHint}
                    width={800}
                    height={600}
                    className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                />
            </div>
        </div>
        <div>
            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="text-3xl font-bold font-headline">{language === 'id' ? auctionItem.name_id : auctionItem.name}</CardTitle>
                    <CardDescription>{t('sold_by')} <span className="font-medium text-primary">{language === 'id' ? auctionItem.seller_id : auctionItem.seller}</span></CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex justify-between items-center bg-primary/10 p-4 rounded-lg">
                        <div>
                            <p className="text-sm text-muted-foreground">{t('current_bid')}</p>
                            <p className="text-4xl font-bold text-primary">{formatCurrency(auctionItem.currentBid)}</p>
                        </div>
                        <div className="text-right">
                             <p className="text-sm text-muted-foreground flex items-center justify-end gap-2"><Timer className="w-4 h-4"/> {t('time_left')}</p>
                             <p className="text-2xl font-bold text-accent">{timeLeft || "Loading..."}</p>
                        </div>
                    </div>
                    <form onSubmit={handlePlaceBid} className="grid sm:grid-cols-3 gap-3">
                        <Input 
                            type="number" 
                            placeholder={t('bid_placeholder', { amount: formatCurrency(minBidAmount) })} 
                            className="sm:col-span-2 text-lg h-12"
                            value={bidAmount}
                            onChange={(e) => setBidAmount(e.target.value)}
                            min={minBidAmount}
                            step={auctionItem.bidIncrement}
                        />
                        <Button size="lg" className="w-full h-12 text-lg" type="submit">
                            <Gavel className="mr-2 h-5 w-5" />
                            {t('place_bid')}
                        </Button>
                    </form>
                    <div className="text-xs text-muted-foreground text-center">
                        {t('min_bid_increment')}: {formatCurrency(auctionItem.bidIncrement)}. {t('all_bids_final')}
                    </div>
                </CardContent>
                <CardFooter>
                     <Button variant="outline" className="w-full">
                        <Heart className="mr-2 h-4 w-4" /> {t('add_to_watchlist')}
                    </Button>
                </CardFooter>
            </Card>

            <Tabs defaultValue="details" className="mt-8">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="details"><Info className="mr-2 h-4 w-4" />{t('details')}</TabsTrigger>
                    <TabsTrigger value="history"><Gavel className="mr-2 h-4 w-4" />{t('bid_history')}</TabsTrigger>
                </TabsList>
                <TabsContent value="details">
                     <Card>
                        <CardContent className="pt-6 space-y-4 text-sm">
                            <p>{language === 'id' ? auctionItem.description_id : auctionItem.description}</p>
                            
                            <div className="border-t pt-4">
                                <h3 className="font-semibold text-base mb-2">{t('product_specifications', 'Product Specifications')}</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="flex items-start gap-3">
                                        <Package className="h-5 w-5 mt-0.5 text-primary"/>
                                        <div>
                                            <p className="font-medium text-muted-foreground">{t('quantity')}</p>
                                            <p>{language === 'id' ? auctionItem.quantity_id : auctionItem.quantity}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <Clock className="h-5 w-5 mt-0.5 text-primary"/>
                                        <div>
                                            <p className="font-medium text-muted-foreground">{t('shelf_life')}</p>
                                            <p>{language === 'id' ? auctionItem.shelfLife_id : auctionItem.shelfLife}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <Shield className="h-5 w-5 mt-0.5 text-primary"/>
                                        <div>
                                            <p className="font-medium text-muted-foreground">{t('packaging')}</p>
                                            <p>{language === 'id' ? auctionItem.packaging_id : auctionItem.packaging}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4 border-t pt-4">
                                <div>
                                    <p className="font-medium text-muted-foreground">{t('origin')}</p>
                                    <p>{language === 'id' ? auctionItem.origin_id : auctionItem.origin}</p>
                                </div>
                                 <div>
                                    <p className="font-medium text-muted-foreground">{t('starting_bid')}</p>
                                    <p>{formatCurrency(auctionItem.startingBid)}</p>
                                </div>
                                <div>
                                    <p className="font-medium text-muted-foreground">{t('shipping_terms')}</p>
                                    <p>{language === 'id' ? auctionItem.shipping_id : auctionItem.shipping}</p>
                                </div>
                                 <div>
                                    <p className="font-medium text-muted-foreground">{t('auction_id')}</p>
                                    <p>#{params.id}</p>
                                </div>
                            </div>
                             <div className="border-t pt-4">
                                <Alert>
                                    <Banknote className="h-4 w-4"/>
                                    <AlertTitle className="font-semibold">{t('payment_info_title')}</AlertTitle>
                                    <AlertDescription>
                                        {t('payment_info_desc')}
                                    </AlertDescription>
                                </Alert>
                            </div>
                            <div className="border-t pt-4">
                                <Alert variant="secondary">
                                    <ShieldCheck className="h-4 w-4"/>
                                    <AlertTitle className="font-semibold">{t('guarantee_and_warranty_title', 'Guarantee & Warranty')}</AlertTitle>
                                    <AlertDescription>
                                        {language === 'id' ? auctionItem.guarantee_id : auctionItem.guarantee}
                                    </AlertDescription>
                                </Alert>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="history">
                    <Card>
                        <CardContent className="p-0">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>{t('bidder')}</TableHead>
                                        <TableHead className="text-right">{t('amount')}</TableHead>
                                        <TableHead className="text-right">{t('time')}</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {bidHistory.map((bid, i) => (
                                        <TableRow key={i}>
                                            <TableCell className="font-medium flex items-center gap-2">
                                                <Avatar className="h-8 w-8">
                                                    <AvatarImage src={`https://placehold.co/100x100.png?text=${bid.avatar}`} />
                                                    <AvatarFallback>{bid.avatar}</AvatarFallback>
                                                </Avatar>
                                                {language === 'id' && bid.user_id ? bid.user_id : bid.user}
                                            </TableCell>
                                            <TableCell className="text-right font-mono">{formatCurrency(bid.bid)}</TableCell>
                                            <TableCell className="text-right text-muted-foreground">{language === 'id' ? bid.time_id : bid.time}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
      </div>
    </div>
  );
}
