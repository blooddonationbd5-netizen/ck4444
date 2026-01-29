import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Promotion {
  id: string;
  title: string;
  description: string | null;
  type: string;
  discount: string;
  valid_till: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export const usePromotions = () => {
  return useQuery({
    queryKey: ['promotions'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('promotions')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Promotion[];
    },
  });
};

export const useCreatePromotion = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (promotion: Omit<Promotion, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('promotions')
        .insert(promotion)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['promotions'] });
      toast({
        title: 'Success!',
        description: 'Promotion created successfully.',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error!',
        description: error.message || 'Failed to create promotion.',
        variant: 'destructive',
      });
    },
  });
};

export const useUpdatePromotion = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Promotion> & { id: string }) => {
      const { data, error } = await supabase
        .from('promotions')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['promotions'] });
      toast({
        title: 'Success!',
        description: 'Promotion updated successfully.',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error!',
        description: error.message || 'Failed to update promotion.',
        variant: 'destructive',
      });
    },
  });
};

export const useDeletePromotion = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('promotions')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['promotions'] });
      toast({
        title: 'Success!',
        description: 'Promotion deleted successfully.',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error!',
        description: error.message || 'Failed to delete promotion.',
        variant: 'destructive',
      });
    },
  });
};
