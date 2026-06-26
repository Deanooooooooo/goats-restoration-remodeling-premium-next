# Goats Restoration and Remodeling LLC QA

## Source / Fact Audit

- PASS: Business name from Facebook, Google Maps, BBB and Thumbtack snippets.
- PASS: Profession/category: roofing, restoration, remodeling, kitchen/bathroom remodeling, tile and exterior work from Facebook, BBB and Thumbtack snippets.
- PASS: Phone `(917) 891-5218` from Facebook/BBB/search snippets.
- PASS: Address `38 Middle Street, Waterbury, CT 06706` from BBB and Google Maps place.
- PASS: Google Maps coordinates from Dean-provided place URL.
- PASS: Facebook and Instagram links verified from public snippets.
- PASS: No prices, review counts, guarantees, licenses, certifications, awards or invented credentials added.
- PASS: Verified email `goatsrestorationllc@outlook.com` from official Goats website.
- PASS: Email enquiry form is primary in the hero; phone remains a secondary direct CTA.

## Asset / Layout Audit

- PASS: Asset tier classified as Tier B: verified proof/contact but low-resolution Facebook work photos.
- PASS: Page uses the Stay Safe premium React/motion scaffold rather than a plain static build.
- PASS: `package.json` includes `motion`, `framer-motion`, `gsap`, `ScrollTrigger`, `Lenis`, `lucide-react`, `next`, `react`.
- PASS: Copied template assets were isolated in `research/template-assets/` and not used.
- PASS: Real Goats roof images are used only in controlled compact frames.
- PASS: No vertical/horizontal mismatch issue; all visible work images are landscape and placed in landscape frames.
- PASS: Low-resolution Facebook roof images are not used as full-viewport hero background.
- PASS: Generated high-resolution contractor background `hero-roof-remodel-highres.webp` is used only as atmospheric hero background, not as Goats project proof.

## Testimonial Audit

- PASS: Testimonial cards use real public review snippets from BBB/Thumbtack search results.
- PASS: Names used only where snippets expose names: Lyn, Kristin P., Hannah J.
- PASS: No review count is shown.
- PASS: No anonymous fake review cards.

## Premium UX Gate

- PASS: Fixed header with phone CTA.
- PASS: Motion scaffold active: Lenis smooth scroll, motion hover cards, GSAP ScrollTrigger gallery/proof movement, animated counters with real fallback values.
- PASS: Visible useful interaction: project type selector for roof/remodel/exterior/restoration.
- PASS: Real compact estimate form exists with niche-specific fields and sends typed details through a `mailto:` enquiry.
- PASS: FAQ accordion present.
- PASS: Footer action icon system present.
- PASS: Bottom Google Maps/local SEO block present directly above footer.

## Copy Audit

- PASS: Rejected internal/build phrases return zero hits:
  - `vertical photos shown`
  - `page sharpens`
  - `page should make`
  - `proof without fake`
  - `premium build log`
  - `public proof sources checked`
  - `kept sharp instead of stretched`
  - `example.com`
- PASS: Public copy is customer-facing; no build rationale or agent notes in headings/CTAs.
- PASS: Public copy no longer asks visitors to send photos or routes the form to Facebook.

## Screenshot QA

- PASS: Desktop screenshot: `qa-desktop-v2.png`.
- PASS: Mobile screenshot after counter fix: `qa-mobile-v3.png`.
- PASS: Interaction screenshot: `qa-interaction-v2.png`.
- PASS: Map screenshot: `qa-map-v2.png`.
- PASS: Footer screenshot: `qa-footer-v2.png`.
- PASS: Map rendered visibly in `qa-map-v2.png`.
- PASS: Hero email form desktop screenshot: `qa-email-form-hero-desktop.png`.
- PASS: Hero email form mobile screenshot: `qa-email-form-hero-mobile.png`.

## Build

- PASS: `npm install` completed.
- NOTE: npm reported 2 moderate dependency advisories; no force upgrade applied.
- PASS: `npm run build` completed.
- PASS: `npm run build:github` completed after hero email form and high-res image update.
- PASS: One H1, one form, one map iframe.
- PASS: Static export published to GitHub Pages branch `gh-pages`.
- PASS: Live URL returned HTTP 200.
- PASS: Live CSS and hero image returned HTTP 200.
- PASS: Live Playwright check confirmed visible H1, one form and one map iframe.
- PASS: Live screenshot: `qa-live-desktop.png`.
