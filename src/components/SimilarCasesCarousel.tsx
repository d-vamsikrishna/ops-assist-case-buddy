
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

// Mock data for similar cases
const similarCases = [
  {
    id: 1,
    title: "Case #342-B",
    description: "Trademark infringement dispute between tech companies",
    details: "A software company claimed that their competitor used a similar logo and name, causing confusion in the marketplace. Resulted in a settlement and rebranding.",
  },
  {
    id: 2,
    title: "Case #197-A",
    description: "Patent violation in pharmaceutical industry",
    details: "Generic drug manufacturer challenged for producing medication too similar to patented formula. Case dismissed after technical review proved sufficient differentiation.",
  },
  {
    id: 3,
    title: "Case #508-C",
    description: "Copyright claim on musical composition",
    details: "Independent artist sued major label for unauthorized sampling. Court ruled in favor of plaintiff, resulting in royalty payments and proper attribution.",
  },
  {
    id: 4,
    title: "Case #625-D",
    description: "Intellectual property dispute in fashion",
    details: "Designer accused fast fashion retailer of copying unique textile pattern. Settled out of court with financial compensation and agreement to cease production.",
  },
  {
    id: 5,
    title: "Case #413-E",
    description: "Software licensing violation case",
    details: "Enterprise company found using software beyond scope of licensing agreement. Resolved with expanded license purchase and compliance monitoring program.",
  },
];

const SimilarCasesCarousel = () => {
  return (
    <div className="w-full max-w-5xl mx-auto py-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Similar Cases</h2>
      <Carousel className="w-full">
        <CarouselContent>
          {similarCases.map((caseItem) => (
            <CarouselItem key={caseItem.id} className="md:basis-1/2 lg:basis-1/3">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>{caseItem.title}</CardTitle>
                  <CardDescription>{caseItem.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-24">
                    <p className="text-sm text-muted-foreground">{caseItem.details}</p>
                  </ScrollArea>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex justify-center mt-4">
          <CarouselPrevious className="relative static mr-2 translate-y-0" />
          <CarouselNext className="relative static ml-2 translate-y-0" />
        </div>
      </Carousel>
    </div>
  );
};

export default SimilarCasesCarousel;
