import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, Eye, Ban, MoreVertical } from "lucide-react";

const players = [
  { id: "USR001", username: "player123", phone: "01712345678", balance: "৳15,000", status: "Active", joined: "2024-01-01" },
  { id: "USR002", username: "gamer456", phone: "01812345678", balance: "৳8,500", status: "Active", joined: "2024-01-05" },
  { id: "USR003", username: "user789", phone: "01912345678", balance: "৳25,000", status: "Banned", joined: "2024-01-10" },
  { id: "USR004", username: "player321", phone: "01612345678", balance: "৳3,200", status: "Active", joined: "2024-01-12" },
  { id: "USR005", username: "newuser99", phone: "01512345678", balance: "৳500", status: "Pending", joined: "2024-01-14" },
];

const Players = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Players</h1>
        <p className="text-muted-foreground">Manage all registered players</p>
      </div>

      <Card className="bg-card border-border">
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search players..." className="pl-10" />
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
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Username</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Phone</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Balance</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Joined</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {players.map((player) => (
                  <tr key={player.id} className="border-b border-border/50 hover:bg-secondary/30">
                    <td className="py-3 px-4 text-sm font-mono text-foreground">{player.id}</td>
                    <td className="py-3 px-4 text-sm font-medium text-foreground">{player.username}</td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">{player.phone}</td>
                    <td className="py-3 px-4 text-sm font-medium text-primary">{player.balance}</td>
                    <td className="py-3 px-4">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        player.status === "Active" ? "bg-success/20 text-success" :
                        player.status === "Pending" ? "bg-warning/20 text-warning" :
                        "bg-destructive/20 text-destructive"
                      }`}>
                        {player.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">{player.joined}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                          <Ban className="w-4 h-4" />
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

export default Players;
