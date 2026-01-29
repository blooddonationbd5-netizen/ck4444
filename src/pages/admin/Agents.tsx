import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, Eye, Edit, Ban } from "lucide-react";

const agents = [
  { id: "AGT001", name: "Agent One", phone: "01712345678", players: 125, commission: "৳45,000", status: "Active" },
  { id: "AGT002", name: "Agent Two", phone: "01812345678", players: 89, commission: "৳32,500", status: "Active" },
  { id: "AGT003", name: "Agent Three", phone: "01912345678", players: 210, commission: "৳78,000", status: "Inactive" },
];

const Agents = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Agents</h1>
          <p className="text-muted-foreground">Manage agent accounts</p>
        </div>
        <Button className="bg-primary text-primary-foreground">
          <Plus className="w-4 h-4 mr-2" /> Add Agent
        </Button>
      </div>

      <Card className="bg-card border-border">
        <CardHeader>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search agents..." className="pl-10" />
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
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Players</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Commission</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {agents.map((agent) => (
                  <tr key={agent.id} className="border-b border-border/50 hover:bg-secondary/30">
                    <td className="py-3 px-4 text-sm font-mono text-foreground">{agent.id}</td>
                    <td className="py-3 px-4 text-sm font-medium text-foreground">{agent.name}</td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">{agent.phone}</td>
                    <td className="py-3 px-4 text-sm text-foreground">{agent.players}</td>
                    <td className="py-3 px-4 text-sm font-medium text-primary">{agent.commission}</td>
                    <td className="py-3 px-4">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        agent.status === "Active" ? "bg-success/20 text-success" : "bg-muted text-muted-foreground"
                      }`}>
                        {agent.status}
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

export default Agents;
