'use client'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Gavel, Heart, Info, Timer } from 'lucide-react'
import { useState, useEffect } from 'react'

const auctionItem = {
  id: '1',
  name: 'Organic Wheat Harvest - 10 Tons',
  image: 'https://placehold.co/800x600.png',
  aiHint: 'wheat harvest',
  seller: 'Green Valley Farms',
  currentBid: 4500,
  startingBid: 1000,
  bidIncrement: 100,
  endDate: new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
  description: 'Premium quality organic hard red winter wheat, harvested this season. Perfect for artisan breads and high-quality flour production. Protein content: 14.5%. Moisture: 11%.',
  origin: 'Kansas, USA',
  shipping: 'FOB (Freight on Board). Buyer arranges shipping from our facility.',
}

const bidHistory = [
  { user: 'Bakery Co.', avatar: 'B', bid: 4500, time: '2 minutes ago' },
  { user: 'Mill & Co.', avatar: 'M', bid: 4400, time: '15 minutes ago' },
  { user: 'Artisan Breads', avatar: 'A', bid: 4300, time: '1 hour ago' },
  { user: 'Global Grains', avatar: 'G', bid: 4000, time: '3 hours ago' },
]

export default function AuctionPage({ params }: { params: { id: string } }) {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = auctionItem.endDate.getTime() - now;
      
      if (distance < 0) {
        clearInterval(timer);
        setTimeLeft("Auction Ended");
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      
      setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8 md:py-12">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        <div className="flex flex-col gap-4">
            <div className="aspect-video overflow-hidden rounded-xl border">
                <Image
                    src={auctionItem.image}
                    alt={auctionItem.name}
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
                    <CardTitle className="text-3xl font-bold font-headline">{auctionItem.name}</CardTitle>
                    <CardDescription>Sold by <span className="font-medium text-primary">{auctionItem.seller}</span></CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex justify-between items-center bg-primary/10 p-4 rounded-lg">
                        <div>
                            <p className="text-sm text-muted-foreground">Current Bid</p>
                            <p className="text-4xl font-bold text-primary">${auctionItem.currentBid.toLocaleString()}</p>
                        </div>
                        <div className="text-right">
                             <p className="text-sm text-muted-foreground flex items-center justify-end gap-2"><Timer className="w-4 h-4"/> Time Left</p>
                             <p className="text-2xl font-bold text-accent">{timeLeft || "Loading..."}</p>
                        </div>
                    </div>
                    <form className="grid sm:grid-cols-3 gap-3">
                        <Input 
                            type="number" 
                            placeholder={`$${auctionItem.currentBid + auctionItem.bidIncrement} or more`} 
                            className="sm:col-span-2 text-lg h-12"
                            min={auctionItem.currentBid + auctionItem.bidIncrement}
                            step={auctionItem.bidIncrement}
                        />
                        <Button size="lg" className="w-full h-12 text-lg">
                            <Gavel className="mr-2 h-5 w-5" />
                            Place Bid
                        </Button>
                    </form>
                    <div className="text-xs text-muted-foreground text-center">
                        Minimum bid increment: ${auctionItem.bidIncrement}. All bids are final.
                    </div>
                </CardContent>
                <CardFooter>
                     <Button variant="outline" className="w-full">
                        <Heart className="mr-2 h-4 w-4" /> Add to Watchlist
                    </Button>
                </CardFooter>
            </Card>

            <Tabs defaultValue="history" className="mt-8">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="history"><Gavel className="mr-2 h-4 w-4" />Bid History</TabsTrigger>
                    <TabsTrigger value="details"><Info className="mr-2 h-4 w-4" />Details</TabsTrigger>
                </TabsList>
                <TabsContent value="history">
                    <Card>
                        <CardContent className="p-0">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Bidder</TableHead>
                                        <TableHead className="text-right">Amount</TableHead>
                                        <TableHead className="text-right">Time</TableHead>
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
                                                {bid.user}
                                            </TableCell>
                                            <TableCell className="text-right font-mono">${bid.bid.toLocaleString()}</TableCell>
                                            <TableCell className="text-right text-muted-foreground">{bid.time}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="details">
                     <Card>
                        <CardContent className="pt-6 space-y-4 text-sm">
                            <p>{auctionItem.description}</p>
                            <div className="grid grid-cols-2 gap-4 border-t pt-4">
                                <div>
                                    <p className="font-medium text-muted-foreground">Origin</p>
                                    <p>{auctionItem.origin}</p>
                                </div>
                                 <div>
                                    <p className="font-medium text-muted-foreground">Starting Bid</p>
                                    <p>${auctionItem.startingBid.toLocaleString()}</p>
                                </div>
                                <div>
                                    <p className="font-medium text-muted-foreground">Shipping Terms</p>
                                    <p>{auctionItem.shipping}</p>
                                </div>
                                 <div>
                                    <p className="font-medium text-muted-foreground">Auction ID</p>
                                    <p>#{params.id}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
      </div>
    </div>
  );
}
