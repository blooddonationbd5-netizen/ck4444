import { MessageCircle, Headphones } from "lucide-react";

const FloatingActions = () => {
  return (
    <div className="fixed right-4 bottom-24 z-40 flex flex-col gap-3">
      {/* Live Chat */}
      <button className="p-3 rounded-full bg-success shadow-lg hover:scale-110 transition-transform animate-float">
        <MessageCircle className="w-6 h-6 text-foreground" />
      </button>

      {/* Support */}
      <button className="p-3 rounded-full bg-accent shadow-neon hover:scale-110 transition-transform">
        <Headphones className="w-6 h-6 text-foreground" />
      </button>
    </div>
  );
};

export default FloatingActions;
