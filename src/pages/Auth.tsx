import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, LogIn, UserPlus, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { login, signup } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    try {
      if (isLogin) {
        await login(email, password);
      } else {
        if (!name.trim()) {
          toast({ title: "Name is required", variant: "destructive" });
          setSubmitting(false);
          return;
        }
        await signup(email, password, name);
      }
      toast({ title: isLogin ? "Welcome back!" : "Account created!" });
      navigate("/");
    } catch (err: any) {
      const msg = err?.message?.includes("auth/")
        ? err.message.split("auth/")[1]?.replace(")", "").replace(/-/g, " ")
        : "Something went wrong";
      toast({ title: "Error", description: msg, variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  const toggle = () => {
    setIsLogin(!isLogin);
    setEmail("");
    setPassword("");
    setName("");
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-primary/20 via-background to-accent/30 px-4">
      {/* Decorative blurred circles */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-accent/30 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Glass card */}
        <div className="rounded-2xl border border-border/50 bg-card/70 p-8 shadow-elevated backdrop-blur-xl">
          {/* Logo */}
          <div className="mb-6 flex flex-col items-center gap-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl gradient-primary shadow-lg">
              <GraduationCap className="h-6 w-6 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">StudentSathi</h1>
            <p className="text-sm text-muted-foreground">Your academic companion 🇮🇳</p>
          </div>

          {/* Tab toggle */}
          <div className="mb-6 flex rounded-lg bg-muted p-1">
            <button
              onClick={() => !isLogin || toggle()}
              className={`flex flex-1 items-center justify-center gap-1.5 rounded-md py-2 text-sm font-medium transition-all ${
                isLogin ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"
              }`}
            >
              <LogIn size={15} /> Login
            </button>
            <button
              onClick={() => isLogin && toggle()}
              className={`flex flex-1 items-center justify-center gap-1.5 rounded-md py-2 text-sm font-medium transition-all ${
                !isLogin ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"
              }`}
            >
              <UserPlus size={15} /> Sign Up
            </button>
          </div>

          {/* Form */}
          <AnimatePresence mode="wait">
            <motion.form
              key={isLogin ? "login" : "signup"}
              initial={{ opacity: 0, x: isLogin ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: isLogin ? 20 : -20 }}
              transition={{ duration: 0.25 }}
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              {!isLogin && (
                <div className="space-y-1.5">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="Rahul Sharma"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    maxLength={100}
                    required={!isLogin}
                  />
                </div>
              )}
              <div className="space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  maxLength={255}
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    minLength={6}
                    maxLength={128}
                    required
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={submitting}>
                {submitting ? "Please wait..." : isLogin ? "Login" : "Create Account"}
              </Button>
            </motion.form>
          </AnimatePresence>

          <p className="mt-5 text-center text-xs text-muted-foreground">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button onClick={toggle} className="font-medium text-primary hover:underline">
              {isLogin ? "Sign Up" : "Login"}
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Auth;
