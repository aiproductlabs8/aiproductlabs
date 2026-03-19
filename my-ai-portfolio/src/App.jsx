import { useState } from 'react'
import './App.css'

/* ─── Icons ──────────────────────────────────────────────── */
const ArrowIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
)
const GitHubIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.1 3.3 9.43 7.88 10.97.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.54-3.87-1.54-.53-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.35.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.68 0-1.25.45-2.28 1.18-3.08-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.15 1.18a10.96 10.96 0 0 1 5.74 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.58.23 2.75.11 3.04.74.8 1.18 1.83 1.18 3.08 0 4.41-2.68 5.39-5.24 5.67.41.35.78 1.05.78 2.12v3.14c0 .31.21.67.8.56C20.2 21.43 23.5 17.1 23.5 12 23.5 5.65 18.35.5 12 .5Z" />
  </svg>
)

const ScrumAllianceIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
    <circle cx="20" cy="20" r="20" fill="#E84F3D"/>
    {/* Outer ring */}
    <circle cx="20" cy="20" r="17" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1"/>
    {/* S-curve swoosh — Scrum Alliance style */}
    <path d="M 13 14 C 13 11, 27 11, 27 17 C 27 23, 13 23, 13 29 C 13 35, 27 35, 27 32"
      fill="none" stroke="white" strokeWidth="2.8" strokeLinecap="round"/>
  </svg>
)

const OxfordIcon = () => (
  <svg width="36" height="42" viewBox="0 0 36 42" xmlns="http://www.w3.org/2000/svg">
    {/* Shield shape */}
    <path d="M18 1 L35 7 L35 24 Q35 36 18 41 Q1 36 1 24 L1 7 Z" fill="#002147" stroke="#C8A951" strokeWidth="1.5"/>
    {/* Crown top */}
    <path d="M10 10 L10 7 L13 9 L15 6 L18 9 L21 6 L23 9 L26 7 L26 10 Z" fill="#C8A951"/>
    {/* Book / divider line */}
    <line x1="9" y1="22" x2="27" y2="22" stroke="#C8A951" strokeWidth="1" opacity="0.6"/>
    {/* OX text */}
    <text x="18" y="20" textAnchor="middle" fill="#C8A951" fontSize="9" fontWeight="800" fontFamily="Georgia, serif" letterSpacing="1">OX</text>
    {/* FORD text */}
    <text x="18" y="31" textAnchor="middle" fill="#C8A951" fontSize="7.5" fontWeight="600" fontFamily="Georgia, serif" letterSpacing="0.8">FORD</text>
  </svg>
)

const MicrosoftIcon = () => (
  <svg width="20" height="20" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="0"  y="0"  width="10" height="10" fill="#f25022"/>
    <rect x="11" y="0"  width="10" height="10" fill="#7fba00"/>
    <rect x="0"  y="11" width="10" height="10" fill="#00a4ef"/>
    <rect x="11" y="11" width="10" height="10" fill="#ffb900"/>
  </svg>
)

const TABS = [
  { id: 'about',     label: 'About' },
  { id: 'expertise', label: 'Expertise' },
  { id: 'agents',    label: 'Agents' },
  { id: 'insights',  label: 'Insights' },
]

/* ─── Navbar ─────────────────────────────────────────────── */
function Navbar({ active, onSwitch }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav id="navbar">
      <div className="nav-inner">
        <button className="nav-logo-btn" onClick={() => { onSwitch('about'); setMenuOpen(false) }}>
          <img src="/apl.png" alt="AI Product Labs" className="nav-logo-img" />
        </button>

        <div className={`nav-tabs ${menuOpen ? 'nav-tabs-open' : ''}`} role="tablist">
          {TABS.map(t => (
            <button
              key={t.id}
              role="tab"
              aria-selected={active === t.id}
              className={`nav-tab ${active === t.id ? 'active' : ''}`}
              onClick={() => { onSwitch(t.id); setMenuOpen(false) }}
            >
              {t.label}
            </button>
          ))}
        </div>

        <a href="https://www.linkedin.com/in/rahilpopat" target="_blank" rel="noreferrer" className="btn btn-outline nav-cta">
          LinkedIn
        </a>

        <button className="nav-hamburger" onClick={() => setMenuOpen(p => !p)} aria-label="Toggle menu">
          <span style={{ transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : '' }} />
          <span style={{ opacity: menuOpen ? 0 : 1 }} />
          <span style={{ transform: menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : '' }} />
        </button>
      </div>
    </nav>
  )
}

/* ═══════════════════════════════════════════════════════════
   EXPERTISE TAB
═══════════════════════════════════════════════════════════ */
const capabilities = [
  {
    icon: '🧠',
    title: 'AI Systems',
    accent: 'cap-cyan',
    items: [
      'RAG systems & knowledge pipelines',
      'Agent orchestration with LangChain & LangGraph',
      'LLM-powered workflows & automation',
      'Copilot-style interface design',
    ],
  },
  {
    icon: '☁️',
    title: 'Cloud & Infrastructure',
    accent: 'cap-purple',
    items: [
      'Microsoft Azure AI Services',
      'Cloud AI deployment & monitoring',
      'Production deployment & monitoring',
      'Data pipelines & integrations',
    ],
  },
  {
    icon: '🎯',
    title: 'Product Leadership',
    accent: 'cap-green',
    items: [
      '0 → 1 product development',
      'Roadmap ownership & OKR alignment',
      'Cross-functional team leadership',
      'Ship fast, iterate faster',
    ],
  },
]

const certifications = [
  { icon: <MicrosoftIcon />, acronym: 'AIPM', name: 'AI Product Manager', body: 'Microsoft' },
  { icon: <img src="/cspo.png" alt="Scrum Alliance" style={{ height: '36px', width: 'auto', objectFit: 'contain' }} />, acronym: 'CSPO', name: 'Certified Scrum Product Owner', body: 'Scrum Alliance' },
  { icon: <img src="/oxford.jpeg" alt="University of Oxford" style={{ height: '36px', width: 'auto', objectFit: 'contain' }} />, acronym: 'OBP',  name: 'Oxford Blockchain Programme', body: 'University of Oxford' },
  { icon: <img src="/dacfp.png" alt="DACFP" style={{ height: '36px', width: 'auto', objectFit: 'contain' }} />, acronym: 'DACFP', name: 'Digital Assets Certificate', body: 'DACFP' },
]

function ExpertiseTab({ onSwitch }) {
  return (
    <div className="tab-content">

      {/* ── Hero ── */}
      <section className="exp-hero">
        <div className="container">
          <div className="exp-hero-inner">

            <div className="exp-hero-text fade-in">
              <div className="hero-badge">
                <span className="hero-badge-dot" />
                Senior AI Product Owner
              </div>

              <h1 className="exp-headline">
                I build<br />
                <span className="accent-text">AI products & agents</span><br />
                and share everything I learn.
              </h1>

              <p className="exp-sub">
                From side projects to production — building in public and documenting the journey.
              </p>

              <div className="exp-stats">
                <div className="estat">
                  <span className="estat-val">5<span className="estat-plus">+</span></span>
                  <span className="estat-label">Years in AI Product</span>
                </div>
                <div className="estat-sep" />
                <div className="estat">
                  <span className="estat-val">4</span>
                  <span className="estat-label">Certifications</span>
                </div>
                <div className="estat-sep" />
                <div className="estat">
                  <span className="estat-val">∞</span>
                  <span className="estat-label">Passion</span>
                </div>
              </div>

              <div className="exp-hero-cta fade-in delay-2">
                <button className="btn btn-primary" onClick={() => onSwitch('agents')}>View My Agents</button>
                <a href="https://www.linkedin.com/in/rahilpopat" target="_blank" rel="noreferrer" className="btn btn-outline">Connect →</a>
              </div>
            </div>

            <div className="exp-hero-card fade-in delay-1">
              <div className="stack-card">
                <div className="stack-card-header">
                  <span className="stack-live-dot" />
                  <span className="stack-card-title">AI Product Stack</span>
                </div>
                <div className="stack-section">
                  <div className="stack-section-label">Agents & LLMs</div>
                  <div className="stack-pills">
                    {['LangChain', 'LangGraph', 'RAG', 'Claude API', 'OpenClaw', 'Claude Code'].map(t => (
                      <span key={t} className="spill spill-cyan">{t}</span>
                    ))}
                  </div>
                </div>
                <div className="stack-section">
                  <div className="stack-section-label">Cloud Platform</div>
                  <div className="stack-pills">
                    {['Azure AI', 'Copilot Studio'].map(t => (
                      <span key={t} className="spill spill-purple">{t}</span>
                    ))}
                  </div>
                </div>
                <div className="stack-section">
                  <div className="stack-section-label">Product Delivery</div>
                  <div className="stack-pills">
                    {['0→1 Builds', 'Roadmaps', 'OKRs', 'Agile'].map(t => (
                      <span key={t} className="spill spill-green">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Capabilities ── */}
      <section className="tab-section fade-in delay-2">
        <div className="container">
          <div className="section-hd">
            <span className="section-label">Capabilities</span>
            <h2 className="section-title">What I Bring to the Table</h2>
          </div>
          <div className="cap-grid">
            {capabilities.map(cap => (
              <div key={cap.title} className={`cap-card ${cap.accent}`}>
                <div className="cap-icon">{cap.icon}</div>
                <h3 className="cap-title">{cap.title}</h3>
                <ul className="cap-list">
                  {cap.items.map(item => (
                    <li key={item}>
                      <span className="cap-check">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Certifications ── */}
      <section className="tab-section tab-section-last fade-in delay-3">
        <div className="container">
          <div className="section-hd">
            <span className="section-label">Credentials</span>
            <h2 className="section-title">Certifications</h2>
          </div>
          <div className="cert-grid">
            {certifications.map(cert => (
              <div key={cert.acronym} className="cert-card">
                <div className="cert-icon">{cert.icon}</div>
                <div className="cert-acronym">{cert.acronym}</div>
                <div className="cert-name">{cert.name}</div>
                <div className="cert-body">{cert.body}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}

/* ═══════════════════════════════════════════════════════════
   AGENTS TAB
═══════════════════════════════════════════════════════════ */
const agents = [
  {
    icon: '🦞',
    title: 'OpenClaw Personal Research Assistant',
    desc: 'A personal AI research agent built with OpenClaw and Claude Code, running on a Raspberry Pi. Autonomously gathers and synthesises information to answer research queries on demand.',
    tags: ['OpenClaw', 'Claude Code', 'Raspberry Pi'],
    tagClasses: ['tc-cyan', 'tc-purple', 'tc-green'],
    delay: 'delay-1',
    comingSoon: true,
  },
  {
    icon: '🔧',
    title: 'Coming Soon',
    desc: 'Another agent is in the works. Check back soon.',
    tags: [],
    tagClasses: [],
    delay: 'delay-2',
    comingSoon: true,
  },
  {
    icon: '🔧',
    title: 'Coming Soon',
    desc: 'Another agent is in the works. Check back soon.',
    tags: [],
    tagClasses: [],
    delay: 'delay-3',
    comingSoon: true,
  },
]

function AgentsTab() {
  return (
    <div className="tab-content">
      <section className="tab-section-hero fade-in">
        <div className="container">
          <div className="tab-hero-text">
            <span className="section-label">Agents</span>
            <h1 className="tab-hero-headline">AI Systems & Agents</h1>
            <p className="tab-hero-sub">
              Personal agents I've built and documented openly.
            </p>
          </div>
        </div>
      </section>

      <section className="tab-section fade-in delay-1">
        <div className="container">
          <div className="agents-grid">
            {agents.map((agent, idx) => (
              <div key={idx} className={`agent-card fade-in ${agent.delay}${agent.comingSoon ? ' agent-card-soon' : ''}`}>
                <div className="agent-card-top">
                  <div className="agent-icon">{agent.icon}</div>
                  <div className="agent-tags">
                    {agent.tags.map((t, i) => (
                      <span key={t} className={`atag ${agent.tagClasses[i]}`}>{t}</span>
                    ))}
                  </div>
                </div>
                <h3 className="agent-title">{agent.title}</h3>
                <p className="agent-desc">{agent.desc}</p>
                <div className="agent-card-footer">
                  <span className="agent-status">
                    <span className="agent-status-dot" />
                    {agent.comingSoon ? 'Under Construction' : 'Live'}
                  </span>
                  {!agent.comingSoon && (
                    <a href="https://github.com/aiproductlabs8/aiproductlabs" target="_blank" rel="noreferrer" className="agent-cta">
                      View on GitHub <ArrowIcon />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}

/* ═══════════════════════════════════════════════════════════
   INSIGHTS TAB
═══════════════════════════════════════════════════════════ */
const insights = [
  {
    id: 'aero-to-ai',
    category: 'Career & Perspective',
    catClass: 'tc-cyan',
    title: 'From Aeronautical Engineering to AI Product Management',
    desc: 'The two worlds sound nothing alike. One involves flight dynamics and wind tunnels. The other involves sprint planning and model evaluation. But the discipline transfers more than you\'d think.',
    date: 'Mar 2026',
    readTime: '10 min read',
    featured: true,
    delay: 'delay-1',
  },
  {
    id: 'pm-fundamentals',
    category: 'Product Management',
    catClass: 'tc-purple',
    title: 'Product Management Fundamentals Every PM Should Know',
    desc: 'The best PMs aren\'t the ones who know the most frameworks. They\'re the ones who are consistently good at a few core things.',
    date: 'Mar 2026',
    readTime: '8 min read',
    featured: false,
    delay: 'delay-2',
  },
]

/* ═══════════════════════════════════════════════════════════
   ARTICLE PAGES
═══════════════════════════════════════════════════════════ */
function AeroToAiPage({ onBack }) {
  return (
    <div className="tab-content fade-in">
      <section className="article-hero">
        <div className="container">
          <button className="article-back" onClick={onBack}>← Back to Insights</button>
          <div className="article-header">
            <div className="article-header-meta">
              <span className="atag tc-cyan">Career & Perspective</span>
              <span className="article-date">Mar 2026 · 10 min read</span>
            </div>
            <h1 className="article-title">From Aeronautical Engineering to AI Product Management</h1>
            <p className="article-byline">By Rahil Popat · Senior AI Product Owner</p>
          </div>
        </div>
      </section>

      <section className="tab-section tab-section-last">
        <div className="container">
          <div className="article-body-wrap">
            <div className="article-body">

              <p>When I tell people I moved from aeronautical engineering into AI product management, the reaction is usually a polite tilt of the head — as if I&apos;d announced a career change from deep-sea diving to competitive baking. The two worlds sound nothing alike. One involves flight dynamics, structural loads, and wind tunnels. The other involves sprint planning, user interviews, and model evaluation.</p>
              <p>But the further I&apos;ve gone into AI product work, the more I&apos;ve realised the foundations were already there — laid in every system I designed, every failure mode I analysed, every constraint I had to work around. The language changed. The discipline didn&apos;t.</p>

              <h2>Both fields begin with constraints, not possibilities</h2>
              <p>In aeronautics, you never start with a blank canvas. You start with physics. Structural limits, fuel budgets, regulatory envelopes — every design decision is a negotiation with hard boundaries. The engineer&apos;s job isn&apos;t to dream freely; it&apos;s to find the optimal solution within ruthless constraint.</p>
              <p>AI product management works the same way, even if the constraints are less visible. Model capability ceilings, latency budgets, data availability, safety guardrails, cost per inference — these aren&apos;t obstacles to creativity, they define it. The best AI PMs I&apos;ve encountered think like engineers: they map the envelope before they plot the course.</p>

              <div className="article-comparison-table">
                <div className="act-row act-header">
                  <div className="act-col">Aeronautical</div>
                  <div className="act-col">AI Product</div>
                </div>
                <div className="act-row">
                  <div className="act-col"><strong>Flight envelope analysis</strong><br /><span>Defining the operational boundaries a craft can safely fly within — speed, altitude, load factor.</span></div>
                  <div className="act-col"><strong>Model capability mapping</strong><br /><span>Defining where the model performs reliably and where it degrades — latency, accuracy, edge cases.</span></div>
                </div>
                <div className="act-row">
                  <div className="act-col"><strong>Failure mode &amp; effects analysis</strong><br /><span>Systematically identifying what breaks, how it breaks, and what the downstream consequences are.</span></div>
                  <div className="act-col"><strong>Red-teaming &amp; eval design</strong><br /><span>Stress-testing the system against adversarial inputs, distributional shift, and unexpected user behaviour.</span></div>
                </div>
                <div className="act-row">
                  <div className="act-col"><strong>Iterative wind tunnel testing</strong><br /><span>Build a prototype, expose it to real conditions, measure delta from expected, refine the design.</span></div>
                  <div className="act-col"><strong>Prompt &amp; experiment iteration</strong><br /><span>Ship a version, gather real usage data, measure against benchmarks, adjust system design.</span></div>
                </div>
              </div>

              <h2>Systems thinking is systems thinking</h2>
              <p>An aircraft is not a collection of components. It is a system of systems — where a change in the propulsion subsystem propagates into thermal management, which affects materials choices, which changes the weight budget, which loops back to propulsion. You learn, very quickly, to hold the whole picture in your head while working on any individual part.</p>
              <p>AI products are identical in spirit. Change the retrieval strategy in a RAG pipeline and you alter latency, which affects UX, which changes where users drop off, which feeds back into what data you need to collect. The engineer&apos;s instinct to trace second and third-order effects is not a habit you have to learn for AI — it&apos;s one you already have.</p>

              <blockquote>
                &quot;The engineer&apos;s instinct to trace second and third-order effects is not a habit you have to learn for AI — it&apos;s one you already have.&quot;
              </blockquote>

              <h2>Uncertainty is the material you work with</h2>
              <p>Engineering schools teach you to be precise. What they actually teach you — underneath the equations — is how to make good decisions with incomplete information under time pressure. A structural engineer doesn&apos;t know exactly how a wing will flex in a once-in-a-decade gust. They design for it anyway, using probabilistic load cases and safety margins.</p>
              <p>AI product management is the same exercise in a different medium. You don&apos;t know how users will prompt your product. You don&apos;t know exactly how the model will behave on tomorrow&apos;s distribution. You design evaluation frameworks, set confidence thresholds, build human-in-the-loop safety nets — and ship anyway. The posture is identical. The vocabulary is different.</p>

              <p className="article-callout">✈ In both fields, the job is to make a complex, partially unpredictable system behave reliably for the people depending on it.</p>

              <h2>Certification culture and the AI safety moment</h2>
              <p>Aviation is one of the most heavily regulated industries on earth, and for good reason. The consequence of failure is catastrophic and often irreversible. As a result, aeronautical engineers develop an almost instinctive relationship with documentation, traceability, and sign-off culture. Nothing ships without a paper trail.</p>
              <p>AI is in the early stages of building exactly this kind of rigour — and it desperately needs people who already understand why it matters. The emerging landscape of AI governance, safety evals, model cards, and deployment audits maps almost directly onto the design assurance frameworks I worked within as an engineer. If you have an aerospace background, you&apos;re not new to this conversation. You&apos;ve been living it.</p>

              <h2>What actually changed</h2>
              <p>Honesty matters here. The transition was not frictionless. Engineering produces artefacts — drawings, simulations, test reports — where correctness is binary or at least measurable. Product management produces decisions, alignment, and momentum, where quality is far harder to assess. Learning to operate in that ambiguity, to lead without formal authority, to communicate in the language of business outcomes rather than technical specifications — that took real work.</p>
              <p>But the mental model I brought from aeronautics — the instinct to decompose complexity, to reason about failure, to think in systems, to respect constraints — turned out to be an advantage rather than a relic. Not a bridge I had to build. A runway I&apos;d already constructed.</p>

              <p className="article-closing">If you&apos;re an engineer considering a move into AI product management — or trying to explain to someone why that move makes sense — the short version is this: the discipline transfers. The altitude changes. The physics stay the same.</p>

            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function PmFundamentalsPage({ onBack }) {
  return (
    <div className="tab-content fade-in">
      <section className="article-hero">
        <div className="container">
          <button className="article-back" onClick={onBack}>← Back to Insights</button>
          <div className="article-header">
            <div className="article-header-meta">
              <span className="atag tc-purple">Product Management</span>
              <span className="article-date">Mar 2026 · 8 min read</span>
            </div>
            <h1 className="article-title">Product Management Fundamentals Every PM Should Know</h1>
            <p className="article-byline">By Rahil Popat · Senior AI Product Owner</p>
          </div>
        </div>
      </section>

      <section className="tab-section tab-section-last">
        <div className="container">
          <div className="article-body-wrap">
            <div className="article-body">

              <p>There&apos;s a lot of noise around product management right now.</p>
              <p>Frameworks, tools, AI, roadmaps, strategies…</p>
              <p>But when you strip it all back, the fundamentals haven&apos;t changed.</p>
              <p>The best PMs I&apos;ve seen aren&apos;t the ones who know the most frameworks. They&apos;re the ones who are consistently good at a few core things.</p>

              <h2>1. Start with the problem, not the solution</h2>
              <p>This is where most people go wrong.</p>
              <p>It&apos;s easy to jump into: &quot;Let&apos;s build this feature&quot;, &quot;Let&apos;s copy what competitors are doing&quot;, or &quot;Let&apos;s use this new tech.&quot;</p>
              <p>But strong PMs pause and ask: <strong>What problem are we actually solving?</strong></p>
              <p>And more importantly — who is experiencing it? How often does it happen? How painful is it?</p>
              <p>If the problem isn&apos;t clear, nothing else will be.</p>

              <h2>2. Talk to real users (not just dashboards)</h2>
              <p>Data is useful. But it doesn&apos;t tell you everything.</p>
              <p>You need to hear how users describe their problems, what frustrates them, and what they actually care about.</p>
              <p>There&apos;s a big difference between <em>&quot;Users drop off at step 3&quot;</em> and <em>&quot;I didn&apos;t trust what was happening here so I left.&quot;</em></p>
              <p>That second one is where the insight is.</p>

              <h2>3. Prioritisation is your real job</h2>
              <p>Every PM says they prioritise. Very few actually do it well.</p>
              <p>You will always have too many ideas, too many requests, and not enough time.</p>
              <p>Your job is to decide: what matters now, what can wait, and what should be ignored completely.</p>
              <p className="article-callout">If everything is a priority, nothing is.</p>

              <h2>4. Clarity beats complexity</h2>
              <p>A good PM makes things simple — not by dumbing things down, but by removing unnecessary confusion.</p>
              <p>That means clear problem statements, clear success metrics, and clear direction for the team.</p>
              <p>If your team is confused, that&apos;s usually a signal your thinking isn&apos;t clear yet.</p>

              <div className="article-infographic-float">
                <img src="/infographic2.png" alt="Product Management Fundamentals Every PM Should Know" />
              </div>

              <h2>5. Define what success looks like upfront</h2>
              <p>Before anything gets built, you should know: <strong>How will we know this worked?</strong></p>
              <p>Not vague answers like &quot;better experience&quot; or &quot;more engagement.&quot; Something concrete — increased conversion, reduced drop-off, faster completion time.</p>
              <p>If you can&apos;t measure it, you won&apos;t learn from it.</p>

              <h2>6. Shipping matters more than planning</h2>
              <p>Planning is important. But it&apos;s easy to overdo it.</p>
              <p>You don&apos;t learn from documents, slides, or discussions. You learn from real users interacting with real products.</p>
              <p>Get something out. Even if it&apos;s not perfect. Iteration beats perfection every time.</p>

              <h2>7. Work closely with engineers and designers</h2>
              <p>Product isn&apos;t built in isolation. The best outcomes come when engineers challenge your thinking, designers shape the experience, and everyone contributes early.</p>
              <p>If you&apos;re just &quot;handing things over,&quot; you&apos;re missing value.</p>

              <h2>8. Say no more often</h2>
              <p>This is one of the hardest skills. You&apos;ll get pressure from stakeholders, leadership, and customers. But saying yes to everything creates noise.</p>
              <p>Strong PMs protect focus. Sometimes the best decision is: <em>&quot;We&apos;re not doing this right now.&quot;</em></p>

              <h2>9. Stay close to the product</h2>
              <p>You should regularly use your own product, test new features, and observe where things feel off.</p>
              <p>You don&apos;t need to rely on reports for everything. If something feels clunky, it probably is.</p>

              <h2>10. Keep learning from what you ship</h2>
              <p>Every release is feedback. Some things will work. Some won&apos;t. The key is: understand why, adjust quickly, and improve continuously.</p>
              <p>Good PMs don&apos;t just ship — they learn.</p>

              <blockquote>
                &quot;Product management isn&apos;t about fancy frameworks or perfect roadmaps. At its core, it&apos;s simple: understand real problems, make good decisions, and build things that actually help.&quot;
              </blockquote>

              <p>If you get those right, everything else becomes easier.</p>
              <p className="article-closing">If you don&apos;t, no tool or framework will save you.</p>

            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function InsightsTab({ onReadMore }) {
  const [featured, ...rest] = insights

  return (
    <div className="tab-content">
      <section className="tab-section-hero fade-in">
        <div className="container">
          <div className="tab-hero-text">
            <span className="section-label">Insights</span>
            <h1 className="tab-hero-headline">Thinking Out Loud on AI</h1>
            <p className="tab-hero-sub">
              Notes on AI product thinking, agent architecture, and what it actually takes to ship in production.
            </p>
          </div>
        </div>
      </section>

      <section className="tab-section fade-in delay-1">
        <div className="container">
          <div className="insight-featured fade-in delay-1" onClick={() => onReadMore(featured.id)} style={{ cursor: 'pointer' }}>
            <div className="insight-feat-left">
              <div className="insight-feat-inner">
                <span className={`atag ${featured.catClass}`}>{featured.category}</span>
                <h2 className="insight-feat-title">{featured.title}</h2>
                <p className="insight-feat-desc">{featured.desc}</p>
                <div className="insight-feat-footer">
                  <span className="insight-meta">{featured.date}{featured.readTime ? ` · ${featured.readTime}` : ''}</span>
                  <span className="insight-readmore">Read More <ArrowIcon /></span>
                </div>
              </div>
            </div>
            <div className="insight-feat-visual">
              <div className="insight-feat-deco">
                <span className="ifd-line" />
                <span className="ifd-quote">"</span>
                <span className="ifd-line" />
              </div>
            </div>
          </div>

          <div className="insights-grid">
            {rest.map(post => (
              <div key={post.title} className={`insight-card fade-in ${post.delay}`} onClick={() => onReadMore(post.id)} style={{ cursor: 'pointer' }}>
                <span className={`atag ${post.catClass}`}>{post.category}</span>
                <h3 className="insight-card-title">{post.title}</h3>
                <p className="insight-card-desc">{post.desc}</p>
                <div className="insight-card-footer">
                  <span className="insight-meta">{post.date}{post.readTime ? ` · ${post.readTime}` : ''}</span>
                  <span className="insight-readmore">Read More <ArrowIcon /></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════
   ABOUT TAB
═══════════════════════════════════════════════════════════ */
function AboutTab() {
  return (
    <div className="tab-content">
      <section className="tab-section-hero fade-in">
        <div className="container">
          <div className="tab-hero-text">
            <span className="section-label">About</span>
            <h1 className="tab-hero-headline">Rahil Popat</h1>
            <p className="tab-hero-sub">AI Product Management · Agent Builder · Aeronautical Engineer</p>
          </div>
        </div>
      </section>

      <section className="tab-section fade-in delay-1">
        <div className="container">
          <div className="about-inner">

            <div className="about-bio">
              <p className="about-p">
                I build AI products by day and AI agents by night.
              </p>
              <p className="about-p">
                Professionally, I&apos;m a Senior AI Product Owner — building intelligent agents, RAG systems, and AI-powered platforms.
              </p>
              <p className="about-p">
                My foundation is aeronautical engineering, which taught me to treat complex systems with rigour: mapping failure modes, thinking in feedback loops, and defaulting to pragmatic over perfect. That lens shapes everything I build.
              </p>
              <p className="about-p">
                I document my passion projects and learnings from my agent-building journey openly — because the best way to help other PMs and engineers make the leap into AI building is to show the work.
              </p>

              <div className="about-tags">
                <span className="tag tag-cyan">AI Product Leadership</span>
                <span className="tag tag-purple">Agent Design</span>
                <span className="tag tag-green">Building in Public</span>
                <span className="tag tag-orange">Finance & Asset Management</span>
              </div>

              <div className="about-links">
                <a href="https://github.com/aiproductlabs8/aiproductlabs" target="_blank" rel="noreferrer" className="btn btn-outline">
                  <GitHubIcon /> GitHub
                </a>
                <a href="https://www.linkedin.com/in/rahilpopat" target="_blank" rel="noreferrer" className="btn btn-primary">
                  Connect on LinkedIn
                </a>
              </div>
            </div>

            <div className="about-credentials">
              <div className="cred-card">
                <div className="cred-icon"><MicrosoftIcon /></div>
                <div>
                  <div className="cred-title">Certified AI Product Manager</div>
                  <div className="cred-sub">Microsoft</div>
                </div>
              </div>
              <div className="cred-card">
                <div className="cred-icon"><img src="/wits.jpg" alt="Wits University" style={{ height: '28px', width: 'auto', objectFit: 'contain' }} /></div>
                <div>
                  <div className="cred-title">Aeronautical Engineering</div>
                  <div className="cred-sub">University of the Witwatersrand</div>
                </div>
              </div>
              <div className="cred-card">
                <div className="cred-icon"><img src="/oxford.jpeg" alt="University of Oxford" style={{ height: '28px', width: 'auto', objectFit: 'contain' }} /></div>
                <div>
                  <div className="cred-title">Oxford Blockchain Programme</div>
                  <div className="cred-sub">University of Oxford</div>
                </div>
              </div>

              <div className="about-stack-card">
                <div className="about-stack-label">Current Stack</div>
                <div className="about-stack-items">
                  {['LangChain', 'LangGraph', 'Azure AI', 'RAG', 'Claude API', 'Copilot Studio', 'OpenClaw', 'Claude Code'].map(t => (
                    <span key={t} className="spill spill-cyan">{t}</span>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  )
}

/* ─── Footer ─────────────────────────────────────────────── */
function Footer({ onSwitch }) {
  return (
    <footer id="footer">
      <div className="container footer-inner">
        <button className="footer-logo" onClick={() => onSwitch('expertise')}>
          Rahil<span>.</span>
        </button>
        <div className="footer-nav">
          {TABS.map(t => (
            <button key={t.id} className="footer-nav-link" onClick={() => onSwitch(t.id)}>
              {t.label}
            </button>
          ))}
        </div>
        <span className="footer-copy">© 2026 Rahil Popat · Built with Claude · All thoughts and insights are my own.</span>
      </div>
    </footer>
  )
}

/* ═══════════════════════════════════════════════════════════
   APP
═══════════════════════════════════════════════════════════ */
export default function App() {
  const [activeTab, setActiveTab] = useState('about')
  const [openArticle, setOpenArticle] = useState(null)

  const handleSwitch = (tab) => {
    setActiveTab(tab)
    setOpenArticle(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleReadMore = (id) => {
    setOpenArticle(id)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleBack = () => {
    setOpenArticle(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const TAB_CONTENT = {
    expertise: <ExpertiseTab onSwitch={handleSwitch} />,
    agents:    <AgentsTab />,
    insights:  <InsightsTab onReadMore={handleReadMore} />,
    about:     <AboutTab />,
  }

  const articleContent = openArticle === 'aero-to-ai'
    ? <AeroToAiPage onBack={handleBack} />
    : openArticle === 'pm-fundamentals'
    ? <PmFundamentalsPage onBack={handleBack} />
    : null

  return (
    <>
      <Navbar active={activeTab} onSwitch={handleSwitch} />
      <main className="main">
        {articleContent ? (
          <div className="tab-pane">{articleContent}</div>
        ) : (
          <div key={activeTab} className="tab-pane">
            {TAB_CONTENT[activeTab]}
          </div>
        )}
      </main>
      <Footer onSwitch={handleSwitch} />
    </>
  )
}
