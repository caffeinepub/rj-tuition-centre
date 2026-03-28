import { Phone } from "lucide-react";

export default function CallFAB() {
  return (
    <a
      href="tel:+919600243654"
      className="fixed bottom-24 right-6 z-50 md:hidden flex items-center justify-center w-14 h-14 rounded-full bg-brand-blue shadow-lg text-white transition-transform hover:scale-110"
      aria-label="Call us"
      data-ocid="call.button"
    >
      <Phone size={24} />
    </a>
  );
}
