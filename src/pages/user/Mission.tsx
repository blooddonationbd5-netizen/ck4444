import { ChevronLeft, Gift, CheckCircle, Circle, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BottomNav from "@/components/BottomNav";
import { Button } from "@/components/ui/button";

const missions = [
  { id: 1, title: 'Daily Login', description: 'Login everyday to earn bonus', reward: 10, status: 'completed' },
  { id: 2, title: 'First Deposit', description: 'Make your first deposit', reward: 100, status: 'pending' },
  { id: 3, title: 'Invite a Friend', description: 'Invite a friend to join', reward: 50, status: 'available' },
  { id: 4, title: 'Complete Profile', description: 'Fill in all profile details', reward: 20, status: 'available' },
  { id: 5, title: 'Place 10 Bets', description: 'Place 10 bets today', reward: 30, status: 'pending', progress: 3, total: 10 },
];

const Mission = () => {
  const navigate = useNavigate();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'pending': return <Clock className="w-5 h-5 text-yellow-500" />;
      default: return <Circle className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const getStatusButton = (status: string) => {
    switch (status) {
      case 'completed': return <span className="text-green-500 text-sm font-medium">Claimed</span>;
      case 'pending': return <span className="text-yellow-500 text-sm font-medium">In Progress</span>;
      default: return <Button size="sm" className="bg-primary">Claim</Button>;
    }
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="bg-card border-b border-border px-4 py-4">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="text-foreground">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-bold text-foreground">Daily Missions</h1>
        </div>
      </div>

      <div className="px-4 py-4 space-y-3">
        {missions.map((mission) => (
          <div key={mission.id} className="bg-card border border-border rounded-xl p-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Gift className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-foreground font-medium">{mission.title}</h3>
                  {getStatusIcon(mission.status)}
                </div>
                <p className="text-xs text-muted-foreground mb-2">{mission.description}</p>
                
                {mission.progress !== undefined && (
                  <div className="mb-2">
                    <div className="flex justify-between text-xs text-muted-foreground mb-1">
                      <span>Progress</span>
                      <span>{mission.progress}/{mission.total}</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all"
                        style={{ width: `${(mission.progress / mission.total!) * 100}%` }}
                      />
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <span className="text-primary font-bold">+৳ {mission.reward}</span>
                  {getStatusButton(mission.status)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <BottomNav />
    </div>
  );
};

export default Mission;
