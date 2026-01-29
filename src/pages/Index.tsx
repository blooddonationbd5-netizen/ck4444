import { useState } from "react";
import AppDownloadBanner from "@/components/AppDownloadBanner";
import Header from "@/components/Header";
import AnnouncementBar from "@/components/AnnouncementBar";
import PromoBanner from "@/components/PromoBanner";
import ActionButtons from "@/components/ActionButtons";
import GameTabs from "@/components/GameTabs";
import HotGames from "@/components/HotGames";
import FloatingSocial from "@/components/FloatingSocial";
import BottomNav from "@/components/BottomNav";

const Index = () => {
  const [activeTab, setActiveTab] = useState("hot");

  return (
    <div className="min-h-screen bg-background pb-24 overflow-x-hidden">
      <AppDownloadBanner />
      <Header />
      <AnnouncementBar />
      <PromoBanner />
      <ActionButtons />
      <GameTabs activeTab={activeTab} onTabChange={setActiveTab} />
      <HotGames />
      <HotGames />
      <FloatingSocial />
      <BottomNav />
    </div>
  );
};

export default Index;
