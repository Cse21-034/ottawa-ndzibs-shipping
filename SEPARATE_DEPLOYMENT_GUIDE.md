# Complete Separation Deployment Guide

The project has been completely separated into two independent directories that can be deployed separately.

## Directory Structure

```
project/
├── backend/          # Complete backend API (for Render)
│   ├── package.json  # Backend dependencies only
│   ├── index.ts      # API-only server (no frontend)
│   ├── render.yaml   # Render deployment config
│   └── ...           # All backend files
└── frontend/         # Complete frontend app (for Vercel)
    ├── package.json  # Frontend dependencies only
    ├── vercel.json   # Vercel deployment config
    └── ...           # All frontend files
```

## Backend Deployment (Render)

### 1. Deploy Backend Directory Only

1. **Push backend/ folder** to a separate GitHub repository or use subdirectory deployment
2. **Render Configuration**: Uses `backend/render.yaml`
3. **Root directory**: `backend/` (if using monorepo) or `/` (if separate repo)

### 2. Environment Variables for Render

```bash
NODE_ENV=production
DATABASE_URL=postgresql://...
SESSION_SECRET=random_32_char_string
FRONTEND_URL=https://your-vercel-app.vercel.app
```

### 3. Build Process

- **Build command**: `npm install && npm run build`
- **Start command**: `npm start`
- **Output**: `dist/index.js` (single bundled file)

## Frontend Deployment (Vercel)

### 1. Deploy Frontend Directory Only

1. **Push frontend/ folder** to GitHub repository
2. **Vercel Configuration**: Uses `frontend/vercel.json`
3. **Root directory**: `frontend/` (if using monorepo) or `/` (if separate repo)

### 2. Environment Variables for Vercel

```bash
VITE_API_URL=https://your-render-api.onrender.com
```

### 3. Build Process

- **Build command**: `vite build`
- **Output directory**: `dist`
- **Framework**: Vite (detected automatically)

## Complete Independence

### Backend (`backend/` directory)
- ✅ Own `package.json` with backend dependencies only
- ✅ Own `tsconfig.json` optimized for Node.js
- ✅ Own `render.yaml` for deployment
- ✅ No frontend dependencies or code
- ✅ API-only server (no static file serving)
- ✅ CORS configured for frontend domain

### Frontend (`frontend/` directory)
- ✅ Own `package.json` with frontend dependencies only
- ✅ Own `tsconfig.json` optimized for React/Vite
- ✅ Own `vercel.json` for deployment
- ✅ No backend dependencies or code
- ✅ Environment variable for API URL
- ✅ Static site ready for CDN deployment

## Deployment Commands

### For Backend (Render)
```bash
cd backend
npm install
npm run build  # Creates dist/index.js
npm start      # Runs the API server
```

### For Frontend (Vercel)
```bash
cd frontend
npm install
npm run build  # Creates dist/ with static files
```

## Development

### Backend Development
```bash
cd backend
npm install
npm run dev    # Runs API server on localhost:5000
```

### Frontend Development
```bash
cd frontend
npm install
npm run dev    # Runs Vite dev server on localhost:5173
# Set VITE_API_URL=http://localhost:5000 for local backend
```

## Benefits of Complete Separation

1. **Independent Scaling**: Scale frontend and backend separately
2. **Technology Freedom**: Use different hosting optimizations
3. **Team Workflow**: Frontend and backend teams can deploy independently
4. **Cost Optimization**: Different pricing tiers for different needs
5. **Performance**: Frontend on CDN, backend on compute instances
6. **Security**: API-only backend reduces attack surface

## Migration from Current Structure

The old monorepo structure has been split into:
- `server/` → `backend/`
- `client/` → `frontend/`
- Shared schema copied to `backend/schema.ts`
- All imports and dependencies properly separated

This setup allows you to deploy `backend/` to Render and `frontend/` to Vercel as completely independent applications.