"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/hooks/use-cart';
import { ShoppingCart, PlusCircle, MinusCircle, Trash2, Wallet, Smartphone } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { processOrder } from '@/ai/flows/order-flow';
import { useToast } from '@/hooks/use-toast';


export default function CartPage() {
  const { items, removeItem, updateItemQuantity, clearCart, totalPrice } = useCart();
  const { toast } = useToast();
  const [isMounted, setIsMounted] = useState(false);
  
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const deliveryFee = totalPrice > 0 && totalPrice < 3000 ? 150 : 0;
  const finalTotal = totalPrice + deliveryFee;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const isFormValid = () => {
    return name.trim() && phone.trim() && address.trim() && items.length > 0;
  }

  const handlePlaceOrder = async (paymentMethod: 'COD' | 'Easypaisa') => {
    if (!isFormValid()) {
      toast({
        title: 'Incomplete Information',
        description: 'Please fill in your name, phone number, and address.',
        variant: 'destructive',
      });
      return;
    }
    
    setIsSubmitting(true);

    try {
      const orderDetails = {
        customer: { name, phone, address },
        items,
        totalPrice: finalTotal,
        paymentMethod,
      }
      
      const result = await processOrder(orderDetails);
      
      toast({
        title: 'Order Placed!',
        description: result.confirmationMessage,
      });

      clearCart();

    } catch (error) {
      console.error('Failed to process order:', error);
      toast({
        title: 'Order Failed',
        description: 'There was a problem placing your order. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };


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
                         <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button variant="outline" size="sm">
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Clear Cart
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action cannot be undone. This will permanently clear all items from your cart.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={clearCart}>Continue</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
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
                                        <Button size="icon" variant="ghost" onClick={() => updateItemQuantity(item.id, item.quantity - 1)} disabled={isSubmitting}>
                                            <MinusCircle className="h-5 w-5" />
                                        </Button>
                                        <span>{item.quantity}</span>
                                        <Button size="icon" variant="ghost" onClick={() => updateItemQuantity(item.id, item.quantity + 1)} disabled={isSubmitting}>
                                            <PlusCircle className="h-5 w-5" />
                                        </Button>
                                    </div>
                                    <p className="font-semibold w-24 text-right">PKR {(item.price * item.quantity).toFixed(2)}</p>
                                    <Button size="icon" variant="destructive" onClick={() => removeItem(item.id)} disabled={isSubmitting}>
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
                    <div className="grid grid-cols-2 gap-4">
                         <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input 
                                id="name" 
                                placeholder="Your Name" 
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                disabled={isSubmitting}
                            />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="phone">Phone</Label>
                            <Input 
                                id="phone" 
                                placeholder="0300-1234567" 
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                disabled={isSubmitting}
                            />
                        </div>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="address">Delivery Address</Label>
                        <Input 
                            id="address" 
                            placeholder="Your address in Banigala" 
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            disabled={isSubmitting}
                        />
                    </div>
                    <Separator />
                    <div className="flex justify-between">
                        <p className="text-muted-foreground">Subtotal</p>
                        <p className="font-semibold">PKR {totalPrice.toFixed(2)}</p>
                    </div>
                     <div className="flex justify-between">
                        <p className="text-muted-foreground">Delivery Fee</p>
                        <p className="font-semibold">PKR {deliveryFee.toFixed(2)}</p>
                    </div>
                    <p className="text-xs text-muted-foreground">Delivery is free for orders over PKR 3000.</p>
                    <Separator />
                    <div className="flex justify-between text-lg font-bold">
                        <p>Total</p>
                        <p>PKR {finalTotal.toFixed(2)}</p>
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-3">
                     <Button className="w-full" disabled={!isFormValid() || isSubmitting} onClick={() => handlePlaceOrder('COD')}>
                        <Wallet className="mr-2 h-5 w-5" />
                        {isSubmitting ? 'Placing Order...' : 'Cash on Delivery'}
                    </Button>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                           <Button className="w-full bg-green-600 hover:bg-green-700 text-white" disabled={!isFormValid() || isSubmitting}>
                                <Smartphone className="mr-2 h-5 w-5" />
                                Pay with Easypaisa
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                            <AlertDialogTitle>Easypaisa Payment</AlertDialogTitle>
                            <AlertDialogDescription>
                                Please transfer <span className="font-bold">PKR {finalTotal.toFixed(2)}</span> to the account number <span className="font-bold">03334616426</span>.
                                <br/><br/>
                                After payment, please send the transaction receipt to our WhatsApp number <span className="font-bold">03134567636</span> to confirm your order.
                            </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handlePlaceOrder('Easypaisa')} disabled={isSubmitting}>
                                I Have Paid
                            </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </CardFooter>
            </Card>
        </div>
      </div>
    </div>
  );
}
