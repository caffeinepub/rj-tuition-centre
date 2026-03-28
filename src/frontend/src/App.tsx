import AdminLayout from "@/components/AdminLayout";
import AdminRoute from "@/components/AdminRoute";
import Layout from "@/components/Layout";
import { Toaster } from "@/components/ui/sonner";
import About from "@/pages/About";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import Contact from "@/pages/Contact";
import FAQ from "@/pages/FAQ";
import Home from "@/pages/Home";
import Services from "@/pages/Services";
import Testimonials from "@/pages/Testimonials";
import AdminAbout from "@/pages/admin/AdminAbout";
import AdminBlog from "@/pages/admin/AdminBlog";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminFAQs from "@/pages/admin/AdminFAQs";
import AdminHero from "@/pages/admin/AdminHero";
import AdminLogin from "@/pages/admin/AdminLogin";
import AdminMessages from "@/pages/admin/AdminMessages";
import AdminServices from "@/pages/admin/AdminServices";
import AdminSiteSettings from "@/pages/admin/AdminSiteSettings";
import AdminSubjects from "@/pages/admin/AdminSubjects";
import AdminTestimonials from "@/pages/admin/AdminTestimonials";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";

const rootRoute = createRootRoute({
  component: () => (
    <>
      <Outlet />
      <Toaster richColors position="top-right" />
    </>
  ),
});

const publicLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "public",
  component: () => (
    <Layout>
      <Outlet />
    </Layout>
  ),
});

const homeRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: "/",
  component: Home,
});

const aboutRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: "/about",
  component: About,
});

const servicesRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: "/services",
  component: Services,
});

const testimonialsRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: "/testimonials",
  component: Testimonials,
});

const contactRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: "/contact",
  component: Contact,
});

const faqRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: "/faq",
  component: FAQ,
});

const blogRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: "/blog",
  component: Blog,
});

const blogPostRoute = createRoute({
  getParentRoute: () => publicLayoutRoute,
  path: "/blog/$slug",
  component: BlogPost,
});

// Admin routes
const adminLoginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/login",
  component: AdminLogin,
});

const adminLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "admin",
  component: () => (
    <AdminRoute>
      <AdminLayout>
        <Outlet />
      </AdminLayout>
    </AdminRoute>
  ),
});

const adminDashboardRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: "/admin",
  component: AdminDashboard,
});

const adminHeroRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: "/admin/hero",
  component: AdminHero,
});

const adminSubjectsRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: "/admin/subjects",
  component: AdminSubjects,
});

const adminServicesRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: "/admin/services",
  component: AdminServices,
});

const adminTestimonialsRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: "/admin/testimonials",
  component: AdminTestimonials,
});

const adminFaqsRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: "/admin/faqs",
  component: AdminFAQs,
});

const adminBlogRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: "/admin/blog",
  component: AdminBlog,
});

const adminAboutRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: "/admin/about",
  component: AdminAbout,
});

const adminMessagesRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: "/admin/messages",
  component: AdminMessages,
});

const adminSiteSettingsRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: "/admin/site-settings",
  component: AdminSiteSettings,
});

const routeTree = rootRoute.addChildren([
  publicLayoutRoute.addChildren([
    homeRoute,
    aboutRoute,
    servicesRoute,
    testimonialsRoute,
    contactRoute,
    faqRoute,
    blogRoute,
    blogPostRoute,
  ]),
  adminLoginRoute,
  adminLayoutRoute.addChildren([
    adminDashboardRoute,
    adminHeroRoute,
    adminSubjectsRoute,
    adminServicesRoute,
    adminTestimonialsRoute,
    adminFaqsRoute,
    adminBlogRoute,
    adminAboutRoute,
    adminSiteSettingsRoute,
    adminMessagesRoute,
  ]),
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
