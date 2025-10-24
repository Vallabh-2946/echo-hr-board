import { useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UserCircle, Building2, ArrowLeft } from 'lucide-react';

export default function LoginScreen() {
  const { setUserRole, setLoggedInUser } = useApp();
  const [selectedRole, setSelectedRole] = useState<'HR_MANAGER' | 'EMPLOYEE' | null>(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username || !password) {
      setError('Please enter both username and password');
      return;
    }

    if (selectedRole === 'HR_MANAGER') {
      if (username === 'hr' && password === 'hr123') {
        setLoggedInUser({ 
          id: '1', 
          name: 'Sarah Johnson', 
          email: 'sarah.johnson@company.com',
          role: 'HR_MANAGER', 
          department: 'Human Resources' 
        });
        setUserRole('HR_MANAGER');
      } else {
        setError('Invalid credentials. Try hr/hr123');
      }
    } else {
      if (username === 'employee' && password === 'emp123') {
        setLoggedInUser({ 
          id: '2', 
          name: 'Alex Chen', 
          email: 'alex.chen@company.com',
          role: 'EMPLOYEE', 
          department: 'Engineering' 
        });
        setUserRole('EMPLOYEE');
      } else {
        setError('Invalid credentials. Try employee/emp123');
      }
    }
  };

  if (!selectedRole) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-primary mb-2">HR Twin</h1>
            <p className="text-muted-foreground">Live Dual-Dashboard System</p>
          </div>

          <div className="space-y-4">
            <Button
              onClick={() => setSelectedRole('HR_MANAGER')}
              className="w-full h-24 text-lg bg-card hover:bg-accent border-2 border-primary"
              variant="outline"
            >
              <div className="flex items-center space-x-4">
                <Building2 className="w-8 h-8 text-primary" />
                <div className="text-left">
                  <div className="font-bold text-foreground">HR Manager</div>
                  <div className="text-sm text-muted-foreground">View organizational insights</div>
                </div>
              </div>
            </Button>

            <Button
              onClick={() => setSelectedRole('EMPLOYEE')}
              className="w-full h-24 text-lg bg-card hover:bg-accent border-2 border-secondary"
              variant="outline"
            >
              <div className="flex items-center space-x-4">
                <UserCircle className="w-8 h-8 text-secondary" />
                <div className="text-left">
                  <div className="font-bold text-foreground">Employee</div>
                  <div className="text-sm text-muted-foreground">Submit feedback & track wellbeing</div>
                </div>
              </div>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <Button
          onClick={() => {
            setSelectedRole(null);
            setError('');
            setUsername('');
            setPassword('');
          }}
          variant="ghost"
          className="mb-4 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <div className="bg-card p-8 rounded-lg border border-border shadow-lg">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-foreground mb-2">
              {selectedRole === 'HR_MANAGER' ? 'HR Manager Login' : 'Employee Login'}
            </h2>
            <p className="text-sm text-muted-foreground">
              {selectedRole === 'HR_MANAGER' ? 'hr / hr123' : 'employee / emp123'}
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setError('');
                }}
                className="mt-1"
                placeholder="Enter username"
              />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                className="mt-1"
                placeholder="Enter password"
              />
            </div>

            {error && (
              <div className="bg-destructive/10 border border-destructive text-destructive-foreground rounded-md p-3 text-sm">
                {error}
              </div>
            )}

            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
