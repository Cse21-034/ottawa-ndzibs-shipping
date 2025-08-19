import { Button } from "@/components/ui/button";
import { Shield, Clock, Star } from "lucide-react";

export default function HeroSection() {
  return (
    <section id="home" className="relative hero-bg text-white">
      {/* Hero background overlay */}
      <div className="absolute inset-0 bg-black opacity-20"></div>
      
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-80"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=1080')"
        }}
      />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="text-center lg:text-left lg:w-1/2">
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">
            Reliable Shipping from China to Botswana 
            <span className="block text-2xl lg:text-3xl mt-2">🇨🇳➡️🇧🇼</span>
          </h1>
          <p className="text-xl lg:text-2xl mb-8 text-blue-100">
            Secure, fast, and hassle-free sea & air freight services. Book your space today!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Button 
              size="lg" 
              className="bg-accent hover:bg-green-600 text-white font-semibold py-4 px-8 text-lg"
              asChild
            >
              <a href="#contact">
                <i className="fas fa-ship mr-2"></i>
                Reserve Your Shipment
              </a>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="bg-white text-primary hover:bg-gray-100 font-semibold py-4 px-8 text-lg border-white"
              asChild
            >
              <a href="tel:+26772951666">
                <i className="fas fa-phone mr-2"></i>
                Contact Us
              </a>
            </Button>
          </div>
          
          {/* Trust indicators */}
          <div className="mt-12 flex flex-wrap gap-6 justify-center lg:justify-start text-sm">
            <div className="flex items-center">
              <Shield className="w-5 h-5 text-accent mr-2" />
              <span>Secure & Insured</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-5 h-5 text-accent mr-2" />
              <span>On-Time Delivery</span>
            </div>
            <div className="flex items-center">
              <Star className="w-5 h-5 text-accent mr-2" />
              <span>Trusted by 500+ Clients</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
