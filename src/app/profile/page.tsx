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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const bidHistory = [
    { id: 1, item: 'Organic Wheat Harvest', status: 'Winning', amount: 4500, date: '2023-10-26' },
    { id: 2, item: 'Granny Smith Apples', status: 'Won', amount: 800, date: '2023-10-25' },
    { id: 3, item: 'Heirloom Tomatoes', status: 'Outbid', amount: 350, date: '2023-10-24' },
    { id: 4, item: 'Pasture-Raised Eggs', status: 'Won', amount: 150, date: '2023-10-22' },
]

export default function ProfilePage() {
    const getStatusVariant = (status: string) => {
        switch (status) {
            case 'Won': return 'default';
            case 'Winning': return 'secondary';
            case 'Outbid': return 'destructive';
            default: return 'outline';
        }
    }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8 md:py-12">
      <div className="flex flex-col items-center md:flex-row md:items-start gap-8">
        <Card className="w-full md:w-1/3 text-center md:text-left">
          <CardHeader className="items-center">
            <Avatar className="h-24 w-24 mb-4">
              <AvatarImage src="https://placehold.co/100x100.png" />
              <AvatarFallback>JF</AvatarFallback>
            </Avatar>
            <CardTitle className="text-2xl font-headline">John Farmer</CardTitle>
            <CardDescription>john.farmer@email.com</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full">Edit Profile</Button>
          </CardContent>
        </Card>
        <div className="w-full md:w-2/3">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Bid History</CardTitle>
                    <CardDescription>A record of your recent bidding activity.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                            <TableHead>Item</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Amount</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {bidHistory.map((bid) => (
                                <TableRow key={bid.id}>
                                    <TableCell className="font-medium">
                                        <Link href={`/auctions/${bid.id}`} className="hover:underline">
                                            {bid.item}
                                        </Link>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={getStatusVariant(bid.status)}>{bid.status}</Badge>
                                    </TableCell>
                                    <TableCell className="text-right font-mono">${bid.amount.toLocaleString()}</TableCell>
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
