import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { CalendarDays, Phone, MessageSquare } from 'lucide-react';
import { JaliPattern } from '@/components/icons/jali-pattern';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Link from 'next/link';

const events = [
  {
    title: "Grand Wedding in Lahore",
    date: "August 15, 2023",
    description: "Catered a beautiful wedding reception for 500 guests, featuring a full traditional Pakistani buffet, live cooking stations, and a stunning dessert table.",
    image: "https://placehold.co/600x400.png",
    aiHint: "wedding catering"
  },
  {
    title: "Corporate Gala Dinner",
    date: "September 22, 2023",
    description: "Provided an exquisite dining experience for a major corporate event. The menu included a fusion of continental and Pakistani dishes, impressing clients and executives alike.",
    image: "https://placehold.co/600x400.png",
    aiHint: "corporate event"
  },
  {
    title: "Eid Milan Party",
    date: "July 1, 2023",
    description: "Celebrated Eid with a festive outdoor catering setup. Guests enjoyed our signature Eid specialties, from savory chaats to sweet sheer khurma.",
    image: "https://placehold.co/600x400.png",
    aiHint: "eid party"
  },
    {
    title: "Sufi Night Fundraiser",
    date: "October 5, 2023",
    description: "Honored to provide catering for a charity fundraiser with a Sufi theme. The menu was designed to be soulful and comforting, matching the evening's ambiance.",
    image: "https://placehold.co/600x400.png",
    aiHint: "charity event"
  }
];

export default function EventsPage() {
  return (
    <div className="relative bg-background py-16">
      <JaliPattern className="absolute inset-0 w-full h-full text-primary/5 dark:text-primary/10 -z-0 opacity-30" />
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-12">
          <CalendarDays className="mx-auto h-16 w-16 text-primary mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold font-headline tracking-tight text-foreground">
            Our Events
          </h1>
          <h2 className="text-3xl md:text-4xl font-urdu text-primary font-bold mt-2">
            ہماری تقریبات
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Bringing the soulful taste of Sufi's Kitchen to your special occasions. Here's a glimpse of the events we've catered.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {events.map((event, index) => (
            <Card key={index} className="overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group/card border">
                <div className="aspect-video relative overflow-hidden">
                    <Image
                        src={event.image}
                        alt={event.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover/card:scale-110"
                        data-ai-hint={event.aiHint}
                    />
                </div>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl text-primary">{event.title}</CardTitle>
                    <CardDescription className="flex items-center gap-2 text-muted-foreground">
                        <CalendarDays className="w-4 h-4"/>
                        {event.date}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-foreground/80">{event.description}</p>
                </CardContent>
            </Card>
          ))}
        </div>

         <div className="text-center mt-16">
            <h3 className="text-2xl font-headline font-semibold">Want to book us for your next event?</h3>
            <p className="text-muted-foreground mt-2 mb-6">Let us make your special day even more memorable with our authentic cuisine.</p>
            <div className="flex justify-center gap-4">
              <Button asChild size="lg">
                <a href="tel:03334616436">
                  <Phone className="mr-2" /> Call Us
                </a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href="https://wa.me/923334616436" target="_blank" rel="noopener noreferrer">
                  <MessageSquare className="mr-2" /> WhatsApp
                </a>
              </Button>
            </div>
        </div>
      </div>
    </div>
  );
}
