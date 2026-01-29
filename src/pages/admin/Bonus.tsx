import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Search, Plus, Edit, Trash2, Gift, Loader2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useBonuses, useCreateBonus, useUpdateBonus, useDeleteBonus, Bonus } from "@/hooks/useBonuses";

const bonusTypes = ["First Deposit", "Cashback", "Referral", "Reload", "Weekly", "Daily"];

const BonusPage = () => {
  const { data: bonuses, isLoading } = useBonuses();
  const createBonus = useCreateBonus();
  const updateBonus = useUpdateBonus();
  const deleteBonus = useDeleteBonus();

  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingBonus, setEditingBonus] = useState<Bonus | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    type: "",
    amount: "",
    max_amount: "",
    description: "",
    is_active: true,
  });

  const filteredBonuses = bonuses?.filter(bonus =>
    bonus.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    bonus.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenDialog = (bonus?: Bonus) => {
    if (bonus) {
      setEditingBonus(bonus);
      setFormData({
        name: bonus.name,
        type: bonus.type,
        amount: bonus.amount,
        max_amount: bonus.max_amount || "",
        description: bonus.description || "",
        is_active: bonus.is_active,
      });
    } else {
      setEditingBonus(null);
      setFormData({
        name: "",
        type: "",
        amount: "",
        max_amount: "",
        description: "",
        is_active: true,
      });
    }
    setIsDialogOpen(true);
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.type || !formData.amount) return;

    const payload = {
      ...formData,
      max_amount: formData.max_amount || null,
      description: formData.description || null,
    };

    if (editingBonus) {
      await updateBonus.mutateAsync({ id: editingBonus.id, ...payload });
    } else {
      await createBonus.mutateAsync(payload);
    }
    setIsDialogOpen(false);
    setEditingBonus(null);
  };

  const handleDelete = async () => {
    if (deletingId) {
      await deleteBonus.mutateAsync(deletingId);
      setIsDeleteDialogOpen(false);
      setDeletingId(null);
    }
  };

  const handleToggleStatus = async (bonus: Bonus) => {
    await updateBonus.mutateAsync({ id: bonus.id, is_active: !bonus.is_active });
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
          <h1 className="text-2xl font-bold text-foreground">Bonus Management</h1>
          <p className="text-muted-foreground">Manage bonus offers and rewards</p>
        </div>
        <Button className="bg-primary text-primary-foreground" onClick={() => handleOpenDialog()}>
          <Plus className="w-4 h-4 mr-2" /> Add Bonus
        </Button>
      </div>

      <Card className="bg-card border-border">
        <CardHeader>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search bonuses..." 
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent>
          {filteredBonuses?.length === 0 ? (
            <div className="text-center py-8">
              <Gift className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No bonuses found.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Name</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Type</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Amount</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Max Amount</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBonuses?.map((bonus) => (
                    <tr key={bonus.id} className="border-b border-border/50 hover:bg-secondary/30">
                      <td className="py-3 px-4 text-sm font-medium text-foreground">{bonus.name}</td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">{bonus.type}</td>
                      <td className="py-3 px-4 text-sm font-medium text-primary">{bonus.amount}</td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">{bonus.max_amount || "Unlimited"}</td>
                      <td className="py-3 px-4">
                        <Switch
                          checked={bonus.is_active}
                          onCheckedChange={() => handleToggleStatus(bonus)}
                        />
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleOpenDialog(bonus)}>
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-destructive"
                            onClick={() => {
                              setDeletingId(bonus.id);
                              setIsDeleteDialogOpen(true);
                            }}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingBonus ? "Edit Bonus" : "Add Bonus"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Name</Label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Welcome Bonus"
              />
            </div>
            <div className="space-y-2">
              <Label>Type</Label>
              <Select
                value={formData.type}
                onValueChange={(value) => setFormData({ ...formData, type: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {bonusTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Amount</Label>
                <Input
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  placeholder="e.g., 100% or ৳500"
                />
              </div>
              <div className="space-y-2">
                <Label>Max Amount</Label>
                <Input
                  value={formData.max_amount}
                  onChange={(e) => setFormData({ ...formData, max_amount: e.target.value })}
                  placeholder="e.g., ৳5000"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Enter bonus description"
                rows={3}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label>Active</Label>
              <Switch
                checked={formData.is_active}
                onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button 
                onClick={handleSubmit}
                disabled={createBonus.isPending || updateBonus.isPending}
              >
                {(createBonus.isPending || updateBonus.isPending) && (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                )}
                {editingBonus ? "Update" : "Create"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this bonus.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleteBonus.isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default BonusPage;
