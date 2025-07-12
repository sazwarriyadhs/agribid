
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { useI18n } from "@/context/i18n";
import Link from "next/link";

const producerProducts = [
  { id: '1', name: 'Organic Wheat Harvest', name_id: 'Panen Gandum Organik', status: 'Active', status_id: 'Aktif', stock: '10 Ton' },
  { id: '2', name: 'Fresh Atlantic Salmon', name_id: 'Salmon Atlantik Segar', status: 'Ended', status_id: 'Selesai', stock: '5 Ton' },
  { id: '3', name: 'Palm Oil Kernels', name_id: 'Biji Kelapa Sawit', status: 'Pending', status_id: 'Menunggu', stock: '20 m³' },
];

export default function ProducerDashboardPage() {
    const { t, language } = useI18n();

    const getStatusVariant = (status: string) => {
        const s = status.toLowerCase();
        if (['active', 'winning', 'verified', 'aktif'].includes(s)) return 'default';
        if (['ended', 'won', 'delivered', 'selesai', 'menang', 'terverifikasi'].includes(s)) return 'secondary';
        if (['pending', 'outbid', 'suspended', 'menunggu', 'kalah', 'ditangguhkan'].includes(s)) return 'destructive';
        return 'outline';
    }

    const getStatusText = (product: typeof producerProducts[0]) => {
        const statusKey = `status_${(language === 'id' ? product.status_id : product.status).toLowerCase().replace(/ /g, '_')}`;
        return t(statusKey, language === 'id' ? product.status_id : product.status);
    }

    return (
        <>
            <header className="mb-8">
                <h1 className="text-4xl font-bold font-headline">{t('producer_dashboard_title')}</h1>
                <p className="text-muted-foreground">{t('producer_dashboard_desc')}</p>
            </header>
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">{t('my_products')}</CardTitle>
                    <CardDescription>{t('my_products_desc')}</CardDescription>
                </CardHeader>
                <CardContent>
                <Table>
                    <TableHeader>
                    <TableRow>
                        <TableHead>{t('product')}</TableHead>
                        <TableHead>{t('status')}</TableHead>
                        <TableHead>{t('stock')}</TableHead>
                        <TableHead className="text-right">{t('actions')}</TableHead>
                    </TableRow>
                    </TableHeader>
                    <TableBody>
                    {producerProducts.map((prod) => (
                        <TableRow key={prod.id}>
                        <TableCell className="font-medium">{language === 'id' ? prod.name_id : prod.name}</TableCell>
                        <TableCell><Badge variant={getStatusVariant(language === 'id' ? prod.status_id : prod.status)}>{getStatusText(prod)}</Badge></TableCell>
                        <TableCell>{prod.stock}</TableCell>
                        <TableCell className="text-right">
                             <Button asChild variant="ghost" size="sm">
                                <Link href={`/auctions/${prod.id}`}>
                                    {t('manage')}
                                </Link>
                             </Button>
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
