import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, Eye, Edit, Ban } from "lucide-react";

const affiliates = [
  { id: "AFL001", name: "Affiliate Pro", phone: "01712345678", referrals: 125, earnings: "৳45,000", status: "Active" },
  { id: "AFL002", name: "Affiliate Master", phone: "01812345678", referrals: 89, earnings: "৳32,500", status: "Active" },
  { id: "AFL003", name: "Affiliate Elite", phone: "01912345678", referrals: 210, earnings: "৳78,000", status: "Inactive" },
];

const Affiliates = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Affiliates</h1>
          <p className="text-muted-foreground">Manage affiliate accounts</p>
        </div>
        <Button className="bg-primary text-primary-foreground">
          <Plus className="w-4 h-4 mr-2" /> Add Affiliate
        </Button>
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
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Phone</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Referrals</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Earnings</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {affiliates.map((aff) => (
                  <tr key={aff.id} className="border-b border-border/50 hover:bg-secondary/30">
                    <td className="py-3 px-4 text-sm font-mono text-foreground">{aff.id}</td>
                    <td className="py-3 px-4 text-sm font-medium text-foreground">{aff.name}</td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">{aff.phone}</td>
                    <td className="py-3 px-4 text-sm text-foreground">{aff.referrals}</td>
                    <td className="py-3 px-4 text-sm font-medium text-primary">{aff.earnings}</td>
                    <td className="py-3 px-4">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        aff.status === "Active" ? "bg-success/20 text-success" : "bg-muted text-muted-foreground"
                      }`}>
                        {aff.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8"><Eye className="w-4 h-4" /></Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8"><Edit className="w-4 h-4" /></Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive"><Ban className="w-4 h-4" /></Button>
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

export default Affiliates;
