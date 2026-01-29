import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";
import { Users, Copy, Share2, Gift, TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useUserProfile } from "@/hooks/useUserProfile";

const Invite = () => {
  const { toast } = useToast();
  const { data: profile } = useUserProfile();
  
  const referralCode = profile?.referral_code || "CK44USER";
  const referralLink = `https://ck4444.lovable.app/register?ref=${referralCode}`;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "Link copied to clipboard.",
    });
  };

  const handleShare = (platform: string) => {
    const message = `Join CK44.COM and get bonus! Use my referral code: ${referralCode}`;
    let shareUrl = '';
    
    switch (platform) {
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodeURIComponent(message + '\n' + referralLink)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink)}`;
        break;
      case 'telegram':
        shareUrl = `https://t.me/share/url?url=${encodeURIComponent(referralLink)}&text=${encodeURIComponent(message)}`;
        break;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank');
    }
  };

  const stats = [
    { label: "Total Referrals", value: "0", icon: Users },
    { label: "Total Earnings", value: "৳0", icon: TrendingUp },
    { label: "Pending Bonus", value: "৳0", icon: Gift },
  ];

  return (
    <div className="min-h-screen bg-background pb-24">
      <Header />
      
      <div className="px-4 py-4">
        {/* Hero Section */}
        <div className="bg-gradient-teal rounded-xl p-6 mb-6 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-gold flex items-center justify-center">
            <Users className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-xl font-bold text-foreground mb-2">
            Invite Friends
          </h1>
          <p className="text-muted-foreground text-sm">
            Get ৳100 bonus for every successful referral!
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-card border border-border rounded-xl p-3 text-center"
            >
              <stat.icon className="w-5 h-5 mx-auto mb-1 text-primary" />
              <p className="text-lg font-bold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Referral Code */}
        <div className="bg-card border border-border rounded-xl p-4 mb-4">
          <p className="text-sm text-muted-foreground mb-2">Your Referral Code</p>
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-secondary rounded-lg px-4 py-3 font-mono font-bold text-foreground">
              {referralCode}
            </div>
            <button
              onClick={() => handleCopy(referralCode)}
              className="p-3 bg-primary rounded-lg hover:opacity-90 transition-opacity"
            >
              <Copy className="w-5 h-5 text-primary-foreground" />
            </button>
          </div>
        </div>

        {/* Referral Link */}
        <div className="bg-card border border-border rounded-xl p-4 mb-6">
          <p className="text-sm text-muted-foreground mb-2">Your Referral Link</p>
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-secondary rounded-lg px-4 py-3 text-sm text-foreground truncate">
              {referralLink}
            </div>
            <button
              onClick={() => handleCopy(referralLink)}
              className="p-3 bg-primary rounded-lg hover:opacity-90 transition-opacity"
            >
              <Copy className="w-5 h-5 text-primary-foreground" />
            </button>
          </div>
        </div>

        {/* Share Buttons */}
        <div className="grid grid-cols-3 gap-3">
          <button 
            onClick={() => handleShare('whatsapp')}
            className="flex flex-col items-center gap-2 bg-whatsapp p-4 rounded-xl hover:opacity-90 transition-opacity"
          >
            <Share2 className="w-6 h-6 text-white" />
            <span className="text-xs text-white font-medium">WhatsApp</span>
          </button>
          <button 
            onClick={() => handleShare('facebook')}
            className="flex flex-col items-center gap-2 bg-facebook p-4 rounded-xl hover:opacity-90 transition-opacity"
          >
            <Share2 className="w-6 h-6 text-white" />
            <span className="text-xs text-white font-medium">Facebook</span>
          </button>
          <button 
            onClick={() => handleShare('telegram')}
            className="flex flex-col items-center gap-2 bg-telegram p-4 rounded-xl hover:opacity-90 transition-opacity"
          >
            <Share2 className="w-6 h-6 text-white" />
            <span className="text-xs text-white font-medium">Telegram</span>
          </button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Invite;
