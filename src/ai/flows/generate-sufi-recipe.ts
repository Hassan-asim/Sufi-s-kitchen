'use server';
/**
 * @fileOverview A flow that generates a complete recipe based on a dish name and style.
 *
 * This file defines the Genkit flow for generating recipes.
 * It should only export the functions that will be called by the client.
 */

import {ai} from '@/ai/genkit';
import { GenerateSufiRecipeInputSchema, GenerateSufiRecipeOutputSchema } from '@/ai/schemas';
import type { GenerateSufiRecipeInput, GenerateSufiRecipeOutput } from '@/ai/schemas';

export async function generateSufiRecipe(input: GenerateSufiRecipeInput): Promise<GenerateSufiRecipeOutput> {
  const output = await generateSufiRecipeFlow(input);
  if (!output) {
    throw new Error('Failed to generate recipe.');
  }
  return output;
}

const prompt = ai.definePrompt({
  name: 'generateSufiRecipePrompt',
  input: {schema: GenerateSufiRecipeInputSchema},
  output: {schema: GenerateSufiRecipeOutputSchema},
  prompt: `You are an expert chef specializing in authentic Pakistani cuisine with a touch of Sufi culinary philosophy, focusing on mindfulness and wholesome ingredients.

  Generate a complete, well-structured recipe for the following dish. The recipe should be easy to follow and inspiring.

  Dish Name: {{{recipeName}}}
  Style: {{{recipeStyle}}}

  Please provide the following:
  - A captivating title for the recipe.
  - A brief, engaging description.
  - A list of ingredients.
  - Step-by-step instructions.
  - The number of servings.
  `,
});

const generateSufiRecipeFlow = ai.defineFlow(
  {
    name: 'generateSufiRecipeFlow',
    inputSchema: GenerateSufiRecipeInputSchema,
    outputSchema: GenerateSufiRecipeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
