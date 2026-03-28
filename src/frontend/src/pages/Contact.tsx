import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useSubmitContactMessage } from "@/hooks/useQueries";
import { Loader2, MessageCircle, Phone, Send } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const phones = [
  { number: "+91 9600243654", href: "tel:+919600243654" },
  { number: "+91 9994286764", href: "tel:+919994286764" },
  { number: "+91 8870528018", href: "tel:+918870528018" },
];

export default function Contact() {
  useEffect(() => {
    document.title = "Contact RJ Tuition Centre | Book Free Demo in Thanjavur";
  }, []);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    subject: "",
    grade: "",
    message: "",
  });
  const mutation = useSubmitContactMessage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.grade) {
      toast.error("Please fill in all required fields.");
      return;
    }
    try {
      await mutation.mutateAsync({
        id: crypto.randomUUID(),
        name: form.name,
        phone: form.phone,
        subject: form.subject,
        grade: form.grade,
        message: form.message,
        timestamp: BigInt(Date.now()) * BigInt(1_000_000),
      });
      toast.success("Message sent! We'll contact you within 24 hours.");
      setForm({ name: "", phone: "", subject: "", grade: "", message: "" });
    } catch {
      toast.error("Failed to send message. Please call us directly.");
    }
  };

  return (
    <div className="pt-16 md:pt-20">
      <section className="hero-gradient py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Contact Us
            </h1>
            <p className="text-blue-100 text-lg">
              Book a free demo class or ask us anything
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-section-yellow">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Phone numbers */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-brand-navy mb-6">
                Reach Us Directly
              </h2>
              {phones.map((p) => (
                <Card
                  key={p.number}
                  className="bg-white p-5"
                  data-ocid="contact.card"
                >
                  <CardContent className="p-0 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-brand-lightblue flex items-center justify-center">
                      <Phone size={20} className="text-brand-blue" />
                    </div>
                    <div>
                      <p className="text-xs text-brand-muted">
                        Phone / WhatsApp
                      </p>
                      <a
                        href={p.href}
                        className="font-bold text-brand-navy hover:text-brand-blue transition-colors"
                      >
                        {p.number}
                      </a>
                    </div>
                  </CardContent>
                </Card>
              ))}

              <Card className="bg-white p-5 mt-4">
                <CardContent className="p-0">
                  <a
                    href="https://wa.me/919600243654"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 w-full"
                    data-ocid="contact.primary_button"
                  >
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: "#25D366" }}
                    >
                      <MessageCircle size={20} className="text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-brand-muted">Quick Chat</p>
                      <p className="font-bold text-brand-navy">
                        WhatsApp Us Now
                      </p>
                    </div>
                  </a>
                </CardContent>
              </Card>

              <div className="bg-brand-navy rounded-2xl p-5 text-white mt-4">
                <h3 className="font-bold mb-2">Class Timings</h3>
                <p className="text-blue-200 text-sm">Monday – Sunday</p>
                <p className="text-blue-200 text-sm">6:00 AM – 9:00 PM</p>
                <p className="text-blue-200 text-xs mt-2">
                  Flexible scheduling based on your convenience
                </p>
              </div>
            </div>

            {/* Contact form */}
            <div className="lg:col-span-2">
              <Card className="bg-white p-8">
                <CardContent className="p-0">
                  <h2 className="text-2xl font-bold text-brand-navy mb-6">
                    Send Us a Message
                  </h2>
                  <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                    data-ocid="contact.modal"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label
                          htmlFor="name"
                          className="text-brand-dark font-medium mb-1.5 block"
                        >
                          Name *
                        </Label>
                        <Input
                          id="name"
                          value={form.name}
                          onChange={(e) =>
                            setForm((f) => ({ ...f, name: e.target.value }))
                          }
                          placeholder="Your full name"
                          required
                          data-ocid="contact.input"
                        />
                      </div>
                      <div>
                        <Label
                          htmlFor="phone"
                          className="text-brand-dark font-medium mb-1.5 block"
                        >
                          Phone Number *
                        </Label>
                        <Input
                          id="phone"
                          value={form.phone}
                          onChange={(e) =>
                            setForm((f) => ({ ...f, phone: e.target.value }))
                          }
                          placeholder="+91 XXXXX XXXXX"
                          required
                          data-ocid="contact.input"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label
                          htmlFor="subject"
                          className="text-brand-dark font-medium mb-1.5 block"
                        >
                          Subject
                        </Label>
                        <Input
                          id="subject"
                          value={form.subject}
                          onChange={(e) =>
                            setForm((f) => ({ ...f, subject: e.target.value }))
                          }
                          placeholder="e.g. Mathematics, Science"
                          data-ocid="contact.input"
                        />
                      </div>
                      <div>
                        <Label className="text-brand-dark font-medium mb-1.5 block">
                          Grade *
                        </Label>
                        <Select
                          value={form.grade}
                          onValueChange={(v) =>
                            setForm((f) => ({ ...f, grade: v }))
                          }
                        >
                          <SelectTrigger data-ocid="contact.select">
                            <SelectValue placeholder="Select grade range" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1-5">Grades 1–5</SelectItem>
                            <SelectItem value="6-8">Grades 6–8</SelectItem>
                            <SelectItem value="9-12">Grades 9–12</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <Label
                        htmlFor="message"
                        className="text-brand-dark font-medium mb-1.5 block"
                      >
                        Message
                      </Label>
                      <Textarea
                        id="message"
                        value={form.message}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, message: e.target.value }))
                        }
                        placeholder="Tell us about your requirements..."
                        rows={4}
                        data-ocid="contact.textarea"
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={mutation.isPending}
                      className="w-full rounded-full bg-brand-blue text-white font-bold py-3"
                      data-ocid="contact.submit_button"
                    >
                      {mutation.isPending ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" /> Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
