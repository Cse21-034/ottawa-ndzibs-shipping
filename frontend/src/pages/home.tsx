import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import AboutSection from "@/components/about-section";
import ServicesSection from "@/components/services-section";
import PricingSection from "@/components/pricing-section";
import ProcessSection from "@/components/process-section";
import TestimonialsSection from "@/components/testimonials-section";
import ContactSection from "@/components/contact-section";
import { Helmet } from "react-helmet-async";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Ottawa Ndzibs Shipping - Reliable China to Botswana Freight Services</title>
        <meta name="description" content="Professional sea and air freight services from China to Botswana. Secure, reliable shipping solutions with competitive pricing. Book your shipment today!" />
        <meta property="og:title" content="Ottawa Ndzibs Shipping - China to Botswana Freight" />
        <meta property="og:description" content="Trusted logistics partner for sea and air freight from China to Botswana. Competitive pricing, secure handling." />
        <meta property="og:type" content="website" />
      </Helmet>
      
      <div className="min-h-screen bg-background font-inter">
        <Navigation />
        <main>
          <HeroSection />
          <AboutSection />
          <ServicesSection />
          <PricingSection />
          <ProcessSection />
          <TestimonialsSection />
          <ContactSection />
        </main>
        
        {/* CTA Banner */}
        <section id="book" className="py-16 gradient-accent text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Reserve Your Shipment Now – Limited Slots Available!
            </h2>
            <p className="text-xl mb-8 text-green-100">
              Don't miss out on our next shipment. Secure your space today and get your goods moving from China to Botswana.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="https://wa.me/26772951666" 
                className="bg-white text-accent hover:bg-gray-100 font-semibold py-4 px-8 rounded-lg text-lg transition-colors inline-flex items-center justify-center"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-whatsapp mr-2"></i>
                Book via WhatsApp
              </a>
              <a 
                href="#contact"
                className="bg-secondary hover:bg-gray-800 text-white font-semibold py-4 px-8 rounded-lg text-lg transition-colors inline-flex items-center justify-center"
              >
                <i className="fas fa-ship mr-2"></i>
                Book Your Shipment
              </a>
            </div>
            
            <div className="mt-8 flex justify-center items-center space-x-6 text-sm">
              <div className="flex items-center">
                <i className="fas fa-clock mr-2"></i>
                <span>Quick Response</span>
              </div>
              <div className="flex items-center">
                <i className="fas fa-shield-alt mr-2"></i>
                <span>Secure & Insured</span>
              </div>
              <div className="flex items-center">
                <i className="fas fa-star mr-2"></i>
                <span>5-Star Service</span>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-secondary text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Company Info */}
              <div>
                <div className="flex items-center mb-4">
                  <span className="text-xl font-bold">Ottawa Ndzibs</span>
                </div>
                <p className="text-gray-300 mb-4">
                  Reliable shipping from China to Botswana. Your trusted logistics partner for sea and air freight services.
                </p>
                <div className="flex space-x-4">
                  <a href="https://wa.me/26772951666" className="text-gray-300 hover:text-accent" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-whatsapp text-xl"></i>
                  </a>
                  <a href="mailto:ottiegosalamang@gmail.com" className="text-gray-300 hover:text-accent">
                    <i className="fas fa-envelope text-xl"></i>
                  </a>
                  <a href="tel:+26772951666" className="text-gray-300 hover:text-accent">
                    <i className="fas fa-phone text-xl"></i>
                  </a>
                </div>
              </div>
              
              {/* Services */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Services</h3>
                <ul className="space-y-2 text-gray-300">
                  <li><a href="#services" className="hover:text-accent">Sea Freight</a></li>
                  <li><a href="#services" className="hover:text-accent">Air Freight</a></li>
                  <li><a href="#services" className="hover:text-accent">Special Handling</a></li>
                  <li><a href="#pricing" className="hover:text-accent">Custom Quotes</a></li>
                </ul>
              </div>
              
              {/* Quick Links */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                <ul className="space-y-2 text-gray-300">
                  <li><a href="#about" className="hover:text-accent">About Us</a></li>
                  <li><a href="#pricing" className="hover:text-accent">Pricing</a></li>
                  <li><a href="#contact" className="hover:text-accent">Contact</a></li>
                  <li><a href="#book" className="hover:text-accent">Book Now</a></li>
                </ul>
              </div>
              
              {/* Contact Info */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
                <div className="space-y-2 text-gray-300">
                  <p className="flex items-center">
                    <i className="fas fa-phone mr-2"></i>
                    <span>+267 72951666</span>
                  </p>
                  <p className="flex items-center">
                    <i className="fas fa-phone mr-2"></i>
                    <span>+267 73133989</span>
                  </p>
                  <p className="flex items-center">
                    <i className="fas fa-envelope mr-2"></i>
                    <span>ottiegosalamang@gmail.com</span>
                  </p>
                  <p className="flex items-start">
                    <i className="fas fa-map-marker-alt mr-2 mt-1"></i>
                    <span>Plot 19376, Phase 2, Gaborone – Office 5</span>
                  </p>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
              <p>&copy; 2024 Ottawa Ndzibs Shipping. All rights reserved. | Professional freight services from China to Botswana</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
