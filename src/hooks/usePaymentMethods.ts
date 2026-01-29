import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface PaymentMethod {
  id: string;
  name: string;
  type: string;
  account_number: string | null;
  min_amount: number | null;
  max_amount: number | null;
  is_active: boolean;
  logo_url?: string | null;
  created_at: string;
  updated_at: string;
}

export const usePaymentMethods = () => {
  return useQuery({
    queryKey: ['payment-methods'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('payment_methods')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as PaymentMethod[];
    },
  });
};

export const useCreatePaymentMethod = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (method: { 
      name: string; 
      type: string; 
      account_number?: string; 
      min_amount?: number; 
      max_amount?: number;
      is_active?: boolean;
    }) => {
      const { data, error } = await supabase
        .from('payment_methods')
        .insert([method])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payment-methods'] });
      toast({
        title: 'Success!',
        description: 'Payment method created successfully.',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error!',
        description: error.message || 'Failed to create payment method.',
        variant: 'destructive',
      });
    },
  });
};

export const useUpdatePaymentMethod = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, ...updates }: { 
      id: string; 
      name?: string; 
      type?: string;
      account_number?: string;
      min_amount?: number;
      max_amount?: number;
      is_active?: boolean;
      logo_url?: string | null;
    }) => {
      const { error } = await supabase
        .from('payment_methods')
        .update(updates)
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payment-methods'] });
      toast({
        title: 'Success!',
        description: 'Payment method updated successfully.',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error!',
        description: error.message || 'Failed to update payment method.',
        variant: 'destructive',
      });
    },
  });
};

export const useDeletePaymentMethod = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('payment_methods')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payment-methods'] });
      toast({
        title: 'Success!',
        description: 'Payment method deleted successfully.',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error!',
        description: error.message || 'Failed to delete payment method.',
        variant: 'destructive',
      });
    },
  });
};
