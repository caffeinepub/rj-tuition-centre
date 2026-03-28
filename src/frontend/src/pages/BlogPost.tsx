import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useBlogPost } from "@/hooks/useQueries";
import { Link, useParams } from "@tanstack/react-router";
import { ArrowLeft, Calendar, Tag } from "lucide-react";
import { motion } from "motion/react";
import { useEffect } from "react";

const SEED_CONTENT: Record<
  string,
  { title: string; content: string; tags: string[]; date: string }
> = {
  "board-exam-study-tips": {
    title: "10 Proven Study Tips for Board Exam Success",
    tags: ["Study Tips", "Board Exams"],
    date: "March 21, 2026",
    content: [
      "## Create a Realistic Study Schedule",
      "Start planning 3 months before your exams. Divide your syllabus into manageable daily chunks. Give more time to subjects you find challenging.",
      "",
      "## Master the Art of Note-Taking",
      "Write concise notes in your own words. Use mind maps for complex topics. Reviewing handwritten notes is proven to improve retention.",
      "",
      "## Practice with Past Papers",
      "Solve the last 5-10 years of question papers under timed conditions. This builds exam confidence and reveals patterns in questions.",
      "",
      "## Focus on NCERT First",
      "For board exams, NCERT textbooks are the primary source. Master every concept and example in NCERT before moving to reference books.",
      "",
      "## Stay Healthy",
      "Sleep 8 hours every night during exam preparation. Exercise daily for at least 30 minutes. A healthy body supports a sharp mind.",
      "",
      "## Seek Help Early",
      "Don't wait until exams to ask for help. If you're stuck on a concept, seek clarification immediately from your tutor or teacher.",
    ].join("\n"),
  },
};

function formatDate(ts: bigint) {
  const ms = Number(ts) / 1_000_000;
  return new Date(ms).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function BlogPost() {
  const { slug } = useParams({ from: "/public/blog/$slug" });
  const { data: post, isLoading } = useBlogPost(slug);
  const seed = SEED_CONTENT[slug];

  useEffect(() => {
    const title = post?.title ?? seed?.title ?? "Blog";
    document.title = `${title} | RJ Tuition Centre`;
  }, [post, seed]);

  if (isLoading) {
    return (
      <div className="pt-20 min-h-screen">
        <div className="container mx-auto px-4 py-16 max-w-3xl">
          <Skeleton className="h-10 w-3/4 mb-6" />
          <Skeleton className="h-4 w-1/4 mb-10" />
          <Skeleton className="h-5 w-full mb-3" />
          <Skeleton className="h-5 w-full mb-3" />
          <Skeleton className="h-5 w-full mb-3" />
        </div>
      </div>
    );
  }

  const title = post?.title ?? seed?.title ?? "Blog Post";
  const content = post?.content ?? seed?.content ?? "";
  const tags = post?.tags ?? seed?.tags ?? [];
  const dateStr = post ? formatDate(post.publishDate) : (seed?.date ?? "");
  const lines = content.split("\n");

  return (
    <div className="pt-16 md:pt-20">
      <section className="hero-gradient py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex flex-wrap gap-2 mb-4">
              {tags.map((tag) => (
                <Badge key={tag} className="bg-white/20 text-white border-0">
                  <Tag size={10} className="mr-1" />
                  {tag}
                </Badge>
              ))}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {title}
            </h1>
            {dateStr && (
              <div className="flex items-center gap-2 text-blue-200 text-sm">
                <Calendar size={14} />
                {dateStr}
              </div>
            )}
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <Button
            asChild
            variant="ghost"
            className="mb-8 text-brand-blue"
            data-ocid="blogpost.link"
          >
            <Link to="/blog">
              <ArrowLeft size={16} className="mr-2" /> Back to Blog
            </Link>
          </Button>
          <article className="prose prose-blue max-w-none">
            {lines.map((line, i) => {
              const key = `line-${i}`;
              if (line.startsWith("## "))
                return (
                  <h2
                    key={key}
                    className="text-xl font-bold text-brand-navy mt-8 mb-3"
                  >
                    {line.slice(3)}
                  </h2>
                );
              if (line.trim() === "") return <br key={key} />;
              return (
                <p key={key} className="text-brand-muted leading-relaxed mb-3">
                  {line}
                </p>
              );
            })}
          </article>
        </div>
      </section>
    </div>
  );
}
