import type { Service } from "@/backend";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useServices } from "@/hooks/useQueries";
import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useEffect } from "react";

const SEED_SERVICES: Service[] = [
  {
    id: "1",
    title: "One-on-One Tuition",
    description:
      "Dedicated private sessions with a personal tutor at your home. Fully customized curriculum based on your child's strengths and weaknesses. Maximum focus and personalized attention.",
    imageUrl: "",
    order: BigInt(1),
  },
  {
    id: "2",
    title: "Group Classes",
    description:
      "Small groups of 3–5 students for collaborative learning. Peer motivation, shared problem-solving, and affordable pricing. Available both online and at our center.",
    imageUrl: "",
    order: BigInt(2),
  },
  {
    id: "3",
    title: "Exam Preparation",
    description:
      "Intensive coaching for board exams, NEET, and JEE. Focused practice on past papers, mock tests, and exam strategies. Proven results with consistent high scores.",
    imageUrl: "",
    order: BigInt(3),
  },
  {
    id: "4",
    title: "Online Classes",
    description:
      "Live interactive video sessions from anywhere in Tamil Nadu and beyond. Same quality instruction, accessible from home. Recorded sessions available for revision.",
    imageUrl: "",
    order: BigInt(4),
  },
  {
    id: "5",
    title: "Holiday Crash Courses",
    description:
      "Intensive short-term courses during school holidays to cover syllabus quickly. Perfect for students who need to catch up or get ahead before exams.",
    imageUrl: "",
    order: BigInt(5),
  },
  {
    id: "6",
    title: "Doubt Clearing Sessions",
    description:
      "Dedicated sessions just for answering questions and clearing specific doubts. Available on-demand to support regular school or tuition learning.",
    imageUrl: "",
    order: BigInt(6),
  },
];

const serviceEmojis = ["👤", "👥", "📝", "💻", "📅", "❓"];

export default function Services() {
  useEffect(() => {
    document.title =
      "Tuition Services | Home Tuition & Online Classes Thanjavur";
  }, []);

  const { data: servicesData, isLoading } = useServices();
  const services = servicesData?.length ? servicesData : SEED_SERVICES;

  const sorted = [...services].sort(
    (a, b) => Number(a.order) - Number(b.order),
  );

  return (
    <div className="pt-16 md:pt-20">
      <section className="hero-gradient py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Our Services
            </h1>
            <p className="text-blue-100 text-lg max-w-2xl mx-auto">
              Comprehensive tutoring solutions tailored for every student
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Skeleton key={i} className="h-64 rounded-2xl" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sorted.map((service, i) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  data-ocid={`services.item.${i + 1}`}
                >
                  <Card className="h-full hover:shadow-card-hover transition-all group">
                    <CardContent className="p-8">
                      <div className="text-5xl mb-4 group-hover:scale-110 transition-transform inline-block">
                        {service.imageUrl ? (
                          <img
                            src={service.imageUrl}
                            alt={service.title}
                            className="w-16 h-16 object-cover rounded-xl"
                          />
                        ) : (
                          serviceEmojis[i % serviceEmojis.length]
                        )}
                      </div>
                      <h3 className="text-xl font-bold text-brand-navy mb-3">
                        {service.title}
                      </h3>
                      <p className="text-brand-muted leading-relaxed text-sm">
                        {service.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-section-yellow">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-brand-navy mb-4">
            Not Sure Which Service is Right?
          </h2>
          <p className="text-brand-muted mb-8">
            Talk to us. We&apos;ll help you find the perfect fit for your child.
          </p>
          <Button
            asChild
            className="rounded-full bg-brand-blue text-white px-8 py-3 font-bold"
          >
            <Link to="/contact" data-ocid="services.primary_button">
              Contact Us Today
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
