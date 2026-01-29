import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import { Gift, Clock, CheckCircle } from "lucide-react";

const promotions = [
  {
    id: 1,
    title: "স্বাগতম বোনাস ১০০%",
    description: "প্রথম ডিপোজিটে ১০০% বোনাস পান। সর্বোচ্চ ৳৫০০০ পর্যন্ত!",
    badge: "নতুন",
    active: true,
  },
  {
    id: 2,
    title: "ডেইলি ক্যাশব্যাক ৫%",
    description: "প্রতিদিন আপনার হারানো অর্থের ৫% ক্যাশব্যাক পান।",
    badge: "হট",
    active: true,
  },
  {
    id: 3,
    title: "রেফারেল বোনাস ৳১০০",
    description: "প্রতিটি রেফারেলের জন্য ৳১০০ বোনাস পান।",
    badge: "জনপ্রিয়",
    active: true,
  },
  {
    id: 4,
    title: "সাপ্তাহিক টার্নওভার বোনাস",
    description: "সাপ্তাহিক টার্নওভারের উপর ০.৫% বোনাস পান।",
    badge: "",
    active: true,
  },
];

const Promotion = () => {
  return (
    <div className="min-h-screen bg-background pb-24">
      <Header />
      
      <div className="px-4 py-4">
        <h1 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
          <Gift className="w-6 h-6 text-primary" />
          প্রোমোশন
        </h1>

        <div className="space-y-4">
          {promotions.map((promo) => (
            <div
              key={promo.id}
              className="bg-card border border-border rounded-xl p-4 hover:border-primary transition-colors"
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-foreground font-semibold">{promo.title}</h3>
                {promo.badge && (
                  <span className="bg-primary/20 text-primary text-xs px-2 py-0.5 rounded-full">
                    {promo.badge}
                  </span>
                )}
              </div>
              <p className="text-muted-foreground text-sm mb-3">{promo.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  {promo.active ? (
                    <>
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>চলমান</span>
                    </>
                  ) : (
                    <>
                      <Clock className="w-4 h-4" />
                      <span>শীঘ্রই আসছে</span>
                    </>
                  )}
                </div>
                <button className="bg-primary text-primary-foreground px-4 py-1.5 rounded-full text-sm font-medium">
                  বিস্তারিত
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Promotion;
