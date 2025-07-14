
'use client'
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
import { MemberCard } from '@/components/member-card';

// TODO: Connect to the database and fetch the user's products.
const userProducts: any[] = [];

export default function ProfilePage() {
    const { t, language } = useI18n();
    const { user } = useAuth();
    const params = useParams();

    if (!user) {
        // In a real app, you might redirect to login or show a public version.
        // For now, we'll just show a loading state or a "not found" message.
        return notFound();
    }
    
    // Simple check to ensure the user is viewing their own profile based on the URL
    if (user.id !== params.code) {
        return notFound();
    }
    
    const userProfile = {
        code: `U-${user.id.slice(0, 4).toUpperCase()}`,
        slug: user.name,
        name: user.name.charAt(0).toUpperCase() + user.name.slice(1).replace(/-/g, ' '),
        email: user.email,
        role: user.role.charAt(0).toUpperCase() + user.role.slice(1),
        role_id: t(`role_${user.role}`),
        avatarUrl: `https://placehold.co/150x150.png?text=${user.name.charAt(0).toUpperCase()}`,
        avatarFallback: user.name.charAt(0).toUpperCase()
    };
    

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
                <Badge variant="outline" className="mt-2">{language === 'id' ? userProfile.role_id : userProfile.role}</Badge>
              </CardHeader>
              <CardContent className="flex flex-col gap-2">
                <Button className="w-full">{t('edit_profile')}</Button>
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
                <CardContent className="flex items-center justify-center">
                   <div className="w-full max-w-[350px]">
                     <MemberCard user={user} />
                   </div>
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
