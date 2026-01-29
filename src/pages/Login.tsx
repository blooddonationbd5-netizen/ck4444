import { Link } from "react-router-dom";
import { Eye, EyeOff, Phone, Lock } from "lucide-react";
import { useState } from "react";
import BottomNav from "@/components/BottomNav";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-gradient-teal px-4 py-8 text-center">
        <div className="flex items-center justify-center mb-4">
          <span className="text-3xl font-bold text-gradient-gold">CK44</span>
          <span className="text-3xl font-bold text-foreground">.COM</span>
        </div>
        <p className="text-muted-foreground">আপনার অ্যাকাউন্টে লগইন করুন</p>
      </div>

      <div className="px-4 py-6">
        <div className="bg-card border border-border rounded-xl p-6">
          {/* Phone Input */}
          <div className="mb-4">
            <label className="text-sm text-muted-foreground mb-2 block">
              ফোন নম্বর
            </label>
            <div className="flex items-center gap-2 bg-secondary rounded-lg px-4 py-3">
              <Phone className="w-5 h-5 text-muted-foreground" />
              <input
                type="tel"
                placeholder="আপনার ফোন নম্বর লিখুন"
                className="flex-1 bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="mb-6">
            <label className="text-sm text-muted-foreground mb-2 block">
              পাসওয়ার্ড
            </label>
            <div className="flex items-center gap-2 bg-secondary rounded-lg px-4 py-3">
              <Lock className="w-5 h-5 text-muted-foreground" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="আপনার পাসওয়ার্ড লিখুন"
                className="flex-1 bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground"
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
              পাসওয়ার্ড ভুলে গেছেন?
            </Link>
          </div>

          {/* Login Button */}
          <button className="w-full bg-gradient-gold text-primary-foreground py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity">
            লগইন করুন
          </button>

          {/* Register Link */}
          <p className="text-center mt-6 text-muted-foreground">
            অ্যাকাউন্ট নেই?{" "}
            <Link to="/register" className="text-primary font-semibold">
              রেজিস্টার করুন
            </Link>
          </p>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Login;
