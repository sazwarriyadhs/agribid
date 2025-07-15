
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useI18n } from "@/context/i18n";
import { useAuth } from "@/context/auth";
import { Globe, Package, Plane, FileText, Trophy, Truck } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const internationalOrders = [
    { id: 'EXP-001', product: 'Kopi Arabika Gayo', product_id: 'Kopi Arabika Gayo', destination: 'USA', destination_id: 'AS', status: 'In Transit', status_id: 'Dalam Perjalanan', value: 15000 },
    { id: 'EXP-002', product: 'Minyak Kelapa Sawit', product_id: 'Minyak Kelapa Sawit', destination: 'Netherlands', destination_id: 'Belanda', status: 'Delivered', status_id: 'Terkirim', value: 25000 },
    { id: 'EXP-003', product: 'Udang Beku', product_id: 'Udang Beku', destination: 'Japan', destination_id: 'Jepang', status: 'Pending Shipment', status_id: 'Menunggu Pengiriman', value: 18000 },
];

export default function InternationalBuyerDashboardPage() {
    const { t, language, formatCurrency } = useI18n();
    const { user } = useAuth();
    
    const pageTitle = t('international_buyer_dashboard_title');
    
    const welcomeMessage = user?.country 
        ? t('international_buyer_dashboard_desc_country', { country: user.country })
        : t('international_buyer_dashboard_desc');
    
    const getStatusVariant = (status: string) => {
        const s = status.toLowerCase();
        if (['in transit', 'dalam perjalanan'].includes(s)) return 'default';
        if (['delivered', 'terkirim'].includes(s)) return 'secondary';
        if (['pending shipment', 'menunggu pengiriman'].includes(s)) return 'destructive';
        return 'outline';
    };

    const getStatusText = (status: string, status_id: string) => {
        const currentStatus = language === 'id' ? status_id : status;
        const statusKey = `status_${currentStatus.toLowerCase().replace(/ /g, '_')}`;
        return t(statusKey, currentStatus);
    };

    const auctionsWon = internationalOrders.length;
    const activeShipments = internationalOrders.filter(o => o.status === 'In Transit').length;
    const totalSpent = internationalOrders.reduce((acc, order) => acc + order.value, 0);

    return (
        <>
             <header className="mb-8">
                <h1 className="text-4xl font-bold font-headline">{pageTitle}</h1>
                <p className="text-muted-foreground">{welcomeMessage}</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                       <CardTitle className="text-sm font-medium">{t('auctions_won')}</CardTitle>
                       <Trophy className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent><div className="text-2xl font-bold">{auctionsWon}</div></CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                       <CardTitle className="text-sm font-medium">{t('active_shipments', 'Active Shipments')}</CardTitle>
                       <Plane className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent><div className="text-2xl font-bold">{activeShipments}</div></CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                       <CardTitle className="text-sm font-medium">{t('total_spent')}</CardTitle>
                       <Globe className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent><div className="text-2xl font-bold">{formatCurrency(totalSpent)}</div></CardContent>
                </Card>
            </div>
            
            <Card className="mb-8">
                <CardHeader>
                    <CardTitle>{t('my_imports_title', 'My Imports')}</CardTitle>
                    <CardDescription>{t('manage_imports_desc')}</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>{t('product')}</TableHead>
                                <TableHead>{t('destination')}</TableHead>
                                <TableHead>{t('shipping_status')}</TableHead>
                                <TableHead className="text-right">{t('actions')}</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {internationalOrders.map(order => (
                                <TableRow key={order.id}>
                                    <TableCell className="font-medium">{language === 'id' ? order.product_id : order.product}</TableCell>
                                    <TableCell>{language === 'id' ? order.destination_id : order.destination}</TableCell>
                                    <TableCell>
                                        <Badge variant={getStatusVariant(language === 'id' ? order.status_id : order.status)}>
                                            {getStatusText(order.status, order.status_id)}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button asChild variant="outline" size="sm">
                                            <Link href={`/shipments/${order.id}`}>
                                                <Truck className="mr-2 h-4 w-4" /> {t('track_shipment')}
                                            </Link>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                    <CardHeader>
                        <Globe className="h-8 w-8 text-primary mb-2"/>
                        <CardTitle>{t('browse_export_commodities')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground mb-4">{t('browse_export_commodities_desc')}</p>
                        <Button asChild>
                            <Link href="/">{t('start_browsing')}</Link>
                        </Button>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <FileText className="h-8 w-8 text-primary mb-2"/>
                        <CardTitle>{t('sop_foreign_buyer_title')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground mb-4">{t('sop_foreign_buyer_desc')}</p>
                         <Button asChild variant="secondary">
                            <Link href="/sop-foreign-buyer">{t('view_sop')}</Link>
                        </Button>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <Package className="h-8 w-8 text-primary mb-2"/>
                        <CardTitle>{t('verified_producers_title')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground mb-4">{t('verified_producers_desc')}</p>
                         <Button asChild variant="secondary">
                            <Link href="/#">{t('find_producers')}</Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </>
    )
}

    