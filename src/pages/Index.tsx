import Header from "@/components/Header";
import Marquee from "@/components/Marquee";
import PromoBanner from "@/components/PromoBanner";
import QuickActions from "@/components/QuickActions";
import GameCategory from "@/components/GameCategory";
import PopularGames from "@/components/PopularGames";
import BottomNav from "@/components/BottomNav";
import FloatingActions from "@/components/FloatingActions";

const Index = () => {
  return (
    <div className="min-h-screen bg-background pb-24">
      <Header />
      <Marquee />
      <PromoBanner />
      <QuickActions />
      <GameCategory />
      <PopularGames />
      <FloatingActions />
      <BottomNav />
    </div>
  );
};

export default Index;
