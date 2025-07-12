
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { PackageCheck, BookUser } from "lucide-react"
import { useI18n } from "@/context/i18n";
import Link from 'next/link';
import { useAuth } from "@/context/auth";
import { dashboardLabel } from "@/config/sidebar";

const exportShipments = [
    { id: 'EXP-001', product: 'Kopi Arabika Gayo', product_id: 'Kopi Arabika Gayo', destination: 'USA', destination_id: 'AS', status: 'In Transit', status_id: 'Dalam Perjalanan' },
    { id: 'EXP-002', product: 'Minyak Kelapa Sawit', product_id: 'Minyak Kelapa Sawit', destination: 'Netherlands', destination_id: 'Belanda', status: 'Delivered', status_id: 'Terkirim' },
];

const mentoredProducers = [
    { id: 'PROD-010', name: 'Sari Tani Farm', name_id: 'Sari Tani Farm', auctions: 3, status: 'Active', status_id: 'Aktif' },
    { id: 'PROD-012', name: 'Mina Jaya Seafood', name_id: 'Mina Jaya Seafood', auctions: 7, status: 'Active', status_id: 'Aktif' },
];

export default function ExporterDashboardPage() {
    const { t, language } = useI18n();
    const { user } = useAuth();
    
    const pageTitle = user?.name ? dashboardLabel[user.name as keyof typeof dashboardLabel] || t('exporter_dashboard_title') : t('exporter_dashboard_title');

    const getStatusVariant = (status: string) => {
        const s = status.toLowerCase();
        if (['active', 'winning', 'in transit', 'verified', 'dalam perjalanan', 'aktif'].includes(s)) return 'default';
        if (['ended', 'won', 'delivered', 'terkirim', 'selesai', 'menang', 'terverifikasi'].includes(s)) return 'secondary';
        if (['pending', 'outbid', 'suspended', 'menunggu', 'kalah', 'ditangguhkan'].includes(s)) return 'destructive';
        return 'outline';
    }

    const getStatusText = (item: { status: string, status_id: string }) => {
        const currentStatus = language === 'id' ? item.status_id : item.status;
        const statusKey = `status_${currentStatus.toLowerCase().replace(/ /g, '_')}`;
        return t(statusKey, currentStatus);
    }

    return (
        <>
            <header className="mb-8">
                <h1 className="text-4xl font-bold font-headline">{pageTitle}</h1>
                <p className="text-muted-foreground">{t('exporter_dashboard_desc')}</p>
            </header>
            
            <div className="space-y-8">
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline text-2xl">{t('my_shipments')}</CardTitle>
                        <CardDescription>{t('my_shipments_desc', 'Track and manage your ongoing and completed export shipments.')}</CardDescription>
                    </CardHeader>
                    <CardContent>
                         <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>{t('product')}</TableHead>
                                    <TableHead>{t('destination')}</TableHead>
                                    <TableHead>{t('status')}</TableHead>
                                    <TableHead className="text-right">{t('actions')}</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                               {exportShipments.map((ship) => (
                                    <TableRow key={ship.id}>
                                        <TableCell className="font-medium">{language === 'id' ? ship.product_id : ship.product}</TableCell>
                                        <TableCell>{language === 'id' ? ship.destination_id : ship.destination}</TableCell>
                                        <TableCell><Badge variant={getStatusVariant(language === 'id' ? ship.status_id : ship.status)}>{getStatusText(ship)}</Badge></TableCell>
                                        <TableCell className="text-right">
                                            <Button asChild variant="ghost" size="sm">
                                                <Link href="#">
                                                    <PackageCheck className="mr-2 h-4 w-4"/>{t('track')}
                                                </Link>
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                               ))}
                            </TableBody>
                         </Table>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline text-2xl">{t('mentored_producers_title', 'Mentored Producers')}</CardTitle>
                        <CardDescription>{t('mentored_producers_desc', 'Educate and manage up to 10 producers under your guidance.')}</CardDescription>
                    </CardHeader>
                    <CardContent>
                         <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>{t('producer')}</TableHead>
                                    <TableHead>{t('successful_auctions', 'Successful Auctions')}</TableHead>
                                    <TableHead>{t('status')}</TableHead>
                                    <TableHead className="text-right">{t('actions')}</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                               {mentoredProducers.map((producer) => (
                                    <TableRow key={producer.id}>
                                        <TableCell className="font-medium">{language === 'id' ? producer.name_id : producer.name}</TableCell>
                                        <TableCell className="text-center">{producer.auctions}</TableCell>
                                        <TableCell><Badge variant={getStatusVariant(language === 'id' ? producer.status_id : producer.status)}>{getStatusText(producer)}</Badge></TableCell>
                                        <TableCell className="text-right">
                                            <Button asChild variant="ghost" size="sm">
                                                <Link href="#">
                                                    <BookUser className="mr-2 h-4 w-4"/>{t('educate_manage', 'Educate & Manage')}
                                                </Link>
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                               ))}
                            </TableBody>
                         </Table>
                    </CardContent>
                </Card>
            </div>
        </>
    )
}
