"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import {
  generateRecipeDescription,
  GenerateRecipeDescriptionOutput,
} from "@/ai/flows/generate-recipe-description";
import {
  suggestRecipeTags,
  SuggestRecipeTagsOutput,
} from "@/ai/flows/suggest-recipe-tags";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Loader2, Sparkles } from "lucide-react";

const formSchema = z.object({
  recipeName: z.string().min(3, "Recipe name is required."),
  ingredients: z.string().min(10, "Please list some ingredients."),
  cuisine: z.string().min(3, "Cuisine type is required."),
  instructions: z.string().min(20, "Please provide instructions."),
  dietaryRestrictions: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export function RecipeAssistant() {
  const [isLoading, setIsLoading] = useState(false);
  const [generatedContent, setGeneratedContent] =
    useState<GenerateRecipeDescriptionOutput | null>(null);
  const [suggestedTags, setSuggestedTags] =
    useState<SuggestRecipeTagsOutput | null>(null);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onGenerateDescription = async (data: FormData) => {
    setIsLoading(true);
    setGeneratedContent(null);
    setSuggestedTags(null);
    try {
      const result = await generateRecipeDescription({
        recipeName: data.recipeName,
        ingredients: data.ingredients,
        cuisine: data.cuisine,
        instructions: data.instructions,
      });
      setGeneratedContent(result);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate description. Please try again.",
        variant: "destructive",
      });
    }
    setIsLoading(false);
  };

  const onSuggestTags = async (data: FormData) => {
    setIsLoading(true);
    setGeneratedContent(null);
    setSuggestedTags(null);
    try {
      const result = await suggestRecipeTags({
        recipeName: data.recipeName,
        ingredients: data.ingredients,
        cuisineType: data.cuisine,
        dietaryRestrictions: data.dietaryRestrictions,
      });
      setSuggestedTags(result);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to suggest tags. Please try again.",
        variant: "destructive",
      });
    }
    setIsLoading(false);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Recipe Assistant</CardTitle>
          <CardDescription>
            Enter your recipe details below to generate a description or get
            tag suggestions.
          </CardDescription>
        </CardHeader>
        <form
          onSubmit={handleSubmit(onGenerateDescription)}
          className="space-y-4"
        >
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="recipeName">Recipe Name</Label>
              <Input
                id="recipeName"
                {...register("recipeName")}
                placeholder="e.g., Chicken Karahi"
              />
              {errors.recipeName && (
                <p className="text-sm text-destructive mt-1">
                  {errors.recipeName.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="ingredients">Ingredients (comma-separated)</Label>
              <Textarea
                id="ingredients"
                {...register("ingredients")}
                placeholder="e.g., Chicken, Tomatoes, Ginger, ..."
              />
              {errors.ingredients && (
                <p className="text-sm text-destructive mt-1">
                  {errors.ingredients.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="cuisine">Cuisine Type</Label>
              <Input
                id="cuisine"
                {...register("cuisine")}
                placeholder="e.g., Pakistani"
              />
              {errors.cuisine && (
                <p className="text-sm text-destructive mt-1">
                  {errors.cuisine.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="instructions">Instructions</Label>
              <Textarea
                id="instructions"
                {...register("instructions")}
                placeholder="Describe the cooking process..."
                rows={5}
              />
              {errors.instructions && (
                <p className="text-sm text-destructive mt-1">
                  {errors.instructions.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="dietaryRestrictions">
                Dietary Restrictions (optional)
              </Label>
              <Input
                id="dietaryRestrictions"
                {...register("dietaryRestrictions")}
                placeholder="e.g., Gluten-free, Vegetarian"
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleSubmit(onSuggestTags)}
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Sparkles className="mr-2 h-4 w-4" />
              )}
              Suggest Tags
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Sparkles className="mr-2 h-4 w-4" />
              )}
              Generate Description
            </Button>
          </CardFooter>
        </form>
      </Card>
      {(generatedContent || suggestedTags) && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>AI Generated Content</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {generatedContent?.description && (
              <div>
                <Label>Generated Description</Label>
                <Textarea readOnly value={generatedContent.description} rows={6} className="mt-1 bg-muted/50"/>
              </div>
            )}
            {(generatedContent?.tags || suggestedTags?.tags) && (
              <div>
                <Label>Suggested Tags</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {(generatedContent?.tags || suggestedTags?.tags)?.map(
                    (tag, index) => (
                      <Badge key={index} variant="secondary">
                        {tag}
                      </Badge>
                    )
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </>
  );
}
