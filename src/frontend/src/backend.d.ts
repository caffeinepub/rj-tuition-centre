import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface BlogPost {
    id: string;
    title: string;
    content: string;
    publishDate: Timestamp;
    published: boolean;
    slug: string;
    tags: Array<string>;
    imageUrl: string;
    excerpt: string;
}
export interface Testimonial {
    id: string;
    studentName: string;
    role: string;
    photoUrl: string;
    reviewText: string;
    rating: bigint;
}
export type Timestamp = bigint;
export interface AboutContent {
    qualifications: string;
    experience: string;
    achievements: string;
    introduction: string;
    teachingPhilosophy: string;
}
export interface Service {
    id: string;
    title: string;
    order: bigint;
    description: string;
    imageUrl: string;
}
export interface HeroContent {
    subheading: string;
    ctaButtonLink: string;
    ctaButtonText: string;
    headline: string;
}
export interface DashboardStats {
    totalServices: bigint;
    totalBlogPosts: bigint;
    totalFAQs: bigint;
    totalSubjects: bigint;
    totalContactMessages: bigint;
    totalTestimonials: bigint;
}
export interface Faq {
    id: string;
    question: string;
    order: bigint;
    answer: string;
}
export interface ContactMessage {
    id: string;
    subject: string;
    name: string;
    grade: string;
    message: string;
    timestamp: Timestamp;
    phone: string;
}
export interface Subject {
    id: string;
    gradeRange: string;
    name: string;
    description: string;
    iconName: string;
}
export interface UserProfile {
    name: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addBlogPost(post: BlogPost): Promise<void>;
    addFAQ(faq: Faq): Promise<void>;
    addService(service: Service): Promise<void>;
    addSubject(subject: Subject): Promise<void>;
    addTestimonial(testimonial: Testimonial): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    deleteBlogPost(id: string): Promise<void>;
    deleteContactMessage(id: string): Promise<void>;
    deleteFAQ(id: string): Promise<void>;
    deleteService(id: string): Promise<void>;
    deleteSubject(id: string): Promise<void>;
    deleteTestimonial(id: string): Promise<void>;
    getAboutContent(): Promise<AboutContent | null>;
    getAllContactMessages(): Promise<Array<ContactMessage>>;
    getAllFAQs(): Promise<Array<Faq>>;
    getAllPublishedBlogPosts(): Promise<Array<BlogPost>>;
    getAllServices(): Promise<Array<Service>>;
    getAllSubjects(): Promise<Array<Subject>>;
    getAllTestimonials(): Promise<Array<Testimonial>>;
    getBlogPostBySlug(slug: string): Promise<BlogPost | null>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getDashboardStats(): Promise<DashboardStats>;
    getHeroContent(): Promise<HeroContent | null>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    submitContactMessage(message: ContactMessage): Promise<void>;
    updateAboutContent(content: AboutContent): Promise<void>;
    updateBlogPost(post: BlogPost): Promise<void>;
    updateFAQ(faq: Faq): Promise<void>;
    updateHeroContent(content: HeroContent): Promise<void>;
    updateService(service: Service): Promise<void>;
    updateSubject(subject: Subject): Promise<void>;
    updateTestimonial(testimonial: Testimonial): Promise<void>;
}
