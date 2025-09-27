# 🚀 Fox Trading Platform - Render Deployment Guide

## Why Render is Perfect for Your App

✅ **Traditional Express.js server** (not serverless)
✅ **Persistent database connections**
✅ **Background jobs** (commission scheduler)
✅ **Real-time features** (crypto prices)
✅ **Free PostgreSQL database**
✅ **Simple deployment process**

## 📋 Pre-Deployment Setup

### 1. Environment Variables Setup
⚠️ **IMPORTANT**: Before deploying, make sure you have your actual API keys and secrets ready.

1. **Google OAuth Credentials**:
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create OAuth 2.0 credentials
   - Note down your Client ID and Client Secret

2. **CoinMarketCap API Key**:
   - Sign up at [CoinMarketCap API](https://coinmarketcap.com/api/)
   - Get your free API key

3. **JWT Secret**:
   - Generate a secure random string for production

### 2. Create Render Account
1. Go to [render.com](https://render.com)
2. Sign up with GitHub
3. Connect your repository

### 3. Update Your Repository
```bash
# Commit all changes
git add .
git commit -m "Prepare for Render deployment"
git push origin main
```

## 🚀 Deployment Steps

### Step 1: Create PostgreSQL Database
1. In Render dashboard, click **"New +"**
2. Select **"PostgreSQL"**
3. Name: `fox-trading-db`
4. Plan: **Free**
5. Click **"Create Database"**
6. **Copy the Internal Database URL** (you'll need this)

### Step 2: Deploy Backend API
1. Click **"New +"** → **"Web Service"**
2. Connect your GitHub repository
3. Configure:
   - **Name**: `fox-trading-api`
   - **Runtime**: Node
   - **Build Command**: `cd api && npm install && npx prisma generate`
   - **Start Command**: `cd api && npm start`
   - **Plan**: Free

4. **Environment Variables** (click Advanced):
   ⚠️ **Replace ALL placeholder values with your actual secrets!**
   ```
   NODE_ENV=production
   PORT=10000
   DATABASE_URL=[paste your database URL here]
   JWT_SECRET=[your-actual-jwt-secret]
   GOOGLE_CLIENT_ID=[your-actual-google-client-id]
   GOOGLE_CLIENT_SECRET=[your-actual-google-client-secret]
   COINMARKETCAP_API_KEY=[your-actual-coinmarketcap-api-key]
   FRONTEND_URL=https://fox-trading-frontend.onrender.com
   ```

5. Click **"Create Web Service"**

### Step 3: Run Database Migration
Once your API is deployed:
1. Go to your API service dashboard
2. Click **"Shell"** tab
3. Run migration commands:
   ```bash
   cd api
   npx prisma migrate deploy
   npx prisma db seed
   ```

### Step 4: Deploy Frontend
1. Click **"New +"** → **"Static Site"**
2. Connect your repository
3. Configure:
   - **Name**: `fox-trading-frontend`
   - **Build Command**: `cd frontend && npm install && npm run build`
   - **Publish Directory**: `frontend/dist`

4. Click **"Create Static Site"**

### Step 5: Update Google OAuth
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project → APIs & Services → Credentials
3. Edit your OAuth 2.0 Client IDs
4. Add to **Authorized origins**:
   - `https://fox-trading-api.onrender.com`
   - `https://fox-trading-frontend.onrender.com`
5. Add to **Authorized redirect URIs**:
   - `https://fox-trading-api.onrender.com/api/auth/google/callback`

## 🎯 Your Deployed URLs

- **Frontend**: `https://fox-trading-frontend.onrender.com`
- **Backend API**: `https://fox-trading-api.onrender.com`
- **Database**: Internal Render PostgreSQL

## ✅ Testing Your Deployment

1. **Health Check**: Visit `https://fox-trading-api.onrender.com/api/health`
2. **Frontend**: Visit `https://fox-trading-frontend.onrender.com`
3. **User Registration**: Test creating an account
4. **Google OAuth**: Test Google login
5. **Crypto Prices**: Check if real-time prices load
6. **Dashboard**: Test all dashboard features

## 🔧 Troubleshooting

### Common Issues:

1. **Build Fails**
   ```bash
   # Check build logs in Render dashboard
   # Ensure all dependencies are in package.json files
   ```

2. **Database Connection Error**
   ```bash
   # Verify DATABASE_URL is correct
   # Check if migration ran successfully
   ```

3. **CORS Errors**
   ```bash
   # Verify frontend URL in CORS configuration
   # Check FRONTEND_URL environment variable
   ```

4. **Google OAuth Errors**
   ```bash
   # Verify callback URLs in Google Console
   # Check if domains are authorized
   ```

## 📊 Render Free Tier Limits

- **Web Services**: 750 hours/month (sleeps after 15 min inactivity)
- **PostgreSQL**: 1GB storage, 100 connections
- **Build Minutes**: 500/month
- **Bandwidth**: 100GB/month

## 🔄 Auto-Deploy Setup

1. Go to your service settings
2. Enable **"Auto-Deploy"**
3. Choose branch: `main`
4. Now every push to main will auto-deploy!

## 🌟 Production Optimizations

Your deployment includes:
- ✅ **Persistent server** (perfect for your scheduled jobs)
- ✅ **Database connection pooling**
- ✅ **Environment-based configuration**
- ✅ **Health check endpoints**
- ✅ **Proper CORS setup**
- ✅ **Production error handling**

## 💡 Next Steps

1. **Custom Domain**: Add your own domain in Render settings
2. **SSL Certificate**: Automatically provided by Render
3. **Monitoring**: Use Render's built-in metrics
4. **Scaling**: Upgrade to paid plans for better performance
5. **Backups**: Set up database backups

## 🎉 You're Live!

Your Fox Trading Platform is now running on Render with:
- ⚡ **Real-time crypto prices**
- 🔐 **Secure authentication**
- 💰 **Commission calculations**
- 📊 **Live dashboard**
- 🌐 **Production-ready architecture**

Visit your live app: `https://fox-trading-frontend.onrender.com` 🦊