import { IStorage } from "../repositories/IStorage";
import { IContentService } from "./IContentService";
import { Content } from "@shared/schema";

export class ContentService implements IContentService {
  constructor(private storage: IStorage) {}

  async getAllContent(): Promise<Content[]> {
    return await this.storage.getAllContent();
  }

  async getContentByKey(key: string): Promise<Content | undefined> {
    return await this.storage.getContentByKey(key);
  }

  async updateContent(key: string, value: string): Promise<Content> {
    return await this.storage.updateContent(key, value);
  }
}