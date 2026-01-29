import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, Edit, Trash2 } from "lucide-react";

const bonuses = [
  { id: 1, name: "Welcome Bonus", type: "First Deposit", amount: "100%", maxAmount: "৳5,000", status: "Active" },
  { id: 2, name: "Daily Cashback", type: "Cashback", amount: "5%", maxAmount: "৳1,000", status: "Active" },
  { id: 3, name: "Refer & Earn", type: "Referral", amount: "৳200", maxAmount: "Unlimited", status: "Active" },
  { id: 4, name: "Weekend Special", type: "Reload", amount: "50%", maxAmount: "৳2,500", status: "Inactive" },
];

const Bonus = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Bonus Management</h1>
          <p className="text-muted-foreground">Manage bonus offers and promotions</p>
        </div>
        <Button className="bg-primary text-primary-foreground">
          <Plus className="w-4 h-4 mr-2" /> Add Bonus
        </Button>
      </div>

      <Card className="bg-card border-border">
        <CardHeader>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search bonuses..." className="pl-10" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Name</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Type</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Amount</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Max Amount</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {bonuses.map((bonus) => (
                  <tr key={bonus.id} className="border-b border-border/50 hover:bg-secondary/30">
                    <td className="py-3 px-4 text-sm font-medium text-foreground">{bonus.name}</td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">{bonus.type}</td>
                    <td className="py-3 px-4 text-sm font-medium text-primary">{bonus.amount}</td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">{bonus.maxAmount}</td>
                    <td className="py-3 px-4">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        bonus.status === "Active" ? "bg-success/20 text-success" : "bg-muted text-muted-foreground"
                      }`}>
                        {bonus.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                          <Trash2 className="w-4 h-4" />
                        </Button>
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

export default Bonus;
