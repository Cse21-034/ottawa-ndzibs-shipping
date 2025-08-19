import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Check } from "lucide-react";
import type { Pricing } from "@shared/schema";

export default function PricingSection() {
  const { data: pricing, isLoading } = useQuery<Pricing[]>({
    queryKey: ["/api/pricing"]
  });

  const getPricingCardClass = (color: string) => {
    switch (color) {
      case "blue":
        return "pricing-card-blue";
      case "pink":
        return "pricing-card-pink";
      case "purple":
        return "pricing-card-purple";
      case "green":
        return "pricing-card-green";
      case "orange":
        return "pricing-card-orange";
      default:
        return "pricing-card-blue";
    }
  };

  const getPricingTextColor = (color: string) => {
    switch (color) {
      case "pink":
        return "text-pink-600";
      case "purple":
        return "text-purple-600";
      case "green":
        return "text-green-600";
      case "orange":
        return "text-orange-600";
      default:
        return "text-primary";
    }
  };

  return (
    <section id="pricing" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-secondary mb-4">Transparent Pricing</h2>
          <p className="text-lg text-text-gray max-w-3xl mx-auto">
            Clear, competitive rates with no hidden fees. Choose the pricing structure that works best for your shipment.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            // Loading skeletons
            Array.from({ length: 5 }).map((_, index) => (
              <Card key={index} className="p-8 border">
                <CardContent>
                  <Skeleton className="w-8 h-8 mb-4" />
                  <Skeleton className="h-6 w-32 mb-2" />
                  <Skeleton className="h-4 w-full mb-4" />
                  <Skeleton className="h-8 w-20 mb-2" />
                  <Skeleton className="h-4 w-16 mb-6" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            pricing?.map((item) => (
              <Card 
                key={item.id} 
                className={`${getPricingCardClass(item.color)} rounded-xl p-8 border`}
              >
                <CardContent className="p-0">
                  <div className={`${getPricingTextColor(item.color)} text-3xl mb-4`}>
                    <i className={item.icon}></i>
                  </div>
                  <h3 className="text-xl font-semibold text-secondary mb-2">{item.category}</h3>
                  <p className="text-text-gray text-sm mb-4">{item.description}</p>
                  <div className={`text-3xl font-bold ${getPricingTextColor(item.color)} mb-2`}>
                    P{item.rate.toLocaleString()}
                  </div>
                  <div className="text-sm text-text-gray mb-6">{item.unit}</div>
                  {item.features && (
                    <ul className="space-y-2 text-sm">
                      {item.features.map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <Check className="w-4 h-4 text-accent mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </div>
        
        <div className="text-center mt-12">
          <Button 
            size="lg" 
            className="bg-primary hover:bg-blue-700 text-white font-semibold py-3 px-8 text-lg"
            asChild
          >
            <a href="#contact">
              <i className="fas fa-calculator mr-2"></i>
              Request a Custom Quote
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
