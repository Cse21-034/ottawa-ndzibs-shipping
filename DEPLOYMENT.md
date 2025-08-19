# Deployment Guide for Ottawa Ndzibs Shipping

This guide covers deploying the Ottawa Ndzibs Shipping application using Vercel for the frontend and Render for the backend.

## Architecture Overview

The application uses a split deployment strategy:
- **Frontend (React)**: Deployed to Vercel for optimal performance and CDN delivery
- **Backend (Express.js)**: Deployed to Render for reliable API hosting
- **Database**: PostgreSQL (Neon serverless recommended for production)

## Prerequisites

1. **Database Setup**: Create a PostgreSQL database (recommended: Neon serverless)
2. **GitHub Repository**: Code should be pushed to a GitHub repository
3. **Accounts**: Vercel and Render accounts

## Backend Deployment (Render)

### 1. Prepare Backend for Deployment

The backend is already configured for deployment with the `render.yaml` file.

### 2. Environment Variables

Set these environment variables in Render:

```
NODE_ENV=production
DATABASE_URL=your_postgresql_connection_string
SESSION_SECRET=your_secure_session_secret
```

### 3. Deploy to Render

1. **Connect Repository**: 
   - Log into [Render Dashboard](https://dashboard.render.com)
   - Click "New +" → "Web Service"
   - Connect your GitHub repository

2. **Configure Service**:
   - **Name**: `ottawa-ndzibs-api`
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: Free tier (or paid for production)

3. **Set Environment Variables**:
   - Add the environment variables listed above
   - Ensure `DATABASE_URL` points to your PostgreSQL instance

4. **Deploy**: Click "Create Web Service"

### 4. Database Migration

After deployment, run database migrations:
- In Render dashboard, go to your service
- Open the "Shell" tab
- Run: `npm run db:push`

## Frontend Deployment (Vercel)

### 1. Prepare Frontend Configuration

Create a `vercel.json` file in the project root (already exists):

```json
{
  "functions": {
    "client/src/main.tsx": {
      "excludeFiles": ["server/**"]
    }
  },
  "builds": [
    {
      "src": "client/src/main.tsx",
      "use": "@vercel/static-build",
      "config": {
        "buildCommand": "npm run build",
        "distDir": "dist/public"
      }
    }
  ],
  "routes": [
    {
      "handle": "filesystem"
    },
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

### 2. Environment Variables

Set these environment variables in Vercel:

```
VITE_API_URL=https://your-render-app.onrender.com
```

### 3. Deploy to Vercel

1. **Connect Repository**:
   - Log into [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your GitHub repository

2. **Configure Project**:
   - **Framework Preset**: Vite
   - **Root Directory**: `./` (project root)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist/public`

3. **Set Environment Variables**:
   - In project settings, add environment variables
   - Set `VITE_API_URL` to your Render backend URL

4. **Deploy**: Click "Deploy"

## Database Setup (Neon)

### 1. Create Database

1. Sign up at [Neon](https://neon.tech)
2. Create a new project
3. Copy the connection string

### 2. Configure Connection

The connection string format:
```
postgres://username:password@host/database?sslmode=require
```

### 3. Initialize Schema

Run the database migration:
```bash
npm run db:push
```

## Post-Deployment Configuration

### 1. Update API Endpoints

In your frontend, ensure API calls point to your Render backend:

```typescript
// In client/src/lib/queryClient.ts
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
```

### 2. CORS Configuration

The backend already includes CORS configuration in `server/index.ts`. Verify it allows your Vercel domain.

### 3. Session Configuration

Update session configuration for production in the backend:

```typescript
// In your session middleware
{
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}
```

## Monitoring and Maintenance

### Backend (Render)
- Monitor logs in Render dashboard
- Set up health checks
- Configure auto-deploy on Git push

### Frontend (Vercel)
- Monitor build logs in Vercel dashboard
- Review performance metrics
- Set up preview deployments for branches

### Database (Neon)
- Monitor database metrics
- Set up connection pooling if needed
- Regular backups (automatic with Neon)

## Troubleshooting

### Common Issues

1. **CORS Errors**: Verify backend CORS configuration includes frontend domain
2. **API Connection**: Check `VITE_API_URL` environment variable
3. **Database Connection**: Verify `DATABASE_URL` and run migrations
4. **Session Issues**: Ensure `SESSION_SECRET` is set in backend

### Environment Variables Checklist

**Backend (Render)**:
- [ ] `NODE_ENV=production`
- [ ] `DATABASE_URL=postgresql://...`
- [ ] `SESSION_SECRET=secure_random_string`

**Frontend (Vercel)**:
- [ ] `VITE_API_URL=https://your-backend.onrender.com`

## Security Considerations

1. **Environment Variables**: Never commit secrets to version control
2. **HTTPS**: Both Render and Vercel provide HTTPS by default
3. **Database**: Use connection pooling and SSL connections
4. **Sessions**: Secure session configuration with proper expiration
5. **CORS**: Restrict to specific domains in production

## Performance Optimization

1. **Frontend**: Vercel provides automatic CDN and optimizations
2. **Backend**: Consider upgrading Render plan for better performance
3. **Database**: Monitor query performance and add indexes as needed
4. **Caching**: Implement appropriate caching strategies

This deployment strategy ensures reliable, scalable hosting for the Ottawa Ndzibs Shipping application with separation of concerns between frontend and backend services.