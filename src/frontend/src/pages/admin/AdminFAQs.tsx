import type { Faq } from "@/backend";
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
  useAddFAQ,
  useDeleteFAQ,
  useFAQs,
  useUpdateFAQ,
} from "@/hooks/useQueries";
import { Loader2, Pencil, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const emptyForm = (order: number): Faq => ({
  id: "",
  question: "",
  answer: "",
  order: BigInt(order),
});

export default function AdminFAQs() {
  const { data: faqs = [], isLoading } = useFAQs();
  const add = useAddFAQ();
  const update = useUpdateFAQ();
  const del = useDeleteFAQ();

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Faq | null>(null);
  const [form, setForm] = useState<Faq>(emptyForm(1));

  const openAdd = () => {
    setEditing(null);
    setForm(emptyForm(faqs.length + 1));
    setOpen(true);
  };
  const openEdit = (f: Faq) => {
    setEditing(f);
    setForm(f);
    setOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editing) {
        await update.mutateAsync(form);
        toast.success("FAQ updated!");
      } else {
        await add.mutateAsync({ ...form, id: crypto.randomUUID() });
        toast.success("FAQ added!");
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
      toast.success("FAQ deleted.");
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : "Delete failed. Please try again.";
      toast.error(msg);
    }
  };

  const sorted = [...faqs].sort((a, b) => Number(a.order) - Number(b.order));
  const isPending = add.isPending || update.isPending;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-brand-navy">FAQs</h1>
          <p className="text-brand-muted text-sm mt-1">
            Manage frequently asked questions
          </p>
        </div>
        <Button
          onClick={openAdd}
          className="bg-brand-blue text-white"
          data-ocid="faqs.open_modal_button"
        >
          <Plus className="mr-2 h-4 w-4" /> Add FAQ
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="p-6 space-y-3" data-ocid="faqs.loading_state">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          ) : sorted.length === 0 ? (
            <div
              className="p-10 text-center text-brand-muted"
              data-ocid="faqs.empty_state"
            >
              No FAQs yet.
            </div>
          ) : (
            <Table data-ocid="faqs.table">
              <TableHeader>
                <TableRow>
                  <TableHead>#</TableHead>
                  <TableHead>Question</TableHead>
                  <TableHead>Answer</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sorted.map((faq, i) => (
                  <TableRow key={faq.id} data-ocid={`faqs.row.${i + 1}`}>
                    <TableCell>{Number(faq.order)}</TableCell>
                    <TableCell className="font-medium max-w-xs">
                      {faq.question}
                    </TableCell>
                    <TableCell className="text-brand-muted text-sm max-w-xs truncate">
                      {faq.answer}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => openEdit(faq)}
                          data-ocid={`faqs.edit_button.${i + 1}`}
                        >
                          <Pencil size={14} />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="text-destructive"
                              data-ocid={`faqs.delete_button.${i + 1}`}
                            >
                              <Trash2 size={14} />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent data-ocid="faqs.dialog">
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete FAQ?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel data-ocid="faqs.cancel_button">
                                Cancel
                              </AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(faq.id)}
                                className="bg-destructive text-white"
                                data-ocid="faqs.confirm_button"
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
        <DialogContent data-ocid="faqs.modal">
          <DialogHeader>
            <DialogTitle>{editing ? "Edit FAQ" : "Add FAQ"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <Label>Question *</Label>
              <Input
                value={form.question}
                onChange={(e) =>
                  setForm((f) => ({ ...f, question: e.target.value }))
                }
                required
                className="mt-1"
                data-ocid="faqs.input"
              />
            </div>
            <div>
              <Label>Answer *</Label>
              <Textarea
                value={form.answer}
                onChange={(e) =>
                  setForm((f) => ({ ...f, answer: e.target.value }))
                }
                rows={4}
                required
                className="mt-1"
                data-ocid="faqs.textarea"
              />
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                data-ocid="faqs.cancel_button"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isPending}
                className="bg-brand-blue text-white"
                data-ocid="faqs.save_button"
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
