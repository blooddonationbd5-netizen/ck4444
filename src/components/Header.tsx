import { forwardRef, useState } from "react";
import { Menu, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useUserProfile } from "@/hooks/useUserProfile";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import HomeSidebar from "./HomeSidebar";

const Header = forwardRef<HTMLElement>((_, ref) => {
  const { user } = useAuth();
  const { data: profile } = useUserProfile();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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

  return (
    <>
      <header ref={ref} className="bg-background px-4 py-3 flex items-center justify-between border-b border-border">
        {/* Left - Menu & Logo */}
        <div className="flex items-center gap-3">
          <button 
            className="p-1 hover:bg-secondary rounded-lg transition-colors"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu className="w-6 h-6 text-foreground" />
          </button>
          <div className="flex items-center">
            <span className="text-xl font-bold text-gradient-gold">CK44</span>
            <span className="text-xl font-bold text-foreground">.COM</span>
          </div>
        </div>

        {/* Right - Conditional based on auth state */}
        {user ? (
          <div className="flex items-center gap-3">
            {/* Balance Display */}
            <div className="flex items-center gap-2 bg-card border border-border rounded-full px-3 py-1.5">
              <span className="text-sm font-bold text-primary">
                ৳ {(profile?.balance || 0).toFixed(2)}
              </span>
              <button 
                onClick={handleRefreshBalance}
                disabled={isRefreshing}
                className="text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              </button>
            </div>
            {/* Deposit Button */}
            <Link 
              to="/deposit"
              className="bg-gradient-gold text-primary-foreground px-4 py-1.5 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              Deposit
            </Link>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link 
              to="/login"
              className="bg-primary text-primary-foreground px-5 py-1.5 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              Login
            </Link>
            <Link 
              to="/register"
              className="bg-gradient-gold text-primary-foreground px-5 py-1.5 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              Register
            </Link>
          </div>
        )}
      </header>

      {/* Sidebar */}
      <HomeSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </>
  );
});

Header.displayName = "Header";

export default Header;
