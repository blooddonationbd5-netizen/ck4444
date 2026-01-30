import { useLocation, useNavigate } from "react-router-dom";
import {
  Flame,
  Users,
  Heart,
  Gift,
  Dices,
  Star,
  Spade,
  Coins,
  Diamond,
  Fish,
  Target,
  Trophy,
  Globe,
  Gamepad2,
  Download,
  CircleDot,
  MessageCircle,
  X,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";

interface HomeSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { title: "Hot Games", icon: Flame, path: "/", color: "text-orange-500" },
  { title: "Invite friends", icon: Users, path: "/invite", color: "text-blue-400" },
  { title: "Favorites", icon: Heart, path: "/favorites", color: "text-pink-500" },
  { title: "Promotion", icon: Gift, path: "/promotion", color: "text-yellow-500" },
  { title: "Slots", icon: Dices, path: "/slots", color: "text-purple-400" },
  { title: "Reward Center", icon: Star, path: "/reward", color: "text-yellow-400" },
  { title: "Live Casino", icon: Spade, path: "/live-casino", color: "text-red-500" },
  { title: "Manual rebate", icon: Coins, path: "/rebate", color: "text-green-400" },
  { title: "Poker", icon: Spade, path: "/poker", color: "text-blue-500" },
  { title: "VIP", icon: Diamond, path: "/vip", color: "text-cyan-400" },
  { title: "Fish", icon: Fish, path: "/fish", color: "text-teal-400" },
  { title: "Mission", icon: Target, path: "/mission", color: "text-orange-400" },
  { title: "Sports", icon: Trophy, path: "/sports", color: "text-green-500" },
  { title: "Language", icon: Globe, path: "/language", color: "text-blue-300" },
  { title: "E-sports", icon: Gamepad2, path: "/esports", color: "text-purple-500" },
  { title: "APP Download", icon: Download, path: "/download", color: "text-cyan-500" },
  { title: "Lottery", icon: CircleDot, path: "/lottery", color: "text-red-400" },
  { title: "Customer Service", icon: MessageCircle, path: "/support", color: "text-emerald-400" },
];

const HomeSidebar = ({ isOpen, onClose }: HomeSidebarProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

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
          "fixed inset-y-0 left-0 z-[110] w-[85%] max-w-sm bg-card border-r border-border transform transition-transform duration-300 ease-in-out flex flex-col",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Header */}
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-gradient-gold">CK44</span>
            <span className="text-xl font-bold text-foreground">.COM</span>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-secondary rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-muted-foreground" />
          </button>
        </div>

        {/* Grid Menu */}
        <nav className="flex-1 overflow-y-auto p-3">
          <div className="grid grid-cols-2 gap-3">
            {menuItems.map((item) => (
              <button
                key={item.path + item.title}
                onClick={() => handleNavigation(item.path)}
                className={cn(
                  "flex flex-col items-center justify-center gap-2 p-4 rounded-xl border transition-all duration-200",
                  "hover:scale-105 hover:brightness-110 active:scale-95",
                  isActive(item.path)
                    ? "bg-primary/20 border-primary"
                    : "bg-secondary border-border hover:border-primary/50"
                )}
              >
                <item.icon className={cn("w-8 h-8", item.color)} />
                <span className="text-xs font-medium text-foreground text-center leading-tight">
                  {item.title}
                </span>
              </button>
            ))}
          </div>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-border">
          {user ? (
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium text-destructive bg-destructive/10 hover:bg-destructive/20 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          ) : (
            <div className="flex gap-3">
              <button
                onClick={() => handleNavigation('/login')}
                className="flex-1 bg-secondary text-foreground px-4 py-3 rounded-xl text-sm font-semibold hover:bg-secondary/80 transition-colors"
              >
                Login
              </button>
              <button
                onClick={() => handleNavigation('/register')}
                className="flex-1 bg-gradient-gold text-primary-foreground px-4 py-3 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity"
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
