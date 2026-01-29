import { ChevronLeft, CreditCard, Plus, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BottomNav from "@/components/BottomNav";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface SavedCard {
  id: string;
  type: string;
  accountNumber: string;
  accountName: string;
}

const MyCards = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [cards, setCards] = useState<SavedCard[]>([
    { id: '1', type: 'bKash', accountNumber: '01712345678', accountName: 'John Doe' },
    { id: '2', type: 'Nagad', accountNumber: '01812345678', accountName: 'John Doe' },
  ]);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newCard, setNewCard] = useState({ type: '', accountNumber: '', accountName: '' });

  const handleAddCard = () => {
    if (!newCard.type || !newCard.accountNumber || !newCard.accountName) {
      toast({ title: 'Error', description: 'Please fill in all fields', variant: 'destructive' });
      return;
    }

    setCards([...cards, { 
      id: Date.now().toString(), 
      ...newCard 
    }]);
    setNewCard({ type: '', accountNumber: '', accountName: '' });
    setIsAddOpen(false);
    toast({ title: 'Success', description: 'Card added successfully' });
  };

  const handleDeleteCard = (id: string) => {
    setCards(cards.filter(c => c.id !== id));
    toast({ title: 'Deleted', description: 'Card removed successfully' });
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="bg-card border-b border-border px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="text-foreground">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <h1 className="text-lg font-bold text-foreground">My Cards</h1>
          </div>
          <button 
            onClick={() => setIsAddOpen(true)}
            className="p-2 text-primary"
          >
            <Plus className="w-6 h-6" />
          </button>
        </div>
      </div>

      <div className="px-4 py-4">
        {cards.length > 0 ? (
          <div className="space-y-3">
            {cards.map((card) => (
              <div key={card.id} className="bg-card border border-border rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <CreditCard className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-foreground font-medium">{card.type}</p>
                    <p className="text-sm text-muted-foreground">{card.accountNumber}</p>
                    <p className="text-xs text-muted-foreground">{card.accountName}</p>
                  </div>
                  <button 
                    onClick={() => handleDeleteCard(card.id)}
                    className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <CreditCard className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground mb-4">No saved cards</p>
            <Button onClick={() => setIsAddOpen(true)}>Add New Card</Button>
          </div>
        )}
      </div>

      {/* Add Card Dialog */}
      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Card</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Payment Method</label>
              <Select value={newCard.type} onValueChange={(v) => setNewCard({...newCard, type: v})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bKash">bKash</SelectItem>
                  <SelectItem value="Nagad">Nagad</SelectItem>
                  <SelectItem value="Rocket">Rocket</SelectItem>
                  <SelectItem value="Bank">Bank Account</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Account Number</label>
              <Input 
                value={newCard.accountNumber}
                onChange={(e) => setNewCard({...newCard, accountNumber: e.target.value})}
                placeholder="Enter account number"
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Account Name</label>
              <Input 
                value={newCard.accountName}
                onChange={(e) => setNewCard({...newCard, accountName: e.target.value})}
                placeholder="Enter account holder name"
              />
            </div>
            <Button onClick={handleAddCard} className="w-full">Save Card</Button>
          </div>
        </DialogContent>
      </Dialog>

      <BottomNav />
    </div>
  );
};

export default MyCards;
