import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, Loader2 } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import BottomNav from "@/components/BottomNav";

const Login = () => {
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
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      toast({
        title: "Success!",
        description: "You have been logged in successfully.",
      });
      
      navigate("/");
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
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-gradient-teal px-4 py-8 text-center">
        <div className="flex items-center justify-center mb-4">
          <span className="text-3xl font-bold text-gradient-gold">CK44</span>
          <span className="text-3xl font-bold text-foreground">.COM</span>
        </div>
        <p className="text-muted-foreground">Login to your account</p>
      </div>

      <div className="px-4 py-6">
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
                placeholder="Enter your email"
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

          {/* Forgot Password */}
          <div className="text-right mb-6">
            <Link to="/forgot-password" className="text-primary text-sm">
              Forgot Password?
            </Link>
          </div>

          {/* Login Button */}
          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-gold text-primary-foreground py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            Login
          </button>

          {/* Register Link */}
          <p className="text-center mt-6 text-muted-foreground">
            Don't have an account?{" "}
            <Link to="/register" className="text-primary font-semibold">
              Register
            </Link>
          </p>
        </form>
      </div>

      <BottomNav />
    </div>
  );
};

export default Login;
