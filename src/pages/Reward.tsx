import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import { Trophy, Gift, Clock, CheckCircle, Star } from "lucide-react";

const rewards = [
  {
    id: 1,
    title: "ডেইলি চেক-ইন বোনাস",
    description: "প্রতিদিন চেক-ইন করে বোনাস সংগ্রহ করুন।",
    points: 10,
    claimed: false,
    available: true,
  },
  {
    id: 2,
    title: "প্রথম ডিপোজিট রিওয়ার্ড",
    description: "প্রথম ডিপোজিটে বিশেষ রিওয়ার্ড পান।",
    points: 100,
    claimed: true,
    available: true,
  },
  {
    id: 3,
    title: "লেভেল আপ বোনাস",
    description: "পরবর্তী লেভেলে পৌঁছান এবং রিওয়ার্ড পান।",
    points: 50,
    claimed: false,
    available: false,
  },
  {
    id: 4,
    title: "সাপ্তাহিক লকি ড্র",
    description: "সাপ্তাহিক লকি ড্রতে অংশ নিন।",
    points: 200,
    claimed: false,
    available: true,
  },
];

const Reward = () => {
  return (
    <div className="min-h-screen bg-background pb-24">
      <Header />
      
      <div className="px-4 py-4">
        {/* Points Summary */}
        <div className="bg-gradient-teal rounded-xl p-6 mb-6 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-gold flex items-center justify-center">
            <Trophy className="w-8 h-8 text-primary-foreground" />
          </div>
          <p className="text-muted-foreground text-sm mb-1">আপনার পয়েন্ট</p>
          <h1 className="text-3xl font-bold text-primary">১৫০</h1>
          <div className="flex items-center justify-center gap-1 mt-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-4 h-4 ${
                  star <= 3 ? "fill-primary text-primary" : "text-muted-foreground"
                }`}
              />
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-2">লেভেল ৩ • সিলভার মেম্বার</p>
        </div>

        {/* Rewards List */}
        <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
          <Gift className="w-5 h-5 text-primary" />
          উপলব্ধ রিওয়ার্ড
        </h2>

        <div className="space-y-3">
          {rewards.map((reward) => (
            <div
              key={reward.id}
              className={`bg-card border rounded-xl p-4 ${
                reward.claimed
                  ? "border-green-500/30 bg-green-500/5"
                  : reward.available
                  ? "border-border hover:border-primary"
                  : "border-border opacity-60"
              } transition-colors`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h3 className="text-foreground font-semibold">{reward.title}</h3>
                  <p className="text-muted-foreground text-sm mt-1">
                    {reward.description}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-primary font-bold">+{reward.points}</span>
                  <p className="text-xs text-muted-foreground">পয়েন্ট</p>
                </div>
              </div>
              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center gap-1 text-xs">
                  {reward.claimed ? (
                    <>
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-green-500">সংগ্রহ করা হয়েছে</span>
                    </>
                  ) : reward.available ? (
                    <>
                      <Gift className="w-4 h-4 text-primary" />
                      <span className="text-muted-foreground">সংগ্রহযোগ্য</span>
                    </>
                  ) : (
                    <>
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">আনলক করুন</span>
                    </>
                  )}
                </div>
                {!reward.claimed && reward.available && (
                  <button className="bg-primary text-primary-foreground px-4 py-1.5 rounded-full text-sm font-medium">
                    সংগ্রহ করুন
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Reward;
