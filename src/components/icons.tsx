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
      <Image
        src="/images/logo.png"
        alt="AgriBid Logo"
        width={160}
        height={160}
        className="object-contain"
      />
    </div>
  );
}
