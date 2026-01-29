import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, Download } from "lucide-react";

const transactions = [
  { id: "TXN001", user: "player123", type: "Deposit", amount: "৳5,000", method: "bKash", status: "Completed", date: "2024-01-15 10:30" },
  { id: "TXN002", user: "gamer456", type: "Withdraw", amount: "৳3,500", method: "Nagad", status: "Pending", date: "2024-01-15 10:25" },
  { id: "TXN003", user: "user789", type: "Deposit", amount: "৳10,000", method: "Rocket", status: "Completed", date: "2024-01-15 10:20" },
  { id: "TXN004", user: "player321", type: "Bonus", amount: "৳500", method: "System", status: "Completed", date: "2024-01-15 10:15" },
  { id: "TXN005", user: "newuser99", type: "Withdraw", amount: "৳2,000", method: "bKash", status: "Processing", date: "2024-01-15 10:10" },
];

const Transactions = () => {
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
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">ID</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">User</th>
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
                    <td className="py-3 px-4 text-sm font-mono text-foreground">{tx.id}</td>
                    <td className="py-3 px-4 text-sm text-foreground">{tx.user}</td>
                    <td className="py-3 px-4">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        tx.type === "Deposit" ? "bg-success/20 text-success" :
                        tx.type === "Withdraw" ? "bg-warning/20 text-warning" :
                        "bg-primary/20 text-primary"
                      }`}>
                        {tx.type}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm font-medium text-foreground">{tx.amount}</td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">{tx.method}</td>
                    <td className="py-3 px-4">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        tx.status === "Completed" ? "bg-success/20 text-success" :
                        tx.status === "Pending" ? "bg-warning/20 text-warning" :
                        "bg-muted text-muted-foreground"
                      }`}>
                        {tx.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">{tx.date}</td>
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

export default Transactions;
