import { Menu } from "lucide-react";
import { Link } from "react-router-dom";

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

      {/* Right - Login & Register */}
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
    </header>
  );
};

export default Header;
