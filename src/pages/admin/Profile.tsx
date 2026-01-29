import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Save, Camera } from "lucide-react";

const Profile = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Profile</h1>
        <p className="text-muted-foreground">Manage your admin profile</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="bg-card border-border">
          <CardContent className="p-6 flex flex-col items-center">
            <div className="relative">
              <Avatar className="w-24 h-24">
                <AvatarImage src="" />
                <AvatarFallback className="bg-primary text-primary-foreground text-2xl">A</AvatarFallback>
              </Avatar>
              <Button size="icon" className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-primary">
                <Camera className="w-4 h-4" />
              </Button>
            </div>
            <h3 className="mt-4 font-semibold text-lg text-foreground">Admin User</h3>
            <p className="text-sm text-muted-foreground">Super Admin</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Profile Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Full Name</Label>
                <Input defaultValue="Admin User" />
              </div>
              <div className="grid gap-2">
                <Label>Username</Label>
                <Input defaultValue="admin" />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Email</Label>
                <Input type="email" defaultValue="admin@ck44.com" />
              </div>
              <div className="grid gap-2">
                <Label>Phone</Label>
                <Input defaultValue="+880 1234567890" />
              </div>
            </div>
            <Button className="bg-primary text-primary-foreground">
              <Save className="w-4 h-4 mr-2" /> Save Changes
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-card border-border lg:col-span-3">
          <CardHeader>
            <CardTitle className="text-lg">Change Password</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="grid gap-2">
                <Label>Current Password</Label>
                <Input type="password" />
              </div>
              <div className="grid gap-2">
                <Label>New Password</Label>
                <Input type="password" />
              </div>
              <div className="grid gap-2">
                <Label>Confirm Password</Label>
                <Input type="password" />
              </div>
            </div>
            <Button className="bg-primary text-primary-foreground">
              <Save className="w-4 h-4 mr-2" /> Update Password
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
