import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Home,
  Gift,
  Users,
  Award,
  User,
  Wallet,
  History,
  Download,
  Headphones,
  Settings,
  LogOut,
  X,
  ChevronRight,
  Shield,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";

interface HomeSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { title: "Home", icon: Home, path: "/" },
  { title: "Promotion", icon: Gift, path: "/promotion" },
  { title: "Invite Friends", icon: Users, path: "/invite" },
  { title: "Rewards", icon: Award, path: "/reward" },
];

const accountItems = [
  { title: "My Account", icon: User, path: "/my-account" },
  { title: "Deposit", icon: Wallet, path: "/deposit" },
  { title: "Withdraw", icon: Wallet, path: "/withdraw" },
  { title: "Transaction History", icon: History, path: "/account-record" },
  { title: "Security", icon: Shield, path: "/security" },
];

const otherItems = [
  { title: "Download App", icon: Download, path: "/download" },
  { title: "Support", icon: Headphones, path: "/support" },
];

const HomeSidebar = ({ isOpen, onClose }: HomeSidebarProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut, isAdmin } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = async () => {
    await signOut();
    onClose();
    navigate('/');
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-[110] w-72 bg-card border-r border-border transform transition-transform duration-300 ease-in-out flex flex-col",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Header */}
        <div className="p-4 border-b border-border flex items-center justify-between bg-gradient-to-r from-primary/10 to-transparent">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-gradient-gold">CK44</span>
            <span className="text-xl font-bold text-foreground">.COM</span>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-secondary rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* User Info */}
        {user && (
          <div className="p-4 border-b border-border bg-secondary/30">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                <User className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground truncate">{user.email}</p>
                <p className="text-sm text-muted-foreground">Welcome back!</p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-4">
          {/* Main Menu */}
          <div className="space-y-1">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider px-3 mb-2">Menu</p>
            {menuItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                  isActive(item.path)
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-secondary"
                )}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                <span className="flex-1 text-left">{item.title}</span>
                <ChevronRight className="w-4 h-4 opacity-50" />
              </button>
            ))}
          </div>

          {/* Account Section (only if logged in) */}
          {user && (
            <div className="space-y-1">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider px-3 mb-2">Account</p>
              {accountItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                    isActive(item.path)
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground hover:bg-secondary"
                  )}
                >
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  <span className="flex-1 text-left">{item.title}</span>
                  <ChevronRight className="w-4 h-4 opacity-50" />
                </button>
              ))}
            </div>
          )}

          {/* Admin Link (only for admins) */}
          {isAdmin && (
            <div className="space-y-1">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider px-3 mb-2">Admin</p>
              <button
                onClick={() => handleNavigation('/admin')}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                  location.pathname.startsWith('/admin')
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-secondary"
                )}
              >
                <Settings className="w-5 h-5 flex-shrink-0" />
                <span className="flex-1 text-left">Admin Panel</span>
                <ChevronRight className="w-4 h-4 opacity-50" />
              </button>
            </div>
          )}

          {/* Other */}
          <div className="space-y-1">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider px-3 mb-2">Others</p>
            {otherItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                  isActive(item.path)
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-secondary"
                )}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                <span className="flex-1 text-left">{item.title}</span>
                <ChevronRight className="w-4 h-4 opacity-50" />
              </button>
            ))}
          </div>
        </nav>

        {/* Footer */}
        <div className="p-3 border-t border-border">
          {user ? (
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors"
            >
              <LogOut className="w-5 h-5 flex-shrink-0" />
              <span>Logout</span>
            </button>
          ) : (
            <div className="space-y-2">
              <button
                onClick={() => handleNavigation('/login')}
                className="w-full bg-primary text-primary-foreground px-4 py-2.5 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity"
              >
                Login
              </button>
              <button
                onClick={() => handleNavigation('/register')}
                className="w-full bg-gradient-gold text-primary-foreground px-4 py-2.5 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity"
              >
                Register
              </button>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

export default HomeSidebar;
