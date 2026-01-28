import gameSlots from "@/assets/game-slots.jpg";
import gameLive from "@/assets/game-live.jpg";
import gameFishing from "@/assets/game-fishing.jpg";
import gameLottery from "@/assets/game-lottery.jpg";

const games = [
  { id: 1, name: "Lucky 777", provider: "PG Soft", image: gameSlots, rtp: "96.5%" },
  { id: 2, name: "Golden Fish", provider: "JILI", image: gameFishing, rtp: "97.2%" },
  { id: 3, name: "Live Roulette", provider: "Evolution", image: gameLive, rtp: "98.1%" },
  { id: 4, name: "Mega Lottery", provider: "Lottery", image: gameLottery, rtp: "95.8%" },
  { id: 5, name: "Fortune Tiger", provider: "PG Soft", image: gameSlots, rtp: "96.8%" },
  { id: 6, name: "Ocean King", provider: "JILI", image: gameFishing, rtp: "97.0%" },
];

const PopularGames = () => {
  return (
    <div className="px-4 py-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-foreground">জনপ্রিয় গেমস</h2>
        <button className="text-sm text-primary hover:underline font-medium">
          সব দেখুন
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {games.map((game) => (
          <button
            key={game.id}
            className="group relative overflow-hidden rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-gold"
          >
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src={game.image}
                alt={game.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* RTP Badge */}
            <div className="absolute top-2 left-2 px-2 py-0.5 bg-success/90 rounded-full">
              <span className="text-[10px] font-bold text-foreground">RTP {game.rtp}</span>
            </div>

            {/* Game Info */}
            <div className="p-3 bg-gradient-card">
              <p className="text-sm font-semibold text-foreground truncate">
                {game.name}
              </p>
              <p className="text-xs text-muted-foreground">
                {game.provider}
              </p>
            </div>

            {/* Play Overlay */}
            <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="px-4 py-2 bg-gradient-gold rounded-full text-primary-foreground font-bold text-sm shadow-gold">
                খেলুন
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default PopularGames;
