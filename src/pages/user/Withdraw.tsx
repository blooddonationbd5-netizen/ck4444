import { ChevronLeft, Wallet } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BottomNav from "@/components/BottomNav";
import { usePaymentMethods } from "@/hooks/usePaymentMethods";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useUserProfile } from "@/hooks/useUserProfile";

const Withdraw = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data: profile } = useUserProfile();
  const { data: paymentMethods, isLoading } = usePaymentMethods();
  const { toast } = useToast();
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [amount, setAmount] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountName, setAccountName] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const selectedPayment = paymentMethods?.find(p => p.id === selectedMethod);
  const balance = profile?.balance || 0;

  const handleSubmit = async () => {
    if (!user || !selectedMethod || !amount || !accountNumber) {
      toast({ title: 'Error', description: 'Please fill in all fields', variant: 'destructive' });
      return;
    }

    const withdrawAmount = parseFloat(amount);
    if (withdrawAmount > balance) {
      toast({ title: 'Error', description: 'Insufficient balance', variant: 'destructive' });
      return;
    }

    setSubmitting(true);
    const { error } = await supabase.from('transactions').insert({
      user_id: user.id,
      type: 'withdraw',
      amount: withdrawAmount,
      method: selectedPayment?.name,
      notes: `Account: ${accountNumber} | Name: ${accountName}`,
      status: 'pending',
    });
    setSubmitting(false);

    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Success', description: 'Withdrawal request submitted' });
      navigate('/withdraw-record');
    }
  };

  const quickAmounts = [500, 1000, 2000, 5000];

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="bg-card border-b border-border px-4 py-4">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="text-foreground">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-bold text-foreground">Withdraw</h1>
        </div>
      </div>

      <div className="px-4 py-4 space-y-4">
        {/* Balance Card */}
        <div className="bg-gradient-to-r from-primary/20 to-primary/10 border border-primary/30 rounded-xl p-3">
          <div className="flex items-center gap-2">
            <Wallet className="w-6 h-6 text-primary flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="text-xs text-muted-foreground whitespace-nowrap">Available Balance</p>
              <p className="text-xl font-bold text-foreground whitespace-nowrap">৳ {balance.toFixed(2)}</p>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div>
          <h3 className="text-sm text-muted-foreground mb-3">Withdraw To</h3>
          {isLoading ? (
            <div className="text-center py-4 text-muted-foreground">Loading...</div>
          ) : (
            <div className="grid grid-cols-3 gap-3">
              {paymentMethods?.map((method) => (
                <button
                  key={method.id}
                  onClick={() => setSelectedMethod(method.id)}
                  className={`p-3 rounded-xl border transition-all ${
                    selectedMethod === method.id 
                      ? 'border-primary bg-primary/10' 
                      : 'border-border bg-card'
                  }`}
                >
                  {method.logo_url ? (
                    <img src={method.logo_url} alt={method.name} className="w-10 h-10 mx-auto mb-2 object-contain" />
                  ) : (
                    <div className="w-10 h-10 bg-muted rounded-full mx-auto mb-2" />
                  )}
                  <p className="text-xs text-foreground font-medium truncate">{method.name}</p>
                </button>
              ))}
            </div>
          )}
        </div>

        {selectedPayment && (
          <>
            {/* Amount */}
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Amount</label>
              <Input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                className="text-lg"
              />
              <div className="flex gap-2 mt-3 flex-wrap">
                {quickAmounts.map((amt) => (
                  <button
                    key={amt}
                    onClick={() => setAmount(amt.toString())}
                    className="px-4 py-2 bg-muted rounded-lg text-sm font-medium text-foreground"
                  >
                    ৳{amt}
                  </button>
                ))}
                <button
                  onClick={() => setAmount(balance.toString())}
                  className="px-4 py-2 bg-primary/10 text-primary rounded-lg text-sm font-medium"
                >
                  Max
                </button>
              </div>
            </div>

            {/* Account Details */}
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Account Number</label>
              <Input
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                placeholder="Enter your account number"
              />
            </div>

            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Account Name</label>
              <Input
                value={accountName}
                onChange={(e) => setAccountName(e.target.value)}
                placeholder="Enter account holder name"
              />
            </div>

            {/* Submit */}
            <Button 
              onClick={handleSubmit} 
              disabled={submitting}
              className="w-full"
            >
              {submitting ? 'Submitting...' : 'Submit Withdrawal Request'}
            </Button>
          </>
        )}
      </div>

      <BottomNav />
    </div>
  );
};

export default Withdraw;
