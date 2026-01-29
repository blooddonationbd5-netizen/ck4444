import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, Eye, Ban, Loader2 } from "lucide-react";
import { useProfiles, useUpdateProfileStatus } from "@/hooks/useProfiles";
import { format } from "date-fns";

const Players = () => {
  const { data: players, isLoading } = useProfiles();
  const updateStatus = useUpdateProfileStatus();

  const handleBan = (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'banned' ? 'active' : 'banned';
    updateStatus.mutate({ id, status: newStatus });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

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
            {!players || players.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">No players yet</p>
            ) : (
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
                      <td className="py-3 px-4 text-sm font-mono text-foreground">
                        {player.id.slice(0, 8)}...
                      </td>
                      <td className="py-3 px-4 text-sm font-medium text-foreground">
                        {player.username || player.full_name || 'N/A'}
                      </td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">
                        {player.phone || 'N/A'}
                      </td>
                      <td className="py-3 px-4 text-sm font-medium text-primary">
                        ৳{Number(player.balance).toLocaleString()}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          player.status === "active" ? "bg-green-500/20 text-green-500" :
                          player.status === "pending" ? "bg-yellow-500/20 text-yellow-500" :
                          "bg-destructive/20 text-destructive"
                        }`}>
                          {player.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">
                        {format(new Date(player.created_at), 'dd MMM yyyy')}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-destructive"
                            onClick={() => handleBan(player.id, player.status)}
                          >
                            <Ban className="w-4 h-4" />
                          </Button>
                        </div>
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

export default Players;
