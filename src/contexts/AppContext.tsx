import { createContext, useContext, useState, ReactNode } from 'react';

export type UserRole = 'HR_MANAGER' | 'EMPLOYEE' | 'LOGGED_OUT';

export interface LoggedInUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department?: string;
}

interface AppContextType {
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  loggedInUser: LoggedInUser | null;
  setLoggedInUser: (user: LoggedInUser | null) => void;
  orgBurnoutRisk: number;
  updateOrgRisk: (shift: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [userRole, setUserRole] = useState<UserRole>('LOGGED_OUT');
  const [loggedInUser, setLoggedInUser] = useState<LoggedInUser | null>(null);
  const [orgBurnoutRisk, setOrgBurnoutRisk] = useState(45);

  const updateOrgRisk = (shift: number) => {
    setOrgBurnoutRisk((r) => Math.min(100, Math.max(0, r + shift)));
  };

  return (
    <AppContext.Provider value={{ userRole, setUserRole, loggedInUser, setLoggedInUser, orgBurnoutRisk, updateOrgRisk }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}
