import { IStorage } from "../repositories/IStorage";
import { IPricingService } from "./IPricingService";
import { Pricing, InsertPricing } from "@shared/schema";

export class PricingService implements IPricingService {
  constructor(private storage: IStorage) {}

  async getAllPricing(): Promise<Pricing[]> {
    return await this.storage.getAllPricing();
  }

  async getActivePricing(): Promise<Pricing[]> {
    return await this.storage.getActivePricing();
  }

  async createPricing(pricing: InsertPricing): Promise<Pricing> {
    return await this.storage.createPricing(pricing);
  }

  async updatePricing(id: string, pricing: Partial<InsertPricing>): Promise<Pricing> {
    return await this.storage.updatePricing(id, pricing);
  }

  async deletePricing(id: string): Promise<boolean> {
    return await this.storage.deletePricing(id);
  }
}