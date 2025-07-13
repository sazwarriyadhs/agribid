
'use client';

import { useState, useRef, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useI18n } from '@/context/i18n';
import { Upload, Sparkles, Send, Loader2, Save, Info } from 'lucide-react';
import { useToast } from "@/hooks/use-toast"
import { suggestPrice, SuggestPriceInput } from '@/ai/flows/suggest-price-flow';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { getMockProducts } from '@/app/dashboard/seller/page';

const categories = [
    { key: "grains", label: "Grains" },
    { key: "livestock", label: "Livestock" },
    { key: "fruits_vegetables", label: "Fruits & Vegetables" },
    { key: "plantation", label: "Plantation" },
    { key: "marine_fishery", label: "Marine Fishery" },
    { key: "inland_fishery", label: "Inland Fishery" },
    { key: "forestry_products", label: "Forestry Products" },
];

function SellPageContents() {
    const { t, formatCurrency, language } = useI18n();
    const { toast } = useToast();
    const searchParams = useSearchParams();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [isEditMode, setIsEditMode] = useState(false);
    const [productId, setProductId] = useState<string | null>(null);

    const [productName, setProductName] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [quantity, setQuantity] = useState('');
    const [shelfLife, setShelfLife] = useState('');
    const [packaging, setPackaging] = useState('');
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [imageDataUri, setImageDataUri] = useState<string | null>(null);
    const [price, setPrice] = useState<number | string>('');
    
    const [isSuggestingPrice, setIsSuggestingPrice] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const editId = searchParams.get('edit');
        if (editId) {
            const products = getMockProducts();
            const productToEdit = products.find(p => p.id === editId);
            if (productToEdit) {
                setIsEditMode(true);
                setProductId(productToEdit.id);
                setProductName(language === 'id' ? productToEdit.name_id : productToEdit.name);
                setDescription(productToEdit.description);
                setCategory(productToEdit.category);
                setQuantity(productToEdit.quantity);
                setShelfLife(productToEdit.shelfLife);
                setPackaging(productToEdit.packaging);
                // In a real app, you would fetch the image data URI if it's not already available
                setImagePreview(`https://placehold.co/600x400.png`); 
                setImageDataUri(`https://placehold.co/600x400.png`);
                setPrice(productToEdit.price);
            }
        }
    }, [searchParams, language]);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const result = reader.result as string;
                setImagePreview(result);
                setImageDataUri(result);
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
        setPrice('');

        try {
            const input: SuggestPriceInput = {
                productName,
                description,
                category,
                photoDataUri: imageDataUri,
            };
            const result = await suggestPrice(input);
            setPrice(result.suggestedPrice);
            toast({
                title: t('price_suggestion_success_title'),
                description: `${t('price_suggestion_success_desc')} ${formatCurrency(result.suggestedPrice)}`,
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
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        if (isEditMode) {
            toast({
                title: t('product_updated_title', 'Product Updated'),
                description: t('product_updated_desc', `"${productName}" has been successfully updated.`),
            });
        } else {
            toast({
                title: t('product_submitted_title'),
                description: t('product_submitted_desc'),
            });
            // Reset form only on create
            setProductName('');
            setDescription('');
            setCategory('');
            setQuantity('');
            setShelfLife('');
            setPackaging('');
            setImagePreview(null);
            setImageDataUri(null);
            setPrice('');
            if(fileInputRef.current) fileInputRef.current.value = '';
        }

        setIsSubmitting(false);
    };

    return (
        <div className="container mx-auto max-w-3xl px-4 py-8 md:py-16">
            <Card>
                <CardHeader>
                    <CardTitle className="text-3xl font-bold font-headline">
                        {isEditMode ? t('edit_product_title', 'Edit Product') : t('sell_your_product_title')}
                    </CardTitle>
                    <CardDescription>
                        {isEditMode ? t('edit_product_desc', 'Update the details for your product listing.') : t('sell_your_product_desc')}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="grid gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="product-name">{t('product_name')}</Label>
                            <Input id="product-name" value={productName} onChange={(e) => setProductName(e.target.value)} placeholder={t('product_name_placeholder')} required />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                                <Label htmlFor="quantity">{t('quantity', 'Quantity / Volume')}</Label>
                                <Input id="quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder={t('quantity_placeholder', 'e.g., 10 Ton, 500 Ekor')} required />
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="description">{t('description')}</Label>
                            <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder={t('description_placeholder')} required />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                             <div className="grid gap-2">
                                <Label htmlFor="shelf-life">{t('shelf_life', 'Product Durability / Shelf Life')}</Label>
                                <Input id="shelf-life" value={shelfLife} onChange={(e) => setShelfLife(e.target.value)} placeholder={t('shelf_life_placeholder', 'e.g., 7 days, 6 months')} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="packaging">{t('packaging', 'Packaging Details')}</Label>
                                <Input id="packaging" value={packaging} onChange={(e) => setPackaging(e.target.value)} placeholder={t('packaging_placeholder', 'e.g., Refrigerated container')} />
                            </div>
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
                                        {imagePreview ? t('change_photo', 'Change Photo') : t('browse_files')}
                                    </Button>
                                    <Input ref={fileInputRef} id="file-upload" type="file" className="hidden" accept="image/*" required={!isEditMode} onChange={handleImageChange} />
                                </CardContent>
                            </Card>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-4 items-end">
                             <div className="grid gap-2">
                                <Label htmlFor="starting-price">{t('starting_bid')}</Label>
                                <Input 
                                    id="starting-price" 
                                    type="number" 
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    placeholder={t('suggested_starting_bid')} 
                                    className="font-bold text-lg"
                                    required
                                />
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
                         <Alert>
                            <Info className="h-4 w-4" />
                            <AlertTitle>{t('auction_requirements_title')}</AlertTitle>
                            <AlertDescription>
                                {t('auction_requirements_desc')}
                            </AlertDescription>
                         </Alert>
                         <Button type="submit" size="lg" className="w-full mt-2" disabled={isSubmitting || !price}>
                            {isSubmitting ? (
                               <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                               isEditMode ? <Save className="mr-2 h-5 w-5" /> : <Send className="mr-2 h-5 w-5" />
                            )}
                            {isEditMode ? t('update_product_button', 'Update Product') : t('submit_for_verification')}
                        </Button>
                        {!isEditMode && <p className="text-xs text-muted-foreground text-center">{t('admin_verification_note')}</p>}
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}


export default function SellPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SellPageContents />
        </Suspense>
    )
}
