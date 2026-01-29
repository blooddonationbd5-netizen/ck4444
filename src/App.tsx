import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Promotion from "./pages/Promotion";
import Invite from "./pages/Invite";
import Reward from "./pages/Reward";
import Member from "./pages/Member";
import Login from "./pages/Login";
import Register from "./pages/Register";

// User Dashboard Pages
import BettingRecord from "./pages/user/BettingRecord";
import ProfitLoss from "./pages/user/ProfitLoss";
import DepositRecord from "./pages/user/DepositRecord";
import WithdrawRecord from "./pages/user/WithdrawRecord";
import AccountRecord from "./pages/user/AccountRecord";
import MyAccount from "./pages/user/MyAccount";
import Security from "./pages/user/Security";
import Mission from "./pages/user/Mission";
import Rebate from "./pages/user/Rebate";
import Messages from "./pages/user/Messages";
import Suggestion from "./pages/user/Suggestion";
import DownloadApp from "./pages/user/Download";
import Support from "./pages/user/Support";
import UserDeposit from "./pages/user/Deposit";
import UserWithdraw from "./pages/user/Withdraw";
import MyCards from "./pages/user/MyCards";

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
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Index />} />
          <Route path="/promotion" element={<Promotion />} />
          <Route path="/invite" element={<Invite />} />
          <Route path="/reward" element={<Reward />} />
          <Route path="/member" element={<Member />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* User Dashboard Routes */}
          <Route path="/betting-record" element={<BettingRecord />} />
          <Route path="/profit-loss" element={<ProfitLoss />} />
          <Route path="/deposit-record" element={<DepositRecord />} />
          <Route path="/withdraw-record" element={<WithdrawRecord />} />
          <Route path="/account-record" element={<AccountRecord />} />
          <Route path="/my-account" element={<MyAccount />} />
          <Route path="/security" element={<Security />} />
          <Route path="/mission" element={<Mission />} />
          <Route path="/rebate" element={<Rebate />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/suggestion" element={<Suggestion />} />
          <Route path="/download" element={<DownloadApp />} />
          <Route path="/support" element={<Support />} />
          <Route path="/deposit" element={<UserDeposit />} />
          <Route path="/withdraw" element={<UserWithdraw />} />
          <Route path="/my-cards" element={<MyCards />} />
          
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
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
