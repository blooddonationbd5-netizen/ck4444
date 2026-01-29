import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Slider {
  id: string;
  title: string;
  image_url: string;
  link_url: string | null;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export const useSliders = () => {
  return useQuery({
    queryKey: ['sliders'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('sliders')
        .select('*')
        .order('display_order', { ascending: true });
      
      if (error) throw error;
      return data as Slider[];
    },
  });
};

export const useCreateSlider = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (slider: Omit<Slider, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('sliders')
        .insert(slider)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sliders'] });
      toast({
        title: 'Success!',
        description: 'Slider created successfully.',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error!',
        description: error.message || 'Failed to create slider.',
        variant: 'destructive',
      });
    },
  });
};

export const useUpdateSlider = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Slider> & { id: string }) => {
      const { data, error } = await supabase
        .from('sliders')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sliders'] });
      toast({
        title: 'Success!',
        description: 'Slider updated successfully.',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error!',
        description: error.message || 'Failed to update slider.',
        variant: 'destructive',
      });
    },
  });
};

export const useDeleteSlider = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('sliders')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sliders'] });
      toast({
        title: 'Success!',
        description: 'Slider deleted successfully.',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error!',
        description: error.message || 'Failed to delete slider.',
        variant: 'destructive',
      });
    },
  });
};
