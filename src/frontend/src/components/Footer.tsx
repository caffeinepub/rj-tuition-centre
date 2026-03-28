import { Link } from "@tanstack/react-router";
import { Lock, Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";

  return (
    <footer className="bg-brand-navy text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/assets/uploads/new_project_3-019d33d7-96ed-743e-9eaf-0b6d7d1253e3-1.png"
                alt="RJ Tuition Centre"
                className="h-10 w-10 object-contain brightness-0 invert"
              />
              <div>
                <p className="font-bold text-lg">RJ Tuition Centre</p>
                <p className="text-blue-200 text-xs">Thanjavur</p>
              </div>
            </div>
            <p className="text-blue-200 text-sm leading-relaxed">
              Expert home tuition and online classes for grades 1–12 in
              Thanjavur. Personalized learning for every student.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-brand-yellow mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {[
                { label: "Home", to: "/" },
                { label: "About Us", to: "/about" },
                { label: "Services", to: "/services" },
                { label: "Blog", to: "/blog" },
              ].map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-blue-200 hover:text-white text-sm transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* More Links */}
          <div>
            <h3 className="font-semibold text-brand-yellow mb-4">Support</h3>
            <ul className="space-y-2">
              {[
                { label: "Testimonials", to: "/testimonials" },
                { label: "FAQ", to: "/faq" },
                { label: "Contact Us", to: "/contact" },
              ].map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-blue-200 hover:text-white text-sm transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-brand-yellow mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-blue-200 text-sm">
                <MapPin
                  size={16}
                  className="mt-0.5 shrink-0 text-brand-yellow"
                />
                Thanjavur, Tamil Nadu, India
              </li>
              <li className="flex items-center gap-2 text-blue-200 text-sm">
                <Phone size={16} className="shrink-0 text-brand-yellow" />
                <a
                  href="tel:+919600243654"
                  className="hover:text-white transition-colors"
                >
                  +91 96002 43654
                </a>
              </li>
              <li className="flex items-center gap-2 text-blue-200 text-sm">
                <Phone size={16} className="shrink-0 text-brand-yellow" />
                <a
                  href="tel:+919994286764"
                  className="hover:text-white transition-colors"
                >
                  +91 99942 86764
                </a>
              </li>
              <li className="flex items-center gap-2 text-blue-200 text-sm">
                <Mail size={16} className="shrink-0 text-brand-yellow" />
                rjtuitioncentre@gmail.com
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-1">
            <p className="text-blue-200 text-sm">
              © {year} RJ Tuition Centre, Thanjavur. All rights reserved.
            </p>
            <a
              href="/admin"
              className="opacity-20 hover:opacity-60 transition-opacity text-blue-300"
              title="Admin"
            >
              <Lock size={12} />
            </a>
          </div>
          <p className="text-blue-200 text-xs">
            Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`}
              className="hover:text-white transition-colors underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
