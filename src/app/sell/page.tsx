
'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useI18n } from '@/context/i18n';
import { Upload, Sparkles, Send, Loader2 } from 'lucide-react';
import { useToast } from "@/hooks/use-toast"
import { suggestPrice, SuggestPriceInput } from '@/ai/flows/suggest-price-flow';

const categories = [
    { key: "grains", label: "Grains" },
    { key: "livestock", label: "Livestock" },
    { key: "fruits_vegetables", label: "Fruits & Vegetables" },
    { key: "plantation", label: "Plantation" },
    { key: "marine_fishery", label: "Marine Fishery" },
    { key: "inland_fishery", label: "Inland Fishery" },
    { key: "forestry_products", label: "Forestry Products" },
];

export default function SellPage() {
    const { t, formatCurrency } = useI18n();
    const { toast } = useToast();
    const [productName, setProductName] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [imageDataUri, setImageDataUri] = useState<string | null>(null);
    const [suggestedPrice, setSuggestedPrice] = useState<number | null>(null);
    const [isSuggestingPrice, setIsSuggestingPrice] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
                setImageDataUri(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSuggestPrice = async () => {
        if (!productName || !description || !category || !imageDataUri) {
            toast({
                title: t('error'),
                description: t('fill_all_fields_for_suggestion'),
                variant: 'destructive',
            });
            return;
        }

        setIsSuggestingPrice(true);
        setSuggestedPrice(null);

        try {
            const input: SuggestPriceInput = {
                productName,
                description,
                category,
                photoDataUri: imageDataUri,
            };
            const result = await suggestPrice(input);
            setSuggestedPrice(result.suggestedPrice);
            toast({
                title: t('price_suggestion_success_title'),
                description: t('price_suggestion_success_desc'),
            });
        } catch (error) {
            console.error("Error suggesting price:", error);
            toast({
                title: t('error'),
                description: t('price_suggestion_error_desc'),
                variant: 'destructive',
            });
        } finally {
            setIsSuggestingPrice(false);
        }
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setIsSubmitting(true);
        // Here you would typically send the data to your backend for admin verification
        console.log({
            productName,
            description,
            category,
            imageDataUri,
            price: suggestedPrice // or a manually entered price
        });
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));

        toast({
            title: t('product_submitted_title'),
            description: t('product_submitted_desc'),
        });
        
        // Reset form
        setProductName('');
        setDescription('');
        setCategory('');
        setImagePreview(null);
        setImageDataUri(null);
        setSuggestedPrice(null);
        if(fileInputRef.current) fileInputRef.current.value = '';

        setIsSubmitting(false);
    };

    return (
        <div className="container mx-auto max-w-3xl px-4 py-8 md:py-16">
            <Card>
                <CardHeader>
                    <CardTitle className="text-3xl font-bold font-headline">{t('sell_your_product_title')}</CardTitle>
                    <CardDescription>{t('sell_your_product_desc')}</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="grid gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="product-name">{t('product_name')}</Label>
                            <Input id="product-name" value={productName} onChange={(e) => setProductName(e.target.value)} placeholder={t('product_name_placeholder')} required />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="category">{t('category')}</Label>
                            <Select onValueChange={setCategory} value={category}>
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
                            <Label htmlFor="description">{t('description')}</Label>
                            <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder={t('description_placeholder')} required />
                        </div>
                        <div className="grid gap-2">
                            <Label>{t('product_photo')}</Label>
                            <Card className="border-2 border-dashed">
                                <CardContent className="p-6 flex flex-col items-center justify-center text-center">
                                    {imagePreview ? (
                                        <div className="relative w-full max-w-sm aspect-video rounded-md overflow-hidden">
                                            <Image src={imagePreview} alt="Product preview" layout="fill" objectFit="cover" />
                                        </div>
                                    ) : (
                                        <>
                                            <Upload className="h-12 w-12 text-muted-foreground" />
                                            <p className="mt-2 text-sm text-muted-foreground">{t('drag_and_drop_or')}</p>
                                        </>
                                    )}
                                     <Button type="button" variant="outline" className="mt-4" onClick={() => fileInputRef.current?.click()}>
                                        {t('browse_files')}
                                    </Button>
                                    <Input ref={fileInputRef} id="file-upload" type="file" className="hidden" accept="image/*" onChange={handleImageChange} required />
                                </CardContent>
                            </Card>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-4 items-end">
                            <div className="grid gap-2">
                                <Label htmlFor="starting-price">{t('suggested_starting_bid')}</Label>
                                <Input id="starting-price" type="text" value={suggestedPrice ? formatCurrency(suggestedPrice) : ''} readOnly placeholder={t('click_suggest_button')} className="font-bold text-lg" />
                            </div>
                            <Button type="button" variant="outline" onClick={handleSuggestPrice} disabled={isSuggestingPrice}>
                                {isSuggestingPrice ? (
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                ) : (
                                    <Sparkles className="mr-2 h-4 w-4" />
                                )}
                                {t('suggest_price_with_ai')}
                            </Button>
                        </div>
                         <Button type="submit" size="lg" className="w-full mt-2" disabled={isSubmitting || !suggestedPrice}>
                            {isSubmitting ? (
                               <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                               <Send className="mr-2 h-5 w-5" />
                            )}
                            {t('submit_for_verification')}
                        </Button>
                        <p className="text-xs text-muted-foreground text-center">{t('admin_verification_note')}</p>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
