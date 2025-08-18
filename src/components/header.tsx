"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChefHat, ShoppingCart } from "lucide-react";
import { JaliPattern } from "./icons/jali-pattern";
import { useCart } from "@/hooks/use-cart";
import { useEffect, useState } from "react";
import { ThemeToggle } from "./theme-toggle";

const navLinks = [
  { href: "/", label: "Menu" },
  { href: "/events", label: "Events" },
];

export function Header() {
  const { items } = useCart();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const totalItems = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="absolute top-0 left-0 w-full h-full text-primary/5 dark:text-primary/10 -z-10 overflow-hidden">
        <JaliPattern className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-auto opacity-20" />
      </div>
      <div className="container flex h-20 items-center">
        <Link href="/" className="mr-6 flex flex-col items-center justify-center">
          <span className="font-headline text-2xl font-bold text-primary tracking-tighter">Sufi's</span>
          <span className="font-headline text-lg font-semibold -mt-2 text-foreground">Kitchen</span>
        </Link>
        <nav className="flex items-center space-x-4 lg:space-x-6 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "transition-colors hover:text-foreground/80",
                "text-foreground/60"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex flex-1 items-center justify-end gap-2">
           <Button asChild variant="ghost" size="icon" aria-label="Shopping Cart" className="relative">
            <Link href="/cart">
              <ShoppingCart className="h-5 w-5" />
              {isMounted && items.length > 0 && (
                <Badge variant="destructive" className="absolute -right-2 -top-2 h-5 w-5 justify-center p-0 text-xs">
                  {totalItems}
                </Badge>
              )}
            </Link>
          </Button>
          <Button asChild variant="ghost" size="icon" aria-label="About the Chef">
            <Link href="/about">
              <ChefHat className="h-5 w-5" />
            </Link>
          </Button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
