import { Wallet, Gift, Users, Headphones, Download, Share2 } from "lucide-react";

const actions = [
  { icon: Wallet, label: "ডিপোজিট", color: "text-primary" },
  { icon: Gift, label: "বোনাস", color: "text-primary" },
  { icon: Users, label: "রেফারেল", color: "text-accent" },
  { icon: Headphones, label: "সাপোর্ট", color: "text-success" },
  { icon: Download, label: "অ্যাপ", color: "text-neon-purple" },
  { icon: Share2, label: "শেয়ার", color: "text-warning" },
];

const QuickActions = () => {
  return (
    <div className="px-4 py-2">
      <div className="grid grid-cols-6 gap-2">
        {actions.map((action, index) => (
          <button
            key={index}
            className="flex flex-col items-center gap-1 p-2 rounded-xl bg-card hover:bg-secondary transition-colors group"
          >
            <div className={`p-2 rounded-full bg-secondary group-hover:scale-110 transition-transform`}>
              <action.icon className={`w-5 h-5 ${action.color}`} />
            </div>
            <span className="text-[10px] sm:text-xs text-muted-foreground font-medium">
              {action.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
