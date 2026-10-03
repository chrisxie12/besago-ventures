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
│   └── main.js       # Mobile nav, scroll reveals, mailto contact form, footer year
├── assets/
│   └── logo.svg      # ⚠ LOGO PLACEHOLDER — replace with the real logo
├── README.md
└── .gitignore
```

### Sections (in order)

1. **Hero** — tagline, short intro, "Chat on WhatsApp" and "Partner With Us" buttons
2. **About** — business description, Vision, Mission, CEO
3. **What We Do** — 8 service cards: real estate, construction, travel & tourism, import & export, investment facilitation, recruitment, automotive, general trading
4. **Partnership Opportunities** — the sectors and partners Besago Ventures works with
5. **Contact** — email, phone/WhatsApp, location, plus a contact form
6. **Footer** — tagline and copyright

A floating **WhatsApp button** is fixed to the bottom-right on every screen size.

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
| Logo | `assets/logo.svg` (used in header + footer) | Replace the file with the real logo |
| Hero photo | Hero section, marked `PHOTO PLACEHOLDER` | Swap in a company/project photo (1600 × 600) |
| About photo | About section, marked `PHOTO PLACEHOLDER` | Swap in a company, office or project photo |
| Favicon | `<head>` of `index.html` | Replace the inline data-URI favicon |
| Open Graph | `<head>` of `index.html` | Add `og:url`, `og:image` and canonical URL once a domain exists |

## Notes

- **The contact form has no backend.** It builds a `mailto:` link to `besagoventures@gmail.com` with the visitor's name and message pre-filled, and opens their email application. Nothing is sent from the website itself.
- Fonts are loaded from Google Fonts (Fraunces + Inter).
- Responsive at mobile, tablet and desktop breakpoints; respects `prefers-reduced-motion`.
- All content is real business information — no invented portfolio, team, stats or testimonials.
