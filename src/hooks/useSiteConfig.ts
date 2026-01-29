import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface PaymentMethod {
  id: string;
  name: string;
  type: string;
  account_number: string | null;
  min_amount: number;
  max_amount: number;
  is_active: boolean;
  created_at: string;
}

export interface Bonus {
  id: string;
  name: string;
  type: string;
  amount: string;
  max_amount: string | null;
  description: string | null;
  is_active: boolean;
  created_at: string;
}

export interface Slider {
  id: string;
  title: string;
  image_url: string;
  link_url: string | null;
  display_order: number;
  is_active: boolean;
}

export interface Notice {
  id: string;
  title: string;
  content: string;
  is_active: boolean;
  created_at: string;
}

export interface Promotion {
  id: string;
  title: string;
  type: string;
  discount: string;
  description: string | null;
  valid_till: string | null;
  is_active: boolean;
}

export interface SocialLink {
  id: string;
  platform: string;
  url: string;
  is_active: boolean;
}

// Payment Methods
export const usePaymentMethods = () => {
  return useQuery({
    queryKey: ['payment_methods'],
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

// Bonuses
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

// Sliders
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

// Notices
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

// Promotions
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

// Social Links
export const useSocialLinks = () => {
  return useQuery({
    queryKey: ['social_links'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('social_links')
        .select('*')
        .order('platform', { ascending: true });
      
      if (error) throw error;
      return data as SocialLink[];
    },
  });
};
