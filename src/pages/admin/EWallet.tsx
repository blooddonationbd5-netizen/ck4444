import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Eye, Wallet, Loader2, CheckCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useProfiles, useUpdateProfileStatus } from "@/hooks/useProfiles";
import { format } from "date-fns";

const EWallet = () => {
  const { data: profiles, isLoading } = useProfiles();
  const updateStatus = useUpdateProfileStatus();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  // Filter profiles that have a phone number (e-wallet)
  const wallets = profiles?.filter(p => p.phone) || [];

  const filteredWallets = wallets.filter(wallet =>
    wallet.username?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    wallet.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    wallet.phone?.includes(searchQuery)
  );

  const handleViewDetails = (user: any) => {
    setSelectedUser(user);
    setIsViewDialogOpen(true);
  };

  const handleVerify = (id: string) => {
    updateStatus.mutate({ id, status: 'verified' });
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
      <div>
        <h1 className="text-2xl font-bold text-foreground">E-Wallet Management</h1>
        <p className="text-muted-foreground">Manage user e-wallets and phone numbers</p>
      </div>

      <Card className="bg-card border-border">
        <CardHeader>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search by name or phone..." 
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            {filteredWallets.length === 0 ? (
              <div className="text-center py-8">
                <Wallet className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No e-wallets found.</p>
              </div>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">ID</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">User</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Phone Number</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Balance</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Joined</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredWallets.map((wallet) => (
                    <tr key={wallet.id} className="border-b border-border/50 hover:bg-secondary/30">
                      <td className="py-3 px-4 text-sm font-mono text-foreground">{wallet.id.slice(0, 8)}...</td>
                      <td className="py-3 px-4 text-sm text-foreground">
                        {wallet.full_name || wallet.username || 'N/A'}
                      </td>
                      <td className="py-3 px-4 text-sm font-mono text-muted-foreground">{wallet.phone}</td>
                      <td className="py-3 px-4 text-sm font-medium text-primary">৳{Number(wallet.balance).toLocaleString()}</td>
                      <td className="py-3 px-4">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          wallet.status === "verified" ? "bg-green-500/20 text-green-500" :
                          wallet.status === "active" ? "bg-blue-500/20 text-blue-500" :
                          "bg-yellow-500/20 text-yellow-500"
                        }`}>
                          {wallet.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">
                        {format(new Date(wallet.created_at), 'dd MMM yyyy')}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8"
                            onClick={() => handleViewDetails(wallet)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          {wallet.status !== 'verified' && (
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8 text-green-500"
                              onClick={() => handleVerify(wallet.id)}
                            >
                              <CheckCircle className="w-4 h-4" />
                            </Button>
                          )}
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

      {/* View Details Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>E-Wallet Details</DialogTitle>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground">Name</Label>
                  <p className="font-medium">{selectedUser.full_name || selectedUser.username || 'N/A'}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Phone</Label>
                  <p className="font-medium font-mono">{selectedUser.phone}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Balance</Label>
                  <p className="font-medium text-primary">৳{Number(selectedUser.balance).toLocaleString()}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Status</Label>
                  <p className="font-medium">{selectedUser.status}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Referral Code</Label>
                  <p className="font-medium font-mono">{selectedUser.referral_code || 'N/A'}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Joined</Label>
                  <p className="font-medium">{format(new Date(selectedUser.created_at), 'dd MMM yyyy HH:mm')}</p>
                </div>
              </div>
              <div className="flex justify-end">
                <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EWallet;
