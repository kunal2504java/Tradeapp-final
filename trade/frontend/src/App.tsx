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
import Investments from "./pages/app/Investments";
import Wallet from "./pages/app/Wallet";
import Profile from "./pages/app/Profile";
import Salary from "./pages/app/Salary";
import Rewards from "./pages/app/Rewards";
import { AuthProvider, useAuth } from "@/hooks/use-auth";
import PaymentsPage from "./pages/app/admin/Payments";

const queryClient = new QueryClient();

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
        <Route path="referrals" element={<Referrals />} />
        <Route path="network" element={<Network />} />
        <Route path="investments" element={<Investments />} />
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

