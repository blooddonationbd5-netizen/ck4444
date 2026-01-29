import { Link } from "react-router-dom";
import { Eye, EyeOff, Phone, Lock, User, Users } from "lucide-react";
import { useState } from "react";
import BottomNav from "@/components/BottomNav";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
        <div className="bg-card border border-border rounded-xl p-6">
          {/* Name Input */}
          <div className="mb-4">
            <label className="text-sm text-muted-foreground mb-2 block">
              পুরো নাম
            </label>
            <div className="flex items-center gap-2 bg-secondary rounded-lg px-4 py-3">
              <User className="w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="আপনার পুরো নাম লিখুন"
                className="flex-1 bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground"
              />
            </div>
          </div>

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
          <div className="mb-4">
            <label className="text-sm text-muted-foreground mb-2 block">
              পাসওয়ার্ড
            </label>
            <div className="flex items-center gap-2 bg-secondary rounded-lg px-4 py-3">
              <Lock className="w-5 h-5 text-muted-foreground" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="পাসওয়ার্ড তৈরি করুন"
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

          {/* Confirm Password Input */}
          <div className="mb-4">
            <label className="text-sm text-muted-foreground mb-2 block">
              পাসওয়ার্ড নিশ্চিত করুন
            </label>
            <div className="flex items-center gap-2 bg-secondary rounded-lg px-4 py-3">
              <Lock className="w-5 h-5 text-muted-foreground" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="পাসওয়ার্ড আবার লিখুন"
                className="flex-1 bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground"
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
                placeholder="রেফারেল কোড থাকলে লিখুন"
                className="flex-1 bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground"
              />
            </div>
          </div>

          {/* Terms Checkbox */}
          <div className="flex items-start gap-2 mb-6">
            <input
              type="checkbox"
              id="terms"
              className="mt-1 w-4 h-4 accent-primary"
            />
            <label htmlFor="terms" className="text-sm text-muted-foreground">
              আমি{" "}
              <Link to="/terms" className="text-primary">
                শর্তাবলী
              </Link>{" "}
              এবং{" "}
              <Link to="/privacy" className="text-primary">
                গোপনীয়তা নীতি
              </Link>{" "}
              পড়েছি এবং সম্মত।
            </label>
          </div>

          {/* Register Button */}
          <button className="w-full bg-gradient-gold text-primary-foreground py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity">
            রেজিস্টার করুন
          </button>

          {/* Login Link */}
          <p className="text-center mt-6 text-muted-foreground">
            ইতিমধ্যে অ্যাকাউন্ট আছে?{" "}
            <Link to="/login" className="text-primary font-semibold">
              লগইন করুন
            </Link>
          </p>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Register;
