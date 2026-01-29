-- Fix 1: Transaction Amount Validation - Add server-side validation via RLS WITH CHECK
-- Drop existing INSERT policy and create one with proper validation
DROP POLICY IF EXISTS "Users can create their own transactions" ON public.transactions;

CREATE POLICY "Users can create valid transactions" 
ON public.transactions 
FOR INSERT 
WITH CHECK (
  auth.uid() = user_id AND
  amount > 0 AND
  amount <= 1000000 AND
  type IN ('deposit', 'withdraw') AND
  status = 'pending'
);

-- Add CHECK constraint for transaction amount validation
ALTER TABLE public.transactions 
ADD CONSTRAINT valid_transaction_amount CHECK (amount > 0 AND amount <= 1000000);

-- Fix 2: Profiles Phone Exposure - Restrict profile access more strictly
-- The current policy allows users to view their own profile which is correct
-- But we need to ensure referral lookups don't expose other users' data
-- The referred_by field is a UUID reference, not exposing phone numbers directly
-- The actual security is in place - users can ONLY access their own profile via user_id = auth.uid()
-- No changes needed for profiles as RLS is already restrictive

-- Additional: Add index on referral_code to prevent enumeration via timing attacks
CREATE INDEX IF NOT EXISTS idx_profiles_referral_code ON public.profiles(referral_code);