import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tractor, Wheat, Fish, Handshake, Search, Gavel } from 'lucide-react';

const featuredAuctions = [
  {
    id: '1',
    name: 'Organic Wheat Harvest',
    image: 'https://placehold.co/600x400.png',
    aiHint: 'wheat field',
    currentBid: 4500,
    category: 'Grains',
  },
  {
    id: '2',
    name: 'Fresh Atlantic Salmon',
    image: 'https://placehold.co/600x400.png',
    aiHint: 'fresh salmon',
    currentBid: 1200,
    category: 'Seafood',
  },
  {
    id: '3',
    name: 'Granny Smith Apples',
    image: 'https://placehold.co/600x400.png',
    aiHint: 'apple orchard',
    currentBid: 800,
    category: 'Fruits',
  },
    {
    id: '4',
    name: 'Grass-Fed Angus Beef',
    image: 'https://placehold.co/600x400.png',
    aiHint: 'cattle ranch',
    currentBid: 7800,
    category: 'Livestock',
  },
];

const partners = [
    { name: 'FarmFresh Logistics', logo: Tractor },
    { name: 'CropCare Fertilizers', logo: Wheat },
    { name: 'Oceanic Shipping', logo: Fish },
    { name: 'Agri-Finance Corp', logo: Handshake },
]

export default function Home() {
  return (
    <div className="flex flex-col">
      <section className="relative w-full h-[60vh] md:h-[70vh] flex items-center justify-center text-center text-white">
        <Image
          src="https://placehold.co/1920x1080.png"
          alt="Lush green field at sunset"
          data-ai-hint="farm sunset"
          fill
          className="object-cover -z-10 brightness-50"
        />
        <div className="container px-4 md:px-6 animate-fade-in-up">
          <h1 className="text-4xl md:text-6xl font-headline font-bold tracking-tight">
            The Digital Marketplace for Fresh Produce
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-primary-foreground/90">
            Connecting cultivators directly with businesses. Bid on fresh, quality agricultural goods in real-time auctions.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link href="#featured-auctions">Browse Auctions</Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <Link href="/signup">Become a Seller</Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="featured-auctions" className="py-16 md:py-24 bg-background">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold text-center font-headline">Featured Auctions</h2>
          <p className="text-center text-muted-foreground mt-2 mb-12">Get in on the action with these trending auctions.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredAuctions.map((auction) => (
              <Card key={auction.id} className="overflow-hidden group hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="p-0">
                  <div className="relative h-48 w-full">
                    <Image src={auction.image} alt={auction.name} data-ai-hint={auction.aiHint} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                    <Badge className="absolute top-2 right-2 bg-primary/80 backdrop-blur-sm">{auction.category}</Badge>
                  </div>
                  <div className="p-6 pb-2">
                    <CardTitle className="text-xl font-semibold leading-snug">{auction.name}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground">Current Bid</div>
                  <div className="text-2xl font-bold text-primary">${auction.currentBid.toLocaleString()}</div>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full bg-primary hover:bg-primary/90">
                    <Link href={`/auctions/${auction.id}`}>View Auction</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-secondary/50">
        <div className="container px-4 md:px-6">
           <h2 className="text-3xl font-bold text-center font-headline">How AgriBid Works</h2>
           <p className="text-center text-muted-foreground mt-2 mb-12">A simple, transparent, and efficient process.</p>
           <div className="grid md:grid-cols-3 gap-8 text-center">
             <div className="flex flex-col items-center">
               <div className="bg-primary/10 p-4 rounded-full mb-4"><Search className="h-10 w-10 text-primary" /></div>
               <h3 className="text-xl font-semibold font-headline">Find Products</h3>
               <p className="text-muted-foreground mt-2">Browse our diverse marketplace or search for specific goods you need.</p>
             </div>
             <div className="flex flex-col items-center">
                <div className="bg-primary/10 p-4 rounded-full mb-4"><Gavel className="h-10 w-10 text-primary" /></div>
               <h3 className="text-xl font-semibold font-headline">Place Bids</h3>
               <p className="text-muted-foreground mt-2">Enter our real-time auction rooms and place competitive bids on items.</p>
             </div>
             <div className="flex flex-col items-center">
                <div className="bg-primary/10 p-4 rounded-full mb-4"><Handshake className="h-10 w-10 text-primary" /></div>
               <h3 className="text-xl font-semibold font-headline">Win & Ship</h3>
               <p className="text-muted-foreground mt-2">Secure your products and arrange seamless logistics with our trusted partners.</p>
             </div>
           </div>
        </div>
      </section>
      
      <section className="py-16 md:py-24 bg-background">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold text-center font-headline">Our Trusted Partners</h2>
          <p className="text-center text-muted-foreground mt-2 mb-12">A network of industry leaders supporting our marketplace.</p>
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
