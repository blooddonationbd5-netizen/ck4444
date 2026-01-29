import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Phone, Lock, User, Users, Loader2 } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import BottomNav from "@/components/BottomNav";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast({
        title: "Error!",
        description: "Passwords do not match.",
        variant: "destructive",
      });
      return;
    }

    if (password.length < 6) {
      toast({
        title: "Error!",
        description: "Password must be at least 6 characters.",
        variant: "destructive",
      });
      return;
    }

    if (phone.replace(/[^0-9]/g, '').length < 10) {
      toast({
        title: "Error!",
        description: "Please enter a valid mobile number.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      // Format phone as email for Supabase auth (phone@user.local)
      const cleanPhone = phone.replace(/[^0-9]/g, '');
      const phoneEmail = `${cleanPhone}@user.local`;
      
      const { error } = await supabase.auth.signUp({
        email: phoneEmail,
        password,
        options: {
          emailRedirectTo: window.location.origin,
          data: {
            full_name: fullName,
            phone: cleanPhone,
            referral_code: referralCode,
          },
        },
      });

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Registration complete. Please login.",
      });
      
      navigate("/login");
    } catch (error: any) {
      toast({
        title: "Error!",
        description: error.message || "Failed to register.",
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
        <p className="text-muted-foreground">Create a new account</p>
      </div>

      <div className="px-4 py-6">
        <form onSubmit={handleRegister} className="bg-card border border-border rounded-xl p-6">
          {/* Name Input */}
          <div className="mb-4">
            <label className="text-sm text-muted-foreground mb-2 block">
              Full Name
            </label>
            <div className="flex items-center gap-2 bg-secondary rounded-lg px-4 py-3">
              <User className="w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your full name"
                className="flex-1 bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground"
                required
              />
            </div>
          </div>

          {/* Phone Input */}
          <div className="mb-4">
            <label className="text-sm text-muted-foreground mb-2 block">
              Mobile Number
            </label>
            <div className="flex items-center gap-2 bg-secondary rounded-lg px-4 py-3">
              <Phone className="w-5 h-5 text-muted-foreground" />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter your mobile number"
                className="flex-1 bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground"
                required
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label className="text-sm text-muted-foreground mb-2 block">
              Password
            </label>
            <div className="flex items-center gap-2 bg-secondary rounded-lg px-4 py-3">
              <Lock className="w-5 h-5 text-muted-foreground" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
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

          {/* Confirm Password Input */}
          <div className="mb-4">
            <label className="text-sm text-muted-foreground mb-2 block">
              Confirm Password
            </label>
            <div className="flex items-center gap-2 bg-secondary rounded-lg px-4 py-3">
              <Lock className="w-5 h-5 text-muted-foreground" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                className="flex-1 bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="text-muted-foreground"
              >
                {showConfirmPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Referral Code Input */}
          <div className="mb-6">
            <label className="text-sm text-muted-foreground mb-2 block">
              Referral Code (Optional)
            </label>
            <div className="flex items-center gap-2 bg-secondary rounded-lg px-4 py-3">
              <Users className="w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                value={referralCode}
                onChange={(e) => setReferralCode(e.target.value)}
                placeholder="Enter referral code if you have one"
                className="flex-1 bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground"
              />
            </div>
          </div>

          {/* Register Button */}
          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-gold text-primary-foreground py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            Register
          </button>

          {/* Login Link */}
          <p className="text-center mt-6 text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="text-primary font-semibold">
              Login
            </Link>
          </p>
        </form>
      </div>

      <BottomNav />
    </div>
  );
};

export default Register;
