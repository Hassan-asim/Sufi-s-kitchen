'use server';

/**
 * @fileOverview Generates engaging and informative descriptions for new recipes using AI.
 *
 * - generateRecipeDescription - A function that generates a recipe description.
 * - GenerateRecipeDescriptionInput - The input type for the generateRecipeDescription function.
 * - GenerateRecipeDescriptionOutput - The return type for the generateRecipeDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateRecipeDescriptionInputSchema = z.object({
  recipeName: z.string().describe('The name of the recipe.'),
  ingredients: z
    .string()
    .describe('A list of the ingredients in the recipe.'),
  cuisine: z.string().describe('The cuisine of the recipe.'),
  instructions: z.string().describe('The cooking instructions for the recipe.'),
});
export type GenerateRecipeDescriptionInput = z.infer<
  typeof GenerateRecipeDescriptionInputSchema
>;

const GenerateRecipeDescriptionOutputSchema = z.object({
  description: z
    .string()
    .describe('An engaging and informative description of the recipe.'),
  tags: z.array(z.string()).describe('Suggested tags for the recipe.'),
});
export type GenerateRecipeDescriptionOutput = z.infer<
  typeof GenerateRecipeDescriptionOutputSchema
>;

export async function generateRecipeDescription(
  input: GenerateRecipeDescriptionInput
): Promise<GenerateRecipeDescriptionOutput> {
  return generateRecipeDescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateRecipeDescriptionPrompt',
  input: {schema: GenerateRecipeDescriptionInputSchema},
  output: {schema: GenerateRecipeDescriptionOutputSchema},
  prompt: `You are a culinary expert and food blogger. Your task is to generate an engaging and informative description for a new recipe.

Recipe Name: {{{recipeName}}}
Cuisine: {{{cuisine}}}
Ingredients: {{{ingredients}}}
Instructions: {{{instructions}}}

Write a captivating description that highlights the key aspects of the dish, its flavors, and its cultural significance. Also suggest some relevant tags for the recipe.

Description:
Tags:`,
});

const generateRecipeDescriptionFlow = ai.defineFlow(
  {
    name: 'generateRecipeDescriptionFlow',
    inputSchema: GenerateRecipeDescriptionInputSchema,
    outputSchema: GenerateRecipeDescriptionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
