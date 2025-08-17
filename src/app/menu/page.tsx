import Link from "next/link";
import { dishes, todaysSpecialDishes } from "@/lib/data";
import { MenuItemCard } from "@/components/menu-item-card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function MenuPage() {
    const allDishes = [
        ...dishes.filter(d => d.category === 'BBQ'),
        ...dishes.filter(d => d.category === 'Karahi'),
        ...dishes.filter(d => d.category === 'Rice'),
        ...dishes.filter(d => d.category === 'Breads'),
        ...dishes.filter(d => d.category === 'Chinese'),
        ...dishes.filter(d => d.category === 'Curry'),
        ...dishes.filter(d => d.category === 'Appetizer'),
        ...dishes.filter(d => d.category === 'Soup'),
        ...dishes.filter(d => d.category === 'Dessert'),
    ];

  return (
    <div className="container mx-auto py-12">
        <h1 className="text-4xl font-bold font-headline text-center mb-8">Our Menu</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {allDishes.map((dish) => (
                <MenuItemCard key={dish.id} dish={dish} />
            ))}
        </div>
        
        <section id="todays-specials" className="mt-16">
            <h3 className="text-3xl font-bold font-headline mb-6 text-center text-accent">Today's Specials</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {todaysSpecialDishes.map((dish) => (
                <MenuItemCard key={dish.id} dish={dish} />
            ))}
            </div>
      </section>
    </div>
  );
}
