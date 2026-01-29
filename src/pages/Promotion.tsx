import { forwardRef } from "react";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import { Gift, Clock, CheckCircle, Loader2 } from "lucide-react";
import { usePromotions } from "@/hooks/usePromotions";

const Promotion = forwardRef<HTMLDivElement>((_, ref) => {
  const { data: promotions, isLoading } = usePromotions();

  return (
    <div ref={ref} className="min-h-screen bg-background pb-24">
      <Header />
      
      <div className="px-4 py-4">
        <h1 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
          <Gift className="w-6 h-6 text-primary" />
          Promotions
        </h1>

        {isLoading ? (
          <div className="flex items-center justify-center h-40">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : promotions?.length === 0 ? (
          <div className="text-center py-8">
            <Gift className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No promotions available right now.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {promotions?.map((promo) => (
              <div
                key={promo.id}
                className="bg-card border border-border rounded-xl p-4 hover:border-primary transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-foreground font-semibold">{promo.title}</h3>
                  {promo.type && (
                    <span className="bg-primary/20 text-primary text-xs px-2 py-0.5 rounded-full">
                      {promo.type}
                    </span>
                  )}
                </div>
                <p className="text-muted-foreground text-sm mb-3">{promo.description || `Get ${promo.discount} bonus!`}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    {promo.is_active ? (
                      <>
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>Active</span>
                      </>
                    ) : (
                      <>
                        <Clock className="w-4 h-4" />
                        <span>Coming Soon</span>
                      </>
                    )}
                    {promo.valid_till && (
                      <span className="ml-2">• Valid till {promo.valid_till}</span>
                    )}
                  </div>
                  <span className="bg-primary text-primary-foreground px-4 py-1.5 rounded-full text-sm font-medium">
                    {promo.discount}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
});

Promotion.displayName = "Promotion";

export default Promotion;
