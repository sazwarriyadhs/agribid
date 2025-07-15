
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useI18n } from '@/context/i18n';
import { Send, Loader2 } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { useAuth } from '@/context/auth';
import { useRouter } from 'next/navigation';

const categories = [
    { key: "grains", label: "Grains" },
    { key: "livestock", label: "Livestock" },
    { key: "fruits_vegetables", label: "Fruits & Vegetables" },
    { key: "plantation", label: "Plantation" },
    { key: "marine_fishery", label: "Marine Fishery" },
    { key: "inland_fishery", label: "Inland Fishery" },
    { key: "forestry_products", label: "Forestry Products" },
];

export default function PostRequestPage() {
    const { t } = useI18n();
    const { toast } = useToast();
    const { user } = useAuth();
    const router = useRouter();

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setIsSubmitting(true);
        
        // TODO: Implement a server action to save the request to the database.
        
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        toast({
            title: t('request_posted_title', 'Request Posted'),
            description: t('request_posted_desc', 'Your request has been posted to the marketplace.'),
        });

        setIsSubmitting(false);
        router.push('/');
    };

    return (
        <div className="container mx-auto max-w-2xl px-4 py-8 md:py-16">
            <Card>
                <CardHeader>
                    <CardTitle className="text-3xl font-bold font-headline">
                        {t('post_request_title', 'Post a Product Request')}
                    </CardTitle>
                    <CardDescription>
                        {t('post_request_page_desc', 'Let producers know what you need by filling out the form below.')}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="grid gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="product-name">{t('product_name')}</Label>
                            <Input id="product-name" placeholder={t('product_name_placeholder', 'e.g., Robusta Coffee Beans, Grade 1')} required />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="category">{t('category')}</Label>
                                <Select required>
                                    <SelectTrigger id="category">
                                        <SelectValue placeholder={t('select_category_placeholder')} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categories.map((cat) => (
                                            <SelectItem key={cat.key} value={cat.label}>{t(cat.key as any)}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="quantity">{t('required_volume', 'Required Volume')}</Label>
                                <Input id="quantity" placeholder={t('required_volume_placeholder', 'e.g., 1x20ft Container')} required />
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="specifications">{t('specifications', 'Detailed Specifications')}</Label>
                            <Textarea id="specifications" placeholder={t('specifications_placeholder', 'e.g., Moisture content <12%, non-GMO, Halal certified...')} required />
                        </div>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="target-price">{t('target_price_optional', 'Target Price (Optional)')}</Label>
                                <Input id="target-price" placeholder="e.g., 2500 USD/Ton" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="destination-country">{t('destination_country', 'Destination Country')}</Label>
                                <Input id="destination-country" value={user?.country || ''} readOnly />
                            </div>
                        </div>
                        
                         <Button type="submit" size="lg" className="w-full mt-2" disabled={isSubmitting}>
                            {isSubmitting ? (
                               <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                               <Send className="mr-2 h-5 w-5" />
                            )}
                            {t('post_request_button', 'Post My Request')}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
