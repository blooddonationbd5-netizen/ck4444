import { useState, useEffect } from "react";
import promoBanner from "@/assets/promo-banner.jpg";

const banners = [
  {
    id: 1,
    image: promoBanner,
  },
  {
    id: 2,
    image: promoBanner,
  },
  {
    id: 3,
    image: promoBanner,
  },
];

const PromoBanner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="px-3 py-3">
      <div className="relative overflow-hidden rounded-xl">
        {/* Banner Image */}
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {banners.map((banner) => (
            <div key={banner.id} className="min-w-full">
              <img
                src={banner.image}
                alt="Promotion"
                className="w-full h-40 sm:h-48 object-cover rounded-xl"
              />
            </div>
          ))}
        </div>

        {/* Overlay Text */}
        <div className="absolute top-4 left-4">
          <div className="bg-destructive text-destructive-foreground px-2 py-1 rounded text-xs font-bold mb-2">
            ১,০০০,০০০ বোনাস
          </div>
          <h3 className="text-2xl font-bold text-gradient-gold drop-shadow-lg">CK44</h3>
          <p className="text-xs text-foreground/90 mt-1">নতুন সদস্য এবং সিনিয়র সদস্য</p>
          <p className="text-sm font-bold text-foreground mt-1">প্রতিযোগিতার প্রাইজ পুল</p>
          <p className="text-xl font-bold text-primary mt-1">১,০০০,০০০ টাকা</p>
        </div>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center gap-1.5 mt-3">
        {banners.map((_, index) => (
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
    </div>
  );
};

export default PromoBanner;
