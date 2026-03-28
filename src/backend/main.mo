import Text "mo:core/Text";
import Array "mo:core/Array";
import List "mo:core/List";
import Order "mo:core/Order";
import Int "mo:core/Int";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import Iter "mo:core/Iter";
import Runtime "mo:core/Runtime";
import Map "mo:core/Map";

import Storage "blob-storage/Storage";
import MixinStorage "blob-storage/Mixin";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  type UserId = Text;
  type Timestamp = Int;

  module Subject {
    public func compare(subject1 : Subject, subject2 : Subject) : Order.Order {
      subject1.id.compare(subject2.id);
    };
  };

  module Service {
    public func compare(service1 : Service, service2 : Service) : Order.Order {
      service1.id.compare(service2.id);
    };
  };

  module Testimonial {
    public func compare(testimonial1 : Testimonial, testimonial2 : Testimonial) : Order.Order {
      testimonial1.id.compare(testimonial2.id);
    };
  };

  module Faq {
    public func compare(faq1 : Faq, faq2 : Faq) : Order.Order {
      faq1.id.compare(faq2.id);
    };
  };

  module BlogPost {
    public func compare(blogPost1 : BlogPost, blogPost2 : BlogPost) : Order.Order {
      blogPost1.id.compare(blogPost2.id);
    };
  };

  module ContactMessage {
    public func compare(contactMessage1 : ContactMessage, contactMessage2 : ContactMessage) : Order.Order {
      contactMessage1.id.compare(contactMessage2.id);
    };
  };

  public type UserProfile = {
    name : Text;
  };

  type HeroContent = {
    headline : Text;
    subheading : Text;
    ctaButtonText : Text;
    ctaButtonLink : Text;
  };

  type Subject = {
    id : Text;
    name : Text;
    gradeRange : Text;
    iconName : Text;
    description : Text;
  };

  type Service = {
    id : Text;
    title : Text;
    description : Text;
    imageUrl : Text;
    order : Nat;
  };

  type Testimonial = {
    id : Text;
    studentName : Text;
    role : Text;
    photoUrl : Text;
    rating : Nat;
    reviewText : Text;
  };

  type Faq = {
    id : Text;
    question : Text;
    answer : Text;
    order : Nat;
  };

  type BlogPost = {
    id : Text;
    title : Text;
    content : Text;
    excerpt : Text;
    imageUrl : Text;
    slug : Text;
    publishDate : Timestamp;
    tags : [Text];
    published : Bool;
  };

  type AboutContent = {
    introduction : Text;
    qualifications : Text;
    experience : Text;
    teachingPhilosophy : Text;
    achievements : Text;
  };

  type ContactMessage = {
    id : Text;
    name : Text;
    phone : Text;
    subject : Text;
    grade : Text;
    message : Text;
    timestamp : Timestamp;
  };

  type DashboardStats = {
    totalSubjects : Nat;
    totalServices : Nat;
    totalTestimonials : Nat;
    totalFAQs : Nat;
    totalBlogPosts : Nat;
    totalContactMessages : Nat;
  };

  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);
  include MixinStorage();

  // User profiles
  let userProfiles = Map.empty<Principal, UserProfile>();

  // Hero content
  let heroContent = Map.empty<UserId, HeroContent>();

  // About content
  let aboutContent = Map.empty<UserId, AboutContent>();

  // Subjects
  let subjects = List.empty<Subject>();

  // Services
  let services = List.empty<Service>();

  // Testimonials
  let testimonials = List.empty<Testimonial>();

  // FAQs
  let faqs = List.empty<Faq>();

  // Blog posts
  let blogPosts = List.empty<BlogPost>();

  // Contact messages
  let contactMessages = List.empty<ContactMessage>();

  // User profile functions
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Public content queries
  public query func getHeroContent() : async ?HeroContent {
    heroContent.get("hero");
  };

  public query func getAboutContent() : async ?AboutContent {
    aboutContent.get("about");
  };

  public query func getAllSubjects() : async [Subject] {
    subjects.toArray().sort();
  };

  public query func getAllServices() : async [Service] {
    services.toArray().sort();
  };

  public query func getAllTestimonials() : async [Testimonial] {
    testimonials.toArray().sort();
  };

  public query func getAllFAQs() : async [Faq] {
    faqs.toArray().sort();
  };

  public query func getAllPublishedBlogPosts() : async [BlogPost] {
    let published = blogPosts.toArray().filter(
      func(post) {
        post.published;
      }
    );
    published.sort();
  };

  public query func getBlogPostBySlug(slug : Text) : async ?BlogPost {
    blogPosts.find(
      func(post) {
        post.slug == slug;
      }
    );
  };

  // Contact message submission (public, no auth required)
  public shared func submitContactMessage(message : ContactMessage) : async () {
    let timestamp = Time.now();
    let newMessage : ContactMessage = {
      message with timestamp;
    };
    contactMessages.add(newMessage);
  };

  // Admin functions
  public query ({ caller }) func getAllContactMessages() : async [ContactMessage] {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can view contact messages");
    };
    contactMessages.toArray().sort();
  };

  public shared ({ caller }) func deleteContactMessage(id : Text) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can delete contact messages");
    };
    let filtered = contactMessages.toArray().filter(
      func(message) {
        message.id != id;
      }
    );
    contactMessages.clear();
    contactMessages.addAll(filtered.values());
  };

  public shared ({ caller }) func updateHeroContent(content : HeroContent) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can update hero content");
    };
    heroContent.add("hero", content);
  };

  public shared ({ caller }) func updateAboutContent(content : AboutContent) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can update about content");
    };
    aboutContent.add("about", content);
  };

  public shared ({ caller }) func addSubject(subject : Subject) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can add subjects");
    };
    subjects.add(subject);
  };

  public shared ({ caller }) func addService(service : Service) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can add services");
    };
    services.add(service);
  };

  public shared ({ caller }) func addTestimonial(testimonial : Testimonial) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can add testimonials");
    };
    testimonials.add(testimonial);
  };

  public shared ({ caller }) func addFAQ(faq : Faq) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can add FAQs");
    };
    faqs.add(faq);
  };

  public shared ({ caller }) func addBlogPost(post : BlogPost) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can add blog posts");
    };
    blogPosts.add(post);
  };

  public shared ({ caller }) func updateSubject(subject : Subject) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can update subjects");
    };
    let filtered = subjects.toArray().filter(
      func(s) {
        s.id != subject.id;
      }
    );
    subjects.clear();
    subjects.addAll(filtered.values());
    subjects.add(subject);
  };

  public shared ({ caller }) func updateService(service : Service) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can update services");
    };
    let filtered = services.toArray().filter(
      func(s) {
        s.id != service.id;
      }
    );
    services.clear();
    services.addAll(filtered.values());
    services.add(service);
  };

  public shared ({ caller }) func updateTestimonial(testimonial : Testimonial) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can update testimonials");
    };
    let filtered = testimonials.toArray().filter(
      func(t) {
        t.id != testimonial.id;
      }
    );
    testimonials.clear();
    testimonials.addAll(filtered.values());
    testimonials.add(testimonial);
  };

  public shared ({ caller }) func updateFAQ(faq : Faq) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can update FAQs");
    };
    let filtered = faqs.toArray().filter(
      func(f) {
        f.id != faq.id;
      }
    );
    faqs.clear();
    faqs.addAll(filtered.values());
    faqs.add(faq);
  };

  public shared ({ caller }) func updateBlogPost(post : BlogPost) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can update blog posts");
    };
    let filtered = blogPosts.toArray().filter(
      func(p) {
        p.id != post.id;
      }
    );
    blogPosts.clear();
    blogPosts.addAll(filtered.values());
    blogPosts.add(post);
  };

  public shared ({ caller }) func deleteSubject(id : Text) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can delete subjects");
    };
    let filtered = subjects.toArray().filter(
      func(subject) {
        subject.id != id;
      }
    );
    subjects.clear();
    subjects.addAll(filtered.values());
  };

  public shared ({ caller }) func deleteService(id : Text) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can delete services");
    };
    let filtered = services.toArray().filter(
      func(service) {
        service.id != id;
      }
    );
    services.clear();
    services.addAll(filtered.values());
  };

  public shared ({ caller }) func deleteTestimonial(id : Text) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can delete testimonials");
    };
    let filtered = testimonials.toArray().filter(
      func(testimonial) {
        testimonial.id != id;
      }
    );
    testimonials.clear();
    testimonials.addAll(filtered.values());
  };

  public shared ({ caller }) func deleteFAQ(id : Text) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can delete FAQs");
    };
    let filtered = faqs.toArray().filter(
      func(faq) {
        faq.id != id;
      }
    );
    faqs.clear();
    faqs.addAll(filtered.values());
  };

  public shared ({ caller }) func deleteBlogPost(id : Text) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can delete blog posts");
    };
    let filtered = blogPosts.toArray().filter(
      func(post) {
        post.id != id;
      }
    );
    blogPosts.clear();
    blogPosts.addAll(filtered.values());
  };

  public query ({ caller }) func getDashboardStats() : async DashboardStats {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can view dashboard stats");
    };
    {
      totalSubjects = subjects.size();
      totalServices = services.size();
      totalTestimonials = testimonials.size();
      totalFAQs = faqs.size();
      totalBlogPosts = blogPosts.size();
      totalContactMessages = contactMessages.size();
    };
  };
};
