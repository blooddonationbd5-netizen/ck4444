import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { useSliders } from "@/hooks/useSliders";
import promoBanner from "@/assets/promo-banner.jpg";

const PromoBanner = () => {
  const { data: sliders, isLoading } = useSliders();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Filter only active sliders
  const activeSliders = sliders?.filter(s => s.is_active) || [];
  
  // Fallback banners if no sliders in database
  const displayBanners = activeSliders.length > 0 
    ? activeSliders 
    : [{ id: '1', image_url: promoBanner, title: 'Welcome Bonus' }];

  useEffect(() => {
    if (displayBanners.length <= 1) return;
    
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % displayBanners.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [displayBanners.length]);

  if (isLoading) {
    return (
      <div className="px-3 py-3">
        <div className="h-40 sm:h-48 rounded-xl bg-card border border-border flex items-center justify-center">
          <Loader2 className="w-6 h-6 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  return (
    <div className="px-3 py-3">
      <div className="relative overflow-hidden rounded-xl">
        {/* Banner Image */}
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {displayBanners.map((banner) => (
            <div key={banner.id} className="min-w-full">
              <a href={activeSliders.length > 0 ? (banner as any).link_url || '#' : '#'}>
                <img
                  src={activeSliders.length > 0 ? (banner as any).image_url : promoBanner}
                  alt={(banner as any).title || 'Promotion'}
                  className="w-full h-40 sm:h-48 object-cover rounded-xl"
                />
              </a>
            </div>
          ))}
        </div>

        {/* Overlay Text - Only show if using fallback */}
        {activeSliders.length === 0 && (
          <div className="absolute top-4 left-4">
            <div className="bg-destructive text-destructive-foreground px-2 py-1 rounded text-xs font-bold mb-2">
              1,000,000 Bonus
            </div>
            <h3 className="text-2xl font-bold text-gradient-gold drop-shadow-lg">CK44</h3>
            <p className="text-xs text-foreground/90 mt-1">New & Senior Members</p>
            <p className="text-sm font-bold text-foreground mt-1">Competition Prize Pool</p>
            <p className="text-xl font-bold text-primary mt-1">৳1,000,000</p>
          </div>
        )}
      </div>

      {/* Dots Indicator */}
      {displayBanners.length > 1 && (
        <div className="flex justify-center gap-1.5 mt-3">
          {displayBanners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "w-4 bg-primary"
                  : "w-2 bg-muted-foreground/40"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PromoBanner;
