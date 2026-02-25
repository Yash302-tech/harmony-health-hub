import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Phone, Eye, EyeOff, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import authBg from "@/assets/auth-bg.jpg";

type AuthMode = "signin" | "signup";
type LoginMethod = "email" | "phone";

const Auth = () => {
  const navigate = useNavigate();
  const [authMode, setAuthMode] = useState<AuthMode>("signin");
  const [loginMethod, setLoginMethod] = useState<LoginMethod>("email");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (authMode === "signup" && formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    toast.success(authMode === "signin" ? "Welcome back!" : "Account created successfully!");
    navigate("/dashboard");
  };

  const handleGoogleLogin = () => {
    toast.success("Signed in with Google!");
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - decorative */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden items-center justify-center">
        <img src={authBg} alt="Botanical pattern" className="absolute inset-0 w-full h-full object-cover" />
        <div className="hero-gradient absolute inset-0" />
        <div className="relative z-10 text-center px-12">
          <Leaf className="w-16 h-16 text-primary-foreground mx-auto mb-6" />
          <h1 className="text-5xl font-display font-bold text-primary-foreground mb-4">
            HealNatura
          </h1>
          <p className="text-xl text-primary-foreground/80 font-body">
            Your trusted partner in natural healing & homeopathic wellness
          </p>
        </div>
      </div>

      {/* Right side - form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md animate-fade-in">
          {/* Mobile logo */}
          <div className="lg:hidden text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Leaf className="w-8 h-8 text-primary" />
              <h1 className="text-3xl font-display font-bold text-foreground">HealNatura</h1>
            </div>
            <p className="text-muted-foreground font-body text-sm">Natural Healing & Homeopathy</p>
          </div>

          <div className="text-center mb-8">
            <h2 className="text-2xl font-display font-semibold text-foreground">
              {authMode === "signin" ? "Welcome Back" : "Create Account"}
            </h2>
            <p className="text-muted-foreground mt-1 font-body">
              {authMode === "signin"
                ? "Sign in to access your health dashboard"
                : "Join us for personalized homeopathic care"}
            </p>
          </div>

          {/* Auth mode toggle */}
          <Tabs value={authMode} onValueChange={(v) => setAuthMode(v as AuthMode)} className="mb-6">
            <TabsList className="grid w-full grid-cols-2 bg-secondary">
              <TabsTrigger value="signin" className="font-body">Sign In</TabsTrigger>
              <TabsTrigger value="signup" className="font-body">Sign Up</TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Google login */}
          <Button
            variant="outline"
            className="w-full mb-4 font-body h-12 border-border hover:bg-secondary"
            onClick={handleGoogleLogin}
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </Button>

          <div className="relative mb-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-3 text-muted-foreground font-body">Or continue with</span>
            </div>
          </div>

          {/* Login method toggle */}
          <div className="flex gap-2 mb-6">
            <Button
              variant={loginMethod === "email" ? "default" : "outline"}
              size="sm"
              onClick={() => setLoginMethod("email")}
              className="flex-1 font-body"
            >
              <Mail className="w-4 h-4 mr-1" /> Email
            </Button>
            <Button
              variant={loginMethod === "phone" ? "default" : "outline"}
              size="sm"
              onClick={() => setLoginMethod("phone")}
              className="flex-1 font-body"
            >
              <Phone className="w-4 h-4 mr-1" /> Phone
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {authMode === "signup" && (
              <div>
                <Label htmlFor="fullName" className="font-body text-foreground">Full Name</Label>
                <Input
                  id="fullName"
                  name="fullName"
                  placeholder="Dr. John Doe"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="mt-1 h-11 bg-secondary/50 border-border font-body"
                />
              </div>
            )}

            {loginMethod === "email" ? (
              <div>
                <Label htmlFor="email" className="font-body text-foreground">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="mt-1 h-11 bg-secondary/50 border-border font-body"
                />
              </div>
            ) : (
              <div>
                <Label htmlFor="phone" className="font-body text-foreground">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="mt-1 h-11 bg-secondary/50 border-border font-body"
                />
              </div>
            )}

            <div>
              <Label htmlFor="password" className="font-body text-foreground">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="mt-1 h-11 bg-secondary/50 border-border font-body pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {authMode === "signup" && (
              <div>
                <Label htmlFor="confirmPassword" className="font-body text-foreground">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="mt-1 h-11 bg-secondary/50 border-border font-body"
                />
              </div>
            )}

            {authMode === "signin" && (
              <div className="text-right">
                <button type="button" className="text-sm text-primary hover:underline font-body">
                  Forgot password?
                </button>
              </div>
            )}

            <Button type="submit" className="w-full h-12 font-body font-semibold text-base">
              {authMode === "signin" ? "Sign In" : "Create Account"}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6 font-body">
            {authMode === "signin" ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => setAuthMode(authMode === "signin" ? "signup" : "signin")}
              className="text-primary font-semibold hover:underline"
            >
              {authMode === "signin" ? "Sign Up" : "Sign In"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
