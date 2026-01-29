import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, Edit, Trash2, Megaphone, ToggleLeft, ToggleRight } from "lucide-react";

const promotions = [
  { id: 1, title: "100% Welcome Bonus", type: "First Deposit", discount: "100%", validTill: "2024-12-31", status: true },
  { id: 2, title: "Daily 5% Cashback", type: "Cashback", discount: "5%", validTill: "2024-12-31", status: true },
  { id: 3, title: "Weekend Special", type: "Reload", discount: "50%", validTill: "2024-02-28", status: false },
  { id: 4, title: "Refer & Earn ৳200", type: "Referral", discount: "৳200", validTill: "2024-12-31", status: true },
];

const Promotions = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Promotions</h1>
          <p className="text-muted-foreground">Manage promotional offers</p>
        </div>
        <Button className="bg-primary text-primary-foreground">
          <Plus className="w-4 h-4 mr-2" /> Add Promotion
        </Button>
      </div>

      <Card className="bg-card border-border">
        <CardHeader>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search promotions..." className="pl-10" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Title</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Type</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Discount</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Valid Till</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {promotions.map((promo) => (
                  <tr key={promo.id} className="border-b border-border/50 hover:bg-secondary/30">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Megaphone className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium text-foreground">{promo.title}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">{promo.type}</td>
                    <td className="py-3 px-4 text-sm font-medium text-primary">{promo.discount}</td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">{promo.validTill}</td>
                    <td className="py-3 px-4">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        {promo.status ? <ToggleRight className="w-5 h-5 text-success" /> : <ToggleLeft className="w-5 h-5 text-muted-foreground" />}
                      </Button>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8"><Edit className="w-4 h-4" /></Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive"><Trash2 className="w-4 h-4" /></Button>
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

export default Promotions;
