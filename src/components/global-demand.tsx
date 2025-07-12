
'use client';
import { useI18n } from '@/context/i18n';
import { Badge } from './ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Leaf, Coffee, Fish, Shell, TrendingUp } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface DemandItem {
    productKey: string;
    Icon: LucideIcon;
    demandKey: string;
    countries: string[];
}

const globalDemandData: DemandItem[] = [
    { productKey: "palm_oil", Icon: Leaf, demandKey: "high_demand", countries: ["China", "India", "Netherlands"] },
    { productKey: "coffee", Icon: Coffee, demandKey: "high_demand", countries: ["USA", "Germany", "Japan"] },
    { productKey: "shrimp", Icon: Fish, demandKey: "stable_demand", countries: ["USA", "Japan", "Vietnam"] },
    { productKey: "cocoa", Icon: Shell, demandKey: "growing_demand", countries: ["Malaysia", "USA", "Singapore"] },
];

export function GlobalDemand() {
  const { t } = useI18n();

  const getDemandVariant = (demandKey: string) => {
    switch (demandKey) {
        case 'high_demand': return 'default';
        case 'growing_demand': return 'secondary';
        case 'stable_demand': return 'outline';
        default: return 'outline';
    }
  }

  return (
    <section className="py-16 md:py-24 bg-secondary/50">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold text-center font-headline">{t('global_demand_title')}</h2>
        <p className="text-center text-muted-foreground mt-2 mb-12">{t('global_demand_subtitle')}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {globalDemandData.map((item) => (
            <Card key={item.productKey} className="flex flex-col">
              <CardHeader>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="bg-primary/10 p-3 rounded-full">
                            <item.Icon className="h-6 w-6 text-primary" />
                        </div>
                        <CardTitle className="text-xl font-headline">{t(item.productKey)}</CardTitle>
                    </div>
                    <Badge variant={getDemandVariant(item.demandKey)}>{t(item.demandKey)}</Badge>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm font-medium text-muted-foreground mb-3">{t('top_destinations')}</p>
                <div className="flex flex-wrap gap-2">
                    {item.countries.map(country => (
                        <div key={country} className="bg-card-foreground/10 text-card-foreground rounded-full px-3 py-1 text-xs font-medium">
                            {country}
                        </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
