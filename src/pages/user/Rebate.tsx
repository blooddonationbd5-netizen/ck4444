import { ChevronLeft, Coins, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BottomNav from "@/components/BottomNav";
import { Button } from "@/components/ui/button";

const Rebate = () => {
  const navigate = useNavigate();

  const rebateHistory = [
    { id: 1, date: '2024-01-28', amount: 50.00, betAmount: 5000 },
    { id: 2, date: '2024-01-27', amount: 35.50, betAmount: 3550 },
    { id: 3, date: '2024-01-26', amount: 42.00, betAmount: 4200 },
  ];

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="bg-card border-b border-border px-4 py-4">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="text-foreground">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-bold text-foreground">Rebate</h1>
        </div>
      </div>

      <div className="px-4 py-4 space-y-4">
        {/* Available Rebate */}
        <div className="bg-gradient-to-r from-primary/20 to-primary/10 border border-primary/30 rounded-xl p-6 text-center">
          <Coins className="w-12 h-12 text-primary mx-auto mb-3" />
          <p className="text-muted-foreground text-sm mb-1">Available Rebate</p>
          <p className="text-3xl font-bold text-foreground mb-4">৳ 127.50</p>
          <Button className="w-full bg-primary">Claim Rebate</Button>
        </div>

        {/* Rebate Rate */}
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="flex items-center gap-3 mb-3">
            <TrendingUp className="w-5 h-5 text-primary" />
            <span className="text-foreground font-medium">Your Rebate Rate</span>
          </div>
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="bg-muted rounded-lg p-3">
              <p className="text-xs text-muted-foreground">Sports</p>
              <p className="text-lg font-bold text-primary">1.0%</p>
            </div>
            <div className="bg-muted rounded-lg p-3">
              <p className="text-xs text-muted-foreground">Casino</p>
              <p className="text-lg font-bold text-primary">0.8%</p>
            </div>
            <div className="bg-muted rounded-lg p-3">
              <p className="text-xs text-muted-foreground">Slots</p>
              <p className="text-lg font-bold text-primary">1.2%</p>
            </div>
          </div>
        </div>

        {/* Rebate History */}
        <div>
          <h3 className="text-foreground font-medium mb-3">Rebate History</h3>
          <div className="space-y-3">
            {rebateHistory.map((item) => (
              <div key={item.id} className="bg-card border border-border rounded-xl p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-foreground font-medium">৳ {item.amount.toFixed(2)}</p>
                    <p className="text-xs text-muted-foreground">Bet: ৳ {item.betAmount.toLocaleString()}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{item.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Rebate;
