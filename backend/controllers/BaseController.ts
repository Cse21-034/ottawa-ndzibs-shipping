import { Request, Response } from "express";
import { ZodError } from "zod";

export abstract class BaseController {
  protected handleError(res: Response, error: unknown, message = "An error occurred") {
    console.error(error);
    
    if (error instanceof ZodError) {
      return res.status(400).json({ 
        message: "Validation error", 
        errors: error.errors 
      });
    }
    
    if (error instanceof Error) {
      return res.status(500).json({ 
        message: error.message 
      });
    }
    
    return res.status(500).json({ message });
  }

  protected success(res: Response, data: any, statusCode = 200) {
    return res.status(statusCode).json(data);
  }

  protected created(res: Response, data: any) {
    return res.status(201).json(data);
  }

  protected noContent(res: Response) {
    return res.status(204).send();
  }
}