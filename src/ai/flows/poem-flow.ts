'use server';
/**
 * @fileOverview A flow that generates a Sufi-style poem.
 *
 * - generatePoem - A function that generates a poem based on a topic.
 * - PoemInput - The input type for the generatePoem function.
 * - PoemOutput - The return type for the generatePoem function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PoemInputSchema = z.object({
  topic: z.string().describe('The topic for the poem.'),
});
export type PoemInput = z.infer<typeof PoemInputSchema>;

const PoemOutputSchema = z.object({
  poem: z.string().describe('The generated Sufi-style poem.'),
});
export type PoemOutput = z.infer<typeof PoemOutputSchema>;


export async function generatePoem(input: PoemInput): Promise<PoemOutput> {
  return generatePoemFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generatePoemPrompt',
  input: {schema: PoemInputSchema},
  output: {schema: PoemOutputSchema},
  prompt: `You are a Sufi poet. Write a short, four-line poem in the style of Rumi or Hafiz about the provided topic. The poem should be insightful and spiritual.

Topic: {{{topic}}}`,
});

const generatePoemFlow = ai.defineFlow(
  {
    name: 'generatePoemFlow',
    inputSchema: PoemInputSchema,
    outputSchema: PoemOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    return output!;
  }
);
