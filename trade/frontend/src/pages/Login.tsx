import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

const GoogleIcon = () => (
  <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
    <path fill="currentColor" d="M488 261.8C488 403.3 381.5 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 126 21.2 174 55.8L373.5 119.8C340.6 89.4 297.4 70.4 248 70.4c-99.4 0-180.2 80.6-180.2 180.2s80.8 180.2 180.2 180.2c102.3 0 170.2-73.4 175.4-123.3H248v-69.6h239.2c1.2 12.8 2.8 25.8 2.8 39.4z"></path>
  </svg>
);

export default function LoginPage() {
  const { login, loginGuest } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await login(email, password);
      navigate('/app');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to login');
    } finally {
      setLoading(false);
    }
  }

  async function onGuest() {
    setLoading(true);
    setError(null);
    try {
      await loginGuest();
      navigate('/app');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Guest login failed');
    } finally {
      setLoading(false);
    }
  }

  // ✅ HANDLER FOR GOOGLE SIGN-IN
  function handleGoogleSignIn() {
    // Redirect to the backend endpoint to start the Google OAuth flow
    const isDevelopment = window.location.hostname === 'localhost';
    const baseUrl = isDevelopment ? 'http://localhost:4000' : window.location.origin;
    window.location.href = `${baseUrl}/api/auth/google`;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
      <Card className="w-full max-w-md shadow-card">
        <CardHeader>
          <CardTitle className="text-2xl text-gold">Welcome back</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="block mb-2">Email</label>
              <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" type="email" required />
            </div>
            <div>
              <label className="block mb-2">Password</label>
              <Input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" type="password" required />
            </div>
            {error && <p className="text-destructive text-sm">{error}</p>}
            <button 
              type="submit"
              className="w-full h-10 px-4 py-2 bg-accent text-black font-medium rounded-md hover:shadow-gold-glow hover:bg-accent/90 disabled:opacity-50 disabled:pointer-events-none transition-colors" 
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>

          {/* ✅ GOOGLE SIGN-IN BUTTON */}
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          <Button variant="outline" className="w-full" onClick={handleGoogleSignIn} disabled={loading}>
            <GoogleIcon />
            Sign in with Google
          </Button>
          
          <div className="mt-4 grid grid-cols-2 gap-2">
            <Button variant="outline" onClick={onGuest} disabled={loading}>Guest Login</Button>
            <Link to="/register" className="inline-flex items-center justify-center text-sm font-medium text-accent hover:underline">Create an account</Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
