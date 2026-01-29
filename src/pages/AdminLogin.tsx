import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, Loader2, Shield } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const AdminLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) throw authError;

      // Check if user is admin
      const { data: roleData, error: roleError } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', authData.user.id)
        .eq('role', 'admin')
        .maybeSingle();

      if (roleError) throw roleError;

      if (!roleData) {
        await supabase.auth.signOut();
        throw new Error('You do not have admin access.');
      }

      toast({
        title: "Welcome Admin!",
        description: "You have been logged in successfully.",
      });
      
      navigate("/admin");
    } catch (error: any) {
      toast({
        title: "Error!",
        description: error.message || "Failed to login.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <Shield className="w-8 h-8 text-primary" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-foreground">Admin Login</h1>
          <p className="text-muted-foreground mt-2">Enter your credentials to access admin panel</p>
        </div>

        <form onSubmit={handleLogin} className="bg-card border border-border rounded-xl p-6">
          {/* Email Input */}
          <div className="mb-4">
            <label className="text-sm text-muted-foreground mb-2 block">
              Email
            </label>
            <div className="flex items-center gap-2 bg-secondary rounded-lg px-4 py-3">
              <Mail className="w-5 h-5 text-muted-foreground" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                className="flex-1 bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground"
                required
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="mb-6">
            <label className="text-sm text-muted-foreground mb-2 block">
              Password
            </label>
            <div className="flex items-center gap-2 bg-secondary rounded-lg px-4 py-3">
              <Lock className="w-5 h-5 text-muted-foreground" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="flex-1 bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-muted-foreground"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Login Button */}
          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            Login to Admin Panel
          </button>

          {/* Back to Home */}
          <p className="text-center mt-6 text-muted-foreground">
            <Link to="/" className="text-primary font-semibold">
              ← Back to Home
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
