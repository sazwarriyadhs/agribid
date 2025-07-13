
'use client';

import { useState } from "react";
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

const initialProducerProducts = [
  { id: '1', name: 'Organic Wheat Harvest', name_id: 'Panen Gandum Organik', status: 'Active', status_id: 'Aktif', stock: '10 Ton', category: 'Grains', description: 'Premium quality organic hard red winter wheat...' },
  { id: '2', name: 'Fresh Atlantic Salmon', name_id: 'Salmon Atlantik Segar', status: 'Ended', status_id: 'Selesai', stock: '5 Ton', category: 'Marine Fishery', description: 'Sustainably farmed Atlantic salmon...' },
  { id: '3', name: 'Palm Oil Kernels', name_id: 'Biji Kelapa Sawit', status: 'Pending', status_id: 'Menunggu', stock: '20 m³', category: 'Plantation', description: 'High-quality palm oil kernels for processing...' },
];

export default function ProducerDashboardPage() {
    const { t, language } = useI18n();
    const { toast } = useToast();
    const [producerProducts, setProducerProducts] = useState(initialProducerProducts);

    const handleDeleteProduct = (productId: string) => {
        const product = producerProducts.find(p => p.id === productId);
        setProducerProducts(producerProducts.filter(p => p.id !== productId));
        toast({
            title: t('delete_product_title', 'Product Deleted'),
            description: t('delete_product_desc', `"${language === 'id' ? product?.name_id : product?.name}" has been successfully deleted.`, { productName: language === 'id' ? product?.name_id : product?.name }),
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

    const getStatusText = (product: typeof producerProducts[0]) => {
        const statusKey = `status_${(language === 'id' ? product.status_id : product.status).toLowerCase().replace(/ /g, '_')}`;
        return t(statusKey, language === 'id' ? product.status_id : product.status);
    }

    return (
        <>
            <header className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-bold font-headline">{t('producer_dashboard_title')}</h1>
                    <p className="text-muted-foreground">{t('producer_dashboard_desc')}</p>
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
                    {producerProducts.map((prod) => (
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
