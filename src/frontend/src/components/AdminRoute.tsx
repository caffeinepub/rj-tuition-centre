import { isAdminAuthenticated } from "@/lib/auth";
import { useNavigate } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { useEffect } from "react";

export default function AdminRoute({ children }: { children: ReactNode }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdminAuthenticated()) {
      navigate({ to: "/admin/login" });
    }
  }, [navigate]);

  if (!isAdminAuthenticated()) return null;

  return <>{children}</>;
}
