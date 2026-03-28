import type { DashboardStats } from "@/backend";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useDashboardStats } from "@/hooks/useQueries";
import {
  BookOpen,
  Briefcase,
  FileText,
  HelpCircle,
  MessageSquare,
  Star,
  Users,
} from "lucide-react";

const statCards: {
  key: keyof DashboardStats;
  label: string;
  icon: typeof BookOpen;
  color: string;
}[] = [
  {
    key: "totalSubjects",
    label: "Subjects",
    icon: BookOpen,
    color: "bg-blue-50 text-blue-600",
  },
  {
    key: "totalServices",
    label: "Services",
    icon: Briefcase,
    color: "bg-purple-50 text-purple-600",
  },
  {
    key: "totalTestimonials",
    label: "Testimonials",
    icon: Star,
    color: "bg-yellow-50 text-yellow-600",
  },
  {
    key: "totalFAQs",
    label: "FAQs",
    icon: HelpCircle,
    color: "bg-green-50 text-green-600",
  },
  {
    key: "totalBlogPosts",
    label: "Blog Posts",
    icon: FileText,
    color: "bg-orange-50 text-orange-600",
  },
  {
    key: "totalContactMessages",
    label: "Messages",
    icon: MessageSquare,
    color: "bg-red-50 text-red-600",
  },
];

export default function AdminDashboard() {
  const { data: stats, isLoading, isError } = useDashboardStats();

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-brand-navy">Dashboard</h1>
        <p className="text-brand-muted text-sm mt-1">
          Welcome to RJ Tuition Centre Admin Panel
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {statCards.map((s) => {
          const Icon = s.icon;
          const value = stats ? Number(stats[s.key] ?? BigInt(0)) : 0;
          return (
            <Card
              key={s.key}
              className="hover:shadow-card transition-all"
              data-ocid={`dashboard.${s.key}.card`}
            >
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-brand-muted flex items-center gap-2">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center ${s.color}`}
                  >
                    <Icon size={16} />
                  </div>
                  {s.label}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <Skeleton
                    className="h-8 w-16"
                    data-ocid="dashboard.loading_state"
                  />
                ) : isError ? (
                  <p className="text-3xl font-bold text-brand-navy">–</p>
                ) : (
                  <p className="text-3xl font-bold text-brand-navy">{value}</p>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="mt-8 p-6 bg-brand-lightblue rounded-2xl">
        <h2 className="font-bold text-brand-navy mb-2 flex items-center gap-2">
          <Users size={20} /> Quick Actions
        </h2>
        <p className="text-brand-muted text-sm">
          Use the sidebar to manage your website content. All changes are saved
          instantly to the blockchain.
        </p>
      </div>
    </div>
  );
}
