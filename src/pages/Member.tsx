import { useState } from "react";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Trophy,
  TrendingUp,
  ArrowDownToLine,
  ArrowUpFromLine,
  FileText,
  Settings,
  Shield,
  Users,
  Gift,
  Coins,
  MessageCircle,
  MessageSquare,
  Download,
  Headphones,
  LogOut,
  RefreshCw,
  Copy,
  ChevronRight,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useUserProfile } from "@/hooks/useUserProfile";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

const memberMenuItems = [
  { title: "Reward Center", icon: Trophy, path: "/reward", badge: 12 },
  { title: "Betting Record", icon: TrendingUp, path: "/betting-record" },
  { title: "Profit And Loss", icon: FileText, path: "/profit-loss" },
  { title: "Deposit Record", icon: ArrowDownToLine, path: "/deposit-record" },
  { title: "Withdrawal Record", icon: ArrowUpFromLine, path: "/withdraw-record" },
  { title: "Account Record", icon: FileText, path: "/account-record" },
  { title: "My Account", icon: User, path: "/my-account" },
  { title: "Security Center", icon: Shield, path: "/security" },
  { title: "Invite Friends", icon: Users, path: "/invite" },
  { title: "Mission", icon: Gift, path: "/mission", badge: 1 },
  { title: "Rebate", icon: Coins, path: "/rebate" },
  { title: "Internal Message", icon: MessageCircle, path: "/messages", badge: 6 },
  { title: "Suggestion", icon: MessageSquare, path: "/suggestion" },
  { title: "Download APP", icon: Download, path: "/download" },
  { title: "Customer Service", icon: Headphones, path: "/support" },
];

const Member = () => {
  const { user, signOut } = useAuth();
  const { data: profile, isLoading } = useUserProfile();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefreshBalance = async () => {
    setIsRefreshing(true);
    await queryClient.invalidateQueries({ queryKey: ['user-profile'] });
    setTimeout(() => {
      setIsRefreshing(false);
      toast({
        title: "Refreshed",
        description: "Balance has been updated",
      });
    }, 600);
  };

  const handleCopyUsername = () => {
    if (profile?.username) {
      navigator.clipboard.writeText(profile.username);
      toast({
        title: "Copied!",
        description: "Username copied to clipboard",
      });
    }
  };

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  // If not logged in, show login prompt
  if (!user) {
    return (
      <div className="min-h-screen bg-background pb-24">
        <Header />
        <div className="px-4 py-8 text-center">
          <div className="bg-card border border-border rounded-xl p-8">
            <User className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-xl font-bold text-foreground mb-2">Please Login</h2>
            <p className="text-muted-foreground mb-6">
              Login to access Member Center
            </p>
            <div className="flex gap-3 justify-center">
              <Link
                to="/login"
                className="bg-primary text-primary-foreground px-6 py-2 rounded-lg font-medium"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-gradient-gold text-primary-foreground px-6 py-2 rounded-lg font-medium"
              >
                Register
              </Link>
            </div>
          </div>
        </div>
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-gradient-teal px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <button onClick={() => navigate(-1)} className="text-foreground">
            <ChevronRight className="w-6 h-6 rotate-180" />
          </button>
          <h1 className="text-lg font-bold text-foreground">My Account</h1>
          <div className="w-6" />
        </div>
      </div>

      {/* Profile Card */}
      <div className="px-4 -mt-2">
        <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-lg">
          {/* Sign In Banner */}
          <div className="bg-destructive text-destructive-foreground px-4 py-2 flex items-center justify-end gap-2">
            <span className="text-sm font-medium">Sign In</span>
            <ChevronRight className="w-4 h-4" />
          </div>

          <div className="p-4">
            {/* User Info */}
            <div className="flex items-start gap-4 mb-4">
              {/* Avatar */}
              <div className="w-20 h-20 rounded-full bg-gradient-gold overflow-hidden border-4 border-primary/20 flex items-center justify-center">
                {profile?.avatar_url ? (
                  <img src={profile.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <User className="w-10 h-10 text-primary-foreground" />
                )}
              </div>

              {/* User Details */}
              <div className="flex-1">
                {/* VIP Badge */}
                <div className="inline-flex items-center gap-1 bg-muted px-3 py-1 rounded-full mb-2">
                  <Trophy className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-foreground">VIP1</span>
                </div>

                {/* Username with copy */}
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg font-bold text-foreground">
                    {profile?.username || profile?.phone || user?.email?.split('@')[0]}
                  </span>
                  <button onClick={handleCopyUsername} className="text-muted-foreground">
                    <Copy className="w-4 h-4" />
                  </button>
                </div>

                {/* Nickname */}
                <div className="flex items-center gap-1 text-muted-foreground text-sm">
                  <span>Nickname: {profile?.full_name || 'User'}</span>
                </div>
              </div>
            </div>

            {/* Balance Section */}
            <div className="flex items-center justify-between mb-4">
              <div className="text-2xl font-bold text-foreground">
                ৳ {(profile?.balance || 0).toFixed(2)}
              </div>
              <button
                onClick={handleRefreshBalance}
                disabled={isRefreshing}
                className="p-2 text-primary hover:text-primary/80 transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : ''}`} />
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <Link
                to="/deposit"
                className="flex-1 bg-muted hover:bg-muted/80 text-foreground py-3 rounded-full text-center font-medium transition-colors"
              >
                Deposit
              </Link>
              <Link
                to="/withdraw"
                className="flex-1 bg-muted hover:bg-muted/80 text-foreground py-3 rounded-full text-center font-medium transition-colors"
              >
                Withdrawal
              </Link>
              <Link
                to="/my-cards"
                className="flex-1 bg-muted hover:bg-muted/80 text-foreground py-3 rounded-full text-center font-medium transition-colors"
              >
                My Cards
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Member Center */}
      <div className="px-4 mt-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-sm font-medium text-foreground">Member Center</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        <div className="grid grid-cols-4 gap-4">
          {memberMenuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="flex flex-col items-center gap-2 py-2"
            >
              <div className="relative w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                <item.icon className="w-6 h-6 text-primary" />
                {item.badge && (
                  <span className="absolute -top-1 -right-1 min-w-[20px] h-5 bg-destructive rounded-full text-xs flex items-center justify-center text-destructive-foreground font-bold px-1">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-xs text-center text-foreground leading-tight">
                {item.title}
              </span>
            </Link>
          ))}

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="flex flex-col items-center gap-2 py-2"
          >
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
              <LogOut className="w-6 h-6 text-primary" />
            </div>
            <span className="text-xs text-center text-foreground leading-tight">
              Logout
            </span>
          </button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Member;
