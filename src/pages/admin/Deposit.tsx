import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, Check, X } from "lucide-react";

const deposits = [
  { id: "DEP001", user: "player123", amount: "৳5,000", method: "bKash", phone: "01712345678", status: "Pending", date: "2024-01-15 10:30" },
  { id: "DEP002", user: "gamer456", amount: "৳10,000", method: "Nagad", phone: "01812345678", status: "Approved", date: "2024-01-15 10:25" },
  { id: "DEP003", user: "user789", amount: "৳3,000", method: "Rocket", phone: "01912345678", status: "Pending", date: "2024-01-15 10:20" },
  { id: "DEP004", user: "player321", amount: "৳15,000", method: "bKash", phone: "01612345678", status: "Rejected", date: "2024-01-15 10:15" },
];

const Deposit = () => {
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
                {deposits.map((dep) => (
                  <tr key={dep.id} className="border-b border-border/50 hover:bg-secondary/30">
                    <td className="py-3 px-4 text-sm font-mono text-foreground">{dep.id}</td>
                    <td className="py-3 px-4 text-sm text-foreground">{dep.user}</td>
                    <td className="py-3 px-4 text-sm font-medium text-success">{dep.amount}</td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">{dep.method}</td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">{dep.phone}</td>
                    <td className="py-3 px-4">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        dep.status === "Approved" ? "bg-success/20 text-success" :
                        dep.status === "Pending" ? "bg-warning/20 text-warning" :
                        "bg-destructive/20 text-destructive"
                      }`}>
                        {dep.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      {dep.status === "Pending" && (
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

export default Deposit;
