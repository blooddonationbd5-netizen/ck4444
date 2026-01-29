import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, Plus, Eye, Ban, Crown, Loader2, UserPlus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUsersByRole, useUpdateUserStatus, useAssignRole } from "@/hooks/useUsersByRole";
import { useProfiles } from "@/hooks/useProfiles";
import { format } from "date-fns";

const SuperAffiliates = () => {
  const { data: superAffiliates, isLoading } = useUsersByRole('super_affiliate');
  const { data: allProfiles } = useProfiles();
  const updateStatus = useUpdateUserStatus();
  const assignRole = useAssignRole();

  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState("");

  const filteredSuperAffiliates = superAffiliates?.filter(aff =>
    aff.username?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    aff.full_name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get users who are not already super affiliates
  const availableUsers = allProfiles?.filter(p => 
    !superAffiliates?.some(a => a.user_id === p.user_id)
  ) || [];

  const handleToggleStatus = (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'banned' ? 'active' : 'banned';
    updateStatus.mutate({ id, status: newStatus });
  };

  const handleAddSuperAffiliate = async () => {
    if (!selectedUserId) return;
    await assignRole.mutateAsync({ user_id: selectedUserId, role: 'super_affiliate' });
    setIsAddDialogOpen(false);
    setSelectedUserId("");
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Super Affiliates</h1>
          <p className="text-muted-foreground">Manage super affiliate accounts</p>
        </div>
        <Button className="bg-primary text-primary-foreground" onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="w-4 h-4 mr-2" /> Add Super Affiliate
        </Button>
      </div>

      <Card className="bg-card border-border">
        <CardHeader>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search super affiliates..." 
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            {!filteredSuperAffiliates || filteredSuperAffiliates.length === 0 ? (
              <div className="text-center py-8">
                <UserPlus className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No super affiliates yet. Add your first super affiliate.</p>
              </div>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">ID</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Name</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Phone</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Referral Code</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Balance</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Joined</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSuperAffiliates.map((aff) => (
                    <tr key={aff.id} className="border-b border-border/50 hover:bg-secondary/30">
                      <td className="py-3 px-4 text-sm font-mono text-foreground">{aff.id.slice(0, 8)}...</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <Crown className="w-4 h-4 text-primary" />
                          <span className="text-sm font-medium text-foreground">
                            {aff.full_name || aff.username || 'N/A'}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">{aff.phone || 'N/A'}</td>
                      <td className="py-3 px-4 text-sm font-mono text-primary">{aff.referral_code || 'N/A'}</td>
                      <td className="py-3 px-4 text-sm font-medium text-primary">৳{Number(aff.balance).toLocaleString()}</td>
                      <td className="py-3 px-4">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          aff.status === "active" ? "bg-green-500/20 text-green-500" : "bg-destructive/20 text-destructive"
                        }`}>
                          {aff.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">
                        {format(new Date(aff.created_at), 'dd MMM yyyy')}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="icon" className="h-8 w-8"><Eye className="w-4 h-4" /></Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-destructive"
                            onClick={() => handleToggleStatus(aff.id, aff.status)}
                          >
                            <Ban className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Add Super Affiliate Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Super Affiliate</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Select User</Label>
              <Select value={selectedUserId} onValueChange={setSelectedUserId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a user to make super affiliate" />
                </SelectTrigger>
                <SelectContent>
                  {availableUsers.map((user) => (
                    <SelectItem key={user.user_id} value={user.user_id}>
                      {user.full_name || user.username || user.user_id.slice(0, 8)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddSuperAffiliate} disabled={!selectedUserId || assignRole.isPending}>
                {assignRole.isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                Add Super Affiliate
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SuperAffiliates;
