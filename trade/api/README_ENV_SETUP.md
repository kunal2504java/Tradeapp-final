# Environment Variables Setup

## Local Development Setup

1. **Copy the template file:**
   ```bash
   cp .env.example .env
   ```

2. **Fill in your actual values in `.env`:**

   ### Database Configuration
   ```env
   DATABASE_URL="postgresql://postgres:12345678@localhost:5432/fox_trading"
   ```

   ### Authentication
   ```env
   JWT_SECRET="your-super-secure-jwt-secret-here"
   ```

   ### Google OAuth Setup
   1. Go to [Google Cloud Console](https://console.cloud.google.com/)
   2. Create a new project or select existing one
   3. Enable Google+ API
   4. Create OAuth 2.0 credentials
   5. Add your values:
   ```env
   GOOGLE_CLIENT_ID="your-google-client-id-here"
   GOOGLE_CLIENT_SECRET="your-google-client-secret-here"
   ```

   ### CoinMarketCap API
   1. Sign up at [CoinMarketCap API](https://coinmarketcap.com/api/)
   2. Get your free API key
   3. Add your value:
   ```env
   COINMARKETCAP_API_KEY="your-coinmarketcap-api-key-here"
   ```

## Production Deployment (Render)

For production deployment, set these environment variables in your Render dashboard:

```env
NODE_ENV=production
PORT=10000
DATABASE_URL=[your-render-database-url]
JWT_SECRET=your-super-secure-jwt-secret-here
GOOGLE_CLIENT_ID=your-google-client-id-here
GOOGLE_CLIENT_SECRET=your-google-client-secret-here
COINMARKETCAP_API_KEY=your-coinmarketcap-api-key-here
FRONTEND_URL=https://your-frontend-app.onrender.com
```

## Security Notes

- ✅ `.env` files are already in `.gitignore`
- ✅ Never commit actual secrets to version control
- ✅ Use different secrets for development and production
- ✅ Rotate secrets regularly
- ✅ Use environment variables in production

## Testing Your Setup

After setting up your environment variables, test that they're working:

```bash
# Start the development server
npm run dev

# Check if environment variables are loaded
curl http://localhost:4000/api/health
```