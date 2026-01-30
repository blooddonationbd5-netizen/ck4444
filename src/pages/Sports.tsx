import { useState } from "react";
import { ArrowLeft, Trophy, Circle, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import BetSlip, { BetSelection } from "@/components/BetSlip";

interface SportCategory {
  id: string;
  name: string;
  icon: string;
  matches: number;
  live: number;
}

const sportCategories: SportCategory[] = [
  { id: "cricket", name: "Cricket", icon: "🏏", matches: 24, live: 3 },
  { id: "football", name: "Football", icon: "⚽", matches: 48, live: 8 },
  { id: "rugby", name: "Rugby", icon: "🏉", matches: 12, live: 2 },
];

interface Match {
  id: string;
  team1: string;
  team2: string;
  time: string;
  odds1: number;
  oddsDraw: number | null;
  odds2: number;
  isLive: boolean;
  score?: string;
}

const cricketMatches: Match[] = [
  { id: "c1", team1: "India", team2: "Australia", time: "Live", odds1: 1.85, oddsDraw: null, odds2: 2.10, isLive: true, score: "245/4" },
  { id: "c2", team1: "England", team2: "Pakistan", time: "18:00", odds1: 1.95, oddsDraw: null, odds2: 1.90, isLive: false },
  { id: "c3", team1: "Bangladesh", team2: "Sri Lanka", time: "21:30", odds1: 2.20, oddsDraw: null, odds2: 1.75, isLive: false },
];

const footballMatches: Match[] = [
  { id: "f1", team1: "Barcelona", team2: "Real Madrid", time: "Live", odds1: 2.10, oddsDraw: 3.40, odds2: 3.20, isLive: true, score: "1-1" },
  { id: "f2", team1: "Man City", team2: "Liverpool", time: "20:00", odds1: 1.80, oddsDraw: 3.60, odds2: 4.20, isLive: false },
  { id: "f3", team1: "PSG", team2: "Bayern Munich", time: "22:45", odds1: 2.50, oddsDraw: 3.30, odds2: 2.80, isLive: false },
];

const rugbyMatches: Match[] = [
  { id: "r1", team1: "New Zealand", team2: "South Africa", time: "Live", odds1: 1.75, oddsDraw: null, odds2: 2.15, isLive: true, score: "21-18" },
  { id: "r2", team1: "England", team2: "Ireland", time: "16:00", odds1: 2.00, oddsDraw: null, odds2: 1.85, isLive: false },
];

const Sports = () => {
  const navigate = useNavigate();
  const [betSlipOpen, setBetSlipOpen] = useState(false);
  const [selections, setSelections] = useState<BetSelection[]>([]);

  const getMatchesBySport = (sportId: string): Match[] => {
    switch (sportId) {
      case "cricket": return cricketMatches;
      case "football": return footballMatches;
      case "rugby": return rugbyMatches;
      default: return [];
    }
  };

  const handleOddsClick = (
    sport: string,
    match: Match,
    selection: "1" | "X" | "2",
    odds: number
  ) => {
    const selectionId = `${match.id}-${selection}`;
    
    // Check if already selected
    const existingIndex = selections.findIndex((s) => s.id === selectionId);
    
    if (existingIndex >= 0) {
      // Remove if already selected
      setSelections((prev) => prev.filter((s) => s.id !== selectionId));
    } else {
      // Remove any other selection from same match
      const filteredSelections = selections.filter(
        (s) => !s.matchId.startsWith(match.id.split("-")[0]) || s.matchId !== match.id
      );
      
      // Add new selection
      const selectionLabel =
        selection === "1" ? match.team1 : selection === "2" ? match.team2 : "Draw";
      
      setSelections([
        ...filteredSelections.filter((s) => s.matchId !== match.id),
        {
          id: selectionId,
          sport,
          matchId: match.id,
          team1: match.team1,
          team2: match.team2,
          selection,
          selectionLabel,
          odds,
        },
      ]);
    }
  };

  const isSelected = (matchId: string, selection: string): boolean => {
    return selections.some((s) => s.id === `${matchId}-${selection}`);
  };

  const removeSelection = (id: string) => {
    setSelections((prev) => prev.filter((s) => s.id !== id));
  };

  const clearAllSelections = () => {
    setSelections([]);
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-card border-b border-border p-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-secondary rounded-lg">
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <div className="flex items-center gap-2">
            <Trophy className="w-6 h-6 text-primary" />
            <h1 className="text-lg font-bold text-foreground">Sports</h1>
          </div>
        </div>
        
        {/* Bet Slip Button */}
        <button
          onClick={() => setBetSlipOpen(true)}
          className="relative p-2 hover:bg-secondary rounded-lg transition-colors"
        >
          <ShoppingCart className="w-6 h-6 text-primary" />
          {selections.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
              {selections.length}
            </span>
          )}
        </button>
      </div>

      {/* Sport Categories */}
      <div className="p-4">
        <div className="grid grid-cols-3 gap-3 mb-6">
          {sportCategories.map((sport) => (
            <div
              key={sport.id}
              className="bg-card border border-border rounded-xl p-4 text-center hover:border-primary/50 transition-colors cursor-pointer"
            >
              <span className="text-3xl mb-2 block">{sport.icon}</span>
              <h3 className="font-semibold text-foreground text-sm">{sport.name}</h3>
              <p className="text-xs text-muted-foreground mt-1">{sport.matches} matches</p>
              {sport.live > 0 && (
                <div className="flex items-center justify-center gap-1 mt-2">
                  <Circle className="w-2 h-2 fill-destructive text-destructive animate-pulse" />
                  <span className="text-xs text-destructive">{sport.live} Live</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Sport Sections */}
        {sportCategories.map((sport) => (
          <div key={sport.id} className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">{sport.icon}</span>
              <h2 className="text-lg font-bold text-foreground">{sport.name}</h2>
              <span className="ml-auto text-xs text-primary cursor-pointer hover:underline">View All</span>
            </div>

            <div className="space-y-3">
              {getMatchesBySport(sport.id).map((match) => (
                <div
                  key={match.id}
                  className="bg-card border border-border rounded-xl p-4 hover:border-primary/50 transition-colors"
                >
                  {/* Match Header */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      {match.isLive ? (
                        <div className="flex items-center gap-1 bg-destructive/20 px-2 py-1 rounded-full">
                          <Circle className="w-2 h-2 fill-destructive text-destructive animate-pulse" />
                          <span className="text-xs font-medium text-destructive">LIVE</span>
                        </div>
                      ) : (
                        <span className="text-xs text-muted-foreground">{match.time}</span>
                      )}
                    </div>
                    {match.score && (
                      <span className="text-sm font-bold text-primary">{match.score}</span>
                    )}
                  </div>

                  {/* Teams */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{match.team1}</p>
                    </div>
                    <span className="text-muted-foreground text-sm px-3">vs</span>
                    <div className="flex-1 text-right">
                      <p className="font-medium text-foreground">{match.team2}</p>
                    </div>
                  </div>

                  {/* Odds */}
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => handleOddsClick(sport.id, match, "1", match.odds1)}
                      className={cn(
                        "border rounded-lg py-2 text-center transition-all",
                        isSelected(match.id, "1")
                          ? "bg-primary border-primary text-primary-foreground"
                          : "bg-secondary hover:bg-primary/20 border-border hover:border-primary"
                      )}
                    >
                      <p className="text-xs text-muted-foreground">1</p>
                      <p className="font-bold text-foreground">{match.odds1.toFixed(2)}</p>
                    </button>
                    
                    {match.oddsDraw !== null ? (
                      <button
                        onClick={() => handleOddsClick(sport.id, match, "X", match.oddsDraw!)}
                        className={cn(
                          "border rounded-lg py-2 text-center transition-all",
                          isSelected(match.id, "X")
                            ? "bg-primary border-primary text-primary-foreground"
                            : "bg-secondary hover:bg-primary/20 border-border hover:border-primary"
                        )}
                      >
                        <p className="text-xs text-muted-foreground">X</p>
                        <p className="font-bold text-foreground">{match.oddsDraw.toFixed(2)}</p>
                      </button>
                    ) : (
                      <div className="bg-secondary/50 border border-border rounded-lg py-2 text-center opacity-50">
                        <p className="text-xs text-muted-foreground">X</p>
                        <p className="font-bold text-muted-foreground">-</p>
                      </div>
                    )}
                    
                    <button
                      onClick={() => handleOddsClick(sport.id, match, "2", match.odds2)}
                      className={cn(
                        "border rounded-lg py-2 text-center transition-all",
                        isSelected(match.id, "2")
                          ? "bg-primary border-primary text-primary-foreground"
                          : "bg-secondary hover:bg-primary/20 border-border hover:border-primary"
                      )}
                    >
                      <p className="text-xs text-muted-foreground">2</p>
                      <p className="font-bold text-foreground">{match.odds2.toFixed(2)}</p>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Floating Bet Slip Button (Mobile) */}
      {selections.length > 0 && !betSlipOpen && (
        <div className="fixed bottom-20 left-4 right-4 z-50">
          <button
            onClick={() => setBetSlipOpen(true)}
            className="w-full bg-gradient-gold text-primary-foreground py-3 rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg"
          >
            <ShoppingCart className="w-5 h-5" />
            View Bet Slip ({selections.length})
          </button>
        </div>
      )}

      {/* Bet Slip */}
      <BetSlip
        isOpen={betSlipOpen}
        onClose={() => setBetSlipOpen(false)}
        selections={selections}
        onRemoveSelection={removeSelection}
        onClearAll={clearAllSelections}
      />
    </div>
  );
};

export default Sports;
