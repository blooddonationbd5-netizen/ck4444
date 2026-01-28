import { ChevronLeft, ChevronRight, Heart } from "lucide-react";
import gameSuperace from "@/assets/game-superace.jpg";
import gameShowdown from "@/assets/game-showdown.jpg";
import gameRoyal from "@/assets/game-royal.jpg";
import gameAviator from "@/assets/game-aviator.jpg";
import gamePenalty from "@/assets/game-penalty.jpg";
import gameDragontiger from "@/assets/game-dragontiger.jpg";

const games = [
  { id: 1, name: "Super Ace", image: gameSuperace, provider: "JILI", favorite: false },
  { id: 2, name: "Wild Bounty", image: gameShowdown, provider: "PG", favorite: true },
  { id: 3, name: "Royal", image: gameRoyal, provider: "YB", favorite: false },
  { id: 4, name: "Aviator", image: gameAviator, provider: "Spribe", favorite: true },
  { id: 5, name: "Penalty", image: gamePenalty, provider: "Sports", favorite: false },
  { id: 6, name: "Dragon Tiger", image: gameDragontiger, provider: "Live", favorite: false },
];

const HotGames = () => {
  return (
    <div className="px-3 py-2">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-primary font-bold text-lg">HOT GAMES</h2>
        <div className="flex items-center gap-2">
          <button className="text-primary text-sm font-medium hover:underline">See All</button>
          <button className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
            <ChevronLeft className="w-4 h-4 text-foreground" />
          </button>
          <button className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
            <ChevronRight className="w-4 h-4 text-foreground" />
          </button>
        </div>
      </div>

      {/* Games Grid */}
      <div className="grid grid-cols-3 gap-2">
        {games.map((game) => (
          <button
            key={game.id}
            className="relative group overflow-hidden rounded-xl bg-card aspect-square"
          >
            <img
              src={game.image}
              alt={game.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
            
            {/* Favorite Heart */}
            <div className={`absolute top-2 right-2 p-1.5 rounded-full ${game.favorite ? "bg-destructive" : "bg-background/50"}`}>
              <Heart className={`w-4 h-4 ${game.favorite ? "fill-foreground text-foreground" : "text-foreground"}`} />
            </div>

            {/* Provider Badge */}
            <div className="absolute bottom-2 right-2 bg-background/80 px-2 py-0.5 rounded text-[10px] font-bold text-foreground">
              {game.provider}
            </div>

            {/* Game Name Overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/90 to-transparent p-2">
              <p className="text-xs font-semibold text-foreground truncate">{game.name}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default HotGames;
