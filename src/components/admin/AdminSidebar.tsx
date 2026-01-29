import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Receipt,
  FileText,
  User,
  Users,
  Settings,
  Gamepad2,
  ChevronDown,
  ChevronRight,
  Gift,
  Wallet,
  ArrowDownToLine,
  ArrowUpFromLine,
  UserCheck,
  UserPlus,
  CreditCard,
  Link2,
  Bell,
  Image,
  LinkIcon,
  ImageIcon,
  Megaphone,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface MenuItem {
  title: string;
  icon: React.ElementType;
  path?: string;
  children?: { title: string; icon: React.ElementType; path: string }[];
}

const menuItems: MenuItem[] = [
  { title: "Dashboard", icon: LayoutDashboard, path: "/admin" },
  {
    title: "Manage Transaction",
    icon: Receipt,
    children: [
      { title: "Transaction", icon: Receipt, path: "/admin/transactions" },
      { title: "Bonus", icon: Gift, path: "/admin/bonus" },
      { title: "Deposit", icon: ArrowDownToLine, path: "/admin/deposit" },
      { title: "Withdrawals", icon: ArrowUpFromLine, path: "/admin/withdrawals" },
      { title: "Affiliate Resale List", icon: UserCheck, path: "/admin/affiliate-resale" },
    ],
  },
  { title: "My Report", icon: FileText, path: "/admin/reports" },
  { title: "Profile", icon: User, path: "/admin/profile" },
  {
    title: "User Management",
    icon: Users,
    children: [
      { title: "Player", icon: Users, path: "/admin/players" },
      { title: "Agent", icon: UserPlus, path: "/admin/agents" },
      { title: "E-Wallet", icon: Wallet, path: "/admin/e-wallet" },
      { title: "Affiliate", icon: Link2, path: "/admin/affiliates" },
      { title: "Super Affiliate", icon: UserCheck, path: "/admin/super-affiliates" },
    ],
  },
  {
    title: "Site Configuration",
    icon: Settings,
    children: [
      { title: "Notice", icon: Bell, path: "/admin/notice" },
      { title: "Payment Method", icon: CreditCard, path: "/admin/payment-methods" },
      { title: "Sliders", icon: Image, path: "/admin/sliders" },
      { title: "Social Link", icon: LinkIcon, path: "/admin/social-links" },
      { title: "Logo and Icon", icon: ImageIcon, path: "/admin/logo-icon" },
      { title: "Promotion", icon: Megaphone, path: "/admin/promotions" },
    ],
  },
  { title: "General Setting", icon: Settings, path: "/admin/settings" },
  { title: "Game API Setup", icon: Gamepad2, path: "/admin/game-api" },
];

const AdminSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [openMenus, setOpenMenus] = useState<string[]>(["Manage Transaction"]);
  const location = useLocation();

  const toggleMenu = (title: string) => {
    setOpenMenus((prev) =>
      prev.includes(title)
        ? prev.filter((t) => t !== title)
        : [...prev, title]
    );
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-card rounded-lg border border-border"
      >
        {collapsed ? <Menu className="w-5 h-5" /> : <X className="w-5 h-5" />}
      </button>

      {/* Overlay for mobile */}
      {!collapsed && (
        <div
          className="lg:hidden fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
          onClick={() => setCollapsed(true)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed lg:static inset-y-0 left-0 z-50 flex flex-col bg-card border-r border-border transition-all duration-300",
          collapsed ? "-translate-x-full lg:translate-x-0 lg:w-16" : "translate-x-0 w-64"
        )}
      >
        {/* Header */}
        <div className="p-4 border-b border-border flex items-center justify-between">
          {!collapsed && (
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-gradient-gold">CK44</span>
              <span className="text-sm text-muted-foreground">Admin</span>
            </div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:block p-1.5 hover:bg-secondary rounded-lg transition-colors"
          >
            <Menu className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          {menuItems.map((item) => (
            <div key={item.title}>
              {item.children ? (
                <>
                  <button
                    onClick={() => toggleMenu(item.title)}
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                      "hover:bg-secondary text-muted-foreground hover:text-foreground",
                      openMenus.includes(item.title) && "bg-secondary/50 text-foreground"
                    )}
                  >
                    <item.icon className="w-5 h-5 flex-shrink-0" />
                    {!collapsed && (
                      <>
                        <span className="flex-1 text-left">{item.title}</span>
                        {openMenus.includes(item.title) ? (
                          <ChevronDown className="w-4 h-4" />
                        ) : (
                          <ChevronRight className="w-4 h-4" />
                        )}
                      </>
                    )}
                  </button>
                  {!collapsed && openMenus.includes(item.title) && (
                    <div className="ml-4 mt-1 space-y-1 border-l border-border pl-3">
                      {item.children.map((child) => (
                        <NavLink
                          key={child.path}
                          to={child.path}
                          onClick={() => setCollapsed(true)}
                          className={cn(
                            "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
                            isActive(child.path)
                              ? "bg-primary text-primary-foreground"
                              : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                          )}
                        >
                          <child.icon className="w-4 h-4" />
                          <span>{child.title}</span>
                        </NavLink>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <NavLink
                  to={item.path!}
                  onClick={() => setCollapsed(true)}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                    isActive(item.path!)
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  )}
                >
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  {!collapsed && <span>{item.title}</span>}
                </NavLink>
              )}
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default AdminSidebar;
