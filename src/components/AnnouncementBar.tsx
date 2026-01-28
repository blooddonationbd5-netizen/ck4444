import { PartyPopper } from "lucide-react";

const AnnouncementBar = () => {
  return (
    <div className="bg-accent/30 px-4 py-2 flex items-center gap-2 overflow-hidden">
      <PartyPopper className="w-5 h-5 text-primary flex-shrink-0" />
      <div className="overflow-hidden flex-1">
        <p className="text-sm text-foreground whitespace-nowrap animate-marquee">
          🎉 রুনা আনুষ্ঠানিকভাবে চালু হয়েছে! 🎉 স্বাগতম বোনাস পান! 🎁
        </p>
      </div>
    </div>
  );
};

export default AnnouncementBar;
