import { adminLogout } from "@/lib/auth";
import { Link, useRouter } from "@tanstack/react-router";
import {
  BookOpen,
  Briefcase,
  FileText,
  HelpCircle,
  Image,
  Info,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquare,
  Settings,
  Star,
  X,
} from "lucide-react";
import type { ReactNode } from "react";
import { useState } from "react";

const sidebarLinks = [
  { label: "Dashboard", to: "/admin", icon: LayoutDashboard },
  { label: "Hero Section", to: "/admin/hero", icon: Image },
  { label: "Subjects", to: "/admin/subjects", icon: BookOpen },
  { label: "Services", to: "/admin/services", icon: Briefcase },
  { label: "Testimonials", to: "/admin/testimonials", icon: Star },
  { label: "FAQs", to: "/admin/faqs", icon: HelpCircle },
  { label: "Blog Posts", to: "/admin/blog", icon: FileText },
  { label: "About Us", to: "/admin/about", icon: Info },
  { label: "Site Settings", to: "/admin/site-settings", icon: Settings },
  { label: "Messages", to: "/admin/messages", icon: MessageSquare },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  const currentPath = router.state.location.pathname;

  const handleLogout = () => {
    adminLogout();
    window.location.href = "/admin/login";
  };

  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 admin-sidebar text-white flex flex-col transform transition-transform duration-200 lg:relative lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 p-5 border-b border-white/10">
          <img
            src="/assets/uploads/chatgpt_image_mar_28_2026_02_44_51_pm-019d359b-f6bb-71e8-a000-d229f1831532-1.png"
            alt="RJ Tuition Centre"
            className="h-10 w-10 object-contain"
          />
          <div>
            <p className="font-bold text-sm">RJ Tuition</p>
            <p className="text-xs text-yellow-200">Admin Panel</p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-4">
          {sidebarLinks.map((link) => {
            const Icon = link.icon;
            const isActive = currentPath === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-5 py-3 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-brand-yellow text-brand-dark"
                    : "text-blue-100 hover:bg-white/10"
                }`}
                data-ocid="admin.link"
              >
                <Icon size={18} />
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-white/10">
          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-2 text-sm text-blue-200 hover:text-white hover:bg-white/10 rounded-md transition-colors"
            data-ocid="admin.logout.button"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          role="button"
          tabIndex={0}
          aria-label="Close sidebar"
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={closeSidebar}
          onKeyDown={(e) => e.key === "Escape" && closeSidebar()}
        />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="bg-white shadow-sm flex items-center justify-between px-4 h-14">
          <button
            type="button"
            className="lg:hidden p-2 text-brand-navy"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            data-ocid="admin.toggle"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <h1 className="font-semibold text-brand-navy text-sm hidden lg:block">
            Admin Panel
          </h1>
          <div className="flex items-center gap-2">
            <Link
              to="/"
              className="text-xs text-brand-blue hover:underline"
              target="_blank"
            >
              View Site →
            </Link>
          </div>
        </header>

        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
