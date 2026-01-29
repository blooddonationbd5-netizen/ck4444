import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Save, Facebook, MessageCircle, Send, Phone } from "lucide-react";

const SocialLinks = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Social Links</h1>
        <p className="text-muted-foreground">Configure social media and contact links</p>
      </div>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-lg">Social Media Links</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-whatsapp" /> WhatsApp
            </Label>
            <Input defaultValue="https://wa.me/8801234567890" />
          </div>
          <div className="grid gap-2">
            <Label className="flex items-center gap-2">
              <Facebook className="w-4 h-4 text-facebook" /> Facebook
            </Label>
            <Input defaultValue="https://facebook.com/ck44official" />
          </div>
          <div className="grid gap-2">
            <Label className="flex items-center gap-2">
              <Send className="w-4 h-4 text-telegram" /> Telegram
            </Label>
            <Input defaultValue="https://t.me/ck44official" />
          </div>
          <div className="grid gap-2">
            <Label className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-support" /> Support Hotline
            </Label>
            <Input defaultValue="+880 1234567890" />
          </div>
          <Button className="bg-primary text-primary-foreground">
            <Save className="w-4 h-4 mr-2" /> Save Links
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default SocialLinks;
