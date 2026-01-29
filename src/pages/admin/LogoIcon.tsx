import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Save, Upload, Image } from "lucide-react";

const LogoIcon = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Logo & Icon</h1>
        <p className="text-muted-foreground">Manage site logo and favicon</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-lg">Site Logo</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="w-full h-32 bg-secondary rounded-lg flex items-center justify-center border-2 border-dashed border-border">
              <div className="text-center">
                <Image className="w-10 h-10 text-muted-foreground mx-auto" />
                <p className="text-sm text-muted-foreground mt-2">Current Logo</p>
              </div>
            </div>
            <div className="grid gap-2">
              <Label>Upload New Logo</Label>
              <Input type="file" accept="image/*" />
            </div>
            <Button className="w-full">
              <Upload className="w-4 h-4 mr-2" /> Upload Logo
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-lg">Favicon</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="w-20 h-20 bg-secondary rounded-lg flex items-center justify-center border-2 border-dashed border-border mx-auto">
              <div className="text-center">
                <Image className="w-8 h-8 text-muted-foreground" />
              </div>
            </div>
            <div className="grid gap-2">
              <Label>Upload Favicon (32x32)</Label>
              <Input type="file" accept="image/*" />
            </div>
            <Button className="w-full">
              <Upload className="w-4 h-4 mr-2" /> Upload Favicon
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LogoIcon;
