import { IStorage } from "../repositories/IStorage";
import { IContactService } from "./IContactService";
import { Contact, InsertContact } from "@shared/schema";

export class ContactService implements IContactService {
  constructor(private storage: IStorage) {}

  async getAllContacts(): Promise<Contact[]> {
    return await this.storage.getAllContacts();
  }

  async createContact(contact: InsertContact): Promise<Contact> {
    return await this.storage.createContact(contact);
  }

  async updateContactStatus(id: string, status: string): Promise<Contact> {
    return await this.storage.updateContactStatus(id, status);
  }
}