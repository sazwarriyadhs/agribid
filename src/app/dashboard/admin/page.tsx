
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Users, Gavel, PackageCheck, CircleHelp, Check, X, MoreHorizontal, LineChart, Banknote, DollarSign, Truck, ListChecks, Contact, ShieldCheck, FileText, Calendar, Wallet } from "lucide-react"
import { useI18n } from "@/context/i18n";
import Image from "next/image";
import { useToast } from '@/hooks/use-toast';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { useAuth } from '@/context/auth';
import { dashboardLabel } from '@/config/sidebar';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Line, XAxis, YAxis, CartesianGrid, LineChart as RechartsLineChart } from "recharts"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '@/components/ui/dialog';
import { MemberCard } from '@/components/member-card';
import { allActiveAuctions, initialSellerProducts } from '@/lib/mock-data';
import UserMap from '@/components/user-map';


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

// TODO: Connect to the database and fetch real data from the 'users' table.
const initialAllUsers: any[] = [
    { id: 'usr_petani_jaya', name: 'Petani Jaya', type: 'individual', firstName: 'Petani', lastName: 'Jaya', email: 'petani@agribid.com', role: 'petani', status: 'Active', registrationDate: '2024-07-01', paymentStatus: 'Paid', membershipExpires: '2025-07-01', lat: -6.9175, lon: 107.6191, country: 'Indonesia' },
    { id: 'usr_bakery_co', name: 'Bakery Co.', type: 'company', companyName: 'Bakery Co.', email: 'buyer@agribid.com', role: 'buyer', status: 'Active', registrationDate: '2024-06-15', paymentStatus: 'Paid', membershipExpires: '2025-06-15', lat: -6.2088, lon: 106.8456, country: 'Indonesia' },
    { id: 'usr_global_logistics', name: 'Global Logistics', type: 'company', companyName: 'Global Logistics', email: 'vendor@agribid.com', role: 'vendor', status: 'Active', registrationDate: '2024-05-20', paymentStatus: 'Paid', membershipExpires: '2025-05-20', lat: -7.2575, lon: 112.7521, country: 'Indonesia' },
    { id: 'usr_exportindo', name: 'Exportindo', type: 'company', companyName: 'Exportindo', email: 'exporter@agribid.com', role: 'exporter', status: 'Suspended', registrationDate: '2024-03-10', paymentStatus: 'Paid', membershipExpires: '2025-03-10', lat: 3.5952, lon: 98.6722, country: 'Indonesia' },
    { id: 'usr_nelayan_makmur', name: 'Nelayan Makmur', type: 'individual', firstName: 'Nelayan', lastName: 'Makmur', email: 'nelayan@agribid.com', role: 'nelayan', status: 'Pending Verification', registrationDate: '2024-07-10', paymentStatus: 'Unpaid', membershipExpires: null, lat: -5.1477, lon: 119.4327, country: 'Indonesia' },
    { id: 'usr_nippon_foods', name: 'Nippon Foods', type: 'company', companyName: 'Nippon Foods', email: 'international_buyer@agribid.com', role: 'international_buyer', status: 'Active', registrationDate: '2024-07-05', paymentStatus: 'Paid', membershipExpires: '2025-07-05', lat: 35.6895, lon: 139.6917, country: 'Japan' },
    { id: 'usr_usa_grains', name: 'USA Grains LLC', type: 'company', companyName: 'USA Grains LLC', email: 'international_buyer@agribid.com', role: 'international_buyer', status: 'Active', registrationDate: '2024-06-20', paymentStatus: 'Paid', membershipExpires: '2025-06-20', lat: 40.7128, lon: -74.0060, country: 'USA' },
    { id: 'usr_euro_oils', name: 'Euro Oils B.V.', type: 'company', companyName: 'Euro Oils B.V.', email: 'international_buyer@agribid.com', role: 'international_buyer', status: 'Pending Verification', registrationDate: '2024-07-12', paymentStatus: 'Unpaid', membershipExpires: null, lat: 52.3676, lon: 4.9041, country: 'Netherlands' },
];

// TODO: Connect to the database and fetch real data from a 'transactions' or 'auctions' table.
const initialTransactions: any[] = [
    { id: 'TX-99-1', user: 'Petani Jaya', amount: 450, status: 'Pending', status_id: 'Menunggu' }, // 10% of 4500 from seller dashboard
];

// TODO: Connect to the database and fetch real data from a 'shipments' or similar table.
const initialShippingReports: any[] = [];

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
    
    // TODO: Connect to the database and fetch real data from the 'products' table where status is 'Pending'.
    const [pendingProducts, setPendingProducts] = useState<any[]>(initialSellerProducts.filter(p => p.status === 'Pending'));
    
    const [allUsers, setAllUsers] = useState(initialAllUsers);
    const [transactions, setTransactions] = useState(initialTransactions);
    const [shippingReports, setShippingReports] = useState(initialShippingReports);
    
    const pageTitle = user?.name ? dashboardLabel[user.role as keyof typeof dashboardLabel] || t('admin_dashboard_title') : t('admin_dashboard_title');

    const handleProductVerification = (productId: string, action: 'approve' | 'reject') => {
        // TODO: Implement a server action to update the product status in the database.
        const product = pendingProducts.find(p => p.id === productId);
        if (!product) return;

        if (action === 'approve') {
            setPendingProducts(prev => prev.filter(p => p.id !== productId));
            toast({
                title: t('product_approved'),
                description: `${language === 'id' ? product.name_id : product.name} has been approved and is now live.`,
            });
        } else {
            setPendingProducts(prev => prev.filter(p => p.id !== productId));
            toast({
                title: t('product_rejected'),
                description: `${language === 'id' ? product.name_id : product.name} has been rejected.`,
            });
        }
    };

    const handleUserAction = (userId: string, action: 'suspend' | 'delete' | 'verify') => {
        const userToUpdate = allUsers.find(u => u.id === userId);
        if (!userToUpdate) return;
    
        const newStatus = action === 'verify' ? 'Active' : action === 'suspend' ? 'Suspended' : userToUpdate.status;
    
        if (action === 'delete') {
            toast({
                title: t('delete_user'),
                description: `${userToUpdate.name} has been deleted.`,
                variant: 'destructive'
            });
            setAllUsers(users => users.filter(u => u.id !== userId));
        } else {
            const titleKey = action === 'verify' ? 'user_verified_title' : 'suspend_user';
            const descKey = action === 'verify' ? 'user_verified_desc' : 'user_suspended_desc';
            
            toast({
                title: t(titleKey),
                description: t(descKey, { userName: userToUpdate.name }),
            });
            setAllUsers(users => users.map(u => u.id === userId ? { ...u, status: newStatus } : u));
        }
    };
    
    const handlePaymentAction = (transactionId: string) => {
        // TODO: Implement a server action to update the payment status in the database.
        setTransactions(current => current.map(tx => tx.id === transactionId ? {...tx, status: 'Completed', status_id: 'Selesai'} : tx))
        toast({ title: t('payment_marked_as_paid_title'), description: t('payment_marked_as_paid_desc', {transactionId}) })
    }

    const getStatusVariant = (status: string) => {
        const s = status.toLowerCase().replace(/ /g, '_');
        if (['active', 'completed', 'selesai', 'in_transit', 'dalam_perjalanan', 'delivered', 'terkirim', 'paid'].includes(s)) return 'default';
        if (['suspended', 'rejected', 'ditolak'].includes(s)) return 'destructive';
        if (['pending', 'menunggu', 'pending_verification', 'unpaid'].includes(s)) return 'secondary';
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
            
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mt-8">
                <div className="lg:col-span-3 space-y-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>User Location Map</CardTitle>
                            <CardDescription>Visualization of registered user locations and their status.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="w-full h-[400px] bg-secondary rounded-lg overflow-hidden">
                                <UserMap users={allUsers} />
                            </div>
                        </CardContent>
                    </Card>
                    <Card id="financial-reports">
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

                    <Card id="payment-management">
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
                                        <TableHead className="text-right">{t('actions')}</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {transactions.filter(tx => tx.status === 'Pending').map(tx => (
                                        <TableRow key={tx.id}>
                                            <TableCell className="font-mono">{tx.id}</TableCell>
                                            <TableCell>{tx.user}</TableCell>
                                            <TableCell>{formatCurrency(tx.amount)}</TableCell>
                                            <TableCell>
                                                <Badge variant={getStatusVariant(language === 'id' ? tx.status_id : tx.status)}>
                                                    {getStatusText(language === 'id' ? tx.status_id : tx.status)}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <Button size="sm" onClick={() => handlePaymentAction(tx.id)}><Check className="mr-2 h-4 w-4"/>{t('mark_as_paid')}</Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                    {transactions.filter(tx => tx.status === 'Pending').length === 0 && (
                                        <TableRow><TableCell colSpan={5} className="h-24 text-center">{t('no_pending_payments')}</TableCell></TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
                
                <div className="lg:col-span-2 space-y-8">
                     <Card>
                        <CardHeader>
                            <CardTitle>{t('latest_shipping_reports')}</CardTitle>
                            <CardDescription>{t('latest_shipping_reports_desc')}</CardDescription>
                        </CardHeader>
                        <CardContent>
                           <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>{t('order_id', 'Order ID')}</TableHead>
                                        <TableHead>{t('vendor', 'Vendor')}</TableHead>
                                        <TableHead>{t('status')}</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {shippingReports.map(report => (
                                        <TableRow key={report.orderId}>
                                            <TableCell className="font-mono">{report.orderId}</TableCell>
                                            <TableCell>{report.vendor}</TableCell>
                                            <TableCell>
                                                <Badge variant={getStatusVariant(language === 'id' ? report.reportedStatus_id : report.reportedStatus)}>
                                                    {getStatusText(language === 'id' ? report.reportedStatus_id : report.reportedStatus)}
                                                </Badge>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                    {shippingReports.length === 0 && (
                                        <TableRow><TableCell colSpan={3} className="h-24 text-center">No shipping reports.</TableCell></TableRow>
                                    )}
                                </TableBody>
                           </Table>
                        </CardContent>
                    </Card>

                    <Card>
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
                                        <TableHead className="text-right">{t('actions')}</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                   {pendingProducts.length > 0 ? pendingProducts.map((prod) => (
                                        <TableRow key={prod.id}>
                                            <TableCell className="font-medium flex items-center gap-3">
                                                <Image src={prod.image} alt={language === 'id' ? prod.name_id : prod.name} width={40} height={40} className="rounded-md object-cover" data-ai-hint={prod.aiHint} />
                                                <div className="flex flex-col">
                                                   <span>{language === 'id' ? prod.name_id : prod.name}</span>
                                                   <span className="text-xs text-muted-foreground">{t(prod.category.toLowerCase().replace(/ & /g, '_').replace(/ /g, '_'))}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>{prod.seller}</TableCell>
                                            <TableCell className="text-right space-x-2">
                                                <Button variant="outline" size="icon" className="h-8 w-8 bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-900 border-green-300 dark:border-green-700" onClick={() => handleProductVerification(prod.id, 'approve')}><Check className="h-4 w-4"/></Button>
                                                <Button variant="outline" size="icon" className="h-8 w-8 bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-900 border-red-300 dark:border-red-700" onClick={() => handleProductVerification(prod.id, 'reject')}><X className="h-4 w-4"/></Button>
                                            </TableCell>
                                        </TableRow>
                                   )) : (
                                    <TableRow>
                                        <TableCell colSpan={3} className="text-center h-24">{t('no_pending_products')}</TableCell>
                                    </TableRow>
                                   )}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>

                    <Card>
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
                                            <TableCell className="font-medium">
                                                <p>{user.name}</p>
                                                <p className="text-xs text-muted-foreground">{user.email}</p>
                                            </TableCell>
                                            <TableCell>{getRoleText(user.role)}</TableCell>
                                            <TableCell><Badge variant={getStatusVariant(user.status)}>{getStatusText(user.status)}</Badge></TableCell>
                                            <TableCell className="text-right">
                                                <Dialog>
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button variant="ghost" className="h-8 w-8 p-0">
                                                                <span className="sr-only">Open menu</span>
                                                                <MoreHorizontal className="h-4 w-4" />
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end">
                                                            <DropdownMenuLabel>{t('actions')}</DropdownMenuLabel>
                                                            <DialogTrigger asChild>
                                                                <DropdownMenuItem>
                                                                    <ShieldCheck className="mr-2 h-4 w-4" />
                                                                    <span>{t('verify_membership', 'Verify Membership')}</span>
                                                                </DropdownMenuItem>
                                                            </DialogTrigger>
                                                            <DropdownMenuSeparator />
                                                            <DropdownMenuItem onClick={() => handleUserAction(user.id, 'suspend')}>{t('suspend_user')}</DropdownMenuItem>
                                                            <DropdownMenuItem className="text-destructive focus:text-destructive focus:bg-destructive/10" onClick={() => handleUserAction(user.id, 'delete')}>{t('delete_user')}</DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                    <DialogContent>
                                                        <DialogHeader>
                                                            <DialogTitle>{t('membership_verification_title', 'Membership Verification')}</DialogTitle>
                                                            <DialogDescription>{t('membership_verification_desc', 'Review user details and update their membership status.')}</DialogDescription>
                                                        </DialogHeader>
                                                        <div className="space-y-4 py-4 text-sm">
                                                            <div className="flex items-center">
                                                                <span className="w-1/3 text-muted-foreground">{t('user')}</span>
                                                                <span className="font-semibold">{user.name} ({user.email})</span>
                                                            </div>
                                                            <div className="flex items-center">
                                                                <span className="w-1/3 text-muted-foreground">{t('role')}</span>
                                                                <span>{getRoleText(user.role)}</span>
                                                            </div>
                                                            <div className="flex items-center">
                                                                <span className="w-1/3 text-muted-foreground">{t('registration_date')}</span>
                                                                <span>{user.registrationDate || 'N/A'}</span>
                                                            </div>
                                                            <div className="flex items-center">
                                                                <span className="w-1/3 text-muted-foreground">{t('payment_status', 'Payment Status')}</span>
                                                                <Badge variant={getStatusVariant(user.paymentStatus)}>{getStatusText(user.paymentStatus)}</Badge>
                                                            </div>
                                                             <div className="flex items-center">
                                                                <span className="w-1/3 text-muted-foreground">{t('membership_status', 'Membership Status')}</span>
                                                                <Badge variant={getStatusVariant(user.status)}>{getStatusText(user.status)}</Badge>
                                                            </div>
                                                            <div className="flex items-center">
                                                                <span className="w-1/3 text-muted-foreground">{t('documents', 'Documents')}</span>
                                                                <Button variant="link" size="sm" className="p-0 h-auto"><FileText className="mr-2 h-4 w-4"/> {t('view_documents', 'View Documents')}</Button>
                                                            </div>
                                                        </div>
                                                        <div className="flex justify-end gap-2 pt-4 border-t">
                                                            <Button variant="destructive" onClick={() => handleUserAction(user.id, 'suspend')}>{t('suspend', 'Suspend')}</Button>
                                                            <Button variant="default" onClick={() => handleUserAction(user.id, 'verify')}>{t('verify_and_activate', 'Verify & Activate')}</Button>
                                                        </div>
                                                    </DialogContent>
                                                </Dialog>
                                            </TableCell>
                                        </TableRow>
                                   ))}
                                    {allUsers.length === 0 && (
                                        <TableRow><TableCell colSpan={4} className="h-24 text-center">No users found.</TableCell></TableRow>
                                    )}
                                </TableBody>
                             </Table>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    )
}

