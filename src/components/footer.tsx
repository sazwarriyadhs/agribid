import Link from 'next/link';
import { AgriBidLogo } from './icons';

function SocialIcon({ children }: { children: React.ReactNode }) {
  return <div className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 cursor-pointer transition-colors">{children}</div>;
}

export function AppFooter() {
  return (
    <footer className="bg-secondary/70 border-t">
      <div className="container px-4 md:px-6 py-8">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="flex flex-col gap-2">
            <Link href="/" className="flex items-center gap-2 mb-2">
              <AgriBidLogo className="h-8 w-8" />
              <span className="text-xl font-bold font-headline">AgriBid</span>
            </Link>
            <p className="text-sm text-muted-foreground">The future of agricultural trade, today.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-3 font-headline">Marketplace</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="text-muted-foreground hover:text-primary">Grains</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary">Livestock</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary">Fruits & Vegetables</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary">Seafood</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3 font-headline">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="text-muted-foreground hover:text-primary">About Us</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary">Careers</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary">Partners</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3 font-headline">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="text-muted-foreground hover:text-primary">Terms of Service</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-6 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} AgriBid Inc. All rights reserved.</p>
          <div className="flex items-center gap-4 mt-4 sm:mt-0">
            <p className="text-sm text-muted-foreground">Follow us</p>
            <XIcon />
            <FacebookIcon />
            <LinkedInIcon />
          </div>
        </div>
      </div>
    </footer>
  );
}


function XIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
      <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
    )
}

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
    )
}

function LinkedInIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
    )
}
