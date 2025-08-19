import { 
  type User, type InsertUser,
  type Content, type InsertContent,
  type Service, type InsertService,
  type Pricing, type InsertPricing,
  type Testimonial, type InsertTestimonial,
  type Contact, type InsertContact
} from "@shared/schema";

export interface IStorage {
  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Content
  getAllContent(): Promise<Content[]>;
  getContentByKey(key: string): Promise<Content | undefined>;
  updateContent(key: string, value: string): Promise<Content>;

  // Services
  getAllServices(): Promise<Service[]>;
  getActiveServices(): Promise<Service[]>;
  createService(service: InsertService): Promise<Service>;
  updateService(id: string, service: Partial<InsertService>): Promise<Service>;
  deleteService(id: string): Promise<boolean>;

  // Pricing
  getAllPricing(): Promise<Pricing[]>;
  getActivePricing(): Promise<Pricing[]>;
  createPricing(pricing: InsertPricing): Promise<Pricing>;
  updatePricing(id: string, pricing: Partial<InsertPricing>): Promise<Pricing>;
  deletePricing(id: string): Promise<boolean>;

  // Testimonials
  getAllTestimonials(): Promise<Testimonial[]>;
  getActiveTestimonials(): Promise<Testimonial[]>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
  updateTestimonial(id: string, testimonial: Partial<InsertTestimonial>): Promise<Testimonial>;
  deleteTestimonial(id: string): Promise<boolean>;

  // Contacts
  getAllContacts(): Promise<Contact[]>;
  createContact(contact: InsertContact): Promise<Contact>;
  updateContactStatus(id: string, status: string): Promise<Contact>;
}