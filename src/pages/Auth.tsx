import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Phone, Eye, EyeOff, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import authBg from "@/assets/auth-bg.jpg";

// 🔥 Firebase imports
import { auth, provider, db } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

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

  // 🔥 UPDATED SUBMIT (Firebase Integrated)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (authMode === "signup") {
        if (formData.password !== formData.confirmPassword) {
          toast.error("Passwords do not match!");
          return;
        }

        // ✅ Create user
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );

        const user = userCredential.user;

        // ✅ Store in Firestore
        await setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          name: formData.fullName,
          email: formData.email,
          phone: formData.phone || ""
        });

        toast.success("Account created successfully!");
        navigate("/dashboard");
      } else {
        // ✅ Login user
        await signInWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );

        toast.success("Welcome back!");
        navigate("/dashboard");
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  // 🔥 GOOGLE LOGIN UPDATED
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // ✅ Store user (no duplicate)
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        photo: user.photoURL
      });

      toast.success("Signed in with Google!");
      navigate("/dashboard");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* LEFT SIDE SAME */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden items-center justify-center">
        <img src={authBg} alt="Botanical pattern" className="absolute inset-0 w-full h-full object-cover" />
        <div className="hero-gradient absolute inset-0" />
        <div className="relative z-10 text-center px-12">
          <Leaf className="w-16 h-16 text-primary-foreground mx-auto mb-6" />
          <h1 className="text-4xl font-display font-bold text-primary-foreground mb-2">
            Dr. Nandita Karmakar
          </h1>
          <p className="text-lg text-primary-foreground/90 font-body font-medium mb-1">
            Homeopathic Practitioner
          </p>
          <p className="text-primary-foreground/70 font-body">
            Personalized natural healing — now available online
          </p>
        </div>
      </div>

      {/* RIGHT SIDE SAME */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md animate-fade-in">

          {/* LOGO */}
          <div className="lg:hidden text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Leaf className="w-8 h-8 text-primary" />
              <h1 className="text-2xl font-display font-bold text-foreground">Dr. Nandita Karmakar</h1>
            </div>
            <p className="text-muted-foreground font-body text-sm">Homeopathic Care — Online & Offline</p>
          </div>

          {/* TITLE */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-display font-semibold text-foreground">
              {authMode === "signin" ? "Welcome Back" : "Create Account"}
            </h2>
          </div>

          {/* TABS */}
          <Tabs value={authMode} onValueChange={(v) => setAuthMode(v as AuthMode)} className="mb-6">
            <TabsList className="grid w-full grid-cols-2 bg-secondary">
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
          </Tabs>

          

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-4">

            {authMode === "signup" && (
              <Input name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} required />
            )}

            <Input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} required />

            <Input name="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange} required />

            {authMode === "signup" && (
              <Input name="confirmPassword" type="password" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required />
            )}

            <Button type="submit" className="w-full">
              {authMode === "signin" ? "Sign In" : "Create Account"}
            </Button>

            {/* GOOGLE */}
          <Button onClick={handleGoogleLogin} className="w-full mb-4">
            Continue with Google
          </Button>

          </form>

        </div>
      </div>
    </div>
  );
};

export default Auth;