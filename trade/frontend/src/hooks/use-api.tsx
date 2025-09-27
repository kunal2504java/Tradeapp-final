import { useState, useEffect } from 'react';
import { useAuth } from './use-auth';

// Determine API base URL based on environment
const isDevelopment = typeof window !== 'undefined' && window.location.hostname === 'localhost';
const API_BASE_URL = isDevelopment 
  ? 'http://localhost:4000/api'
  : 'https://fox-trading-api.onrender.com/api'; // Render backend URL

export interface DashboardData {
  user_name: string;
  user_email: string;
  referral_code: string;
  join_date: string;
  total_investment: number;
  wallet_balance: number;
  daily_income: number;
  total_income: number;
  total_withdrawal: number;
  left_leg_business: number;
  right_leg_business: number;
  total_business: number;
  direct_team: number;
  total_team: number;
  income_breakdown: Array<{
    source: string;
    amount: number;
  }>;
  recent_transactions: Array<{
    id: string;
    amount: number;
    type: string;
    income_source: string;
    description?: string;
    timestamp: string;
  }>;
}

async function apiCall(endpoint: string, token: string) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`API call failed: ${response.statusText}`);
  }

  return response.json();
}

export function useDashboardData() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { token } = useAuth();

  const fetchDashboard = async () => {
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const dashboardData = await apiCall('/user/dashboard', token);
      setData(dashboardData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch dashboard data');
      console.error('Dashboard fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, [token]);

  return { data, loading, error, refetch: fetchDashboard };
}

export function useUserProfile() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { token } = useAuth();

  useEffect(() => {
    async function fetchProfile() {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const profileData = await apiCall('/user/profile', token);
        setData(profileData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch profile data');
        console.error('Profile fetch error:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, [token]);

  return { data, loading, error };
}