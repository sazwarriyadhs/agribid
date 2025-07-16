
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Gavel, Trophy, Banknote, Package, Truck, Sparkles, Loader2, BarChart, ShoppingCart } from "lucide-react"
import { useI18n } from "@/context/i18n";
import Link from "next/link";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useAuth } from "@/context/auth";
import { dashboardLabel } from "@/config/sidebar";
import { Button } from "@/components/ui/button";
import { useState, useMemo } from "react";
import { useToast } from "@/hooks/use-toast";
import { calculateShippingCost, CalculateShippingCostInput } from "@/ai/flows/calculate-shipping-cost-flow";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, XAxis, YAxis, CartesianGrid, BarChart as RechartsBarChart } from "recharts"

const buyerHistory = [
  { id: '1', item: 'Organic Wheat Harvest', item_id: 'Panen Gandum Organik', status: 'Winning', status_id: 'Unggul', amount: 4500, shipmentStatus: 'Pending Payment', shipmentStatus_id: 'Menunggu Pembayaran', origin: 'Green Valley Farms, Kansas', category: 'Grains' },
  { id: '2', item: 'Fresh Atlantic Salmon', item_id: 'Salmon Atlantik Segar', status: 'Won', status_id: 'Menang', amount: 1200, shipmentStatus: 'In Transit', shipmentStatus_id: 'Dalam Perjalanan', origin: 'Ocean Fresh, Bali', category: 'Marine Fishery' },
  { id: '3', item: 'Palm Oil Kernels', item_id: 'Biji Kelapa Sawit', status: 'Outbid', status_id: 'Kalah', amount: 850, shipmentStatus: null, shipmentStatus_id: null, origin: null, category: 'Plantation' },
  { id: '4', item: 'Granny Smith Apples', item_id: 'Apel Granny Smith', status: 'Won', status_id: 'Menang', amount: 800, shipmentStatus: 'Delivered', shipmentStatus_id: 'Terkirim', origin: 'Apple Orchards, Washington', category: 'Fruits & Vegetables' },
  { id: '5', item: 'Robusta Coffee Beans', item_id: 'Biji Kopi Robusta', status: 'Won', status_id: 'Menang', amount: 2200, shipmentStatus: 'Delivered', shipmentStatus_id: 'Terkirim', origin: 'Kintamani Highlands', category: 'Plantation' },
];

const chartConfig = {
  bids: {
    label: "Bids",
    color: "hsl(var(--primary))",
  },
  Grains: { label: "Grains", color: "hsl(var(--chart-1))" },
  'Fruits & Vegetables': { label: "Fruits & Vegetables", color: "hsl(var(--chart-2))" },
  'Marine Fishery': { label: "Marine Fishery", color: "hsl(var(--chart-4))" },
  Plantation: { label: "Plantation", color: "hsl(var(--chart-5))" },
} satisfies import('@/components/ui/chart').ChartConfig;


export default function BuyerDashboardPage() {
    const { t, formatCurrency, language } = useI18n();
    const { user } = useAuth();
    const { toast } = useToast();
    const [isCalculating, setIsCalculating] = useState<string | null>(null);
    const [shippingCost, setShippingCost] = useState<Record<string, { cost: number; reasoning: string }>>({});

    const pageTitle = user?.name ? dashboardLabel[user.name as keyof typeof dashboardLabel] || t('buyer_dashboard_title') : t('buyer_dashboard_title');

    const getStatusVariant = (status: string | null) => {
        const s = status ? status.toLowerCase() : '';
        if (['active', 'winning', 'verified', 'unggul'].includes(s)) return 'default';
        if (['ended', 'won', 'menang', 'selesai', 'terverifikasi', 'receipt confirmed', 'penerimaan dikonfirmasi'].includes(s)) return 'default';
        if (['pending', 'outbid', 'suspended', 'kalah', 'menunggu', 'ditangguhkan'].includes(s)) return 'destructive';
        if (['in transit', 'dalam perjalanan'].includes(s)) return 'default';
        if (['delivered', 'terkirim'].includes(s)) return 'secondary';
        return 'outline';
    }

    const getStatusText = (bid: typeof buyerHistory[0]) => {
        const statusKey = `status_${(language === 'id' ? bid.status_id : bid.status).toLowerCase().replace(/ /g, '_')}`;
        return t(statusKey, language === 'id' ? bid.status_id : bid.status);
    }
    
    const getShipmentStatusText = (status: string | null) => {
        if (!status) return '—';
        const key = `status_${status.toLowerCase().replace(/ /g, '_')}`;
        return t(key, status);
    }

    const totalSpent = buyerHistory
        .filter(bid => ['Won', 'Menang'].includes(bid.status) || ['Won', 'Menang'].includes(bid.status_id))
        .reduce((acc, bid) => acc + bid.amount, 0);
    
    const auctionsWon = buyerHistory.filter(bid => ['Won', 'Menang'].includes(bid.status) || ['Won', 'Menang'].includes(bid.status_id)).length;
    const activeBids = buyerHistory.filter(bid => ['Winning', 'Unggul'].includes(bid.status) || ['Winning', 'Unggul'].includes(bid.status_id)).length;
    
    const chartData = useMemo(() => {
        const bidsByCategory = buyerHistory.reduce((acc, bid) => {
            const category = bid.category;
            if (!acc[category]) {
                acc[category] = 0;
            }
            acc[category]++;
            return acc;
        }, {} as Record<string, number>);

        return Object.entries(bidsByCategory).map(([category, bids]) => ({
            category: t(category.toLowerCase().replace(/ & /g, '_').replace(/ /g, '_'), category),
            bids
        }));
    }, [t, language]);


    const handleCalculateShipping = async (orderId: string, origin: string, productDetails: string) => {
        setIsCalculating(orderId);
        try {
            const input: CalculateShippingCostInput = {
                origin,
                destination: "My Warehouse, Jakarta", // Example destination
                productDetails,
            };
            const result = await calculateShippingCost(input);
            setShippingCost(prev => ({...prev, [orderId]: {cost: result.estimatedCost, reasoning: result.reasoning}}));
            toast({
                title: t('shipping_cost_calculated_title'),
                description: t('shipping_cost_calculated_desc', { amount: formatCurrency(result.estimatedCost) }),
            });
        } catch (error) {
            toast({ variant: 'destructive', title: t('error'), description: t('ai_check_error_desc') });
        } finally {
            setIsCalculating(null);
        }
    };


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

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                 <Card>
                    <CardHeader>
                        <CardTitle className="font-headline text-2xl">{t('recent_bid_history')}</CardTitle>
                    </CardHeader>
                    <CardContent>
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
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline text-2xl">{t('bidding_activity_by_category', 'Bidding Activity by Category')}</CardTitle>
                        <CardDescription>{t('bidding_activity_desc', 'How your bidding activity is distributed across categories.')}</CardDescription>
                    </CardHeader>
                    <CardContent className="h-80 w-full">
                        <ChartContainer config={chartConfig}>
                             <RechartsBarChart data={chartData} layout="vertical" margin={{ left: 20, right: 20 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis type="number" dataKey="bids" />
                                <YAxis dataKey="category" type="category" width={100} tickLine={false} axisLine={false} />
                                <ChartTooltip content={<ChartTooltipContent />} />
                                <Bar dataKey="bids" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                            </RechartsBarChart>
                        </ChartContainer>
                    </CardContent>
                </Card>
            </div>

            <Card id="my-orders">
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">{t('my_orders_title', 'My Orders')}</CardTitle>
                    <CardDescription>{t('my_orders_desc', 'Track your won auctions and manage shipments.')}</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>{t('product')}</TableHead>
                                <TableHead>{t('shipping_status', 'Shipping Status')}</TableHead>
                                <TableHead>{t('shipping_cost', 'Shipping Cost')}</TableHead>
                                <TableHead className="text-right">{t('actions')}</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {buyerHistory.filter(o => ['Won', 'Menang'].includes(o.status) || ['Won', 'Menang'].includes(o.status_id)).map((order) => (
                                <TableRow key={order.id}>
                                    <TableCell className="font-medium">{language === 'id' ? order.item_id : order.item}</TableCell>
                                    <TableCell>
                                        <Badge variant={getStatusVariant(language === 'id' ? order.shipmentStatus_id : order.shipmentStatus)}>
                                            {getShipmentStatusText(language === 'id' ? order.shipmentStatus_id : order.shipmentStatus)}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        {shippingCost[order.id] ? (
                                            <span className="font-mono">{formatCurrency(shippingCost[order.id].cost)}</span>
                                        ) : (
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => handleCalculateShipping(order.id, order.origin!, order.item)}
                                                disabled={isCalculating === order.id}
                                            >
                                                {isCalculating === order.id ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <Sparkles className="mr-2 h-4 w-4" />}
                                                {t('calculate_with_ai', 'Calculate with AI')}
                                            </Button>
                                        )}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        {order.shipmentStatus && order.shipmentStatus !== 'Pending Payment' && (
                                            <Button asChild size="sm">
                                                <Link href={`/shipments/${order.id}`}>
                                                    <Truck className="mr-2 h-4 w-4" /> {t('track_shipment', 'Track Shipment')}
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

