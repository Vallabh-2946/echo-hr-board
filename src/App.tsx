import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider, useApp } from "@/contexts/AppContext";
import LoginScreen from "@/components/LoginScreen";
import Navbar from "@/components/Navbar";
import HRDashboard from "@/components/HRDashboard";
import EmployeePortal from "@/components/EmployeePortal";
import InsightsPage from "@/components/InsightsPage";
import TeamHealthPage from "@/components/TeamHealthPage";

const queryClient = new QueryClient();

function AppContent() {
  const { userRole } = useApp();

  if (userRole === 'LOGGED_OUT') {
    return <LoginScreen />;
  }

  return (
    <>
      <Navbar />
      <Routes>
        {userRole === 'HR_MANAGER' ? (
          <>
            <Route path="/" element={<HRDashboard />} />
            <Route path="/insights" element={<InsightsPage />} />
            <Route path="/team-health" element={<TeamHealthPage />} />
          </>
        ) : (
          <Route path="/" element={<EmployeePortal />} />
        )}
      </Routes>
    </>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppProvider>
          <AppContent />
        </AppProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
