import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, Download, Loader2 } from "lucide-react";
import { useTransactions } from "@/hooks/useTransactions";
import { format } from "date-fns";

const Transactions = () => {
  const { data: transactions, isLoading } = useTransactions();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Transactions</h1>
          <p className="text-muted-foreground">Manage all transactions</p>
        </div>
        <Button className="bg-primary text-primary-foreground">
          <Download className="w-4 h-4 mr-2" /> Export
        </Button>
      </div>

      <Card className="bg-card border-border">
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search transactions..." className="pl-10" />
            </div>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" /> Filter
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            {!transactions || transactions.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">No transactions yet</p>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">ID</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Type</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Amount</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Method</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((tx) => (
                    <tr key={tx.id} className="border-b border-border/50 hover:bg-secondary/30">
                      <td className="py-3 px-4 text-sm font-mono text-foreground">
                        {tx.id.slice(0, 8)}...
                      </td>
                      <td className="py-3 px-4">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          tx.type === "deposit" ? "bg-green-500/20 text-green-500" :
                          tx.type === "withdraw" ? "bg-yellow-500/20 text-yellow-500" :
                          "bg-primary/20 text-primary"
                        }`}>
                          {tx.type}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm font-medium text-foreground">
                        ৳{Number(tx.amount).toLocaleString()}
                      </td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">
                        {tx.method || 'N/A'}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          tx.status === "completed" ? "bg-green-500/20 text-green-500" :
                          tx.status === "pending" ? "bg-yellow-500/20 text-yellow-500" :
                          "bg-muted text-muted-foreground"
                        }`}>
                          {tx.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">
                        {format(new Date(tx.created_at), 'dd MMM, HH:mm')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Transactions;
