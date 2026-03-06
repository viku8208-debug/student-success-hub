import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, LogIn, UserPlus, GraduationCap, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

type View = "login" | "signup" | "forgot";

const Auth = () => {
  const [view, setView] = useState<View>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { login, signup, loginWithGoogle, resetPassword } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    try {
      if (view === "forgot") {
        await resetPassword(email);
        toast({ title: "Reset email sent", description: "Check your inbox for the password reset link." });
        setView("login");
        setSubmitting(false);
        return;
      }
      if (view === "login") {
        await login(email, password);
        toast({ title: "Welcome back!" });
      } else {
        if (!name.trim()) {
          toast({ title: "Name is required", variant: "destructive" });
          setSubmitting(false);
          return;
        }
        await signup(email, password, name);
        toast({ title: "Account created!", description: "A verification email has been sent." });
      }
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

  const handleGoogle = async () => {
    try {
      await loginWithGoogle();
      toast({ title: "Welcome!" });
      navigate("/");
    } catch (err: any) {
      const msg = err?.message?.includes("auth/")
        ? err.message.split("auth/")[1]?.replace(")", "").replace(/-/g, " ")
        : "Google sign-in failed";
      toast({ title: "Error", description: msg, variant: "destructive" });
    }
  };

  const reset = () => {
    setEmail("");
    setPassword("");
    setName("");
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-primary/20 via-background to-accent/30 px-4">
      <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-accent/30 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="rounded-2xl border border-border/50 bg-card/70 p-8 shadow-elevated backdrop-blur-xl">
          {/* Logo */}
          <div className="mb-6 flex flex-col items-center gap-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl gradient-primary shadow-lg">
              <GraduationCap className="h-6 w-6 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">StudentSathi</h1>
            <p className="text-sm text-muted-foreground">Your academic companion 🇮🇳</p>
          </div>

          {view !== "forgot" && (
            <>
              {/* Tab toggle */}
              <div className="mb-6 flex rounded-lg bg-muted p-1">
                <button
                  onClick={() => { setView("login"); reset(); }}
                  className={`flex flex-1 items-center justify-center gap-1.5 rounded-md py-2 text-sm font-medium transition-all ${
                    view === "login" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"
                  }`}
                >
                  <LogIn size={15} /> Login
                </button>
                <button
                  onClick={() => { setView("signup"); reset(); }}
                  className={`flex flex-1 items-center justify-center gap-1.5 rounded-md py-2 text-sm font-medium transition-all ${
                    view === "signup" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"
                  }`}
                >
                  <UserPlus size={15} /> Sign Up
                </button>
              </div>

              {/* Google button */}
              <Button variant="outline" className="mb-4 w-full gap-2" onClick={handleGoogle} type="button">
                <svg className="h-4 w-4" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Continue with Google
              </Button>

              <div className="relative mb-4">
                <div className="absolute inset-0 flex items-center"><span className="w-full border-t" /></div>
                <div className="relative flex justify-center text-xs uppercase"><span className="bg-card/70 px-2 text-muted-foreground">or</span></div>
              </div>
            </>
          )}

          {/* Form */}
          <AnimatePresence mode="wait">
            <motion.form
              key={view}
              initial={{ opacity: 0, x: view === "login" ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: view === "login" ? 20 : -20 }}
              transition={{ duration: 0.25 }}
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              {view === "forgot" && (
                <p className="text-center text-sm text-muted-foreground">
                  Enter your email and we'll send you a reset link.
                </p>
              )}

              {view === "signup" && (
                <div className="space-y-1.5">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="Rahul Sharma" value={name} onChange={(e) => setName(e.target.value)} maxLength={100} required />
                </div>
              )}
              <div className="space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} maxLength={255} required />
              </div>
              {view !== "forgot" && (
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
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
              )}

              {view === "login" && (
                <button type="button" onClick={() => { setView("forgot"); reset(); }} className="text-xs text-primary hover:underline">
                  Forgot password?
                </button>
              )}

              <Button type="submit" className="w-full gap-2" disabled={submitting}>
                {view === "forgot" && <Mail size={16} />}
                {submitting
                  ? "Please wait..."
                  : view === "login"
                  ? "Login"
                  : view === "signup"
                  ? "Create Account"
                  : "Send Reset Link"}
              </Button>
            </motion.form>
          </AnimatePresence>

          <p className="mt-5 text-center text-xs text-muted-foreground">
            {view === "forgot" ? (
              <button onClick={() => { setView("login"); reset(); }} className="font-medium text-primary hover:underline">
                Back to Login
              </button>
            ) : view === "login" ? (
              <>Don't have an account?{" "}
                <button onClick={() => { setView("signup"); reset(); }} className="font-medium text-primary hover:underline">Sign Up</button>
              </>
            ) : (
              <>Already have an account?{" "}
                <button onClick={() => { setView("login"); reset(); }} className="font-medium text-primary hover:underline">Login</button>
              </>
            )}
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Auth;
