import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RecipeAssistant } from "./recipe-assistant";
import { BlogPostWriter } from "./blog-post-writer";
import { Sparkles } from "lucide-react";

export default function AIToolsPage() {
  return (
    <div className="container mx-auto py-12">
      <div className="text-center mb-8">
        <Sparkles className="mx-auto h-12 w-12 text-primary" />
        <h1 className="text-4xl font-bold font-headline mt-4">
          AI Content Tools
        </h1>
        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
          Leverage the power of AI to generate creative content for your recipes
          and blog posts.
        </p>
      </div>

      <Tabs defaultValue="recipe-assistant" className="max-w-3xl mx-auto">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="recipe-assistant">Recipe Assistant</TabsTrigger>
          <TabsTrigger value="blog-post-writer">Blog Post Writer</TabsTrigger>
        </TabsList>
        <TabsContent value="recipe-assistant">
          <RecipeAssistant />
        </TabsContent>
        <TabsContent value="blog-post-writer">
          <BlogPostWriter />
        </TabsContent>
      </Tabs>
    </div>
  );
}
