import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

interface Bet {
  id: string;
  user_id: string;
  sport: string;
  match_id: string;
  team1: string;
  team2: string;
  selection: string;
  odds: number;
  amount: number;
  potential_win: number;
  status: string;
  result: string | null;
  created_at: string;
}

interface PlaceBetParams {
  sport: string;
  match_id: string;
  team1: string;
  team2: string;
  selection: string;
  odds: number;
  amount: number;
}

export const useBets = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["bets", user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from("bets")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as Bet[];
    },
    enabled: !!user,
  });
};

export const usePlaceBet = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: PlaceBetParams) => {
      if (!user) throw new Error("User not authenticated");

      const potential_win = params.amount * params.odds;

      const { data, error } = await supabase
        .from("bets")
        .insert({
          user_id: user.id,
          sport: params.sport,
          match_id: params.match_id,
          team1: params.team1,
          team2: params.team2,
          selection: params.selection,
          odds: params.odds,
          amount: params.amount,
          potential_win: potential_win,
          status: "pending",
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bets"] });
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
      toast.success("Bet placed successfully!");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to place bet");
    },
  });
};
