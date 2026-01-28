import { Menu, RefreshCw } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-background px-4 py-3 flex items-center justify-between border-b border-border">
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

      {/* Right - Avatar & Balance */}
      <div className="flex items-center gap-3">
        {/* Avatar */}
        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary">
          <div className="w-full h-full bg-gradient-gold flex items-center justify-center">
            <span className="text-primary-foreground font-bold">U</span>
          </div>
        </div>

        {/* Balance */}
        <div className="flex items-center gap-1 bg-secondary rounded-full px-3 py-1.5">
          <span className="text-primary font-bold">৳</span>
          <span className="text-foreground font-semibold text-sm">0.68</span>
          <RefreshCw className="w-4 h-4 text-muted-foreground ml-1" />
        </div>
      </div>
    </header>
  );
};

export default Header;
