'use client';

import Image from 'next/image';

export function SplashScreen() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background">
      <video
        src="/images/intro.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover -z-10 brightness-50"
      />
      <div className="animate-pulse">
         <Image
            src="/images/logo.png"
            alt="AgriBid Logo"
            width={200}
            height={200}
            className="object-contain"
            priority
          />
      </div>
    </div>
  );
}