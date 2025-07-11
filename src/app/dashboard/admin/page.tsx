
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Users, Gavel, PackageCheck, CircleHelp, Check, X, MoreHorizontal } from "lucide-react"
import { useI18n } from "@/context/i18n";
import Image from "next/image";
import { useToast } from '@/hooks/use-toast';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const stats = [
    { title: "total_users", value: "1,250", icon: Users },
    { title: "active_auctions", value: "82", icon: Gavel },
    { title: "pending_verifications", value: "12", icon: CircleHelp },
];

const initialPendingProducts = [
    { id: 'PROD-004', name: 'Robusta Coffee Beans', name_id: 'Biji Kopi Robusta', producer: 'Kintamani Highlands', image: 'https://placehold.co/100x100.png', category: 'Plantation' },
    { id: 'PROD-005', name: 'Frozen Tuna Loin', name_id: 'Loin Tuna Beku', producer: 'Bahari Seafood', image: 'https://placehold.co/100x100.png', category: 'Marine Fishery' },
];

const allUsers = [
    { id: 'USR-001', name: 'John Farmer', role: 'Producer', role_id: 'Produsen', status: 'Active', status_id: 'Aktif' },
    { id: 'USR-002', name: 'Bakery Co.', role: 'Bidder', role_id: 'Penawar', status: 'Active', status_id: 'Aktif' },
    { id: 'USR-003', name: 'Agri-Finance Corp', role: 'Partner', role_id: 'Mitra', status: 'Active', status_id: 'Aktif' },
    { id: 'USR-004', name: 'Global Exporters', role: 'Exporter', role_id: 'Eksportir', status: 'Suspended', status_id: 'Ditangguhkan' },
];

export default function AdminDashboardPage() {
    const { t, formatCurrency, language } = useI18n();
    const { toast } = useToast();
    const [pendingProducts, setPendingProducts] = useState(initialPendingProducts);

    const handleProductVerification = (productId: string, action: 'approve' | 'reject') => {
        const product = pendingProducts.find(p => p.id === productId);
        if (!product) return;

        toast({
            title: action === 'approve' ? t('product_approved') : t('product_rejected'),
            description: `${product.name} has been ${action}.`,
        });
        setPendingProducts(currentProducts => currentProducts.filter(p => p.id !== productId));
    };

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
            case 'suspended':
                return 'destructive';
            default: 
                return 'outline';
        }
    }
    
    const getRoleText = (user: typeof allUsers[0]) => {
        return language === 'id' ? user.role_id : user.role;
    }

    const getStatusText = (status: string) => {
        const key = `status_${status.toLowerCase().replace(/ /g, '_')}`;
        return t(key as any, status);
    }

    return (
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
            <header>
                <h1 className="text-3xl font-bold tracking-tight">{t('admin_dashboard_title')}</h1>
                <p className="text-muted-foreground">{t('admin_dashboard_desc')}</p>
            </header>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {stats.map(stat => (
                    <Card key={stat.title}>
                       <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                           <CardTitle className="text-sm font-medium">{t(stat.title as any)}</CardTitle>
                           <stat.icon className="h-4 w-4 text-muted-foreground" />
                       </CardHeader>
                       <CardContent><div className="text-2xl font-bold">{stat.value}</div></CardContent>
                    </Card>
                ))}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{t('total_revenue')}</CardTitle>
                        <PackageCheck className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent><div className="text-2xl font-bold">{formatCurrency(125000)}</div></CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>{t('pending_product_verifications')}</CardTitle>
                        <CardDescription>{t('pending_product_verifications_desc')}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>{t('product')}</TableHead>
                                    <TableHead>{t('producer')}</TableHead>
                                    <TableHead>{t('category')}</TableHead>
                                    <TableHead className="text-right">{t('actions')}</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                               {pendingProducts.length > 0 ? pendingProducts.map((prod) => (
                                    <TableRow key={prod.id}>
                                        <TableCell className="font-medium flex items-center gap-3">
                                            <Image src={prod.image} alt={language === 'id' ? prod.name_id : prod.name} width={40} height={40} className="rounded-md object-cover" data-ai-hint="coffee beans" />
                                            {language === 'id' ? prod.name_id : prod.name}
                                        </TableCell>
                                        <TableCell>{prod.producer}</TableCell>
                                        <TableCell>{prod.category}</TableCell>
                                        <TableCell className="text-right space-x-2">
                                            <Button variant="outline" size="sm" className="bg-green-100 text-green-800 hover:bg-green-200 border-green-300" onClick={() => handleProductVerification(prod.id, 'approve')}><Check className="mr-2 h-4 w-4"/>{t('approve')}</Button>
                                            <Button variant="outline" size="sm" className="bg-red-100 text-red-800 hover:bg-red-200 border-red-300" onClick={() => handleProductVerification(prod.id, 'reject')}><X className="mr-2 h-4 w-4"/>{t('reject')}</Button>
                                        </TableCell>
                                    </TableRow>
                               )) : (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center h-24">{t('no_pending_products')}</TableCell>
                                </TableRow>
                               )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>{t('user_management')}</CardTitle>
                        <CardDescription>{t('user_management_desc')}</CardDescription>
                    </CardHeader>
                    <CardContent>
                         <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>{t('user')}</TableHead>
                                    <TableHead>{t('role')}</TableHead>
                                    <TableHead>{t('status')}</TableHead>
                                    <TableHead className="text-right">{t('actions')}</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                               {allUsers.map((user) => (
                                    <TableRow key={user.id}>
                                        <TableCell className="font-medium">{user.name}</TableCell>
                                        <TableCell>{getRoleText(user)}</TableCell>
                                        <TableCell><Badge variant={getStatusVariant(user.status)}>{getStatusText(language === 'id' ? user.status_id : user.status)}</Badge></TableCell>
                                        <TableCell className="text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" className="h-8 w-8 p-0">
                                                        <span className="sr-only">Open menu</span>
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem>{t('view_details')}</DropdownMenuItem>
                                                    <DropdownMenuItem>{t('suspend_user')}</DropdownMenuItem>
                                                    <DropdownMenuItem className="text-destructive">{t('delete_user')}</DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                               ))}
                            </TableBody>
                         </Table>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
