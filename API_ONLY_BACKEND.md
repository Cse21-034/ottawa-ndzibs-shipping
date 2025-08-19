# API-Only Backend Configuration

The backend has been configured as an **API-only service** for complete separation from the frontend.

## What Changed

### 1. Removed Frontend Serving in Production
- Production builds no longer include frontend assets
- Backend only serves `/api/*` routes in production
- Development mode still serves frontend for local development

### 2. Added CORS Configuration
- Added `cors` middleware for cross-origin requests
- Configured to allow requests from Vercel frontend
- Environment variable `FRONTEND_URL` controls allowed origins

### 3. Updated Build Configuration
- `render.yaml`: Simplified to API-only deployment
- `vercel.json`: Configured for frontend-only deployment
- Removed unnecessary build steps

## Environment Variables

### Backend (Render)
```bash
NODE_ENV=production
DATABASE_URL=postgresql://...
SESSION_SECRET=your_secret_key
FRONTEND_URL=https://your-vercel-app.vercel.app
```

### Frontend (Vercel)
```bash
VITE_API_URL=https://your-render-api.onrender.com
```

## API Endpoints Available

All endpoints are prefixed with `/api`:

- **Content**: `GET /api/content`, `PUT /api/content/:key`
- **Services**: `GET /api/services`, `GET /api/admin/services`, etc.
- **Pricing**: `GET /api/pricing`, `GET /api/admin/pricing`, etc.
- **Testimonials**: `GET /api/testimonials`, `GET /api/admin/testimonials`, etc.
- **Contacts**: `POST /api/contact`, `GET /api/admin/contacts`, etc.

## Development vs Production

### Development Mode (NODE_ENV=development)
- Serves both API and frontend
- Frontend available at `http://localhost:5000`
- API available at `http://localhost:5000/api/*`

### Production Mode (NODE_ENV=production)
- **Backend (Render)**: Only serves API routes
- **Frontend (Vercel)**: Served separately with CDN optimization
- Cross-origin requests handled by CORS middleware

## Benefits

1. **Scalability**: Frontend and backend can scale independently
2. **Performance**: Frontend served via Vercel's global CDN
3. **Deployment**: Separate deployment pipelines reduce complexity
4. **Cost**: Different hosting tiers for different needs
5. **Security**: API-only backend reduces attack surface

## Testing

Test API endpoints:
```bash
# Health check
curl https://your-render-app.onrender.com/api/services

# With CORS headers
curl -H "Origin: https://your-vercel-app.vercel.app" \
     https://your-render-app.onrender.com/api/services
```

This configuration follows modern microservices patterns with clear separation of concerns.