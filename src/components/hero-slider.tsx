'use client';

import Image from 'next/image';

export default function HeroSlider() {
  return (
    <section className="relative w-full h-[90vh] bg-yellow-200 border-4 border-red-500 overflow-hidden">
      <div className="relative w-full h-full">
        <Image
          src="/images/hero1.png"
          alt="Test Hero"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-4xl">
          Gambar Hero Berhasil
        </div>
      </div>
    </section>
  );
}
