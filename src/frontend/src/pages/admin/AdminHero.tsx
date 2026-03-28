import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useHeroContent, useUpdateHeroContent } from "@/hooks/useQueries";
import { AlertCircle, Loader2, RefreshCw, Save } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function AdminHero() {
  const { data: hero, isLoading, isError, refetch } = useHeroContent();
  const update = useUpdateHeroContent();

  const [form, setForm] = useState({
    headline: "Unlock Your Child's Academic Potential",
    subheading:
      "Expert Home Tuition & Online Classes in Thanjavur. Personalized learning for grades 1–12.",
    ctaButtonText: "Book Free Demo",
    ctaButtonLink: "/contact",
  });

  useEffect(() => {
    if (hero) setForm(hero);
  }, [hero]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await update.mutateAsync(form);
      toast.success("Hero content updated!");
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : "Failed to update hero content.";
      toast.error(msg);
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-brand-navy">Hero Section</h1>
        <p className="text-brand-muted text-sm mt-1">
          Manage the homepage hero banner content
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Edit Hero Content</CardTitle>
        </CardHeader>
        <CardContent>
          {isError ? (
            <div className="flex flex-col items-center justify-center p-8 text-center gap-4">
              <AlertCircle size={32} className="text-destructive" />
              <div>
                <p className="font-semibold text-brand-navy">
                  Failed to load hero content
                </p>
                <p className="text-sm text-brand-muted mt-1">
                  Check your connection and try again.
                </p>
              </div>
              <Button onClick={() => refetch()} variant="outline">
                <RefreshCw size={16} className="mr-2" /> Retry
              </Button>
            </div>
          ) : isLoading ? (
            <div className="space-y-4" data-ocid="admin_hero.loading_state">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-10 bg-gray-100 rounded-lg animate-pulse"
                />
              ))}
            </div>
          ) : (
            <form onSubmit={handleSave} className="space-y-5">
              <div>
                <Label htmlFor="headline" className="font-medium">
                  Headline *
                </Label>
                <Input
                  id="headline"
                  value={form.headline}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, headline: e.target.value }))
                  }
                  required
                  className="mt-1"
                  data-ocid="admin_hero.input"
                />
              </div>
              <div>
                <Label htmlFor="subheading" className="font-medium">
                  Subheading *
                </Label>
                <Textarea
                  id="subheading"
                  value={form.subheading}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, subheading: e.target.value }))
                  }
                  rows={3}
                  className="mt-1"
                  data-ocid="admin_hero.textarea"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="ctaText" className="font-medium">
                    CTA Button Text
                  </Label>
                  <Input
                    id="ctaText"
                    value={form.ctaButtonText}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, ctaButtonText: e.target.value }))
                    }
                    className="mt-1"
                    data-ocid="admin_hero.input"
                  />
                </div>
                <div>
                  <Label htmlFor="ctaLink" className="font-medium">
                    CTA Button Link
                  </Label>
                  <Input
                    id="ctaLink"
                    value={form.ctaButtonLink}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, ctaButtonLink: e.target.value }))
                    }
                    className="mt-1"
                    data-ocid="admin_hero.input"
                  />
                </div>
              </div>
              <Button
                type="submit"
                disabled={update.isPending}
                className="bg-brand-blue text-white"
                data-ocid="admin_hero.save_button"
              >
                {update.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" /> Save Changes
                  </>
                )}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
