'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';
import {
  generateSufiRecipe,
  GenerateSufiRecipeOutput,
  GenerateSufiRecipeInputSchema,
} from '@/ai/flows/generate-sufi-recipe';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, Sparkles, ChefHat, Soup } from 'lucide-react';
import { JaliPattern } from '@/components/icons/jali-pattern';

type FormData = z.infer<typeof GenerateSufiRecipeInputSchema>;

export default function SufiRecipePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [generatedRecipe, setGeneratedRecipe] = useState<GenerateSufiRecipeOutput | null>(null);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(GenerateSufiRecipeInputSchema),
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    setGeneratedRecipe(null);
    try {
      const result = await generateSufiRecipe(data);
      setGeneratedRecipe(result);
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error Generating Recipe',
        description: 'There was an issue creating your recipe. Please try again.',
        variant: 'destructive',
      });
    }
    setIsLoading(false);
  };

  return (
    <div className="container mx-auto py-12">
      <div className="text-center mb-8">
        <Sparkles className="mx-auto h-12 w-12 text-primary" />
        <h1 className="text-4xl font-bold font-headline mt-4">Sufi Recipe Generator</h1>
        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
          Craft a recipe with soul. Enter a dish name and a style, and let our AI chef guide you.
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        <Card className="relative overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
           <JaliPattern className="absolute top-0 left-0 w-full h-full text-primary/5 dark:text-primary/10 -z-0 opacity-20" />
          <CardHeader>
            <CardTitle>Create a New Recipe</CardTitle>
            <CardDescription>
              Tell us what you'd like to cook, and we'll generate a unique recipe for you.
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="recipeName">Dish Name</Label>
                <Input
                  id="recipeName"
                  {...register('recipeName')}
                  placeholder="e.g., Chicken Korma, Lentil Soup"
                />
                {errors.recipeName && (
                  <p className="text-sm text-destructive mt-1">{errors.recipeName.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="recipeStyle">Style</Label>
                <Input
                  id="recipeStyle"
                  {...register('recipeStyle')}
                  placeholder="e.g., Mughlai, Homestyle, Spicy"
                />
                {errors.recipeStyle && (
                  <p className="text-sm text-destructive mt-1">{errors.recipeStyle.message}</p>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button type="submit" disabled={isLoading} className="bg-gradient-to-r from-green-500 to-teal-500 text-white">
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Sparkles className="mr-2 h-4 w-4" />
                )}
                Generate Recipe
              </Button>
            </CardFooter>
          </form>
        </Card>

        {isLoading && (
            <div className="text-center p-8">
                <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary"/>
                <p className="mt-4 text-muted-foreground">Generating your masterpiece...</p>
            </div>
        )}

        {generatedRecipe && (
          <Card className="mt-8 shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline text-3xl bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-orange-500">{generatedRecipe.title}</CardTitle>
              <CardDescription>{generatedRecipe.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="flex items-center text-xl font-semibold mb-3">
                  <ChefHat className="mr-2 text-primary" /> Ingredients
                </h3>
                 <Card className="p-4 bg-green-50">
                    <ul className="list-disc list-inside space-y-1 text-green-900">
                    {generatedRecipe.ingredients.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                    </ul>
                </Card>
              </div>
              <div>
                <h3 className="flex items-center text-xl font-semibold mb-3">
                  <Soup className="mr-2 text-primary" /> Instructions
                </h3>
                <div className="space-y-4">
                  {generatedRecipe.instructions.map((step, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-full bg-primary text-primary-foreground font-bold">
                        {index + 1}
                      </div>
                      <p className="flex-1 mt-1">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
               <div>
                  <p className="text-sm text-muted-foreground text-center">
                    <strong>Servings:</strong> {generatedRecipe.servings}
                  </p>
                </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
