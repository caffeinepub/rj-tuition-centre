import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useAboutContent } from "@/hooks/useQueries";
import { Award, BookOpen, Star, Users } from "lucide-react";
import { motion } from "motion/react";
import { useEffect } from "react";

const SEED_ABOUT = {
  introduction:
    "RJ Tuition Centre has been serving students in Thanjavur since 2015. Founded by experienced educators with 10+ years of teaching expertise, we specialize in helping students from grades 1–12 achieve their academic goals through personalized attention and proven teaching methods. Our mission is to make quality education accessible to every child in Thanjavur.",
  qualifications:
    "Our tutors hold post-graduate degrees in their respective subjects from top Tamil Nadu universities. All tutors are certified educators with formal teaching qualifications, ensuring the highest standard of instruction for every student.",
  experience:
    "With over 10 years of teaching experience and 500+ students successfully guided, RJ Tuition Centre has built a reputation as Thanjavur's most trusted tuition center. Our tutors have helped students excel in board exams, competitive entrances like NEET and JEE, and school-level assessments.",
  teachingPhilosophy:
    "We believe every child has unique potential waiting to be unlocked. Our teaching philosophy centers on patience, encouragement, and tailored instruction. We do not just teach subjects — we build confidence, critical thinking, and a love for learning that lasts a lifetime.",
  achievements:
    "Consistent 95%+ board exam results for our students. 50+ students cleared NEET/JEE with our coaching. Recognized as Best Tuition Centre in Thanjavur by local education boards. 100% parent satisfaction rate for three consecutive years.",
};

export default function About() {
  useEffect(() => {
    document.title = "About RJ Tuition Centre | Expert Tutors in Thanjavur";
  }, []);

  const { data: aboutData, isLoading } = useAboutContent();
  const about = aboutData ?? SEED_ABOUT;

  const stats = [
    { icon: Users, label: "Students Taught", value: "500+" },
    { icon: Award, label: "Years Experience", value: "10+" },
    { icon: Star, label: "Success Rate", value: "95%" },
    { icon: BookOpen, label: "Subjects Offered", value: "12+" },
  ];

  return (
    <div className="pt-16 md:pt-20">
      {/* Hero */}
      <section className="hero-gradient py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              About Us
            </h1>
            <p className="text-blue-100 text-lg max-w-2xl mx-auto">
              Dedicated to transforming students in Thanjavur since 2015
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className="bg-brand-lightblue text-center p-6">
                    <CardContent className="p-0">
                      <Icon
                        size={28}
                        className="mx-auto text-brand-blue mb-3"
                      />
                      <p className="text-3xl font-bold text-brand-navy">
                        {stat.value}
                      </p>
                      <p className="text-brand-muted text-sm mt-1">
                        {stat.label}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Content sections */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          {isLoading ? (
            <div className="space-y-6">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-32 w-full rounded-2xl" />
              ))}
            </div>
          ) : (
            <div className="space-y-10">
              {[
                {
                  title: "Our Introduction",
                  content: about.introduction,
                  emoji: "🏫",
                },
                {
                  title: "Qualifications",
                  content: about.qualifications,
                  emoji: "🎓",
                },
                { title: "Experience", content: about.experience, emoji: "⭐" },
                {
                  title: "Teaching Philosophy",
                  content: about.teachingPhilosophy,
                  emoji: "💡",
                },
                {
                  title: "Achievements & Results",
                  content: about.achievements,
                  emoji: "🏆",
                },
              ].map((section, i) => (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <Card className="p-8 hover:shadow-card transition-all">
                    <CardContent className="p-0">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-3xl">{section.emoji}</span>
                        <h2 className="text-2xl font-bold text-brand-navy">
                          {section.title}
                        </h2>
                      </div>
                      <p className="text-brand-muted leading-relaxed">
                        {section.content}
                      </p>
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
