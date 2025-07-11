
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { UserCheck, Calendar } from "lucide-react"
import { useI18n } from "@/context/i18n";

const verificationRequests = [
    { id: 'VER-001', producer: 'Jaya Farm', producer_id: 'Jaya Farm', date: '2024-07-15', status: 'Pending', status_id: 'Menunggu' },
    { id: 'VER-002', producer: 'Samudera Hasil Laut', producer_id: 'Samudera Hasil Laut', date: '2024-07-14', status: 'Verified', status_id: 'Terverifikasi' },
]

export default function PartnerDashboardPage() {
    const { t } = useI18n();

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
                <h1 className="text-4xl font-bold font-headline">{t('partner_dashboard_title')}</h1>
                <p className="text-muted-foreground">{t('partner_dashboard_desc')}</p>
            </header>
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">Partner Portal</CardTitle>
                    <CardDescription>Manage your activities and collaborations.</CardDescription>
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
        </div>
    )
}
