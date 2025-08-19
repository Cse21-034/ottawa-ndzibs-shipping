import { Request, Response } from "express";
import { BaseController } from "./BaseController";
import { IContentService } from "../services/IContentService";

export class ContentController extends BaseController {
  constructor(private contentService: IContentService) {
    super();
  }

  getAllContent = async (req: Request, res: Response) => {
    try {
      const content = await this.contentService.getAllContent();
      return this.success(res, content);
    } catch (error) {
      return this.handleError(res, error, "Failed to fetch content");
    }
  };

  updateContent = async (req: Request, res: Response) => {
    try {
      const { key } = req.params;
      const { value } = req.body;
      
      if (!value) {
        return res.status(400).json({ message: "Value is required" });
      }

      const updatedContent = await this.contentService.updateContent(key, value);
      return this.success(res, updatedContent);
    } catch (error) {
      return this.handleError(res, error, "Failed to update content");
    }
  };
}