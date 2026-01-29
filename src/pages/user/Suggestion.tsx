import { ChevronLeft, MessageSquare, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BottomNav from "@/components/BottomNav";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const Suggestion = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [category, setCategory] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!category || !message.trim()) {
      toast({ title: 'Error', description: 'Please fill in all fields', variant: 'destructive' });
      return;
    }

    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
    
    toast({ title: 'Success', description: 'Thank you for your suggestion!' });
    setCategory('');
    setMessage('');
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="bg-card border-b border-border px-4 py-4">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="text-foreground">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-bold text-foreground">Suggestion</h1>
        </div>
      </div>

      <div className="px-4 py-4 space-y-4">
        {/* Info Card */}
        <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 flex items-start gap-3">
          <MessageSquare className="w-6 h-6 text-primary flex-shrink-0" />
          <p className="text-sm text-foreground">
            We value your feedback! Share your suggestions to help us improve your gaming experience.
          </p>
        </div>

        {/* Form */}
        <div className="bg-card border border-border rounded-xl p-4 space-y-4">
          <div>
            <label className="text-sm text-muted-foreground mb-2 block">Category</label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="games">Games</SelectItem>
                <SelectItem value="deposit">Deposit & Withdrawal</SelectItem>
                <SelectItem value="promotions">Promotions</SelectItem>
                <SelectItem value="app">App Features</SelectItem>
                <SelectItem value="support">Customer Support</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm text-muted-foreground mb-2 block">Your Suggestion</label>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell us your thoughts..."
              rows={6}
              className="resize-none"
            />
          </div>

          <Button 
            onClick={handleSubmit} 
            disabled={loading} 
            className="w-full gap-2"
          >
            <Send className="w-4 h-4" />
            {loading ? 'Submitting...' : 'Submit Suggestion'}
          </Button>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Suggestion;
