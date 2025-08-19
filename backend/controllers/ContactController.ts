import { Request, Response } from "express";
import { BaseController } from "./BaseController";
import { IContactService } from "../services/IContactService";
import { insertContactSchema } from "../schema";

export class ContactController extends BaseController {
  constructor(private contactService: IContactService) {
    super();
  }

  createContact = async (req: Request, res: Response) => {
    try {
      const validatedData = insertContactSchema.parse(req.body);
      const contact = await this.contactService.createContact(validatedData);
      return this.created(res, contact);
    } catch (error) {
      return this.handleError(res, error, "Failed to create contact");
    }
  };

  getAllContacts = async (req: Request, res: Response) => {
    try {
      const contacts = await this.contactService.getAllContacts();
      return this.success(res, contacts);
    } catch (error) {
      return this.handleError(res, error, "Failed to fetch contacts");
    }
  };

  updateContactStatus = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      
      if (!status) {
        return res.status(400).json({ message: "Status is required" });
      }

      const contact = await this.contactService.updateContactStatus(id, status);
      return this.success(res, contact);
    } catch (error) {
      return this.handleError(res, error, "Contact not found");
    }
  };
}
