
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Users, Gavel, PackageCheck, CircleHelp, Check, X, MoreHorizontal, LineChart, Banknote, DollarSign } from "lucide-react"
import { useI18n } from "@/context/i18n";
import Image from "next/image";
import { useToast } from '@/hooks/use-toast';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { useAuth } from '@/context/auth';
import { dashboardLabel } from '@/config/sidebar';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Line, XAxis, YAxis, CartesianGrid, LineChart as RechartsLineChart } from "recharts"

const stats = [
    { title: "total_users", value: "1,250", icon: Users },
    { title: "active_auctions", value: "82", icon: Gavel },
    { title: "pending_verifications", value: "12", icon: CircleHelp },
];

const financialStats = [
    { title: "total_revenue", value: 125000, icon: DollarSign },
    { title: "transaction_volume", value: 875000, icon: Banknote },
    { title: "pending_payouts", value: 3, icon: CircleHelp },
]

const initialPendingProducts = [
    { id: 'PROD-004', name: 'Robusta Coffee Beans', name_id: 'Biji Kopi Robusta', producer: 'Kintamani Highlands', image: 'https://placehold.co/100x100.png', aiHint: 'coffee beans', category: 'Plantation' },
    { id: 'PROD-005', name: 'Frozen Tuna Loin', name_id: 'Loin Tuna Beku', producer: 'Bahari Seafood', image: 'https://placehold.co/100x100.png', aiHint: 'tuna loin', category: 'Marine Fishery' },
];

const initialAllUsers = [
    { id: 'USR-001', name: 'John Farmer', role: 'Producer', status: 'Active' },
    { id: 'USR-002', name: 'Bakery Co.', role: 'Bidder', status: 'Active' },
    { id: 'USR-003', name: 'Agri-Finance Corp', role: 'Partner', status: 'Active' },
    { id: 'USR-004', name: 'Global Exporters', role: 'Exporter', status: 'Suspended' },
];

const initialTransactions = [
    { id: 'TRX-001', user: 'Bakery Co.', amount: 4500, status: 'Completed', status_id: 'Selesai', date: '2024-07-20' },
    { id: 'TRX-002', user: 'Global Grains', amount: 8200, status: 'Completed', status_id: 'Selesai', date: '2024-07-19' },
    { id: 'TRX-003', user: 'Artisan Breads', amount: 1200, status: 'Pending', status_id: 'Menunggu', date: '2024-07-21' },
    { id: 'TRX-004', user: 'Seafood World', amount: 3500, status: 'Completed', status_id: 'Selesai', date: '2024-07-18' },
];

const chartData = [
  { month: "Jan", month_id: "Jan", revenue: 12000 },
  { month: "Feb", month_id: "Feb", revenue: 18000 },
  { month: "Mar", month_id: "Mar", revenue: 15000 },
  { month: "Apr", month_id: "Apr", revenue: 22000 },
  { month: "May", month_id: "Mei", revenue: 25000 },
  { month: "Jun", month_id: "Jun", revenue: 31000 },
];

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "hsl(var(--primary))",
  },
} satisfies import('@/components/ui/chart').ChartConfig;


export default function AdminDashboardPage() {
    const { t, formatCurrency, language } = useI18n();
    const { toast } = useToast();
    const { user } = useAuth();
    const [pendingProducts, setPendingProducts] = useState(initialPendingProducts);
    const [allUsers, setAllUsers] = useState(initialAllUsers);
    const [transactions, setTransactions] = useState(initialTransactions);
    
    const pageTitle = user?.name ? dashboardLabel[user.name as keyof typeof dashboardLabel] || t('admin_dashboard_title') : t('admin_dashboard_title');

    const handleProductVerification = (productId: string, action: 'approve' | 'reject') => {
        const product = pendingProducts.find(p => p.id === productId);
        if (!product) return;

        toast({
            title: action === 'approve' ? t('product_approved') : t('product_rejected'),
            description: `${language === 'id' ? product.name_id : product.name} has been ${action === 'approve' ? 'approved' : 'rejected'}.`,
        });
        setPendingProducts(currentProducts => currentProducts.filter(p => p.id !== productId));
    };

    const handleUserAction = (userId: string, action: 'suspend' | 'delete') => {
        const user = allUsers.find(u => u.id === userId);
        if (!user) return;

        if (action === 'suspend') {
            toast({
                title: t('suspend_user'),
                description: `${user.name} has been suspended.`,
            });
            setAllUsers(users => users.map(u => u.id === userId ? { ...u, status: 'Suspended' } : u));
        } else if (action === 'delete') {
            toast({
                title: t('delete_user'),
                description: `${user.name} has been deleted.`,
                variant: 'destructive'
            });
            setAllUsers(users => users.filter(u => u.id !== userId));
        }
    };
    
    const handlePaymentAction = (transactionId: string) => {
        setTransactions(current => current.map(tx => tx.id === transactionId ? {...tx, status: 'Completed', status_id: 'Selesai'} : tx))
        toast({ title: t('payment_marked_as_paid_title'), description: t('payment_marked_as_paid_desc', {transactionId}) })
    }

    const getStatusVariant = (status: string) => {
        const s = status.toLowerCase();
        if (['active', 'completed', 'selesai'].includes(s)) return 'default';
        if (['suspended', 'rejected', 'ditolak'].includes(s)) return 'destructive';
        if (['pending', 'menunggu'].includes(s)) return 'secondary';
        return 'outline';
    }
    
    const getRoleText = (role: string) => {
        const key = `role_${role.toLowerCase()}`;
        return t(key, role);
    }

    const getStatusText = (status: string) => {
        const key = `status_${status.toLowerCase().replace(/ /g, '_')}`;
        return t(key, status);
    }

    return (
        <>
            <header>
                <h1 className="text-3xl font-bold tracking-tight">{pageTitle}</h1>
                <p className="text-muted-foreground">{t('admin_dashboard_desc')}</p>
            </header>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {stats.map(stat => (
                    <Card key={stat.title}>
                       <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                           <CardTitle className="text-sm font-medium">{t(stat.title as any)}</CardTitle>
                           <stat.icon className="h-4 w-4 text-muted-foreground" />
                       </CardHeader>
                       <CardContent><div className="text-2xl font-bold">{stat.value}</div></CardContent>
                    </Card>
                ))}
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
                <Card className="lg:col-span-3" id="financial-reports">
                    <CardHeader>
                        <CardTitle>{t('financial_overview_title')}</CardTitle>
                        <CardDescription>{t('financial_overview_desc')}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid gap-4 md:grid-cols-3">
                           {financialStats.map(stat => (
                                <Card key={stat.title}>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">{t(stat.title as any)}</CardTitle>
                                    <stat.icon className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">
                                        {typeof stat.value === 'number' ? formatCurrency(stat.value) : stat.value}
                                    </div>
                                </CardContent>
                                </Card>
                            ))}
                        </div>
                         <Card>
                            <CardHeader>
                                <CardTitle>{t('monthly_revenue_title')}</CardTitle>
                            </CardHeader>
                            <CardContent className="h-80 w-full">
                                <ChartContainer config={chartConfig}>
                                    <RechartsLineChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey={(d) => language === 'id' ? d.month_id : d.month} tickLine={false} axisLine={false} />
                                        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => formatCurrency(value).replace(/\.00$/, '')} />
                                        <ChartTooltip content={<ChartTooltipContent />} />
                                        <Line type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
                                    </RechartsLineChart>
                                </ChartContainer>
                            </CardContent>
                        </Card>
                    </CardContent>
                </Card>

                <Card className="lg:col-span-3" id="payment-management">
                    <CardHeader>
                        <CardTitle>{t('payment_management_title')}</CardTitle>
                        <CardDescription>{t('payment_management_desc')}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>{t('transaction_id')}</TableHead>
                                    <TableHead>{t('user')}</TableHead>
                                    <TableHead>{t('amount')}</TableHead>
                                    <TableHead>{t('status')}</TableHead>
                                    <TableHead>{t('date')}</TableHead>
                                    <TableHead className="text-right">{t('actions')}</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {transactions.map(tx => (
                                    <TableRow key={tx.id}>
                                        <TableCell className="font-mono">{tx.id}</TableCell>
                                        <TableCell>{tx.user}</TableCell>
                                        <TableCell>{formatCurrency(tx.amount)}</TableCell>
                                        <TableCell>
                                            <Badge variant={getStatusVariant(language === 'id' ? tx.status_id : tx.status)}>
                                                {getStatusText(language === 'id' ? tx.status_id : tx.status)}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>{tx.date}</TableCell>
                                        <TableCell className="text-right">
                                            {tx.status === 'Pending' && (
                                                <Button size="sm" onClick={() => handlePaymentAction(tx.id)}><Check className="mr-2 h-4 w-4"/>{t('mark_as_paid')}</Button>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                <Card className="lg:col-span-3">
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
                                            <Image src={prod.image} alt={language === 'id' ? prod.name_id : prod.name} width={40} height={40} className="rounded-md object-cover" data-ai-hint={prod.aiHint} />
                                            {language === 'id' ? prod.name_id : prod.name}
                                        </TableCell>
                                        <TableCell>{prod.producer}</TableCell>
                                        <TableCell>{t(prod.category.toLowerCase().replace(/ & /g, '_').replace(/ /g, '_'))}</TableCell>
                                        <TableCell className="text-right space-x-2">
                                            <Button variant="outline" size="sm" className="bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-900 border-green-300 dark:border-green-700" onClick={() => handleProductVerification(prod.id, 'approve')}><Check className="mr-2 h-4 w-4"/>{t('approve')}</Button>
                                            <Button variant="outline" size="sm" className="bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-900 border-red-300 dark:border-red-700" onClick={() => handleProductVerification(prod.id, 'reject')}><X className="mr-2 h-4 w-4"/>{t('reject')}</Button>
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

                <Card className="lg:col-span-3">
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
                                        <TableCell>{getRoleText(user.role)}</TableCell>
                                        <TableCell><Badge variant={getStatusVariant(user.status)}>{getStatusText(user.status)}</Badge></TableCell>
                                        <TableCell className="text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" className="h-8 w-8 p-0">
                                                        <span className="sr-only">Open menu</span>
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuLabel>{t('actions')}</DropdownMenuLabel>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem>{t('view_details')}</DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => handleUserAction(user.id, 'suspend')}>{t('suspend_user')}</DropdownMenuItem>
                                                    <DropdownMenuItem className="text-destructive focus:text-destructive focus:bg-destructive/10" onClick={() => handleUserAction(user.id, 'delete')}>{t('delete_user')}</DropdownMenuItem>
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
        </>
    )
}

    