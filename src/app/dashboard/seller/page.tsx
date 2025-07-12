
'use client';

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { useI18n } from "@/context/i18n";
import Link from "next/link";
import { MoreHorizontal, PlusCircle } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/auth";
import { dashboardLabel } from "@/config/sidebar";

const productsByRole = {
  petani: [
    { id: 'PROD-P01', name: 'Padi Organik', name_id: 'Padi Organik', status: 'Active', status_id: 'Aktif', stock: '15 Ton', category: 'Grains' },
    { id: 'PROD-P02', name: 'Cabai Merah Keriting', name_id: 'Cabai Merah Keriting', status: 'Ended', status_id: 'Selesai', stock: '500 Kg', category: 'Fruits & Vegetables' },
    { id: 'PROD-P03', name: 'Jagung Manis', name_id: 'Jagung Manis', status: 'Pending', status_id: 'Menunggu', stock: '5 Ton', category: 'Fruits & Vegetables' },
  ],
  nelayan: [
    { id: 'PROD-N01', name: 'Tuna Sirip Kuning Segar', name_id: 'Tuna Sirip Kuning Segar', status: 'Active', status_id: 'Aktif', stock: '2 Ton', category: 'Marine Fishery' },
    { id: 'PROD-N02', name: 'Cumi-cumi Beku', name_id: 'Cumi-cumi Beku', status: 'Active', status_id: 'Aktif', stock: '1.5 Ton', category: 'Marine Fishery' },
    { id: 'PROD-N03', name: 'Lobster Mutiara Hidup', name_id: 'Lobster Mutiara Hidup', status: 'Ended', status_id: 'Selesai', stock: '300 Kg', category: 'Marine Fishery' },
  ],
  peternak: [
    { id: 'PROD-T01', name: 'Sapi Limousin', name_id: 'Sapi Limousin', status: 'Active', status_id: 'Aktif', stock: '20 Ekor', category: 'Livestock' },
    { id: 'PROD-T02', name: 'Ayam Broiler', name_id: 'Ayam Broiler', status: 'Pending', status_id: 'Menunggu', stock: '500 Ekor', category: 'Livestock' },
    { id: 'PROD-T03', name: 'Susu Sapi Segar', name_id: 'Susu Sapi Segar', status: 'Ended', status_id: 'Selesai', stock: '1000 Liter', category: 'Livestock' },
  ],
  'pengolah hasil hutan': [
    { id: 'PROD-H01', name: 'Kayu Jati Gelondongan', name_id: 'Kayu Jati Gelondongan', status: 'Active', status_id: 'Aktif', stock: '10 m³', category: 'Forestry Products' },
    { id: 'PROD-H02', name: 'Getah Pinus', name_id: 'Getah Pinus', status: 'Ended', status_id: 'Selesai', stock: '5 Ton', category: 'Forestry Products' },
  ],
  peladang: [
     { id: 'PROD-L01', name: 'Kopi Robusta Lampung', name_id: 'Kopi Robusta Lampung', status: 'Active', status_id: 'Aktif', stock: '5 Ton', category: 'Plantation' },
     { id: 'PROD-L02', name: 'Biji Kelapa Sawit', name_id: 'Biji Kelapa Sawit', status: 'Pending', status_id: 'Menunggu', stock: '20 Ton', category: 'Plantation' },
  ],
  default: [
    { id: '1', name: 'Organic Wheat Harvest', name_id: 'Panen Gandum Organik', status: 'Active', status_id: 'Aktif', stock: '10 Ton', category: 'Grains' },
  ]
};

export default function SellerDashboardPage() {
    const { t, language } = useI18n();
    const { toast } = useToast();
    const { user } = useAuth();
    
    const [sellerProducts, setSellerProducts] = useState(productsByRole.default);

    const pageTitle = user?.name ? dashboardLabel[user.name as keyof typeof dashboardLabel] || t('seller_dashboard_title') : t('seller_dashboard_title');
    
    useEffect(() => {
        if (user?.name && user.name in productsByRole) {
            setSellerProducts(productsByRole[user.name as keyof typeof productsByRole]);
        } else {
            setSellerProducts(productsByRole.default);
        }
    }, [user]);

    const handleDeleteProduct = (productId: string) => {
        const product = sellerProducts.find(p => p.id === productId);
        setSellerProducts(sellerProducts.filter(p => p.id !== productId));
        toast({
            title: t('delete_product_title', 'Product Deleted'),
            description: t('delete_product_desc', `"${language === 'id' ? product?.name_id : product?.name}" has been successfully deleted.`),
            variant: "destructive"
        })
    };

    const getStatusVariant = (status: string) => {
        const s = status.toLowerCase();
        if (['active', 'winning', 'verified', 'aktif'].includes(s)) return 'default';
        if (['ended', 'won', 'delivered', 'selesai', 'menang', 'terverifikasi', 'terkirim'].includes(s)) return 'secondary';
        if (['pending', 'outbid', 'suspended', 'menunggu', 'kalah', 'ditangguhkan'].includes(s)) return 'destructive';
        return 'outline';
    }

    const getStatusText = (product: typeof sellerProducts[0]) => {
        const statusKey = `status_${(language === 'id' ? product.status_id : product.status).toLowerCase().replace(/ /g, '_')}`;
        return t(statusKey, language === 'id' ? product.status_id : product.status);
    }

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
                    {sellerProducts.map((prod) => (
                        <TableRow key={prod.id}>
                        <TableCell className="font-medium">{language === 'id' ? prod.name_id : prod.name}</TableCell>
                        <TableCell><Badge variant={getStatusVariant(language === 'id' ? prod.status_id : prod.status)}>{getStatusText(prod)}</Badge></TableCell>
                        <TableCell>{prod.stock}</TableCell>
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
                    ))}
                    </TableBody>
                </Table>
                </CardContent>
            </Card>
        </>
    )
}
