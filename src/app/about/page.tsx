import Image from 'next/image';
import { ChefHat } from 'lucide-react';
import { JaliPattern } from '@/components/icons/jali-pattern';
import { SufiPoem } from '@/components/sufi-poem';

export default function AboutPage() {
  return (
    <div className="relative bg-background py-16">
       <JaliPattern className="absolute inset-0 w-full h-full text-primary/5 dark:text-primary/10 -z-0 opacity-30" />
      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
             <ChefHat className="mx-auto h-16 w-16 text-primary mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold font-headline tracking-tight text-foreground">
              About the Chef
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              The heart and soul behind Sufi's Kitchen.
            </p>
          </div>

          <div className="bg-card p-8 rounded-2xl shadow-lg border grid md:grid-cols-3 gap-8 items-center">
            <div className="md:col-span-1">
              <div className="aspect-square rounded-full overflow-hidden mx-auto w-48 h-48 md:w-full md:h-auto border-4 border-primary/20 shadow-xl">
                <Image
                  src="https://placehold.co/400x400.png"
                  alt="Portrait of the Chef"
                  width={400}
                  height={400}
                  className="object-cover"
                  data-ai-hint="portrait chef"
                />
              </div>
            </div>
            <div className="md:col-span-2">
              <h3 className="text-2xl font-headline font-semibold text-primary">Chef Sufi Asim Iftikhar</h3>
              <p className="mt-4 text-foreground/80">
                A certified chef from Punjab, Lahore, with over 20 years of experience steeped in the rich traditions of Pakistani kitchens, Chef Sufi Asim Iftikhar brings a philosophy of 'cooking with soul' to every dish. He has expertise in all types of traditional and continental foods. His journey began in the bustling streets of Lahore, where he learned the art of spice blending and slow-cooking from his grandmother.
              </p>
              <p className="mt-4 text-foreground/80">
                Chef Asim believes that food is a spiritual experience, a way to connect with our heritage and with each other. At Sufi's Kitchen, he combines age-old family recipes with a touch of modern artistry, ensuring that every meal is not just eaten, but felt. His passion is to share the authentic, soulful flavors of Pakistan with the world.
              </p>
            </div>
          </div>

          <SufiPoem />

        </div>
      </div>
    </div>
  );
}
