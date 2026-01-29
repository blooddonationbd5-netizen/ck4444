import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, Check, X, Loader2 } from "lucide-react";
import { useWithdrawals, useUpdateTransactionStatus } from "@/hooks/useTransactions";
import { format } from "date-fns";

const Withdrawals = () => {
  const { data: withdrawals, isLoading } = useWithdrawals();
  const updateStatus = useUpdateTransactionStatus();

  const handleApprove = (id: string) => {
    updateStatus.mutate({ id, status: 'completed' });
  };

  const handleReject = (id: string) => {
    updateStatus.mutate({ id, status: 'rejected' });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Withdrawal Requests</h1>
        <p className="text-muted-foreground">Manage withdrawal requests from users</p>
      </div>

      <Card className="bg-card border-border">
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search withdrawals..." className="pl-10" />
            </div>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" /> Filter
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            {!withdrawals || withdrawals.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">No withdrawal requests yet</p>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">ID</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Amount</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Method</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Date</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {withdrawals.map((wth) => (
                    <tr key={wth.id} className="border-b border-border/50 hover:bg-secondary/30">
                      <td className="py-3 px-4 text-sm font-mono text-foreground">
                        {wth.id.slice(0, 8)}...
                      </td>
                      <td className="py-3 px-4 text-sm font-medium text-yellow-500">
                        ৳{Number(wth.amount).toLocaleString()}
                      </td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">
                        {wth.method || 'N/A'}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          wth.status === "completed" ? "bg-green-500/20 text-green-500" :
                          wth.status === "pending" ? "bg-yellow-500/20 text-yellow-500" :
                          wth.status === "processing" ? "bg-primary/20 text-primary" :
                          "bg-destructive/20 text-destructive"
                        }`}>
                          {wth.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">
                        {format(new Date(wth.created_at), 'dd MMM, HH:mm')}
                      </td>
                      <td className="py-3 px-4">
                        {wth.status === "pending" && (
                          <div className="flex items-center gap-2">
                            <Button 
                              size="sm" 
                              className="bg-green-500 hover:bg-green-600 h-8"
                              onClick={() => handleApprove(wth.id)}
                            >
                              <Check className="w-4 h-4" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="destructive" 
                              className="h-8"
                              onClick={() => handleReject(wth.id)}
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        )}
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

export default Withdrawals;
