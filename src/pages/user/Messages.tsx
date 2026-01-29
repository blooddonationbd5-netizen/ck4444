import { ChevronLeft, MessageCircle, Bell, Gift, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BottomNav from "@/components/BottomNav";

const messages = [
  { 
    id: 1, 
    type: 'system', 
    title: 'Welcome Bonus Activated', 
    message: 'Your 100% welcome bonus has been activated. Deposit now to claim!',
    time: '2 hours ago',
    read: false
  },
  { 
    id: 2, 
    type: 'promo', 
    title: 'Weekend Special Offer', 
    message: 'Get 50% extra on deposits this weekend. Limited time only!',
    time: '1 day ago',
    read: false
  },
  { 
    id: 3, 
    type: 'alert', 
    title: 'Withdrawal Completed', 
    message: 'Your withdrawal of ৳5,000 has been processed successfully.',
    time: '2 days ago',
    read: true
  },
  { 
    id: 4, 
    type: 'system', 
    title: 'Account Verified', 
    message: 'Your account has been verified successfully.',
    time: '3 days ago',
    read: true
  },
];

const Messages = () => {
  const navigate = useNavigate();

  const getIcon = (type: string) => {
    switch (type) {
      case 'promo': return <Gift className="w-5 h-5 text-primary" />;
      case 'alert': return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      default: return <Bell className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const unreadCount = messages.filter(m => !m.read).length;

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="bg-card border-b border-border px-4 py-4">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="text-foreground">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-bold text-foreground">Messages</h1>
          {unreadCount > 0 && (
            <span className="bg-destructive text-destructive-foreground text-xs px-2 py-0.5 rounded-full">
              {unreadCount} new
            </span>
          )}
        </div>
      </div>

      <div className="px-4 py-4">
        {messages.length > 0 ? (
          <div className="space-y-3">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`bg-card border rounded-xl p-4 ${
                  !msg.read ? 'border-primary/50' : 'border-border'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    !msg.read ? 'bg-primary/10' : 'bg-muted'
                  }`}>
                    {getIcon(msg.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-foreground font-medium">{msg.title}</h3>
                      {!msg.read && (
                        <span className="w-2 h-2 bg-primary rounded-full" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{msg.message}</p>
                    <span className="text-xs text-muted-foreground">{msg.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <MessageCircle className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No messages yet</p>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
};

export default Messages;
