
'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { FileText, PlusCircle, BarChart2, Gavel, History, Trophy, UserCheck, Calendar, Ship, UploadCloud, PackageCheck, List } from "lucide-react"
import { useI18n } from "@/context/i18n";

// Mock data for demonstration
const producerProducts = [
  { id: 'PROD-001', name: 'Kopi Arabika Gayo', name_id: 'Kopi Arabika Gayo', status: 'Active', status_id: 'Aktif', stock: '10 Ton' },
  { id: 'PROD-002', name: 'Udang Windu Super', name_id: 'Udang Windu Super', status: 'Ended', status_id: 'Selesai', stock: '5 Ton' },
  { id: 'PROD-003', name: 'Kayu Jati Grade A', name_id: 'Kayu Jati Grade A', status: 'Pending', status_id: 'Menunggu', stock: '20 m³' },
];

const bidderHistory = [
  { id: 'BID-001', item: 'Kopi Arabika Gayo', item_id: 'Kopi Arabika Gayo', status: 'Winning', status_id: 'Unggul', amount: 15000 },
  { id: 'BID-002', item: 'Udang Windu Super', item_id: 'Udang Windu Super', status: 'Won', status_id: 'Menang', amount: 8000 },
  { id: 'BID-003', item: 'Cokelat Batangan 70%', item_id: 'Cokelat Batangan 70%', status: 'Outbid', status_id: 'Kalah', amount: 2500 },
];

const verificationRequests = [
    { id: 'VER-001', producer: 'Jaya Farm', producer_id: 'Jaya Farm', date: '2024-07-15', status: 'Pending', status_id: 'Menunggu' },
    { id: 'VER-002', producer: 'Samudera Hasil Laut', producer_id: 'Samudera Hasil Laut', date: '2024-07-14', status: 'Verified', status_id: 'Terverifikasi' },
]

const exportShipments = [
    { id: 'EXP-001', product: 'Kopi Arabika Gayo', product_id: 'Kopi Arabika Gayo', destination: 'USA', destination_id: 'AS', status: 'In Transit', status_id: 'Dalam Perjalanan' },
    { id: 'EXP-002', product: 'Minyak Kelapa Sawit', product_id: 'Minyak Kelapa Sawit', destination: 'Netherlands', destination_id: 'Belanda', status: 'Delivered', status_id: 'Terkirim' },
]


export default function DashboardPage() {
  const { t, formatCurrency, language } = useI18n();

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
        <h1 className="text-4xl font-bold font-headline">{t('dashboard_title')}</h1>
        <p className="text-muted-foreground">{t('dashboard_subtitle')}</p>
      </header>

      <Tabs defaultValue="producer" className="w-full">
        <TabsList className="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
          <TabsTrigger value="producer">🧑‍🌾 {t('role_producer')}</TabsTrigger>
          <TabsTrigger value="bidder">💼 {t('role_bidder')}</TabsTrigger>
          <TabsTrigger value="partner">🤝 {t('role_partner')}</TabsTrigger>
          <TabsTrigger value="exporter">🌐 {t('role_exporter')}</TabsTrigger>
        </TabsList>

        {/* PRODUCER DASHBOARD */}
        <TabsContent value="producer" className="mt-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="font-headline">{t('producer_dashboard_title')}</CardTitle>
                <CardDescription>{t('producer_dashboard_desc')}</CardDescription>
              </div>
              <div className="flex gap-2">
                 <Button variant="outline"><BarChart2 className="mr-2"/>{t('view_statistics')}</Button>
                 <Button><PlusCircle className="mr-2"/>{t('create_new_auction')}</Button>
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
        </TabsContent>
        
        {/* BIDDER DASHBOARD */}
        <TabsContent value="bidder" className="mt-6">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">{t('bidder_dashboard_title')}</CardTitle>
                    <CardDescription>{t('bidder_dashboard_desc')}</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <Card>
                           <CardHeader className="flex-row items-center justify-between pb-2">
                               <CardTitle className="text-sm font-medium">{t('active_bids')}</CardTitle>
                               <Gavel className="h-4 w-4 text-muted-foreground" />
                           </CardHeader>
                           <CardContent><div className="text-2xl font-bold">5</div></CardContent>
                        </Card>
                         <Card>
                           <CardHeader className="flex-row items-center justify-between pb-2">
                               <CardTitle className="text-sm font-medium">{t('auctions_won')}</CardTitle>
                               <Trophy className="h-4 w-4 text-muted-foreground" />
                           </CardHeader>
                           <CardContent><div className="text-2xl font-bold">12</div></CardContent>
                        </Card>
                         <Card>
                           <CardHeader className="flex-row items-center justify-between pb-2">
                               <CardTitle className="text-sm font-medium">{t('total_spent')}</CardTitle>
                               <CardTitle className="text-2xl font-bold">{formatCurrency(25500)}</CardTitle>
                           </CardHeader>
                        </Card>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{t('recent_bid_history')}</h3>
                     <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>{t('item')}</TableHead>
                                <TableHead>{t('status')}</TableHead>
                                <TableHead className="text-right">{t('your_bid')}</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {bidderHistory.map((bid) => (
                                <TableRow key={bid.id}>
                                <TableCell className="font-medium">{language === 'id' ? bid.item_id : bid.item}</TableCell>
                                <TableCell><Badge variant={getStatusVariant(bid.status)}>{getStatusText(bid.status)}</Badge></TableCell>
                                <TableCell className="text-right font-mono">{formatCurrency(bid.amount)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </TabsContent>

        {/* PARTNER DASHBOARD */}
        <TabsContent value="partner" className="mt-6">
           <Card>
            <CardHeader>
              <CardTitle className="font-headline">{t('partner_dashboard_title')}</CardTitle>
              <CardDescription>{t('partner_dashboard_desc')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div>
                     <h3 className="text-lg font-semibold mb-2">{t('producer_verification_requests')}</h3>
                     <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>{t('producer')}</TableHead>
                                <TableHead>{t('submission_date')}</TableHead>
                                <TableHead>{t('status')}</TableHead>
                                <TableHead className="text-right">{t('actions')}</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {verificationRequests.map((req) => (
                               <TableRow key={req.id}>
                                    <TableCell className="font-medium">{req.producer}</TableCell>
                                    <TableCell>{req.date}</TableCell>
                                    <TableCell><Badge variant={getStatusVariant(req.status)}>{getStatusText(req.status)}</Badge></TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="outline" size="sm"><UserCheck className="mr-2"/>{t('review')}</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                     </Table>
                </div>
                 <div>
                     <h3 className="text-lg font-semibold mb-2">{t('mentoring_schedule')}</h3>
                     <Card className="flex items-center justify-between p-4">
                        <p>{t('mentoring_schedule_desc')}</p>
                        <Button><Calendar className="mr-2"/>{t('view_schedule')}</Button>
                     </Card>
                </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* EXPORTER DASHBOARD */}
        <TabsContent value="exporter" className="mt-6">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle className="font-headline">{t('exporter_dashboard_title')}</CardTitle>
                        <CardDescription>{t('exporter_dashboard_desc')}</CardDescription>
                    </div>
                     <div className="flex gap-2">
                         <Button variant="outline"><List className="mr-2"/>{t('browse_export_commodities')}</Button>
                         <Button><UploadCloud className="mr-2"/>{t('upload_documents')}</Button>
                    </div>
                </CardHeader>
                <CardContent>
                     <h3 className="text-lg font-semibold mb-2">{t('my_shipments')}</h3>
                     <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>{t('product')}</TableHead>
                                <TableHead>{t('destination')}</TableHead>
                                <TableHead>{t('status')}</TableHead>
                                <TableHead className="text-right">{t('actions')}</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                           {exportShipments.map((ship) => (
                                <TableRow key={ship.id}>
                                    <TableCell className="font-medium">{language === 'id' ? ship.product_id : ship.product}</TableCell>
                                    <TableCell>{language === 'id' ? ship.destination_id : ship.destination}</TableCell>
                                    <TableCell><Badge variant={getStatusVariant(ship.status)}>{getStatusText(ship.status)}</Badge></TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="sm"><PackageCheck className="mr-2"/>{t('track')}</Button>
                                    </TableCell>
                                </TableRow>
                           ))}
                        </TableBody>
                     </Table>
                </CardContent>
            </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
