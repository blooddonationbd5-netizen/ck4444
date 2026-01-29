import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Users,
  Wallet,
  ArrowDownToLine,
  ArrowUpFromLine,
  TrendingUp,
  TrendingDown,
  Gamepad2,
  UserPlus,
} from "lucide-react";

const stats = [
  {
    title: "Total Players",
    value: "12,456",
    change: "+12.5%",
    trend: "up",
    icon: Users,
  },
  {
    title: "Total Deposit",
    value: "৳1,234,567",
    change: "+8.2%",
    trend: "up",
    icon: ArrowDownToLine,
  },
  {
    title: "Total Withdraw",
    value: "৳987,654",
    change: "+5.1%",
    trend: "up",
    icon: ArrowUpFromLine,
  },
  {
    title: "Total Balance",
    value: "৳2,456,789",
    change: "+15.3%",
    trend: "up",
    icon: Wallet,
  },
  {
    title: "Active Games",
    value: "156",
    change: "+3",
    trend: "up",
    icon: Gamepad2,
  },
  {
    title: "New Users Today",
    value: "89",
    change: "-2.4%",
    trend: "down",
    icon: UserPlus,
  },
];

const recentTransactions = [
  { id: 1, user: "player123", type: "Deposit", amount: "৳5,000", status: "Completed", time: "2 min ago" },
  { id: 2, user: "gamer456", type: "Withdraw", amount: "৳3,500", status: "Pending", time: "5 min ago" },
  { id: 3, user: "user789", type: "Deposit", amount: "৳10,000", status: "Completed", time: "12 min ago" },
  { id: 4, user: "player321", type: "Bonus", amount: "৳500", status: "Completed", time: "15 min ago" },
  { id: 5, user: "newuser99", type: "Withdraw", amount: "৳2,000", status: "Processing", time: "20 min ago" },
];

const Dashboard = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back to CK44 Admin Panel</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold text-foreground mt-1">{stat.value}</p>
                  <div className="flex items-center gap-1 mt-1">
                    {stat.trend === "up" ? (
                      <TrendingUp className="w-4 h-4 text-success" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-destructive" />
                    )}
                    <span
                      className={
                        stat.trend === "up" ? "text-success text-sm" : "text-destructive text-sm"
                      }
                    >
                      {stat.change}
                    </span>
                  </div>
                </div>
                <div className="p-3 bg-primary/10 rounded-xl">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Transactions */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-lg">Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">User</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Type</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Amount</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Time</th>
                </tr>
              </thead>
              <tbody>
                {recentTransactions.map((tx) => (
                  <tr key={tx.id} className="border-b border-border/50 hover:bg-secondary/30">
                    <td className="py-3 px-4 text-sm text-foreground">{tx.user}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          tx.type === "Deposit"
                            ? "bg-success/20 text-success"
                            : tx.type === "Withdraw"
                            ? "bg-warning/20 text-warning"
                            : "bg-primary/20 text-primary"
                        }`}
                      >
                        {tx.type}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm font-medium text-foreground">{tx.amount}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          tx.status === "Completed"
                            ? "bg-success/20 text-success"
                            : tx.status === "Pending"
                            ? "bg-warning/20 text-warning"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {tx.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">{tx.time}</td>
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

export default Dashboard;
