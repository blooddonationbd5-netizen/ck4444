import { ChevronLeft, Copy, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BottomNav from "@/components/BottomNav";
import { usePaymentMethods } from "@/hooks/usePaymentMethods";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

const Deposit = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data: paymentMethods, isLoading } = usePaymentMethods();
  const { toast } = useToast();
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [amount, setAmount] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [copied, setCopied] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const selectedPayment = paymentMethods?.find(p => p.id === selectedMethod);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast({ title: 'Copied!', description: 'Account number copied to clipboard' });
  };

  const handleSubmit = async () => {
    if (!user || !selectedMethod || !amount || !transactionId) {
      toast({ title: 'Error', description: 'Please fill in all fields', variant: 'destructive' });
      return;
    }

    setSubmitting(true);
    const { error } = await supabase.from('transactions').insert({
      user_id: user.id,
      type: 'deposit',
      amount: parseFloat(amount),
      method: selectedPayment?.name,
      reference_id: transactionId,
      status: 'pending',
    });
    setSubmitting(false);

    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Success', description: 'Deposit request submitted successfully' });
      navigate('/deposit-record');
    }
  };

  const quickAmounts = [500, 1000, 2000, 5000, 10000];

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="bg-card border-b border-border px-4 py-4">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="text-foreground">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-bold text-foreground">Deposit</h1>
        </div>
      </div>

      <div className="px-4 py-4 space-y-4">
        {/* Payment Methods */}
        <div>
          <h3 className="text-sm text-muted-foreground mb-3">Select Payment Method</h3>
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
            {/* Account Details */}
            <div className="bg-card border border-border rounded-xl p-4">
              <p className="text-xs text-muted-foreground mb-2">Send money to this account</p>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-foreground">{selectedPayment.account_number}</span>
                <button 
                  onClick={() => handleCopy(selectedPayment.account_number || '')}
                  className="p-2 text-primary"
                >
                  {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                </button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Min: ৳{selectedPayment.min_amount} | Max: ৳{selectedPayment.max_amount}
              </p>
            </div>

            {/* Amount Input */}
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
              </div>
            </div>

            {/* Transaction ID */}
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Transaction ID / Reference</label>
              <Input
                value={transactionId}
                onChange={(e) => setTransactionId(e.target.value)}
                placeholder="Enter transaction ID"
              />
            </div>

            {/* Submit */}
            <Button 
              onClick={handleSubmit} 
              disabled={submitting}
              className="w-full"
            >
              {submitting ? 'Submitting...' : 'Submit Deposit Request'}
            </Button>
          </>
        )}
      </div>

      <BottomNav />
    </div>
  );
};

export default Deposit;
