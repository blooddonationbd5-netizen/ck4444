import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Edit, Trash2, Facebook, MessageCircle, Send, Phone, Link2, Loader2 } from "lucide-react";
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
import { useSocialLinks, useCreateSocialLink, useUpdateSocialLink, useDeleteSocialLink, SocialLink } from "@/hooks/useSocialLinks";

const platformOptions = [
  { value: "whatsapp", label: "WhatsApp", icon: MessageCircle },
  { value: "facebook", label: "Facebook", icon: Facebook },
  { value: "telegram", label: "Telegram", icon: Send },
  { value: "phone", label: "Phone/Hotline", icon: Phone },
  { value: "other", label: "Other", icon: Link2 },
];

const getPlatformIcon = (platform: string) => {
  const option = platformOptions.find(p => p.value === platform.toLowerCase());
  if (option) {
    const Icon = option.icon;
    return <Icon className="w-5 h-5" />;
  }
  return <Link2 className="w-5 h-5" />;
};

const SocialLinksPage = () => {
  const { data: links, isLoading } = useSocialLinks();
  const createLink = useCreateSocialLink();
  const updateLink = useUpdateSocialLink();
  const deleteLink = useDeleteSocialLink();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingLink, setEditingLink] = useState<SocialLink | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    platform: "",
    url: "",
    is_active: true,
  });

  const handleOpenDialog = (link?: SocialLink) => {
    if (link) {
      setEditingLink(link);
      setFormData({
        platform: link.platform,
        url: link.url,
        is_active: link.is_active,
      });
    } else {
      setEditingLink(null);
      setFormData({
        platform: "",
        url: "",
        is_active: true,
      });
    }
    setIsDialogOpen(true);
  };

  const handleSubmit = async () => {
    if (!formData.platform || !formData.url) return;

    if (editingLink) {
      await updateLink.mutateAsync({ id: editingLink.id, ...formData });
    } else {
      await createLink.mutateAsync(formData);
    }
    setIsDialogOpen(false);
    setEditingLink(null);
  };

  const handleDelete = async () => {
    if (deletingId) {
      await deleteLink.mutateAsync(deletingId);
      setIsDeleteDialogOpen(false);
      setDeletingId(null);
    }
  };

  const handleToggleStatus = async (link: SocialLink) => {
    await updateLink.mutateAsync({ id: link.id, is_active: !link.is_active });
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
          <h1 className="text-2xl font-bold text-foreground">Social Links</h1>
          <p className="text-muted-foreground">Configure social media and contact links</p>
        </div>
        <Button className="bg-primary text-primary-foreground" onClick={() => handleOpenDialog()}>
          <Plus className="w-4 h-4 mr-2" /> Add Link
        </Button>
      </div>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-lg">Social Media & Contact Links</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {links?.length === 0 ? (
            <div className="text-center py-8">
              <Link2 className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No social links yet. Add your first link.</p>
            </div>
          ) : (
            links?.map((link) => (
              <div key={link.id} className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg text-primary">
                    {getPlatformIcon(link.platform)}
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground capitalize">{link.platform}</h4>
                    <p className="text-sm text-muted-foreground truncate max-w-[300px]">{link.url}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={link.is_active}
                    onCheckedChange={() => handleToggleStatus(link)}
                  />
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleOpenDialog(link)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 text-destructive"
                    onClick={() => {
                      setDeletingId(link.id);
                      setIsDeleteDialogOpen(true);
                    }}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingLink ? "Edit Social Link" : "Add Social Link"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Platform</Label>
              <Select
                value={formData.platform}
                onValueChange={(value) => setFormData({ ...formData, platform: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select platform" />
                </SelectTrigger>
                <SelectContent>
                  {platformOptions.map((platform) => (
                    <SelectItem key={platform.value} value={platform.value}>
                      <div className="flex items-center gap-2">
                        <platform.icon className="w-4 h-4" />
                        {platform.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>URL / Number</Label>
              <Input
                value={formData.url}
                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                placeholder="https://wa.me/8801234567890"
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
                disabled={createLink.isPending || updateLink.isPending}
              >
                {(createLink.isPending || updateLink.isPending) && (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                )}
                {editingLink ? "Update" : "Create"}
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
              This action cannot be undone. This will permanently delete this social link.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleteLink.isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default SocialLinksPage;
