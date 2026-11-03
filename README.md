# Lydia Portfolio

> **2026 Fall US UX Internship**  · Product Designer  
> **UI language:** English only · **Doc language:** English (this README)

---

## 1. Purpose & Goals

**One-line positioning:** "A designer who finds the real problem between users and business"

| Goal | Criteria |
|------|------|
| Land interview calls | A recruiter can decide "this person is good" within 30 seconds |
| Communicate case studies | A senior designer can grasp the thinking process and impact within 3 minutes |
| Be remembered in one sentence | After closing the portfolio, Lydia stays as "the designer who asks why first" |

---

## 2. Core Target Users

| User | Traits | What they need from the portfolio |
|------|------|------------------------|
| Recruiter | Decides in 5–10 seconds, scans quickly | First impression, clear structure, one-line positioning |
| Senior designer | Values thinking process and business impact | Problem definition, rationale for decisions, result metrics |
| Interviewer | Evaluates domain understanding and problem definition | Depth per case, experience across diverse domains |

---

## 3. UX Direction & Principles

### Self-branding
> A designer who solves problems where user pain points meet the organization's business

### Direction
- **Clear information hierarchy** → the most important thing is seen first
- **Proof over explanation** → show it through projects, not copy
- **Fast to scan** → a recruiter can grasp the essentials in one scroll

### Principles
1. **Less is more** — minimize content, maximize impact
2. **Motion with purpose** — animate only when it means something
3. **Consistency** — keep components, typography, and spacing consistent
4. **Business impact first** — state the result/impact for every project

### Agent editing principle
- **Change only what was requested. Never touch earlier values that were not mentioned.**

### What we don't do (Anti-patterns)
- Show-off interactions such as scroll progress bars or particle backgrounds
- Small text or low contrast that recruiters can't read
- Leaving layouts broken on mobile

---

## 4. Tech Stack

### Current (deployed & implemented)

| Area | Technology |
|------|------|
| Markup | HTML5 (semantic) |
| Styling | Vanilla CSS (CSS Variables, Manrope) |
| Interaction | Vanilla JavaScript (ES6+) |
| Deployment | GitHub Pages / Netlify (static) |

### Roadmap (gradual migration)

| Area | Technology |
|------|------|
| Framework | Next.js (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Deployment | Vercel |

**Rule:** One task = edit either the legacy site **or** Next, never both. Details → [`rules/portfolio-rules.md`](rules/portfolio-rules.md)

---

## 5. Site Structure

### GNB (all pages)

```
[ Lydia → Home ]    Work · Lab · Article · About    [ LinkedIn (hover: Let's Talk!) → LinkedIn ]
```

| Item | Rule |
|------|------|
| Lydia | Home (`/` or `../`) |
| Work / Lab / Article / About | Each sub-page |
| **LinkedIn** (hover: **Let's Talk!**) | Far right of the GNB · opens LinkedIn in a new tab · do not change the wording |

### Pages & Home whitelist

| Path | File | Allowed sections |
|------|------|-----------|
| `/` | `index.html` | Hero, Selected Work **4**, Proof strip (story-strip) |
| `/work/` | `work/index.html` | Filters + case grid |
| `/about/` | `about/index.html` | Intro, skills, (optional) Resume PDF |
| `/lab/` | `lab/index.html` | Experiment & process tiles |
| `/article/` | `article/index.html` | Article list |
| `/resume/` | `resume/index.html` | Experience & PDF (not in the GNB menu) |

**Not on Home (until requested):** Referrals, Contact CTA section, contact form, Hero LinkedIn button

---

## 6. Layout

### Breakpoints

| Name | Range |
|------|------|
| Desktop | 1281px – 3840px |
| Tablet | 769px – 1280px |
| Mobile | 320px – 768px |

### Side margins

| Range | Margin |
|------|------|
| Desktop / Tablet | 40px (`section__inner`, footer, etc.) |
| Mobile | 20px |

### Grid

- Home Selected Work: Desktop **2×2**, gap **32px** (Tablet 28px / Mobile 20px)
- max-width: **1200px**

---

## 7. Locked copy (do not edit without approval)

| Key | Text |
|-----|------|
| `hero.headline` | I'm obsessed with finding the real problem — where users and business meet. |
| `gnb.cta` | LinkedIn (hover: Let's Talk!) |
| `gnb.cta.url` | `https://www.linkedin.com/in/lydia-jeongeun-oh-2142a8198/` |

---

## 8. Case Study Template (`/work/[slug]` — later)

1. Overview · 2. Role / Timeline / Team · 3. Problem · 4. Process · 5. Outcome · 6. Learnings (≤3)

Blocks without content are not rendered.

---

## 9. Run Locally

```bash
# Static site (current)
npx serve .

# Or with Python
python3 -m http.server 8080
```

---

## 10. Prohibited Rules (summary)

- No adding sections, animations, or icons that weren't requested
- No writing text outside the locked copy / content inventory
- Colors via CSS Variables only (`styles.css` `:root`)
- Avoid large edits across multiple pages in one task
- Never change English UI copy to Korean

Full list → [`rules/portfolio-rules.md`](rules/portfolio-rules.md)

---

## 11. Agent Entry Points

| File | Role |
|------|------|
| **README.md** | This file (shared summary for people and agents) |
| **CLAUDE.md** | Quick reference for agents |
| **rules/portfolio-rules.md** | Required rules when working |
| **docs/design-system.md** | Tokens & components |

---

## 12. Definition of Done (DoD)

- [ ] GNB: Lydia + 4 menus + **LinkedIn** (every page)
- [ ] Home: Hero + Work 4 + Proof, no Referrals/Contact sections
- [ ] Hero copy matches §5
- [ ] Margins 40px / 20px
- [ ] No placeholders or lorem ipsum (after the inventory is applied)

---

## 13. Later

- [ ] Next.js migration
- [ ] Design system, content inventory, motion guide
- [ ] Finalize LinkedIn URL

*Last updated: 2026-05-16 (added target users, goals, and UX principles)*
