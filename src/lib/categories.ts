import type { Role } from './roles';

export interface CategoryDefinition {
  key: string;
  labelKey: string;
}

export const allCategories: Record<string, CategoryDefinition> = {
  pertanian: { key: 'Pertanian', labelKey: 'Pertanian' },
  peternakan: { key: 'Peternakan', labelKey: 'Peternakan' },
  perikanan: { key: 'Perikanan', labelKey: 'Perikanan' },
  perkebunan: { key: 'Perkebunan', labelKey: 'Perkebunan' },
  hasil_hutan: { key: 'Hasil Hutan', labelKey: 'Hasil Hutan' },
};

export const roleToCategoryMap: Partial<Record<Role, CategoryDefinition>> = {
  petani: allCategories.pertanian,
  nelayan: allCategories.perikanan,
  peternak: allCategories.peternakan,
  peladang: allCategories.perkebunan,
  'pengolah hasil hutan': allCategories.hasil_hutan,
  // Generic roles map to broader categories if needed, or can be left undefined to allow choice
  producer: allCategories.pertanian, // Default, can be changed
  seller: allCategories.pertanian, // Default, can be changed
};
