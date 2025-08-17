'use server';

/**
 * @fileOverview A flow that suggests relevant tags for a recipe.
 *
 * - suggestRecipeTags - A function that suggests relevant tags for a recipe.
 * - SuggestRecipeTagsInput - The input type for the suggestRecipeTags function.
 * - SuggestRecipeTagsOutput - The return type for the suggestRecipeTags function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestRecipeTagsInputSchema = z.object({
  recipeName: z.string().describe('The name of the recipe.'),
  ingredients: z.string().describe('A comma-separated list of ingredients.'),
  cuisineType: z.string().describe('The type of cuisine (e.g., Pakistani, Indian, Italian).'),
  dietaryRestrictions: z
    .string()
    .optional()
    .describe('Any dietary restrictions (e.g., vegetarian, gluten-free).'),
});
export type SuggestRecipeTagsInput = z.infer<typeof SuggestRecipeTagsInputSchema>;

const SuggestRecipeTagsOutputSchema = z.object({
  tags: z.array(z.string()).describe('An array of relevant tags for the recipe.'),
});
export type SuggestRecipeTagsOutput = z.infer<typeof SuggestRecipeTagsOutputSchema>;

export async function suggestRecipeTags(input: SuggestRecipeTagsInput): Promise<SuggestRecipeTagsOutput> {
  return suggestRecipeTagsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestRecipeTagsPrompt',
  input: {schema: SuggestRecipeTagsInputSchema},
  output: {schema: SuggestRecipeTagsOutputSchema},
  prompt: `You are an expert in suggesting relevant tags for recipes.

  Given the following recipe information, suggest 5-10 relevant tags that users can use to find the recipe. Tags should be related to ingredients, cuisine type, dietary restrictions, or other relevant characteristics.

  Recipe Name: {{{recipeName}}}
  Ingredients: {{{ingredients}}}
  Cuisine Type: {{{cuisineType}}}
  Dietary Restrictions: {{#if dietaryRestrictions}}{{{dietaryRestrictions}}}{{else}}None{{/if}}

  Tags:`,
});

const suggestRecipeTagsFlow = ai.defineFlow(
  {
    name: 'suggestRecipeTagsFlow',
    inputSchema: SuggestRecipeTagsInputSchema,
    outputSchema: SuggestRecipeTagsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
