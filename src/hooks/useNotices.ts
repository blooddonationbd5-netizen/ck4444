import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Notice {
  id: string;
  title: string;
  content: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export const useNotices = () => {
  return useQuery({
    queryKey: ['notices'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('notices')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Notice[];
    },
  });
};

export const useCreateNotice = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (notice: { title: string; content: string; is_active?: boolean }) => {
      const { data, error } = await supabase
        .from('notices')
        .insert([notice])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notices'] });
      toast({
        title: 'Success!',
        description: 'Notice created successfully.',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error!',
        description: error.message || 'Failed to create notice.',
        variant: 'destructive',
      });
    },
  });
};

export const useUpdateNotice = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, ...updates }: { id: string; title?: string; content?: string; is_active?: boolean }) => {
      const { error } = await supabase
        .from('notices')
        .update(updates)
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notices'] });
      toast({
        title: 'Success!',
        description: 'Notice updated successfully.',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error!',
        description: error.message || 'Failed to update notice.',
        variant: 'destructive',
      });
    },
  });
};

export const useDeleteNotice = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('notices')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notices'] });
      toast({
        title: 'Success!',
        description: 'Notice deleted successfully.',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error!',
        description: error.message || 'Failed to delete notice.',
        variant: 'destructive',
      });
    },
  });
};
