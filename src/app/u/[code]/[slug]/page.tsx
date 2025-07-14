
'use client'
import { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from '@/components/ui/table';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useI18n } from '@/context/i18n';
import { useParams, notFound } from 'next/navigation';
import { useAuth } from '@/context/auth';
import { MemberCardFront, MemberCardBack } from '@/components/member-card';
import { Download, Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { roleLabels } from '@/lib/roles';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { Input } from '@/components/ui/input';
import Image from 'next/image';

// TODO: Connect to the database and fetch the user's products.
const userProducts: any[] = [];

export default function ProfilePage() {
    const { t, language } = useI18n();
    const { user } = useAuth();
    const params = useParams();
    const { toast } = useToast();
    const frontCardRef = useRef<HTMLDivElement>(null);
    const backCardRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [avatarUrl, setAvatarUrl] = useState(`https://placehold.co/150x150.png?text=${user?.name.charAt(0).toUpperCase()}`);
    const [imagePreview, setImagePreview] = useState<string | null>(null);


    if (!user) {
        // In a real app, you might redirect to login or show a public version.
        // For now, we'll just show a loading state or a "not found" message.
        return notFound();
    }
    
    // Simple check to ensure the user is viewing their own profile based on the URL
    if (user.id !== params.code) {
        return notFound();
    }

    const expiryDate = new Date();
    expiryDate.setFullYear(expiryDate.getFullYear() + 1);

    const userIdSuffix = user.id.replace('usr_', '');
    const membershipId = `U-USR-${userIdSuffix.slice(0, 4).toUpperCase()}`;
    const userCode = `${user.role.charAt(0).toUpperCase()}${userIdSuffix.slice(0, 3).toUpperCase()}`;

    const userProfile = {
        id: membershipId,
        name: user.name.charAt(0).toUpperCase() + user.name.slice(1).replace(/-/g, ' '),
        email: user.email,
        role: user.role,
        role_label: roleLabels[user.role as keyof typeof roleLabels] || user.role,
        role_label_id: t(`role_${user.role}`),
        role_desc: "Penjual", // This can be enhanced later
        verified: user.verified,
        expires: expiryDate.toLocaleDateString('id-ID', { day:'2-digit', month: '2-digit', year: 'numeric' }),
        slug: user.name,
        code: userCode,
        avatarUrl: avatarUrl,
        avatarFallback: user.name.charAt(0).toUpperCase(),
        qrCodeData: {
          userId: membershipId,
          name: (user.name.charAt(0).toUpperCase() + user.name.slice(1).replace(/-/g, ' ')).toUpperCase(),
          validUntil: expiryDate.toLocaleDateString('id-ID', { day:'2-digit', month: '2-digit', year: 'numeric' }),
          code: userCode,
          slug: user.name,
          role: user.role
        }
    };
    
    const handleDownload = (cardRef: React.RefObject<HTMLDivElement>, side: 'front' | 'back') => {
        if (cardRef.current) {
            html2canvas(cardRef.current, {
                useCORS: true,
                backgroundColor: null,
                scale: 2 // Increase resolution
            }).then((canvas) => {
                const link = document.createElement('a');
                link.download = `agribid-member-card-${user.name}-${side}.png`;
                link.href = canvas.toDataURL('image/png');
                link.click();
            });
        }
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const result = reader.result as string;
                setImagePreview(result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleProfileUpdate = () => {
        if (imagePreview) {
            setAvatarUrl(imagePreview);
        }
        toast({
            title: "Profil Diperbarui",
            description: "Foto profil Anda telah berhasil diperbarui.",
        });
        setImagePreview(null);
    }

    const getStatusVariant = (status: string) => {
        const s = status.toLowerCase();
        if (['active', 'winning', 'verified', 'aktif'].includes(s)) return 'default';
        if (['ended', 'won', 'delivered', 'selesai', 'menang', 'terverifikasi', 'terkirim'].includes(s)) return 'secondary';
        if (['pending', 'outbid', 'suspended', 'menunggu', 'kalah', 'ditangguhkan'].includes(s)) return 'destructive';
        return 'outline';
    }

    const getStatusText = (item: any) => {
        const currentStatus = language === 'id' ? item.status_id : item.status;
        const statusKey = `status_${currentStatus.toLowerCase().replace(/ /g, '_')}`;
        return t(statusKey, currentStatus);
    }

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8 md:py-12">
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
            <Card className="sticky top-20">
              <CardHeader className="items-center text-center">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src={userProfile.avatarUrl} alt={userProfile.name} />
                  <AvatarFallback>{userProfile.avatarFallback}</AvatarFallback>
                </Avatar>
                <CardTitle className="text-2xl font-headline">{userProfile.name}</CardTitle>
                <CardDescription>{userProfile.email}</CardDescription>
                <div className="flex gap-2 mt-2">
                    <Badge variant="outline">{language === 'id' ? userProfile.role_label_id : userProfile.role_label}</Badge>
                    <Badge variant={userProfile.verified ? 'default' : 'destructive'}>
                        {t(userProfile.verified ? 'status_verified' : 'status_unverified', userProfile.verified ? 'Verified' : 'Unverified')}
                    </Badge>
                </div>
              </CardHeader>
              <CardContent className="flex flex-col gap-2">
                <Dialog>
                    <DialogTrigger asChild>
                        <Button className="w-full">{t('edit_profile')}</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>{t('edit_profile')}</DialogTitle>
                            <DialogDescription>Perbarui foto profil Anda.</DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                           <div className="grid gap-2">
                                <p className="text-sm font-medium">Foto Profil</p>
                                <Card className="border-2 border-dashed">
                                    <CardContent className="p-6 flex flex-col items-center justify-center text-center">
                                        {imagePreview ? (
                                            <div className="relative w-full max-w-sm aspect-square rounded-md overflow-hidden">
                                                <Image src={imagePreview} alt="Pratinjau Foto Profil" layout="fill" objectFit="cover" />
                                            </div>
                                        ) : (
                                            <div className="relative w-full max-w-sm aspect-square rounded-md overflow-hidden bg-secondary flex items-center justify-center">
                                                <Avatar className="h-32 w-32 text-4xl">
                                                    <AvatarImage src={userProfile.avatarUrl} />
                                                    <AvatarFallback>{userProfile.avatarFallback}</AvatarFallback>
                                                </Avatar>
                                            </div>
                                        )}
                                        <Button type="button" variant="outline" className="mt-4" onClick={() => fileInputRef.current?.click()}>
                                            {imagePreview ? t('change_photo', 'Ganti Foto') : "Unggah Foto Baru"}
                                        </Button>
                                        <Input ref={fileInputRef} id="file-upload" type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button type="button" variant="secondary">{t('cancel')}</Button>
                            </DialogClose>
                            <DialogClose asChild>
                                <Button type="button" onClick={handleProfileUpdate}>Simpan Perubahan</Button>
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
                 <Button asChild variant="outline" className="w-full">
                    <Link href={`/dashboard/${user.role}`}>{t('dashboard')}</Link>
                 </Button>
              </CardContent>
            </Card>
        </div>
        <div className="lg:col-span-2 space-y-8">
             <Card>
                <CardHeader>
                    <CardTitle className="font-headline">{t('membership_card')}</CardTitle>
                    <CardDescription>{t('membership_card_subtitle')}</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center gap-6">
                   <div className="grid md:grid-cols-2 gap-8 justify-items-center">
                      <div ref={frontCardRef}><MemberCardFront user={userProfile} /></div>
                      <div ref={backCardRef}><MemberCardBack /></div>
                   </div>
                   {user.verified ? (
                     <div className="flex gap-4 mt-4">
                        <Button onClick={() => handleDownload(frontCardRef, 'front')}>
                            <Download className="mr-2 h-4 w-4" />
                            {t('download_front_card', 'Download Front')}
                        </Button>
                         <Button onClick={() => handleDownload(backCardRef, 'back')} variant="secondary">
                            <Download className="mr-2 h-4 w-4" />
                            {t('download_back_card', 'Download Back')}
                        </Button>
                     </div>
                   ) : (
                    <p className="text-xs text-muted-foreground mt-6">{t('must_be_verified_to_download', 'Your account must be verified to download the card.')}</p>
                   )}
                </CardContent>
            </Card>
            {user.role === 'seller' && (
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline">{t('my_products')}</CardTitle>
                        <CardDescription>{t('my_products_desc')}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                <TableHead>{t('product')}</TableHead>
                                <TableHead>{t('stock')}</TableHead>
                                <TableHead className="text-right">{t('status')}</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {userProducts.length > 0 ? userProducts.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell className="font-medium">
                                            <Link href={`/auctions/${item.id}`} className="hover:underline">
                                                {language === 'id' ? item.name_id : item.name}
                                            </Link>
                                        </TableCell>
                                        <TableCell>
                                            {item.quantity}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Badge variant={getStatusVariant(language === 'id' ? item.status_id : item.status)}>{getStatusText(item)}</Badge>
                                        </TableCell>
                                    </TableRow>
                                )) : (
                                    <TableRow>
                                        <TableCell colSpan={3} className="h-24 text-center">
                                            {t('no_products_found', 'No products listed yet.')}
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            )}
        </div>
      </div>
    </div>
  );
}
