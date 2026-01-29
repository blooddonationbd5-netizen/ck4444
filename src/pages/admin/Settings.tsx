import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Save } from "lucide-react";

const Settings = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">General Settings</h1>
        <p className="text-muted-foreground">Configure site-wide settings</p>
      </div>

      <div className="grid gap-6">
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-lg">Site Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label>Site Name</Label>
              <Input defaultValue="CK44.COM" />
            </div>
            <div className="grid gap-2">
              <Label>Site URL</Label>
              <Input defaultValue="https://ck44.com" />
            </div>
            <div className="grid gap-2">
              <Label>Contact Email</Label>
              <Input type="email" defaultValue="support@ck44.com" />
            </div>
            <div className="grid gap-2">
              <Label>Contact Phone</Label>
              <Input defaultValue="+880 1234567890" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-lg">System Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Maintenance Mode</Label>
                <p className="text-sm text-muted-foreground">Enable to put site in maintenance</p>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Registration Open</Label>
                <p className="text-sm text-muted-foreground">Allow new user registrations</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Email Verification</Label>
                <p className="text-sm text-muted-foreground">Require email verification</p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-lg">Currency Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label>Currency Symbol</Label>
              <Input defaultValue="৳" />
            </div>
            <div className="grid gap-2">
              <Label>Minimum Deposit</Label>
              <Input type="number" defaultValue="100" />
            </div>
            <div className="grid gap-2">
              <Label>Minimum Withdrawal</Label>
              <Input type="number" defaultValue="500" />
            </div>
          </CardContent>
        </Card>

        <Button className="bg-primary text-primary-foreground w-fit">
          <Save className="w-4 h-4 mr-2" /> Save Settings
        </Button>
      </div>
    </div>
  );
};

export default Settings;
