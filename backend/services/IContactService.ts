import { Contact, InsertContact } from "@shared/schema";

export interface IContactService {
  getAllContacts(): Promise<Contact[]>;
  createContact(contact: InsertContact): Promise<Contact>;
  updateContactStatus(id: string, status: string): Promise<Contact>;
}