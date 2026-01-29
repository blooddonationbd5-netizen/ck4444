import { forwardRef } from "react";
import { Menu, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useUserProfile } from "@/hooks/useUserProfile";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

const Header = forwardRef<HTMLElement>((_, ref) => {
  const { user } = useAuth();
  const { data: profile } = useUserProfile();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const handleRefreshBalance = async () => {
    await queryClient.invalidateQueries({ queryKey: ['user-profile'] });
    toast({
      title: "Refreshed",
      description: "Balance has been updated",
    });
  };

  return (
    <header ref={ref} className="bg-background px-4 py-3 flex items-center justify-between border-b border-border">
      {/* Left - Menu & Logo */}
      <div className="flex items-center gap-3">
        <button className="p-1">
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
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
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
  );
});

Header.displayName = "Header";

export default Header;
