
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Gavel, Trophy, Banknote, Package } from "lucide-react"
import { useI18n } from "@/context/i18n";
import Link from "next/link";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useAuth } from "@/context/auth";
import { dashboardLabel } from "@/config/sidebar";

const buyerHistory = [
  { id: '1', item: 'Organic Wheat Harvest', item_id: 'Panen Gandum Organik', status: 'Winning', status_id: 'Unggul', amount: 4500 },
  { id: '2', item: 'Fresh Atlantic Salmon', item_id: 'Salmon Atlantik Segar', status: 'Won', status_id: 'Menang', amount: 1200 },
  { id: '3', item: 'Palm Oil Kernels', item_id: 'Biji Kelapa Sawit', status: 'Outbid', status_id: 'Kalah', amount: 850 },
  { id: '4', item: 'Granny Smith Apples', item_id: 'Apel Granny Smith', status: 'Won', status_id: 'Menang', amount: 800 },
];

export default function BuyerDashboardPage() {
    const { t, formatCurrency, language } = useI18n();
    const { user } = useAuth();

    const pageTitle = user?.name ? dashboardLabel[user.name as keyof typeof dashboardLabel] || t('buyer_dashboard_title') : t('buyer_dashboard_title');


    const getStatusVariant = (status: string) => {
        const s = status.toLowerCase();
        if (['active', 'winning', 'verified', 'unggul'].includes(s)) return 'default';
        if (['ended', 'won', 'delivered', 'menang', 'selesai', 'terverifikasi', 'terkirim'].includes(s)) return 'secondary';
        if (['pending', 'outbid', 'suspended', 'kalah', 'menunggu', 'ditangguhkan'].includes(s)) return 'destructive';
        return 'outline';
    }

    const getStatusText = (bid: typeof buyerHistory[0]) => {
        const statusKey = `status_${(language === 'id' ? bid.status_id : bid.status).toLowerCase().replace(/ /g, '_')}`;
        return t(statusKey, language === 'id' ? bid.status_id : bid.status);
    }
    
    const totalSpent = buyerHistory
        .filter(bid => ['Won', 'Menang'].includes(bid.status) || ['Won', 'Menang'].includes(bid.status_id))
        .reduce((acc, bid) => acc + bid.amount, 0);
    
    const auctionsWon = buyerHistory.filter(bid => ['Won', 'Menang'].includes(bid.status) || ['Won', 'Menang'].includes(bid.status_id)).length;
    const activeBids = buyerHistory.filter(bid => ['Winning', 'Unggul'].includes(bid.status) || ['Winning', 'Unggul'].includes(bid.status_id)).length;


    return (
        <>
             <header className="mb-8">
                <h1 className="text-4xl font-bold font-headline">{pageTitle}</h1>
                <p className="text-muted-foreground">{t('buyer_dashboard_desc', 'Track your bids and auction activity.')}</p>
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
                           <CardContent><div className="text-2xl font-bold">{activeBids}</div></CardContent>
                        </Card>
                         <Card>
                           <CardHeader className="flex-row items-center justify-between pb-2">
                               <CardTitle className="text-sm font-medium">{t('auctions_won')}</CardTitle>
                               <Trophy className="h-4 w-4 text-muted-foreground" />
                           </CardHeader>
                           <CardContent><div className="text-2xl font-bold">{auctionsWon}</div></CardContent>
                        </Card>
                         <Card>
                           <CardHeader className="flex-row items-center justify-between pb-2">
                               <CardTitle className="text-sm font-medium">{t('total_spent')}</CardTitle>
                               <Package className="h-4 w-4 text-muted-foreground" />
                           </CardHeader>
                           <CardContent>
                                <div className="text-2xl font-bold">{formatCurrency(totalSpent)}</div>
                           </CardContent>
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
                            {buyerHistory.map((bid) => (
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
