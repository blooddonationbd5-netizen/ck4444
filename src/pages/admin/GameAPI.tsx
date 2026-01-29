import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Save, Gamepad2, RefreshCw } from "lucide-react";

const gameProviders = [
  { name: "JILI Games", games: 45, status: true },
  { name: "PG Soft", games: 38, status: true },
  { name: "Pragmatic Play", games: 52, status: true },
  { name: "Evolution Gaming", games: 28, status: false },
  { name: "Spade Gaming", games: 33, status: true },
];

const GameAPI = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Game API Setup</h1>
        <p className="text-muted-foreground">Configure game providers and API settings</p>
      </div>

      <div className="grid gap-6">
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-lg">API Configuration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label>API Endpoint</Label>
              <Input defaultValue="https://api.gameprovider.com/v1" />
            </div>
            <div className="grid gap-2">
              <Label>API Key</Label>
              <Input type="password" defaultValue="sk_live_xxxxxxxxxxxxx" />
            </div>
            <div className="grid gap-2">
              <Label>Secret Key</Label>
              <Input type="password" defaultValue="xxxxxxxxxxxxx" />
            </div>
            <Button className="w-fit">
              <RefreshCw className="w-4 h-4 mr-2" /> Test Connection
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-lg">Game Providers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {gameProviders.map((provider) => (
                <div key={provider.name} className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Gamepad2 className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">{provider.name}</h4>
                      <p className="text-sm text-muted-foreground">{provider.games} games</p>
                    </div>
                  </div>
                  <Switch defaultChecked={provider.status} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Button className="bg-primary text-primary-foreground w-fit">
          <Save className="w-4 h-4 mr-2" /> Save Configuration
        </Button>
      </div>
    </div>
  );
};

export default GameAPI;
