import { NavLink, Outlet, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';
import { useIsMobile } from '@/hooks/use-mobile';
import { useDashboardData } from '@/hooks/use-api';
import { Button } from '@/components/ui/button';
import { ShieldCheck, Menu, X, User, Edit2, MapPin, Calendar, Mail, Phone, ChevronRight, ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';
import '../styles/mobile-menu.css';

export default function AppLayout() {
  const { logout, userRole } = useAuth();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);

  function onLogout() {
    logout();
    navigate('/login');
  }

  function toggleMobileMenu() {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  }

  function closeMobileMenu() {
    setIsMobileMenuOpen(false);
  }

  function toggleMenu(menuName: string) {
    setExpandedMenus(prev => 
      prev.includes(menuName) 
        ? prev.filter(name => name !== menuName)
        : [...prev, menuName]
    );
  }

  // Close mobile menu when switching to desktop
  useEffect(() => {
    if (!isMobile && isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  }, [isMobile, isMobileMenuOpen]);

  const NavigationLinks = () => {
    const { data: dashboardData } = useDashboardData();
    
    const getNavLinkClass = (isActive: boolean) => {
      const baseClass = "px-3 py-2 rounded-md transition-all duration-200 font-medium";
      if (isActive) {
        return `${baseClass} bg-yellow-500/15 text-yellow-500 nav-link-active border-l-2 border-yellow-500`;
      }
      return `${baseClass} hover:bg-yellow-500/5 hover:text-yellow-400`;
    };

    const getSubNavLinkClass = (isActive: boolean) => {
      const baseClass = "block w-full pl-4 pr-3 py-2 rounded-md transition-all duration-200 text-sm";
      if (isActive) {
        return `${baseClass} bg-yellow-500/15 text-yellow-500 font-medium`;
      }
      return `${baseClass} hover:bg-yellow-500/10 hover:text-yellow-400 text-muted-foreground`;
    };

    const MenuButton = ({ label, menuKey }: { label: string; menuKey: string }) => {
      const isExpanded = expandedMenus.includes(menuKey);
      return (
        <button
          onClick={() => toggleMenu(menuKey)}
          className={`w-full flex items-center justify-between px-3 py-2 rounded-md transition-all duration-200 font-medium hover:bg-yellow-500/5 hover:text-yellow-400 text-left`}
        >
          <span>{label}</span>
          {isExpanded ? (
            <ChevronDown size={16} className="text-yellow-500" />
          ) : (
            <ChevronRight size={16} className="text-muted-foreground" />
          )}
        </button>
      );
    };

    return (
      <>
        {/* User Profile Section */}
        <div className="mb-6 p-4 bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 rounded-lg border border-yellow-500/20">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center">
              <User size={24} className="text-yellow-500" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground">
                {dashboardData?.user_name || 'Loading...'}
              </h3>
              <p className="text-sm text-muted-foreground">
                ID: {dashboardData?.referral_code || 'N/A'}
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 hover:bg-yellow-500/10"
            >
              <Edit2 size={14} className="text-yellow-500" />
            </Button>
          </div>
          <div className="space-y-1 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <Mail size={12} />
              <span>{dashboardData?.user_email || 'Loading...'}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone size={12} />
              <span>+91 XXXXXXXXXX</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={12} />
              <span>India</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={12} />
              <span>Joined: {dashboardData?.join_date ? new Date(dashboardData.join_date).toLocaleDateString() : 'N/A'}</span>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="w-full mt-3 text-xs hover:bg-yellow-500/10 hover:border-yellow-500/50"
          >
            Update Details
          </Button>
        </div>

        <nav className="flex flex-col gap-1">
          {/* Dashboard - No sub-menu */}
          <NavLink 
            to="/app" 
            end 
            className={({ isActive }) => getNavLinkClass(isActive)}
            onClick={closeMobileMenu}
          >
            Dashboard
          </NavLink>

          {/* Deposit Menu */}
          <div>
            <MenuButton label="Deposit" menuKey="deposit" />
            {expandedMenus.includes('deposit') && (
              <div className="space-y-1 mt-1 ml-2 border-l border-yellow-500/20 pl-2">
                <NavLink 
                  to="/app/deposit/crypto" 
                  className={({ isActive }) => getSubNavLinkClass(isActive)}
                  onClick={closeMobileMenu}
                >
                  Crypto Deposit
                </NavLink>
                <NavLink 
                  to="/app/deposit/history" 
                  className={({ isActive }) => getSubNavLinkClass(isActive)}
                  onClick={closeMobileMenu}
                >
                  Deposit History
                </NavLink>
              </div>
            )}
          </div>

          {/* Investment Menu */}
          <div>
            <MenuButton label="Investment" menuKey="investment" />
            {expandedMenus.includes('investment') && (
              <div className="space-y-1 mt-1 ml-2 border-l border-yellow-500/20 pl-2">
                <NavLink 
                  to="/app/investments/my" 
                  className={({ isActive }) => getSubNavLinkClass(isActive)}
                  onClick={closeMobileMenu}
                >
                  My Investments
                </NavLink>
                <NavLink 
                  to="/app/investments/team" 
                  className={({ isActive }) => getSubNavLinkClass(isActive)}
                  onClick={closeMobileMenu}
                >
                  Team Investments
                </NavLink>
              </div>
            )}
          </div>

          {/* Income Menu */}
          <div>
            <MenuButton label="Income" menuKey="income" />
            {expandedMenus.includes('income') && (
              <div className="space-y-1 mt-1 ml-2 border-l border-yellow-500/20 pl-2">
                <NavLink 
                  to="/app/income/my" 
                  className={({ isActive }) => getSubNavLinkClass(isActive)}
                  onClick={closeMobileMenu}
                >
                  My Income
                </NavLink>
                <NavLink 
                  to="/app/income/referral" 
                  className={({ isActive }) => getSubNavLinkClass(isActive)}
                  onClick={closeMobileMenu}
                >
                  Referral Income
                </NavLink>
                <NavLink 
                  to="/app/income/direct" 
                  className={({ isActive }) => getSubNavLinkClass(isActive)}
                  onClick={closeMobileMenu}
                >
                  Direct Income
                </NavLink>
                <NavLink 
                  to="/app/income/salary" 
                  className={({ isActive }) => getSubNavLinkClass(isActive)}
                  onClick={closeMobileMenu}
                >
                  Salary Income
                </NavLink>
              </div>
            )}
          </div>

          {/* Network/Business Menu */}
          <div>
            <MenuButton label="Business/Network" menuKey="network" />
            {expandedMenus.includes('network') && (
              <div className="space-y-1 mt-1 ml-2 border-l border-yellow-500/20 pl-2">
                <NavLink 
                  to="/app/network/direct" 
                  className={({ isActive }) => getSubNavLinkClass(isActive)}
                  onClick={closeMobileMenu}
                >
                  Direct Team
                </NavLink>
                <NavLink 
                  to="/app/network/total" 
                  className={({ isActive }) => getSubNavLinkClass(isActive)}
                  onClick={closeMobileMenu}
                >
                  Total Team
                </NavLink>
              </div>
            )}
          </div>

          {/* Withdrawal Menu */}
          <div>
            <MenuButton label="Withdrawal" menuKey="withdrawal" />
            {expandedMenus.includes('withdrawal') && (
              <div className="space-y-1 mt-1 ml-2 border-l border-yellow-500/20 pl-2">
                <NavLink 
                  to="/app/withdrawal/income" 
                  className={({ isActive }) => getSubNavLinkClass(isActive)}
                  onClick={closeMobileMenu}
                >
                  Withdrawal Income
                </NavLink>
                <NavLink 
                  to="/app/withdrawal/investment" 
                  className={({ isActive }) => getSubNavLinkClass(isActive)}
                  onClick={closeMobileMenu}
                >
                  Withdrawal Investment
                </NavLink>
                <NavLink 
                  to="/app/withdrawal/history" 
                  className={({ isActive }) => getSubNavLinkClass(isActive)}
                  onClick={closeMobileMenu}
                >
                  Withdrawal History
                </NavLink>
              </div>
            )}
          </div>

          {/* Settings Menu */}
          <div>
            <MenuButton label="Settings" menuKey="settings" />
            {expandedMenus.includes('settings') && (
              <div className="space-y-1 mt-1 ml-2 border-l border-yellow-500/20 pl-2">
                <NavLink 
                  to="/app/settings/password" 
                  className={({ isActive }) => getSubNavLinkClass(isActive)}
                  onClick={closeMobileMenu}
                >
                  Change Profile Password
                </NavLink>
                <NavLink 
                  to="/app/settings/address" 
                  className={({ isActive }) => getSubNavLinkClass(isActive)}
                  onClick={closeMobileMenu}
                >
                  Add Withdrawal Address
                </NavLink>
              </div>
            )}
          </div>
        
        {/* Admin section */}
        {userRole === 'ADMIN' && (
          <>
            <hr className="my-4 border-border" />
            <div className="px-3 py-2 text-xs font-semibold uppercase text-muted-foreground tracking-wider">Admin Panel</div>
            <NavLink 
              to="/app/admin/payments" 
              className={({ isActive }) => `flex items-center gap-2 ${getNavLinkClass(isActive)}`}
              onClick={closeMobileMenu}
            >
              <ShieldCheck size={16} />
              Manage Deposits
            </NavLink>
          </>
        )}
      </nav>
      </>
    );
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Mobile Header */}
      {isMobile && (
        <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border p-4 flex items-center justify-between shadow-sm">
          <Link 
            to="/" 
            className="text-xl font-semibold text-yellow-500 hover:text-yellow-400 transition-colors duration-200 cursor-pointer"
            onClick={closeMobileMenu}
          >
            Fox Trading
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMobileMenu}
            className={`hover:bg-yellow-500/10 transition-all duration-200 ${isMobileMenuOpen ? 'bg-yellow-500/10' : ''}`}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMobileMenuOpen ? (
              <X size={24} className="text-yellow-500 transform rotate-0 transition-transform duration-200" />
            ) : (
              <Menu size={24} className="text-foreground hover:text-yellow-500 transition-colors duration-200" />
            )}
          </Button>
        </div>
      )}

      <div className="flex">
        {/* Desktop Sidebar */}
        {!isMobile && (
          <aside className="border-r border-border w-64 flex flex-col sticky top-0 h-screen">
            <div className="p-4 border-b border-border">
              <Link 
                to="/" 
                className="text-2xl font-semibold text-yellow-500 hover:text-yellow-400 transition-colors duration-200 cursor-pointer block"
              >
                Fox Trading
              </Link>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              <NavigationLinks />
            </div>
            <div className="p-4 border-t border-border">
              <Button variant="outline" className="w-full" onClick={onLogout}>Logout</Button>
            </div>
          </aside>
        )}

        {/* Mobile Sidebar */}
        {isMobile && isMobileMenuOpen && (
          <>
            <div 
              className="fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 ease-in-out" 
              onClick={closeMobileMenu} 
            />
            <aside className="fixed top-0 left-0 z-50 bg-background border-r border-border w-64 h-full flex flex-col shadow-2xl transform transition-transform duration-300 ease-in-out">
              <div className="flex items-center justify-between p-4 border-b border-border">
                <Link 
                  to="/" 
                  className="text-xl font-semibold text-yellow-500 hover:text-yellow-400 transition-colors duration-200 cursor-pointer"
                  onClick={closeMobileMenu}
                >
                  Fox Trading
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={closeMobileMenu}
                  className="hover:bg-yellow-500/10 transition-colors"
                >
                  <X size={20} className="text-yellow-500" />
                </Button>
              </div>
              <div className="flex-1 overflow-y-auto p-4">
                <NavigationLinks />
              </div>
              <div className="p-4 border-t border-border">
                <Button 
                  variant="outline" 
                  className="w-full hover:bg-yellow-500/10 hover:border-yellow-500/50 transition-colors" 
                  onClick={onLogout}
                >
                  Logout
                </Button>
              </div>
            </aside>
          </>
        )}

        {/* Main Content */}
        <main className={`flex-1 overflow-auto ${isMobile ? 'p-4' : 'p-6'}`}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}