import { forwardRef } from "react";
import { ArrowUp, Send, Headphones, MessageCircle } from "lucide-react";
import { useSocialLinks } from "@/hooks/useSocialLinks";

const FloatingSocial = forwardRef<HTMLDivElement>((_, ref) => {
  const { data: links } = useSocialLinks();
  
  // Get active social links
  const activeLinks = links?.filter(l => l.is_active) || [];
  
  // Find specific platform links
  const whatsappLink = activeLinks.find(l => l.platform.toLowerCase() === 'whatsapp');
  const telegramLink = activeLinks.find(l => l.platform.toLowerCase() === 'telegram');
  const facebookLink = activeLinks.find(l => l.platform.toLowerCase() === 'facebook');
  const phoneLink = activeLinks.find(l => l.platform.toLowerCase() === 'phone');

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div ref={ref} className="fixed right-3 bottom-24 z-40 flex flex-col gap-2">
      {/* WhatsApp */}
      <a
        href={whatsappLink?.url || 'https://wa.me/8801234567890'}
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 rounded-full bg-whatsapp shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
      >
        <MessageCircle className="w-6 h-6 text-white" />
      </a>

      {/* Facebook */}
      <a
        href={facebookLink?.url || 'https://facebook.com/ck44official'}
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 rounded-full bg-facebook shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
      >
        <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      </a>

      {/* Scroll to top */}
      <button 
        onClick={handleScrollToTop}
        className="w-12 h-12 rounded-full bg-primary shadow-gold flex items-center justify-center hover:scale-110 transition-transform"
      >
        <ArrowUp className="w-6 h-6 text-primary-foreground" />
      </button>

      {/* Telegram */}
      <a
        href={telegramLink?.url || 'https://t.me/ck44official'}
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 rounded-full bg-telegram shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
      >
        <Send className="w-6 h-6 text-white" />
      </a>

      {/* Support */}
      <a
        href={phoneLink?.url || 'tel:+8801234567890'}
        className="w-12 h-12 rounded-full bg-support shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
      >
        <Headphones className="w-6 h-6 text-white" />
      </a>
    </div>
  );
});

FloatingSocial.displayName = "FloatingSocial";

export default FloatingSocial;
