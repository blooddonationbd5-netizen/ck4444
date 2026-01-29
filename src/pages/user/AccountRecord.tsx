import { ChevronLeft, FileText, ArrowDownToLine, ArrowUpFromLine, Gift, Coins } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BottomNav from "@/components/BottomNav";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";

const AccountRecord = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const { data: transactions, isLoading } = useQuery({
    queryKey: ['account-records', user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(50);
      
      if (error) throw error;
      return data || [];
    },
    enabled: !!user,
  });

  const getIcon = (type: string) => {
    switch (type) {
      case 'deposit': return <ArrowDownToLine className="w-5 h-5 text-green-500" />;
      case 'withdraw': return <ArrowUpFromLine className="w-5 h-5 text-destructive" />;
      case 'bonus': return <Gift className="w-5 h-5 text-primary" />;
      case 'rebate': return <Coins className="w-5 h-5 text-yellow-500" />;
      default: return <FileText className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const getAmountColor = (type: string) => {
    switch (type) {
      case 'deposit':
      case 'bonus':
      case 'rebate':
      case 'win':
        return 'text-green-500';
      case 'withdraw':
      case 'bet':
        return 'text-destructive';
      default:
        return 'text-foreground';
    }
  };

  const getAmountPrefix = (type: string) => {
    switch (type) {
      case 'deposit':
      case 'bonus':
      case 'rebate':
      case 'win':
        return '+';
      case 'withdraw':
      case 'bet':
        return '-';
      default:
        return '';
    }
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="bg-card border-b border-border px-4 py-4">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="text-foreground">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-bold text-foreground">Account Record</h1>
        </div>
      </div>

      <div className="px-4 py-4">
        {isLoading ? (
          <div className="text-center py-8 text-muted-foreground">Loading...</div>
        ) : transactions && transactions.length > 0 ? (
          <div className="space-y-3">
            {transactions.map((tx) => (
              <div key={tx.id} className="bg-card border border-border rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                    {getIcon(tx.type)}
                  </div>
                  <div className="flex-1">
                    <p className="text-foreground font-medium capitalize">{tx.type}</p>
                    <p className="text-xs text-muted-foreground">
                      {format(new Date(tx.created_at!), 'MMM dd, yyyy HH:mm')}
                    </p>
                  </div>
                  <span className={`font-bold ${getAmountColor(tx.type)}`}>
                    {getAmountPrefix(tx.type)} ৳ {tx.amount.toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <FileText className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No records found</p>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
};

export default AccountRecord;
