"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/hooks/use-cart';
import { CreditCard, ShoppingCart, PlusCircle, MinusCircle, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

// Inline SVG for JazzCash icon
const JazzCashIcon = () => (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.23 15.68l-4.24-4.24 1.41-1.41 2.83 2.83 5.66-5.66 1.41 1.41-7.07 7.07z" fill="#D42A2A"/>
        <text x="5" y="19" fontFamily="Arial" fontSize="4" fill="white" className="font-bold">JAZZCASH</text>
    </svg>
);

export default function CartPage() {
  const { items, removeItem, updateItemQuantity, clearCart, totalPrice } = useCart();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null; // or a loading spinner
  }
  
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="flex items-center justify-center mb-8">
        <ShoppingCart className="mx-auto h-12 w-12 text-primary" />
        <h1 className="text-4xl font-bold font-headline ml-4">Your Cart</h1>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Cart Items</CardTitle>
                    {items.length > 0 && (
                        <Button variant="outline" size="sm" onClick={clearCart}>
                            <Trash2 className="mr-2 h-4 w-4" />
                            Clear Cart
                        </Button>
                    )}
                </CardHeader>
                <CardContent>
                    {items.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-48 border-2 border-dashed rounded-lg">
                            <p className="text-muted-foreground">Your cart is currently empty.</p>
                            <Button asChild variant="link" className="mt-2">
                                <Link href="/">Start Shopping</Link>
                            </Button>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {items.map(item => (
                                <div key={item.id} className="flex items-center gap-4">
                                    <Image src={item.image} alt={item.name} width={80} height={80} className="rounded-md object-cover"/>
                                    <div className="flex-grow">
                                        <h3 className="font-semibold">{item.name}</h3>
                                        <p className="text-sm text-muted-foreground">PKR {item.price.toFixed(2)}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Button size="icon" variant="ghost" onClick={() => updateItemQuantity(item.id, item.quantity - 1)}>
                                            <MinusCircle className="h-5 w-5" />
                                        </Button>
                                        <span>{item.quantity}</span>
                                        <Button size="icon" variant="ghost" onClick={() => updateItemQuantity(item.id, item.quantity + 1)}>
                                            <PlusCircle className="h-5 w-5" />
                                        </Button>
                                    </div>
                                    <p className="font-semibold w-24 text-right">PKR {(item.price * item.quantity).toFixed(2)}</p>
                                    <Button size="icon" variant="destructive" onClick={() => removeItem(item.id)}>
                                        <Trash2 className="h-5 w-5" />
                                    </Button>
                                </div>
                            ))}
                        </div>
                    )}
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
                        <p className="font-semibold">PKR {totalPrice.toFixed(2)}</p>
                    </div>
                    <div className="flex justify-between">
                        <p className="text-muted-foreground">Taxes & Fees</p>
                        <p className="font-semibold">PKR 0.00</p>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-lg font-bold">
                        <p>Total</p>
                        <p>PKR {totalPrice.toFixed(2)}</p>
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-3">
                     <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white" disabled={items.length === 0}>
                        <CreditCard className="mr-2 h-5 w-5" />
                        Checkout with Stripe
                    </Button>
                    <Button className="w-full bg-red-600 hover:bg-red-700 text-white" disabled={items.length === 0}>
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
