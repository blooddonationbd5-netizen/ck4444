import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import { Trophy, Gift, CheckCircle, Star, Loader2 } from "lucide-react";
import { useBonuses } from "@/hooks/useBonuses";

const Reward = () => {
  const { data: bonuses, isLoading } = useBonuses();
  
  // Filter active bonuses
  const activeBonuses = bonuses?.filter(b => b.is_active) || [];

  return (
    <div className="min-h-screen bg-background pb-24">
      <Header />
      
      <div className="px-4 py-4">
        {/* Points Summary */}
        <div className="bg-gradient-teal rounded-xl p-6 mb-6 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-gold flex items-center justify-center">
            <Trophy className="w-8 h-8 text-primary-foreground" />
          </div>
          <p className="text-muted-foreground text-sm mb-1">Your Points</p>
          <h1 className="text-3xl font-bold text-primary">150</h1>
          <div className="flex items-center justify-center gap-1 mt-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-4 h-4 ${
                  star <= 3 ? "fill-primary text-primary" : "text-muted-foreground"
                }`}
              />
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-2">Level 3 • Silver Member</p>
        </div>

        {/* Rewards List */}
        <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
          <Gift className="w-5 h-5 text-primary" />
          Available Rewards
        </h2>

        {isLoading ? (
          <div className="flex items-center justify-center h-40">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : activeBonuses.length === 0 ? (
          <div className="text-center py-8">
            <Gift className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No rewards available right now.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {activeBonuses.map((bonus) => (
              <div
                key={bonus.id}
                className="bg-card border border-border rounded-xl p-4 hover:border-primary transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="text-foreground font-semibold">{bonus.name}</h3>
                    <p className="text-muted-foreground text-sm mt-1">
                      {bonus.description || `Get ${bonus.amount} bonus!`}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-primary font-bold">{bonus.amount}</span>
                    <p className="text-xs text-muted-foreground">{bonus.type}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center gap-1 text-xs">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-green-500">Active</span>
                    {bonus.max_amount && (
                      <span className="ml-2 text-muted-foreground">Max: {bonus.max_amount}</span>
                    )}
                  </div>
                  <button className="bg-primary text-primary-foreground px-4 py-1.5 rounded-full text-sm font-medium">
                    Claim
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
};

export default Reward;
