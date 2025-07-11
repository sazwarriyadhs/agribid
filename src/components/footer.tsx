'use client'
import Link from 'next/link';
import { AgriBidLogo } from './icons';
import { useI18n } from '@/context/i18n';

function SocialIcon({ children }: { children: React.ReactNode }) {
  return <div className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 cursor-pointer transition-colors">{children}</div>;
}

export function AppFooter() {
  const { t } = useI18n();

  const categories = [
    { href: "#", label: "Grains", label_id: "Biji-bijian" },
    { href: "#", label: "Livestock", label_id: "Ternak" },
    { href: "#", label: "Fruits & Vegetables", label_id: "Buah & Sayuran" },
    { href: "#", label: "Seafood", label_id: "Makanan Laut" },
  ];

  const companyLinks = [
    { href: "#", label: "About Us", label_id: "Tentang Kami" },
    { href: "#", label: "Careers", label_id: "Karier" },
    { href: "#", label: "Partners", label_id: "Mitra" },
    { href: "#", label: "Contact", label_id: "Kontak" },
  ];

  const legalLinks = [
    { href: "#", label: "Terms of Service", label_id: "Ketentuan Layanan" },
    { href: "#", label: "Privacy Policy", label_id: "Kebijakan Privasi" },
  ];

  return (
    <footer className="bg-secondary/70 border-t">
      <div className="container px-4 md:px-6 py-8">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="flex flex-col gap-2">
            <Link href="/" className="flex items-center gap-2 mb-2">
              <AgriBidLogo className="h-8 w-8" />
              <span className="text-xl font-bold font-headline">AgriBid</span>
            </Link>
            <p className="text-sm text-muted-foreground">{t('footer_tagline')}</p>
          </div>
          <div>
            <h4 className="font-semibold mb-3 font-headline">{t('marketplace')}</h4>
            <ul className="space-y-2 text-sm">
              {categories.map((cat, i) => (
                <li key={i}><Link href={cat.href} className="text-muted-foreground hover:text-primary">{t(cat.label.toLowerCase().replace(/ & /g, '_').replace(/ /g, '_'))}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3 font-headline">{t('company')}</h4>
            <ul className="space-y-2 text-sm">
              {companyLinks.map((link, i) => (
                 <li key={i}><Link href={link.href} className="text-muted-foreground hover:text-primary">{t(link.label.toLowerCase().replace(/ /g, '_'))}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3 font-headline">{t('legal')}</h4>
            <ul className="space-y-2 text-sm">
              {legalLinks.map((link, i) => (
                 <li key={i}><Link href={link.href} className="text-muted-foreground hover:text-primary">{t(link.label.toLowerCase().replace(/ /g, '_'))}</Link></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-6 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} AgriBid Inc. {t('all_rights_reserved')}</p>
          <div className="flex items-center gap-4 mt-4 sm:mt-0">
            <p className="text-sm text-muted-foreground">{t('follow_us')}</p>
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
