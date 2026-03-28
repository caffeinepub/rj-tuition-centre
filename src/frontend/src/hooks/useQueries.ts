import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  AboutContent,
  BlogPost,
  ContactMessage,
  Faq,
  HeroContent,
  Service,
  Subject,
  Testimonial,
} from "../backend";
import { useActor } from "./useActor";

export function useHeroContent() {
  const { actor, isFetching } = useActor();
  return useQuery<HeroContent | null>({
    queryKey: ["heroContent"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getHeroContent();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSubjects() {
  const { actor, isFetching } = useActor();
  return useQuery<Subject[]>({
    queryKey: ["subjects"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllSubjects();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useServices() {
  const { actor, isFetching } = useActor();
  return useQuery<Service[]>({
    queryKey: ["services"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllServices();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useTestimonials() {
  const { actor, isFetching } = useActor();
  return useQuery<Testimonial[]>({
    queryKey: ["testimonials"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllTestimonials();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useFAQs() {
  const { actor, isFetching } = useActor();
  return useQuery<Faq[]>({
    queryKey: ["faqs"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllFAQs();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useBlogPosts() {
  const { actor, isFetching } = useActor();
  return useQuery<BlogPost[]>({
    queryKey: ["blogPosts"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllPublishedBlogPosts();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useBlogPost(slug: string) {
  const { actor, isFetching } = useActor();
  return useQuery<BlogPost | null>({
    queryKey: ["blogPost", slug],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getBlogPostBySlug(slug);
    },
    enabled: !!actor && !isFetching && !!slug,
  });
}

export function useAboutContent() {
  const { actor, isFetching } = useActor();
  return useQuery<AboutContent | null>({
    queryKey: ["aboutContent"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getAboutContent();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useDashboardStats() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["dashboardStats"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getDashboardStats();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useContactMessages() {
  const { actor, isFetching } = useActor();
  return useQuery<ContactMessage[]>({
    queryKey: ["contactMessages"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllContactMessages();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAllBlogPosts() {
  const { actor, isFetching } = useActor();
  return useQuery<BlogPost[]>({
    queryKey: ["allBlogPosts"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllPublishedBlogPosts();
    },
    enabled: !!actor && !isFetching,
  });
}

// Mutations
export function useSubmitContactMessage() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async (message: ContactMessage) => {
      if (!actor) throw new Error("Not connected");
      return actor.submitContactMessage(message);
    },
  });
}

export function useUpdateHeroContent() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (content: HeroContent) => {
      if (!actor) throw new Error("Not connected");
      return actor.updateHeroContent(content);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["heroContent"] }),
  });
}

export function useAddSubject() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (subject: Subject) => {
      if (!actor) throw new Error("Not connected");
      return actor.addSubject(subject);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["subjects"] }),
  });
}

export function useUpdateSubject() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (subject: Subject) => {
      if (!actor) throw new Error("Not connected");
      return actor.updateSubject(subject);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["subjects"] }),
  });
}

export function useDeleteSubject() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error("Not connected");
      return actor.deleteSubject(id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["subjects"] }),
  });
}

export function useAddService() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (service: Service) => {
      if (!actor) throw new Error("Not connected");
      return actor.addService(service);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["services"] }),
  });
}

export function useUpdateService() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (service: Service) => {
      if (!actor) throw new Error("Not connected");
      return actor.updateService(service);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["services"] }),
  });
}

export function useDeleteService() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error("Not connected");
      return actor.deleteService(id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["services"] }),
  });
}

export function useAddTestimonial() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (t: Testimonial) => {
      if (!actor) throw new Error("Not connected");
      return actor.addTestimonial(t);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["testimonials"] }),
  });
}

export function useUpdateTestimonial() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (t: Testimonial) => {
      if (!actor) throw new Error("Not connected");
      return actor.updateTestimonial(t);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["testimonials"] }),
  });
}

export function useDeleteTestimonial() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error("Not connected");
      return actor.deleteTestimonial(id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["testimonials"] }),
  });
}

export function useAddFAQ() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (faq: Faq) => {
      if (!actor) throw new Error("Not connected");
      return actor.addFAQ(faq);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["faqs"] }),
  });
}

export function useUpdateFAQ() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (faq: Faq) => {
      if (!actor) throw new Error("Not connected");
      return actor.updateFAQ(faq);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["faqs"] }),
  });
}

export function useDeleteFAQ() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error("Not connected");
      return actor.deleteFAQ(id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["faqs"] }),
  });
}

export function useAddBlogPost() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (post: BlogPost) => {
      if (!actor) throw new Error("Not connected");
      return actor.addBlogPost(post);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["blogPosts"] }),
  });
}

export function useUpdateBlogPost() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (post: BlogPost) => {
      if (!actor) throw new Error("Not connected");
      return actor.updateBlogPost(post);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["blogPosts"] }),
  });
}

export function useDeleteBlogPost() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error("Not connected");
      return actor.deleteBlogPost(id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["blogPosts"] }),
  });
}

export function useUpdateAboutContent() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (content: AboutContent) => {
      if (!actor) throw new Error("Not connected");
      return actor.updateAboutContent(content);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["aboutContent"] }),
  });
}

export function useDeleteContactMessage() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error("Not connected");
      return actor.deleteContactMessage(id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["contactMessages"] }),
  });
}
