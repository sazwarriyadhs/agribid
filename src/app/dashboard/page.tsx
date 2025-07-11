
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, UserCheck, Gavel, Handshake, Plane } from "lucide-react";
import Link from "next/link";
import { useI18n } from "@/context/i18n";

const roles = [
  { href: "/dashboard/producer", title: "role_producer", description: "producer_dashboard_desc", icon: UserCheck },
  { href: "/dashboard/bidder", title: "role_bidder", description: "bidder_dashboard_desc", icon: Gavel },
  { href: "/dashboard/partner", title: "role_partner", description: "partner_dashboard_desc", icon: Handshake },
  { href: "/dashboard/exporter", title: "role_exporter", description: "exporter_dashboard_desc", icon: Plane },
];

export default function DashboardSelectorPage() {
  const { t } = useI18n();

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8 md:py-12">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold font-headline">{t('dashboard_title')}</h1>
        <p className="text-muted-foreground">{t('dashboard_subtitle')}</p>
      </header>
      <div className="grid md:grid-cols-2 gap-6">
        {roles.map((role) => (
          <Card key={role.href}>
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                    <role.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                    <CardTitle className="font-headline">{t(role.title as any)}</CardTitle>
                    <CardDescription>{t(role.description as any)}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full">
                <Link href={role.href}>
                  {t('dashboard')} <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
