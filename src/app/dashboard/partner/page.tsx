
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { UserCheck, Calendar } from "lucide-react"
import { useI18n } from "@/context/i18n";
import Link from 'next/link';

const verificationRequests = [
    { id: 'VER-001', producer: 'Jaya Farm', producer_id: 'Jaya Farm', date: '2024-07-15', status: 'Pending', status_id: 'Menunggu' },
    { id: 'VER-002', producer: 'Samudera Hasil Laut', producer_id: 'Samudera Hasil Laut', date: '2024-07-14', status: 'Verified', status_id: 'Terverifikasi' },
]

export default function PartnerDashboardPage() {
    const { t, language } = useI18n();

    const getStatusVariant = (status: string) => {
        const s = status.toLowerCase();
        if (['active', 'winning', 'in transit', 'verified', 'terverifikasi'].includes(s)) return 'default';
        if (['ended', 'won', 'delivered', 'selesai', 'menang', 'terkirim'].includes(s)) return 'secondary';
        if (['pending', 'outbid', 'suspended', 'menunggu', 'kalah', 'ditangguhkan'].includes(s)) return 'destructive';
        return 'outline';
    }

    const getStatusText = (request: typeof verificationRequests[0]) => {
        const statusKey = `status_${(language === 'id' ? request.status_id : request.status).toLowerCase().replace(/ /g, '_')}`;
        return t(statusKey, language === 'id' ? request.status_id : request.status);
    }

    return (
        <>
            <header className="mb-8">
                <h1 className="text-4xl font-bold font-headline">{t('partner_dashboard_title')}</h1>
                <p className="text-muted-foreground">{t('partner_dashboard_desc')}</p>
            </header>
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">{t('producer_verification_requests')}</CardTitle>
                    <CardDescription>{t('partner_dashboard_desc')}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div>
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
                                        <TableCell className="font-medium">{language === 'id' ? req.producer_id : req.producer}</TableCell>
                                        <TableCell>{req.date}</TableCell>
                                        <TableCell><Badge variant={getStatusVariant(language === 'id' ? req.status_id : req.status)}>{getStatusText(req)}</Badge></TableCell>
                                        <TableCell className="text-right">
                                            <Button asChild variant="outline" size="sm">
                                                <Link href="#">
                                                    <UserCheck className="mr-2"/>{t('review')}
                                                </Link>
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-2 mt-4">{t('mentoring_schedule')}</h3>
                        <Card className="flex items-center justify-between p-4">
                            <p>{t('mentoring_schedule_desc')}</p>
                             <Button asChild>
                                <Link href="#">
                                    <Calendar className="mr-2"/>{t('view_schedule')}
                                </Link>
                            </Button>
                        </Card>
                    </div>
                </CardContent>
            </Card>
        </>
    )
}
