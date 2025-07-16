
'use client';
import { useI18n } from '@/context/i18n';
import { Button } from './ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Handshake, MapPin, Package, Scale, User, MessagesSquare } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { useAuth } from '@/context/auth';

const buyerRequests = [
    {
        id: 'REQ-001',
        product: 'Robusta Coffee Beans',
        product_id: 'Biji Kopi Robusta',
        buyer: {
            name: 'Global Coffee Inc.',
            country: 'USA',
            avatar: 'https://placehold.co/100x100.png?text=G',
        },
        volume: '1 x 20ft Container',
        volume_id: '1 Kontainer 20ft',
        specs: 'Grade 1, Moisture <12%',
        specs_id: 'Grade 1, Kadar Air <12%',
    },
    {
        id: 'REQ-002',
        product: 'Frozen Vannamei Shrimp',
        product_id: 'Udang Vannamei Beku',
        buyer: {
            name: 'Nippon Foods',
            country: 'Japan',
            avatar: 'https://placehold.co/100x100.png?text=N',
        },
        volume: '10 Tons',
        volume_id: '10 Ton',
        specs: 'Size 31/40, HOSO',
        specs_id: 'Ukuran 31/40, HOSO',
    },
    {
        id: 'REQ-003',
        product: 'Crude Palm Oil (CPO)',
        product_id: 'Minyak Sawit Mentah (CPO)',
        buyer: {
            name: 'Euro Oils B.V.',
            country: 'Netherlands',
            avatar: 'https://placehold.co/100x100.png?text=E',
        },
        volume: '5000 MT',
        volume_id: '5000 MT',
        specs: 'FFA < 3%, M&I < 0.25%',
        specs_id: 'ALB < 3%, K&A < 0.25%',
    }
];

export function InternationalDemand() {
  const { t, language } = useI18n();
  const { user } = useAuth();

  return (
    <section className="py-16 md:py-24 bg-secondary/50">
      <div className="container px-4 md:px-6">
        <div className="text-center">
            <h2 className="text-3xl font-bold font-headline">{t('international_demand_title', 'International Buyer Requests')}</h2>
            <p className="text-muted-foreground mt-2 mb-12 max-w-2xl mx-auto">{t('international_demand_desc', 'Fulfill demand from around the world. Here are the latest product requests from our international buyers.')}</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {buyerRequests.map((req) => (
            <Card key={req.id} className="flex flex-col">
                <CardHeader>
                    <CardTitle className="font-headline text-xl">{language === 'id' ? req.product_id : req.product}</CardTitle>
                    <CardDescription className="flex items-center gap-2">
                         <Avatar className="h-6 w-6">
                            <AvatarImage src={req.buyer.avatar} />
                            <AvatarFallback>{req.buyer.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span>{t('requested_by', 'Requested by')} <span className="font-semibold text-primary">{req.buyer.name}</span></span>
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 flex-grow">
                    <div className="flex items-center gap-3">
                        <MapPin className="h-5 w-5 text-muted-foreground"/>
                        <p><span className="font-semibold">{t('destination')}:</span> {req.buyer.country}</p>
                    </div>
                     <div className="flex items-center gap-3">
                        <Package className="h-5 w-5 text-muted-foreground"/>
                        <p><span className="font-semibold">{t('volume_required', 'Volume')}:</span> {language === 'id' ? req.volume_id : req.volume}</p>
                    </div>
                     <div className="flex items-start gap-3">
                        <Scale className="h-5 w-5 text-muted-foreground mt-0.5"/>
                        <p><span className="font-semibold">{t('specifications')}:</span> {language === 'id' ? req.specs_id : req.specs}</p>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button className="w-full" disabled={user?.role !== 'exporter'}>
                        <MessagesSquare className="mr-2 h-4 w-4" /> {t('fulfill_request', 'Fulfill Request')}
                    </Button>
                </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
