import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Edit, Trash2, Image, MoveUp, MoveDown, Loader2 } from "lucide-react";
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
import { useSliders, useCreateSlider, useUpdateSlider, useDeleteSlider, Slider } from "@/hooks/useSliders";

const SlidersPage = () => {
  const { data: sliders, isLoading } = useSliders();
  const createSlider = useCreateSlider();
  const updateSlider = useUpdateSlider();
  const deleteSlider = useDeleteSlider();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingSlider, setEditingSlider] = useState<Slider | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    image_url: "",
    link_url: "",
    display_order: 0,
    is_active: true,
  });

  const handleOpenDialog = (slider?: Slider) => {
    if (slider) {
      setEditingSlider(slider);
      setFormData({
        title: slider.title,
        image_url: slider.image_url,
        link_url: slider.link_url || "",
        display_order: slider.display_order,
        is_active: slider.is_active,
      });
    } else {
      setEditingSlider(null);
      const nextOrder = sliders?.length ? Math.max(...sliders.map(s => s.display_order)) + 1 : 1;
      setFormData({
        title: "",
        image_url: "",
        link_url: "",
        display_order: nextOrder,
        is_active: true,
      });
    }
    setIsDialogOpen(true);
  };

  const handleSubmit = async () => {
    if (!formData.title || !formData.image_url) return;

    if (editingSlider) {
      await updateSlider.mutateAsync({ id: editingSlider.id, ...formData });
    } else {
      await createSlider.mutateAsync(formData);
    }
    setIsDialogOpen(false);
    setEditingSlider(null);
  };

  const handleDelete = async () => {
    if (deletingId) {
      await deleteSlider.mutateAsync(deletingId);
      setIsDeleteDialogOpen(false);
      setDeletingId(null);
    }
  };

  const handleToggleStatus = async (slider: Slider) => {
    await updateSlider.mutateAsync({ id: slider.id, is_active: !slider.is_active });
  };

  const handleMoveOrder = async (slider: Slider, direction: 'up' | 'down') => {
    const sortedSliders = [...(sliders || [])].sort((a, b) => a.display_order - b.display_order);
    const currentIndex = sortedSliders.findIndex(s => s.id === slider.id);
    
    if (direction === 'up' && currentIndex > 0) {
      const prevSlider = sortedSliders[currentIndex - 1];
      await updateSlider.mutateAsync({ id: slider.id, display_order: prevSlider.display_order });
      await updateSlider.mutateAsync({ id: prevSlider.id, display_order: slider.display_order });
    } else if (direction === 'down' && currentIndex < sortedSliders.length - 1) {
      const nextSlider = sortedSliders[currentIndex + 1];
      await updateSlider.mutateAsync({ id: slider.id, display_order: nextSlider.display_order });
      await updateSlider.mutateAsync({ id: nextSlider.id, display_order: slider.display_order });
    }
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
          <h1 className="text-2xl font-bold text-foreground">Slider Management</h1>
          <p className="text-muted-foreground">Manage homepage sliders and banners</p>
        </div>
        <Button className="bg-primary text-primary-foreground" onClick={() => handleOpenDialog()}>
          <Plus className="w-4 h-4 mr-2" /> Add Slider
        </Button>
      </div>

      <div className="grid gap-4">
        {sliders?.length === 0 ? (
          <Card className="bg-card border-border">
            <CardContent className="p-8 text-center">
              <Image className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No sliders yet. Add your first slider.</p>
            </CardContent>
          </Card>
        ) : (
          sliders?.map((slider) => (
            <Card key={slider.id} className="bg-card border-border overflow-hidden">
              <CardContent className="p-0">
                <div className="flex flex-col sm:flex-row">
                  <div className="sm:w-48 h-32 bg-secondary">
                    <img src={slider.image_url} alt={slider.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 p-4 flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-foreground">{slider.title}</h3>
                      <p className="text-sm text-muted-foreground">Order: {slider.display_order}</p>
                      <span className={`text-xs px-2 py-1 rounded-full inline-block mt-2 ${
                        slider.is_active ? "bg-green-500/20 text-green-500" : "bg-muted text-muted-foreground"
                      }`}>
                        {slider.is_active ? "Active" : "Inactive"}
                      </span>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center gap-2">
                      <Switch
                        checked={slider.is_active}
                        onCheckedChange={() => handleToggleStatus(slider)}
                      />
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleMoveOrder(slider, 'up')}>
                        <MoveUp className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleMoveOrder(slider, 'down')}>
                        <MoveDown className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleOpenDialog(slider)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-destructive"
                        onClick={() => {
                          setDeletingId(slider.id);
                          setIsDeleteDialogOpen(true);
                        }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
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
            <DialogTitle>{editingSlider ? "Edit Slider" : "Add Slider"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Enter slider title"
              />
            </div>
            <div className="space-y-2">
              <Label>Image URL</Label>
              <Input
                value={formData.image_url}
                onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                placeholder="Enter image URL"
              />
            </div>
            <div className="space-y-2">
              <Label>Link URL (Optional)</Label>
              <Input
                value={formData.link_url}
                onChange={(e) => setFormData({ ...formData, link_url: e.target.value })}
                placeholder="Enter link URL"
              />
            </div>
            <div className="space-y-2">
              <Label>Display Order</Label>
              <Input
                type="number"
                value={formData.display_order}
                onChange={(e) => setFormData({ ...formData, display_order: Number(e.target.value) })}
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
                disabled={createSlider.isPending || updateSlider.isPending}
              >
                {(createSlider.isPending || updateSlider.isPending) && (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                )}
                {editingSlider ? "Update" : "Create"}
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
              This action cannot be undone. This will permanently delete this slider.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleteSlider.isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default SlidersPage;
