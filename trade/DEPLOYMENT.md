# Fox Trading Platform - Vercel Deployment Guide

## 🚀 Pre-deployment Checklist

### 1. Database Setup
You'll need a PostgreSQL database accessible from the internet. Options:
- **Neon** (Recommended): https://neon.tech - Free tier with excellent Vercel integration
- **Supabase**: https://supabase.com - Free tier with good features
- **PlanetScale**: https://planetscale.com - MySQL alternative
- **Railway**: https://railway.app - PostgreSQL with generous free tier

### 2. Google OAuth Setup
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add your production domain to authorized origins:
   - `https://your-app.vercel.app`
6. Add callback URL:
   - `https://your-app.vercel.app/api/auth/google/callback`

### 3. Environment Variables
Copy the values from your local `.env` file and update them for production.

## 📦 Deployment Steps

### Step 1: Prepare Repository
```bash
# Make sure all changes are committed
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

### Step 2: Deploy to Vercel

#### Option A: Using Vercel CLI (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel
```

#### Option B: Using Vercel Dashboard
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Vercel will automatically detect the configuration

### Step 3: Configure Environment Variables
In Vercel dashboard, go to your project settings → Environment Variables and add:

```
DATABASE_URL=postgresql://username:password@host:5432/database_name
JWT_SECRET=your-super-secure-jwt-secret-here
NODE_ENV=production
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
COINMARKETCAP_API_KEY=24f175cd-8ca4-463c-8941-1eb8eafe19ba
FRONTEND_URL=https://your-app.vercel.app
```

### Step 4: Database Migration
Run your Prisma migrations on the production database:

```bash
# Using Vercel CLI
vercel env pull .env.production
cd api
npx prisma migrate deploy --schema=prisma/schema.prisma
npx prisma generate
```

### Step 5: Test Deployment
1. Visit your deployed URL
2. Test user registration
3. Test Google OAuth login
4. Test crypto price fetching
5. Test all main features

## 🔧 Troubleshooting

### Common Issues:

1. **Database Connection Errors**
   - Ensure DATABASE_URL is correct
   - Check if database allows external connections
   - Verify database exists and is accessible

2. **Google OAuth Errors**
   - Verify callback URLs in Google Console
   - Check GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET
   - Ensure production domain is authorized

3. **API Errors**
   - Check Vercel function logs
   - Verify all environment variables are set
   - Check if external APIs (CoinMarketCap) are accessible

4. **Build Errors**
   - Check build logs in Vercel dashboard
   - Ensure all dependencies are in package.json
   - Verify Node.js version compatibility

### Debugging Commands:
```bash
# View deployment logs
vercel logs

# View environment variables
vercel env ls

# Run build locally
vercel build

# Test functions locally
vercel dev
```

## 🌟 Post-Deployment

1. **Set up custom domain** (optional)
2. **Configure monitoring** - Use Vercel Analytics
3. **Set up backup strategy** for database
4. **Monitor performance** and optimize as needed
5. **Set up error tracking** (e.g., Sentry)

## 📱 Environment URLs

- **Development**: http://localhost:8080
- **Production**: https://your-app.vercel.app

## 🔒 Security Notes

- All environment variables are encrypted in Vercel
- Database credentials are secure
- JWT secrets should be cryptographically random
- HTTPS is enforced in production
- CORS is properly configured for your domain

## 📊 Performance Optimizations

The deployment includes:
- ✅ Static asset optimization
- ✅ Image optimization (via Vercel)
- ✅ Serverless functions for API
- ✅ Edge caching for static content
- ✅ Gzip compression
- ✅ Tree shaking for minimal bundle size

Your Fox Trading Platform is now ready for production! 🦊