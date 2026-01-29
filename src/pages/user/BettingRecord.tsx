import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BottomNav from "@/components/BottomNav";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";

const BettingRecord = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const { data: bets, isLoading } = useQuery({
    queryKey: ['betting-records', user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .eq('user_id', user.id)
        .eq('type', 'bet')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    },
    enabled: !!user,
  });

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="bg-card border-b border-border px-4 py-4">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="text-foreground">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-bold text-foreground">Betting Record</h1>
        </div>
      </div>

      <div className="px-4 py-4">
        {isLoading ? (
          <div className="text-center py-8 text-muted-foreground">Loading...</div>
        ) : bets && bets.length > 0 ? (
          <div className="space-y-3">
            {bets.map((bet) => (
              <div key={bet.id} className="bg-card border border-border rounded-xl p-4">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-sm text-muted-foreground">
                    {format(new Date(bet.created_at!), 'MMM dd, yyyy HH:mm')}
                  </span>
                  <span className={`text-sm font-medium ${
                    bet.status === 'win' ? 'text-green-500' : 
                    bet.status === 'loss' ? 'text-destructive' : 'text-muted-foreground'
                  }`}>
                    {bet.status?.toUpperCase()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground font-medium">Bet Amount</span>
                  <span className="text-foreground font-bold">৳ {bet.amount.toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-muted-foreground">No betting records found</p>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
};

export default BettingRecord;
