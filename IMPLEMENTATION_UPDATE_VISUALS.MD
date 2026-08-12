# Visual Refactor & Tailwind Integration Plan

This plan details the implementation strategy for transitioning the codebase from inline styling and manual JS hover handlers to a clean, cohesive, and premium design using Tailwind CSS. It sets up custom theme configurations, refactors existing page layouts and reusable components, and implements UX/performance/accessibility best practices.

---

## Technical Overview

- **Design Tokens**: Centralized in tailwind.config.js as theme extensions.
- **Global Reset**: Moved into index.css using Tailwind's `@layer base` directives.
- **Decomposition**: Splitting Home.tsx into modular section-level components inside `src/components`.
- **UX Polish**: Implementation of skeleton loaders, image lightboxes, trust signals, and responsive interactions.

---

## Proposed Changes

### Component 1: Design Tokens & Tailwind Configuration

#### [MODIFY] [tailwind.config.js](file:///Users/filipbjorgaas/Coding%20Antigravity/new.temp.build/tailwind.config.js)
- Extend `theme.colors` with design tokens defined currently as CSS variables:
  - `primary`: `#D97706`
  - `primary-hover`: `#B45309`
  - `dark`: `#1C1510`
  - `dark-deep`: `#140F0A`
  - `light`: `#FDF8F2`
  - `gray-100`: `#F5F0EA`
  - `gray-400`: `#A8998A`
  - `gray-600`: `#7A6B5D`
  - `text-dark`: `#1C1510`
  - `text-light`: `#D6C9B8`
- Add heading serif font next to body sans font in `theme.fontFamily`:
  - `sans`: `['"Plus Jakarta Sans"', 'sans-serif']`
  - `heading`: `['"DM Serif Display"', 'serif']`
- Add border-radius variables:
  - `sm`: `8px`
  - `md`: `12px`
  - `lg`: `16px`
  - `pill`: `999px`
- Add custom keyframe configurations and matching animation classes:
  - `pageFadeIn` (duration `1.2s`, cubic-bezier transition, translating `8px` offset to `0`)
  - `badgePulse` (duration `2s` or `3s`, easing scale transform `1.02` at `50%`)
  - `wordAppear` (duration `1s`, cubic-bezier transition, translating `16px` offset to `0`)

#### [MODIFY] [index.css](file:///Users/filipbjorgaas/Coding%20Antigravity/new.temp.build/src/index.css)
- Replace `@import` rule to load both **Plus Jakarta Sans** and **DM Serif Display**:
  `@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');`
- Remove all raw CSS variables in `:root` and manually defined keyframes.
- Define base styles for the layout using `@layer base`:
  ```css
  @layer base {
    html {
      scroll-behavior: smooth;
    }
    body {
      @apply bg-dark text-text-light antialiased font-sans m-0;
    }
    h1, h2 {
      @apply font-heading tracking-[-0.02em];
    }
  }
  ```
- Override `.container` utility custom styles using `@layer components` to match `--container-max: 1280px` with clamp-based responsive padding:
  ```css
  @layer components {
    .container {
      @apply mx-auto w-full max-w-[1280px] px-[20px] md:px-[40px];
    }
  }
  ```

---

### Component 2: Reusable Components Refactoring

#### [MODIFY] [Navbar.tsx](file:///Users/filipbjorgaas/Coding%20Antigravity/new.temp.build/src/components/Navbar.tsx)
- Remove all inline style objects and local `<style>` block.
- Convert navigation items to Tailwind class strings. Use state checks (`isScrolled`) to dynamically append a thin border (`border-b border-white/10`) and background-color changes instead of raw JS styles.
- Replace manual JS mouse tracking styles with CSS transitions and standard tailwind classes (`hover:bg-white/10`, `backdrop-blur-xl`, `transition-all duration-300`).

#### [MODIFY] [Footer.tsx](file:///Users/filipbjorgaas/Coding%20Antigravity/new.temp.build/src/components/Footer.tsx)
- Convert main grid layout into Tailwind classes: `grid grid-cols-1 md:grid-cols-3 gap-10`.
- Remove inline style object references and `<style>` responsive tag at the bottom.
- Update the copyright year text to calculate dynamically: `{new Date().getFullYear()}`.

#### [MODIFY] [Button.tsx](file:///Users/filipbjorgaas/Coding%20Antigravity/new.temp.build/src/components/Button.tsx)
- Replace `variantStyles`, `sizeStyles`, and `base` object CSS mappings with Tailwind-based className mappings:
  - `primary`: `bg-primary text-dark hover:bg-primary-hover hover:shadow-[0_8px_25px_rgba(217,119,6,0.3)] hover:-translate-y-0.5 border-2 border-transparent`
  - `outline`: `bg-transparent text-white border-2 border-white hover:shadow-[0_8px_25px_rgba(217,119,6,0.15)] hover:-translate-y-0.5`
  - `dark`: `bg-dark text-white border-2 border-transparent hover:shadow-[0_8px_25px_rgba(217,119,6,0.15)] hover:-translate-y-0.5`
  - `sm`: `px-6 py-2.5 text-[0.85rem]`
  - `md`: `px-8 py-3.5 text-[0.95rem]`
  - `lg`: `px-10 py-4 text-[1.05rem]`
- Remove `onMouseEnter`, `onMouseLeave`, and local style objects; use hover and active pseudo-classes instead. Keep the TS prop API intact.

#### [MODIFY] [ScrollReveal.tsx](file:///Users/filipbjorgaas/Coding%20Antigravity/new.temp.build/src/components/ScrollReveal.tsx)
- Keep dynamic intersection-observer state hook. Keep dynamic state-based transform style rules inline, but apply static transition attributes (`transition-all`, `duration-1000`, `ease-out`) via Tailwind classes.

#### [MODIFY] [CTABanner.tsx](file:///Users/filipbjorgaas/Coding%20Antigravity/new.temp.build/src/components/CTABanner.tsx)
- Convert inline style elements and `<style>` blocks to Tailwind. Ensure grids, paddings, and background alignments use breakpoints (`md:`, `lg:`).

#### [MODIFY] [FAQAccordion.tsx](file:///Users/filipbjorgaas/Coding%20Antigravity/new.temp.build/src/components/FAQAccordion.tsx)
- Re-style using responsive grid and layout utilities.
- Add `aria-expanded` tag to state toggler container.
- Implement soft color shift on the active selected element using Tailwind transitions (`transition-all duration-300`).

---

### Component 3: New Visual & Interaction Components

#### [NEW] [ImageLightbox.tsx](file:///Users/filipbjorgaas/Coding%20Antigravity/new.temp.build/src/components/ImageLightbox.tsx)
- Pure UI lightbox component containing:
  - Overlay container with backdrop blur and dark background overlay (`bg-black/90 backdrop-blur-md`).
  - Active image display with aspect ratio locked.
  - Interactive pagination arrows (`ChevronLeft`, `ChevronRight`) and Close icon button (`X`).
  - Accessibility bindings: `role="dialog"`, keyboard shortcuts (Escape key listener for closing, Arrow keys for navigating), and focus trapping.

#### [NEW] [BackToTop.tsx](file:///Users/filipbjorgaas/Coding%20Antigravity/new.temp.build/src/components/BackToTop.tsx)
- Positioned floating button (`fixed bottom-6 right-6 z-50`).
- Scroll event tracker that shows/fades-in the component only after passing the initial viewport (`scrollY > window.innerHeight` / Hero section height).
- Styled with Tailwind hover transitions and bounce micro-animations.

#### [NEW] [TrustBadges.tsx](file:///Users/filipbjorgaas/Coding%20Antigravity/new.temp.build/src/components/TrustBadges.tsx)
- Flex wrap alignment container displaying pill-shaped trust signals:
  - `F-skattsedel`
  - `Fullt försäkrade`
  - `ROT-avdrag`
- Displayed with tiny checkmark or badge icons and extended hover tooltips.

#### [NEW] [SuccessState.tsx](file:///Users/filipbjorgaas/Coding%20Antigravity/new.temp.build/src/components/SuccessState.tsx)
- Success template replacement for form container.
- Animated green checkmark icon (utilizing pageFadeIn/badgePulse keyframe logic).
- Message body: *"Tack! Vi kontaktar dig inom 24 timmar."*

---

### Component 4: Home Page Decomposition

#### [NEW] [HeroSection.tsx](file:///Users/filipbjorgaas/Coding%20Antigravity/new.temp.build/src/components/HeroSection.tsx)
- Decomposed section from Home.tsx containing the header, preloaded background image with overlay, brand value metrics, main CTA trigger buttons, and trust badges.
- Includes the secondary outline button *"Se våra projekt"* next to *"Begär offert"* linking to References, and an animated scroll chevron bouncing indicator at the bottom.

#### [NEW] [ProcessSteps.tsx](file:///Users/filipbjorgaas/Coding%20Antigravity/new.temp.build/src/components/ProcessSteps.tsx)
- Three-step flow detailing "Ring oss", "Hembesök", and "Vi bygger".
- Replaces CSS background gradients and arrows with Tailwind wrappers.

#### [NEW] [AboutBlurb.tsx](file:///Users/filipbjorgaas/Coding%20Antigravity/new.temp.build/src/components/AboutBlurb.tsx)
- Premium "Om oss" introduction card featuring side-by-side grids, responsive padding heights, and background accents.

#### [NEW] [ServicesGrid.tsx](file:///Users/filipbjorgaas/Coding%20Antigravity/new.temp.build/src/components/ServicesGrid.tsx)
- Integrates the three main service categories.
- Service cards receive hover scales (`hover:scale-[1.02]`) and border top animations (`hover:border-t-4 hover:border-t-primary`).

#### [NEW] [ReviewsSection.tsx](file:///Users/filipbjorgaas/Coding%20Antigravity/new.temp.build/src/components/ReviewsSection.tsx)
- Grid layout containing client recommendation comments.
- Includes a large decorative opening quotation mark styled with the serif font and a semi-transparent primary color (`opacity-10 text-primary`) placed absolute in the top-left of each review card.

#### [NEW] [GalleryPreview.tsx](file:///Users/filipbjorgaas/Coding%20Antigravity/new.temp.build/src/components/GalleryPreview.tsx)
- Gallery previews matching a 2x2 masonry grid style (first and last images styled taller using aspect overrides or grid grid-cols spanning rules).
- Connects to the lightbox state handlers to enable interactive previews.
- Integrates local pulsing skeleton loaders for images loading.

#### [MODIFY] [Home.tsx](file:///Users/filipbjorgaas/Coding%20Antigravity/new.temp.build/src/pages/Home.tsx)
- Reassemble the home page layout using the new section components. Clean up all inline style declarations, variables, and style tags.

---

### Component 5: Remaining Pages Conversion

#### [MODIFY] [About.tsx](file:///Users/filipbjorgaas/Coding%20Antigravity/new.temp.build/src/pages/About.tsx)
- Fully convert markup layout structure, headers, and team columns to Tailwind CSS.
- Remove all local `<style>` and raw JS styling attributes.

#### [MODIFY] [Contact.tsx](file:///Users/filipbjorgaas/Coding%20Antigravity/new.temp.build/src/pages/Contact.tsx)
- Convert to Tailwind.
- Integrate validation states (red/green borders, error messages) and success response screens.

#### [MODIFY] [References.tsx](file:///Users/filipbjorgaas/Coding%20Antigravity/new.temp.build/src/pages/References.tsx)
- Refactor portfolio filtering grid to responsive Tailwind styles.
- Add `transition-opacity duration-300` when updating the selected active category filter to toggle grid element transparency briefly during render.

#### [MODIFY] [ServicePage.tsx](file:///Users/filipbjorgaas/Coding%20Antigravity/new.temp.build/src/pages/ServicePage.tsx)
- Replace layout structures with tailwind flex/grid elements and remove style headers.

#### [MODIFY] [Quote.tsx](file:///Users/filipbjorgaas/Coding%20Antigravity/new.temp.build/src/pages/Quote.tsx)
- Apply Tailwind classes to input inputs, form grids, step flows, and success state overrides.

---

### Component 6: Media and Asset Migration

#### [MODIFY] [images.ts](file:///Users/filipbjorgaas/Coding%20Antigravity/new.temp.build/src/data/images.ts)
- Replace the four external `ibb.co` links with local `/public` files:
  - `logo`: `/logo.webp`
  - `gallery[0]`: `/gallery-1.webp`
  - `gallery[1]`: `/gallery-2.webp`
  - `gallery[2]`: `/gallery-3.webp`
  - `about.hero`: `/logo.webp`

#### [NEW] Local Asset Files in `/public`
- Retrieve/download the raw image payloads from the current ibb.co urls.
- Convert down to modern webp compression payloads using CLI/script utilities.
- Target paths:
  - `public/logo.webp`
  - `public/gallery-1.webp`
  - `public/gallery-2.webp`
  - `public/gallery-3.webp`

#### [MODIFY] [index.html](file:///Users/filipbjorgaas/Coding%20Antigravity/new.temp.build/index.html)
- Add performance-oriented preload hints for above-the-fold media:
  ```html
  <link rel="preload" href="/logo.webp" as="image" type="image/webp" />
  <link rel="preload" href="/hero-construction-site.webp" as="image" type="image/webp" />
  ```

---

## Action Checklist & Progress Tracker

Use this checklist to track development across sessions and developer agents:

### Phase 1: Tailwind Configuration & Global Setup
- [ ] Extend [tailwind.config.js](file:///Users/filipbjorgaas/Coding%20Antigravity/new.temp.build/tailwind.config.js) with design tokens (colors, border radii, keyframe animations, fonts)
- [ ] Update Google Font imports in [index.css](file:///Users/filipbjorgaas/Coding%20Antigravity/new.temp.build/src/index.css) to fetch `DM Serif Display`
- [ ] Apply body base resets and container components via Tailwind rules inside [index.css](file:///Users/filipbjorgaas/Coding%20Antigravity/new.temp.build/src/index.css)
- [ ] Perform build test to ensure CSS compiles correctly with new configurations

### Phase 2: Component Refactor
- [ ] Refactor [Navbar.tsx](file:///Users/filipbjorgaas/Coding%20Antigravity/new.temp.build/src/components/Navbar.tsx) to Tailwind, remove local style variables & inject scroll-border trigger
- [ ] Refactor [Footer.tsx](file:///Users/filipbjorgaas/Coding%20Antigravity/new.temp.build/src/components/Footer.tsx) layout to Tailwind grid and make copyright year dynamic
- [ ] Refactor [Button.tsx](file:///Users/filipbjorgaas/Coding%20Antigravity/new.temp.build/src/components/Button.tsx) variants/sizes mapping to Tailwind strings, remove JS listeners
- [ ] Refactor [ScrollReveal.tsx](file:///Users/filipbjorgaas/Coding%20Antigravity/new.temp.build/src/components/ScrollReveal.tsx) styling layers
- [ ] Refactor [CTABanner.tsx](file:///Users/filipbjorgaas/Coding%20Antigravity/new.temp.build/src/components/CTABanner.tsx) responsiveness to Tailwind
- [ ] Refactor [FAQAccordion.tsx](file:///Users/filipbjorgaas/Coding%20Antigravity/new.temp.build/src/components/FAQAccordion.tsx) including aria-expanded attributes and transition effects

### Phase 3: New Component Implementations
- [ ] Build [ImageLightbox.tsx](file:///Users/filipbjorgaas/Coding%20Antigravity/new.temp.build/src/components/ImageLightbox.tsx) with modal overlay, responsive controls, Escape/Arrow navigation, and focus trapping
- [ ] Build [BackToTop.tsx](file:///Users/filipbjorgaas/Coding%20Antigravity/new.temp.build/src/components/BackToTop.tsx) scrolling widget
- [ ] Build [TrustBadges.tsx](file:///Users/filipbjorgaas/Coding%20Antigravity/new.temp.build/src/components/TrustBadges.tsx) pill component
- [ ] Build [SuccessState.tsx](file:///Users/filipbjorgaas/Coding%20Antigravity/new.temp.build/src/components/SuccessState.tsx) confirmation view

### Phase 4: Homepage Decomposition & Sections
- [ ] Create [HeroSection.tsx](file:///Users/filipbjorgaas/Coding%20Antigravity/new.temp.build/src/components/HeroSection.tsx) with preloads, twin buttons, scroll pointer, and badges
- [ ] Create [ProcessSteps.tsx](file:///Users/filipbjorgaas/Coding%20Antigravity/new.temp.build/src/components/ProcessSteps.tsx) with Tailwind grids
- [ ] Create [AboutBlurb.tsx](file:///Users/filipbjorgaas/Coding%20Antigravity/new.temp.build/src/components/AboutBlurb.tsx) section
- [ ] Create [ServicesGrid.tsx](file:///Users/filipbjorgaas/Coding%20Antigravity/new.temp.build/src/components/ServicesGrid.tsx) with border-hover transitions
- [ ] Create [ReviewsSection.tsx](file:///Users/filipbjorgaas/Coding%20Antigravity/new.temp.build/src/components/ReviewsSection.tsx) with serif quote characters
- [ ] Create [GalleryPreview.tsx](file:///Users/filipbjorgaas/Coding%20Antigravity/new.temp.build/src/components/GalleryPreview.tsx) with masonry grids and pulsing skeleton loaders
- [ ] Refactor [Home.tsx](file:///Users/filipbjorgaas/Coding%20Antigravity/new.temp.build/src/pages/Home.tsx) to mount the new section components and drop all local custom styles

### Phase 5: Page-Level Cleanups
- [ ] Convert [About.tsx](file:///Users/filipbjorgaas/Coding%20Antigravity/new.temp.build/src/pages/About.tsx) to Tailwind
- [ ] Convert [Contact.tsx](file:///Users/filipbjorgaas/Coding%20Antigravity/new.temp.build/src/pages/Contact.tsx) to Tailwind & inject valid/invalid visual feedback
- [ ] Convert [References.tsx](file:///Users/filipbjorgaas/Coding%20Antigravity/new.temp.build/src/pages/References.tsx) to Tailwind & apply filter change transition animations
- [ ] Convert [ServicePage.tsx](file:///Users/filipbjorgaas/Coding%20Antigravity/new.temp.build/src/pages/ServicePage.tsx) to Tailwind
- [ ] Convert [Quote.tsx](file:///Users/filipbjorgaas/Coding%20Antigravity/new.temp.build/src/pages/Quote.tsx) to Tailwind

### Phase 6: Asset Optimization, Performance & Accessibility
- [ ] Download external `ibb.co` image URLs locally
- [ ] Convert the images into `.webp` format and save them inside the `/public` folder
- [ ] Update [images.ts](file:///Users/filipbjorgaas/Coding%20Antigravity/new.temp.build/src/data/images.ts) image pointers
- [ ] Inject preload links to header inside [index.html](file:///Users/filipbjorgaas/Coding%20Antigravity/new.temp.build/index.html)
- [ ] Verify focus-visible outline indicators and descriptive alt fields on all image resources

---

## Verification Plan

### Automated Checks
- Run typescript compilation (`npm run build` or `npx tsc`) to ensure no syntax/type discrepancies exist.
- Inspect bundler output size and performance warnings.

### Manual Audits
- Verify layout responsiveness across desktop, tablet, and mobile views.
- Test scroll actions (scrolled navigation styling, back-to-top button fade-ins, and animations).
- Verify accessibility attributes: tab through links and inputs, open Lightbox modal, inspect outline rings, verify escape key closures, and validate accordion accessibility markup tags.
