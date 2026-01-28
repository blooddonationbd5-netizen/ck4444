import { Bell, User, Wallet } from "lucide-react";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="text-2xl font-bold">
            <span className="text-gradient-gold">77</span>
            <span className="text-primary">PG</span>
          </div>
        </div>

        {/* Balance */}
        <div className="flex items-center gap-2 bg-secondary rounded-full px-4 py-2">
          <Wallet className="w-4 h-4 text-primary" />
          <span className="text-sm font-semibold text-foreground">৳ 0.00</span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button className="relative p-2 rounded-full bg-secondary hover:bg-muted transition-colors">
            <Bell className="w-5 h-5 text-muted-foreground" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-destructive rounded-full text-[10px] flex items-center justify-center text-destructive-foreground font-bold">
              3
            </span>
          </button>
          <button className="p-2 rounded-full bg-secondary hover:bg-muted transition-colors">
            <User className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
