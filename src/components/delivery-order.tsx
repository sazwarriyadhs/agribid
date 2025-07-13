
'use client';
import { AgriBidLogo } from './icons';
import { useI18n } from '@/context/i18n';
import { Separator } from './ui/separator';

interface DeliveryOrderProps {
    order: {
        id: string;
        product: string;
        product_id: string;
        origin: string;
        destination: string;
        seller: string;
        buyer: string;
        quantity: string;
        shelfLife: string;
        packaging: string;
    }
}

export function DeliveryOrder({ order }: DeliveryOrderProps) {
    const { t, language } = useI18n();

    return (
        <div className="bg-white p-8 rounded-lg shadow-lg font-sans border text-sm text-gray-800">
            <header className="flex justify-between items-start pb-4 border-b-2 border-gray-800">
                <div>
                    <h1 className="text-2xl font-bold uppercase text-gray-900">{t('delivery_order_letter', 'Delivery Order Letter')}</h1>
                    <p className="text-gray-600">{t('shipment_id', 'Shipment ID')}: {order.id}</p>
                </div>
                <AgriBidLogo className="h-12" />
            </header>

            <section className="grid grid-cols-2 gap-8 my-6">
                <div>
                    <h2 className="font-bold text-gray-600 uppercase tracking-wide mb-2">{t('sender', 'Sender')}</h2>
                    <p className="font-semibold">{order.seller}</p>
                    <p>{order.origin}</p>
                </div>
                <div>
                    <h2 className="font-bold text-gray-600 uppercase tracking-wide mb-2">{t('recipient', 'Recipient')}</h2>
                    <p className="font-semibold">{order.buyer}</p>
                    <p>{order.destination}</p>
                </div>
            </section>

            <Separator className="my-6" />

            <section>
                <h2 className="font-bold text-gray-600 uppercase tracking-wide mb-4">{t('shipment_details', 'Shipment Details')}</h2>
                <table className="w-full">
                    <thead className="text-left bg-gray-100">
                        <tr>
                            <th className="p-2 font-semibold w-1/3">{t('product', 'Product')}</th>
                            <th className="p-2 font-semibold">{t('description', 'Description')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b">
                            <td className="p-2 align-top font-medium">{language === 'id' ? order.product_id : order.product}</td>
                            <td className="p-2 align-top">{t('goods_as_per_auction', 'Goods as per auction agreement {{auctionId}}', { auctionId: order.id.replace('ORD-','') })}</td>
                        </tr>
                        <tr className="border-b">
                            <td className="p-2 align-top font-medium">{t('quantity', 'Quantity / Volume')}</td>
                            <td className="p-2 align-top">{order.quantity}</td>
                        </tr>
                        <tr className="border-b">
                            <td className="p-2 align-top font-medium">{t('shelf_life', 'Product Durability / Shelf Life')}</td>
                            <td className="p-2 align-top">{order.shelfLife}</td>
                        </tr>
                        <tr className="border-b">
                            <td className="p-2 align-top font-medium">{t('packaging', 'Packaging Details')}</td>
                            <td className="p-2 align-top">{order.packaging}</td>
                        </tr>
                    </tbody>
                </table>
            </section>
            
            <section className="mt-8">
                 <p className="text-xs text-gray-500">
                    {t('delivery_order_terms', 'This document certifies that the goods listed above have been dispatched for delivery. Please present this document upon arrival. This is not a tax invoice.')}
                </p>
            </section>


            <footer className="grid grid-cols-3 gap-8 mt-16 pt-8 border-t">
                <div className="text-center">
                    <div className="h-20 w-full"></div>
                    <p className="border-t pt-2 mt-2 font-semibold">{t('sender_signature', 'Sender Signature')}</p>
                </div>
                 <div className="text-center">
                    <div className="h-20 w-full"></div>
                    <p className="border-t pt-2 mt-2 font-semibold">{t('carrier_signature', 'Carrier Signature')}</p>
                </div>
                 <div className="text-center">
                    <div className="h-20 w-full"></div>
                    <p className="border-t pt-2 mt-2 font-semibold">{t('recipient_signature', 'Recipient Signature')}</p>
                </div>
            </footer>
        </div>
    );
}
