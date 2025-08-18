'use server';
/**
 * @fileOverview A flow to process customer orders and send email receipts.
 *
 * This file contains the Genkit flow for processing an order. It uses Nodemailer
 * and the Gmail API to send a formatted HTML receipt to the restaurant owners.
 * 
 * - processOrder - A function that handles the order processing.
 * - OrderInput - The input type for the processOrder function.
 * - OrderOutput - The return type for the processOrder function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { google } from 'googleapis';
import nodemailer from 'nodemailer';

// --- Zod Schemas for Input/Output validation ---

const CartItemSchema = z.object({
  id: z.number(),
  name: z.string(),
  price: z.number(),
  quantity: z.number(),
  image: z.string().optional(),
});

const CustomerInfoSchema = z.object({
  name: z.string().describe("Customer's full name"),
  phone: z.string().describe("Customer's contact phone number"),
  address: z.string().describe("Customer's full delivery address"),
});

const OrderInputSchema = z.object({
  customer: CustomerInfoSchema,
  items: z.array(CartItemSchema).describe("The list of items in the cart"),
  totalPrice: z.number().describe("The final total price of the order including delivery"),
  paymentMethod: z.enum(['COD', 'Easypaisa']).describe("The selected payment method"),
});
export type OrderInput = z.infer<typeof OrderInputSchema>;

const OrderOutputSchema = z.object({
  success: z.boolean().describe("Whether the order was processed successfully"),
  orderId: z.string().describe("A unique ID for the processed order"),
  confirmationMessage: z.string().describe("A message to show the user upon completion"),
});
export type OrderOutput = z.infer<typeof OrderOutputSchema>;


// --- Email Sending Logic ---

// Helper function to format the order into a nice HTML email body.
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

/**
 * Sends the order confirmation email using the Gmail API.
 * @param orderId - The unique ID for the order.
 * @param orderInput - The details of the order.
 */
async function sendOrderEmail(orderId: string, orderInput: OrderInput) {
  const {
    GMAIL_CLIENT_ID,
    GMAIL_CLIENT_SECRET,
    OAUTH_REFRESH_TOKEN,
    SENDER_EMAIL
  } = process.env;

  if (!GMAIL_CLIENT_ID || !GMAIL_CLIENT_SECRET || !OAUTH_REFRESH_TOKEN || !SENDER_EMAIL) {
    console.warn("Gmail API credentials are not set in environment variables. Skipping email.");
    // In a production app, you might want to throw an error or handle this differently.
    // For now, we just log a warning and don't send the email.
    return;
  }

  const OAuth2 = google.auth.OAuth2;
  const oauth2Client = new OAuth2(
    GMAIL_CLIENT_ID,
    GMAIL_CLIENT_SECRET,
    "https://developers.google.com/oauthplayground" // Redirect URL
  );

  oauth2Client.setCredentials({
    refresh_token: OAUTH_REFRESH_TOKEN,
  });

  const accessToken = await oauth2Client.getAccessToken();

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: SENDER_EMAIL,
      clientId: GMAIL_CLIENT_ID,
      clientSecret: GMAIL_CLIENT_SECRET,
      refreshToken: OAUTH_REFRESH_TOKEN,
      accessToken: accessToken.token!,
    },
  });

  const mailOptions = {
    from: `Sufi's Kitchen <${SENDER_EMAIL}>`,
    to: "aaoooz1@gmail.com",
    cc: "hassanasim337@gmail.com",
    subject: `New Order Received: #${orderId}`,
    html: formatOrderAsHtml(orderId, orderInput),
  };

  await transporter.sendMail(mailOptions);
}


// --- Genkit Flow Definition ---

// This is the main function that the frontend will call.
export async function processOrder(input: OrderInput): Promise<OrderOutput> {
  return processOrderFlow(input);
}

const processOrderFlow = ai.defineFlow(
  {
    name: 'processOrderFlow',
    inputSchema: OrderInputSchema,
    outputSchema: OrderOutputSchema,
  },
  async (input) => {
    
    const orderId = `SUFI-${Date.now()}`;
    
    try {
      console.log(`Attempting to send email for order ${orderId}...`);
      await sendOrderEmail(orderId, input);
      console.log(`Email sent successfully for order ${orderId}`);
    } catch (error) {
      // This will now log the detailed error to your Vercel function logs.
      console.error("Failed to send order email. The order was still processed.", error);
      // Fallback or logging if email fails, but don't block the order.
      // In a real app, you might add this to a retry queue.
      console.log("----- EMAIL SIMULATION (FALLBACK) -----");
      const emailHtml = formatOrderAsHtml(orderId, input);
      console.log("To: aaoooz1@gmail.com, hassanasim337@gmail.com");
      console.log("Subject:", `New Order Received: #${orderId}`);
      console.log("Body (HTML would be sent):\n", emailHtml);
      console.log("---------------------------------------");
    }
    
    const message = input.paymentMethod === 'Easypaisa' 
      ? `Your order #${orderId} is confirmed! Please remember to send the receipt via WhatsApp.`
      : `Your order #${orderId} has been placed successfully! It will be delivered soon.`;

    // Return a successful response to the user.
    return {
      success: true,
      orderId: orderId,
      confirmationMessage: message,
    };
  }
);
