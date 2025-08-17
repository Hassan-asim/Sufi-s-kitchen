"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import {
  generateBlogPostIntroduction,
  GenerateBlogPostIntroductionOutput,
} from "@/ai/flows/generate-blog-post-introduction";

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
import { Loader2, Sparkles } from "lucide-react";

const formSchema = z.object({
  blogPostTopic: z.string().min(10, "Blog post topic is required."),
});

type FormData = z.infer<typeof formSchema>;

export function BlogPostWriter() {
  const [isLoading, setIsLoading] = useState(false);
  const [generatedContent, setGeneratedContent] =
    useState<GenerateBlogPostIntroductionOutput | null>(null);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    setGeneratedContent(null);
    try {
      const result = await generateBlogPostIntroduction({
        blogPostTopic: data.blogPostTopic,
      });
      setGeneratedContent(result);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate introduction. Please try again.",
        variant: "destructive",
      });
    }
    setIsLoading(false);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Blog Post Writer</CardTitle>
          <CardDescription>
            Enter a topic for your blog post about Pakistani cuisine to
            generate an introduction.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent>
            <div>
              <Label htmlFor="blogPostTopic">Blog Post Topic</Label>
              <Input
                id="blogPostTopic"
                {...register("blogPostTopic")}
                placeholder="e.g., The History of Biryani"
              />
              {errors.blogPostTopic && (
                <p className="text-sm text-destructive mt-1">
                  {errors.blogPostTopic.message}
                </p>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Sparkles className="mr-2 h-4 w-4" />
              )}
              Generate Introduction
            </Button>
          </CardFooter>
        </form>
      </Card>

      {generatedContent && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Generated Introduction</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea readOnly value={generatedContent.introduction} rows={8} className="bg-muted/50"/>
          </CardContent>
        </Card>
      )}
    </>
  );
}
