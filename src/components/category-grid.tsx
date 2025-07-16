
'use client';

import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';

export interface ProductCategory {
  category: string;
  image_url: string;
  aiHint?: string;
}

interface CategoryGridProps {
  categories: ProductCategory[];
  onCategorySelect?: (category: string) => void;
}

export default function CategoryGrid({ categories, onCategorySelect }: CategoryGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {categories.map((cat, i) => (
        <Card
          key={i}
          className="cursor-pointer overflow-hidden hover:ring-2 hover:ring-primary transition"
          onClick={() => onCategorySelect?.(cat.category)}
        >
          <CardContent className="p-0 relative h-36">
            <Image
              src={cat.image_url}
              alt={cat.category}
              fill
              data-ai-hint={cat.aiHint}
              className="object-cover"
            />
            <div className="absolute bottom-0 inset-x-0 bg-black/60 text-white text-center text-sm py-1">
              {cat.category}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
