import { ChevronLeft, Headphones, MessageCircle, Phone, Mail, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BottomNav from "@/components/BottomNav";
import { useSocialLinks } from "@/hooks/useSocialLinks";

const Support = () => {
  const navigate = useNavigate();
  const { data: socialLinks } = useSocialLinks();

  const whatsappLink = socialLinks?.find(l => l.platform.toLowerCase() === 'whatsapp')?.url;
  const telegramLink = socialLinks?.find(l => l.platform.toLowerCase() === 'telegram')?.url;

  const supportOptions = [
    {
      icon: MessageCircle,
      title: 'Live Chat',
      description: 'Chat with our support team',
      action: () => window.open(whatsappLink || '#', '_blank'),
      available: true,
    },
    {
      icon: Phone,
      title: 'WhatsApp',
      description: 'Message us on WhatsApp',
      action: () => window.open(whatsappLink || '#', '_blank'),
      available: true,
    },
    {
      icon: MessageCircle,
      title: 'Telegram',
      description: 'Contact via Telegram',
      action: () => window.open(telegramLink || '#', '_blank'),
      available: true,
    },
    {
      icon: Mail,
      title: 'Email',
      description: 'support@ck44.com',
      action: () => window.open('mailto:support@ck44.com', '_blank'),
      available: true,
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="bg-card border-b border-border px-4 py-4">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="text-foreground">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-bold text-foreground">Customer Service</h1>
        </div>
      </div>

      <div className="px-4 py-4 space-y-4">
        {/* Hero */}
        <div className="bg-card border border-border rounded-xl p-6 text-center">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <Headphones className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-xl font-bold text-foreground mb-2">Need Help?</h2>
          <p className="text-muted-foreground text-sm">
            Our support team is available 24/7 to assist you
          </p>
        </div>

        {/* Support Options */}
        <div className="space-y-3">
          {supportOptions.map((option, index) => (
            <button
              key={index}
              onClick={option.action}
              className="w-full bg-card border border-border rounded-xl p-4 flex items-center gap-4 hover:bg-muted/50 transition-colors"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <option.icon className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-foreground font-medium">{option.title}</p>
                <p className="text-sm text-muted-foreground">{option.description}</p>
              </div>
              {option.available && (
                <span className="text-xs text-green-500 bg-green-500/10 px-2 py-1 rounded-full">
                  Online
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Working Hours */}
        <div className="bg-muted/50 rounded-xl p-4 flex items-center gap-3">
          <Clock className="w-5 h-5 text-primary" />
          <div>
            <p className="text-foreground font-medium text-sm">24/7 Support</p>
            <p className="text-xs text-muted-foreground">We're always here to help</p>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Support;
