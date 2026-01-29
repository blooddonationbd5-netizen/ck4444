import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, Check, X } from "lucide-react";

const withdrawals = [
  { id: "WTH001", user: "player123", amount: "৳3,500", method: "bKash", phone: "01712345678", status: "Pending", date: "2024-01-15 10:30" },
  { id: "WTH002", user: "gamer456", amount: "৳8,000", method: "Nagad", phone: "01812345678", status: "Processing", date: "2024-01-15 10:25" },
  { id: "WTH003", user: "user789", amount: "৳5,000", method: "Rocket", phone: "01912345678", status: "Completed", date: "2024-01-15 10:20" },
  { id: "WTH004", user: "player321", amount: "৳12,000", method: "bKash", phone: "01612345678", status: "Rejected", date: "2024-01-15 10:15" },
];

const Withdrawals = () => {
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
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">ID</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">User</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Amount</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Method</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Phone</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {withdrawals.map((wth) => (
                  <tr key={wth.id} className="border-b border-border/50 hover:bg-secondary/30">
                    <td className="py-3 px-4 text-sm font-mono text-foreground">{wth.id}</td>
                    <td className="py-3 px-4 text-sm text-foreground">{wth.user}</td>
                    <td className="py-3 px-4 text-sm font-medium text-warning">{wth.amount}</td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">{wth.method}</td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">{wth.phone}</td>
                    <td className="py-3 px-4">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        wth.status === "Completed" ? "bg-success/20 text-success" :
                        wth.status === "Pending" ? "bg-warning/20 text-warning" :
                        wth.status === "Processing" ? "bg-primary/20 text-primary" :
                        "bg-destructive/20 text-destructive"
                      }`}>
                        {wth.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      {wth.status === "Pending" && (
                        <div className="flex items-center gap-2">
                          <Button size="sm" className="bg-success hover:bg-success/80 h-8">
                            <Check className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="destructive" className="h-8">
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      )}
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

export default Withdrawals;
