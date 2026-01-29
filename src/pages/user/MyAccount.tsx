import { ChevronLeft, User, Phone, Mail, Calendar, Edit2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BottomNav from "@/components/BottomNav";
import { useAuth } from "@/contexts/AuthContext";
import { useUserProfile } from "@/hooks/useUserProfile";
import { format } from "date-fns";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

const MyAccount = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data: profile } = useUserProfile();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [fullName, setFullName] = useState(profile?.full_name || '');
  const [phone, setPhone] = useState(profile?.phone || '');
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!user) return;
    setLoading(true);
    
    const { error } = await supabase
      .from('profiles')
      .update({ full_name: fullName, phone })
      .eq('user_id', user.id);
    
    setLoading(false);
    
    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Success', description: 'Profile updated successfully' });
      queryClient.invalidateQueries({ queryKey: ['user-profile'] });
      setIsEditOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="bg-card border-b border-border px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="text-foreground">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <h1 className="text-lg font-bold text-foreground">My Account</h1>
          </div>
          <button 
            onClick={() => {
              setFullName(profile?.full_name || '');
              setPhone(profile?.phone || '');
              setIsEditOpen(true);
            }}
            className="text-primary"
          >
            <Edit2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="px-4 py-4 space-y-4">
        {/* Avatar Section */}
        <div className="flex flex-col items-center py-6">
          <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            {profile?.avatar_url ? (
              <img src={profile.avatar_url} alt="Avatar" className="w-full h-full rounded-full object-cover" />
            ) : (
              <User className="w-12 h-12 text-primary" />
            )}
          </div>
          <h2 className="text-xl font-bold text-foreground">{profile?.username || 'User'}</h2>
          <p className="text-muted-foreground text-sm">{profile?.referral_code}</p>
        </div>

        {/* Info Cards */}
        <div className="bg-card border border-border rounded-xl divide-y divide-border">
          <div className="flex items-center gap-4 p-4">
            <User className="w-5 h-5 text-primary" />
            <div className="flex-1">
              <p className="text-xs text-muted-foreground">Full Name</p>
              <p className="text-foreground font-medium">{profile?.full_name || 'Not set'}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4">
            <Phone className="w-5 h-5 text-primary" />
            <div className="flex-1">
              <p className="text-xs text-muted-foreground">Phone Number</p>
              <p className="text-foreground font-medium">{profile?.phone || 'Not set'}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4">
            <Mail className="w-5 h-5 text-primary" />
            <div className="flex-1">
              <p className="text-xs text-muted-foreground">Email</p>
              <p className="text-foreground font-medium">{user?.email || 'Not set'}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4">
            <Calendar className="w-5 h-5 text-primary" />
            <div className="flex-1">
              <p className="text-xs text-muted-foreground">Member Since</p>
              <p className="text-foreground font-medium">
                {profile?.created_at ? format(new Date(profile.created_at), 'MMM dd, yyyy') : '-'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div>
              <label className="text-sm text-muted-foreground">Full Name</label>
              <Input 
                value={fullName} 
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your full name"
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Phone Number</label>
              <Input 
                value={phone} 
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter your phone number"
              />
            </div>
            <Button onClick={handleSave} disabled={loading} className="w-full">
              {loading ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <BottomNav />
    </div>
  );
};

export default MyAccount;
