import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const affiliates = [
  { id: "AFF001", name: "Affiliate One", referrals: 45, earnings: "৳12,500", status: "Active" },
  { id: "AFF002", name: "Affiliate Two", referrals: 28, earnings: "৳8,200", status: "Active" },
  { id: "AFF003", name: "Affiliate Three", referrals: 67, earnings: "৳18,900", status: "Pending" },
];

const AffiliateResale = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Affiliate Resale List</h1>
        <p className="text-muted-foreground">Manage affiliate resale activities</p>
      </div>

      <Card className="bg-card border-border">
        <CardHeader>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search affiliates..." className="pl-10" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">ID</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Name</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Referrals</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Earnings</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {affiliates.map((aff) => (
                  <tr key={aff.id} className="border-b border-border/50 hover:bg-secondary/30">
                    <td className="py-3 px-4 text-sm font-mono text-foreground">{aff.id}</td>
                    <td className="py-3 px-4 text-sm font-medium text-foreground">{aff.name}</td>
                    <td className="py-3 px-4 text-sm text-foreground">{aff.referrals}</td>
                    <td className="py-3 px-4 text-sm font-medium text-primary">{aff.earnings}</td>
                    <td className="py-3 px-4">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        aff.status === "Active" ? "bg-success/20 text-success" : "bg-warning/20 text-warning"
                      }`}>
                        {aff.status}
                      </span>
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

export default AffiliateResale;
