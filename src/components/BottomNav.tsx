import { forwardRef } from "react";
import { Home, Gift, Users, Trophy, User } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";

const navItems = [
  { icon: Home, label: "Home", path: "/" },
  { icon: Gift, label: "Promotion", path: "/promotion" },
  { icon: Users, label: "Invite", path: "/invite", special: true },
  { icon: Trophy, label: "Reward", path: "/reward", badge: 15 },
  { icon: User, label: "Member", path: "/member" },
];

const BottomNav = forwardRef<HTMLElement>((_, ref) => {
  const location = useLocation();

  return (
    <nav ref={ref} className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border safe-bottom">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item, index) => {
          const isActive = location.pathname === item.path;
          
          return (
            <NavLink
              key={index}
              to={item.path}
              className={`flex flex-col items-center gap-1 px-3 py-2 transition-all ${
                item.special ? "relative -mt-6" : ""
              }`}
            >
              {item.special ? (
                <div className="p-4 rounded-full bg-gradient-gold shadow-gold animate-pulse-glow">
                  <item.icon className="w-7 h-7 text-primary-foreground" />
                </div>
              ) : (
                <div className="relative">
                  <item.icon 
                    className={`w-6 h-6 ${isActive ? "text-primary" : "text-muted-foreground"}`} 
                  />
                  {item.badge && (
                    <span className="absolute -top-2 -right-2 min-w-[18px] h-[18px] bg-destructive rounded-full text-[10px] flex items-center justify-center text-destructive-foreground font-bold px-1">
                      {item.badge}
                    </span>
                  )}
                </div>
              )}
              <span className={`text-[10px] font-medium ${isActive ? "text-primary" : "text-muted-foreground"}`}>
                {item.label}
              </span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
});

BottomNav.displayName = "BottomNav";

export default BottomNav;
