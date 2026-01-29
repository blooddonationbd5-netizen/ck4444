import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Bonus {
  id: string;
  name: string;
  type: string;
  amount: string;
  max_amount: string | null;
  description: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export const useBonuses = () => {
  return useQuery({
    queryKey: ['bonuses'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('bonuses')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Bonus[];
    },
  });
};

export const useCreateBonus = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (bonus: Omit<Bonus, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('bonuses')
        .insert(bonus)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bonuses'] });
      toast({
        title: 'Success!',
        description: 'Bonus created successfully.',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error!',
        description: error.message || 'Failed to create bonus.',
        variant: 'destructive',
      });
    },
  });
};

export const useUpdateBonus = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Bonus> & { id: string }) => {
      const { data, error } = await supabase
        .from('bonuses')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bonuses'] });
      toast({
        title: 'Success!',
        description: 'Bonus updated successfully.',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error!',
        description: error.message || 'Failed to update bonus.',
        variant: 'destructive',
      });
    },
  });
};

export const useDeleteBonus = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('bonuses')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bonuses'] });
      toast({
        title: 'Success!',
        description: 'Bonus deleted successfully.',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error!',
        description: error.message || 'Failed to delete bonus.',
        variant: 'destructive',
      });
    },
  });
};
