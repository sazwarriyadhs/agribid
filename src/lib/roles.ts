
// lib/roles.ts
export const allowedRoles = [
  'admin',
  'klien',
  'petani',
  'peternak',
  'nelayan',
  'peladang',
  'pengolah',
  'pelaku_usaha',
  'eksportir',
  'exporter',
  'buyer',
  'bidder',
  'mitra',
  'vendor',
  'partner',
  'seller',
  'producer',
  'international_buyer'
] as const;

export type Role = (typeof allowedRoles)[number];

export const roleLabels: Record<Role, string> = {
  admin: 'Admin',
  klien: 'Klien',
  petani: 'Petani',
  peternak: 'Peternak',
  nelayan: 'Nelayan',
  peladang: 'Peladang',
  pengolah: 'Pengolah',
  pelaku_usaha: 'Pelaku Usaha',
  eksportir: 'Eksportir',
  exporter: 'Exporter',
  buyer: 'Buyer',
  bidder: 'Bidder',
  mitra: 'Mitra',
  vendor: 'Vendor',
  partner: 'Partner',
  seller: 'Seller',
  producer: 'Producer',
  international_buyer: 'International Buyer',
};
