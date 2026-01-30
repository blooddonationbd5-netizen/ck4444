import { ArrowLeft, Trophy, Circle } from "lucide-react";
import { useNavigate } from "react-router-dom";

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
  id: number;
  team1: string;
  team2: string;
  time: string;
  odds1: string;
  oddsDraw: string;
  odds2: string;
  isLive: boolean;
  score?: string;
}

const cricketMatches: Match[] = [
  { id: 1, team1: "India", team2: "Australia", time: "Live", odds1: "1.85", oddsDraw: "-", odds2: "2.10", isLive: true, score: "245/4" },
  { id: 2, team1: "England", team2: "Pakistan", time: "18:00", odds1: "1.95", oddsDraw: "-", odds2: "1.90", isLive: false },
  { id: 3, team1: "Bangladesh", team2: "Sri Lanka", time: "21:30", odds1: "2.20", oddsDraw: "-", odds2: "1.75", isLive: false },
];

const footballMatches: Match[] = [
  { id: 1, team1: "Barcelona", team2: "Real Madrid", time: "Live", odds1: "2.10", oddsDraw: "3.40", odds2: "3.20", isLive: true, score: "1-1" },
  { id: 2, team1: "Man City", team2: "Liverpool", time: "20:00", odds1: "1.80", oddsDraw: "3.60", odds2: "4.20", isLive: false },
  { id: 3, team1: "PSG", team2: "Bayern Munich", time: "22:45", odds1: "2.50", oddsDraw: "3.30", odds2: "2.80", isLive: false },
];

const rugbyMatches: Match[] = [
  { id: 1, team1: "New Zealand", team2: "South Africa", time: "Live", odds1: "1.75", oddsDraw: "-", odds2: "2.15", isLive: true, score: "21-18" },
  { id: 2, team1: "England", team2: "Ireland", time: "16:00", odds1: "2.00", oddsDraw: "-", odds2: "1.85", isLive: false },
];

const Sports = () => {
  const navigate = useNavigate();

  const getMatchesBySport = (sportId: string): Match[] => {
    switch (sportId) {
      case "cricket": return cricketMatches;
      case "football": return footballMatches;
      case "rugby": return rugbyMatches;
      default: return [];
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-card border-b border-border p-4 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-secondary rounded-lg">
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <div className="flex items-center gap-2">
          <Trophy className="w-6 h-6 text-primary" />
          <h1 className="text-lg font-bold text-foreground">Sports</h1>
        </div>
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
                  <Circle className="w-2 h-2 fill-red-500 text-red-500 animate-pulse" />
                  <span className="text-xs text-red-500">{sport.live} Live</span>
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
                  key={`${sport.id}-${match.id}`}
                  className="bg-card border border-border rounded-xl p-4 hover:border-primary/50 transition-colors"
                >
                  {/* Match Header */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      {match.isLive ? (
                        <div className="flex items-center gap-1 bg-red-500/20 px-2 py-1 rounded-full">
                          <Circle className="w-2 h-2 fill-red-500 text-red-500 animate-pulse" />
                          <span className="text-xs font-medium text-red-500">LIVE</span>
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
                    <button className="bg-secondary hover:bg-primary/20 border border-border hover:border-primary rounded-lg py-2 text-center transition-colors">
                      <p className="text-xs text-muted-foreground">1</p>
                      <p className="font-bold text-foreground">{match.odds1}</p>
                    </button>
                    {match.oddsDraw !== "-" ? (
                      <button className="bg-secondary hover:bg-primary/20 border border-border hover:border-primary rounded-lg py-2 text-center transition-colors">
                        <p className="text-xs text-muted-foreground">X</p>
                        <p className="font-bold text-foreground">{match.oddsDraw}</p>
                      </button>
                    ) : (
                      <div className="bg-secondary/50 border border-border rounded-lg py-2 text-center opacity-50">
                        <p className="text-xs text-muted-foreground">X</p>
                        <p className="font-bold text-muted-foreground">-</p>
                      </div>
                    )}
                    <button className="bg-secondary hover:bg-primary/20 border border-border hover:border-primary rounded-lg py-2 text-center transition-colors">
                      <p className="text-xs text-muted-foreground">2</p>
                      <p className="font-bold text-foreground">{match.odds2}</p>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sports;
