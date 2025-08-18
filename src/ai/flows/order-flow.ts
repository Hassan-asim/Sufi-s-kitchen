'use server';
/**
 * @fileOverview A flow to process customer orders.
 *
 * This file contains the Genkit flow for processing an order. It is designed
 * to be extensible for sending emails or saving to a database in the future.
 * 
 * - processOrder - A function that handles the order processing.
 * - OrderInput - The input type for the processOrder function.
 * - OrderOutput - The return type for the processOrder function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

// Define the structure for a single item in the cart
const CartItemSchema = z.object({
  id: z.number(),
  name: z.string(),
  price: z.number(),
  quantity: z.number(),
  // Add other dish properties if needed, but keep it minimal for the order
});

// Define the structure for the customer's information
const CustomerInfoSchema = z.object({
  name: z.string().describe("Customer's full name"),
  phone: z.string().describe("Customer's contact phone number"),
  address: z.string().describe("Customer's full delivery address"),
});

// Define the input schema for the order processing flow
const OrderInputSchema = z.object({
  customer: CustomerInfoSchema,
  items: z.array(CartItemSchema).describe("The list of items in the cart"),
  totalPrice: z.number().describe("The final total price of the order including delivery"),
  paymentMethod: z.enum(['COD', 'Easypaisa']).describe("The selected payment method"),
});
export type OrderInput = z.infer<typeof OrderInputSchema>;

// Define the output schema for the flow
const OrderOutputSchema = z.object({
  success: z.boolean().describe("Whether the order was processed successfully"),
  orderId: z.string().describe("A unique ID for the processed order"),
  confirmationMessage: z.string().describe("A message to show the user upon completion"),
});
export type OrderOutput = z.infer<typeof OrderOutputSchema>;

// This is the main function that the frontend will call.
export async function processOrder(input: OrderInput): Promise<OrderOutput> {
  return processOrderFlow(input);
}


// Here we define the Genkit flow.
const processOrderFlow = ai.defineFlow(
  {
    name: 'processOrderFlow',
    inputSchema: OrderInputSchema,
    outputSchema: OrderOutputSchema,
  },
  async (input) => {
    
    console.log("Processing order:", JSON.stringify(input, null, 2));

    // ** BACKEND LOGIC GOES HERE **
    // In a real application, you would:
    // 1. Save the order to a database (e.g., Firestore).
    // 2. Call an email service (e.g., SendGrid, Resend) to send the formatted receipt.
    //    The email would be sent to: hassanasim337@gmail.com and aaoooz1@gmail.com
    
    // For now, we'll just simulate a successful order processing.
    const orderId = `SUFI-${Date.now()}`;
    
    const message = input.paymentMethod === 'Easypaisa' 
      ? `Your order #${orderId} is confirmed! Please remember to send the receipt via WhatsApp.`
      : `Your order #${orderId} has been placed successfully! It will be delivered soon.`;

    // Return a successful response.
    return {
      success: true,
      orderId: orderId,
      confirmationMessage: message,
    };
  }
);
