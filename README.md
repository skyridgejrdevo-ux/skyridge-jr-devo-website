# skyridge-jr-devo-website

Public website for **Skyridge Junior Devo** — a non-profit youth mountain bike team for
7th and 8th graders in Lehi, Utah competing in the Utah NICA league.

Live site: [skyridgejrdevo.com](https://skyridgejrdevo.com)
Hosted on: Webflow (Basic plan)

---

## Repo Structure

```
skyridge-jr-devo-website/
├── scripts/
│   └── season-embed.js   # Injected into Webflow; fetches season.json at page load
├── content/
│   └── season.json       # Source of truth for race schedule, practices, key dates
├── .gitignore
└── README.md
```

---

## How to Update Season Data

All dynamic content on the live site — race schedule, practice times, kickoff info, key
dates — is driven by `content/season.json`. **No Webflow access required** to update it.

### Steps

1. Edit `content/season.json` in this repo (GitHub web UI or locally).
2. Commit and push to `main`.
3. The live site reflects changes on the next page load. No redeploy needed.

### season.json Fields

| Field | Description |
|-------|-------------|
| `season` | Year string, e.g. `"2026"` |
| `kickoff.date_display` | Human-readable date shown on site |
| `kickoff.time` | Time string, e.g. `"7:00 – 8:00 PM"` |
| `kickoff.location` | Venue name |
| `practices.days` | e.g. `"Tuesdays & Thursdays"` |
| `practices.time` | e.g. `"6:00 – 8:00 AM"` |
| `practices.location` | e.g. `"TBD — posted in Spond"` |
| `races[]` | Array of race objects (see below) |
| `key_dates[]` | Array of key date objects (see below) |

**Race object:**
```json
{
  "name": "Beaver Mountain",
  "date": "2026-08-22",
  "date_display": "August 22, 2026",
  "location": "Beaver Mountain Ski Resort",
  "city": "Garden City, UT",
  "start_time": "2:30 PM"
}
```

**Key date object:**
```json
{
  "label": "Kit Fitting",
  "date": "2026-07-15",
  "date_display": "July 15, 2026",
  "detail": "Time and location TBD — check Spond"
}
```

> The `date` field (ISO format `YYYY-MM-DD`) is used to filter out past dates automatically.
> The `date_display` field is what's shown to visitors.

---

## How the Embed Script Works

`scripts/season-embed.js` is a single self-contained vanilla JavaScript file with no
dependencies. It is loaded from the GitHub raw content URL via a `<script>` tag added to
Webflow's project-level custom code (Footer section).

On page load, it:
1. Fetches `season.json` from GitHub raw content
2. Finds HTML elements by ID on the current page
3. Injects formatted content into those elements
4. Falls back to placeholder text if the fetch fails

### HTML Element IDs (add these to Webflow sections)

| ID | Content injected | Pages |
|----|-----------------|-------|
| `race-schedule` | Race schedule table | Home, Registration |
| `kickoff-meeting` | Kickoff date, time, location | Home |
| `practice-schedule` | Practice days and times | Home, About |
| `key-dates` | Upcoming key dates list | Registration |

### Adding the Script to Webflow

1. In Webflow: **Project Settings → Custom Code → Footer Code**
2. Paste the following `<script>` tag:

```html
<script src="https://raw.githubusercontent.com/brandongsmitty/skyridge-jr-devo-website/main/scripts/season-embed.js"></script>
```

> **Note:** If GitHub raw content is blocked by CSP in production, host the script via
> jsDelivr CDN instead:
> ```html
> <script src="https://cdn.jsdelivr.net/gh/brandongsmitty/skyridge-jr-devo-website@main/scripts/season-embed.js"></script>
> ```
> jsDelivr is recommended for production — it caches the file at the CDN edge and is
> more reliable than raw.githubusercontent.com for end users.

---

## Relationship to Internal Coaching Tools

The internal coaching tools repo (`skyridge-jr-devo`, hosted on GitHub Pages + Firebase)
is **separate** and **not affected** by changes to this repo. This repo contains only the
public-facing website assets.

When updating race schedule or dates, you may want to keep both in sync:
- This repo: `content/season.json` (public site)
- Internal repo: Firebase season data (coaching tools)

---

## Brand Guidelines

- Primary accent color: `#F26A1B` (orange)
- Logo: `skyridge_jr-devo_logo.png` (available in the internal tools repo under `assets/images/`)
- Typography: Barlow Condensed or Montserrat for headers; clean sans-serif for body
