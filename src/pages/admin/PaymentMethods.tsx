import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Edit, Trash2, CreditCard, ToggleLeft, ToggleRight } from "lucide-react";

const paymentMethods = [
  { id: 1, name: "bKash", type: "Mobile Banking", number: "01712345678", minDeposit: "৳100", maxDeposit: "৳50,000", status: true },
  { id: 2, name: "Nagad", type: "Mobile Banking", number: "01812345678", minDeposit: "৳100", maxDeposit: "৳50,000", status: true },
  { id: 3, name: "Rocket", type: "Mobile Banking", number: "01912345678", minDeposit: "৳200", maxDeposit: "৳30,000", status: false },
  { id: 4, name: "USDT", type: "Crypto", number: "0x1234...abcd", minDeposit: "৳500", maxDeposit: "৳500,000", status: true },
];

const PaymentMethods = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Payment Methods</h1>
          <p className="text-muted-foreground">Configure deposit and withdrawal methods</p>
        </div>
        <Button className="bg-primary text-primary-foreground">
          <Plus className="w-4 h-4 mr-2" /> Add Method
        </Button>
      </div>

      <div className="grid gap-4">
        {paymentMethods.map((method) => (
          <Card key={method.id} className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-primary/10 rounded-xl">
                    <CreditCard className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">{method.name}</h3>
                    <p className="text-sm text-muted-foreground">{method.type}</p>
                  </div>
                </div>
                <div className="hidden sm:flex items-center gap-6 text-sm">
                  <div>
                    <span className="text-muted-foreground">Number: </span>
                    <span className="text-foreground font-mono">{method.number}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Min: </span>
                    <span className="text-foreground">{method.minDeposit}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Max: </span>
                    <span className="text-foreground">{method.maxDeposit}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    {method.status ? <ToggleRight className="w-5 h-5 text-success" /> : <ToggleLeft className="w-5 h-5 text-muted-foreground" />}
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8"><Edit className="w-4 h-4" /></Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive"><Trash2 className="w-4 h-4" /></Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PaymentMethods;
