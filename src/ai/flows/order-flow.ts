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
  image: z.string().optional(),
  description: z.string().optional(),
  longDescription: z.string().optional(),
  aiHint: z.string().optional(),
  ingredients: z.array(z.string()).optional(),
  slug: z.string().optional(),
  category: z.string().optional(),
  reviews: z.array(z.any()).optional(),
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

// A helper function to format the order into a nice HTML email body.
function formatOrderAsHtml(orderId: string, input: OrderInput): string {
  const itemsHtml = input.items.map(item => `
    <tr>
      <td style="padding: 8px; border-bottom: 1px solid #ddd;">${item.name} (x${item.quantity})</td>
      <td style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right;">PKR ${(item.price * item.quantity).toFixed(2)}</td>
    </tr>
  `).join('');

  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6;">
      <h1 style="color: #FFB800;">New Order Received: #${orderId}</h1>
      <p>A new order has been placed on the Sufi's Kitchen website.</p>
      
      <h2 style="border-bottom: 2px solid #FFB800; padding-bottom: 5px;">Customer Details</h2>
      <p><strong>Name:</strong> ${input.customer.name}</p>
      <p><strong>Phone:</strong> ${input.customer.phone}</p>
      <p><strong>Address:</strong> ${input.customer.address}</p>
      
      <h2 style="border-bottom: 2px solid #FFB800; padding-bottom: 5px;">Order Details</h2>
      <table style="width: 100%; border-collapse: collapse;">
        <thead>
          <tr>
            <th style="padding: 8px; border-bottom: 2px solid #ddd; text-align: left;">Item</th>
            <th style="padding: 8px; border-bottom: 2px solid #ddd; text-align: right;">Price</th>
          </tr>
        </thead>
        <tbody>
          ${itemsHtml}
        </tbody>
      </table>
      
      <h2 style="border-bottom: 2px solid #FFB800; padding-bottom: 5px;">Summary</h2>
      <p><strong>Payment Method:</strong> <span style="font-weight: bold; color: #D42A2A;">${input.paymentMethod}</span></p>
      <p style="font-size: 1.2em; font-weight: bold;"><strong>Total Amount:</strong> PKR ${input.totalPrice.toFixed(2)}</p>
      
      <p style="margin-top: 20px; font-size: 0.9em; color: #555;">
        This is an automated notification. Please process the order accordingly.
      </p>
    </div>
  `;
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

    const orderId = `SUFI-${Date.now()}`;
    
    // ** EMAIL LOGIC WOULD GO HERE **
    // In a real application, you would use a service like Resend, SendGrid, or Mailgun
    // to send the email. This requires securely managing API keys on the server.
    
    // 1. Install your chosen email provider's SDK: `npm install resend`
    
    // 2. Import it and initialize it with your API key (stored securely in environment variables)
    //    import { Resend } from 'resend';
    //    const resend = new Resend(process.env.RESEND_API_KEY);

    // 3. Format the email content.
    const emailHtml = formatOrderAsHtml(orderId, input);
    // You should store these emails in environment variables for security and flexibility.
    const toEmails = ["hassanasim337@gmail.com", "aaoooz1@gmail.com"];
    
    // 4. Send the email.
    /*
    if (toEmails.length > 0) {
        try {
          await resend.emails.send({
            from: 'Sufi\'s Kitchen <noreply@yourdomain.com>',
            to: toEmails,
            subject: `New Order Received: #${orderId}`,
            html: emailHtml,
          });
          console.log(`Email sent successfully for order ${orderId}`);
        } catch (error) {
          console.error("Failed to send email:", error);
          // Decide if you want to fail the whole order if email fails.
          // For now, we'll just log it and continue.
        }
    } else {
        console.warn("No recipient emails configured. Skipping email notification.");
    }
    */
    
    // For now, we simulate sending the email by logging it to the console.
    console.log("----- EMAIL SIMULATION -----");
    if (toEmails.length > 0) {
        console.log("To:", toEmails.join(', '));
        console.log("Subject:", `New Order Received: #${orderId}`);
        console.log("Body (HTML would be sent):\n", emailHtml);
    } else {
        console.log("No recipient emails configured.");
        console.log("Simulated email body for debugging:\n", emailHtml);
    }
    console.log("----------------------------");

    
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
