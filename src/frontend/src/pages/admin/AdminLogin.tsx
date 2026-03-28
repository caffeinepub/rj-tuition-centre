import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { adminLogin, isAdminAuthenticated } from "@/lib/auth";
import { useNavigate } from "@tanstack/react-router";
import { Loader2, Lock } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAdminAuthenticated()) navigate({ to: "/admin" });
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 500));
    const ok = adminLogin(username, password);
    setLoading(false);
    if (ok) {
      toast.success("Welcome back, Admin!");
      navigate({ to: "/admin" });
    } else {
      toast.error("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-lightblue p-4">
      <Card className="w-full max-w-sm shadow-card">
        <CardHeader className="text-center pb-4">
          <div className="flex justify-center mb-4">
            <img
              src="/assets/uploads/chatgpt_image_mar_28_2026_02_44_51_pm-019d359b-f6bb-71e8-a000-d229f1831532-1.png"
              alt="RJ Tuition Centre"
              className="h-24 w-auto object-contain"
            />
          </div>
          <CardTitle className="text-2xl font-bold text-brand-navy">
            Admin Login
          </CardTitle>
          <p className="text-brand-muted text-sm">RJ Tuition Centre Panel</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="username" className="text-brand-dark font-medium">
                Username
              </Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                required
                className="mt-1"
                data-ocid="admin_login.input"
              />
            </div>
            <div>
              <Label htmlFor="password" className="text-brand-dark font-medium">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
                className="mt-1"
                data-ocid="admin_login.input"
              />
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-brand-blue text-white font-bold mt-2"
              data-ocid="admin_login.submit_button"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  <Lock className="mr-2 h-4 w-4" />
                  Sign In
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
