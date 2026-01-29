import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import { Link } from "react-router-dom";
import {
  User,
  Wallet,
  ArrowDownToLine,
  ArrowUpFromLine,
  History,
  Gift,
  Settings,
  HelpCircle,
  LogOut,
  ChevronRight,
  Shield,
} from "lucide-react";

const menuItems = [
  {
    title: "ওয়ালেট",
    icon: Wallet,
    path: "/wallet",
    badge: "",
  },
  {
    title: "ডিপোজিট",
    icon: ArrowDownToLine,
    path: "/deposit",
    badge: "",
  },
  {
    title: "উইথড্র",
    icon: ArrowUpFromLine,
    path: "/withdraw",
    badge: "",
  },
  {
    title: "লেনদেনের ইতিহাস",
    icon: History,
    path: "/history",
    badge: "",
  },
  {
    title: "বোনাস",
    icon: Gift,
    path: "/bonus",
    badge: "নতুন",
  },
  {
    title: "নিরাপত্তা",
    icon: Shield,
    path: "/security",
    badge: "",
  },
  {
    title: "সেটিংস",
    icon: Settings,
    path: "/settings",
    badge: "",
  },
  {
    title: "সাহায্য",
    icon: HelpCircle,
    path: "/help",
    badge: "",
  },
];

const Member = () => {
  return (
    <div className="min-h-screen bg-background pb-24">
      <Header />
      
      <div className="px-4 py-4">
        {/* Profile Card */}
        <div className="bg-gradient-teal rounded-xl p-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-gold flex items-center justify-center border-2 border-primary">
              <User className="w-8 h-8 text-primary-foreground" />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-bold text-foreground">অতিথি ব্যবহারকারী</h2>
              <p className="text-sm text-muted-foreground">ID: CK44GUEST</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="bg-primary/20 text-primary text-xs px-2 py-0.5 rounded-full">
                  সিলভার মেম্বার
                </span>
              </div>
            </div>
          </div>

          {/* Balance */}
          <div className="mt-6 p-4 bg-card/50 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">মোট ব্যালেন্স</p>
                <p className="text-2xl font-bold text-primary">৳০.৬৮</p>
              </div>
              <div className="flex gap-2">
                <Link
                  to="/deposit"
                  className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium"
                >
                  ডিপোজিট
                </Link>
                <Link
                  to="/withdraw"
                  className="bg-secondary text-foreground px-4 py-2 rounded-lg text-sm font-medium"
                >
                  উইথড্র
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          {menuItems.map((item, index) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center justify-between p-4 hover:bg-secondary/50 transition-colors ${
                index !== menuItems.length - 1 ? "border-b border-border" : ""
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <span className="text-foreground font-medium">{item.title}</span>
                {item.badge && (
                  <span className="bg-destructive text-destructive-foreground text-xs px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </Link>
          ))}
        </div>

        {/* Logout Button */}
        <button className="w-full mt-4 flex items-center justify-center gap-2 p-4 bg-destructive/10 text-destructive rounded-xl hover:bg-destructive/20 transition-colors">
          <LogOut className="w-5 h-5" />
          <span className="font-medium">লগ আউট</span>
        </button>
      </div>

      <BottomNav />
    </div>
  );
};

export default Member;
