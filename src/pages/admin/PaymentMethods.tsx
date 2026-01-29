import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Edit, Trash2, CreditCard, Loader2, Upload } from "lucide-react";
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
import { usePaymentMethods, useCreatePaymentMethod, useUpdatePaymentMethod, useDeletePaymentMethod, PaymentMethod } from "@/hooks/usePaymentMethods";

const paymentTypes = ["Mobile Banking", "Bank Transfer", "Crypto", "E-Wallet", "Card"];

const PaymentMethodsPage = () => {
  const { data: methods, isLoading } = usePaymentMethods();
  const createMethod = useCreatePaymentMethod();
  const updateMethod = useUpdatePaymentMethod();
  const deleteMethod = useDeletePaymentMethod();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingMethod, setEditingMethod] = useState<PaymentMethod | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    account_number: "",
    min_amount: 100,
    max_amount: 50000,
    is_active: true,
  });

  const handleOpenDialog = (method?: PaymentMethod) => {
    if (method) {
      setEditingMethod(method);
      setFormData({
        name: method.name,
        type: method.type,
        account_number: method.account_number || "",
        min_amount: method.min_amount || 100,
        max_amount: method.max_amount || 50000,
        is_active: method.is_active,
      });
    } else {
      setEditingMethod(null);
      setFormData({
        name: "",
        type: "",
        account_number: "",
        min_amount: 100,
        max_amount: 50000,
        is_active: true,
      });
    }
    setIsDialogOpen(true);
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.type) return;

    if (editingMethod) {
      await updateMethod.mutateAsync({ id: editingMethod.id, ...formData });
    } else {
      await createMethod.mutateAsync(formData);
    }
    setIsDialogOpen(false);
    setFormData({
      name: "",
      type: "",
      account_number: "",
      min_amount: 100,
      max_amount: 50000,
      is_active: true,
    });
    setEditingMethod(null);
  };

  const handleDelete = async () => {
    if (deletingId) {
      await deleteMethod.mutateAsync(deletingId);
      setIsDeleteDialogOpen(false);
      setDeletingId(null);
    }
  };

  const handleToggleStatus = async (method: PaymentMethod) => {
    await updateMethod.mutateAsync({ id: method.id, is_active: !method.is_active });
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
          <h1 className="text-2xl font-bold text-foreground">Payment Methods</h1>
          <p className="text-muted-foreground">Configure deposit and withdrawal methods</p>
        </div>
        <Button className="bg-primary text-primary-foreground" onClick={() => handleOpenDialog()}>
          <Plus className="w-4 h-4 mr-2" /> Add Method
        </Button>
      </div>

      <div className="grid gap-4">
        {methods?.length === 0 ? (
          <Card className="bg-card border-border">
            <CardContent className="p-8 text-center">
              <CreditCard className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No payment methods yet. Add your first method.</p>
            </CardContent>
          </Card>
        ) : (
          methods?.map((method) => (
            <Card key={method.id} className="bg-card border-border">
              <CardContent className="p-4">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-primary/10 rounded-xl">
                      <CreditCard className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">{method.name}</h3>
                      <p className="text-sm text-muted-foreground">{method.type}</p>
                    </div>
                  </div>
                  <div className="hidden sm:flex items-center gap-6 text-sm">
                    <div>
                      <span className="text-muted-foreground">Number: </span>
                      <span className="text-foreground font-mono">{method.account_number || "-"}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Min: </span>
                      <span className="text-foreground">৳{method.min_amount}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Max: </span>
                      <span className="text-foreground">৳{method.max_amount}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={method.is_active}
                      onCheckedChange={() => handleToggleStatus(method)}
                    />
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8"
                      onClick={() => handleOpenDialog(method)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-destructive"
                      onClick={() => {
                        setDeletingId(method.id);
                        setIsDeleteDialogOpen(true);
                      }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingMethod ? "Edit Payment Method" : "Add Payment Method"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Name</Label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., bKash, Nagad"
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
                  {paymentTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Account Number / Address</Label>
              <Input
                value={formData.account_number}
                onChange={(e) => setFormData({ ...formData, account_number: e.target.value })}
                placeholder="Enter account number or wallet address"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Min Amount</Label>
                <Input
                  type="number"
                  value={formData.min_amount}
                  onChange={(e) => setFormData({ ...formData, min_amount: Number(e.target.value) })}
                />
              </div>
              <div className="space-y-2">
                <Label>Max Amount</Label>
                <Input
                  type="number"
                  value={formData.max_amount}
                  onChange={(e) => setFormData({ ...formData, max_amount: Number(e.target.value) })}
                />
              </div>
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
                disabled={createMethod.isPending || updateMethod.isPending}
              >
                {(createMethod.isPending || updateMethod.isPending) && (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                )}
                {editingMethod ? "Update" : "Create"}
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
              This action cannot be undone. This will permanently delete this payment method.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleteMethod.isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default PaymentMethodsPage;
