import { Card, CardContent } from "@/components/ui/card";

export default function AboutSection() {
  const stats = [
    { value: "5+", label: "Years Experience" },
    { value: "1000+", label: "Shipments Completed" },
    { value: "500+", label: "Happy Clients" },
    { value: "99%", label: "Success Rate" }
  ];

  return (
    <section id="about" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-secondary mb-6">
              About Ottawa Ndzibs Shipping
            </h2>
            <p className="text-lg text-text-gray mb-6 leading-relaxed">
              Ottawa Ndzibs Shipping provides safe and dependable sea and air freight services from China to Botswana. 
              With years of experience, we ensure smooth customs clearance, cargo safety, and competitive pricing.
            </p>
            <p className="text-lg text-text-gray mb-8 leading-relaxed">
              Our commitment to excellence and customer satisfaction has made us a trusted partner for businesses 
              and individuals looking to import goods efficiently and securely.
            </p>
            
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                  <div className="text-text-gray">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-12 lg:mt-0">
            <Card className="overflow-hidden shadow-lg">
              <CardContent className="p-0">
                <img 
                  src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
                  alt="Professional shipping office with team members discussing logistics" 
                  className="w-full h-auto rounded-xl"
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
