import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync, readFileSync } from 'fs';

// Get the directory of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Check .env file path
const envPath = join(__dirname, '.env');
console.log('Looking for .env at:', envPath);
console.log('.env file exists:', existsSync(envPath));

if (existsSync(envPath)) {
    console.log('.env file contents:');
    console.log(readFileSync(envPath, 'utf8'));
}

// Load .env
dotenv.config({ path: envPath });

// Check environment variables
console.log('\nEnvironment variables:');
console.log('JWT_SECRET:', process.env.JWT_SECRET ? 'SET' : 'NOT SET');
console.log('DATABASE_URL:', process.env.DATABASE_URL ? 'SET' : 'NOT SET');
console.log('PORT:', process.env.PORT ? 'SET' : 'NOT SET');
