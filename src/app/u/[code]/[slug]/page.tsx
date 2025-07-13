
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


const auctionHistory = [
    { id: '1', item: 'Organic Wheat Harvest', item_id: 'Panen Gandum Organik', status: 'Active', status_id: 'Aktif', stock: '10 Ton', category: 'Grains' },
    { id: '2', item: 'Fresh Atlantic Salmon', item_id: 'Salmon Atlantik Segar', status: 'Ended', status_id: 'Selesai', stock: '5 Ton', category: 'Marine Fishery' },
    { id: '3', item: 'Palm Oil Kernels', item_id: 'Biji Kelapa Sawit', status: 'Pending', status_id: 'Menunggu', stock: '20 m³', category: 'Plantation' },
];

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
    if (user.name !== params.slug) {
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

    const getStatusText = (item: { status: string, status_id: string }) => {
        const currentStatus = language === 'id' ? item.status_id : item.status;
        const statusKey = `status_${currentStatus.toLowerCase().replace(/ /g, '_')}`;
        return t(statusKey, currentStatus);
    }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8 md:py-12">
      <div className="flex flex-col items-center md:flex-row md:items-start gap-8">
        <Card className="w-full md:w-1/3 text-center md:text-left">
          <CardHeader className="items-center">
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
          </CardContent>
        </Card>
        <div className="w-full md:w-2/3">
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
                            {auctionHistory.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell className="font-medium">
                                        <Link href={`/auctions/${item.id}`} className="hover:underline">
                                            {language === 'id' ? item.item_id : item.item}
                                        </Link>
                                    </TableCell>
                                    <TableCell>
                                        {item.stock}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Badge variant={getStatusVariant(language === 'id' ? item.status_id : item.status)}>{getStatusText(item)}</Badge>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
