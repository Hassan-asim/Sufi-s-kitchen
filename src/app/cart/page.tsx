import { ShoppingCart } from 'lucide-react';

export default function CartPage() {
  return (
    <div className="container mx-auto py-12">
      <div className="text-center">
        <ShoppingCart className="mx-auto h-16 w-16 text-primary mb-4" />
        <h1 className="text-4xl font-bold font-headline">Your Cart</h1>
        <p className="text-muted-foreground mt-2">
          Your shopping cart is currently empty.
        </p>
      </div>
    </div>
  );
}
