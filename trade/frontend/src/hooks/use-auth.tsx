import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { api, setAuthToken, getAuthToken } from '@/lib/api';
import { jwtDecode } from 'jwt-decode'; // 1. Import jwt-decode

// Define the possible user roles
type UserRole = 'USER' | 'ADMIN';

// Define the shape of our decoded JWT payload
type DecodedToken = {
  id: string;
  role: UserRole;
  iat: number;
  exp: number;
  sub: string;
};

// Update the context value to include the user's role
type AuthContextValue = {
  token: string | null;
  isAuthenticated: boolean;
  userRole: UserRole | null; // 2. Add userRole to the context
  login: (email: string, password: string) => Promise<void>;
  loginGuest: () => Promise<void>;
  register: (input: { full_name: string; email: string; password: string; sponsor_referral_code: string; position: 'LEFT' | 'RIGHT' }) => Promise<void>;
  logout: () => void;
  setToken: (token: string | null) => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(getAuthToken());

  useEffect(() => {
    setAuthToken(token);
  }, [token]);

  // 3. Decode the token to get the user's role
  const userRole = useMemo(() => {
    if (!token) return null;
    try {
      const decoded = jwtDecode<DecodedToken>(token);
      return decoded.role; // Extract role from the token
    } catch (error) {
      console.error("Failed to decode token:", error);
      return null;
    }
  }, [token]);

  async function login(email: string, password: string) {
    const res = await api<{ token: string }>(`/api/auth/login`, { method: 'POST', body: { email, password } });
    setToken(res.token);
  }

  async function loginGuest() {
    const res = await api<{ token: string }>(`/api/auth/guest`, { method: 'POST' });
    setToken(res.token);
  }

  async function register(input: { full_name: string; email: string; password: string; sponsor_referral_code: string; position: 'LEFT' | 'RIGHT' }) {
    const res = await api<{ token: string }>(`/api/auth/register`, { method: 'POST', body: input });
    setToken(res.token);
  }

  function logout() {
    setToken(null);
  }

  const value = useMemo<AuthContextValue>(
    () => ({
      token,
      isAuthenticated: Boolean(token),
      userRole, // 4. Provide the userRole to the rest of the app
      login,
      loginGuest,
      register,
      logout,
      setToken,
    }),
    [token, userRole]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

