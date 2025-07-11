'use client'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useI18n } from '@/context/i18n';
import { notFound } from 'next/navigation';


const bidHistory = [
    { id: 1, item: 'Organic Wheat Harvest', item_id: 'Panen Gandum Organik', status: 'Winning', status_id: 'Menang', amount: 4500, date: '2023-10-26' },
    { id: 2, item: 'Granny Smith Apples', item_id: 'Apel Granny Smith', status: 'Won', status_id: 'Menang', amount: 800, date: '2023-10-25' },
    { id: 3, item: 'Heirloom Tomatoes', item_id: 'Tomat Pusaka', status: 'Outbid', status_id: 'Kalah', amount: 350, date: '2023-10-24' },
    { id: 4, item: 'Pasture-Raised Eggs', item_id: 'Telur Ayam Kampung', status: 'Won', status_id: 'Menang', amount: 150, date: '2023-10-22' },
]

// In a real app, you would fetch this data based on the code/slug
const userProfile = {
    code: 'B001',
    slug: 'john-farmer',
    name: 'John Farmer',
    email: 'john.farmer@email.com',
    role: 'Bidder',
    avatarUrl: 'https://placehold.co/100x100.png',
    avatarFallback: 'JF'
}


export default function ProfilePage({ params }: { params: { code: string, slug: string } }) {
    const { t, formatCurrency, language } = useI18n();

    // In a real app, you'd fetch the user by code and slug and return 404 if not found
    if (params.code !== userProfile.code || params.slug !== userProfile.slug) {
        // For this example, we'll just show a 404 if the URL doesn't match our static user
        // notFound(); 
        // For demo purposes, we will allow it.
    }

    const getStatusVariant = (status: string) => {
        switch (status) {
            case 'Won':
            case 'Winning': 
                return 'secondary';
            case 'Outbid': 
                return 'destructive';
            default: 
                return 'outline';
        }
    }

    const getStatusText = (bid: typeof bidHistory[0]) => {
      if (language === 'id') {
        if (bid.status === 'Winning') return 'Sedang Unggul';
        if (bid.status === 'Won') return 'Menang';
        if (bid.status === 'Outbid') return 'Kalah Tawaran';
      }
      return bid.status;
    }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8 md:py-12">
      <div className="flex flex-col items-center md:flex-row md:items-start gap-8">
        <Card className="w-full md:w-1/3 text-center md:text-left">
          <CardHeader className="items-center">
            <Avatar className="h-24 w-24 mb-4">
              <AvatarImage src={userProfile.avatarUrl} />
              <AvatarFallback>{userProfile.avatarFallback}</AvatarFallback>
            </Avatar>
            <CardTitle className="text-2xl font-headline">{userProfile.name}</CardTitle>
            <CardDescription>{userProfile.email}</CardDescription>
            <Badge variant="outline" className="mt-2">{userProfile.role}</Badge>
          </CardHeader>
          <CardContent>
            <Button className="w-full">{t('edit_profile')}</Button>
          </CardContent>
        </Card>
        <div className="w-full md:w-2/3">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">{t('bid_history')}</CardTitle>
                    <CardDescription>{t('bid_history_desc')}</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                            <TableHead>{t('item')}</TableHead>
                            <TableHead>{t('status')}</TableHead>
                            <TableHead className="text-right">{t('amount')}</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {bidHistory.map((bid) => (
                                <TableRow key={bid.id}>
                                    <TableCell className="font-medium">
                                        <Link href={`/auctions/${bid.id}`} className="hover:underline">
                                            {language === 'id' ? bid.item_id : bid.item}
                                        </Link>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={getStatusVariant(bid.status)}>{getStatusText(bid)}</Badge>
                                    </TableCell>
                                    <TableCell className="text-right font-mono">{formatCurrency(bid.amount)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
