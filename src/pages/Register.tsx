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
  const [email, setEmail] = useState("");
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
        title: "ত্রুটি!",
        description: "পাসওয়ার্ড মিলছে না।",
        variant: "destructive",
      });
      return;
    }

    if (password.length < 6) {
      toast({
        title: "ত্রুটি!",
        description: "পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে।",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: window.location.origin,
          data: {
            full_name: fullName,
            referral_code: referralCode,
          },
        },
      });

      if (error) throw error;

      toast({
        title: "সফল!",
        description: "রেজিস্ট্রেশন সম্পন্ন হয়েছে। লগইন করুন।",
      });
      
      navigate("/login");
    } catch (error: any) {
      toast({
        title: "ত্রুটি!",
        description: error.message || "রেজিস্ট্রেশন করতে ব্যর্থ হয়েছে।",
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
        <p className="text-muted-foreground">নতুন অ্যাকাউন্ট তৈরি করুন</p>
      </div>

      <div className="px-4 py-6">
        <form onSubmit={handleRegister} className="bg-card border border-border rounded-xl p-6">
          {/* Name Input */}
          <div className="mb-4">
            <label className="text-sm text-muted-foreground mb-2 block">
              পুরো নাম
            </label>
            <div className="flex items-center gap-2 bg-secondary rounded-lg px-4 py-3">
              <User className="w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="আপনার পুরো নাম লিখুন"
                className="flex-1 bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground"
                required
              />
            </div>
          </div>

          {/* Email Input */}
          <div className="mb-4">
            <label className="text-sm text-muted-foreground mb-2 block">
              ইমেইল
            </label>
            <div className="flex items-center gap-2 bg-secondary rounded-lg px-4 py-3">
              <Phone className="w-5 h-5 text-muted-foreground" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="আপনার ইমেইল লিখুন"
                className="flex-1 bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground"
                required
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label className="text-sm text-muted-foreground mb-2 block">
              পাসওয়ার্ড
            </label>
            <div className="flex items-center gap-2 bg-secondary rounded-lg px-4 py-3">
              <Lock className="w-5 h-5 text-muted-foreground" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="পাসওয়ার্ড তৈরি করুন"
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
              পাসওয়ার্ড নিশ্চিত করুন
            </label>
            <div className="flex items-center gap-2 bg-secondary rounded-lg px-4 py-3">
              <Lock className="w-5 h-5 text-muted-foreground" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="পাসওয়ার্ড আবার লিখুন"
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
              রেফারেল কোড (ঐচ্ছিক)
            </label>
            <div className="flex items-center gap-2 bg-secondary rounded-lg px-4 py-3">
              <Users className="w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                value={referralCode}
                onChange={(e) => setReferralCode(e.target.value)}
                placeholder="রেফারেল কোড থাকলে লিখুন"
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
            রেজিস্টার করুন
          </button>

          {/* Login Link */}
          <p className="text-center mt-6 text-muted-foreground">
            ইতিমধ্যে অ্যাকাউন্ট আছে?{" "}
            <Link to="/login" className="text-primary font-semibold">
              লগইন করুন
            </Link>
          </p>
        </form>
      </div>

      <BottomNav />
    </div>
  );
};

export default Register;
