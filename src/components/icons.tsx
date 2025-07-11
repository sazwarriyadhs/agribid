import Image from 'next/image';
import { cn } from '@/lib/utils';

export function AgriBidLogo({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'relative flex flex-col items-center justify-center',
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-2">
         <Image
            src="/images/logo.png"
            alt="AgriBid Logo"
            width={48}
            height={48}
            className="object-contain"
          />
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-primary">AgriBid</span>
            <span className="text-sm font-semibold text-primary/80 tracking-widest -mt-1">INDONESIA</span>
          </div>
      </div>
    </div>
  );
}
