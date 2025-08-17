"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ChefHat, CookingPot } from "lucide-react";
import { JaliPattern } from "./icons/jali-pattern";

const navLinks = [
  { href: "/", label: "Menu" },
  { href: "/ai-tools", label: "AI Tools" },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="absolute top-0 left-0 w-full h-full text-primary/5 dark:text-primary/10 -z-10 overflow-hidden">
        <JaliPattern className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-auto opacity-20" />
      </div>
      <div className="container flex h-16 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <CookingPot className="h-7 w-7 text-primary" />
          <span className="font-bold font-headline text-lg">
            Sufi's Kitchen
          </span>
        </Link>
        <nav className="flex items-center space-x-4 lg:space-x-6 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "transition-colors hover:text-foreground/80",
                pathname === link.href
                  ? "text-foreground"
                  : "text-foreground/60"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex flex-1 items-center justify-end gap-2">
          <Button variant="ghost" size="icon" aria-label="User Profile">
            <ChefHat className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
