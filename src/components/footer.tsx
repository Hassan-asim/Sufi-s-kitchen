import Link from "next/link";
import { CookingPot, Twitter, Instagram, Facebook } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <CookingPot className="h-7 w-7 text-primary" />
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © {new Date().getFullYear()} Sufi's Kitchen. All Rights Reserved.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Link href="#" aria-label="Twitter">
            <Twitter className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
          </Link>
          <Link href="#" aria-label="Instagram">
            <Instagram className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
          </Link>
          <Link href="#" aria-label="Facebook">
            <Facebook className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
