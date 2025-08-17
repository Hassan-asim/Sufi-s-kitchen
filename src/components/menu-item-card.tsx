"use client";

import Link from "next/link";
import Image from "next/image";
import type { Dish } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "./ui/button";
import { ShoppingCart } from "lucide-react";

interface MenuItemCardProps {
  dish: Dish;
}

export function MenuItemCard({ dish }: MenuItemCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden h-full group/card transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 rounded-xl border">
      <CardHeader className="p-0">
        <Link href={`/menu/${dish.slug}`} className="block relative">
          <div className="overflow-hidden aspect-[4/3] relative">
            <Image
              src={dish.image}
              alt={dish.name}
              fill
              className="object-cover transition-transform duration-300 group-hover/card:scale-110"
              data-ai-hint={dish.aiHint}
            />
            <div className="steam group-hover/card:opacity-100">
                <div className="steam-element"></div>
                <div className="steam-element"></div>
                <div className="steam-element"></div>
            </div>
          </div>
        </Link>
      </CardHeader>
      <CardContent className="p-4 flex-grow flex flex-col">
        <div className="flex-grow">
          <CardTitle className="text-lg font-headline mb-1">
            <Link href={`/menu/${dish.slug}`} className="hover:text-primary transition-colors">{dish.name}</Link>
          </CardTitle>
          <CardDescription>{dish.description}</CardDescription>
        </div>
      </CardContent>
       <CardFooter className="p-4 pt-0 flex justify-between items-center">
          <p className="text-lg font-bold text-primary">PKR {dish.price.toFixed(2)}</p>
          <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90">
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add
          </Button>
        </CardFooter>
    </Card>
  );
}
