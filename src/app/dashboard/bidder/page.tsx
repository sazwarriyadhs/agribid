
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Gavel, Trophy } from "lucide-react"
import { useI18n } from "@/context/i18n";

const bidderHistory = [
  { id: 'BID-001', item: 'Kopi Arabika Gayo', item_id: 'Kopi Arabika Gayo', status: 'Winning', status_id: 'Unggul', amount: 15000 },
  { id: 'BID-002', item: 'Udang Windu Super', item_id: 'Udang Windu Super', status: 'Won', status_id: 'Menang', amount: 8000 },
  { id: 'BID-003', item: 'Cokelat Batangan 70%', item_id: 'Cokelat Batangan 70%', status: 'Outbid', status_id: 'Kalah', amount: 2500 },
];

export default function BidderDashboardPage() {
    const { t, formatCurrency, language } = useI18n();

    const getStatusVariant = (status: string) => {
        switch (status.toLowerCase()) {
            case 'active':
            case 'winning':
            case 'in transit':
            case 'verified':
                return 'default';
            case 'ended':
            case 'won':
            case 'delivered':
                return 'secondary';
            case 'pending':
            case 'outbid':
                return 'destructive';
            default: 
                return 'outline';
        }
    }

    const getStatusText = (status: string) => {
        const key = `status_${status.toLowerCase().replace(/ /g, '_')}`;
        return t(key as any, { defaultValue: status });
    }

    return (
        <div className="container mx-auto px-4 py-8 md:py-12">
             <header className="mb-8">
                <h1 className="text-4xl font-bold font-headline">{t('bidder_dashboard_title')}</h1>
                <p className="text-muted-foreground">{t('bidder_dashboard_desc')}</p>
            </header>
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">My Bidding Activity</CardTitle>
                    <CardDescription>Track your bids and auction performance.</CardDescription>
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
                    <h3 className="text-lg font-semibold mb-2">{t('recent_bid_history')}</h3>
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
                                <TableCell className="font-medium">{language === 'id' ? bid.item_id : bid.item}</TableCell>
                                <TableCell><Badge variant={getStatusVariant(bid.status)}>{getStatusText(bid.status)}</Badge></TableCell>
                                <TableCell className="text-right font-mono">{formatCurrency(bid.amount)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}
