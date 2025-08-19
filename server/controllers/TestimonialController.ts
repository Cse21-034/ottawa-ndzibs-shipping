import { Request, Response } from "express";
import { BaseController } from "./BaseController";
import { ITestimonialService } from "../services/ITestimonialService";
import { insertTestimonialSchema } from "@shared/schema";

export class TestimonialController extends BaseController {
  constructor(private testimonialService: ITestimonialService) {
    super();
  }

  getActiveTestimonials = async (req: Request, res: Response) => {
    try {
      const testimonials = await this.testimonialService.getActiveTestimonials();
      return this.success(res, testimonials);
    } catch (error) {
      return this.handleError(res, error, "Failed to fetch testimonials");
    }
  };

  getAllTestimonials = async (req: Request, res: Response) => {
    try {
      const testimonials = await this.testimonialService.getAllTestimonials();
      return this.success(res, testimonials);
    } catch (error) {
      return this.handleError(res, error, "Failed to fetch testimonials");
    }
  };

  createTestimonial = async (req: Request, res: Response) => {
    try {
      const validatedData = insertTestimonialSchema.parse(req.body);
      const testimonial = await this.testimonialService.createTestimonial(validatedData);
      return this.created(res, testimonial);
    } catch (error) {
      return this.handleError(res, error, "Failed to create testimonial");
    }
  };

  updateTestimonial = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const testimonial = await this.testimonialService.updateTestimonial(id, req.body);
      return this.success(res, testimonial);
    } catch (error) {
      return this.handleError(res, error, "Testimonial not found");
    }
  };

  deleteTestimonial = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const deleted = await this.testimonialService.deleteTestimonial(id);
      if (deleted) {
        return this.success(res, { message: "Testimonial deleted" });
      } else {
        return res.status(404).json({ message: "Testimonial not found" });
      }
    } catch (error) {
      return this.handleError(res, error, "Failed to delete testimonial");
    }
  };
}