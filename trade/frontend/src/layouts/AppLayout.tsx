import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { ShieldCheck } from 'lucide-react'; // Optional: for a nice admin icon

export default function AppLayout() {
  // 1. Destructure userRole from the useAuth hook
  const { logout, userRole } = useAuth();
  const navigate = useNavigate();

  function onLogout() {
    logout();
    navigate('/login');
  }

  return (
    <div className="min-h-screen grid grid-cols-[260px_1fr] bg-background text-foreground">
      <aside className="border-r border-border p-4 flex flex-col sticky top-0 h-screen">
        <div className="text-2xl font-semibold mb-8 text-yellow-500">Fox Trading</div>
        <nav className="flex flex-col gap-2">
          <NavLink to="/app" end className={({ isActive }) => `px-3 py-2 rounded-md ${isActive ? 'bg-yellow-500/10 text-yellow-500' : 'hover:bg-muted'}`}>
            Dashboard
          </NavLink>
          <NavLink to="/app/referrals" className={({ isActive }) => `px-3 py-2 rounded-md ${isActive ? 'bg-yellow-500/10 text-yellow-500' : 'hover:bg-muted'}`}>
            My Referrals
          </NavLink>
          <NavLink to="/app/network" className={({ isActive }) => `px-3 py-2 rounded-md ${isActive ? 'bg-yellow-500/10 text-yellow-500' : 'hover:bg-muted'}`}>
            Network Tree
          </NavLink>
          <NavLink to="/app/investments" className={({ isActive }) => `px-3 py-2 rounded-md ${isActive ? 'bg-yellow-500/10 text-yellow-500' : 'hover:bg-muted'}`}>
            Investments
          </NavLink>
          <NavLink to="/app/wallet" className={({ isActive }) => `px-3 py-2 rounded-md ${isActive ? 'bg-yellow-500/10 text-yellow-500' : 'hover:bg-muted'}`}>
            Wallet
          </NavLink>
          <NavLink to="/app/salary" className={({ isActive }) => `px-3 py-2 rounded-md ${isActive ? 'bg-yellow-500/10 text-yellow-500' : 'hover:bg-muted'}`}>
            Salary Ranks
          </NavLink>
          <NavLink to="/app/rewards" className={({ isActive }) => `px-3 py-2 rounded-md ${isActive ? 'bg-yellow-500/10 text-yellow-500' : 'hover:bg-muted'}`}>
            Rewards
          </NavLink>
          <NavLink to="/app/profile" className={({ isActive }) => `px-3 py-2 rounded-md ${isActive ? 'bg-yellow-500/10 text-yellow-500' : 'hover:bg-muted'}`}>
            Profile
          </NavLink>
          
          {/* --- 2. Conditionally render the Admin section --- */}
          {userRole === 'ADMIN' && (
            <>
              <hr className="my-4 border-border" />
              <div className="px-3 text-xs font-semibold uppercase text-muted-foreground tracking-wider">Admin Panel</div>
              <NavLink 
                to="/app/admin/payments" 
                className={({ isActive }) => `flex items-center gap-2 px-3 py-2 rounded-md ${isActive ? 'bg-blue-500/10 text-blue-500' : 'hover:bg-muted'}`}
              >
                <ShieldCheck size={16} />
                Manage Deposits
              </NavLink>
            </>
          )}
        </nav>
        <div className="mt-auto pt-8">
          <Button variant="outline" className="w-full" onClick={onLogout}>Logout</Button>
        </div>
      </aside>
      <main className="p-6 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
