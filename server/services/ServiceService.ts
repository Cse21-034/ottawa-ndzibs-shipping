import { IStorage } from "../repositories/IStorage";
import { IServiceService } from "./IServiceService";
import { Service, InsertService } from "@shared/schema";

export class ServiceService implements IServiceService {
  constructor(private storage: IStorage) {}

  async getAllServices(): Promise<Service[]> {
    return await this.storage.getAllServices();
  }

  async getActiveServices(): Promise<Service[]> {
    return await this.storage.getActiveServices();
  }

  async createService(service: InsertService): Promise<Service> {
    return await this.storage.createService(service);
  }

  async updateService(id: string, service: Partial<InsertService>): Promise<Service> {
    return await this.storage.updateService(id, service);
  }

  async deleteService(id: string): Promise<boolean> {
    return await this.storage.deleteService(id);
  }
}