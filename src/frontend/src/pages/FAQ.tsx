import type { Faq } from "@/backend";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Skeleton } from "@/components/ui/skeleton";
import { useFAQs } from "@/hooks/useQueries";
import { motion } from "motion/react";
import { useEffect } from "react";

const SEED_FAQS: Faq[] = [
  {
    id: "1",
    question: "What are the tuition fees?",
    answer:
      "Fees vary based on the subject, grade level, and number of sessions per week. We offer competitive pricing with flexible payment plans. Contact us for a personalized quote tailored to your requirements.",
    order: BigInt(1),
  },
  {
    id: "2",
    question: "What are the class timings?",
    answer:
      "Classes are available 7 days a week from 6:00 AM to 9:00 PM. We offer flexible scheduling to accommodate your school timings and extracurricular activities.",
    order: BigInt(2),
  },
  {
    id: "3",
    question: "What is the cancellation policy?",
    answer:
      "A 24-hour advance notice is required for cancellations. Missed sessions can be rescheduled as makeup classes within the same week at no additional charge.",
    order: BigInt(3),
  },
  {
    id: "4",
    question: "What modes of teaching are available?",
    answer:
      "We offer Home Tuition (tutor comes to your home in Thanjavur), Online Classes (live video sessions), and Group Classes (3–5 students). You can choose the mode that suits you best.",
    order: BigInt(4),
  },
  {
    id: "5",
    question: "How do I book a free demo class?",
    answer:
      "Simply call or WhatsApp us at +91 9600243654 or fill out the contact form on our website. We'll schedule a free demo class within 24 hours.",
    order: BigInt(5),
  },
  {
    id: "6",
    question: "Do you prepare students for NEET and JEE?",
    answer:
      "Yes, we offer specialized exam preparation coaching for NEET, JEE, and board exams. Our tutors have guided multiple students to top scores in competitive examinations.",
    order: BigInt(6),
  },
  {
    id: "7",
    question: "What grades do you teach?",
    answer:
      "We cover grades 1 through 12 across all major subjects including Mathematics, Science, English, Tamil, Physics, Chemistry, Biology, and Social Science.",
    order: BigInt(7),
  },
  {
    id: "8",
    question: "Are online classes as effective as home tuition?",
    answer:
      "Yes! Our online sessions are fully interactive with live whiteboard, video, and chat support. Many students find online learning more convenient and equally effective.",
    order: BigInt(8),
  },
];

export default function FAQ() {
  useEffect(() => {
    document.title = "FAQ | RJ Tuition Centre Thanjavur";
  }, []);

  const { data: faqsData, isLoading } = useFAQs();
  const faqs = faqsData?.length ? faqsData : SEED_FAQS;

  const sorted = [...faqs].sort((a, b) => Number(a.order) - Number(b.order));

  return (
    <div className="pt-16 md:pt-20">
      <section className="hero-gradient py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-blue-100 text-lg max-w-2xl mx-auto">
              Everything you need to know about RJ Tuition Centre
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-16 rounded-xl" />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Accordion type="single" collapsible className="space-y-3">
                {sorted.map((faq, i) => (
                  <AccordionItem
                    key={faq.id}
                    value={faq.id}
                    className="bg-brand-cream border border-border rounded-2xl px-6 overflow-hidden"
                    data-ocid={`faq.item.${i + 1}`}
                  >
                    <AccordionTrigger className="text-brand-navy font-semibold text-left hover:no-underline py-5">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-brand-muted leading-relaxed pb-5">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
