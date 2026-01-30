-- Create bets table for storing user bets
CREATE TABLE public.bets (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  sport TEXT NOT NULL,
  match_id TEXT NOT NULL,
  team1 TEXT NOT NULL,
  team2 TEXT NOT NULL,
  selection TEXT NOT NULL,
  odds NUMERIC NOT NULL,
  amount NUMERIC NOT NULL CHECK (amount > 0 AND amount <= 100000),
  potential_win NUMERIC NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  result TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.bets ENABLE ROW LEVEL SECURITY;

-- Users can view their own bets
CREATE POLICY "Users can view their own bets"
ON public.bets
FOR SELECT
USING (auth.uid() = user_id);

-- Users can create bets (with validation)
CREATE POLICY "Users can create bets"
ON public.bets
FOR INSERT
WITH CHECK (
  auth.uid() = user_id 
  AND amount > 0 
  AND amount <= 100000 
  AND status = 'pending'
);

-- Admins can view all bets
CREATE POLICY "Admins can view all bets"
ON public.bets
FOR SELECT
USING (is_admin());

-- Admins can update bets (for settling)
CREATE POLICY "Admins can update bets"
ON public.bets
FOR UPDATE
USING (is_admin());

-- Create trigger for updated_at
CREATE TRIGGER update_bets_updated_at
BEFORE UPDATE ON public.bets
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();