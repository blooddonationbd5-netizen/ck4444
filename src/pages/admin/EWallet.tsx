import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, Eye, Edit, Wallet } from "lucide-react";

const wallets = [
  { id: "EW001", user: "player123", provider: "bKash", number: "01712345678", balance: "৳15,000", status: "Verified" },
  { id: "EW002", user: "gamer456", provider: "Nagad", number: "01812345678", balance: "৳8,500", status: "Verified" },
  { id: "EW003", user: "user789", provider: "Rocket", number: "01912345678", balance: "৳25,000", status: "Pending" },
];

const EWallet = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">E-Wallet Management</h1>
        <p className="text-muted-foreground">Manage user e-wallets</p>
      </div>

      <Card className="bg-card border-border">
        <CardHeader>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search wallets..." className="pl-10" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">ID</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">User</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Provider</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Number</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Balance</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {wallets.map((wallet) => (
                  <tr key={wallet.id} className="border-b border-border/50 hover:bg-secondary/30">
                    <td className="py-3 px-4 text-sm font-mono text-foreground">{wallet.id}</td>
                    <td className="py-3 px-4 text-sm text-foreground">{wallet.user}</td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">{wallet.provider}</td>
                    <td className="py-3 px-4 text-sm font-mono text-muted-foreground">{wallet.number}</td>
                    <td className="py-3 px-4 text-sm font-medium text-primary">{wallet.balance}</td>
                    <td className="py-3 px-4">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        wallet.status === "Verified" ? "bg-success/20 text-success" : "bg-warning/20 text-warning"
                      }`}>
                        {wallet.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8"><Eye className="w-4 h-4" /></Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8"><Edit className="w-4 h-4" /></Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EWallet;
