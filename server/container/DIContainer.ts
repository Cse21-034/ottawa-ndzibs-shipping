import { IStorage } from "../repositories/IStorage";
import { MemStorage } from "../storage";

// Services
import { IContentService } from "../services/IContentService";
import { ContentService } from "../services/ContentService";
import { IServiceService } from "../services/IServiceService";
import { ServiceService } from "../services/ServiceService";
import { IPricingService } from "../services/IPricingService";
import { PricingService } from "../services/PricingService";
import { ITestimonialService } from "../services/ITestimonialService";
import { TestimonialService } from "../services/TestimonialService";
import { IContactService } from "../services/IContactService";
import { ContactService } from "../services/ContactService";

// Controllers
import { ContentController } from "../controllers/ContentController";
import { ServiceController } from "../controllers/ServiceController";
import { PricingController } from "../controllers/PricingController";
import { TestimonialController } from "../controllers/TestimonialController";
import { ContactController } from "../controllers/ContactController";

export class DIContainer {
  private static instance: DIContainer;
  private storage: IStorage;
  
  // Services
  private contentService: IContentService;
  private serviceService: IServiceService;
  private pricingService: IPricingService;
  private testimonialService: ITestimonialService;
  private contactService: IContactService;
  
  // Controllers
  private contentController: ContentController;
  private serviceController: ServiceController;
  private pricingController: PricingController;
  private testimonialController: TestimonialController;
  private contactController: ContactController;

  private constructor() {
    // Initialize storage
    this.storage = new MemStorage();
    
    // Initialize services
    this.contentService = new ContentService(this.storage);
    this.serviceService = new ServiceService(this.storage);
    this.pricingService = new PricingService(this.storage);
    this.testimonialService = new TestimonialService(this.storage);
    this.contactService = new ContactService(this.storage);
    
    // Initialize controllers
    this.contentController = new ContentController(this.contentService);
    this.serviceController = new ServiceController(this.serviceService);
    this.pricingController = new PricingController(this.pricingService);
    this.testimonialController = new TestimonialController(this.testimonialService);
    this.contactController = new ContactController(this.contactService);
  }

  static getInstance(): DIContainer {
    if (!DIContainer.instance) {
      DIContainer.instance = new DIContainer();
    }
    return DIContainer.instance;
  }

  getContentController(): ContentController {
    return this.contentController;
  }

  getServiceController(): ServiceController {
    return this.serviceController;
  }

  getPricingController(): PricingController {
    return this.pricingController;
  }

  getTestimonialController(): TestimonialController {
    return this.testimonialController;
  }

  getContactController(): ContactController {
    return this.contactController;
  }
}