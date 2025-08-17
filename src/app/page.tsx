import Link from "next/link";
import { dishes, todaysSpecialDishes } from "@/lib/data";
import { MenuItemCard } from "@/components/menu-item-card";
import { Button } from "@/components/ui/button";
import { JaliPattern } from "@/components/icons/jali-pattern";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col gap-16 md:gap-24 py-8 md:py-12">
      <section className="relative container mx-auto text-center flex flex-col items-center gap-4">
        <JaliPattern className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-auto text-primary/10 -z-10" />
        <h1 className="text-5xl md:text-7xl font-bold font-headline tracking-tighter text-foreground">
          Sufi's Kitchen
        </h1>
        <h2 className="text-4xl md:text-6xl font-urdu text-primary font-bold">
          صوفی کا باورچی خانہ
        </h2>
        <p className="max-w-2xl text-lg text-foreground/80">
          A culinary journey into the heart of authentic Pakistani flavors.
          Experience tradition, taste, and togetherness in every dish.
        </p>
        <div className="flex gap-4 mt-4">
          <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Link href="#featured">View Menu</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/events">Our Events</Link>
          </Button>
        </div>
      </section>

      <section id="featured" className="container mx-auto">
        <h3 className="text-3xl font-bold font-headline mb-6 text-center text-accent">
          Featured Dishes
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {dishes.map((dish) => (
            <MenuItemCard key={dish.id} dish={dish} />
          ))}
        </div>
      </section>

      <section className="container mx-auto">
        <div className="bg-card rounded-xl p-8 md:p-12 border flex flex-col md:flex-row items-center gap-8 shadow-lg">
          <div className="flex-1">
            <h3 className="text-3xl font-bold font-headline text-accent">Today's Specials</h3>
            <p className="text-muted-foreground mt-2 mb-6">
              Our weekly specials, available for a limited time. Don't miss out!
            </p>
            <Button asChild>
              <Link href="#todays-specials">
                Explore Specials <ArrowRight className="ml-2" />
              </Link>
            </Button>
          </div>
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {todaysSpecialDishes.slice(0, 2).map((dish) => (
              <MenuItemCard key={dish.id} dish={dish} />
            ))}
          </div>
        </div>
      </section>

      <section id="todays-specials" className="container mx-auto">
        <h3 className="text-3xl font-bold font-headline mb-6 text-center text-accent">All Today's Specials</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {todaysSpecialDishes.map((dish) => (
            <MenuItemCard key={dish.id} dish={dish} />
          ))}
        </div>
      </section>
    </div>
  );
}
