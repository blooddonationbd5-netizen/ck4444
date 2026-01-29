import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, Check, X, Loader2 } from "lucide-react";
import { useDeposits, useUpdateTransactionStatus } from "@/hooks/useTransactions";
import { format } from "date-fns";

const Deposit = () => {
  const { data: deposits, isLoading } = useDeposits();
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
        <h1 className="text-2xl font-bold text-foreground">Deposit Requests</h1>
        <p className="text-muted-foreground">Manage deposit requests from users</p>
      </div>

      <Card className="bg-card border-border">
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search deposits..." className="pl-10" />
            </div>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" /> Filter
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            {!deposits || deposits.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">No deposit requests yet</p>
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
                  {deposits.map((dep) => (
                    <tr key={dep.id} className="border-b border-border/50 hover:bg-secondary/30">
                      <td className="py-3 px-4 text-sm font-mono text-foreground">
                        {dep.id.slice(0, 8)}...
                      </td>
                      <td className="py-3 px-4 text-sm font-medium text-green-500">
                        ৳{Number(dep.amount).toLocaleString()}
                      </td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">
                        {dep.method || 'N/A'}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          dep.status === "completed" ? "bg-green-500/20 text-green-500" :
                          dep.status === "pending" ? "bg-yellow-500/20 text-yellow-500" :
                          "bg-destructive/20 text-destructive"
                        }`}>
                          {dep.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">
                        {format(new Date(dep.created_at), 'dd MMM, HH:mm')}
                      </td>
                      <td className="py-3 px-4">
                        {dep.status === "pending" && (
                          <div className="flex items-center gap-2">
                            <Button 
                              size="sm" 
                              className="bg-green-500 hover:bg-green-600 h-8"
                              onClick={() => handleApprove(dep.id)}
                            >
                              <Check className="w-4 h-4" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="destructive" 
                              className="h-8"
                              onClick={() => handleReject(dep.id)}
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

export default Deposit;
