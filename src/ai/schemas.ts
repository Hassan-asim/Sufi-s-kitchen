/**
 * @fileOverview This file contains the Zod schemas for the Genkit flows.
 *
 * Separating schemas into their own file allows them to be imported
 * into both server and client components without causing server-only
 * code to be bundled with the client.
 */

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
