import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Transaction {
  id: string;
  user_id: string;
  type: string;
  amount: number;
  method: string | null;
  status: string;
  reference_id: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export const useTransactions = () => {
  return useQuery({
    queryKey: ['transactions'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Transaction[];
    },
  });
};

export const useDeposits = () => {
  return useQuery({
    queryKey: ['deposits'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .eq('type', 'deposit')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Transaction[];
    },
  });
};

export const useWithdrawals = () => {
  return useQuery({
    queryKey: ['withdrawals'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .eq('type', 'withdraw')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Transaction[];
    },
  });
};

export const useUpdateTransactionStatus = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { error } = await supabase
        .from('transactions')
        .update({ status })
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] });
      queryClient.invalidateQueries({ queryKey: ['deposits'] });
      queryClient.invalidateQueries({ queryKey: ['withdrawals'] });
      toast({
        title: 'সফল!',
        description: 'স্ট্যাটাস আপডেট হয়েছে।',
      });
    },
    onError: () => {
      toast({
        title: 'ত্রুটি!',
        description: 'স্ট্যাটাস আপডেট করতে ব্যর্থ হয়েছে।',
        variant: 'destructive',
      });
    },
  });
};
