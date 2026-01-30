import { ArrowLeft, Ticket, Circle, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useBets } from "@/hooks/useBets";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

const MyBets = () => {
  const navigate = useNavigate();
  const { data: bets, isLoading } = useBets();

  const getStatusBadge = (status: string, result: string | null) => {
    if (status === "settled") {
      return result === "won" ? (
        <Badge className="bg-success/20 text-success border-success/30">Won</Badge>
      ) : (
        <Badge className="bg-destructive/20 text-destructive border-destructive/30">Lost</Badge>
      );
    }
    return (
      <Badge className="bg-warning/20 text-warning border-warning/30">
        <Circle className="w-2 h-2 fill-current mr-1 animate-pulse" />
        Pending
      </Badge>
    );
  };

  const pendingBets = bets?.filter((b) => b.status === "pending") || [];
  const settledBets = bets?.filter((b) => b.status === "settled") || [];
  const totalWon = settledBets.filter((b) => b.result === "won").reduce((sum, b) => sum + Number(b.potential_win), 0);
  const totalLost = settledBets.filter((b) => b.result === "lost").reduce((sum, b) => sum + Number(b.amount), 0);

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-card border-b border-border p-4 flex items-center gap-3 sticky top-0 z-50">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-secondary rounded-lg">
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <div className="flex items-center gap-2">
          <Ticket className="w-6 h-6 text-primary" />
          <h1 className="text-lg font-bold text-foreground">My Bets</h1>
        </div>
      </div>

      {/* Stats */}
      <div className="p-4">
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-card border border-border rounded-xl p-3 text-center">
            <p className="text-xs text-muted-foreground">Total Bets</p>
            <p className="text-xl font-bold text-foreground">{bets?.length || 0}</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-3 text-center">
            <p className="text-xs text-muted-foreground">Total Won</p>
            <p className="text-xl font-bold text-success">৳{totalWon.toLocaleString()}</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-3 text-center">
            <p className="text-xs text-muted-foreground">Total Lost</p>
            <p className="text-xl font-bold text-destructive">৳{totalLost.toLocaleString()}</p>
          </div>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : bets && bets.length > 0 ? (
          <div className="space-y-6">
            {/* Pending Bets */}
            {pendingBets.length > 0 && (
              <div>
                <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                  Pending Bets ({pendingBets.length})
                </h2>
                <div className="space-y-3">
                  {pendingBets.map((bet) => (
                    <div
                      key={bet.id}
                      className="bg-card border border-warning/30 rounded-xl p-4"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="text-xs text-muted-foreground capitalize">{bet.sport}</p>
                          <p className="font-medium text-foreground">
                            {bet.team1} vs {bet.team2}
                          </p>
                        </div>
                        {getStatusBadge(bet.status, bet.result)}
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <div>
                          <span className="text-muted-foreground">Selection: </span>
                          <span className="text-primary font-medium">
                            {bet.selection === "1" ? bet.team1 : bet.selection === "2" ? bet.team2 : "Draw"}
                          </span>
                          <span className="text-muted-foreground"> @ {Number(bet.odds).toFixed(2)}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-border">
                        <div>
                          <span className="text-xs text-muted-foreground">Stake: </span>
                          <span className="font-medium text-foreground">৳{Number(bet.amount).toLocaleString()}</span>
                        </div>
                        <div>
                          <span className="text-xs text-muted-foreground">To Win: </span>
                          <span className="font-bold text-success">৳{Number(bet.potential_win).toLocaleString()}</span>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        {format(new Date(bet.created_at), "dd MMM yyyy, HH:mm")}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Settled Bets */}
            {settledBets.length > 0 && (
              <div>
                <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                  Settled Bets ({settledBets.length})
                </h2>
                <div className="space-y-3">
                  {settledBets.map((bet) => (
                    <div
                      key={bet.id}
                      className={`bg-card border rounded-xl p-4 ${
                        bet.result === "won" ? "border-success/30" : "border-destructive/30"
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="text-xs text-muted-foreground capitalize">{bet.sport}</p>
                          <p className="font-medium text-foreground">
                            {bet.team1} vs {bet.team2}
                          </p>
                        </div>
                        {getStatusBadge(bet.status, bet.result)}
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <div>
                          <span className="text-muted-foreground">Selection: </span>
                          <span className="text-primary font-medium">
                            {bet.selection === "1" ? bet.team1 : bet.selection === "2" ? bet.team2 : "Draw"}
                          </span>
                          <span className="text-muted-foreground"> @ {Number(bet.odds).toFixed(2)}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-border">
                        <div>
                          <span className="text-xs text-muted-foreground">Stake: </span>
                          <span className="font-medium text-foreground">৳{Number(bet.amount).toLocaleString()}</span>
                        </div>
                        <div>
                          {bet.result === "won" ? (
                            <>
                              <span className="text-xs text-muted-foreground">Won: </span>
                              <span className="font-bold text-success">+৳{Number(bet.potential_win).toLocaleString()}</span>
                            </>
                          ) : (
                            <>
                              <span className="text-xs text-muted-foreground">Lost: </span>
                              <span className="font-bold text-destructive">-৳{Number(bet.amount).toLocaleString()}</span>
                            </>
                          )}
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        {format(new Date(bet.created_at), "dd MMM yyyy, HH:mm")}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-12">
            <Ticket className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">No bets yet</p>
            <button
              onClick={() => navigate("/sports")}
              className="mt-4 bg-primary text-primary-foreground px-6 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              Place Your First Bet
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBets;
