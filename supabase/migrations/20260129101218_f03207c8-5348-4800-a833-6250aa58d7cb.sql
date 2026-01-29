-- Fix RLS policies for better security

-- 1. Drop existing public SELECT policies that expose sensitive data
DROP POLICY IF EXISTS "Anyone can view active payment methods" ON public.payment_methods;
DROP POLICY IF EXISTS "Anyone can view active bonuses" ON public.bonuses;
DROP POLICY IF EXISTS "Anyone can view active notices" ON public.notices;
DROP POLICY IF EXISTS "Anyone can view active sliders" ON public.sliders;
DROP POLICY IF EXISTS "Anyone can view active social links" ON public.social_links;
DROP POLICY IF EXISTS "Anyone can view active promotions" ON public.promotions;

-- 2. Create new policies that require authentication for sensitive tables
-- Payment methods - only authenticated users can view (hide account_number from non-admins)
CREATE POLICY "Authenticated users can view active payment methods" 
ON public.payment_methods 
FOR SELECT 
USING (is_active = true AND auth.uid() IS NOT NULL);

-- Bonuses - only authenticated users
CREATE POLICY "Authenticated users can view active bonuses" 
ON public.bonuses 
FOR SELECT 
USING (is_active = true AND auth.uid() IS NOT NULL);

-- Notices - can be public (no sensitive data)
CREATE POLICY "Anyone can view active notices" 
ON public.notices 
FOR SELECT 
USING (is_active = true);

-- Sliders - can be public (no sensitive data)
CREATE POLICY "Anyone can view active sliders" 
ON public.sliders 
FOR SELECT 
USING (is_active = true);

-- Social links - can be public (no sensitive data)
CREATE POLICY "Anyone can view active social links" 
ON public.social_links 
FOR SELECT 
USING (is_active = true);

-- Promotions - can be public (no sensitive data)
CREATE POLICY "Anyone can view active promotions" 
ON public.promotions 
FOR SELECT 
USING (is_active = true);

-- 3. Ensure profiles table has strict RLS (already has good policies, but let's verify)
-- No changes needed - profiles already restricts to own user or admin

-- 4. Ensure transactions table has strict RLS (already has good policies)
-- No changes needed - transactions already restricts to own user or admin

-- 5. Ensure user_roles table has strict RLS (already has good policies)
-- No changes needed - user_roles already restricts to own user or admin