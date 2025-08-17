
"use client";

import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { useCart } from "@/hooks/use-cart";
import { useEffect } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  // This useEffect will recalculate totals on initial load from localStorage
  useEffect(() => {
    useCart.getState()._recalculateTotals();
  }, [])

  return (
    <html lang="en">
      <head>
        <title>Sufi's Kitchen</title>
        <meta name="description" content="Authentic Pakistani Cuisine by Chef Sufi Asim Iftikhar. Experience tradition, taste, and togetherness in every dish." />
        
        {/* Open Graph Meta Tags for social sharing */}
        <meta property="og:title" content="Sufi's Kitchen" />
        <meta property="og:description" content="Authentic Pakistani Cuisine by Chef Sufi Asim Iftikhar." />
        <meta property="og:image" content="https://placehold.co/1200x630.png" data-ai-hint="Sufi logo" />
        <meta property="og:url" content="https://sufis-kitchen.com" />
        <meta name="twitter:card" content="summary_large_image" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Nastaliq+Urdu:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        <div className="relative flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        <Toaster />
      </body>
    </html>
  );
}
