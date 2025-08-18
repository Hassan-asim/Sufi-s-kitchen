"use client";

import Image from "next/image";
import { notFound } from "next/navigation";
import { dishes, todaysSpecialDishes } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { ReviewCard } from "@/components/review-card";
import { Star, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { useToast } from "@/hooks/use-toast";

type DishDetailPageProps = {
  params: {
    slug: string;
  };
};

export default function DishDetailPage({ params }: DishDetailPageProps) {
  const { addItem } = useCart();
  const { toast } = useToast();
  
  const allDishes = [...dishes, ...todaysSpecialDishes];
  const dish = allDishes.find((d) => d.slug === params.slug);

  if (!dish) {
    notFound();
  }
  
  const handleAddToCart = () => {
    addItem(dish);
    toast({
      title: "Added to Cart!",
      description: `${dish.name} has been added to your cart.`,
    });
  };

  const averageRating =
    dish.reviews.length > 0
      ? dish.reviews.reduce((acc, review) => acc + review.rating, 0) /
        dish.reviews.length
      : 0;

  return (
    <div className="container mx-auto py-12">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        <div className="aspect-[4/3] relative overflow-hidden rounded-xl shadow-lg">
          <Image
            src={dish.image}
            alt={dish.name}
            fill
            className="object-cover"
            data-ai-hint={dish.aiHint}
          />
        </div>
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl md:text-5xl font-bold font-headline tracking-tight">
            {dish.name}
          </h1>
          <div className="flex items-center gap-2">
            {averageRating > 0 && (
                <>
                <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-5 h-5 ${ i < Math.round(averageRating) ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground/30" }`} />
                    ))}
                </div>
                <span className="text-muted-foreground font-medium">({dish.reviews.length} reviews)</span>
                </>
            )}
            </div>
          <p className="text-lg text-foreground/80">{dish.longDescription}</p>
          <div className="flex items-center justify-between">
            <p className="text-2xl font-bold text-primary">PKR {dish.price.toFixed(2)}</p>
            <Button size="lg" onClick={handleAddToCart}>
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
            </Button>
          </div>

          <div>
            <h3 className="text-xl font-semibold font-headline mb-2">
              Ingredients
            </h3>
            <div className="flex flex-wrap gap-2">
              {dish.ingredients.map((ingredient) => (
                <Badge key={ingredient} variant="secondary">
                  {ingredient}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 md:mt-16">
        <h3 className="text-2xl md:text-3xl font-bold font-headline mb-6 text-center">
          What Our Customers Say
        </h3>
        {dish.reviews.length > 0 ? (
          <div className="max-w-3xl mx-auto space-y-4">
            {dish.reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground">
            No reviews yet. Be the first to share your thoughts!
          </p>
        )}
      </div>
    </div>
  );
}
