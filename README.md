# Besago Ventures

Website for **Besago Ventures** — a Ghanaian diversified business enterprise based in Kasoa, Central Region, Ghana.

> **Tagline:** Connecting Business, Investment & Opportunities

## About the organisation

Besago Ventures is engaged in:

- Real estate, construction, travel and tourism
- Import and export, general trading
- Investment facilitation and business development
- Recruitment and workforce mobility
- Automotive services (brand-new and home-used spare parts)

It works with individuals, companies, investors, institutions and international partners to facilitate trade, investment, property development, workforce opportunities and cross-border business relationships.

- **CEO:** Apostle Dr. Benedict Owusu
- **Email:** besagoventures@gmail.com
- **Phone / WhatsApp:** [+233 594 472 033](https://wa.me/233594472033)
- **Location:** Kasoa, Central Region, Ghana

## Website structure

Single-page static site — no build step and no dependencies.

```
besago-ventures/
├── index.html        # All sections (see below)
├── favicon.ico       # Official emblem icon (16/32/48 px)
├── css/
│   └── styles.css    # Design system (navy/gold palette, Sora + Inter),
│                     # components, responsive rules, reduced-motion support
├── js/
│   └── main.js       # Mobile nav, active links, scroll reveals, hero parallax,
│                     # back-to-top, mailto contact form, footer year
├── docs/
│   └── business-profile.md  # Source of truth for every claim on the site
├── assets/
│   └── img/          # Responsive WebP photography (≈1.6 MB) plus the official
│                     # logo JPEGs (besago-logo, -640, -emblem-320)
├── README.md
└── .gitignore
```

### Sections (in order)

1. **Hero** — full-screen Accra skyline with dark navy overlay, gold eyebrow "Business • Investment • Opportunity", headline "Connecting Business, Investment & Opportunities", intro line, "Explore Our Businesses" and "Partner With Us" buttons, plus a bottom bar ("Ghana • Africa • Global Opportunities") and scroll cue
2. **Divisions strip** — 8 quick-nav chips linking to each service card
3. **About** — editorial "Building Value Through Opportunity." split layout with image, business description, Vision and Mission
4. **Leadership** — the CEO's published message with an executive signature, alongside the official CEO portrait in a 4:5 frame
5. **What We Do** — 8 numbered, image-led cards: real estate, construction, travel & tourism, import & export, investment facilitation, recruitment, automotive, general trading
6. **Positioning** — qualitative statements only (Multi-sector, Partnership-led, Growth-oriented); no fabricated metrics
7. **Partnership** — dark conversion section ("Let's Build Something Valuable.") over an architectural texture, with the partner types Besago Ventures works with
8. **Contact** — "Let's Talk" split: email, phone/WhatsApp and location rows, WhatsApp button, plus a mailto contact form
9. **Footer** — official logo lockup, tagline, Explore / Connect columns and copyright

A floating **WhatsApp button** is fixed to the bottom-right on every screen size, with a **back-to-top** button above it.

## Design system

- **Palette:** navy `#071A2B`, navy-dark `#04111D`, charcoal `#101820`, gold `#C9A227`, gold-light `#DDBB52`, cream `#F7F5EF`, muted grey `#69727D`
- **Type:** Sora (headings, 500/600/700) + Inter (body, 400/500/600) via Google Fonts, `display=swap`
- **Layout:** 1280px container, full-width colour-blocked sections, editorial split grids
- **Motion:** floating navbar drops in on load and stays fixed at the top while scrolling, entrance reveals, slow hero drift/parallax, staggered mobile menu, hover micro-interactions — all disabled under `prefers-reduced-motion`
- **Icons:** one inline SVG sprite in `index.html` (`<defs>` + `<use>`) using the [Lucide](https://lucide.dev) set (ISC licence) — 24px grid, stroke 2, round caps/joins, `currentColor`. Animated: division icons spring-pop on hover, card/CTA arrows loop across on hover, contact-row icons tilt onto a solid gold tile, eyebrow and stat rules draw in on scroll, WhatsApp button ripples, partner diamonds spin, the logo mark springs on hover — all CSS-only and reduced-motion safe
- **Accessibility:** WCAG 2.1 AA contrast (verified with Lighthouse 100/100/100 for accessibility, best practices and SEO), visible focus rings, skip link, semantic landmarks, `aria` labels on icon controls

### Imagery

Photography is downloaded and locally hosted (no hotlinking):

- Source: [Pexels](https://www.pexels.com/license/) free-use licence, stored as responsive WebP in `assets/img/` (640/1280 widths + `srcset` on cards)
- Images illustrate sectors generically — they do **not** depict Besago Ventures projects or imply ownership
- **Logo:** the official Besago Ventures artwork supplied by the brand, hosted locally in `assets/img/` — the header uses the emblem crop, the footer and `og:image` use the full lockup
- The favicon is the official Besago Ventures emblem (matching the header mark), generated at 16/32/48 px with rounded corners, a root `favicon.ico` and a 180 px apple-touch icon

## Running locally

Open `index.html` directly, or serve the folder:

```bash
# Python
python -m http.server 8000

# Node
npx serve .
```

Then visit <http://localhost:8000>.

## Notes

- **The contact form has no backend.** It builds a `mailto:` link to `besagoventures@gmail.com` with the visitor's name and message pre-filled, and opens their email application. The status message says exactly that — nothing is sent from the website itself, and no fake success state is shown.
- Fonts are loaded from Google Fonts (Sora + Inter) with preconnect.
- Responsive at 1440 / 1280 / 1024 / 768 / 430 / 390 / 375 with no horizontal overflow.
- All content is real business information — no invented portfolio, team, stats or testimonials.
