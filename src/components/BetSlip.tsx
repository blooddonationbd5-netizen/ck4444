import { useState } from "react";
import { X, Trash2, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { usePlaceBet } from "@/hooks/useBets";
import { useUserProfile } from "@/hooks/useUserProfile";
import { useNavigate } from "react-router-dom";

export interface BetSelection {
  id: string;
  sport: string;
  matchId: string;
  team1: string;
  team2: string;
  selection: string;
  selectionLabel: string;
  odds: number;
}

interface BetSlipProps {
  isOpen: boolean;
  onClose: () => void;
  selections: BetSelection[];
  onRemoveSelection: (id: string) => void;
  onClearAll: () => void;
}

const BetSlip = ({
  isOpen,
  onClose,
  selections,
  onRemoveSelection,
  onClearAll,
}: BetSlipProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { data: profile } = useUserProfile();
  const placeBet = usePlaceBet();
  const [amounts, setAmounts] = useState<Record<string, string>>({});

  const handleAmountChange = (id: string, value: string) => {
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setAmounts((prev) => ({ ...prev, [id]: value }));
    }
  };

  const getAmount = (id: string): number => {
    return parseFloat(amounts[id] || "0") || 0;
  };

  const getPotentialWin = (selection: BetSelection): number => {
    return getAmount(selection.id) * selection.odds;
  };

  const getTotalStake = (): number => {
    return selections.reduce((sum, sel) => sum + getAmount(sel.id), 0);
  };

  const getTotalPotentialWin = (): number => {
    return selections.reduce((sum, sel) => sum + getPotentialWin(sel), 0);
  };

  const handlePlaceBets = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    const balance = profile?.balance || 0;
    const totalStake = getTotalStake();

    if (totalStake > balance) {
      navigate("/deposit");
      return;
    }

    for (const selection of selections) {
      const amount = getAmount(selection.id);
      if (amount > 0) {
        await placeBet.mutateAsync({
          sport: selection.sport,
          match_id: selection.matchId,
          team1: selection.team1,
          team2: selection.team2,
          selection: selection.selection,
          odds: selection.odds,
          amount: amount,
        });
      }
    }

    onClearAll();
    setAmounts({});
  };

  const canPlaceBet = selections.some((sel) => getAmount(sel.id) > 0);

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          onClick={onClose}
        />
      )}

      {/* Bet Slip Panel */}
      <div
        className={cn(
          "fixed bottom-0 left-0 right-0 z-[110] bg-card border-t border-border rounded-t-2xl transform transition-transform duration-300 ease-in-out max-h-[80vh] overflow-hidden flex flex-col",
          isOpen ? "translate-y-0" : "translate-y-full"
        )}
      >
        {/* Header */}
        <div className="p-4 border-b border-border flex items-center justify-between bg-secondary/50">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-foreground">Bet Slip</h3>
            <span className="bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full">
              {selections.length}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {selections.length > 0 && (
              <button
                onClick={onClearAll}
                className="text-xs text-destructive hover:underline"
              >
                Clear All
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 hover:bg-secondary rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
        </div>

        {/* Selections */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {selections.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No selections added</p>
              <p className="text-sm text-muted-foreground mt-1">
                Click on odds to add selections
              </p>
            </div>
          ) : (
            selections.map((selection) => (
              <div
                key={selection.id}
                className="bg-secondary rounded-xl p-3 border border-border"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground capitalize">
                      {selection.sport}
                    </p>
                    <p className="text-sm font-medium text-foreground">
                      {selection.team1} vs {selection.team2}
                    </p>
                    <p className="text-sm text-primary font-semibold">
                      {selection.selectionLabel} @ {selection.odds.toFixed(2)}
                    </p>
                  </div>
                  <button
                    onClick={() => onRemoveSelection(selection.id)}
                    className="p-1 hover:bg-destructive/20 rounded transition-colors"
                  >
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex-1">
                    <input
                      type="text"
                      inputMode="decimal"
                      placeholder="Amount"
                      value={amounts[selection.id] || ""}
                      onChange={(e) =>
                        handleAmountChange(selection.id, e.target.value)
                      }
                      className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">To Win</p>
                    <p className="text-sm font-bold text-success">
                      ৳{getPotentialWin(selection).toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* Quick amounts */}
                <div className="flex gap-2 mt-2">
                  {[100, 500, 1000, 5000].map((amt) => (
                    <button
                      key={amt}
                      onClick={() =>
                        handleAmountChange(selection.id, amt.toString())
                      }
                      className="flex-1 py-1 text-xs bg-muted hover:bg-muted/80 rounded transition-colors text-foreground"
                    >
                      ৳{amt}
                    </button>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {selections.length > 0 && (
          <div className="p-4 border-t border-border bg-secondary/30">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-muted-foreground">Total Stake</span>
              <span className="font-bold text-foreground">
                ৳{getTotalStake().toFixed(2)}
              </span>
            </div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-muted-foreground">
                Potential Win
              </span>
              <span className="font-bold text-success">
                ৳{getTotalPotentialWin().toFixed(2)}
              </span>
            </div>

            {!user ? (
              <button
                onClick={() => navigate("/login")}
                className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity"
              >
                Login to Place Bet
              </button>
            ) : (
              <button
                onClick={handlePlaceBets}
                disabled={!canPlaceBet || placeBet.isPending}
                className="w-full bg-gradient-gold text-primary-foreground py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {placeBet.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Placing Bet...
                  </>
                ) : (
                  "Place Bet"
                )}
              </button>
            )}

            {user && profile && (
              <p className="text-xs text-center text-muted-foreground mt-2">
                Balance: ৳{profile.balance?.toFixed(2) || "0.00"}
              </p>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default BetSlip;
