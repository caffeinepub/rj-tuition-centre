import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAboutContent, useUpdateAboutContent } from "@/hooks/useQueries";
import { AlertCircle, Loader2, RefreshCw, Save } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function AdminAbout() {
  const { data: about, isLoading } = useAboutContent();
  const update = useUpdateAboutContent();

  const [form, setForm] = useState({
    introduction: "",
    qualifications: "",
    experience: "",
    teachingPhilosophy: "",
    achievements: "",
  });

  useEffect(() => {
    if (about) setForm(about);
  }, [about]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await update.mutateAsync(form);
      toast.success("About content updated!");
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : "Failed to update about content.";
      toast.error(msg);
    }
  };

  const fields: { key: keyof typeof form; label: string }[] = [
    { key: "introduction", label: "Introduction" },
    { key: "qualifications", label: "Qualifications" },
    { key: "experience", label: "Experience" },
    { key: "teachingPhilosophy", label: "Teaching Philosophy" },
    { key: "achievements", label: "Achievements & Results" },
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-brand-navy">About Us</h1>
        <p className="text-brand-muted text-sm mt-1">
          Manage the About Us page content
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Edit About Content</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-4" data-ocid="admin_about.loading_state">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="h-24 bg-gray-100 rounded-lg animate-pulse"
                />
              ))}
            </div>
          ) : (
            <form onSubmit={handleSave} className="space-y-5">
              {fields.map(({ key, label }) => (
                <div key={key}>
                  <Label htmlFor={key} className="font-medium">
                    {label}
                  </Label>
                  <Textarea
                    id={key}
                    value={form[key]}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, [key]: e.target.value }))
                    }
                    rows={4}
                    className="mt-1"
                    data-ocid="admin_about.textarea"
                  />
                </div>
              ))}
              <Button
                type="submit"
                disabled={update.isPending}
                className="bg-brand-blue text-white"
                data-ocid="admin_about.save_button"
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
