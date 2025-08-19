# Overview

This is a professional business website for Ottawa Ndzibs Shipping, a logistics and freight forwarding company that specializes in shipping goods from China to Botswana via sea and air freight. The application is built as a full-stack web application with a React frontend and Express.js backend, featuring both a public-facing website and an admin dashboard for content management.

The website showcases the company's services, pricing, testimonials, and contact information while providing functionality for customers to inquire about services and for administrators to manage content dynamically.

## Recent Updates (August 19, 2025)

✅ Implemented full MVC architecture with SOLID principles
✅ Created separate frontend and backend with individual package.json files
✅ Built dependency injection container for clean code organization
✅ Separated concerns with dedicated controllers, services, and repositories
✅ Optimized deployment configurations for Vercel (frontend) and Render (backend)
✅ Fixed all TypeScript type issues across the application
✅ **Migration Completed**: Successfully migrated from Replit Agent to unified Replit environment
✅ Consolidated project structure - removed duplicate frontend/backend folders
✅ Verified all components working properly in unified architecture
✅ Application running successfully on port 5000
✅ Created comprehensive deployment documentation (DEPLOYMENT.md)
✅ **Migration Completed**: Successfully migrated from Replit Agent to unified Replit environment
✅ Consolidated project structure - removed duplicate frontend/backend folders
✅ Verified all components working properly in unified architecture
✅ Application running successfully on port 5000

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture

The frontend is built using React with TypeScript and follows a component-based architecture:

- **Framework**: React 18 with TypeScript for type safety
- **Routing**: Wouter for lightweight client-side routing
- **Styling**: Tailwind CSS with CSS variables for theming and shadcn/ui components for consistent UI elements
- **State Management**: TanStack Query (React Query) for server state management and data fetching
- **Form Handling**: React Hook Form with Zod for validation
- **Build Tool**: Vite for fast development and optimized production builds

The frontend follows a modular structure with reusable components, custom hooks, and utility functions. It includes both public pages (home) and protected admin areas for content management.

## Backend Architecture

The backend follows MVC (Model-View-Controller) architecture with SOLID principles:

- **Framework**: Express.js with TypeScript
- **Architecture Pattern**: MVC with dependency injection container
- **Controllers**: Handle HTTP requests and responses, validate input data
- **Services**: Contain business logic and orchestrate data operations
- **Repositories**: Abstract data access layer with interface segregation
- **Database Layer**: Drizzle ORM with PostgreSQL for type-safe database operations
- **Data Storage**: Abstracted storage interface allowing for different implementations (currently using in-memory storage with database schema defined)
- **API Design**: RESTful endpoints for CRUD operations on content, services, pricing, testimonials, and contacts
- **Middleware**: Express middleware for JSON parsing, URL encoding, and request logging
- **Dependency Injection**: Centralized container managing service instantiation and dependencies

The backend uses clean architecture with separated concerns following SOLID principles:
- **S**ingle Responsibility: Each class has one reason to change
- **O**pen/Closed: Open for extension, closed for modification
- **L**iskov Substitution: Services can be substituted through interfaces
- **I**nterface Segregation: Specific interfaces for different concerns
- **D**ependency Inversion: High-level modules don't depend on low-level modules

## Database Design

The application uses PostgreSQL with Drizzle ORM, featuring these main entities:

- **Users**: Admin authentication and role management
- **Content**: Dynamic content management for website text
- **Services**: Sea and air freight service offerings
- **Pricing**: Flexible pricing structure with categories and rates
- **Testimonials**: Customer feedback and reviews
- **Contacts**: Customer inquiry management

All tables include proper relationships, constraints, and indexes for optimal performance.

## Development Tools

- **Type Safety**: Full TypeScript coverage across frontend and backend
- **Code Quality**: ESLint and Prettier for consistent code formatting
- **Development Experience**: Hot reload with Vite, TypeScript checking, and runtime error overlays
- **Database Management**: Drizzle Kit for schema migrations and database operations

# External Dependencies

## Core Technologies

- **Database**: PostgreSQL with Neon serverless hosting (@neondatabase/serverless)
- **ORM**: Drizzle ORM for type-safe database operations
- **Validation**: Zod for runtime type validation and schema definition

## UI/UX Libraries

- **Component Library**: Radix UI primitives for accessible, unstyled components
- **Styling**: Tailwind CSS for utility-first styling
- **Icons**: Lucide React for consistent iconography
- **Animations**: CSS-based animations and transitions

## Development Dependencies

- **Build Tools**: Vite for fast development and production builds
- **Development Plugins**: Replit-specific plugins for enhanced development experience
- **Font Loading**: Google Fonts integration for typography

## Session Management

- **Session Storage**: connect-pg-simple for PostgreSQL-based session storage
- **Session Security**: Secure session handling with proper configuration

The application is designed to be production-ready with proper error handling, loading states, and responsive design across all device sizes.