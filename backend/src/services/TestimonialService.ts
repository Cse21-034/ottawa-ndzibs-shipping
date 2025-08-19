import { IStorage } from "../repositories/IStorage";
import { ITestimonialService } from "./ITestimonialService";
import { Testimonial, InsertTestimonial } from "@shared/schema";

export class TestimonialService implements ITestimonialService {
  constructor(private storage: IStorage) {}

  async getAllTestimonials(): Promise<Testimonial[]> {
    return await this.storage.getAllTestimonials();
  }

  async getActiveTestimonials(): Promise<Testimonial[]> {
    return await this.storage.getActiveTestimonials();
  }

  async createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial> {
    return await this.storage.createTestimonial(testimonial);
  }

  async updateTestimonial(id: string, testimonial: Partial<InsertTestimonial>): Promise<Testimonial> {
    return await this.storage.updateTestimonial(id, testimonial);
  }

  async deleteTestimonial(id: string): Promise<boolean> {
    return await this.storage.deleteTestimonial(id);
  }
}