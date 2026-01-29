import { ChevronLeft, TrendingUp, TrendingDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BottomNav from "@/components/BottomNav";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const ProfitLoss = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const { data: summary, isLoading } = useQuery({
    queryKey: ['profit-loss', user?.id],
    queryFn: async () => {
      if (!user) return { totalDeposit: 0, totalWithdraw: 0, totalBet: 0, totalWin: 0 };
      
      const { data: transactions } = await supabase
        .from('transactions')
        .select('type, amount, status')
        .eq('user_id', user.id);
      
      const totals = {
        totalDeposit: 0,
        totalWithdraw: 0,
        totalBet: 0,
        totalWin: 0,
      };

      transactions?.forEach((t) => {
        if (t.type === 'deposit' && t.status === 'completed') totals.totalDeposit += t.amount;
        if (t.type === 'withdraw' && t.status === 'completed') totals.totalWithdraw += t.amount;
        if (t.type === 'bet') totals.totalBet += t.amount;
        if (t.type === 'win') totals.totalWin += t.amount;
      });

      return totals;
    },
    enabled: !!user,
  });

  const netProfit = (summary?.totalWin || 0) - (summary?.totalBet || 0);

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="bg-card border-b border-border px-4 py-4">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="text-foreground">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-bold text-foreground">Profit & Loss</h1>
        </div>
      </div>

      <div className="px-4 py-4 space-y-4">
        {/* Net Profit Card */}
        <div className="bg-card border border-border rounded-xl p-6 text-center">
          <p className="text-muted-foreground text-sm mb-2">Net Profit/Loss</p>
          <div className={`text-3xl font-bold flex items-center justify-center gap-2 ${
            netProfit >= 0 ? 'text-green-500' : 'text-destructive'
          }`}>
            {netProfit >= 0 ? <TrendingUp className="w-6 h-6" /> : <TrendingDown className="w-6 h-6" />}
            ৳ {Math.abs(netProfit).toFixed(2)}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-card border border-border rounded-xl p-4">
            <p className="text-muted-foreground text-xs mb-1">Total Deposit</p>
            <p className="text-foreground font-bold text-lg">৳ {(summary?.totalDeposit || 0).toFixed(2)}</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-4">
            <p className="text-muted-foreground text-xs mb-1">Total Withdraw</p>
            <p className="text-foreground font-bold text-lg">৳ {(summary?.totalWithdraw || 0).toFixed(2)}</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-4">
            <p className="text-muted-foreground text-xs mb-1">Total Bet</p>
            <p className="text-foreground font-bold text-lg">৳ {(summary?.totalBet || 0).toFixed(2)}</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-4">
            <p className="text-muted-foreground text-xs mb-1">Total Win</p>
            <p className="text-foreground font-bold text-lg">৳ {(summary?.totalWin || 0).toFixed(2)}</p>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default ProfitLoss;
