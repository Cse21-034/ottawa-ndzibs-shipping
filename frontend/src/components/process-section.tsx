import { Card, CardContent } from "@/components/ui/card";

export default function ProcessSection() {
  const steps = [
    {
      number: 1,
      title: "Contact Us",
      description: "Reach out via WhatsApp, phone, or email to discuss your shipping needs.",
      icons: ["fab fa-whatsapp", "fas fa-phone", "fas fa-envelope"],
      bgColor: "bg-primary"
    },
    {
      number: 2,
      title: "Reserve Space",
      description: "Provide shipment details and reserve your space in our next available shipment.",
      icons: ["fas fa-clipboard-list"],
      bgColor: "bg-primary"
    },
    {
      number: 3,
      title: "Loading & Shipping",
      description: "Your goods are carefully loaded in China and shipped safely to Botswana.",
      icons: ["fas fa-ship"],
      bgColor: "bg-primary"
    },
    {
      number: 4,
      title: "Delivery",
      description: "Smooth customs clearance and delivery to your specified location in Botswana.",
      icons: ["fas fa-home"],
      bgColor: "bg-accent"
    }
  ];

  return (
    <section className="py-16 bg-light-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-secondary mb-4">How It Works</h2>
          <p className="text-lg text-text-gray max-w-3xl mx-auto">
            Simple, transparent process from booking to delivery. We handle everything so you don't have to worry.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <Card key={index} className="text-center bg-white shadow-lg card-hover">
              <CardContent className="p-6">
                <div className={`${step.bgColor} text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4`}>
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold text-secondary mb-3">{step.title}</h3>
                <p className="text-text-gray mb-4">{step.description}</p>
                <div className="flex justify-center space-x-3">
                  {step.icons.map((icon, iconIndex) => (
                    <i key={iconIndex} className={`${icon} text-xl ${step.number === 4 ? 'text-accent' : 'text-primary'}`}></i>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
