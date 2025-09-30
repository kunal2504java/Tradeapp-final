import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AuthCallbackPage from "./pages/AuthCallbackPage";
import AppLayout from "./layouts/AppLayout";
import Dashboard from "./pages/app/Dashboard";
import Network from "./pages/app/Network";
import Referrals from "./pages/app/Referrals";
import Wallet from "./pages/app/Wallet";
import Profile from "./pages/app/Profile";
import Salary from "./pages/app/Salary";
import Rewards from "./pages/app/Rewards";

// Sub-page components for new navigation structure

// Income sub-pages

// Network sub-pages


// Settings sub-pages
import ChangePassword from './pages/app/Settings/ChangePassword';
import AddWithdrawalAddress from './pages/app/Settings/AddWithdrawalAddress';
import { AuthProvider, useAuth } from "@/hooks/use-auth";
import PaymentsPage from "./pages/app/admin/Payments";
import CryptoDeposit from "./pages/app/CryptoDeposit";
import DepositHistory from "./pages/app/DepositHistory";
import DirectTeam from "./pages/app/DirectTeam";
import TotalTeam from "./pages/app/TotalTeam";
import MyIncome from "./pages/app/MyIncome";
import ReferralIncome from "./pages/app/ReferralIncome";
import DirectIncome from "./pages/app/DirectIncome";
import SalaryIncome from "./pages/app/SalaryIncome";
import WithdrawalIncome from "./pages/app/WithdrawalIncome";
import WithdrawalInvestment from "./pages/app/WithdrawalInvestment";
import WithdrawalHistory from "./pages/app/WithdrawalHistory";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30 * 1000, // 30 seconds
      cacheTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      retry: 1, // Reduce retry attempts for faster error handling
    },
    mutations: {
      retry: 1,
    },
  },
});

/**
 * A component to protect routes that require a user to be logged in.
 * If not logged in, it redirects to the /login page.
 */
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
}

/**
 * A component for routes that should only be accessible to logged-out users (e.g., login, register).
 * If logged in, it redirects to the main app dashboard.
 */
function PublicOnlyRoute({ children }: { children: React.ReactNode }) {
    const { isAuthenticated } = useAuth();
    if (isAuthenticated) {
      return <Navigate to="/app" replace />;
    }
    return <>{children}</>;
}

// This component holds all the routes and can now use the useAuth hook
function AppRoutes() {
  const { userRole } = useAuth();
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/auth/callback" element={<AuthCallbackPage />} />

      {/* --- Public-Only Routes --- */}
      <Route path="/login" element={<PublicOnlyRoute><Login /></PublicOnlyRoute>} />
      <Route path="/register" element={<PublicOnlyRoute><Register /></PublicOnlyRoute>} />

      {/* --- Protected App Routes --- */}
      <Route
        path="/app"
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        
        {/* Deposit Routes */}
        <Route path="deposit/crypto" element={<CryptoDeposit />} />
        <Route path="deposit/history" element={<DepositHistory />} />
        
        {/* Income Routes */}
        <Route path="income/my" element={<MyIncome />} />
        <Route path="income/referral" element={<ReferralIncome />} />
        <Route path="income/direct" element={<DirectIncome />} />
        <Route path="income/salary" element={<SalaryIncome />} />
        
        {/* Network Routes */}
        <Route path="network/direct" element={<DirectTeam />} />
        <Route path="network/total" element={<TotalTeam />} />
        
        {/* Withdrawal Routes */}
        <Route path="withdrawal/income" element={<WithdrawalIncome />} />
        <Route path="withdrawal/investment" element={<WithdrawalInvestment />} />
        <Route path="withdrawal/history" element={<WithdrawalHistory />} />
        
        {/* Settings Routes */}
        <Route path="settings/password" element={<ChangePassword />} />
        <Route path="settings/address" element={<AddWithdrawalAddress />} />
        
        {/* Legacy routes - can be removed later */}
        <Route path="network" element={<Network />} />
        <Route path="referrals" element={<Referrals />} />
        <Route path="wallet" element={<Wallet />} />
        <Route path="profile" element={<Profile />} />
        <Route path="salary" element={<Salary />} />
        <Route path="rewards" element={<Rewards />} />
        
        {/* --- Admin-Only Route --- */}
        {/* This checks the user's role and only adds the route if they are an ADMIN */}
        {userRole === 'ADMIN' && (
          <Route path="admin/payments" element={<PaymentsPage />} />
        )}
      </Route>
      
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

