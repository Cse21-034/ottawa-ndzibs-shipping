import { eq } from 'drizzle-orm';
import { db } from './database.js';
import { 
  users, content, services, pricing, testimonials, contacts,
  type User, type InsertUser,
  type Content, type InsertContent,
  type Service, type InsertService,
  type Pricing, type InsertPricing,
  type Testimonial, type InsertTestimonial,
  type Contact, type InsertContact
} from './schema';
import { IStorage } from './repositories/IStorage.js';

export class DbStorage implements IStorage {
  
  // Users
  async getUser(id: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username)).limit(1);
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await db.insert(users).values(insertUser).returning();
    return result[0];
  }

  // Content
  async getAllContent(): Promise<Content[]> {
    return await db.select().from(content);
  }

  async getContentByKey(key: string): Promise<Content | undefined> {
    const result = await db.select().from(content).where(eq(content.key, key)).limit(1);
    return result[0];
  }

  async updateContent(key: string, value: string): Promise<Content> {
    // Try to update existing content
    const updated = await db
      .update(content)
      .set({ value, updatedAt: new Date() })
      .where(eq(content.key, key))
      .returning();

    if (updated.length > 0) {
      return updated[0];
    }

    // If no existing content, create new
    const created = await db
      .insert(content)
      .values({ key, value })
      .returning();
    
    return created[0];
  }

  // Services
  async getAllServices(): Promise<Service[]> {
    return await db.select().from(services);
  }

  async getActiveServices(): Promise<Service[]> {
    return await db.select().from(services).where(eq(services.active, true));
  }

  async createService(service: InsertService): Promise<Service> {
    const result = await db.insert(services).values(service).returning();
    return result[0];
  }

  async updateService(id: string, service: Partial<InsertService>): Promise<Service> {
    const result = await db
      .update(services)
      .set(service)
      .where(eq(services.id, id))
      .returning();
    
    if (result.length === 0) {
      throw new Error("Service not found");
    }
    
    return result[0];
  }

  async deleteService(id: string): Promise<boolean> {
    const result = await db.delete(services).where(eq(services.id, id)).returning();
    return result.length > 0;
  }

  // Pricing
  async getAllPricing(): Promise<Pricing[]> {
    return await db.select().from(pricing);
  }

  async getActivePricing(): Promise<Pricing[]> {
    return await db.select().from(pricing).where(eq(pricing.active, true));
  }

  async createPricing(pricingData: InsertPricing): Promise<Pricing> {
    const result = await db.insert(pricing).values(pricingData).returning();
    return result[0];
  }

  async updatePricing(id: string, pricingData: Partial<InsertPricing>): Promise<Pricing> {
    const result = await db
      .update(pricing)
      .set(pricingData)
      .where(eq(pricing.id, id))
      .returning();
    
    if (result.length === 0) {
      throw new Error("Pricing not found");
    }
    
    return result[0];
  }

  async deletePricing(id: string): Promise<boolean> {
    const result = await db.delete(pricing).where(eq(pricing.id, id)).returning();
    return result.length > 0;
  }

  // Testimonials
  async getAllTestimonials(): Promise<Testimonial[]> {
    return await db.select().from(testimonials);
  }

  async getActiveTestimonials(): Promise<Testimonial[]> {
    return await db.select().from(testimonials).where(eq(testimonials.active, true));
  }

  async createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial> {
    const result = await db.insert(testimonials).values(testimonial).returning();
    return result[0];
  }

  async updateTestimonial(id: string, testimonial: Partial<InsertTestimonial>): Promise<Testimonial> {
    const result = await db
      .update(testimonials)
      .set(testimonial)
      .where(eq(testimonials.id, id))
      .returning();
    
    if (result.length === 0) {
      throw new Error("Testimonial not found");
    }
    
    return result[0];
  }

  async deleteTestimonial(id: string): Promise<boolean> {
    const result = await db.delete(testimonials).where(eq(testimonials.id, id)).returning();
    return result.length > 0;
  }

  // Contacts
  async getAllContacts(): Promise<Contact[]> {
    return await db.select().from(contacts);
  }

  async createContact(contact: InsertContact): Promise<Contact> {
    const result = await db.insert(contacts).values(contact).returning();
    return result[0];
  }

  async updateContactStatus(id: string, status: string): Promise<Contact> {
    const result = await db
      .update(contacts)
      .set({ status })
      .where(eq(contacts.id, id))
      .returning();
    
    if (result.length === 0) {
      throw new Error("Contact not found");
    }
    
    return result[0];
  }
}
