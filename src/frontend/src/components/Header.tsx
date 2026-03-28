import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Testimonials", to: "/testimonials" },
  { label: "Contact", to: "/contact" },
  { label: "FAQ", to: "/faq" },
  { label: "Blog", to: "/blog" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md" : "bg-white/95 backdrop-blur-sm"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center" data-ocid="header.link">
            <img
              src="/assets/uploads/chatgpt_image_mar_28_2026_02_44_51_pm-019d359b-f6bb-71e8-a000-d229f1831532-1.png"
              alt="RJ Tuition Centre"
              className="h-12 w-auto object-contain"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="px-3 py-2 text-sm font-medium text-brand-dark hover:text-brand-blue transition-colors rounded-md"
                data-ocid="header.link"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Button
              asChild
              className="rounded-full bg-brand-blue text-white hover:bg-brand-navy px-6 font-semibold"
            >
              <Link to="/contact" data-ocid="header.primary_button">
                Enroll Now
              </Link>
            </Button>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            className="lg:hidden p-2 rounded-md text-brand-navy"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            data-ocid="header.toggle"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-lg">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="py-2 px-3 text-brand-dark hover:text-brand-blue hover:bg-brand-lightblue rounded-md font-medium transition-colors"
                onClick={() => setMobileOpen(false)}
                data-ocid="header.link"
              >
                {link.label}
              </Link>
            ))}
            <Button
              asChild
              className="mt-2 rounded-full bg-brand-blue text-white w-full"
            >
              <Link
                to="/contact"
                onClick={() => setMobileOpen(false)}
                data-ocid="header.primary_button"
              >
                Enroll Now
              </Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
