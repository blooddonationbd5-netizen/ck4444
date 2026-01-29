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
  Loader2,
} from "lucide-react";
import { useTransactions } from "@/hooks/useTransactions";
import { useProfiles } from "@/hooks/useProfiles";
import { format } from "date-fns";

const Dashboard = () => {
  const { data: transactions, isLoading: txLoading } = useTransactions();
  const { data: profiles, isLoading: profilesLoading } = useProfiles();

  const isLoading = txLoading || profilesLoading;

  // Calculate stats
  const totalPlayers = profiles?.length ?? 0;
  const totalDeposit = transactions
    ?.filter(t => t.type === 'deposit' && t.status === 'completed')
    .reduce((sum, t) => sum + Number(t.amount), 0) ?? 0;
  const totalWithdraw = transactions
    ?.filter(t => t.type === 'withdraw' && t.status === 'completed')
    .reduce((sum, t) => sum + Number(t.amount), 0) ?? 0;
  const totalBalance = profiles?.reduce((sum, p) => sum + Number(p.balance), 0) ?? 0;

  // Get recent transactions (last 5)
  const recentTransactions = transactions?.slice(0, 5) ?? [];

  const stats = [
    {
      title: "Total Players",
      value: totalPlayers.toLocaleString(),
      change: "+12.5%",
      trend: "up",
      icon: Users,
    },
    {
      title: "Total Deposit",
      value: `৳${totalDeposit.toLocaleString()}`,
      change: "+8.2%",
      trend: "up",
      icon: ArrowDownToLine,
    },
    {
      title: "Total Withdraw",
      value: `৳${totalWithdraw.toLocaleString()}`,
      change: "+5.1%",
      trend: "up",
      icon: ArrowUpFromLine,
    },
    {
      title: "Total Balance",
      value: `৳${totalBalance.toLocaleString()}`,
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
      value: profiles?.filter(p => {
        const today = new Date().toDateString();
        return new Date(p.created_at).toDateString() === today;
      }).length.toString() ?? "0",
      change: "+2.4%",
      trend: "up",
      icon: UserPlus,
    },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

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
                      <TrendingUp className="w-4 h-4 text-green-500" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-destructive" />
                    )}
                    <span
                      className={
                        stat.trend === "up" ? "text-green-500 text-sm" : "text-destructive text-sm"
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
            {recentTransactions.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">No transactions yet</p>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">ID</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Type</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Amount</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {recentTransactions.map((tx) => (
                    <tr key={tx.id} className="border-b border-border/50 hover:bg-secondary/30">
                      <td className="py-3 px-4 text-sm text-foreground font-mono">
                        {tx.id.slice(0, 8)}...
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            tx.type === "deposit"
                              ? "bg-green-500/20 text-green-500"
                              : tx.type === "withdraw"
                              ? "bg-yellow-500/20 text-yellow-500"
                              : "bg-primary/20 text-primary"
                          }`}
                        >
                          {tx.type}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm font-medium text-foreground">
                        ৳{Number(tx.amount).toLocaleString()}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            tx.status === "completed"
                              ? "bg-green-500/20 text-green-500"
                              : tx.status === "pending"
                              ? "bg-yellow-500/20 text-yellow-500"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
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

export default Dashboard;
