import { PartyPopper } from "lucide-react";
import { useNotices } from "@/hooks/useNotices";

const AnnouncementBar = () => {
  const { data: notices } = useNotices();
  
  // Get active notices
  const activeNotices = notices?.filter(n => n.is_active) || [];
  
  // Create announcement text from notices or use default
  const announcementText = activeNotices.length > 0
    ? activeNotices.map(n => `🎉 ${n.title}: ${n.content}`).join(' • ')
    : '🎉 Welcome to CK44.COM! 🎉 Get your welcome bonus today! 🎁';

  return (
    <div className="bg-accent/30 px-4 py-2 flex items-center gap-2 overflow-hidden max-w-full">
      <PartyPopper className="w-5 h-5 text-primary flex-shrink-0" />
      <div className="overflow-hidden flex-1 min-w-0">
        <p className="text-sm text-foreground whitespace-nowrap animate-marquee">
          {announcementText}
        </p>
      </div>
    </div>
  );
};

export default AnnouncementBar;
