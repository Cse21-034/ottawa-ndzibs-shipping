import type { Express } from "express";
import { createServer, type Server } from "http";
import { DIContainer } from "./container/DIContainer";

export async function registerRoutes(app: Express): Promise<Server> {
  const container = DIContainer.getInstance();
  
  // Get controllers
  const contentController = container.getContentController();
  const serviceController = container.getServiceController();
  const pricingController = container.getPricingController();
  const testimonialController = container.getTestimonialController();
  const contactController = container.getContactController();

  // Content routes
  app.get("/api/content", contentController.getAllContent);
  app.put("/api/content/:key", contentController.updateContent);

  // Services routes
  app.get("/api/services", serviceController.getActiveServices);
  app.get("/api/admin/services", serviceController.getAllServices);
  app.post("/api/admin/services", serviceController.createService);
  app.put("/api/admin/services/:id", serviceController.updateService);
  app.delete("/api/admin/services/:id", serviceController.deleteService);

  // Pricing routes
  app.get("/api/pricing", pricingController.getActivePricing);
  app.get("/api/admin/pricing", pricingController.getAllPricing);
  app.post("/api/admin/pricing", pricingController.createPricing);
  app.put("/api/admin/pricing/:id", pricingController.updatePricing);
  app.delete("/api/admin/pricing/:id", pricingController.deletePricing);

  // Testimonials routes
  app.get("/api/testimonials", testimonialController.getActiveTestimonials);
  app.get("/api/admin/testimonials", testimonialController.getAllTestimonials);
  app.post("/api/admin/testimonials", testimonialController.createTestimonial);
  app.put("/api/admin/testimonials/:id", testimonialController.updateTestimonial);
  app.delete("/api/admin/testimonials/:id", testimonialController.deleteTestimonial);

  // Contacts routes
  app.post("/api/contact", contactController.createContact);
  app.get("/api/admin/contacts", contactController.getAllContacts);
  app.put("/api/admin/contacts/:id/status", contactController.updateContactStatus);

  const httpServer = createServer(app);
  return httpServer;
}
