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
  useContactMessages,
  useDeleteContactMessage,
} from "@/hooks/useQueries";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

function formatDate(ts: bigint) {
  const ms = Number(ts) / 1_000_000;
  return new Date(ms).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function AdminMessages() {
  const { data: messages = [], isLoading } = useContactMessages();
  const del = useDeleteContactMessage();

  const handleDelete = async (id: string) => {
    try {
      await del.mutateAsync(id);
      toast.success("Message deleted.");
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : "Delete failed. Please try again.";
      toast.error(msg);
    }
  };

  const sorted = [...messages].sort(
    (a, b) => Number(b.timestamp) - Number(a.timestamp),
  );

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-brand-navy">Contact Messages</h1>
        <p className="text-brand-muted text-sm mt-1">
          {messages.length} message{messages.length !== 1 ? "s" : ""} received
        </p>
      </div>

      <Card>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="p-6 space-y-3" data-ocid="messages.loading_state">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          ) : sorted.length === 0 ? (
            <div
              className="p-10 text-center text-brand-muted"
              data-ocid="messages.empty_state"
            >
              No messages yet. They will appear here when visitors submit the
              contact form.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table data-ocid="messages.table">
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Grade</TableHead>
                    <TableHead>Message</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sorted.map((msg, i) => (
                    <TableRow key={msg.id} data-ocid={`messages.row.${i + 1}`}>
                      <TableCell className="font-medium whitespace-nowrap">
                        {msg.name}
                      </TableCell>
                      <TableCell className="whitespace-nowrap">
                        <a
                          href={`tel:${msg.phone}`}
                          className="text-brand-blue hover:underline"
                        >
                          {msg.phone}
                        </a>
                      </TableCell>
                      <TableCell className="text-sm">{msg.subject}</TableCell>
                      <TableCell className="text-sm">{msg.grade}</TableCell>
                      <TableCell className="text-sm text-brand-muted max-w-xs truncate">
                        {msg.message}
                      </TableCell>
                      <TableCell className="whitespace-nowrap text-sm text-brand-muted">
                        {formatDate(msg.timestamp)}
                      </TableCell>
                      <TableCell className="text-right">
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="text-destructive"
                              data-ocid={`messages.delete_button.${i + 1}`}
                            >
                              <Trash2 size={14} />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent data-ocid="messages.dialog">
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Delete Message?
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel data-ocid="messages.cancel_button">
                                Cancel
                              </AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(msg.id)}
                                className="bg-destructive text-white"
                                data-ocid="messages.confirm_button"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
