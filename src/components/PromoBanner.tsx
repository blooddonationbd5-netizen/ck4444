import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import bannerPromo from "@/assets/banner-promo.jpg";

const banners = [
  {
    id: 1,
    image: bannerPromo,
    title: "স্বাগতম বোনাস",
    subtitle: "১০০% পর্যন্ত বোনাস পান!",
  },
  {
    id: 2,
    image: bannerPromo,
    title: "ডেইলি ক্যাশব্যাক",
    subtitle: "প্রতিদিন ১০% ক্যাশব্যাক",
  },
  {
    id: 3,
    image: bannerPromo,
    title: "রেফারেল বোনাস",
    subtitle: "বন্ধুদের রেফার করে আয় করুন",
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

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % banners.length);
  };

  return (
    <div className="relative px-4 py-4">
      <div className="relative overflow-hidden rounded-2xl">
        {/* Banner Image */}
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {banners.map((banner) => (
            <div key={banner.id} className="min-w-full relative">
              <img
                src={banner.image}
                alt={banner.title}
                className="w-full h-44 sm:h-56 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-transparent flex flex-col justify-center px-6">
                <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-1">
                  {banner.title}
                </h3>
                <p className="text-sm sm:text-base text-primary font-semibold">
                  {banner.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={goToPrev}
          className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/50 backdrop-blur-sm hover:bg-background/70 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-foreground" />
        </button>
        <button
          onClick={goToNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/50 backdrop-blur-sm hover:bg-background/70 transition-colors"
        >
          <ChevronRight className="w-5 h-5 text-foreground" />
        </button>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center gap-2 mt-3">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "w-6 bg-primary"
                : "w-2 bg-muted-foreground/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default PromoBanner;
