import { Request, Response } from "express";
import { BaseController } from "./BaseController";
import { IPricingService } from "../services/IPricingService";
import { insertPricingSchema } from "@shared/schema";

export class PricingController extends BaseController {
  constructor(private pricingService: IPricingService) {
    super();
  }

  getActivePricing = async (req: Request, res: Response) => {
    try {
      const pricing = await this.pricingService.getActivePricing();
      return this.success(res, pricing);
    } catch (error) {
      return this.handleError(res, error, "Failed to fetch pricing");
    }
  };

  getAllPricing = async (req: Request, res: Response) => {
    try {
      const pricing = await this.pricingService.getAllPricing();
      return this.success(res, pricing);
    } catch (error) {
      return this.handleError(res, error, "Failed to fetch pricing");
    }
  };

  createPricing = async (req: Request, res: Response) => {
    try {
      const validatedData = insertPricingSchema.parse(req.body);
      const pricing = await this.pricingService.createPricing(validatedData);
      return this.created(res, pricing);
    } catch (error) {
      return this.handleError(res, error, "Failed to create pricing");
    }
  };

  updatePricing = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const pricing = await this.pricingService.updatePricing(id, req.body);
      return this.success(res, pricing);
    } catch (error) {
      return this.handleError(res, error, "Pricing not found");
    }
  };

  deletePricing = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const deleted = await this.pricingService.deletePricing(id);
      if (deleted) {
        return this.success(res, { message: "Pricing deleted" });
      } else {
        return res.status(404).json({ message: "Pricing not found" });
      }
    } catch (error) {
      return this.handleError(res, error, "Failed to delete pricing");
    }
  };
}