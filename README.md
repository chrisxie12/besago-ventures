# Besago Ventures

Marketing website for **Besago Ventures**, an early-stage venture capital firm.

## Structure

```
besago-ventures/
├── index.html      # Single-page site (hero, about, focus, portfolio, approach, team, contact)
├── css/
│   └── styles.css  # Design system, layout, responsive rules, animations
├── js/
│   └── main.js     # Mobile nav, scroll reveals, counters, form validation
└── README.md
```

## Running locally

No build step or dependencies — it's static HTML/CSS/JS. Open `index.html` directly, or serve the folder:

```bash
# Python
python -m http.server 8000

# Node
npx serve .
```

Then visit <http://localhost:8000>.

## Notes

- Fonts are loaded from Google Fonts (Fraunces + Inter).
- The contact form is front-end only; wire it to a backend or form service (e.g. Formspree) when ready.
- Responsive at mobile, tablet, and desktop breakpoints; respects `prefers-reduced-motion`.
