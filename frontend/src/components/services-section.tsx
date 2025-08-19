import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Ship, Plane, HandHeart, Check } from "lucide-react";
import type { Service } from "@shared/schema";

export default function ServicesSection() {
  const { data: services, isLoading } = useQuery<Service[]>({
    queryKey: ["/api/services"]
  });

  const getServiceIcon = (type: string) => {
    switch (type) {
      case "sea":
        return <Ship className="w-10 h-10" />;
      case "air":
        return <Plane className="w-10 h-10" />;
      default:
        return <HandHeart className="w-10 h-10" />;
    }
  };

  const specialServices = [
    { icon: "fas fa-couch", label: "Furniture & Home Décor" },
    { icon: "fas fa-laptop", label: "Electronics & Tech" },
    { icon: "fas fa-cut", label: "Beauty & Cosmetics" },
    { icon: "fas fa-tshirt", label: "Textiles & Clothing" },
    { icon: "fas fa-box", label: "Small Packages" }
  ];

  return (
    <section id="services" className="py-16 bg-light-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-secondary mb-4">Our Services</h2>
          <p className="text-lg text-text-gray max-w-3xl mx-auto">
            Comprehensive shipping solutions tailored to your needs, from small packages to large cargo shipments.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            // Loading skeletons
            Array.from({ length: 3 }).map((_, index) => (
              <Card key={index} className="p-8">
                <CardContent>
                  <Skeleton className="w-10 h-10 mb-4" />
                  <Skeleton className="h-6 w-32 mb-4" />
                  <Skeleton className="h-4 w-full mb-6" />
                  <Skeleton className="h-16 w-full mb-4" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            services?.map((service) => (
              <Card key={service.id} className="bg-white shadow-lg p-8 card-hover">
                <CardContent className="p-0">
                  <div className="text-primary mb-4">
                    {getServiceIcon(service.type)}
                  </div>
                  <h3 className="text-xl font-semibold text-secondary mb-4">{service.name}</h3>
                  <p className="text-text-gray mb-6">{service.description}</p>
                  
                  {service.nextDate && (
                    <div className="bg-accent bg-opacity-10 rounded-lg p-4 mb-4">
                      <div className="text-sm text-accent font-medium mb-1">Next Shipping Date:</div>
                      <div className="text-lg font-bold text-secondary">{service.nextDate}</div>
                    </div>
                  )}
                  
                  {service.frequency && !service.nextDate && (
                    <div className="bg-primary bg-opacity-10 rounded-lg p-4 mb-4">
                      <div className="text-sm text-primary font-medium mb-1">Service Frequency:</div>
                      <div className="text-lg font-bold text-secondary">{service.frequency}</div>
                    </div>
                  )}
                  
                  {service.features && (
                    <ul className="text-sm text-text-gray space-y-2">
                      {service.features.map((feature, index) => (
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
          
          {/* Special Handling Service */}
          <Card className="bg-white shadow-lg p-8 card-hover md:col-span-2 lg:col-span-1">
            <CardContent className="p-0">
              <div className="text-primary mb-4">
                <HandHeart className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-semibold text-secondary mb-4">Special Handling</h3>
              <p className="text-text-gray mb-6">
                Specialized care for delicate and valuable items requiring extra attention and security.
              </p>
              <div className="space-y-3">
                {specialServices.map((service, index) => (
                  <div key={index} className="flex items-center text-sm">
                    <i className={`${service.icon} text-accent mr-3`}></i>
                    <span>{service.label}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
