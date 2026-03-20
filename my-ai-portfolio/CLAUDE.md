# CLAUDE.md — AI Product Labs

This file tells Claude Code about this project. Read it before making any changes.

---

## What This Project Is

A personal builder portfolio site for Rahil Popat, hosted at aiproductlabs.co.uk.

This is a **personal brand site** — not a company, not a consultancy.
AI Product Labs is a personal lab for building AI agents and products. One builder, working in public.

Built with: React + Vite, deployed on Vercel.

---

## Site Structure

Three sections, each a scrollable page section or route:

- **About** — Who Rahil is, background, credentials, current stack
- **Agents** — Personal agent projects built and documented openly
- **Insights** — Blog posts and thinking on AI product and agent building

---

## Brand Rules — Read Before Editing Any Copy

This site has specific compliance requirements. Always follow these when editing content:

### Never add or restore:
- Any mention of Rahil's employer or employer's industry
- Job titles that reference professional/employment context (e.g. "Senior AI Product Owner" as a badge or descriptor on the site)
- Tags or badges referencing "Finance", "Asset Management", or any financial services context
- A "What I Bring to the Table" or capabilities/services section — this was intentionally removed
- Any copy that implies Rahil is available for hire, consulting, or freelance work
- Any description of professionally-built systems (RAG systems, agents, platforms built at work)

### Always keep:
- Personal builder framing — everything on this site is personal passion projects
- "AI Product Labs is my personal lab" framing — never a company or agency
- The aeronautical engineering origin story — it's the core brand differentiator
- "Building in public" as a theme throughout
- Credentials (Microsoft cert, Oxford Blockchain, Wits Engineering) — these are personal

### The approved bio (do not change without being asked):
> My foundation is aeronautical engineering — which taught me to treat complex systems with rigour: mapping failure modes, thinking in feedback loops, and defaulting to pragmatic over perfect.
>
> That lens carried into a decade in financial services as a Senior Product Owner, where I worked at the intersection of emerging technology and strategy — across digital assets, tokenisation, and innovation programmes where the constraints were just as tight and the stakes just as real.
>
> Now I apply all of it to building AI agents. The tools changed. The discipline didn't.
>
> AI is moving fast — and I'm learning in public. Every project, decision, and dead end gets documented here, because the best way to help other PMs and engineers navigate this space is to show the journey, not just the destination.

### Approved About subtitle (do not change without being asked):
> Agent Builder · Aeronautical Engineer · Building in Public

### Approved About hero status indicator (do not change without being asked):
> Rendered by `src/components/FlightStatus.jsx` — a three-stage horizontal timeline:
> SYSTEMS READY → READY FOR TAKEOFF → AI(BORNE)
>
> Steps animate in sequentially on page load (300ms, 700ms/1000ms, 1400ms/1700ms delays).
> Connector lines fill between steps. Final stage has a pulsing green dot above the icon.
> "AI" is full teal; "(BORNE)" is 30% teal opacity.

### Approved About tags (only these three):
- AGENT DESIGN
- BUILDING IN PUBLIC
- (one more can be added but must be personal/skill-based, not industry or role-based)

---

## Tech Stack

- React + Vite
- Deployed on Vercel (auto-deploys on push to main)
- Domain: aiproductlabs.co.uk (also aiproductlabs.vercel.app)
- No backend — static site
- Styling: likely CSS modules or Tailwind — check src/ before assuming

---

## Common Tasks

**To add a new agent project:**
Find the Agents section component and add a new card following the same pattern as OpenClaw. Include: title, description, tags, status.

**To add a new insight/blog post:**
Find the Insights section and add a new post card with: category tag, title, excerpt, date, read time.

**To update the stack badges:**
Find the "Current Stack" card in the About section.

**To change copy:**
Always check brand rules above before editing any text. When in doubt, keep it personal and non-professional.

---

## What Not to Do

- Do not add a "Services" or "Hire Me" section
- Do not add contact forms that imply client work
- Do not add any company logos or employer references
- Do not restore the Expertise section — it was intentionally removed
- Do not add social proof that references Rahil's employer
- Do not use language like "enterprise", "clients", or "engagements"
