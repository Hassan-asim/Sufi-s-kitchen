import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { CreditCard, ShoppingCart } from 'lucide-react';

// Inline SVG for JazzCash icon
const JazzCashIcon = () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.23 15.68l-4.24-4.24 1.41-1.41 2.83 2.83 5.66-5.66 1.41 1.41-7.07 7.07z" fill="#D42A2A"/>
        <text x="5" y="19" fontFamily="Arial" fontSize="4" fill="white" className="font-bold">JAZZCASH</text>
    </svg>
);

export default function CartPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="flex items-center justify-center mb-8">
        <ShoppingCart className="mx-auto h-12 w-12 text-primary" />
        <h1 className="text-4xl font-bold font-headline ml-4">Your Cart</h1>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
            <Card>
                <CardHeader>
                    <CardTitle>Cart Items</CardTitle>
                </CardHeader>
                <CardContent>
                    {/* Placeholder for cart items */}
                    <div className="flex flex-col items-center justify-center h-48 border-2 border-dashed rounded-lg">
                        <p className="text-muted-foreground">Your cart is currently empty.</p>
                        <p className="text-sm text-muted-foreground">Add some delicious dishes from our menu!</p>
                    </div>
                </CardContent>
            </Card>
        </div>

        <div className="md:col-span-1">
            <Card className="sticky top-24">
                <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex justify-between">
                        <p className="text-muted-foreground">Subtotal</p>
                        <p className="font-semibold">PKR 0.00</p>
                    </div>
                    <div className="flex justify-between">
                        <p className="text-muted-foreground">Taxes & Fees</p>
                        <p className="font-semibold">PKR 0.00</p>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-lg font-bold">
                        <p>Total</p>
                        <p>PKR 0.00</p>
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-3">
                     <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                        <CreditCard className="mr-2 h-5 w-5" />
                        Checkout with Stripe
                    </Button>
                    <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
                        <JazzCashIcon />
                        <span className="ml-2">Pay with JazzCash</span>
                    </Button>
                </CardFooter>
            </Card>
        </div>
      </div>
    </div>
  );
}
