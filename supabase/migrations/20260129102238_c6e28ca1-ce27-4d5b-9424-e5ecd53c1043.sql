-- Fix RLS policy for sliders - add WITH CHECK for INSERT operations
DROP POLICY IF EXISTS "Admins can manage sliders" ON public.sliders;

CREATE POLICY "Admins can manage sliders" 
ON public.sliders 
FOR ALL 
USING (is_admin())
WITH CHECK (is_admin());