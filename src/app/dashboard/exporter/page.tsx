
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { PackageCheck, UploadCloud, List } from "lucide-react"
import { useI18n } from "@/context/i18n";
import Link from 'next/link';

const exportShipments = [
    { id: 'EXP-001', product: 'Kopi Arabika Gayo', product_id: 'Kopi Arabika Gayo', destination: 'USA', destination_id: 'AS', status: 'In Transit', status_id: 'Dalam Perjalanan' },
    { id: 'EXP-002', product: 'Minyak Kelapa Sawit', product_id: 'Minyak Kelapa Sawit', destination: 'Netherlands', destination_id: 'Belanda', status: 'Delivered', status_id: 'Terkirim' },
]

export default function ExporterDashboardPage() {
    const { t, language } = useI18n();

    const getStatusVariant = (status: string) => {
        const s = status.toLowerCase();
        if (['active', 'winning', 'in transit', 'verified', 'dalam perjalanan'].includes(s)) return 'default';
        if (['ended', 'won', 'delivered', 'terkirim'].includes(s)) return 'secondary';
        if (['pending', 'outbid', 'suspended'].includes(s)) return 'destructive';
        return 'outline';
    }

    const getStatusText = (shipment: typeof exportShipments[0]) => {
        const key = `status_${shipment.status.toLowerCase().replace(/ /g, '_')}`;
        return t(key, language === 'id' ? shipment.status_id : shipment.status);
    }

    return (
        <>
            <header className="mb-8">
                <h1 className="text-4xl font-bold font-headline">{t('exporter_dashboard_title')}</h1>
                <p className="text-muted-foreground">{t('exporter_dashboard_desc')}</p>
            </header>
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">{t('my_shipments')}</CardTitle>
                    <CardDescription>{t('exporter_dashboard_desc')}</CardDescription>
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
                                        <Button variant="ghost" size="sm"><PackageCheck className="mr-2"/>{t('track')}</Button>
                                    </TableCell>
                                </TableRow>
                           ))}
                        </TableBody>
                     </Table>
                </CardContent>
            </Card>
        </>
    )
}

    