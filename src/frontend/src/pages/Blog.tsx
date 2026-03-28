import type { BlogPost } from "@/backend";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useBlogPosts } from "@/hooks/useQueries";
import { Link } from "@tanstack/react-router";
import { Calendar, Tag } from "lucide-react";
import { motion } from "motion/react";
import { useEffect } from "react";

const SEED_POSTS: BlogPost[] = [
  {
    id: "1",
    title: "10 Proven Study Tips for Board Exam Success",
    excerpt:
      "Master your board exams with these time-tested strategies from our experienced tutors. Learn how to plan, revise, and execute under pressure.",
    content: "",
    imageUrl: "",
    slug: "board-exam-study-tips",
    publishDate: BigInt(Date.now() - 7 * 86400000) * BigInt(1_000_000),
    tags: ["Study Tips", "Board Exams"],
    published: true,
  },
  {
    id: "2",
    title: "NEET 2025 Preparation Guide: Start Early, Score High",
    excerpt:
      "Everything you need to know about preparing for NEET 2025. Subject breakdown, recommended books, and a realistic preparation timeline.",
    content: "",
    imageUrl: "",
    slug: "neet-2025-guide",
    publishDate: BigInt(Date.now() - 14 * 86400000) * BigInt(1_000_000),
    tags: ["NEET", "Exam Prep"],
    published: true,
  },
  {
    id: "3",
    title: "Why Home Tuition Works Better for Most Students",
    excerpt:
      "Research shows that personalized one-on-one tutoring leads to significantly better outcomes. Here's why and how to make the most of it.",
    content: "",
    imageUrl: "",
    slug: "why-home-tuition-works",
    publishDate: BigInt(Date.now() - 21 * 86400000) * BigInt(1_000_000),
    tags: ["Home Tuition", "Learning"],
    published: true,
  },
  {
    id: "4",
    title: "How to Help Your Child Overcome Math Anxiety",
    excerpt:
      "Math anxiety is more common than you think. Our tutors share practical tips for parents to help their children develop confidence in mathematics.",
    content: "",
    imageUrl: "",
    slug: "math-anxiety-tips",
    publishDate: BigInt(Date.now() - 28 * 86400000) * BigInt(1_000_000),
    tags: ["Mathematics", "Parenting"],
    published: true,
  },
  {
    id: "5",
    title: "Understanding the Tamil Nadu Board Exam Syllabus 2024-25",
    excerpt:
      "A comprehensive breakdown of the updated Tamil Nadu State Board syllabus for all grades. What's new and what teachers are focusing on.",
    content: "",
    imageUrl: "",
    slug: "tn-board-syllabus-2025",
    publishDate: BigInt(Date.now() - 35 * 86400000) * BigInt(1_000_000),
    tags: ["Tamil Nadu", "Syllabus"],
    published: true,
  },
  {
    id: "6",
    title: "Online vs Offline Classes: Which is Better for Your Child?",
    excerpt:
      "An honest comparison of online and offline learning for school students. Pros, cons, and how to choose what's right for your family.",
    content: "",
    imageUrl: "",
    slug: "online-vs-offline-classes",
    publishDate: BigInt(Date.now() - 42 * 86400000) * BigInt(1_000_000),
    tags: ["Online Learning", "Offline"],
    published: true,
  },
];

const blogEmojis = ["📚", "🔬", "🏠", "🧮", "📋", "💻"];

function formatDate(ts: bigint) {
  const ms = Number(ts) / 1_000_000;
  return new Date(ms).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function Blog() {
  useEffect(() => {
    document.title = "Blog & Resources | RJ Tuition Centre Thanjavur";
  }, []);

  const { data: postsData, isLoading } = useBlogPosts();
  const posts = postsData?.length ? postsData : SEED_POSTS;

  return (
    <div className="pt-16 md:pt-20">
      <section className="hero-gradient py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Blog & Resources
            </h1>
            <p className="text-blue-100 text-lg max-w-2xl mx-auto">
              Study tips, exam guides, and educational insights for students and
              parents
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-72 rounded-2xl" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post, i) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  data-ocid={`blog.item.${i + 1}`}
                >
                  <Card className="h-full hover:shadow-card-hover transition-all group">
                    <div className="h-40 bg-brand-lightblue rounded-t-2xl flex items-center justify-center text-6xl">
                      {post.imageUrl ? (
                        <img
                          src={post.imageUrl}
                          alt={post.title}
                          className="w-full h-full object-cover rounded-t-2xl"
                        />
                      ) : (
                        blogEmojis[i % blogEmojis.length]
                      )}
                    </div>
                    <CardContent className="p-6">
                      <div className="flex flex-wrap gap-2 mb-3">
                        {post.tags.slice(0, 2).map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="text-xs"
                          >
                            <Tag size={10} className="mr-1" />
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <h3 className="font-bold text-brand-navy text-lg mb-2 leading-tight group-hover:text-brand-blue transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-brand-muted text-sm leading-relaxed mb-4">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1 text-xs text-brand-muted">
                          <Calendar size={12} /> {formatDate(post.publishDate)}
                        </span>
                        <Link
                          to="/blog/$slug"
                          params={{ slug: post.slug }}
                          className="text-brand-blue text-sm font-semibold hover:underline"
                          data-ocid="blog.link"
                        >
                          Read More →
                        </Link>
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
