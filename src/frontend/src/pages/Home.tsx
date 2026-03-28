import type { Subject, Testimonial } from "@/backend";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  useHeroContent,
  useSubjects,
  useTestimonials,
} from "@/hooks/useQueries";
import { getClassTimings } from "@/utils/siteSettings";
import { Link } from "@tanstack/react-router";
import {
  Award,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Clock,
  Star,
  TrendingUp,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

const SEED_SUBJECTS: Subject[] = [
  {
    id: "1",
    name: "Mathematics",
    gradeRange: "1–5",
    iconName: "calculator",
    description: "Build a strong numerical foundation",
  },
  {
    id: "2",
    name: "Science",
    gradeRange: "1–5",
    iconName: "flask",
    description: "Explore the wonders of the natural world",
  },
  {
    id: "3",
    name: "English",
    gradeRange: "1–5",
    iconName: "book",
    description: "Master language skills and communication",
  },
  {
    id: "4",
    name: "Tamil",
    gradeRange: "1–5",
    iconName: "language",
    description: "Strengthen mother tongue proficiency",
  },
  {
    id: "5",
    name: "Mathematics",
    gradeRange: "6–8",
    iconName: "calculator",
    description: "Algebra, geometry, and problem solving",
  },
  {
    id: "6",
    name: "Science",
    gradeRange: "6–8",
    iconName: "flask",
    description: "Physics, chemistry, and biology basics",
  },
  {
    id: "7",
    name: "English",
    gradeRange: "6–8",
    iconName: "book",
    description: "Grammar, comprehension, and writing",
  },
  {
    id: "8",
    name: "Social Science",
    gradeRange: "6–8",
    iconName: "globe",
    description: "History, geography, and civics",
  },
  {
    id: "9",
    name: "Mathematics",
    gradeRange: "9–12",
    iconName: "calculator",
    description: "Advanced calculus and statistics",
  },
  {
    id: "10",
    name: "Physics",
    gradeRange: "9–12",
    iconName: "atom",
    description: "Mechanics, optics, and electromagnetism",
  },
  {
    id: "11",
    name: "Chemistry",
    gradeRange: "9–12",
    iconName: "beaker",
    description: "Organic, inorganic, and physical chemistry",
  },
  {
    id: "12",
    name: "Biology",
    gradeRange: "9–12",
    iconName: "dna",
    description: "Botany, zoology, and human physiology",
  },
];

const SEED_TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    studentName: "Priya R.",
    role: "Parent",
    photoUrl: "",
    rating: BigInt(5),
    reviewText:
      "My daughter's grades improved from 60% to 92% in just 3 months! The personalized attention is outstanding.",
  },
  {
    id: "2",
    studentName: "Arjun M.",
    role: "Student, Grade 10",
    photoUrl: "",
    rating: BigInt(5),
    reviewText:
      "The one-on-one sessions helped me understand concepts deeply. I cleared my board exams with distinction!",
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
];

const gradeGroups = ["1–5", "6–8", "9–12"];

const subjectIcons: Record<string, string> = {
  Mathematics: "📊",
  Science: "🔬",
  English: "📚",
  Tamil: "🇹🇳",
  "Social Science": "🌍",
  Physics: "⚡",
  Chemistry: "🧪",
  Biology: "🌿",
};

const CONTACT_NUMBERS = ["+91 9600243654", "+91 9994286764", "+91 8870528018"];

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

export default function Home() {
  useEffect(() => {
    document.title =
      "RJ Tuition Centre Thanjavur | Best Home Tutor & Online Classes";
    const meta = document.querySelector("meta[name='description']");
    if (meta)
      meta.setAttribute(
        "content",
        "Expert home tuition and online classes in Thanjavur for grades 1–12. Personalized learning, experienced tutors. Call +91 9600243654.",
      );
  }, []);

  const { data: heroData } = useHeroContent();
  const { data: subjectsData } = useSubjects();
  const { data: testimonialsData } = useTestimonials();

  const timings = getClassTimings();

  const WHY_CHOOSE = [
    {
      icon: Award,
      title: "Experienced Tutors",
      desc: "10+ years of teaching excellence across all subjects and grades",
    },
    {
      icon: BookOpen,
      title: "Personalized Learning",
      desc: "Custom study plans tailored to each student's pace and learning style",
    },
    {
      icon: TrendingUp,
      title: "Progress Tracking",
      desc: "Regular assessments and detailed reports to monitor improvement",
    },
    {
      icon: Clock,
      title: "Flexible Timings",
      desc: `Classes from ${timings.display}, 7 days a week, home & online options`,
    },
  ];

  const hero = heroData ?? {
    headline: "Unlock Your Child's Academic Potential",
    subheading:
      "Expert Home Tuition & Online Classes in Thanjavur. Personalized learning for grades 1–12.",
    ctaButtonText: "Book Free Demo",
    ctaButtonLink: "/contact",
  };

  const subjects = subjectsData?.length ? subjectsData : SEED_SUBJECTS;
  const testimonials = testimonialsData?.length
    ? testimonialsData
    : SEED_TESTIMONIALS;

  const [activeGrade, setActiveGrade] = useState("1–5");
  const [testimonialIdx, setTestimonialIdx] = useState(0);

  const filteredSubjects = subjects.filter((s) => s.gradeRange === activeGrade);

  const prevTestimonial = () =>
    setTestimonialIdx((i) => (i === 0 ? testimonials.length - 1 : i - 1));
  const nextTestimonial = () =>
    setTestimonialIdx((i) => (i + 1) % testimonials.length);

  return (
    <div className="pt-16 md:pt-20">
      {/* Hero */}
      <section className="hero-gradient min-h-[85vh] flex items-center relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 70% 50%, white 0%, transparent 60%)",
          }}
        />
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block bg-white/20 text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
                🏫 Thanjavur&apos;s Trusted Tuition Centre
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                {hero.headline}
              </h1>
              <p className="text-blue-100 text-lg md:text-xl mb-8 leading-relaxed">
                {hero.subheading}
              </p>
              <div className="flex flex-wrap gap-4">
                <Button
                  asChild
                  className="rounded-full bg-brand-yellow text-brand-dark font-bold px-8 py-3 text-base hover:bg-yellow-300"
                >
                  <Link to="/contact" data-ocid="hero.primary_button">
                    {hero.ctaButtonText}
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="rounded-full border-2 border-white text-white bg-transparent hover:bg-white hover:text-brand-navy font-semibold px-8 py-3 text-base"
                >
                  <Link to="/about" data-ocid="hero.secondary_button">
                    Learn More
                  </Link>
                </Button>
              </div>
              <div className="flex flex-wrap gap-6 mt-10">
                {[
                  "500+ Students Taught",
                  "10+ Years Experience",
                  "Grades 1–12",
                ].map((stat) => (
                  <div key={stat} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-brand-yellow rounded-full" />
                    <span className="text-white text-sm font-medium">
                      {stat}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 hidden lg:block">
          <div className="w-96 h-96 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
            <div className="w-64 h-64 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
              <div className="w-32 h-32 rounded-full bg-white/10 flex items-center justify-center text-6xl">
                🎓
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Subjects */}
      <section className="py-20 bg-white" id="subjects">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-brand-navy mb-4">
              Our Subjects
            </h2>
            <p className="text-brand-muted text-lg">
              Comprehensive coverage across all grades and subjects
            </p>
          </motion.div>
          <div className="flex justify-center gap-3 mb-10 flex-wrap">
            {gradeGroups.map((g) => (
              <button
                type="button"
                key={g}
                onClick={() => setActiveGrade(g)}
                className={`px-6 py-2 rounded-full font-semibold text-sm transition-all ${
                  activeGrade === g
                    ? "bg-brand-blue text-white shadow-md"
                    : "bg-brand-lightblue text-brand-navy hover:bg-blue-100"
                }`}
                data-ocid="subjects.tab"
              >
                Grades {g}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {filteredSubjects.map((subject, i) => (
              <motion.div
                key={subject.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card
                  className="bg-brand-cream border-border hover:shadow-card-hover transition-all cursor-default text-center p-6"
                  data-ocid={`subjects.item.${i + 1}`}
                >
                  <div className="text-4xl mb-3">
                    {subjectIcons[subject.name] ?? "📖"}
                  </div>
                  <h3 className="font-bold text-brand-navy text-sm mb-1">
                    {subject.name}
                  </h3>
                  <p className="text-brand-muted text-xs">
                    {subject.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tutoring Modes */}
      <section className="py-20 bg-section-blue">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-brand-navy mb-4">
              Flexible Tutoring Modes
            </h2>
            <p className="text-brand-muted text-lg">
              Learn the way that suits you best
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: "🏠",
                title: "Home Tuition",
                desc: "Our tutors come to your home in Thanjavur for a comfortable, distraction-free learning environment.",
                badge: "Thanjavur Area",
              },
              {
                icon: "💻",
                title: "Online Classes",
                desc: "Live interactive sessions via video call from anywhere. Same quality, better convenience.",
                badge: "Anywhere",
              },
              {
                icon: "👥",
                title: "Group Classes",
                desc: "Small groups of 3–5 students for collaborative learning and peer motivation.",
                badge: "3–5 Students",
              },
            ].map((mode, i) => (
              <motion.div
                key={mode.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                <Card className="bg-white h-full p-6 hover:shadow-card-hover transition-all">
                  <CardContent className="p-0">
                    <div className="text-5xl mb-4">{mode.icon}</div>
                    <span className="inline-block bg-brand-lightblue text-brand-blue text-xs font-semibold px-3 py-1 rounded-full mb-3">
                      {mode.badge}
                    </span>
                    <h3 className="font-bold text-brand-navy text-xl mb-2">
                      {mode.title}
                    </h3>
                    <p className="text-brand-muted text-sm leading-relaxed">
                      {mode.desc}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-section-yellow">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-brand-navy mb-4">
              Why Choose Us?
            </h2>
            <p className="text-brand-muted text-lg">
              We don&apos;t just teach — we transform students
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY_CHOOSE.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className="bg-white h-full p-6 text-center hover:shadow-card-hover transition-all">
                    <CardContent className="p-0">
                      <div className="w-14 h-14 rounded-2xl bg-brand-lightblue flex items-center justify-center mx-auto mb-4">
                        <Icon size={24} className="text-brand-blue" />
                      </div>
                      <h3 className="font-bold text-brand-navy mb-2">
                        {item.title}
                      </h3>
                      <p className="text-brand-muted text-sm leading-relaxed">
                        {item.desc}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-section-blue">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-brand-navy mb-4">
              What Parents & Students Say
            </h2>
          </motion.div>
          <div className="relative max-w-3xl mx-auto">
            <Card className="bg-white p-8 md:p-10 shadow-card">
              <CardContent className="p-0">
                <StarRating
                  rating={testimonials[testimonialIdx]?.rating ?? BigInt(5)}
                />
                <p className="text-brand-dark text-lg leading-relaxed mt-4 mb-6 italic">
                  &ldquo;{testimonials[testimonialIdx]?.reviewText}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-brand-navy flex items-center justify-center text-white font-bold text-lg">
                    {testimonials[testimonialIdx]?.studentName[0]}
                  </div>
                  <div>
                    <p className="font-bold text-brand-navy">
                      {testimonials[testimonialIdx]?.studentName}
                    </p>
                    <p className="text-brand-muted text-sm">
                      {testimonials[testimonialIdx]?.role}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <div className="flex items-center justify-center gap-4 mt-6">
              <button
                type="button"
                onClick={prevTestimonial}
                className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-brand-lightblue transition-colors"
                data-ocid="testimonials.pagination_prev"
              >
                <ChevronLeft size={20} className="text-brand-navy" />
              </button>
              <div className="flex gap-2">
                {testimonials.map((t, i) => (
                  <button
                    type="button"
                    key={t.id}
                    onClick={() => setTestimonialIdx(i)}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${i === testimonialIdx ? "bg-brand-blue w-6" : "bg-gray-300"}`}
                    data-ocid="testimonials.toggle"
                    aria-label={`Testimonial ${i + 1}`}
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={nextTestimonial}
                className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-brand-lightblue transition-colors"
                data-ocid="testimonials.pagination_next"
              >
                <ChevronRight size={20} className="text-brand-navy" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 hero-gradient">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Start Learning?
            </h2>
            <p className="text-blue-100 text-lg mb-8">
              Book a free demo class today. No commitment required.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                asChild
                className="rounded-full bg-brand-yellow text-brand-dark font-bold px-8 py-3 hover:bg-yellow-300"
              >
                <Link to="/contact" data-ocid="cta.primary_button">
                  Book Free Demo
                </Link>
              </Button>
              <a
                href="https://wa.me/919600243654"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border-2 border-white text-white px-8 py-3 font-semibold hover:bg-white hover:text-brand-navy transition-colors"
                data-ocid="cta.secondary_button"
              >
                <Users size={18} /> WhatsApp Us
              </a>
            </div>
            <div className="flex flex-wrap justify-center gap-8 mt-10">
              {CONTACT_NUMBERS.map((num) => (
                <a
                  key={num}
                  href={`tel:${num.replace(/\s/g, "")}`}
                  className="text-white font-semibold hover:text-brand-yellow transition-colors"
                >
                  📞 {num}
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
