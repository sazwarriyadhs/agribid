
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Gavel, Trophy, Banknote } from "lucide-react"
import { useI18n } from "@/context/i18n";
import Link from "next/link";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const bidderHistory = [
  { id: '1', item: 'Organic Wheat Harvest', item_id: 'Panen Gandum Organik', status: 'Winning', status_id: 'Unggul', amount: 4500 },
  { id: '2', item: 'Fresh Atlantic Salmon', item_id: 'Salmon Atlantik Segar', status: 'Won', status_id: 'Menang', amount: 1200 },
  { id: '3', item: 'Palm Oil Kernels', item_id: 'Biji Kelapa Sawit', status: 'Outbid', status_id: 'Kalah', amount: 850 },
];

export default function BidderDashboardPage() {
    const { t, formatCurrency, language } = useI18n();

    const getStatusVariant = (status: string) => {
        const s = status.toLowerCase();
        if (['active', 'winning', 'verified', 'unggul'].includes(s)) return 'default';
        if (['ended', 'won', 'delivered', 'menang', 'selesai', 'terverifikasi', 'terkirim'].includes(s)) return 'secondary';
        if (['pending', 'outbid', 'suspended', 'kalah', 'menunggu', 'ditangguhkan'].includes(s)) return 'destructive';
        return 'outline';
    }

    const getStatusText = (bid: typeof bidderHistory[0]) => {
        const statusKey = `status_${(language === 'id' ? bid.status_id : bid.status).toLowerCase().replace(/ /g, '_')}`;
        return t(statusKey, language === 'id' ? bid.status_id : bid.status);
    }

    return (
        <>
             <header className="mb-8">
                <h1 className="text-4xl font-bold font-headline">{t('bidder_dashboard_title')}</h1>
                <p className="text-muted-foreground">{t('bidder_dashboard_desc')}</p>
            </header>

             <Alert className="mb-8">
                <Banknote className="h-4 w-4"/>
                <AlertTitle className="font-semibold">{t('payment_info_title')}</AlertTitle>
                <AlertDescription>
                    {t('payment_info_desc')}
                </AlertDescription>
            </Alert>

            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">{t('recent_bid_history')}</CardTitle>
                    <CardDescription>{t('bidder_dashboard_desc')}</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <Card>
                           <CardHeader className="flex-row items-center justify-between pb-2">
                               <CardTitle className="text-sm font-medium">{t('active_bids')}</CardTitle>
                               <Gavel className="h-4 w-4 text-muted-foreground" />
                           </CardHeader>
                           <CardContent><div className="text-2xl font-bold">5</div></CardContent>
                        </Card>
                         <Card>
                           <CardHeader className="flex-row items-center justify-between pb-2">
                               <CardTitle className="text-sm font-medium">{t('auctions_won')}</CardTitle>
                               <Trophy className="h-4 w-4 text-muted-foreground" />
                           </CardHeader>
                           <CardContent><div className="text-2xl font-bold">12</div></CardContent>
                        </Card>
                         <Card>
                           <CardHeader className="flex-row items-center justify-between pb-2">
                               <CardTitle className="text-sm font-medium">{t('total_spent')}</CardTitle>
                               <CardTitle className="text-2xl font-bold">{formatCurrency(25500)}</CardTitle>
                           </CardHeader>
                        </Card>
                    </div>
                     <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>{t('item')}</TableHead>
                                <TableHead>{t('status')}</TableHead>
                                <TableHead className="text-right">{t('your_bid')}</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {bidderHistory.map((bid) => (
                                <TableRow key={bid.id}>
                                <TableCell className="font-medium">
                                    <Link href={`/auctions/${bid.id}`} className="hover:underline">
                                        {language === 'id' ? bid.item_id : bid.item}
                                    </Link>
                                </TableCell>
                                <TableCell><Badge variant={getStatusVariant(language === 'id' ? bid.status_id : bid.status)}>{getStatusText(bid)}</Badge></TableCell>
                                <TableCell className="text-right font-mono">{formatCurrency(bid.amount)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </>
    )
}
