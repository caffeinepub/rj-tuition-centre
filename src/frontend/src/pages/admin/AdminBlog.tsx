import type { BlogPost } from "@/backend";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import {
  useAddBlogPost,
  useAllBlogPosts,
  useDeleteBlogPost,
  useUpdateBlogPost,
} from "@/hooks/useQueries";
import { CheckSquare, Loader2, Pencil, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

function emptyForm(): BlogPost {
  return {
    id: "",
    title: "",
    content: "",
    excerpt: "",
    imageUrl: "",
    slug: "",
    publishDate: BigInt(Date.now()) * BigInt(1_000_000),
    tags: [],
    published: false,
  };
}

function slugify(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export default function AdminBlog() {
  const { data: posts = [], isLoading } = useAllBlogPosts();
  const add = useAddBlogPost();
  const update = useUpdateBlogPost();
  const del = useDeleteBlogPost();

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [form, setForm] = useState<BlogPost>(emptyForm());
  const [tagsInput, setTagsInput] = useState("");

  const openAdd = () => {
    setEditing(null);
    setForm(emptyForm());
    setTagsInput("");
    setOpen(true);
  };
  const openEdit = (p: BlogPost) => {
    setEditing(p);
    setForm(p);
    setTagsInput(p.tags.join(", "));
    setOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const tags = tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    const toSave = { ...form, tags, slug: form.slug || slugify(form.title) };
    try {
      if (editing) {
        await update.mutateAsync(toSave);
        toast.success("Post updated!");
      } else {
        await add.mutateAsync({ ...toSave, id: crypto.randomUUID() });
        toast.success("Post added!");
      }
      setOpen(false);
    } catch (err) {
      const msg =
        err instanceof Error
          ? err.message
          : "Operation failed. Please try again.";
      toast.error(msg);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await del.mutateAsync(id);
      toast.success("Post deleted.");
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : "Delete failed. Please try again.";
      toast.error(msg);
    }
  };

  const isPending = add.isPending || update.isPending;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-brand-navy">Blog Posts</h1>
          <p className="text-brand-muted text-sm mt-1">
            Manage articles and resources
          </p>
        </div>
        <Button
          onClick={openAdd}
          className="bg-brand-blue text-white"
          data-ocid="blog.open_modal_button"
        >
          <Plus className="mr-2 h-4 w-4" /> New Post
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="p-6 space-y-3" data-ocid="blog.loading_state">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          ) : posts.length === 0 ? (
            <div
              className="p-10 text-center text-brand-muted"
              data-ocid="blog.empty_state"
            >
              No posts yet.
            </div>
          ) : (
            <Table data-ocid="blog.table">
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Slug</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Tags</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {posts.map((p, i) => (
                  <TableRow key={p.id} data-ocid={`blog.row.${i + 1}`}>
                    <TableCell className="font-medium max-w-xs truncate">
                      {p.title}
                    </TableCell>
                    <TableCell className="text-sm text-brand-muted">
                      {p.slug}
                    </TableCell>
                    <TableCell>
                      <Badge variant={p.published ? "default" : "secondary"}>
                        {p.published ? "Published" : "Draft"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-xs text-brand-muted">
                      {p.tags.join(", ")}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => openEdit(p)}
                          data-ocid={`blog.edit_button.${i + 1}`}
                        >
                          <Pencil size={14} />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="text-destructive"
                              data-ocid={`blog.delete_button.${i + 1}`}
                            >
                              <Trash2 size={14} />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent data-ocid="blog.dialog">
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Post?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel data-ocid="blog.cancel_button">
                                Cancel
                              </AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(p.id)}
                                className="bg-destructive text-white"
                                data-ocid="blog.confirm_button"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl" data-ocid="blog.modal">
          <DialogHeader>
            <DialogTitle>{editing ? "Edit Post" : "New Blog Post"}</DialogTitle>
          </DialogHeader>
          <form
            onSubmit={handleSave}
            className="space-y-4 max-h-[70vh] overflow-y-auto pr-2"
          >
            <div>
              <Label>Title *</Label>
              <Input
                value={form.title}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    title: e.target.value,
                    slug: slugify(e.target.value),
                  }))
                }
                required
                className="mt-1"
                data-ocid="blog.input"
              />
            </div>
            <div>
              <Label>Slug</Label>
              <Input
                value={form.slug}
                onChange={(e) =>
                  setForm((f) => ({ ...f, slug: e.target.value }))
                }
                className="mt-1"
                data-ocid="blog.input"
              />
            </div>
            <div>
              <Label>Excerpt *</Label>
              <Textarea
                value={form.excerpt}
                onChange={(e) =>
                  setForm((f) => ({ ...f, excerpt: e.target.value }))
                }
                rows={2}
                required
                className="mt-1"
                data-ocid="blog.textarea"
              />
            </div>
            <div>
              <Label>Content *</Label>
              <Textarea
                value={form.content}
                onChange={(e) =>
                  setForm((f) => ({ ...f, content: e.target.value }))
                }
                rows={8}
                required
                className="mt-1"
                data-ocid="blog.textarea"
              />
            </div>
            <div>
              <Label>Image URL</Label>
              <Input
                value={form.imageUrl}
                onChange={(e) =>
                  setForm((f) => ({ ...f, imageUrl: e.target.value }))
                }
                placeholder="https://..."
                className="mt-1"
                data-ocid="blog.input"
              />
            </div>
            <div>
              <Label>Tags (comma-separated)</Label>
              <Input
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                placeholder="Study Tips, Board Exams"
                className="mt-1"
                data-ocid="blog.input"
              />
            </div>
            <div className="flex items-center gap-3">
              <Switch
                checked={form.published}
                onCheckedChange={(v) =>
                  setForm((f) => ({ ...f, published: v }))
                }
                data-ocid="blog.switch"
              />
              <Label>Published</Label>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                data-ocid="blog.cancel_button"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isPending}
                className="bg-brand-blue text-white"
                data-ocid="blog.save_button"
              >
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
                  </>
                ) : (
                  "Save Post"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
