'use client'

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useI18n } from "@/context/i18n";
import { MapPin, Package, ShieldCheck, CheckCircle, Truck, Warehouse, Check, FileText } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"


// Mock data for a shipment. In a real app, this would be fetched based on the [id].
const shipmentData = {
    id: '1',
    productName: 'Organic Wheat Harvest - 10 Tons',
    productName_id: 'Panen Gandum Organik - 10 Ton',
    image: 'https://placehold.co/800x600.png',
    aiHint: 'wheat harvest',
    origin: 'Green Valley Farms, Kansas',
    destination: 'Bakery Co., Chicago',
    status: 'In Transit',
    status_id: 'Dalam Perjalanan',
    guarantee: 'Product quality is guaranteed to match the description. Full refund available if the product is not as described upon receival, subject to verification.',
    guarantee_id: 'Kualitas produk dijamin sesuai dengan deskripsi. Pengembalian dana penuh tersedia jika produk tidak sesuai deskripsi saat diterima, tergantung pada verifikasi.',
    trackingHistory: [
        { status: 'Delivered', status_id: 'Terkirim', date: '2023-07-25', location: 'Bakery Co., Chicago', isCompleted: false },
        { status: 'Out for Delivery', status_id: 'Sedang Diantar', date: '2023-07-25', location: 'Chicago Distribution Center', isCompleted: false },
        { status: 'In Transit', status_id: 'Dalam Perjalanan', date: '2023-07-24', location: 'Kansas City Hub', isCompleted: true },
        { status: 'Picked Up by Vendor', status_id: 'Diambil oleh Vendor', date: '2023-07-23', location: 'Green Valley Farms, Kansas', isCompleted: true },
        { status: 'Order Created', status_id: 'Pesanan Dibuat', date: '2023-07-22', location: 'AgriBid Platform', isCompleted: true },
    ]
}


export default function ShipmentTrackingPage({ params }: { params: { id: string } }) {
    const { t, language } = useI18n();
    const { toast } = useToast();
    const [isConfirmed, setIsConfirmed] = useState(false);

    const handleConfirmReceipt = () => {
        setIsConfirmed(true);
        toast({
            title: t('receipt_confirmed_title', 'Receipt Confirmed'),
            description: t('receipt_confirmed_desc', 'Thank you for confirming the delivery.'),
        });
    }

    const getStatusText = (status: string, status_id: string) => {
        const key = `status_${status.toLowerCase().replace(/ /g, '_')}`;
        return t(key, language === 'id' ? status_id : status);
    }
    
    const getIconForStatus = (status: string) => {
        const s = status.toLowerCase();
        if (s.includes('delivered')) return <CheckCircle className="h-6 w-6 text-green-500"/>
        if (s.includes('out for delivery')) return <Truck className="h-6 w-6 text-primary"/>
        if (s.includes('in transit')) return <Truck className="h-6 w-6 text-primary"/>
        if (s.includes('picked up')) return <Warehouse className="h-6 w-6 text-primary"/>
        if (s.includes('created')) return <FileText className="h-6 w-6 text-primary"/>
        return <Package className="h-6 w-6 text-muted-foreground"/>
    }

    return (
        <div className="container mx-auto max-w-4xl px-4 py-8 md:py-16">
            <Card>
                <CardHeader>
                    <CardTitle className="text-3xl font-bold font-headline">{t('track_shipment', 'Track Shipment')}</CardTitle>
                    <CardDescription>{t('shipment_id', 'Shipment ID')}: ORD-{params.id}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                    {/* Shipment Summary */}
                    <div className="p-4 border rounded-lg grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">{t('product')}</p>
                            <p className="font-semibold">{language === 'id' ? shipmentData.productName_id : shipmentData.productName}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">{t('status')}</p>
                            <Badge variant="default">{getStatusText(shipmentData.status, shipmentData.status_id)}</Badge>
                        </div>
                         <div className="flex flex-col items-start md:items-end">
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button disabled={isConfirmed}>
                                        <Check className="mr-2 h-4 w-4" /> {isConfirmed ? t('product_received_confirmed', 'Product Received') : t('confirm_receipt_button', 'Confirm Product Receipt')}
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>{t('confirm_receipt_title', 'Confirm Receipt?')}</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            {t('confirm_receipt_desc', 'By confirming, you agree that the product has been received in good condition as per the agreement. This action cannot be undone.')}
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>{t('cancel')}</AlertDialogCancel>
                                        <AlertDialogAction onClick={handleConfirmReceipt}>{t('confirm', 'Confirm')}</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </div>
                    </div>

                    {/* Tracking History */}
                    <div>
                        <h3 className="text-xl font-semibold mb-4">{t('tracking_history', 'Tracking History')}</h3>
                        <div className="relative pl-6">
                            <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-border"></div>
                            {shipmentData.trackingHistory.map((item, index) => (
                                <div key={index} className="flex items-start gap-6 mb-8">
                                    <div className={`z-10 flex h-6 w-6 items-center justify-center rounded-full ${item.isCompleted ? 'bg-primary' : 'bg-muted'}`}>
                                       {item.isCompleted && <Check className="h-4 w-4 text-primary-foreground" />}
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-semibold">{getStatusText(item.status, item.status_id)}</p>
                                        <p className="text-sm text-muted-foreground">{item.location}</p>
                                        <p className="text-xs text-muted-foreground mt-1">{item.date}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <Separator />
                    
                    {/* Guarantee Info */}
                    <div>
                        <Alert variant="secondary">
                            <ShieldCheck className="h-4 w-4"/>
                            <AlertTitle className="font-semibold">{t('guarantee_and_warranty_title', 'Guarantee & Warranty')}</AlertTitle>
                            <AlertDescription>
                                {language === 'id' ? shipmentData.guarantee_id : shipmentData.guarantee}
                            </AlertDescription>
                        </Alert>
                    </div>

                </CardContent>
            </Card>
        </div>
    );
}
