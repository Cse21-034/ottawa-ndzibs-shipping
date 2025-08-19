import { Pricing, InsertPricing } from "@shared/schema";

export interface IPricingService {
  getAllPricing(): Promise<Pricing[]>;
  getActivePricing(): Promise<Pricing[]>;
  createPricing(pricing: InsertPricing): Promise<Pricing>;
  updatePricing(id: string, pricing: Partial<InsertPricing>): Promise<Pricing>;
  deletePricing(id: string): Promise<boolean>;
}