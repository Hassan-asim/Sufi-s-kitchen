"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wand2 } from 'lucide-react';
import { generatePoem } from '@/ai/flows/poem-flow';

export function SufiPoem() {
  const [poem, setPoem] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGeneratePoem = async () => {
    setIsLoading(true);
    setPoem(null);
    try {
      const response = await generatePoem({ topic: "The soul of cooking" });
      setPoem(response.poem);
    } catch (error) {
      console.error("Error generating poem:", error);
      setPoem("Failed to conjure a verse. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="mt-12 text-center shadow-lg border">
      <CardHeader>
        <CardTitle className="font-headline text-2xl text-primary">A Taste of Sufi Wisdom</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-6">
          The chef's philosophy extends beyond the plate. Click the button to generate a unique piece of Sufi-inspired wisdom on the art of cooking.
        </p>
        
        {poem && (
          <blockquote className="my-4 border-l-4 border-primary pl-4 italic text-foreground/80">
            {poem.split('\n').map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </blockquote>
        )}

        {isLoading && (
            <div className="flex justify-center items-center my-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                <p className="ml-4 text-muted-foreground">Conjuring verse...</p>
            </div>
        )}

        <Button onClick={handleGeneratePoem} disabled={isLoading}>
          <Wand2 className="mr-2" />
          {poem ? 'Generate Another' : 'Generate Poem'}
        </Button>
      </CardContent>
    </Card>
  );
}
