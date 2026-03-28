import type { Subject } from "@/backend";
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
import {
  useAddSubject,
  useDeleteSubject,
  useSubjects,
  useUpdateSubject,
} from "@/hooks/useQueries";
import { Loader2, Pencil, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const emptyForm = (): Subject => ({
  id: "",
  name: "",
  gradeRange: "",
  iconName: "",
  description: "",
});

export default function AdminSubjects() {
  const { data: subjects = [], isLoading } = useSubjects();
  const add = useAddSubject();
  const update = useUpdateSubject();
  const del = useDeleteSubject();

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Subject | null>(null);
  const [form, setForm] = useState<Subject>(emptyForm());

  const openAdd = () => {
    setEditing(null);
    setForm(emptyForm());
    setOpen(true);
  };
  const openEdit = (s: Subject) => {
    setEditing(s);
    setForm(s);
    setOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editing) {
        await update.mutateAsync(form);
        toast.success("Subject updated!");
      } else {
        await add.mutateAsync({ ...form, id: crypto.randomUUID() });
        toast.success("Subject added!");
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
      toast.success("Subject deleted.");
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
          <h1 className="text-2xl font-bold text-brand-navy">Subjects</h1>
          <p className="text-brand-muted text-sm mt-1">
            Manage subjects offered by grade range
          </p>
        </div>
        <Button
          onClick={openAdd}
          className="bg-brand-blue text-white"
          data-ocid="subjects.open_modal_button"
        >
          <Plus className="mr-2 h-4 w-4" /> Add Subject
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="p-6 space-y-3" data-ocid="subjects.loading_state">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          ) : subjects.length === 0 ? (
            <div
              className="p-10 text-center text-brand-muted"
              data-ocid="subjects.empty_state"
            >
              No subjects yet. Click &quot;Add Subject&quot; to get started.
            </div>
          ) : (
            <Table data-ocid="subjects.table">
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Grade Range</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {subjects.map((s, i) => (
                  <TableRow key={s.id} data-ocid={`subjects.row.${i + 1}`}>
                    <TableCell className="font-medium">{s.name}</TableCell>
                    <TableCell>{s.gradeRange}</TableCell>
                    <TableCell className="text-brand-muted text-sm max-w-xs truncate">
                      {s.description}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => openEdit(s)}
                          data-ocid={`subjects.edit_button.${i + 1}`}
                        >
                          <Pencil size={14} />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="text-destructive"
                              data-ocid={`subjects.delete_button.${i + 1}`}
                            >
                              <Trash2 size={14} />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent data-ocid="subjects.dialog">
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Delete Subject?
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel data-ocid="subjects.cancel_button">
                                Cancel
                              </AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(s.id)}
                                className="bg-destructive text-white"
                                data-ocid="subjects.confirm_button"
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
        <DialogContent data-ocid="subjects.modal">
          <DialogHeader>
            <DialogTitle>
              {editing ? "Edit Subject" : "Add Subject"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <Label>Name *</Label>
              <Input
                value={form.name}
                onChange={(e) =>
                  setForm((f) => ({ ...f, name: e.target.value }))
                }
                required
                className="mt-1"
                data-ocid="subjects.input"
              />
            </div>
            <div>
              <Label>Grade Range *</Label>
              <Input
                value={form.gradeRange}
                onChange={(e) =>
                  setForm((f) => ({ ...f, gradeRange: e.target.value }))
                }
                placeholder="e.g. 1-5"
                required
                className="mt-1"
                data-ocid="subjects.input"
              />
            </div>
            <div>
              <Label>Icon Name</Label>
              <Input
                value={form.iconName}
                onChange={(e) =>
                  setForm((f) => ({ ...f, iconName: e.target.value }))
                }
                placeholder="e.g. calculator"
                className="mt-1"
                data-ocid="subjects.input"
              />
            </div>
            <div>
              <Label>Description</Label>
              <Input
                value={form.description}
                onChange={(e) =>
                  setForm((f) => ({ ...f, description: e.target.value }))
                }
                className="mt-1"
                data-ocid="subjects.input"
              />
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                data-ocid="subjects.cancel_button"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isPending}
                className="bg-brand-blue text-white"
                data-ocid="subjects.save_button"
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
