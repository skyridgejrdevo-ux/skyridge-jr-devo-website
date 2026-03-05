# skyridge-jr-devo-website

Public website for **Skyridge Junior Devo** — a non-profit youth mountain bike team for
7th and 8th graders in Lehi, Utah competing in the Utah NICA league.

Live site: [skyridgejrdevo.com](https://skyridgejrdevo.com)
Hosted on: **Netlify** (free tier, static HTML, auto-deploys from `main`)

---

## Repo Structure

```
skyridge-jr-devo-website/
├── index.html              # Home
├── about.html              # About / FAQ
├── sponsorships.html       # Sponsorships
├── registration.html       # Registration (Netlify Form)
├── ride-leaders.html       # Ride Leaders / Volunteer
├── rules.html              # Rules & Expectations
├── contact.html            # Contact / Coaching Staff
├── css/
│   └── style.css           # All styles — mobile-first, brand colors, responsive
├── scripts/
│   ├── season-embed.js     # Fetches season.json, injects dynamic content into pages
│   └── components.js       # Injects shared nav + footer into every page
├── assets/
│   └── images/             # Logo, team photos, sponsor logos
├── content/
│   ├── season.json         # Source of truth for race schedule, practices, key dates
│   └── page-copy.md        # Reference copy document (not served to users)
├── netlify.toml            # Netlify config (redirects, security headers)
└── README.md
```

---

## How to Update Season Data

All dynamic content — race schedule, practice times, kickoff info, key dates — is driven
by `content/season.json`. **No platform access required** to update it.

1. Edit `content/season.json` in this repo (GitHub web UI or locally)
2. Commit and push to `main`
3. The live site reflects changes on the next page load — no redeploy needed

### season.json Fields

| Field | Description |
|-------|-------------|
| `season` | Year string, e.g. `"2026"` |
| `kickoff.date_display` | Human-readable date shown on site |
| `kickoff.time` | Time string |
| `kickoff.location` | Venue name |
| `practices.days` | e.g. `"Tuesdays & Thursdays"` |
| `practices.time` | e.g. `"6:00 – 8:00 AM"` |
| `practices.location` | e.g. `"TBD — posted in Spond"` |
| `races[]` | Array of race objects |
| `key_dates[]` | Array of key date objects |

---

## Dynamic Content IDs

`scripts/season-embed.js` looks for these element IDs and injects content:

| ID | Content | Pages |
|----|---------|-------|
| `#race-schedule` | Race schedule table | Home, Registration |
| `#kickoff-meeting` | Kickoff date, time, location | Home |
| `#practice-schedule` | Practice days and times | Home, About |
| `#key-dates` | Upcoming key dates list (past dates hidden) | Registration |

---

## Shared Nav & Footer

`scripts/components.js` writes the nav and footer HTML into `<div id="site-nav">` and
`<div id="site-footer">` on every page. To update the nav or footer across all pages,
edit `components.js` — one file, all 7 pages update instantly.

---

## Registration Form

The registration form on `registration.html` uses **Netlify Forms** (`data-netlify="true"`).
No backend required — Netlify captures submissions.

**One-time setup after deploy:**
1. Netlify dashboard → Site Settings → Forms
2. Add email notification → skyridgejrdevo@gmail.com
3. Done — all submissions email to the coaching staff

---

## Netlify Deployment (one-time setup)

1. Go to [netlify.com](https://netlify.com) → "Add new site" → "Import from Git"
2. Select the `skyridge-jr-devo-website` repo
3. Build settings: **leave blank** (no build command, publish directory = `.`)
4. Click Deploy
5. Site is live at a `[random].netlify.app` URL

### Custom Domain (skyridgejrdevo.com)

1. Netlify dashboard → Site Settings → Domain management → Add custom domain
2. Enter `skyridgejrdevo.com`
3. At your domain registrar, update DNS:
   - **A record** `@` → Netlify load balancer IP (shown in Netlify after adding domain)
   - **CNAME** `www` → `[your-site].netlify.app`
4. SSL provisions automatically (Let's Encrypt) — takes ~10 min

---

## Making Content Changes

**Season data** (races, practices, dates): Edit `content/season.json`

**Page content**: Edit the relevant `.html` file directly

**Nav/footer**: Edit `scripts/components.js` — changes apply to all 7 pages

**Styles**: Edit `css/style.css`

**Sponsor logos**: Add PNG files to `assets/images/` and update `index.html`

All changes: commit + push to `main` → Netlify auto-deploys in ~30 seconds.

---

## Brand Guidelines

- Primary accent: `#F26A1B` (orange)
- Dark backgrounds: `#1a1a1a`
- Logo: `assets/images/skyridge_jr-devo_logo.png`
- Fonts: Barlow Condensed (headers) + Inter (body) via Google Fonts
<!-- deploy trigger -->
