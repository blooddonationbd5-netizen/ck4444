import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, Image, MoveUp, MoveDown } from "lucide-react";
import promoBanner from "@/assets/promo-banner.jpg";

const sliders = [
  { id: 1, title: "Welcome Bonus", image: promoBanner, order: 1, status: "Active" },
  { id: 2, title: "Daily Cashback", image: promoBanner, order: 2, status: "Active" },
  { id: 3, title: "Refer & Earn", image: promoBanner, order: 3, status: "Inactive" },
];

const Sliders = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Slider Management</h1>
          <p className="text-muted-foreground">Manage homepage sliders and banners</p>
        </div>
        <Button className="bg-primary text-primary-foreground">
          <Plus className="w-4 h-4 mr-2" /> Add Slider
        </Button>
      </div>

      <div className="grid gap-4">
        {sliders.map((slider) => (
          <Card key={slider.id} className="bg-card border-border overflow-hidden">
            <CardContent className="p-0">
              <div className="flex flex-col sm:flex-row">
                <div className="sm:w-48 h-32 bg-secondary">
                  <img src={slider.image} alt={slider.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 p-4 flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-foreground">{slider.title}</h3>
                    <p className="text-sm text-muted-foreground">Order: {slider.order}</p>
                    <span className={`text-xs px-2 py-1 rounded-full inline-block mt-2 ${
                      slider.status === "Active" ? "bg-success/20 text-success" : "bg-muted text-muted-foreground"
                    }`}>
                      {slider.status}
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row items-center gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8"><MoveUp className="w-4 h-4" /></Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8"><MoveDown className="w-4 h-4" /></Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8"><Edit className="w-4 h-4" /></Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive"><Trash2 className="w-4 h-4" /></Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Sliders;
