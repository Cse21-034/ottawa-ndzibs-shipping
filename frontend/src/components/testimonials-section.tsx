import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Star } from "lucide-react";
import type { Testimonial } from "@shared/schema";

export default function TestimonialsSection() {
  const { data: testimonials, isLoading } = useQuery<Testimonial[]>({
    queryKey: ["/api/testimonials"]
  });

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-secondary mb-4">Client Success Stories</h2>
          <p className="text-lg text-text-gray max-w-3xl mx-auto">
            See what our satisfied customers have to say about our reliable shipping services.
          </p>
        </div>
        
        {/* Success Banner */}
        <div className="gradient-accent text-white rounded-xl p-8 mb-12 text-center">
          <h3 className="text-2xl font-bold mb-2">🎉 Latest Success!</h3>
          <p className="text-xl">30 June Container Successfully Loaded from China to Botswana!</p>
          <p className="text-green-100 mt-2">Another successful shipment delivered safely to our clients</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            // Loading skeletons
            Array.from({ length: 3 }).map((_, index) => (
              <Card key={index} className="bg-light-bg border p-6">
                <CardContent className="p-0">
                  <div className="flex items-center mb-4">
                    <div className="flex text-lg">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Skeleton key={i} className="w-4 h-4 mr-1" />
                      ))}
                    </div>
                  </div>
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-3/4 mb-4" />
                  <div className="flex items-center">
                    <Skeleton className="w-10 h-10 rounded-full mr-3" />
                    <div>
                      <Skeleton className="h-4 w-24 mb-1" />
                      <Skeleton className="h-3 w-20" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            testimonials?.map((testimonial) => (
              <Card key={testimonial.id} className="bg-light-bg rounded-xl p-6 border border-gray-200">
                <CardContent className="p-0">
                  <div className="flex items-center mb-4">
                    <div className="text-yellow-500 text-lg flex">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                  </div>
                  <p className="text-text-gray mb-4 italic">"{testimonial.content}"</p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-semibold">
                      {getInitials(testimonial.name)}
                    </div>
                    <div className="ml-3">
                      <div className="font-semibold text-secondary">{testimonial.name}</div>
                      <div className="text-sm text-text-gray">{testimonial.location}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
