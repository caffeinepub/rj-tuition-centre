import type { Testimonial } from "@/backend";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useTestimonials } from "@/hooks/useQueries";
import { Star } from "lucide-react";
import { motion } from "motion/react";
import { useEffect } from "react";

const SEED_TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    studentName: "Priya R.",
    role: "Parent",
    photoUrl: "",
    rating: BigInt(5),
    reviewText:
      "My daughter's grades improved from 60% to 92% in just 3 months! The personalized attention and dedication of the teachers is outstanding.",
  },
  {
    id: "2",
    studentName: "Arjun M.",
    role: "Student, Grade 10",
    photoUrl: "",
    rating: BigInt(5),
    reviewText:
      "The one-on-one sessions helped me understand concepts deeply. I cleared my board exams with distinction thanks to RJ Tuition!",
  },
  {
    id: "3",
    studentName: "Kavitha S.",
    role: "Parent",
    photoUrl: "",
    rating: BigInt(5),
    reviewText:
      "Best tuition center in Thanjavur. The teachers are experienced and truly care about each student's progress.",
  },
  {
    id: "4",
    studentName: "Rahul T.",
    role: "Student, Grade 12",
    photoUrl: "",
    rating: BigInt(5),
    reviewText:
      "Got into my dream college after NEET coaching here. The exam preparation sessions were invaluable. Highly recommend!",
  },
  {
    id: "5",
    studentName: "Meena K.",
    role: "Parent",
    photoUrl: "",
    rating: BigInt(4),
    reviewText:
      "My son struggled with math for years. After just 2 months at RJ Tuition, he now loves the subject! Amazing transformation.",
  },
  {
    id: "6",
    studentName: "Deepa L.",
    role: "Student, Grade 8",
    photoUrl: "",
    rating: BigInt(5),
    reviewText:
      "The flexible timings work perfectly with my school schedule. Online classes are just as good as in-person!",
  },
];

function StarRating({ rating }: { rating: bigint }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={16}
          className={
            i <= Number(rating)
              ? "fill-yellow-400 text-yellow-400"
              : "text-gray-300"
          }
        />
      ))}
    </div>
  );
}

export default function Testimonials() {
  useEffect(() => {
    document.title = "Testimonials | RJ Tuition Centre Thanjavur";
  }, []);

  const { data: testimonialsData, isLoading } = useTestimonials();
  const testimonials = testimonialsData?.length
    ? testimonialsData
    : SEED_TESTIMONIALS;

  return (
    <div className="pt-16 md:pt-20">
      <section className="hero-gradient py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              What Our Students Say
            </h1>
            <p className="text-blue-100 text-lg max-w-2xl mx-auto">
              Real stories from real families in Thanjavur
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-section-blue">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-48 rounded-2xl" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((t, i) => (
                <motion.div
                  key={t.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  data-ocid={`testimonials.item.${i + 1}`}
                >
                  <Card className="bg-white h-full p-6 hover:shadow-card-hover transition-all">
                    <CardContent className="p-0">
                      <StarRating rating={t.rating} />
                      <p className="text-brand-dark mt-4 mb-6 leading-relaxed text-sm italic">
                        &ldquo;{t.reviewText}&rdquo;
                      </p>
                      <div className="flex items-center gap-3">
                        {t.photoUrl ? (
                          <img
                            src={t.photoUrl}
                            alt={t.studentName}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-brand-navy flex items-center justify-center text-white font-bold">
                            {t.studentName[0]}
                          </div>
                        )}
                        <div>
                          <p className="font-bold text-brand-navy text-sm">
                            {t.studentName}
                          </p>
                          <p className="text-brand-muted text-xs">{t.role}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
