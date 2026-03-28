# RJ Tuition Centre

## Current State
- Full website with 7 public pages and admin panel
- Admin panel has CRUD for Hero, Subjects, Services, Testimonials, FAQs, Blog, About, Contact Messages, Site Settings
- Auth uses localStorage (persistent across sessions) with hardcoded credentials (rjkyadmin / rjkytuitioadmin)
- Home.tsx has Admin Panel button in CTA section after WhatsApp Us
- Header shows logo image + text (RJ Tuition / Centre, Thanjavur)
- Favicon uses previous logo file
- Class timings hardcoded as '6 AM – 9 PM' in Home.tsx
- CRUD pages have inadequate error handling causing confusing UX when operations fail
- Admin sidebar and login page use old logo

## Requested Changes (Diff)

### Add
- Editable admin credentials section in AdminSiteSettings (username + password fields, saved to localStorage)
- Class Timings section in AdminSiteSettings: preset options (6 AM–6 PM, 6 AM–9 PM) + custom time input; saved to localStorage key `rj_class_timings`
- Shared timing utility `src/utils/siteSettings.ts` to read/write timings from localStorage
- New logo file as favicon: `/assets/uploads/chatgpt_image_mar_28_2026_02_44_51_pm-019d359b-f6bb-71e8-a000-d229f1831532-1.png`

### Modify
- **lib/auth.ts**: Change session storage from `localStorage` to `sessionStorage` (login required at every browser session). Add `getAdminCredentials()` and `setAdminCredentials()` reading from localStorage key `rj_admin_creds`. `adminLogin()` checks against stored or default credentials.
- **Home.tsx CTA section**: Remove the Admin Panel Link button after WhatsApp Us. Update 'Flexible Timings' WHY_CHOOSE card description to read from localStorage timing (via `getClassTimings()` utility)
- **Header.tsx**: Remove the text div ('RJ Tuition' / 'Centre, Thanjavur') next to the logo image. Show only the logo image.
- **AdminLayout.tsx sidebar**: Update logo src to new file; Remove text div next to logo.
- **AdminLogin.tsx**: Update logo src to new file.
- **index.html**: Update favicon href to new logo file.
- **AdminSiteSettings.tsx**: Add 'Admin Credentials' card at top with username/password fields + save button. Add 'Class Timings' card with radio preset options and custom time text input. On save, store to localStorage and show success toast.
- **All admin CRUD pages**: Add isError state handling with error message + retry button. Fix loading skeletons to show after actor is ready. Add specific error messages when mutations fail (e.g. 'Save failed – check connection and try again').

### Remove
- Admin Panel Link button in Home.tsx CTA section (the `<Link to='/admin'>` with Lock icon after WhatsApp Us)
- Text next to logo in Header.tsx
- Text next to logo in AdminLayout.tsx sidebar

## Implementation Plan
1. Create `src/frontend/src/utils/siteSettings.ts` with `getClassTimings()`, `setClassTimings()`, `getAdminCredentials()`, `setAdminCredentials()`
2. Update `lib/auth.ts` to use sessionStorage for auth state; use stored credentials
3. Update `index.html` favicon
4. Update `Header.tsx` – logo only, no text
5. Update `AdminLayout.tsx` – new logo, no text in sidebar
6. Update `AdminLogin.tsx` – new logo src
7. Update `Home.tsx` – remove admin button, use dynamic timing
8. Update `AdminSiteSettings.tsx` – add credentials and timings sections
9. Fix error handling in all admin CRUD pages (AdminSubjects, AdminServices, AdminTestimonials, AdminFAQs, AdminBlog, AdminAbout, AdminMessages, AdminDashboard, AdminHero)
