
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { PlusCircle, BarChart2 } from "lucide-react"
import { useI18n } from "@/context/i18n";
import Link from "next/link";

const producerProducts = [
  { id: 'PROD-001', name: 'Kopi Arabika Gayo', name_id: 'Kopi Arabika Gayo', status: 'Active', status_id: 'Aktif', stock: '10 Ton' },
  { id: 'PROD-002', name: 'Udang Windu Super', name_id: 'Udang Windu Super', status: 'Ended', status_id: 'Selesai', stock: '5 Ton' },
  { id: 'PROD-003', name: 'Kayu Jati Grade A', name_id: 'Kayu Jati Grade A', status: 'Pending', status_id: 'Menunggu', stock: '20 m³' },
];

export default function ProducerDashboardPage() {
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
        return t(key as any, { defaultValue: status });
    }

    return (
        <div className="container mx-auto px-4 py-8 md:py-12">
            <header className="mb-8">
                <h1 className="text-4xl font-bold font-headline">{t('producer_dashboard_title')}</h1>
                <p className="text-muted-foreground">{t('producer_dashboard_desc')}</p>
            </header>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle className="font-headline text-2xl">My Products</CardTitle>
                        <CardDescription>View and manage your product listings and auctions.</CardDescription>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline"><BarChart2 className="mr-2"/>{t('view_statistics')}</Button>
                        <Button asChild>
                            <Link href="/sell">
                                <PlusCircle className="mr-2"/>{t('create_new_auction')}
                            </Link>
                        </Button>
                    </div>
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
                        <TableCell><Badge variant={getStatusVariant(prod.status)}>{getStatusText(prod.status)}</Badge></TableCell>
                        <TableCell>{prod.stock}</TableCell>
                        <TableCell className="text-right">
                            <Button variant="ghost" size="sm">{t('manage')}</Button>
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
