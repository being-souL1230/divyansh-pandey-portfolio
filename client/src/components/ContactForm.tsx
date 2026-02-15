import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useContactMutation } from "@/hooks/use-data-analyst";
import { Send } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormValues = z.infer<typeof formSchema>;

export function ContactForm() {
  const mutation = useContactMutation();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  function onSubmit(data: FormValues) {
    mutation.mutate(data, {
      onSuccess: () => {
        form.reset();
      },
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">Name</FormLabel>
                <FormControl>
                  <Input className="h-9 rounded-lg bg-background/35" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">Email</FormLabel>
                <FormControl>
                  <Input className="h-9 rounded-lg bg-background/35" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">Message</FormLabel>
              <FormControl>
                <Textarea 
                  className="min-h-[116px] rounded-lg bg-background/35" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button 
          type="submit" 
          className="h-8 w-auto gap-1 rounded-md border border-border/60 bg-transparent px-2.5 text-xs font-semibold"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? (
            "Sending..."
          ) : (
            <>
              Send <Send className="h-3.5 w-3.5" />
            </>
          )}
        </Button>
      </form>
    </Form>
  );
}
