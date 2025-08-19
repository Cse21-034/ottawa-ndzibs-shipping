import { Content, InsertContent } from "@shared/schema";

export interface IContentService {
  getAllContent(): Promise<Content[]>;
  getContentByKey(key: string): Promise<Content | undefined>;
  updateContent(key: string, value: string): Promise<Content>;
}