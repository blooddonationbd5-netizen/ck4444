import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { Search, Filter, CheckCircle, XCircle, Clock, Loader2 } from "lucide-react";
import { format } from "date-fns";

interface Bet {
  id: string;
  user_id: string;
  sport: string;
  match_id: string;
  team1: string;
  team2: string;
  selection: string;
  odds: number;
  amount: number;
  potential_win: number;
  status: string;
  result: string | null;
  created_at: string;
}

const Bets = () => {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sportFilter, setSportFilter] = useState<string>("all");
  const [settleDialogOpen, setSettleDialogOpen] = useState(false);
  const [selectedBet, setSelectedBet] = useState<Bet | null>(null);
  const [settleResult, setSettleResult] = useState<"won" | "lost" | null>(null);

  const { data: bets, isLoading } = useQuery({
    queryKey: ["admin-bets"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("bets")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as Bet[];
    },
  });

  const settleBetMutation = useMutation({
    mutationFn: async ({ betId, result }: { betId: string; result: "won" | "lost" }) => {
      const { error } = await supabase
        .from("bets")
        .update({
          status: "settled",
          result: result,
        })
        .eq("id", betId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-bets"] });
      toast.success("Bet settled successfully!");
      setSettleDialogOpen(false);
      setSelectedBet(null);
      setSettleResult(null);
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to settle bet");
    },
  });

  const handleSettleBet = (bet: Bet) => {
    setSelectedBet(bet);
    setSettleDialogOpen(true);
  };

  const confirmSettle = () => {
    if (selectedBet && settleResult) {
      settleBetMutation.mutate({ betId: selectedBet.id, result: settleResult });
    }
  };

  const filteredBets = bets?.filter((bet) => {
    const matchesSearch =
      bet.team1.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bet.team2.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bet.user_id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || bet.status === statusFilter;
    const matchesSport = sportFilter === "all" || bet.sport === sportFilter;
    return matchesSearch && matchesStatus && matchesSport;
  });

  const getStatusBadge = (status: string, result: string | null) => {
    if (status === "settled") {
      return result === "won" ? (
        <Badge className="bg-success/20 text-success border-success/30">Won</Badge>
      ) : (
        <Badge className="bg-destructive/20 text-destructive border-destructive/30">Lost</Badge>
      );
    }
    return (
      <Badge className="bg-warning/20 text-warning border-warning/30">Pending</Badge>
    );
  };

  const totalBets = bets?.length || 0;
  const pendingBets = bets?.filter((b) => b.status === "pending").length || 0;
  const totalStake = bets?.reduce((sum, b) => sum + Number(b.amount), 0) || 0;
  const totalPotentialPayout = bets?.filter(b => b.status === "pending").reduce((sum, b) => sum + Number(b.potential_win), 0) || 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Bets Management</h1>
        <p className="text-muted-foreground">View and settle all user bets</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-xl p-4">
          <p className="text-sm text-muted-foreground">Total Bets</p>
          <p className="text-2xl font-bold text-foreground">{totalBets}</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <p className="text-sm text-muted-foreground">Pending</p>
          <p className="text-2xl font-bold text-warning">{pendingBets}</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <p className="text-sm text-muted-foreground">Total Stake</p>
          <p className="text-2xl font-bold text-foreground">৳{totalStake.toLocaleString()}</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <p className="text-sm text-muted-foreground">Potential Payout</p>
          <p className="text-2xl font-bold text-primary">৳{totalPotentialPayout.toLocaleString()}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by team or user ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full md:w-40">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="settled">Settled</SelectItem>
          </SelectContent>
        </Select>
        <Select value={sportFilter} onValueChange={setSportFilter}>
          <SelectTrigger className="w-full md:w-40">
            <SelectValue placeholder="Sport" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Sports</SelectItem>
            <SelectItem value="cricket">Cricket</SelectItem>
            <SelectItem value="football">Football</SelectItem>
            <SelectItem value="rugby">Rugby</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Bets Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : filteredBets && filteredBets.length > 0 ? (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Sport</TableHead>
                  <TableHead>Match</TableHead>
                  <TableHead>Selection</TableHead>
                  <TableHead>Odds</TableHead>
                  <TableHead>Stake</TableHead>
                  <TableHead>Potential Win</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBets.map((bet) => (
                  <TableRow key={bet.id}>
                    <TableCell className="text-sm">
                      {format(new Date(bet.created_at), "dd/MM/yyyy HH:mm")}
                    </TableCell>
                    <TableCell>
                      <span className="capitalize">{bet.sport}</span>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <p className="font-medium">{bet.team1}</p>
                        <p className="text-muted-foreground">vs {bet.team2}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium text-primary">
                        {bet.selection === "1" ? bet.team1 : bet.selection === "2" ? bet.team2 : "Draw"}
                      </span>
                    </TableCell>
                    <TableCell>{Number(bet.odds).toFixed(2)}</TableCell>
                    <TableCell>৳{Number(bet.amount).toLocaleString()}</TableCell>
                    <TableCell className="text-success font-medium">
                      ৳{Number(bet.potential_win).toLocaleString()}
                    </TableCell>
                    <TableCell>{getStatusBadge(bet.status, bet.result)}</TableCell>
                    <TableCell>
                      {bet.status === "pending" ? (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleSettleBet(bet)}
                        >
                          Settle
                        </Button>
                      ) : (
                        <span className="text-sm text-muted-foreground">Settled</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No bets found</p>
          </div>
        )}
      </div>

      {/* Settle Dialog */}
      <Dialog open={settleDialogOpen} onOpenChange={setSettleDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Settle Bet</DialogTitle>
            <DialogDescription>
              Choose the result for this bet to settle it.
            </DialogDescription>
          </DialogHeader>

          {selectedBet && (
            <div className="space-y-4">
              <div className="bg-secondary rounded-lg p-4">
                <p className="text-sm text-muted-foreground">Match</p>
                <p className="font-medium">{selectedBet.team1} vs {selectedBet.team2}</p>
                <p className="text-sm text-primary mt-1">
                  Selection: {selectedBet.selection === "1" ? selectedBet.team1 : selectedBet.selection === "2" ? selectedBet.team2 : "Draw"} @ {Number(selectedBet.odds).toFixed(2)}
                </p>
                <div className="flex justify-between mt-2 text-sm">
                  <span>Stake: ৳{Number(selectedBet.amount).toLocaleString()}</span>
                  <span className="text-success">Win: ৳{Number(selectedBet.potential_win).toLocaleString()}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant={settleResult === "won" ? "default" : "outline"}
                  className={settleResult === "won" ? "bg-success hover:bg-success/90" : ""}
                  onClick={() => setSettleResult("won")}
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Won
                </Button>
                <Button
                  variant={settleResult === "lost" ? "default" : "outline"}
                  className={settleResult === "lost" ? "bg-destructive hover:bg-destructive/90" : ""}
                  onClick={() => setSettleResult("lost")}
                >
                  <XCircle className="w-4 h-4 mr-2" />
                  Lost
                </Button>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setSettleDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={confirmSettle}
              disabled={!settleResult || settleBetMutation.isPending}
            >
              {settleBetMutation.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Settling...
                </>
              ) : (
                "Confirm"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Bets;
