import { X, Star, Download } from "lucide-react";

const AppDownloadBanner = () => {
  return (
    <div className="bg-gradient-teal px-3 py-2 flex items-center justify-between">
      {/* Logo & Info */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-gradient-gold flex items-center justify-center">
          <span className="text-primary-foreground font-bold text-lg">CK</span>
        </div>
        <div>
          <p className="text-foreground text-sm font-semibold">APP UP TO ৳18 &gt;&gt;&gt;</p>
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3 h-3 fill-primary text-primary" />
            ))}
          </div>
        </div>
      </div>

      {/* Download Button */}
      <div className="flex items-center gap-2">
        <button className="bg-primary text-primary-foreground px-4 py-1.5 rounded-full text-sm font-semibold flex items-center gap-1">
          <Download className="w-4 h-4" />
          Download
        </button>
        <button className="w-8 h-8 rounded-full bg-secondary/50 flex items-center justify-center">
          <X className="w-4 h-4 text-foreground" />
        </button>
      </div>
    </div>
  );
};

export default AppDownloadBanner;
