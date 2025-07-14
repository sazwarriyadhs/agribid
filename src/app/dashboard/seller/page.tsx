
'use client';

import { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { useI18n } from "@/context/i18n";
import Link from "next/link";
import { MoreHorizontal, PlusCircle, DollarSign, Package, CheckCircle, PieChart } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/auth";
import { dashboardLabel } from "@/config/sidebar";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Pie, Cell, PieChart as RechartsPieChart } from "recharts"

const chartConfig = {
  sales: {
    label: "Sales",
  },
  Grains: { label: "Grains", color: "hsl(var(--chart-1))" },
  'Fruits & Vegetables': { label: 'Fruits & Vegetables', color: 'hsl(var(--chart-2))' },
  Livestock: { label: 'Livestock', color: 'hsl(var(--chart-3))' },
  'Marine Fishery': { label: 'Marine Fishery', color: 'hsl(var(--chart-4))' },
  Plantation: { label: 'Plantation', color: 'hsl(var(--chart-5))' },
  'Forestry Products': { label: 'Forestry Products', color: 'hsl(var(--chart-1))' },
} satisfies import('@/components/ui/chart').ChartConfig;

// TODO: Connect to the database and fetch products for the current user.
const initialSellerProducts = [
    { 
        id: '1', 
        name: 'Lelang Cabai Organik', 
        name_id: 'Lelang Cabai Organik', 
        status: 'Active', 
        status_id: 'Aktif', 
        quantity: '1 Ton', 
        category: 'Fruits & Vegetables',
        currentBid: 30000
    },
    { 
        id: '2', 
        name: 'Lelang Jagung Manis', 
        name_id: 'Lelang Jagung Manis', 
        status: 'Active', 
        status_id: 'Aktif', 
        quantity: '5 Ton', 
        category: 'Grains',
        currentBid: 15000
    },
    { 
        id: '99',
        name: 'Panen Gandum Berkualitas',
        name_id: 'Panen Gandum Berkualitas',
        status: 'Ended',
        status_id: 'Selesai',
        quantity: '10 Ton',
        category: 'Grains',
        currentBid: 4500, // This is the final price
    },
    { 
        id: '98',
        name: 'Bawang Merah Super',
        name_id: 'Bawang Merah Super',
        status: 'Pending',
        status_id: 'Menunggu',
        quantity: '2 Ton',
        category: 'Fruits & Vegetables',
        currentBid: 1800,
    }
];


export default function SellerDashboardPage() {
    const { t, language, formatCurrency } = useI18n();
    const { toast } = useToast();
    const { user } = useAuth();
    
    const pageTitle = user?.name ? dashboardLabel[user.name as keyof typeof dashboardLabel] || t('seller_dashboard_title') : t('seller_dashboard_title');
    
    const [sellerProducts, setSellerProducts] = useState<any[]>(initialSellerProducts);
    
    // useEffect(() => {
    //     // Subscribe to changes in the database to keep the UI in sync
    //     const unsubscribe = productDatabase.subscribe(() => {
    //          setSellerProducts(
    //             productDatabase.getProducts().filter(p => p.seller.toLowerCase().replace(/ /g, '-') === user?.name)
    //          );
    //     });
    //     return () => unsubscribe();
    // }, [user?.name]);


    const handleDeleteProduct = (productId: string) => {
        // TODO: Implement server action to delete product from the database.
        const product = sellerProducts.find(p => p.id === productId);
        setSellerProducts(prev => prev.filter(p => p.id !== productId));
        toast({
            title: t('delete_product_title', 'Product Deleted'),
            description: t('delete_product_desc', `"${language === 'id' ? product?.name_id : product?.name}" has been successfully deleted.`, { productName: language === 'id' ? product?.name_id : product?.name }),
            variant: "destructive"
        })
    };

    const getStatusVariant = (status: string) => {
        const s = status.toLowerCase();
        if (['active', 'winning', 'verified', 'aktif'].includes(s)) return 'default';
        if (['ended', 'won', 'delivered', 'selesai', 'menang', 'terverifikasi', 'terkirim', 'receipt confirmed', 'penerimaan dikonfirmasi'].includes(s)) return 'secondary';
        if (['pending', 'outbid', 'suspended', 'menunggu', 'kalah', 'ditangguhkan', 'rejected', 'ditolak'].includes(s)) return 'destructive';
        return 'outline';
    }

    const getStatusText = (product: any) => {
        const statusKey = `status_${(language === 'id' ? product.status_id : product.status).toLowerCase().replace(/ /g, '_')}`;
        return t(statusKey, language === 'id' ? product.status_id : product.status);
    }
    
    const stats = useMemo(() => {
        const activeAuctions = sellerProducts.filter(p => p.status === 'Active').length;
        const productsSold = sellerProducts.filter(p => p.status === 'Ended');
        const grossRevenue = productsSold.reduce((acc, p) => acc + p.currentBid, 0);
        return { activeAuctions, productsSold: productsSold.length, grossRevenue };
    }, [sellerProducts]);

    const salesByCategory = useMemo(() => {
        const soldProducts = sellerProducts.filter(p => p.status === 'Ended');
        const categoryData = soldProducts.reduce((acc, product) => {
            const category = product.category;
            if (!acc[category]) {
                acc[category] = { value: 0 };
            }
            acc[category].value += product.currentBid;
            return acc;
        }, {} as Record<string, { value: number }>);
        
        return Object.entries(categoryData).map(([name, data]) => ({ 
            name, 
            value: data.value, 
            fill: chartConfig[name as keyof typeof chartConfig]?.color || chartConfig.sales.color,
            label: t(name.toLowerCase().replace(/ & /g, '_').replace(/ /g, '_'), name)
        }));
    }, [sellerProducts, t, language]);

    return (
        <>
            <header className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-bold font-headline">{pageTitle}</h1>
                    <p className="text-muted-foreground">{t('seller_dashboard_desc', 'Manage your products and auctions.')}</p>
                </div>
                <Button asChild>
                    <Link href="/sell">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        {t('add_new_product', 'Add New Product')}
                    </Link>
                </Button>
            </header>
             <div className="grid gap-4 md:grid-cols-3 mb-8">
                <Card>
                   <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                       <CardTitle className="text-sm font-medium">{t('active_auctions')}</CardTitle>
                       <Package className="h-4 w-4 text-muted-foreground" />
                   </CardHeader>
                   <CardContent><div className="text-2xl font-bold">{stats.activeAuctions}</div></CardContent>
                </Card>
                <Card>
                   <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                       <CardTitle className="text-sm font-medium">{t('products_sold', 'Products Sold')}</CardTitle>
                       <CheckCircle className="h-4 w-4 text-muted-foreground" />
                   </CardHeader>
                   <CardContent><div className="text-2xl font-bold">{stats.productsSold}</div></CardContent>
                </Card>
                <Card>
                   <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                       <CardTitle className="text-sm font-medium">{t('gross_revenue', 'Gross Revenue')}</CardTitle>
                       <DollarSign className="h-4 w-4 text-muted-foreground" />
                   </CardHeader>
                   <CardContent><div className="text-2xl font-bold">{formatCurrency(stats.grossRevenue)}</div></CardContent>
                </Card>
            </div>
            
            <div className="grid lg:grid-cols-5 gap-8">
                <Card className="lg:col-span-3">
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
                        {sellerProducts.length > 0 ? sellerProducts.map((prod) => (
                            <TableRow key={prod.id}>
                            <TableCell className="font-medium">{language === 'id' ? prod.name_id : prod.name}</TableCell>
                            <TableCell><Badge variant={getStatusVariant(language === 'id' ? prod.status_id : prod.status)}>{getStatusText(prod)}</Badge></TableCell>
                            <TableCell>{prod.quantity}</TableCell>
                            <TableCell className="text-right">
                                 <AlertDialog>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="h-8 w-8 p-0">
                                                <span className="sr-only">Open menu</span>
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuLabel>{t('actions')}</DropdownMenuLabel>
                                            <DropdownMenuItem asChild>
                                                <Link href={`/auctions/${prod.id}`}>{t('view_auction')}</Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem asChild>
                                                <Link href={`/sell?edit=${prod.id}`}>{t('edit_product', 'Edit')}</Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <AlertDialogTrigger asChild>
                                                <DropdownMenuItem className="text-destructive focus:text-destructive focus:bg-destructive/10">
                                                    {t('delete_product', 'Delete')}
                                                </DropdownMenuItem>
                                            </AlertDialogTrigger>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>{t('confirm_delete_title', 'Are you absolutely sure?')}</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                {t('confirm_delete_desc', 'This action cannot be undone. This will permanently delete the product "{{productName}}".', { productName: language === 'id' ? prod.name_id : prod.name })}
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>{t('cancel', 'Cancel')}</AlertDialogCancel>
                                            <AlertDialogAction onClick={() => handleDeleteProduct(prod.id)}>{t('continue', 'Continue')}</AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                 </AlertDialog>
                            </TableCell>
                            </TableRow>
                        )) : (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center h-24">{t('no_products_found', 'No products found.')}</TableCell>
                            </TableRow>
                        )}
                        </TableBody>
                    </Table>
                    </CardContent>
                </Card>
                 <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle className="font-headline text-2xl">{t('sales_by_category', 'Sales by Category')}</CardTitle>
                        <CardDescription>{t('sales_by_category_desc', 'Revenue distribution from sold products.')}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex items-center justify-center">
                        {salesByCategory.length > 0 ? (
                            <ChartContainer
                                config={chartConfig}
                                className="mx-auto aspect-square w-full max-w-[300px]"
                            >
                                <RechartsPieChart>
                                    <ChartTooltip 
                                        cursor={false}
                                        content={<ChartTooltipContent 
                                            hideLabel 
                                            formatter={(value, name) => [formatCurrency(value as number), name]} 
                                        />} 
                                    />
                                    <Pie 
                                        data={salesByCategory} 
                                        dataKey="value" 
                                        nameKey="label" 
                                        innerRadius={60}
                                    >
                                        {salesByCategory.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.fill} />
                                        ))}
                                    </Pie>
                                </RechartsPieChart>
                            </ChartContainer>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
                                <PieChart className="h-12 w-12 mb-4" />
                                <p>{t('no_sales_data', 'No sales data yet.')}</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </>
    )
}
