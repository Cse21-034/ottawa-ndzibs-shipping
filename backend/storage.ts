import { 
  type User, type InsertUser,
  type Content, type InsertContent,
  type Service, type InsertService,
  type Pricing, type InsertPricing,
  type Testimonial, type InsertTestimonial,
  type Contact, type InsertContact
} from "./schema.js";
import { IStorage } from "./repositories/IStorage";
import { randomUUID } from "crypto";

export class MemStorage implements IStorage {
  private users: Map<string, User> = new Map();
  private content: Map<string, Content> = new Map();
  private services: Map<string, Service> = new Map();
  private pricing: Map<string, Pricing> = new Map();
  private testimonials: Map<string, Testimonial> = new Map();
  private contacts: Map<string, Contact> = new Map();

  constructor() {
    this.initializeDefaultData();
  }

  private initializeDefaultData() {
    // Initialize default admin user
    const adminId = randomUUID();
    this.users.set(adminId, {
      id: adminId,
      username: "admin",
      password: "admin123", // In production, this should be hashed
      role: "admin"
    });

    // Initialize default content
    const defaultContent = [
      { key: "company_description", value: "Ottawa Ndzibs Shipping provides safe and dependable sea and air freight services from China to Botswana. With years of experience, we ensure smooth customs clearance, cargo safety, and competitive pricing." },
      { key: "hero_title", value: "Reliable Shipping from China to Botswana" },
      { key: "hero_subtitle", value: "Secure, fast, and hassle-free sea & air freight services. Book your space today!" },
      { key: "contact_phone1", value: "+267 72951666" },
      { key: "contact_phone2", value: "+267 73133989" },
      { key: "contact_email", value: "ottiegosalamang@gmail.com" },
      { key: "contact_address", value: "Plot 19376, Phase 2, Gaborone – Office 5" }
    ];

    defaultContent.forEach(item => {
      const id = randomUUID();
      this.content.set(id, {
        id,
        key: item.key,
        value: item.value,
        updatedAt: new Date()
      });
    });

    // Initialize default services
    const defaultServices = [
      {
        name: "Sea Freight",
        type: "sea",
        description: "Cost-effective sea freight for large shipments. Perfect for furniture, bulk goods, and non-urgent deliveries.",
        nextDate: "25 August 2025",
        frequency: "Monthly",
        features: ["30-45 day transit time", "Full container & LCL options", "Door-to-door delivery"],
        active: true
      },
      {
        name: "Air Freight",
        type: "air", 
        description: "Fast air freight for urgent shipments. Weekly flights with collection at Phase 2, Gaborone.",
        nextDate: null,
        frequency: "Weekly Shipments",
        features: ["5-7 day transit time", "Express handling", "Collection in Gaborone"],
        active: true
      }
    ];

    defaultServices.forEach(service => {
      const id = randomUUID();
      this.services.set(id, { 
        id, 
        ...service,
        nextDate: service.nextDate || null,
        frequency: service.frequency || null,
        features: service.features || null,
        active: service.active ?? true
      });
    });

    // Initialize default pricing
    const defaultPricing = [
      {
        category: "Furniture & Décor",
        description: "Building items, home décor, furniture",
        rate: 4500,
        unit: "per CBM",
        features: ["Protective packaging", "Careful handling", "Insurance included"],
        color: "blue",
        icon: "fas fa-couch",
        active: true
      },
      {
        category: "Beauty & Cosmetics",
        description: "Hair, cosmetics, skincare products",
        rate: 4900,
        unit: "per CBM",
        features: ["Temperature controlled", "Secure handling", "Customs compliance"],
        color: "pink",
        icon: "fas fa-cut",
        active: true
      },
      {
        category: "Electronics",
        description: "Electronics & electrical goods",
        rate: 5000,
        unit: "per CBM",
        features: ["Anti-static packaging", "Fragile handling", "Full insurance"],
        color: "purple",
        icon: "fas fa-laptop",
        active: true
      },
      {
        category: "Textiles & Clothing",
        description: "Non-branded clothing, fabrics",
        rate: 5200,
        unit: "per CBM",
        features: ["Moisture protection", "Compressed packing", "Quality guarantee"],
        color: "green",
        icon: "fas fa-tshirt",
        active: true
      },
      {
        category: "Small Goods",
        description: "Smaller goods charged by weight",
        rate: 90,
        unit: "per kg + P150 Handling Fee",
        features: ["Individual tracking", "Express processing", "Secure packaging"],
        color: "orange",
        icon: "fas fa-box",
        active: true
      }
    ];

    defaultPricing.forEach(pricing => {
      const id = randomUUID();
      this.pricing.set(id, { 
        id, 
        ...pricing,
        features: pricing.features || null,
        active: pricing.active ?? true
      });
    });

    // Initialize default testimonials
    const defaultTestimonials = [
      {
        name: "Thabo Mogale",
        location: "Gaborone, Botswana",
        content: "Excellent service! My furniture arrived safely and on time. The team was professional throughout the entire process.",
        rating: 5,
        active: true
      },
      {
        name: "Lesego Motswedi",
        location: "Francistown, Botswana",
        content: "Fast air freight service for my electronics. Great communication and transparent pricing. Highly recommended!",
        rating: 5,
        active: true
      },
      {
        name: "Kgomotso Ditsele",
        location: "Maun, Botswana",
        content: "Been using Ottawa Ndzibs for all my business imports. Reliable, professional, and great value for money.",
        rating: 5,
        active: true
      }
    ];

    defaultTestimonials.forEach(testimonial => {
      const id = randomUUID();
      this.testimonials.set(id, { 
        id, 
        ...testimonial,
        rating: testimonial.rating || 5,
        active: testimonial.active ?? true,
        createdAt: new Date() 
      });
    });
  }

  // Users
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id, role: "admin" };
    this.users.set(id, user);
    return user;
  }

  // Content
  async getAllContent(): Promise<Content[]> {
    return Array.from(this.content.values());
  }

  async getContentByKey(key: string): Promise<Content | undefined> {
    return Array.from(this.content.values()).find(c => c.key === key);
  }

  async updateContent(key: string, value: string): Promise<Content> {
    const existing = await this.getContentByKey(key);
    if (existing) {
      existing.value = value;
      existing.updatedAt = new Date();
      this.content.set(existing.id, existing);
      return existing;
    } else {
      const id = randomUUID();
      const newContent: Content = {
        id,
        key,
        value,
        updatedAt: new Date()
      };
      this.content.set(id, newContent);
      return newContent;
    }
  }

  // Services
  async getAllServices(): Promise<Service[]> {
    return Array.from(this.services.values());
  }

  async getActiveServices(): Promise<Service[]> {
    return Array.from(this.services.values()).filter(s => s.active);
  }

  async createService(service: InsertService): Promise<Service> {
    const id = randomUUID();
    const newService: Service = { 
      ...service, 
      id,
      nextDate: service.nextDate || null,
      frequency: service.frequency || null,
      features: service.features || null,
      active: service.active ?? true
    };
    this.services.set(id, newService);
    return newService;
  }

  async updateService(id: string, service: Partial<InsertService>): Promise<Service> {
    const existing = this.services.get(id);
    if (!existing) {
      throw new Error("Service not found");
    }
    const updated = { ...existing, ...service };
    this.services.set(id, updated);
    return updated;
  }

  async deleteService(id: string): Promise<boolean> {
    return this.services.delete(id);
  }

  // Pricing
  async getAllPricing(): Promise<Pricing[]> {
    return Array.from(this.pricing.values());
  }

  async getActivePricing(): Promise<Pricing[]> {
    return Array.from(this.pricing.values()).filter(p => p.active);
  }

  async createPricing(pricing: InsertPricing): Promise<Pricing> {
    const id = randomUUID();
    const newPricing: Pricing = { 
      ...pricing, 
      id,
      features: pricing.features || null,
      active: pricing.active ?? true
    };
    this.pricing.set(id, newPricing);
    return newPricing;
  }

  async updatePricing(id: string, pricing: Partial<InsertPricing>): Promise<Pricing> {
    const existing = this.pricing.get(id);
    if (!existing) {
      throw new Error("Pricing not found");
    }
    const updated = { ...existing, ...pricing };
    this.pricing.set(id, updated);
    return updated;
  }

  async deletePricing(id: string): Promise<boolean> {
    return this.pricing.delete(id);
  }

  // Testimonials
  async getAllTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values());
  }

  async getActiveTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values()).filter(t => t.active);
  }

  async createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial> {
    const id = randomUUID();
    const newTestimonial: Testimonial = { 
      ...testimonial, 
      id,
      rating: testimonial.rating || 5,
      active: testimonial.active ?? true,
      createdAt: new Date() 
    };
    this.testimonials.set(id, newTestimonial);
    return newTestimonial;
  }

  async updateTestimonial(id: string, testimonial: Partial<InsertTestimonial>): Promise<Testimonial> {
    const existing = this.testimonials.get(id);
    if (!existing) {
      throw new Error("Testimonial not found");
    }
    const updated = { ...existing, ...testimonial };
    this.testimonials.set(id, updated);
    return updated;
  }

  async deleteTestimonial(id: string): Promise<boolean> {
    return this.testimonials.delete(id);
  }

  // Contacts
  async getAllContacts(): Promise<Contact[]> {
    return Array.from(this.contacts.values());
  }

  async createContact(contact: InsertContact): Promise<Contact> {
    const id = randomUUID();
    const newContact: Contact = { 
      ...contact, 
      id,
      phone: contact.phone || null,
      serviceType: contact.serviceType || null,
      status: "new",
      createdAt: new Date() 
    };
    this.contacts.set(id, newContact);
    return newContact;
  }

  async updateContactStatus(id: string, status: string): Promise<Contact> {
    const existing = this.contacts.get(id);
    if (!existing) {
      throw new Error("Contact not found");
    }
    existing.status = status;
    this.contacts.set(id, existing);
    return existing;
  }
}

export const storage = new MemStorage();
