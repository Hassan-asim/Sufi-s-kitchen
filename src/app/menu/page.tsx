import Link from "next/link";
import { dishes, todaysSpecialDishes } from "@/lib/data";
import { MenuItemCard } from "@/components/menu-item-card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function MenuPage() {
    const categories = [
        "Chinese",
        "Rice",
        "Soup",
        "Fast Food",
        "Seafood",
        "Karahi",
        "BBQ",
        "Breads",
        "Sides",
    ];

    const specialCategories = [
        "Special Orders",
        "Daig"
    ];

    const regularDishes = categories.flatMap(category => 
        dishes.filter(d => d.category === category)
    );

    const specialDishes = specialCategories.flatMap(category =>
        todaysSpecialDishes.filter(d => d.category === category)
    );
    
  return (
    <div className="container mx-auto py-12">
        <h1 className="text-4xl font-bold font-headline text-center mb-8">Our Menu</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {regularDishes.map((dish) => (
                <MenuItemCard key={dish.id} dish={dish} />
            ))}
        </div>
        
        <section id="todays-specials" className="mt-16">
            <h2 className="text-4xl font-bold font-headline text-center mb-8 text-accent">Special & Bulk Orders</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {specialDishes.map((dish) => (
                <MenuItemCard key={dish.id} dish={dish} />
            ))}
            </div>
             <p className="text-center text-muted-foreground mt-8">*Special orders require two-day advance booking.</p>
             <p className="text-center text-muted-foreground">Delivery within Banigala is Rs. 150 for orders under Rs. 3000, and free for orders above.</p>
             <p className="text-center text-muted-foreground">Delivery for up to 4 daigs is Rs. 1500, and free for more than 4.</p>
      </section>
    </div>
  );
}
