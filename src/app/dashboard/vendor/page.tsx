
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Truck, PackageCheck, Package, ArrowRight } from "lucide-react"
import { useI18n } from "@/context/i18n";
import Link from 'next/link';
import { useAuth } from "@/context/auth";
import { dashboardLabel } from "@/config/sidebar";
import { useToast } from '@/hooks/use-toast';

const initialShippingOrders = [
    { id: 'ORD-WHEAT-001', product: 'Organic Wheat Harvest', product_id: 'Panen Gandum Organik', origin: 'Green Valley Farms, Kansas', destination: 'Bakery Co., Chicago', status: 'Pending Acceptance', status_id: 'Menunggu Penerimaan' },
    { id: 'ORD-SALMON-002', product: 'Fresh Atlantic Salmon', product_id: 'Salmon Atlantik Segar', origin: 'Ocean Fresh, Bali', destination: 'Seafood World, Jakarta', status: 'In Transit', status_id: 'Dalam Perjalanan' },
    { id: 'ORD-PALM-003', product: 'Palm Oil Kernels', product_id: 'Biji Kelapa Sawit', origin: 'Nusantara Palms, Sumatra', destination: 'Bio Oils, Surabaya', status: 'Delivered', status_id: 'Terkirim' },
    { id: 'ORD-COFFEE-004', product: 'Robusta Coffee Beans', product_id: 'Biji Kopi Robusta', origin: 'Kintamani Highlands', destination: 'Global Coffee Inc., Singapore', status: 'Pending Acceptance', status_id: 'Menunggu Penerimaan' },
];

export default function VendorDashboardPage() {
    const { t, language } = useI18n();
    const { user } = useAuth();
    const { toast } = useToast();
    const [shippingOrders, setShippingOrders] = useState(initialShippingOrders);
    
    const pageTitle = user?.name ? dashboardLabel[user.name as keyof typeof dashboardLabel] || t('vendor_dashboard_title') : t('vendor_dashboard_title');

    const getStatusVariant = (status: string) => {
        const s = status.toLowerCase();
        if (['in transit', 'dalam perjalanan'].includes(s)) return 'default';
        if (['delivered', 'terkirim'].includes(s)) return 'secondary';
        if (['pending acceptance', 'menunggu penerimaan'].includes(s)) return 'destructive';
        return 'outline';
    }

    const getStatusText = (request: typeof shippingOrders[0]) => {
        const currentStatus = language === 'id' ? request.status_id : request.status;
        const statusKey = `status_${currentStatus.toLowerCase().replace(/ /g, '_')}`;
        return t(statusKey, currentStatus);
    }

    const handleAcceptJob = (orderId: string) => {
        setShippingOrders(currentOrders => 
            currentOrders.map(order => 
                order.id === orderId ? { ...order, status: 'In Transit', status_id: 'Dalam Perjalanan' } : order
            )
        );
        toast({
            title: t('job_accepted_title', 'Job Accepted'),
            description: t('job_accepted_desc', `Order ${orderId} is now in transit.`),
        });
    }

    const newOrdersCount = shippingOrders.filter(o => o.status === 'Pending Acceptance').length;
    const completedOrdersCount = shippingOrders.filter(o => o.status === 'Delivered').length;

    return (
        <>
            <header className="mb-8">
                <h1 className="text-4xl font-bold font-headline">{pageTitle}</h1>
                <p className="text-muted-foreground">{t('vendor_dashboard_desc', 'Manage your logistics and shipping orders.')}</p>
            </header>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2 mb-8">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                       <CardTitle className="text-sm font-medium">{t('new_shipping_orders')}</CardTitle>
                       <Package className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent><div className="text-2xl font-bold">{newOrdersCount}</div></CardContent>
                </Card>
                 <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                       <CardTitle className="text-sm font-medium">{t('completed_shipments')}</CardTitle>
                       <PackageCheck className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent><div className="text-2xl font-bold">{completedOrdersCount}</div></CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">{t('shipping_orders_title')}</CardTitle>
                    <CardDescription>{t('shipping_orders_desc')}</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>{t('product')}</TableHead>
                                <TableHead>{t('route')}</TableHead>
                                <TableHead>{t('status')}</TableHead>
                                <TableHead className="text-right">{t('actions')}</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {shippingOrders.map((order) => (
                            <TableRow key={order.id}>
                                    <TableCell className="font-medium">
                                        <p>{language === 'id' ? order.product_id : order.product}</p>
                                        <p className="text-xs text-muted-foreground font-mono">{order.id}</p>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2 text-sm">
                                            <span className="truncate max-w-[120px]">{order.origin}</span>
                                            <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                                            <span className="truncate max-w-[120px]">{order.destination}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={getStatusVariant(language === 'id' ? order.status_id : order.status)}>
                                            {getStatusText(order)}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        {order.status === 'Pending Acceptance' && (
                                            <Button size="sm" onClick={() => handleAcceptJob(order.id)}>
                                                <Truck className="mr-2 h-4 w-4"/>{t('accept_job', 'Accept Job')}
                                            </Button>
                                        )}
                                         {order.status !== 'Pending Acceptance' && (
                                            <Button asChild variant="outline" size="sm">
                                                <Link href="#">
                                                    <Truck className="mr-2 h-4 w-4"/>{t('view_details', 'View Details')}
                                                </Link>
                                            </Button>
                                         )}
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
