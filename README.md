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
├── css/
│   └── styles.css    # Design system (navy/gold), components, responsive rules, animations
├── js/
│   └── main.js       # Mobile nav, active links, staggered reveals, hero parallax,
│                     # back-to-top, mailto contact form, footer year
├── assets/
│   └── logo.svg      # Designed wordmark (header + footer use the same inline SVG)
├── README.md
└── .gitignore
```

### Sections (in order)

1. **Hero** — tagline, short intro, "Chat on WhatsApp" and "Partner With Us" buttons, plus an abstract visual panel with the eight division icons
2. **Divisions strip** — quick-nav chips linking to each of the 8 service cards
3. **About** — business description, Vision, Mission, CEO (with clearly marked portrait and message placeholders)
4. **What We Do** — 8 numbered service cards: real estate, construction, travel & tourism, import & export, investment facilitation, recruitment, automotive, general trading
5. **Partnership Opportunities** — the sectors and partners Besago Ventures works with
6. **Contact** — two-column layout: email, phone/WhatsApp and location rows, plus a contact form
7. **Footer** — brand and tagline, quick links, contact details and copyright

A floating **WhatsApp button** is fixed to the bottom-right on every screen size, with a **back-to-top** button above it.

## Running locally

Open `index.html` directly, or serve the folder:

```bash
# Python
python -m http.server 8000

# Node
npx serve .
```

Then visit <http://localhost:8000>.

## Placeholders to replace before going live

| Placeholder | Where | What to do |
|---|---|---|
| Logo / wordmark | `assets/logo.svg` (header + footer currently inline the same design) | Replace with the official brand artwork when available |
| CEO portrait | About section, circular "Portrait placeholder" slot | Drop in a square portrait when supplied |
| CEO message | About section, CEO card marked "Placeholder" | Replace with the CEO's actual message (no quote is invented) |
| Favicon | `<head>` of `index.html` | Designed gold "B" monogram — replace if the brand ships its own favicon |
| Open Graph | `<head>` of `index.html` | Add `og:url`, `og:image` and canonical URL once a domain exists |

## Notes

- **The contact form has no backend.** It builds a `mailto:` link to `besagoventures@gmail.com` with the visitor's name and message pre-filled, and opens their email application. Nothing is sent from the website itself.
- Fonts are loaded from Google Fonts (Fraunces + Inter).
- Responsive at mobile, tablet and desktop breakpoints; respects `prefers-reduced-motion`.
- All content is real business information — no invented portfolio, team, stats or testimonials.
