
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { UploadCloud, PackageCheck, List } from "lucide-react"
import { useI18n } from "@/context/i18n";
import Link from 'next/link';

const exportShipments = [
    { id: 'EXP-001', product: 'Kopi Arabika Gayo', product_id: 'Kopi Arabika Gayo', destination: 'USA', destination_id: 'AS', status: 'In Transit', status_id: 'Dalam Perjalanan' },
    { id: 'EXP-002', product: 'Minyak Kelapa Sawit', product_id: 'Minyak Kelapa Sawit', destination: 'Netherlands', destination_id: 'Belanda', status: 'Delivered', status_id: 'Terkirim' },
]

export default function ExporterDashboardPage() {
    const { t, language } = useI18n();

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
        return t(key as any, status);
    }

    return (
        <div className="container mx-auto px-4 py-8 md:py-12">
            <header className="mb-8">
                <h1 className="text-4xl font-bold font-headline">{t('exporter_dashboard_title')}</h1>
                <p className="text-muted-foreground">{t('exporter_dashboard_desc')}</p>
            </header>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle className="font-headline text-2xl">{t('my_shipments')}</CardTitle>
                        <CardDescription>{t('exporter_dashboard_desc')}</CardDescription>
                    </div>
                     <div className="flex gap-2">
                         <Button variant="outline"><List className="mr-2"/>{t('browse_export_commodities')}</Button>
                         <Button asChild>
                            <Link href="/export-partner">
                                <UploadCloud className="mr-2"/>{t('upload_documents')}
                            </Link>
                         </Button>
                    </div>
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
                                    <TableCell><Badge variant={getStatusVariant(ship.status)}>{getStatusText(language === 'id' ? ship.status_id : ship.status)}</Badge></TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="sm"><PackageCheck className="mr-2"/>{t('track')}</Button>
                                    </TableCell>
                                </TableRow>
                           ))}
                        </TableBody>
                     </Table>
                </CardContent>
            </Card>
        </div>
    )
}
