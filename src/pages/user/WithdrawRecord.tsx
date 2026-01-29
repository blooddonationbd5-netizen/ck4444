import { ChevronLeft, ArrowUpFromLine } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BottomNav from "@/components/BottomNav";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";

const WithdrawRecord = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const { data: withdrawals, isLoading } = useQuery({
    queryKey: ['withdraw-records', user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .eq('user_id', user.id)
        .eq('type', 'withdraw')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    },
    enabled: !!user,
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-500 bg-green-500/10';
      case 'pending': return 'text-yellow-500 bg-yellow-500/10';
      case 'rejected': return 'text-destructive bg-destructive/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="bg-card border-b border-border px-4 py-4">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="text-foreground">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-bold text-foreground">Withdrawal Record</h1>
        </div>
      </div>

      <div className="px-4 py-4">
        {isLoading ? (
          <div className="text-center py-8 text-muted-foreground">Loading...</div>
        ) : withdrawals && withdrawals.length > 0 ? (
          <div className="space-y-3">
            {withdrawals.map((withdraw) => (
              <div key={withdraw.id} className="bg-card border border-border rounded-xl p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center">
                    <ArrowUpFromLine className="w-5 h-5 text-destructive" />
                  </div>
                  <div className="flex-1">
                    <p className="text-foreground font-medium">{withdraw.method || 'Withdrawal'}</p>
                    <p className="text-xs text-muted-foreground">
                      {format(new Date(withdraw.created_at!), 'MMM dd, yyyy HH:mm')}
                    </p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(withdraw.status || '')}`}>
                    {withdraw.status?.toUpperCase()}
                  </span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-border">
                  <span className="text-muted-foreground text-sm">Amount</span>
                  <span className="text-destructive font-bold text-lg">- ৳ {withdraw.amount.toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <ArrowUpFromLine className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No withdrawal records found</p>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
};

export default WithdrawRecord;
