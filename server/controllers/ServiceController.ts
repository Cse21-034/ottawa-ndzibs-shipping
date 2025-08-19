import { Request, Response } from "express";
import { BaseController } from "./BaseController";
import { IServiceService } from "../services/IServiceService";
import { insertServiceSchema } from "@shared/schema";

export class ServiceController extends BaseController {
  constructor(private serviceService: IServiceService) {
    super();
  }

  getActiveServices = async (req: Request, res: Response) => {
    try {
      const services = await this.serviceService.getActiveServices();
      return this.success(res, services);
    } catch (error) {
      return this.handleError(res, error, "Failed to fetch services");
    }
  };

  getAllServices = async (req: Request, res: Response) => {
    try {
      const services = await this.serviceService.getAllServices();
      return this.success(res, services);
    } catch (error) {
      return this.handleError(res, error, "Failed to fetch services");
    }
  };

  createService = async (req: Request, res: Response) => {
    try {
      const validatedData = insertServiceSchema.parse(req.body);
      const service = await this.serviceService.createService(validatedData);
      return this.created(res, service);
    } catch (error) {
      return this.handleError(res, error, "Failed to create service");
    }
  };

  updateService = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const service = await this.serviceService.updateService(id, req.body);
      return this.success(res, service);
    } catch (error) {
      return this.handleError(res, error, "Service not found");
    }
  };

  deleteService = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const deleted = await this.serviceService.deleteService(id);
      if (deleted) {
        return this.success(res, { message: "Service deleted" });
      } else {
        return res.status(404).json({ message: "Service not found" });
      }
    } catch (error) {
      return this.handleError(res, error, "Failed to delete service");
    }
  };
}