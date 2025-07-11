import Image from 'next/image';
import { cn } from '@/lib/utils';

export function AgriBidLogo({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'relative flex items-center justify-center',
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-2">
         <Image
            src="/images/logo.png"
            alt="AgriBid Logo"
            width={40}
            height={40}
            className="object-contain"
          />
          <div className="flex flex-col">
            <span className="text-xl font-bold text-primary">AgriBid</span>
            <span className="text-xs font-semibold text-primary/80 tracking-widest -mt-1">INDONESIA</span>
          </div>
      </div>
    </div>
  );
}
