# Quick Deployment Setup

## 1. Environment Variables Setup

### Backend (Render)
```bash
NODE_ENV=production
DATABASE_URL=your_neon_connection_string
SESSION_SECRET=generate_random_32_char_string
FRONTEND_URL=https://your-vercel-app.vercel.app
```

### Frontend (Vercel)
```bash
VITE_API_URL=https://your-render-service.onrender.com
```

## 2. Database Schema Initialization

After backend deployment, run:
```bash
npm run db:push
```

## 3. Verification Checklist

- [ ] Backend deployed and accessible
- [ ] Frontend deployed and accessible
- [ ] Database connected and schema created
- [ ] API endpoints responding
- [ ] Frontend can connect to backend
- [ ] Admin panel accessible
- [ ] Contact form working

## 4. Post-Deployment Testing

1. Visit frontend URL
2. Check API status: `GET /api/services`
3. Test contact form submission
4. Access admin panel: `/admin`
5. Verify data persistence

## 5. Monitoring Setup

- Render: Monitor logs and performance
- Vercel: Check build and function logs
- Neon: Monitor database connections

## Generate Session Secret

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```