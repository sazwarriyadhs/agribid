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
  'buyer',
  'mitra',
  'vendor',
  'seller',
  'producer'
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
  buyer: 'Buyer',
  mitra: 'Mitra',
  vendor: 'Vendor',
  seller: 'Seller',
  producer: 'Producer'
};
