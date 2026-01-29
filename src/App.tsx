import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Admin imports
import AdminLayout from "./components/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import Transactions from "./pages/admin/Transactions";
import Bonus from "./pages/admin/Bonus";
import Deposit from "./pages/admin/Deposit";
import Withdrawals from "./pages/admin/Withdrawals";
import AffiliateResale from "./pages/admin/AffiliateResale";
import Reports from "./pages/admin/Reports";
import Profile from "./pages/admin/Profile";
import Players from "./pages/admin/Players";
import Agents from "./pages/admin/Agents";
import EWallet from "./pages/admin/EWallet";
import Affiliates from "./pages/admin/Affiliates";
import SuperAffiliates from "./pages/admin/SuperAffiliates";
import Notice from "./pages/admin/Notice";
import PaymentMethods from "./pages/admin/PaymentMethods";
import Sliders from "./pages/admin/Sliders";
import SocialLinks from "./pages/admin/SocialLinks";
import LogoIcon from "./pages/admin/LogoIcon";
import Promotions from "./pages/admin/Promotions";
import Settings from "./pages/admin/Settings";
import GameAPI from "./pages/admin/GameAPI";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="transactions" element={<Transactions />} />
            <Route path="bonus" element={<Bonus />} />
            <Route path="deposit" element={<Deposit />} />
            <Route path="withdrawals" element={<Withdrawals />} />
            <Route path="affiliate-resale" element={<AffiliateResale />} />
            <Route path="reports" element={<Reports />} />
            <Route path="profile" element={<Profile />} />
            <Route path="players" element={<Players />} />
            <Route path="agents" element={<Agents />} />
            <Route path="e-wallet" element={<EWallet />} />
            <Route path="affiliates" element={<Affiliates />} />
            <Route path="super-affiliates" element={<SuperAffiliates />} />
            <Route path="notice" element={<Notice />} />
            <Route path="payment-methods" element={<PaymentMethods />} />
            <Route path="sliders" element={<Sliders />} />
            <Route path="social-links" element={<SocialLinks />} />
            <Route path="logo-icon" element={<LogoIcon />} />
            <Route path="promotions" element={<Promotions />} />
            <Route path="settings" element={<Settings />} />
            <Route path="game-api" element={<GameAPI />} />
          </Route>
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
