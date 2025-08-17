'use server';
/**
 * @fileOverview AI agent that generates blog post introductions for Pakistani cuisine.
 *
 * - generateBlogPostIntroduction - A function that generates a blog post introduction.
 * - GenerateBlogPostIntroductionInput - The input type for the generateBlogPostIntroduction function.
 * - GenerateBlogPostIntroductionOutput - The return type for the generateBlogPostIntroduction function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateBlogPostIntroductionInputSchema = z.object({
  blogPostTopic: z.string().describe('The topic of the blog post about Pakistani cuisine.'),
});
export type GenerateBlogPostIntroductionInput = z.infer<
  typeof GenerateBlogPostIntroductionInputSchema
>;

const GenerateBlogPostIntroductionOutputSchema = z.object({
  introduction: z.string().describe('The generated introduction for the blog post.'),
});
export type GenerateBlogPostIntroductionOutput = z.infer<
  typeof GenerateBlogPostIntroductionOutputSchema
>;

export async function generateBlogPostIntroduction(
  input: GenerateBlogPostIntroductionInput
): Promise<GenerateBlogPostIntroductionOutput> {
  return generateBlogPostIntroductionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateBlogPostIntroductionPrompt',
  input: {schema: GenerateBlogPostIntroductionInputSchema},
  output: {schema: GenerateBlogPostIntroductionOutputSchema},
  prompt: `You are a creative content writer specializing in Pakistani cuisine. Your task is to generate an engaging introduction for a blog post based on the given topic.

Topic: {{{blogPostTopic}}}

Introduction:`,
});

const generateBlogPostIntroductionFlow = ai.defineFlow(
  {
    name: 'generateBlogPostIntroductionFlow',
    inputSchema: GenerateBlogPostIntroductionInputSchema,
    outputSchema: GenerateBlogPostIntroductionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
