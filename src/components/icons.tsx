import { Leaf } from "lucide-react";

export function AgriBidLogo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <div className="flex items-center justify-center bg-primary/20 text-primary rounded-lg p-1">
      <Leaf {...props} />
    </div>
  );
}
