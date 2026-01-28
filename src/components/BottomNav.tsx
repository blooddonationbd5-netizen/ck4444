import { Home, Gift, Wallet, Trophy, User } from "lucide-react";

const navItems = [
  { icon: Home, label: "হোম", active: true },
  { icon: Gift, label: "প্রোমো", active: false },
  { icon: Wallet, label: "ডিপোজিট", active: false, special: true },
  { icon: Trophy, label: "র‍্যাংক", active: false },
  { icon: User, label: "প্রোফাইল", active: false },
];

const BottomNav = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-t border-border safe-bottom">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item, index) => (
          <button
            key={index}
            className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all ${
              item.special
                ? "relative -mt-6"
                : item.active
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {item.special ? (
              <div className="p-4 rounded-full bg-gradient-gold shadow-gold animate-pulse-glow">
                <item.icon className="w-6 h-6 text-primary-foreground" />
              </div>
            ) : (
              <item.icon className={`w-6 h-6 ${item.active ? "glow-gold" : ""}`} />
            )}
            <span className={`text-[10px] font-medium ${item.special ? "mt-1" : ""}`}>
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;
