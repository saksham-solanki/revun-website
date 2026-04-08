# Revun Website: Full Context Handoff

> **From:** Saksham Solanki  
> **To:** Jatin Chhabra  
> **Date:** April 8, 2026  
> **Live URL:** https://revun-website.vercel.app/  
> **GitHub:** https://github.com/saksham-solanki/revun-website  
> **Branch:** `main` (single branch, no feature branches)

---

## 1. What is Revun?

Revun is a **Canadian-native property management platform** targeting landlords, property managers, and tenants across Canada and the US. It fills a gap in the Canadian PropTech market where US-built platforms (AppFolio, Buildium, Yardi) dominate but lack provincial compliance.

**Unique positioning:**
- Only platform combining rent guarantee + full PM operations + franchise model + cross-border coverage
- Canadian-first: understands LTB (Landlord and Tenant Board), RTA (Residential Tenancies Act), provincial regulations
- IPO-ready infrastructure positioning, not a startup vibe

**Target audiences:**
- Self-managing property owners
- Property management companies
- Brokerages, leasing companies, maintenance companies
- REITs and investors
- Tenants

**App features (from Figma screens, not yet built into web):**
- Property browse (TikTok-style feed), Tour booking, Reservation/Offers (8-step flow)
- Investments dashboard, Wallet (Venmo-style), Maintenance (AI-first)
- Verification/KYC, Chat with voice/video, Events
- Roommates (Tinder-style matching), My Stays, Wishlist, Document Vault

---

## 2. Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Next.js | 16.2.2 |
| Runtime | React | 19.2.4 |
| Styling | Tailwind CSS | v4 |
| Animation | Framer Motion | 12.38.0 |
| CMS | Sanity | v5 (next-sanity 12.2.1) |
| UI Primitives | shadcn/ui + @base-ui/react | latest |
| Forms | react-hook-form + zod | v7 / v4 |
| Number Animation | @number-flow/react | 0.6.0 |
| Class Variants | class-variance-authority (CVA) | 0.7.1 |
| Icons | lucide-react | 1.7.0 |
| Analytics | Google Tag Manager (@next/third-parties) | 16.2.2 |
| Deployment | Vercel | Production |
| Node.js | v24.14.0 | Required |
| Package Manager | npm | v11.9.0 |

**Important:** This uses Next.js 16.2.2, which has breaking changes from older versions. Always read `node_modules/next/dist/docs/` before making changes to Next.js-specific APIs.

---

## 3. Getting Started

```bash
# Clone the repo
git clone https://github.com/saksham-solanki/revun-website.git
cd revun-website

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local
# Fill in the Sanity project ID (ask Saksham for credentials)

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start
```

### Environment Variables

Copy `.env.example` to `.env.local` and fill in:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=       # Required - ask Saksham
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=               # Required for draft content
SANITY_API_WRITE_TOKEN=              # Required for mutations
SANITY_WEBHOOK_SECRET=               # For revalidation webhooks
NEXT_PUBLIC_SITE_URL=https://revun.com
NEXT_PUBLIC_GTM_ID=                  # Google Tag Manager
NEXT_PUBLIC_GSC_VERIFICATION=        # Google Search Console
NEXT_PUBLIC_BING_VERIFICATION=       # Bing Webmaster
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=      # reCAPTCHA v3
RECAPTCHA_SECRET_KEY=                # reCAPTCHA server key
NEXT_PUBLIC_SALESIQ_WIDGET_CODE=     # Zoho SalesIQ (optional)
```

**Note:** The site builds and runs without Sanity credentials. All page content is currently hardcoded as static data. Sanity schemas are defined but content has NOT been populated in the CMS yet.

---

## 4. Project Structure

```
revun-website/
+-- src/
|   +-- app/
|   |   +-- globals.css              # Brand design system (all tokens)
|   |   +-- layout.tsx               # Root layout (fonts, metadata, GTM, JSON-LD)
|   |   +-- (site)/
|   |       +-- layout.tsx           # Site layout (Header + Footer wrapper)
|   |       +-- page.tsx             # Homepage
|   |       +-- about/page.tsx
|   |       +-- ca/                  # Canada geographic pages
|   |       |   +-- page.tsx         # Canada hub
|   |       |   +-- [province]/
|   |       |       +-- page.tsx     # Province pages (Ontario, BC, etc.)
|   |       |       +-- [city]/page.tsx  # City pages (Toronto, Vancouver, etc.)
|   |       +-- compare/
|   |       |   +-- page.tsx         # Competitor comparison hub
|   |       |   +-- [competitor]/    # vs SingleKey, Buildium, AppFolio, etc.
|   |       +-- contact/page.tsx
|   |       +-- help/page.tsx
|   |       +-- integrations/
|   |       |   +-- page.tsx         # Integration directory
|   |       |   +-- [slug]/page.tsx  # Individual integration pages
|   |       +-- platform/page.tsx
|   |       +-- pricing/page.tsx
|   |       +-- privacy/page.tsx
|   |       +-- resources/page.tsx
|   |       +-- self-manage/
|   |       |   +-- page.tsx
|   |       |   +-- how-it-works/page.tsx
|   |       +-- solutions/
|   |       |   +-- page.tsx         # Solutions hub
|   |       |   +-- [audience]/      # Per-audience pages
|   |       +-- support/page.tsx
|   |       +-- terms/page.tsx
|   |       +-- us/page.tsx          # US market hub
|   +-- components/
|   |   +-- blocks/                  # Page section components
|   |   |   +-- about-hero.tsx
|   |   |   +-- audience-router.tsx  # Persona routing cards
|   |   |   +-- contact-form.tsx
|   |   |   +-- cta-section.tsx      # Dark navy CTA section
|   |   |   +-- dashboard-proof.tsx  # Animated dashboard mockup
|   |   |   +-- feature-showcase.tsx # Bento grid features
|   |   |   +-- hero-section.tsx     # Homepage hero
|   |   |   +-- homepage-faq.tsx
|   |   |   +-- integration-logos.tsx # Grayscale marquee
|   |   |   +-- platform-hero.tsx
|   |   |   +-- pricing-faq.tsx
|   |   |   +-- pricing-tabs.tsx     # Pricing with NumberFlow animation
|   |   |   +-- stats-section.tsx    # Animated stats counters
|   |   |   +-- testimonials.tsx
|   |   +-- layout/
|   |   |   +-- header.tsx           # Sticky header with scroll shadow
|   |   |   +-- footer.tsx           # 5-column footer with newsletter
|   |   |   +-- mobile-menu.tsx      # Sheet-based mobile nav
|   |   +-- tracking/
|   |   |   +-- gtm-events.tsx       # GTM event tracking utilities
|   |   +-- ui/                      # shadcn primitives + custom UI
|   |       +-- accordion.tsx, badge.tsx, button.tsx, card.tsx, etc.
|   |       +-- reveal-on-scroll.tsx # IntersectionObserver scroll reveal
|   |       +-- rotating-badge.tsx   # Spring-animated rotating text badge
|   |       +-- score-ring.tsx       # SVG circular score gauge
|   |       +-- sparkline.tsx        # SVG sparkline chart with gradient
|   +-- hooks/
|   |   +-- use-counter.ts           # requestAnimationFrame counter hook
|   +-- lib/
|   |   +-- analytics.ts            # Analytics event helpers
|   |   +-- metadata.ts             # SEO metadata generators
|   |   +-- schema-builders/index.ts # JSON-LD structured data builders
|   |   +-- utils.ts                # cn() helper, sanitizeJsonLd, etc.
|   +-- sanity/
|       +-- client.ts               # Sanity client configuration
|       +-- fetch.ts                # Sanity fetch helpers
|       +-- objects/                # Shared Sanity object types
|       |   +-- portable-text.ts
|       |   +-- publishing-controls.ts
|       |   +-- seo-fields.ts
|       +-- schemas/                # 13 document types
|       |   +-- audience-track.ts, blog-post.ts, city.ts
|       |   +-- comparison-page.ts, competitor.ts
|       |   +-- help-article.ts, industry-page.ts
|       |   +-- integration.ts, integration-category.ts
|       |   +-- pricing-package.ts, province.ts
|       |   +-- solution.ts, use-case-page.ts
|       +-- sanity.config.ts
+-- public/
|   +-- logo-dark.svg               # Dark background logo variant
|   +-- logo-white.svg              # Light background logo variant
|   +-- revun-logo-blue-bg.png      # Blue background logo
|   +-- images/                     # Static images
+-- next.config.ts                  # trailingSlash: true, Sanity image CDN
+-- vercel.json                     # { "framework": "nextjs" }
+-- CLAUDE.md                       # Points to AGENTS.md
+-- AGENTS.md                       # Next.js 16 breaking changes warning
+-- .env.example                    # All required env vars
```

---

## 5. Brand Design System

This is the most critical section. Every visual decision follows this system.

### Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `--brand-blue` | `#176FEB` | **THE primary brand color.** Links, CTAs, highlights, active states |
| `--brand-blue-dark` | `#0B5AD4` | Hover states, gradients |
| `--brand-blue-light` | `#4A91F0` | Light mode accents, dark mode primary |
| `--brand-blue-tint` | `#E8F2FE` | Blue-tinted backgrounds, badges |
| `--brand-navy` | `#0A1628` | Dark backgrounds (CTA sections, hero variants) |
| `--brand-navy-mid` | `#0F2040` | Dark mode cards, secondary dark surfaces |
| `--brand-navy-app` | `#001D3D` | App-specific navy |
| `--brand-graphite` | `#2C2E33` | Body text |
| `--brand-graphite-mid` | `#555860` | Secondary/muted text |
| `--brand-graphite-light` | `#D3D5DB` | Borders, dividers |
| `--brand-off-white` | `#F5F6F8` | Section backgrounds |
| `--brand-cta-blue` | `#005CE8` | CTA-specific blue |
| `--brand-error` | `#E7000B` | Error states |
| `--brand-success` | `#5EA500` | Success states |

**Rule:** Blue is the ONLY expressive color. No purple, violet, amber, teal, or multi-color palettes. Monochromatic blue + navy + gray.

### Typography

| Role | Font | Tailwind Class | Usage |
|------|------|---------------|-------|
| Display | Instrument Serif | `font-display` | Hero headlines, large display text |
| Heading | Outfit (300-800) | `font-heading` | Section headings, card titles, bold UI text |
| Body | Inter | `font-sans` | Paragraphs, navigation, form labels, general text |
| Mono | Geist Mono | `font-mono` | Code blocks, technical data |

All fonts are loaded via `next/font/google` in `src/app/layout.tsx` with CSS variables.

### Design Rules (MUST follow)

1. **Borders over shadows** on cards. Use `border border-gray-200` not `shadow-md`. Exception: hover states can use `shadow-editorial` or `shadow-card-hover`.
2. **Blue keyword** in every section title. One word in each heading gets `className="text-accent"` (renders as `#176FEB`).
3. **10px fade-up animations**, not 30px. Use the `animate-fade-up` class or `RevealOnScroll` component.
4. **75-150ms hover transitions** only. No slow 300ms+ animations.
5. **Section spacing:** `py-20` to `py-32` (80-128px vertical padding).
6. **Max content width:** `max-w-7xl` (1280px) for layouts, `max-w-3xl` (768px) for text-heavy sections.
7. **trailingSlash: true** in Next.js config. All internal links must end with `/`.

### Banned Elements

- Violet/purple/indigo colors of any kind
- Gradient cards, glassmorphism panels
- Box shadows for card elevation (borders only)
- House icons, rooflines, generic real estate imagery
- Stock photography or AI-generated illustrations
- Generic SaaS template heroes (text-left, screenshot-right)
- Animated counters that tick from zero (use static numbers or subtle reveals)
- More than 2 CTAs per section

### Shadow System (globals.css)

```css
.shadow-editorial    /* Subtle 2-layer shadow for header scroll, cards on hover */
.shadow-card-hover   /* 4-layer progressive shadow for interactive cards */
.shadow-cta-glow     /* Blue glow for primary CTA buttons */
.shadow-device       /* Device/browser mockup shadow */
```

### Animation System

**CSS keyframes** (in globals.css):
- `fade-up`, `fade-in`, `slide-in-right`, `slide-in-left`, `scale-in` (entry animations)
- `marquee` (28s loop for logo carousel)
- `bar-rise`, `dash-flow`, `soft-ping`, `float-y` (data visualization animations)

**Utility classes:** `animate-fade-up`, `animate-marquee`, etc. with `delay-75` through `delay-700`.

**Framer Motion:** Used for complex animations in `pricing-tabs.tsx` (NumberFlow), `rotating-badge.tsx` (spring physics), `hero-section.tsx`, and `reveal-on-scroll.tsx`.

**RevealOnScroll component** (`src/components/ui/reveal-on-scroll.tsx`): IntersectionObserver-based scroll reveal. Wraps any element to fade it in when it enters the viewport.

### Grid Backgrounds

```css
.bg-grid      /* Light grid (used in hero section) */
.bg-grid-mask /* Radial mask to fade grid edges */
.bg-grid-dark /* Dark mode grid variant */
```

The body also has a fixed ambient dot grid (`body::before` in globals.css) using radial gradient dots at 24px spacing.

---

## 6. Pages and Routes

The site uses Next.js App Router with a `(site)` route group that wraps all pages in Header + Footer.

### Static Pages (22 routes)

| Route | Page | Status |
|-------|------|--------|
| `/` | Homepage | Complete |
| `/about/` | About Revun | Complete |
| `/platform/` | Platform features | Complete |
| `/pricing/` | Pricing tiers | Complete |
| `/contact/` | Contact form | Complete |
| `/compare/` | Competitor comparison hub | Complete |
| `/compare/[competitor]/` | vs SingleKey, Buildium, AppFolio, Propertyware, liv.rent, Rhenti, FrontLobby | Complete |
| `/solutions/` | Solutions hub | Complete |
| `/solutions/[audience]/` | Per-audience pages (6 audiences) | Complete |
| `/integrations/` | Integration directory | Complete |
| `/integrations/[slug]/` | Individual integrations (12) | Complete |
| `/ca/` | Canada hub | Complete |
| `/ca/[province]/` | Province pages (Ontario, BC, Alberta, etc.) | Complete |
| `/ca/[province]/[city]/` | City pages (Toronto, Vancouver, Calgary, etc.) | Complete |
| `/us/` | US market hub | Complete |
| `/self-manage/` | Self-managing owners | Complete |
| `/self-manage/how-it-works/` | How it works flow | Complete |
| `/resources/` | Resources hub | Complete (placeholder content) |
| `/help/` | FAQ/Help center | Complete |
| `/support/` | Support contact | Complete |
| `/privacy/` | Privacy policy | Complete |
| `/terms/` | Terms of service | Complete |

### Dynamic Route Data

All dynamic routes (`[competitor]`, `[audience]`, `[slug]`, `[province]`, `[city]`) use `generateStaticParams()` with hardcoded static data arrays inside each page file. Content is NOT fetched from Sanity CMS. This means:

- To add a new competitor comparison: edit `src/app/(site)/compare/[competitor]/page.tsx` and add to the data array
- To add a new city: edit `src/app/(site)/ca/[province]/[city]/page.tsx` and add to the data array
- The Sanity schemas exist for future migration but are not connected to the pages

---

## 7. Component Architecture

### Homepage Flow (top to bottom)

1. **HeroSection** - Atmospheric hero with Instrument Serif headline, CSS grid background, dual CTA, trust badges
2. **AudienceRouter** - 3 persona cards (Owners, Managers, Tenants) with animated icons
3. **FeatureShowcase** - Bento grid of 6 core features with hover effects
4. **DashboardProof** - Animated dashboard mockup with bar charts, sparklines, score rings
5. **StatsSection** - 4 animated stat counters (units, provinces, uptime, integrations)
6. **Testimonials** - Customer testimonial cards with star ratings
7. **IntegrationLogos** - Grayscale logo marquee with hover-to-color effect, edge fade
8. **HomepageFAQ** - Accordion FAQ section
9. **CTASection** - Dark navy CTA with email capture

### Header Behavior

- Sticky, 64px height
- Transparent on page load, solid white + `shadow-editorial` on scroll
- Dark text variant for light-background pages (pricing, compare, integrations)
- Logo: `logo-dark.svg` by default, `logo-white.svg` for dark hero pages
- Mobile: Sheet-based slide-out menu via `mobile-menu.tsx`
- Nav: Platform, Solutions (mega-menu), Pricing, Compare, Resources, Contact

### Footer Structure

- 5-column grid: Platform, Solutions, Resources, Company, Legal
- Newsletter subscription input with send icon
- Social links row
- All internal hrefs have trailing slashes

### Custom UI Components

| Component | What it does |
|-----------|-------------|
| `reveal-on-scroll.tsx` | IntersectionObserver wrapper, triggers fade-up animation on viewport entry |
| `rotating-badge.tsx` | Spring-animated text badge that cycles through phrases (used in hero) |
| `score-ring.tsx` | SVG circular gauge with animated strokeDasharray |
| `sparkline.tsx` | SVG polyline chart with gradient fill, uses `useId()` for SSR-safe gradient IDs |
| `use-counter.ts` | requestAnimationFrame-based number counter hook |

---

## 8. Sanity CMS Setup

### Schemas Defined (13 document types + 3 object types)

**Documents:** audienceTrack, solution, pricingPackage, competitor, comparisonPage, integration, integrationCategory, industryPage, useCasePage, province, city, helpArticle, blogPost

**Objects:** seoFields, publishingControls, portableContent (Portable Text)

### Current State

- Schemas are defined in `src/sanity/schemas/`
- Sanity client is configured in `src/sanity/client.ts`
- **Content is NOT populated.** All page data is hardcoded in page files.
- No GROQ queries are actively used in page components.
- Future work: migrate hardcoded data to Sanity, write GROQ queries, enable ISR/revalidation.

---

## 9. SEO Infrastructure

### Metadata

- Root metadata in `src/app/layout.tsx` with title template, OG tags, Twitter cards
- `src/lib/metadata.ts` has helper functions for generating page-specific metadata
- Canonical URLs, hreflang tags (en-CA, en-US, x-default) configured
- Missing: `og-default.png` image is referenced but may not exist yet

### Structured Data (JSON-LD)

- `src/lib/schema-builders/index.ts` has builders for:
  - Organization schema (site-wide, in root layout)
  - FAQPage schema (help page, comparison pages)
  - LocalBusiness schema (city pages)
  - BreadcrumbList schema
  - Article schema (comparison detail pages)

### Next.js Config

```typescript
// next.config.ts
trailingSlash: true          // All URLs end with /
images.formats: ['image/avif', 'image/webp']
images.remotePatterns: cdn.sanity.io
```

---

## 10. Deployment

### Vercel

- **Project:** `saksham-solankis-projects-4801dab7/revun-website`
- **URL:** https://revun-website.vercel.app/
- **Domain:** revun.com (configured but DNS may need verification)
- **Framework:** Next.js (set in `vercel.json`)
- **Branch:** `main` auto-deploys

### How to Deploy

Push to `main` branch. Vercel auto-builds and deploys.

```bash
git add .
git commit -m "your commit message"
git push origin main
```

Build will run `next build`. Current build passes with 0 TypeScript errors.

---

## 11. Git History and What Was Built

All work was done on April 6-8, 2026 in a single sprint. Here's the chronological timeline:

| Commit | What |
|--------|------|
| `159b109` | Create Next App scaffold |
| `6379308` | Initial commit with base structure |
| `83cc96d` | Complete website: 44 pages, 13 Sanity schemas, premium design system |
| `00a9fff` | Fix Vercel deployment config |
| `f9692c7` | Fix header dark/light text logic for different page backgrounds |
| `3f1b2f5` | Full 4-phase website revamp: brand kit alignment across all pages |
| `1f991fc` | Add Revun SVG logos to header/footer/mobile menu |
| `57de8f6` | Align typography (Outfit) and color system to Veloice brand kit |
| `d3bf9ec` | Remove stray macOS duplicate file |
| `ac74e86` | Update logo SVGs: Instrument Sans Bold font, green squiggle accent |
| `6f8489c` | Code review fixes: SSR hydration, URL consistency, performance |

### The 4-Phase Revamp (commit `3f1b2f5`)

The website was rebuilt in 4 parallel phases run simultaneously:

1. **Phase 1:** Design foundation (globals.css tokens, layout, header, footer, 6 homepage blocks)
2. **Phase 2:** Core pages (Platform, Pricing, About, Contact + their components)
3. **Phase 3:** Solutions (6), Compare (7 competitors), Integrations (12)
4. **Phase 4:** Geographic (CA provinces + cities, US hub), Self-manage, Resources, Help, Support, Privacy, Terms, SEO schemas

Each phase had exclusive file ownership to prevent conflicts.

---

## 12. Known Issues and Incomplete Work

### Not Yet Done

1. **Sanity CMS content population** - All content is hardcoded. Schemas exist but no content has been entered into Sanity Studio.
2. **Blog/Resources** - Page exists but has placeholder content only. No blog posts.
3. **Contact form backend** - Form UI exists but no API route to handle submissions (no email integration).
4. **Newsletter signup** - Footer has email input UI but no backend (no Beehiiv/Mailchimp integration).
5. **OG image** - `og-default.png` is referenced in metadata but may not exist.
6. **Real market data** - City pages have placeholder median rent, vacancy rates, etc.
7. **Testimonials** - Using placeholder testimonials, need real customer quotes.
8. **reCAPTCHA** - Form has reCAPTCHA env vars defined but not integrated into the contact form.
9. **Analytics events** - GTM container ID not set. Event tracking code exists but is dormant.
10. **Search functionality** - Integration page has search UI but no actual search backend.

### Technical Debt

- Some pages have `client.tsx` files for client components alongside `page.tsx` server components (compare, solutions). This is the correct Next.js pattern, not debt.
- The `RevealOnScroll` component is used in 22+ components across the site.

---

## 13. Design References

The visual system draws from these production websites:

| Reference | What to borrow |
|-----------|---------------|
| Stripe | Stats bars, product depth footer, border-based cards |
| Linear | Monochromatic color restraint, clean typography |
| Dub.co | CSS grid backgrounds, 10px offset animations, card borders |
| Clerk | Hero patterns (atmospheric, not text-left/screenshot-right) |
| Hemlane | Transparent pricing model, persona routing |
| Entrata | Micro-interactions, bento grid features |
| Resend | Serif display + sans body typography hierarchy |
| DoorLoop | Sticky header with transparent-to-solid scroll behavior |

### Veloice Design Playbook

A 38-pattern visual system playbook from Veloice AI was used as the gold standard reference. Key patterns applied:
- RotatingBadge with spring physics (damping 30, stiffness 400)
- NumberFlow animated pricing tabs
- Score rings (SVG strokeDasharray gauges)
- Sparklines with gradient fill
- Editorial shadow system (4-layer progressive shadows)
- Trust marquee with doubled array and edge fade
- Dashboard proof section with animated bar charts

---

## 14. Working with Claude Code on This Project

The `CLAUDE.md` file points to `AGENTS.md`, which warns about Next.js 16 breaking changes. When using Claude Code:

1. **Read `node_modules/next/dist/docs/`** before making Next.js API changes
2. **Check `globals.css`** for the full design token system before touching any colors
3. **Follow trailing slash convention** - all internal links must end with `/`
4. **Use `useId()`** for any dynamic IDs (not `Math.random()`) to avoid SSR hydration mismatches
5. **Don't add new colors** - blue is the only expressive color
6. **Borders over shadows** on all cards

### Useful Commands

```bash
npm run dev          # Start dev server (http://localhost:3000)
npm run build        # Production build (catches TS errors)
npm run lint         # ESLint
npx tsc --noEmit     # TypeScript check only
```

---

## 15. Closest Competitors (for context)

| Competitor | What they do | Revun's advantage |
|-----------|-------------|-------------------|
| SingleKey | Rent guarantee + tenant screening | No PM operations |
| liv.rent | Verified listings, transparent pricing | No full PM suite |
| Rhenti | Lead-to-lease for multifamily | Narrow focus |
| FrontLobby | Rent reporting only | Single feature |
| DoorLoop | Full PM (US-focused) | No Canadian compliance |
| AppFolio | #1 US PM software | No Canadian native offering |
| Buildium | US PM software | No Canadian compliance |

---

## 16. File Quick Reference

**Need to change colors?** `src/app/globals.css` (lines 31-46 for brand tokens)

**Need to change fonts?** `src/app/layout.tsx` (lines 8-36 for font imports)

**Need to add a page?** Create `src/app/(site)/your-page/page.tsx`. It auto-inherits Header + Footer from the `(site)` layout.

**Need to add a component?** `src/components/blocks/` for page sections, `src/components/ui/` for primitives.

**Need to edit homepage sections?** `src/app/(site)/page.tsx` imports from `src/components/blocks/`.

**Need to add an integration?** Edit the data array in `src/app/(site)/integrations/[slug]/page.tsx`.

**Need to add a city page?** Edit the data array in `src/app/(site)/ca/[province]/[city]/page.tsx`.

**Need to change metadata?** Root metadata in `src/app/layout.tsx`, page-specific in each `page.tsx`.

---

*Last updated: April 8, 2026*
*All work is on the `main` branch. No open PRs or feature branches.*
