
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useI18n } from "@/context/i18n";
import { useAuth } from "@/context/auth";
import { Globe, Package, Plane } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function InternationalBuyerDashboardPage() {
    const { t, language } = useI18n();
    const { user } = useAuth();
    
    const pageTitle = t('international_buyer_dashboard_title');
    
    // A simple welcome message that acknowledges the user's country
    const welcomeMessage = user?.country 
        ? t('international_buyer_dashboard_desc_country', { country: user.country })
        : t('international_buyer_dashboard_desc');

    return (
        <>
             <header className="mb-8">
                <h1 className="text-4xl font-bold font-headline">{pageTitle}</h1>
                <p className="text-muted-foreground">{welcomeMessage}</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                    <CardHeader>
                        <Globe className="h-8 w-8 text-primary mb-2"/>
                        <CardTitle>{t('browse_export_commodities')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground mb-4">{t('browse_export_commodities_desc')}</p>
                        <Button asChild>
                            <Link href="/">{t('start_browsing')}</Link>
                        </Button>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <Plane className="h-8 w-8 text-primary mb-2"/>
                        <CardTitle>{t('manage_imports_title')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground mb-4">{t('manage_imports_desc')}</p>
                         <Button asChild variant="secondary">
                            <Link href="#">{t('view_my_orders')}</Link>
                        </Button>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <Package className="h-8 w-8 text-primary mb-2"/>
                        <CardTitle>{t('verified_producers_title')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground mb-4">{t('verified_producers_desc')}</p>
                         <Button asChild variant="secondary">
                            <Link href="#">{t('find_producers')}</Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </>
    )
}
