import type { Service } from "@/backend";
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
  useAddService,
  useDeleteService,
  useServices,
  useUpdateService,
} from "@/hooks/useQueries";
import { Loader2, Pencil, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

function emptyForm(order: number): Service {
  return {
    id: "",
    title: "",
    description: "",
    imageUrl: "",
    order: BigInt(order),
  };
}

export default function AdminServices() {
  const { data: services = [], isLoading } = useServices();
  const add = useAddService();
  const update = useUpdateService();
  const del = useDeleteService();

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Service | null>(null);
  const [form, setForm] = useState<Service>(emptyForm(1));

  const openAdd = () => {
    setEditing(null);
    setForm(emptyForm(services.length + 1));
    setOpen(true);
  };
  const openEdit = (s: Service) => {
    setEditing(s);
    setForm(s);
    setOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editing) {
        await update.mutateAsync(form);
        toast.success("Service updated!");
      } else {
        await add.mutateAsync({ ...form, id: crypto.randomUUID() });
        toast.success("Service added!");
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
      toast.success("Service deleted.");
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : "Delete failed. Please try again.";
      toast.error(msg);
    }
  };

  const sorted = [...services].sort(
    (a, b) => Number(a.order) - Number(b.order),
  );
  const isPending = add.isPending || update.isPending;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-brand-navy">Services</h1>
          <p className="text-brand-muted text-sm mt-1">
            Manage services offered
          </p>
        </div>
        <Button
          onClick={openAdd}
          className="bg-brand-blue text-white"
          data-ocid="services.open_modal_button"
        >
          <Plus className="mr-2 h-4 w-4" /> Add Service
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="p-6 space-y-3" data-ocid="services.loading_state">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          ) : sorted.length === 0 ? (
            <div
              className="p-10 text-center text-brand-muted"
              data-ocid="services.empty_state"
            >
              No services yet.
            </div>
          ) : (
            <Table data-ocid="services.table">
              <TableHeader>
                <TableRow>
                  <TableHead>Order</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sorted.map((s, i) => (
                  <TableRow key={s.id} data-ocid={`services.row.${i + 1}`}>
                    <TableCell>{Number(s.order)}</TableCell>
                    <TableCell className="font-medium">{s.title}</TableCell>
                    <TableCell className="text-brand-muted text-sm max-w-xs truncate">
                      {s.description}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => openEdit(s)}
                          data-ocid={`services.edit_button.${i + 1}`}
                        >
                          <Pencil size={14} />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="text-destructive"
                              data-ocid={`services.delete_button.${i + 1}`}
                            >
                              <Trash2 size={14} />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent data-ocid="services.dialog">
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Delete Service?
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel data-ocid="services.cancel_button">
                                Cancel
                              </AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(s.id)}
                                className="bg-destructive text-white"
                                data-ocid="services.confirm_button"
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
        <DialogContent data-ocid="services.modal">
          <DialogHeader>
            <DialogTitle>
              {editing ? "Edit Service" : "Add Service"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <Label>Title *</Label>
              <Input
                value={form.title}
                onChange={(e) =>
                  setForm((f) => ({ ...f, title: e.target.value }))
                }
                required
                className="mt-1"
                data-ocid="services.input"
              />
            </div>
            <div>
              <Label>Description *</Label>
              <Textarea
                value={form.description}
                onChange={(e) =>
                  setForm((f) => ({ ...f, description: e.target.value }))
                }
                rows={4}
                className="mt-1"
                data-ocid="services.textarea"
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
                data-ocid="services.input"
              />
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                data-ocid="services.cancel_button"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isPending}
                className="bg-brand-blue text-white"
                data-ocid="services.save_button"
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
