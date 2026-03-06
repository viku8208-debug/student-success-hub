import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { User, Mail, Shield, CheckCircle, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Profile = () => {
  const { user, sendVerification } = useAuth();
  const { toast } = useToast();

  if (!user) return null;

  const initials = user.displayName
    ? user.displayName.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "SS";

  const handleResendVerification = async () => {
    try {
      await sendVerification();
      toast({ title: "Verification email sent!", description: "Check your inbox." });
    } catch {
      toast({ title: "Error", description: "Could not send verification email.", variant: "destructive" });
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">My Profile</h1>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <User size={20} /> Account Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={user.photoURL || undefined} />
              <AvatarFallback className="gradient-primary text-primary-foreground text-lg font-bold">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-lg font-semibold text-foreground">{user.displayName || "Student"}</p>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex items-center gap-3 rounded-lg border bg-muted/50 p-4">
              <Mail size={18} className="text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Email</p>
                <p className="text-sm font-medium text-foreground">{user.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-lg border bg-muted/50 p-4">
              <Shield size={18} className="text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Provider</p>
                <p className="text-sm font-medium text-foreground capitalize">
                  {user.providerData?.[0]?.providerId === "google.com" ? "Google" : "Email/Password"}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {user.emailVerified ? (
              <Badge className="bg-success text-success-foreground gap-1">
                <CheckCircle size={14} /> Email Verified
              </Badge>
            ) : (
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="gap-1 border-warning text-warning">
                  <AlertCircle size={14} /> Not Verified
                </Badge>
                <Button size="sm" variant="outline" onClick={handleResendVerification}>
                  Resend Verification
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
