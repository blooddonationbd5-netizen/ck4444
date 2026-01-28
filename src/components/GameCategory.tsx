import gameSlots from "@/assets/game-slots.jpg";
import gameLive from "@/assets/game-live.jpg";
import gameSports from "@/assets/game-sports.jpg";
import gameFishing from "@/assets/game-fishing.jpg";
import gameLottery from "@/assets/game-lottery.jpg";

const categories = [
  { id: 1, name: "স্লট", image: gameSlots, hot: true },
  { id: 2, name: "লাইভ ক্যাসিনো", image: gameLive, hot: false },
  { id: 3, name: "স্পোর্টস", image: gameSports, hot: true },
  { id: 4, name: "ফিশিং", image: gameFishing, hot: false },
  { id: 5, name: "লটারি", image: gameLottery, hot: false },
];

const GameCategory = () => {
  return (
    <div className="px-4 py-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-foreground">গেম ক্যাটাগরি</h2>
        <button className="text-sm text-primary hover:underline font-medium">
          সব দেখুন
        </button>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
        {categories.map((category) => (
          <button
            key={category.id}
            className="relative group overflow-hidden rounded-xl bg-gradient-card border border-border hover:border-primary/50 transition-all duration-300"
          >
            <div className="aspect-square overflow-hidden">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            
            {/* Hot Badge */}
            {category.hot && (
              <div className="absolute top-2 right-2 px-2 py-0.5 bg-destructive rounded-full">
                <span className="text-[10px] font-bold text-destructive-foreground">HOT</span>
              </div>
            )}

            {/* Category Name */}
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-background via-background/80 to-transparent p-2">
              <p className="text-xs sm:text-sm font-semibold text-foreground text-center">
                {category.name}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default GameCategory;
