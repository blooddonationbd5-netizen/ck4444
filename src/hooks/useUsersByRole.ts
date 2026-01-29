import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Database } from '@/integrations/supabase/types';

type AppRole = Database['public']['Enums']['app_role'];

export interface UserWithRole {
  id: string;
  user_id: string;
  username: string | null;
  full_name: string | null;
  phone: string | null;
  balance: number;
  status: string;
  referral_code: string | null;
  created_at: string;
  role: AppRole;
}

export const useUsersByRole = (role: AppRole) => {
  return useQuery({
    queryKey: ['users-by-role', role],
    queryFn: async () => {
      // First get all user_ids with this role
      const { data: roleData, error: roleError } = await supabase
        .from('user_roles')
        .select('user_id')
        .eq('role', role);
      
      if (roleError) throw roleError;
      if (!roleData || roleData.length === 0) return [];
      
      const userIds = roleData.map(r => r.user_id);
      
      // Then get profiles for these users
      const { data: profiles, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .in('user_id', userIds)
        .order('created_at', { ascending: false });
      
      if (profileError) throw profileError;
      
      return (profiles || []).map(p => ({
        ...p,
        role
      })) as UserWithRole[];
    },
  });
};

export const useAssignRole = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ user_id, role }: { user_id: string; role: AppRole }) => {
      const { error } = await supabase
        .from('user_roles')
        .insert({ user_id, role });
      
      if (error) throw error;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['users-by-role', variables.role] });
      queryClient.invalidateQueries({ queryKey: ['profiles'] });
      toast({
        title: 'Success!',
        description: 'Role assigned successfully.',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error!',
        description: error.message || 'Failed to assign role.',
        variant: 'destructive',
      });
    },
  });
};

export const useRemoveRole = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ user_id, role }: { user_id: string; role: AppRole }) => {
      const { error } = await supabase
        .from('user_roles')
        .delete()
        .eq('user_id', user_id)
        .eq('role', role);
      
      if (error) throw error;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['users-by-role', variables.role] });
      queryClient.invalidateQueries({ queryKey: ['profiles'] });
      toast({
        title: 'Success!',
        description: 'Role removed successfully.',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error!',
        description: error.message || 'Failed to remove role.',
        variant: 'destructive',
      });
    },
  });
};

export const useUpdateUserStatus = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { error } = await supabase
        .from('profiles')
        .update({ status })
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users-by-role'] });
      queryClient.invalidateQueries({ queryKey: ['profiles'] });
      toast({
        title: 'Success!',
        description: 'Status updated successfully.',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error!',
        description: error.message || 'Failed to update status.',
        variant: 'destructive',
      });
    },
  });
};
