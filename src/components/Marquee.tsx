import { Volume2 } from "lucide-react";

const Marquee = () => {
  return (
    <div className="flex items-center gap-2 px-4 py-2 bg-secondary/50">
      <div className="flex-shrink-0 p-1.5 rounded-full bg-primary/20">
        <Volume2 className="w-4 h-4 text-primary" />
      </div>
      <div className="overflow-hidden flex-1">
        <div className="animate-marquee whitespace-nowrap">
          <span className="text-sm text-muted-foreground mx-4">
            🎉 স্বাগতম! নতুন সদস্যদের জন্য ১০০% বোনাস!
          </span>
          <span className="text-sm text-muted-foreground mx-4">
            💰 আজকের জ্যাকপট: ৳১,০০,০০০
          </span>
          <span className="text-sm text-muted-foreground mx-4">
            🏆 বিজয়ী: User***123 - ৳৫০,০০০ জিতেছেন!
          </span>
        </div>
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: inline-block;
          animation: marquee 15s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Marquee;
