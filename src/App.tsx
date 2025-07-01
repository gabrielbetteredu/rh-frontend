import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import Employees from "./pages/Employees";
import Payroll from "./pages/Payroll";
import Documents from "./pages/Documents";
import Automation from "./pages/Automation";
import Settings from "./pages/Settings";
import Benefits from "./pages/Benefits";
import NotFound from "./pages/NotFound";
import Invoices from "./pages/Invoices";
import Emails from "./pages/Emails";
import Login from "./pages/Login";

const queryClient = new QueryClient();

function RequireAuth() {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return null; // or a loading spinner
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}

const AppRoutes = () => (
  <Routes>
    <Route path="/login" element={<Login />} />
    <Route element={<RequireAuth />}>
      <Route path="/" element={<Layout />}>
        <Route index element={<Index />} />
        <Route path="employees" element={<Employees />} />
        <Route path="payroll" element={<Payroll />} />
        <Route path="documents" element={<Documents />} />
        <Route path="automation" element={<Automation />} />
        <Route path="benefits" element={<Benefits />} />
        <Route path="settings" element={<Settings />} />
        <Route path="invoices" element={<Invoices />} />
        <Route path="emails" element={<Emails />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Route>
  </Routes>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
