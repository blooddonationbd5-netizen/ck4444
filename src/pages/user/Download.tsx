import { ChevronLeft, Download, Smartphone, Apple, PlayCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BottomNav from "@/components/BottomNav";
import { Button } from "@/components/ui/button";

const DownloadApp = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="bg-card border-b border-border px-4 py-4">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="text-foreground">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-bold text-foreground">Download APP</h1>
        </div>
      </div>

      <div className="px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl font-bold text-primary-foreground">CK</span>
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">CK44 App</h2>
          <p className="text-muted-foreground">
            Download our app for the best gaming experience
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          {['Fast & Secure', 'Live Games', 'Instant Deposit', 'Quick Withdraw'].map((feature) => (
            <div key={feature} className="bg-card border border-border rounded-xl p-4 text-center">
              <span className="text-foreground text-sm font-medium">{feature}</span>
            </div>
          ))}
        </div>

        {/* Download Options */}
        <div className="space-y-3">
          <Button 
            className="w-full h-14 gap-3 bg-card border border-border hover:bg-muted text-foreground"
            variant="outline"
          >
            <Smartphone className="w-6 h-6" />
            <div className="text-left">
              <p className="text-xs text-muted-foreground">Download for</p>
              <p className="font-semibold">Android APK</p>
            </div>
            <Download className="w-5 h-5 ml-auto" />
          </Button>

          <Button 
            className="w-full h-14 gap-3 bg-card border border-border hover:bg-muted text-foreground"
            variant="outline"
          >
            <Apple className="w-6 h-6" />
            <div className="text-left">
              <p className="text-xs text-muted-foreground">Download on</p>
              <p className="font-semibold">App Store</p>
            </div>
            <Download className="w-5 h-5 ml-auto" />
          </Button>

          <Button 
            className="w-full h-14 gap-3 bg-card border border-border hover:bg-muted text-foreground"
            variant="outline"
          >
            <PlayCircle className="w-6 h-6" />
            <div className="text-left">
              <p className="text-xs text-muted-foreground">Get it on</p>
              <p className="font-semibold">Play Store</p>
            </div>
            <Download className="w-5 h-5 ml-auto" />
          </Button>
        </div>

        {/* Note */}
        <p className="text-xs text-muted-foreground text-center mt-6">
          For Android users: Enable "Install from unknown sources" in settings
        </p>
      </div>

      <BottomNav />
    </div>
  );
};

export default DownloadApp;
