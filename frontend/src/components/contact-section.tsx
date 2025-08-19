import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import type { InsertContact } from "@shared/schema";

export default function ContactSection() {
  const { toast } = useToast();
  const [formData, setFormData] = useState<Partial<InsertContact>>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    serviceType: "",
    message: ""
  });

  const submitContact = useMutation({
    mutationFn: async (data: InsertContact) => {
      return await apiRequest("POST", "/api/contact", data);
    },
    onSuccess: () => {
      toast({
        title: "Message sent successfully!",
        description: "Thank you for your inquiry. We'll get back to you soon."
      });
      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        serviceType: "",
        message: ""
      });
    },
    onError: () => {
      toast({
        title: "Error sending message",
        description: "Please try again or contact us directly.",
        variant: "destructive"
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.message) {
      toast({
        title: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    submitContact.mutate(formData as InsertContact);
  };

  const handleInputChange = (field: keyof InsertContact, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const contactInfo = [
    {
      icon: MessageCircle,
      iconClass: "bg-accent",
      title: "WhatsApp / Phone",
      content: "+267 72951666 / +267 73133989",
      href: "https://wa.me/26772951666"
    },
    {
      icon: Mail,
      iconClass: "bg-primary",
      title: "Email",
      content: "ottiegosalamang@gmail.com",
      href: "mailto:ottiegosalamang@gmail.com"
    },
    {
      icon: MapPin,
      iconClass: "bg-secondary",
      title: "Office Location",
      content: "Plot 19376, Phase 2, Gaborone – Office 5",
      href: null
    }
  ];

  return (
    <section id="contact" className="py-16 bg-light-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-secondary mb-4">Get In Touch</h2>
          <p className="text-lg text-text-gray max-w-3xl mx-auto">
            Ready to ship? Contact us today for a quote or to reserve your space in our next shipment.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h3 className="text-2xl font-semibold text-secondary mb-6">Contact Information</h3>
            
            <div className="space-y-6">
              {contactInfo.map((info, index) => {
                const IconComponent = info.icon;
                return (
                  <div key={index} className="flex items-center">
                    <div className={`${info.iconClass} text-white w-12 h-12 rounded-lg flex items-center justify-center mr-4`}>
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="font-semibold text-secondary">{info.title}</div>
                      <div className="text-text-gray">
                        {info.href ? (
                          <a 
                            href={info.href} 
                            className="hover:text-primary transition-colors"
                            target={info.href.includes('mailto') || info.href.includes('wa.me') ? '_blank' : '_self'}
                            rel="noopener noreferrer"
                          >
                            {info.content}
                          </a>
                        ) : (
                          info.content
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* Quick Contact Buttons */}
            <div className="mt-8 space-y-4">
              <Button 
                className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6"
                asChild
              >
                <a 
                  href="https://wa.me/26772951666"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Chat on WhatsApp
                </a>
              </Button>
              <Button 
                className="w-full bg-primary hover:bg-blue-700 text-white font-semibold py-3 px-6"
                asChild
              >
                <a href="tel:+26772951666">
                  <Phone className="w-5 h-5 mr-2" />
                  Call Now
                </a>
              </Button>
            </div>
          </div>
          
          {/* Contact Form */}
          <div>
            <h3 className="text-2xl font-semibold text-secondary mb-6">Send us a Message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    type="text"
                    value={formData.firstName || ""}
                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    type="text"
                    value={formData.lastName || ""}
                    onChange={(e) => handleInputChange("lastName", e.target.value)}
                    required
                    className="mt-1"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email || ""}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  required
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone || ""}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="serviceType">Service Type</Label>
                <Select value={formData.serviceType || ""} onValueChange={(value) => handleInputChange("serviceType", value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select Service" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sea-freight">Sea Freight</SelectItem>
                    <SelectItem value="air-freight">Air Freight</SelectItem>
                    <SelectItem value="special-handling">Special Handling</SelectItem>
                    <SelectItem value="quote">Request Quote</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="message">Message *</Label>
                <Textarea
                  id="message"
                  value={formData.message || ""}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                  placeholder="Tell us about your shipping needs..."
                  required
                  className="mt-1"
                  rows={4}
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-accent hover:bg-green-600 text-white font-semibold py-3 px-6"
                disabled={submitContact.isPending}
              >
                <Mail className="w-5 h-5 mr-2" />
                {submitContact.isPending ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>
        </div>
        
        {/* Google Maps Embed */}
        <div className="mt-12">
          <h3 className="text-2xl font-semibold text-secondary mb-6 text-center">Find Our Office</h3>
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="bg-gray-200 h-64 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-primary mx-auto mb-2" />
                  <p className="text-text-gray">Google Maps Integration</p>
                  <p className="text-sm text-text-gray">Plot 19376, Phase 2, Gaborone – Office 5</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
