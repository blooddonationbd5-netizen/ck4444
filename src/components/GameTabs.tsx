import { Flame, Heart, Gamepad2 } from "lucide-react";

const tabs = [
  { id: "hot", label: "HOT GAMES", icon: Flame },
  { id: "favorites", label: "FAVORITES", icon: Heart },
  { id: "slots", label: "SLOTS", icon: Gamepad2 },
];

interface GameTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const GameTabs = ({ activeTab, onTabChange }: GameTabsProps) => {
  return (
    <div className="px-3 pb-2">
      <div className="flex gap-2 overflow-x-auto no-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all ${
              activeTab === tab.id
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-muted-foreground hover:text-foreground"
            }`}
          >
            <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? "text-primary-foreground" : "text-primary"}`} />
            <span className="text-sm font-medium">{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default GameTabs;
