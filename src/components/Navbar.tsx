import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'react-router-dom';
import { LogOut, LayoutDashboard, Lightbulb, Users } from 'lucide-react';

export default function Navbar() {
  const { userRole, setUserRole, setLoggedInUser, loggedInUser } = useApp();
  const location = useLocation();

  const handleLogout = () => {
    setUserRole('LOGGED_OUT');
    setLoggedInUser(null);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-card border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <div className="flex-shrink-0">
              <h1 className="text-xl font-bold text-primary">HR Twin</h1>
            </div>
            
            <div className="flex space-x-4">
              {userRole === 'HR_MANAGER' ? (
                <>
                  <Link to="/">
                    <Button
                      variant={isActive('/') ? 'default' : 'ghost'}
                      className="flex items-center space-x-2"
                    >
                      <LayoutDashboard className="w-4 h-4" />
                      <span>Dashboard</span>
                    </Button>
                  </Link>
                  <Link to="/insights">
                    <Button
                      variant={isActive('/insights') ? 'default' : 'ghost'}
                      className="flex items-center space-x-2"
                    >
                      <Lightbulb className="w-4 h-4" />
                      <span>Insights</span>
                    </Button>
                  </Link>
                  <Link to="/team-health">
                    <Button
                      variant={isActive('/team-health') ? 'default' : 'ghost'}
                      className="flex items-center space-x-2"
                    >
                      <Users className="w-4 h-4" />
                      <span>Team Health</span>
                    </Button>
                  </Link>
                </>
              ) : (
                <Link to="/">
                  <Button
                    variant={isActive('/') ? 'default' : 'ghost'}
                    className="flex items-center space-x-2"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    <span>My Portal</span>
                  </Button>
                </Link>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="text-sm">
              <div className="font-medium text-foreground">{loggedInUser?.name}</div>
              <div className="text-muted-foreground text-xs">{loggedInUser?.department}</div>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              size="sm"
              className="flex items-center space-x-2"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
