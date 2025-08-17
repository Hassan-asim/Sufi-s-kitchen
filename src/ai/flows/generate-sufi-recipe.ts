'use server';
/**
 * @fileOverview A flow that generates a complete recipe based on a dish name and style.
 *
 * - generateSufiRecipe - A function that generates a recipe.
 * - GenerateSufiRecipeInput - The input type for the generateSufiRecipe function.
 * - GenerateSufiRecipeOutput - The return type for the generateSufiRecipe function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

export const GenerateSufiRecipeInputSchema = z.object({
  recipeName: z.string().describe('The name of the dish for which to generate a recipe.'),
  recipeStyle: z.string().describe('The desired style of the recipe (e.g., Mughlai, Street Food, Homestyle).'),
});
export type GenerateSufiRecipeInput = z.infer<typeof GenerateSufiRecipeInputSchema>;

export const GenerateSufiRecipeOutputSchema = z.object({
  title: z.string().describe('The title of the generated recipe.'),
  description: z.string().describe('A brief, engaging description of the dish.'),
  ingredients: z.array(z.string()).describe('A list of ingredients required for the recipe.'),
  instructions: z.array(z.string()).describe('The step-by-step instructions for preparing the dish.'),
  servings: z.string().describe('The suggested number of servings.'),
});
export type GenerateSufiRecipeOutput = z.infer<typeof GenerateSufiRecipeOutputSchema>;

export async function generateSufiRecipe(input: GenerateSufiRecipeInput): Promise<GenerateSufiRecipeOutput> {
  return generateSufiRecipeFlow(input);
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
