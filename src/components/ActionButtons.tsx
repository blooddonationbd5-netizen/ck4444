import { Plus, Coins } from "lucide-react";

const ActionButtons = () => {
  return (
    <div className="px-3 pb-3">
      <div className="flex gap-3">
        {/* Deposit Button */}
        <button className="flex-1 bg-teal-card border border-border rounded-xl py-3 px-4 flex items-center justify-center gap-2 hover:border-primary transition-colors">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
            <Plus className="w-5 h-5 text-primary" />
          </div>
          <span className="text-primary font-semibold">Deposit</span>
        </button>

        {/* Withdraw Button */}
        <button className="flex-1 bg-teal-card border border-border rounded-xl py-3 px-4 flex items-center justify-center gap-2 hover:border-primary transition-colors">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
            <Coins className="w-5 h-5 text-primary" />
          </div>
          <span className="text-primary font-semibold">Withdraw</span>
        </button>
      </div>
    </div>
  );
};

export default ActionButtons;
