import type { Testimonial } from "@/backend";
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
  useAddTestimonial,
  useDeleteTestimonial,
  useTestimonials,
  useUpdateTestimonial,
} from "@/hooks/useQueries";
import { Loader2, Pencil, Plus, Star, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const emptyForm = (): Testimonial => ({
  id: "",
  studentName: "",
  role: "",
  photoUrl: "",
  rating: BigInt(5),
  reviewText: "",
});

export default function AdminTestimonials() {
  const { data: testimonials = [], isLoading } = useTestimonials();
  const add = useAddTestimonial();
  const update = useUpdateTestimonial();
  const del = useDeleteTestimonial();

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [form, setForm] = useState<Testimonial>(emptyForm());
  const [ratingInput, setRatingInput] = useState(5);

  const openAdd = () => {
    setEditing(null);
    setForm(emptyForm());
    setRatingInput(5);
    setOpen(true);
  };
  const openEdit = (t: Testimonial) => {
    setEditing(t);
    setForm(t);
    setRatingInput(Number(t.rating));
    setOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const toSave = { ...form, rating: BigInt(ratingInput) };
    try {
      if (editing) {
        await update.mutateAsync(toSave);
        toast.success("Testimonial updated!");
      } else {
        await add.mutateAsync({ ...toSave, id: crypto.randomUUID() });
        toast.success("Testimonial added!");
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
      toast.success("Testimonial deleted.");
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
          <h1 className="text-2xl font-bold text-brand-navy">Testimonials</h1>
          <p className="text-brand-muted text-sm mt-1">
            Manage student and parent reviews
          </p>
        </div>
        <Button
          onClick={openAdd}
          className="bg-brand-blue text-white"
          data-ocid="testimonials.open_modal_button"
        >
          <Plus className="mr-2 h-4 w-4" /> Add Testimonial
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          {isLoading ? (
            <div
              className="p-6 space-y-3"
              data-ocid="testimonials.loading_state"
            >
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          ) : testimonials.length === 0 ? (
            <div
              className="p-10 text-center text-brand-muted"
              data-ocid="testimonials.empty_state"
            >
              No testimonials yet.
            </div>
          ) : (
            <Table data-ocid="testimonials.table">
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Review</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {testimonials.map((t, i) => (
                  <TableRow key={t.id} data-ocid={`testimonials.row.${i + 1}`}>
                    <TableCell className="font-medium">
                      {t.studentName}
                    </TableCell>
                    <TableCell className="text-sm text-brand-muted">
                      {t.role}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((j) => (
                          <Star
                            key={j}
                            size={12}
                            className={
                              j <= Number(t.rating)
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            }
                          />
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-brand-muted max-w-xs truncate">
                      {t.reviewText}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => openEdit(t)}
                          data-ocid={`testimonials.edit_button.${i + 1}`}
                        >
                          <Pencil size={14} />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="text-destructive"
                              data-ocid={`testimonials.delete_button.${i + 1}`}
                            >
                              <Trash2 size={14} />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent data-ocid="testimonials.dialog">
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Delete Testimonial?
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel data-ocid="testimonials.cancel_button">
                                Cancel
                              </AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(t.id)}
                                className="bg-destructive text-white"
                                data-ocid="testimonials.confirm_button"
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
        <DialogContent data-ocid="testimonials.modal">
          <DialogHeader>
            <DialogTitle>
              {editing ? "Edit Testimonial" : "Add Testimonial"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <Label>Student/Parent Name *</Label>
              <Input
                value={form.studentName}
                onChange={(e) =>
                  setForm((f) => ({ ...f, studentName: e.target.value }))
                }
                required
                className="mt-1"
                data-ocid="testimonials.input"
              />
            </div>
            <div>
              <Label>Role (e.g. Parent, Student Grade 10)</Label>
              <Input
                value={form.role}
                onChange={(e) =>
                  setForm((f) => ({ ...f, role: e.target.value }))
                }
                className="mt-1"
                data-ocid="testimonials.input"
              />
            </div>
            <div>
              <Label>Rating (1-5)</Label>
              <Input
                type="number"
                min={1}
                max={5}
                value={ratingInput}
                onChange={(e) => setRatingInput(Number(e.target.value))}
                className="mt-1 w-24"
                data-ocid="testimonials.input"
              />
            </div>
            <div>
              <Label>Review *</Label>
              <Textarea
                value={form.reviewText}
                onChange={(e) =>
                  setForm((f) => ({ ...f, reviewText: e.target.value }))
                }
                rows={3}
                required
                className="mt-1"
                data-ocid="testimonials.textarea"
              />
            </div>
            <div>
              <Label>Photo URL</Label>
              <Input
                value={form.photoUrl}
                onChange={(e) =>
                  setForm((f) => ({ ...f, photoUrl: e.target.value }))
                }
                placeholder="https://..."
                className="mt-1"
                data-ocid="testimonials.input"
              />
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                data-ocid="testimonials.cancel_button"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isPending}
                className="bg-brand-blue text-white"
                data-ocid="testimonials.save_button"
              >
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
                  </>
                ) : (
                  "Save"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
