import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Edit, Trash2, Bell } from "lucide-react";

const notices = [
  { id: 1, title: "System Maintenance", content: "Platform will be under maintenance...", status: "Active", created: "2024-01-15" },
  { id: 2, title: "New Game Added", content: "Check out the new slot game...", status: "Active", created: "2024-01-14" },
  { id: 3, title: "Bonus Update", content: "New welcome bonus available...", status: "Inactive", created: "2024-01-13" },
];

const Notice = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Notice Management</h1>
          <p className="text-muted-foreground">Manage site announcements and notices</p>
        </div>
        <Button className="bg-primary text-primary-foreground">
          <Plus className="w-4 h-4 mr-2" /> Add Notice
        </Button>
      </div>

      <div className="grid gap-4">
        {notices.map((notice) => (
          <Card key={notice.id} className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Bell className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">{notice.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{notice.content}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        notice.status === "Active" ? "bg-success/20 text-success" : "bg-muted text-muted-foreground"
                      }`}>
                        {notice.status}
                      </span>
                      <span className="text-xs text-muted-foreground">{notice.created}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8"><Edit className="w-4 h-4" /></Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive"><Trash2 className="w-4 h-4" /></Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Notice;
