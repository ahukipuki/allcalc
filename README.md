# מחשבונים.IL — Hebrew Calculator Site

A sleek, SEO-optimized Hebrew calculator site with 52 calculators across 6 categories. Clone-inspired by calculator.net but designed from scratch for Israeli users.

## Stack

- **Next.js 14** (App Router, SSG where possible)
- **TypeScript** strict mode
- **Tailwind CSS** with custom design tokens
- **Google Fonts**: Frank Ruhl Libre (display) + Assistant (UI)
- **Zero runtime dependencies** for calculators — everything runs in the browser

## Getting started

```bash
npm install
npm run dev    # http://localhost:3000
```

## Build & deploy

```bash
npm run build
npm start     # runs the standalone server on port 3000
```

Since `output: 'standalone'` is set in `next.config.js`, the built app is fully self-contained in `.next/standalone/`.

### Hosting on your own server

1. Build: `npm run build`
2. Copy `.next/standalone/`, `.next/static/` → `.next/standalone/.next/static/`, and `public/` → `.next/standalone/public/` onto your server
3. Run with `node server.js` behind a reverse proxy (nginx / Caddy)
4. **Important**: update `SITE.url` in `lib/calculators.ts` to your actual domain before building — this is used in canonical URLs, OG tags, and sitemap

### Recommended server config (nginx)

```nginx
server {
  server_name machshevonim.il www.machshevonim.il;
  listen 443 ssl http2;
  # ... ssl setup

  gzip on;
  gzip_types text/plain application/json application/javascript text/css application/xml;
  brotli on;
  brotli_types text/plain application/json application/javascript text/css application/xml;

  location /_next/static/ {
    proxy_pass http://127.0.0.1:3000;
    expires 365d;
    add_header Cache-Control "public, immutable";
  }

  location / {
    proxy_pass http://127.0.0.1:3000;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
  }
}
```

## Project structure

```
app/
  layout.tsx              # root layout, RTL, fonts, metadata
  page.tsx                # homepage
  [category]/page.tsx     # category listing
  [category]/[slug]/page.tsx  # calculator detail page
  about|privacy|contact/  # static pages
  sitemap.ts              # XML sitemap generator
  robots.ts               # robots.txt
components/
  Header.tsx              # sticky header with search
  Footer.tsx              # footer with category links
  SearchBar.tsx           # client-side fuzzy search
  CalculatorRenderer.tsx  # dynamic calculator loader
  ui/Primitives.tsx       # shared input/result/card primitives
  calculators/            # 52 individual calculator components
lib/
  calculators.ts          # registry: 52 calcs + 6 categories, SEO metadata
```

## Adding a new calculator

1. Add the entry to `calculators[]` in `lib/calculators.ts` (slug, title, description, keywords, category)
2. Create a new file `components/calculators/YourCalc.tsx` — use the shared primitives from `components/ui/Primitives.tsx`
3. Register it in `components/CalculatorRenderer.tsx` under the matching slug
4. That's it — pages, routing, sitemap, and SEO are generated automatically

## SEO features built in

- Per-page title / meta description / canonical URL (from the registry)
- Hebrew keywords per calculator
- JSON-LD structured data (`WebApplication` + `BreadcrumbList`) on every calculator page
- OpenGraph + Twitter meta
- Auto-generated sitemap with priorities (popular calculators = 0.9)
- Auto-generated robots.txt
- `lang="he"` + `dir="rtl"` at the root
- Mobile-first responsive design
- Fast loading: each calculator is dynamically imported (small per-page bundles)

## Traffic strategy recommendations

1. **Pick 5-10 "hero" calculators** and commission/write 800-1200 word Hebrew guides below them — that's what actually ranks in Google. Good starters: משכנתא, BMI, שכר נטו, מס רכישה, גיל, אחוזים, קלוריות.
2. **Backlinks**: reach out to Israeli personal finance blogs, health sites, and student forums to link back to specific calculators.
3. **Update the Israel-specific calculators yearly** — tax brackets, VAT, purchase tax brackets, credit point value. Put reminders.
4. **Consider adding עברית short variants** of popular calc URLs (e.g. `/mashkanta` → redirect to `/finansi/mashkanta`) for easier sharing.

## Performance tuning after launch

- Replace Google Fonts with self-hosted fonts (fewer DNS hits)
- Add `next/image` + serve an `og:image` per calculator
- Cache static HTML at the edge (Cloudflare) — pages are pure SSG
- Monitor Core Web Vitals; all calculators are client-only so CLS should be near zero

## License

All code in this repo is yours. Numbers and figures used in Israeli-specific calculators (tax brackets, VAT rate, purchase tax thresholds) are based on publicly available government data as of build time. Verify and update periodically.
