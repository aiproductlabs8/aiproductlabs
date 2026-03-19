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
      'Enterprise-scale AI environments',
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
      'Stakeholder management & delivery',
    ],
  },
]

const certifications = [
  { icon: <MicrosoftIcon />, acronym: 'AIPM', name: 'AI Product Manager', body: 'Microsoft' },
  { icon: <img src="/cspo.png" alt="Scrum Alliance" style={{ height: '36px', width: 'auto', objectFit: 'contain' }} />, acronym: 'CSPO', name: 'Certified Scrum Product Owner', body: 'Scrum Alliance' },
  { icon: <img src="/oxford.jpeg" alt="University of Oxford" style={{ height: '36px', width: 'auto', objectFit: 'contain' }} />, acronym: 'OBP',  name: 'Oxford Blockchain Programme', body: 'University of Oxford' },
  { icon: <img src="/dacfp.png" alt="DACFP" style={{ height: '36px', width: 'auto', objectFit: 'contain' }} />, acronym: 'DACFP', name: 'Digital Assets Certificate', body: 'DACFP' },
]

function ExpertiseTab() {
  return (
    <div className="tab-content">

      {/* ── Hero ── */}
      <section className="exp-hero">
        <div className="container">
          <div className="exp-hero-inner">

            <div className="exp-hero-text fade-in">
              <div className="hero-badge">
                <span className="hero-badge-dot" />
                Senior AI Product Owner · Invesco
              </div>

              <h1 className="exp-headline">
                I design and deliver<br />
                <span className="accent-text">AI-powered products</span><br />
                that drive real business impact.
              </h1>

              <p className="exp-sub">
                Bridging product strategy, AI engineering, and enterprise delivery
                to build systems that people actually use — at scale.
              </p>

              <div className="exp-stats">
                <div className="estat">
                  <span className="estat-val">5<span className="estat-plus">+</span></span>
                  <span className="estat-label">Years in AI Product</span>
                </div>
                <div className="estat-sep" />
                <div className="estat">
                  <span className="estat-val">10<span className="estat-plus">+</span></span>
                  <span className="estat-label">AI Systems Delivered</span>
                </div>
                <div className="estat-sep" />
                <div className="estat">
                  <span className="estat-val">4</span>
                  <span className="estat-label">Certifications</span>
                </div>
              </div>

              <div className="exp-hero-cta fade-in delay-2">
                <button className="btn btn-primary" onClick={() => {}}>View My Agents</button>
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
                    {['LangChain', 'LangGraph', 'RAG', 'Claude API'].map(t => (
                      <span key={t} className="spill spill-cyan">{t}</span>
                    ))}
                  </div>
                </div>
                <div className="stack-section">
                  <div className="stack-section-label">Cloud Platform</div>
                  <div className="stack-pills">
                    {['Azure AI', 'Copilot Studio', 'Enterprise'].map(t => (
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

      {/* ── Experience ── */}
      <section className="tab-section fade-in delay-3">
        <div className="container">
          <div className="section-hd">
            <span className="section-label">Experience</span>
            <h2 className="section-title">Where I Work</h2>
          </div>
          <div className="exp-role-card">
            <div className="exp-role-logo"><img src="/invesco.jpeg" alt="Invesco" style={{ height: '36px', width: 'auto', objectFit: 'contain', borderRadius: '4px' }} /></div>
            <div className="exp-role-body">
              <div className="exp-role-top">
                <div>
                  <div className="exp-role-title">Senior AI Product Owner</div>
                  <div className="exp-role-meta">Invesco &nbsp;·&nbsp; Finance & Asset Management &nbsp;·&nbsp; <span className="exp-role-current">Current</span></div>
                </div>
                <span className="exp-role-badge">Full-time</span>
              </div>
              <p className="exp-role-desc">
                Leading the design and delivery of AI-powered platforms and digital products across finance and asset management.
                Driving AI initiatives from discovery through production — with a focus on real-world adoption, stakeholder alignment,
                and measurable business outcomes.
              </p>
              <div className="exp-role-tags">
                {['AI Agents', 'Azure AI', 'LangChain', 'RAG', 'Roadmap Ownership', 'Enterprise Delivery'].map(t => (
                  <span key={t} className="tag tag-dim">{t}</span>
                ))}
              </div>
            </div>
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
    icon: '🧠',
    title: 'AI Knowledge Agent',
    desc: 'Enterprise RAG system that ingests complex documentation and surfaces precise, contextual answers — cutting research time dramatically.',
    outcome: 'Faster information retrieval across large, fragmented knowledge bases',
    tags: ['RAG', 'LangChain', 'Azure AI', 'Vector DB'],
    tagClasses: ['tc-cyan', 'tc-purple', 'tc-purple', 'tc-green'],
    delay: 'delay-1',
  },
  {
    icon: '🔬',
    title: 'Research Automation Agent',
    desc: 'Multi-agent system that autonomously gathers, synthesises, and structures research from multiple sources into stakeholder-ready reports.',
    outcome: 'Hours of manual research condensed into structured output in minutes',
    tags: ['Multi-Agent', 'LangGraph', 'LLM', 'Automation'],
    tagClasses: ['tc-purple', 'tc-purple', 'tc-cyan', 'tc-orange'],
    delay: 'delay-2',
  },
  {
    icon: '⚙️',
    title: 'Workflow Optimisation Agent',
    desc: 'AI-driven process analysis that maps existing workflows, identifies bottlenecks, and generates prioritised optimisation recommendations.',
    outcome: 'Measurable reduction in manual process overhead and decision latency',
    tags: ['AI Agent', 'Process Mining', 'LLM', 'Analytics'],
    tagClasses: ['tc-green', 'tc-cyan', 'tc-cyan', 'tc-purple'],
    delay: 'delay-3',
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
              Built with product rigour. Each agent explores a real business problem.
            </p>
          </div>
        </div>
      </section>

      <section className="tab-section fade-in delay-1">
        <div className="container">
          <div className="agents-grid">
            {agents.map(agent => (
              <div key={agent.title} className={`agent-card fade-in ${agent.delay}`}>
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
                <div className="agent-outcome">
                  <span className="agent-outcome-icon">✓</span>
                  <span>{agent.outcome}</span>
                </div>
                <div className="agent-card-footer">
                  <span className="agent-status">
                    <span className="agent-status-dot" />
                    Concept
                  </span>
                  <a href="https://github.com/aiproductlabs8/aiproductlabs" target="_blank" rel="noreferrer" className="agent-cta">
                    View on GitHub <ArrowIcon />
                  </a>
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
    id: 'ai-pm',
    category: 'Product Strategy',
    catClass: 'tc-cyan',
    title: 'The Modern AI PM in the Age of Agents',
    desc: 'The job of a PM used to be translation. That layer is compressing. When agents can take a well-formed problem and produce working code, the PM\'s job shifts — and the spec is becoming the product.',
    date: 'Mar 2026',
    readTime: '12 min read',
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
   ARTICLE PAGE
═══════════════════════════════════════════════════════════ */
function ArticlePage({ onBack }) {
  return (
    <div className="tab-content fade-in">
      <section className="article-hero">
        <div className="container">
          <button className="article-back" onClick={onBack}>
            ← Back to Insights
          </button>
          <div className="article-header">
            <div className="article-header-meta">
              <span className="atag tc-cyan">Product Strategy</span>
              <span className="article-date">Mar 2026 · 12 min read</span>
            </div>
            <h1 className="article-title">The Modern AI PM in the Age of Agents</h1>
            <p className="article-byline">By Rahil Popat · Senior AI Product Owner</p>
          </div>
        </div>
      </section>

      <section className="tab-section tab-section-last">
        <div className="container">
          <div className="article-body-wrap">
            <div className="article-body">

              <p>The job of a PM used to be translation. You talked to customers, synthesized their problems, wrote specs, and handed them to engineers. You were the bridge between "what people need" and "what gets built." The value was in that translation layer.</p>
              <p>That layer is compressing.</p>
              <p>When agents can take a well-formed problem and produce working code, the PM's job shifts. You're no longer translating for engineers. You're forming intent clearly enough that agents can act on it directly.</p>
              <p className="article-callout">The spec is becoming the product.</p>
              <p>I've watched this happen with myself and dozens of other PMs. Previously, a PM would write a detailed spec, hand it off, wait for questions, clarify, wait for implementation, review, give feedback, iterate. The cycle took weeks. Now they write a clear problem statement with constraints, point an agent at it, and review working code in an hour.</p>
              <p>The time between "I know what we should build" and "here it is" collapsed. But the work of knowing what to build didn't get easier. It got more important.</p>
              <p>You don't need to write the code yourself. You need to know what you want clearly enough that an agent can build it. The spec and the prototype are becoming the same thing. You just describe what you want, watch it take shape, course-correct, and iterate. The bottleneck isn't implementation anymore.</p>
              <p>And the speed of shipping is only accelerating. Every big and small AI company is shipping at this pace, thanks to AI coding agents. The cycle times that used to define product development — from quarterly planning, monthly sprints, to weekly releases — are compressing into something closer to continuous deployment of ideas.</p>
              <p>When the implementation barrier drops this fast, the bottleneck shifts upstream. The scarce resource isn't engineering capacity anymore. It's knowing what's actually worth building.</p>

              <h2>The New PM Skillset</h2>

              <div className="article-infographic-float">
                <img src="/infographic.png" alt="AI Is Changing What It Means to Be a Product Manager" />
              </div>

              <h3>Problem Shaping</h3>
              <p>The best PMs I know have always been good at this, but it used to be one skill among many. Now it's THE skill. Can you take an ambiguous customer pain point and shape it into something clear enough that an agent or team of agents can act on it? Can you identify the constraints that actually matter? Can you articulate what success looks like?</p>
              <p>The spec isn't a document anymore. It's a well-formed problem with clear boundaries.</p>

              <h3>Context Curation</h3>
              <p>This is the skill nobody talks about, but every PM who's effective with agents has developed it. The quality of what an agent produces is directly proportional to the context you feed it.</p>
              <p>When I first started working with agents, I'd give vague prompts: "build me a dashboard for customer feedback." I'd get something that technically worked but missed the point entirely. It didn't understand our users, our constraints, what "good" looked like for us.</p>
              <p>Now I maintain context docs that I feed to agents before starting any project. Over time I've figured out what actually matters in these docs:</p>
              <ul>
                <li><strong>The user, specifically.</strong> Not a persona. Real details: who they are, what they care about, what makes them give up, what makes them pay attention.</li>
                <li><strong>The problem in their words.</strong> Direct quotes from calls, tickets, or sales notes. Their language, not your synthesis. This grounds the agent in real pain, not abstracted pain.</li>
                <li><strong>What good looks like.</strong> Examples your team considers well-designed. Your own past work, competitors, adjacent products. Show, don't describe.</li>
                <li><strong>What you've tried and why it failed.</strong> Institutional knowledge that usually lives in people's heads. The approaches you've already killed and the reasons why.</li>
                <li><strong>Constraints that shape the solution.</strong> Not every constraint. Just the ones that will actually change what gets built.</li>
                <li><strong>How you'll know it worked.</strong> Concrete, not fuzzy. Something you could actually measure or observe.</li>
              </ul>
              <p>When I ask an agent to prototype something now, it's not starting from zero. It knows who we're building for, what they actually said, what good looks like, and what's already failed. The output fits because the input was specific.</p>

              <h3>Evaluation and Taste</h3>
              <p>Taste is underrated. But when agents produce output quickly and in bulk, it becomes the most important skill. Is this actually solving the problem? Does it handle the edge cases that matter? Is this the version we should ship or just the version that runs?</p>
              <p>This is harder than it sounds. Agents will confidently produce things that look correct but miss the point entirely. You need reps to develop the taste. There's no shortcut: you have to build things, evaluate them, learn what "good enough to ship" actually feels like versus "technically works."</p>

              <h2>The Mental Model Shift</h2>
              <p><strong>Old model:</strong> PM figures out what to build → writes spec → engineers build it → PM reviews → iterate.</p>
              <p><strong>New model:</strong> PM figures out what to build → PM builds it with agents → PM evaluates → iterates quickly → hands to engineers to go live in prod.</p>
              <p>The AI PM isn't just handing off requirements anymore. They're building the first iteration themselves and getting real feedback on working software, not slide decks or Figma mocks. Engineers then become collaborators on making the product better and production-ready rather than translators of your intent.</p>
              <p>This changes your relationship with the product. You're not describing what you want and hoping it comes back right. You're shaping it directly, in real time.</p>
              <p><strong>Think in iterations.</strong> Let the first version be wrong. Don't try to get it perfect in your head before you start. Give the agent rich context about the problem, then let it take a rough first pass. See what comes out. React. Iterate. You'll learn more from "that's not quite right because..." than from trying to think through every edge case upfront.</p>
              <p>I regularly have agents build two or three completely different approaches just to see which one feels right when I use it. That used to be expensive. Now it's a Tuesday afternoon with a few parallel agents.</p>
              <p><strong>Hold ambiguity longer.</strong> Old PM instinct was to resolve ambiguity into specs as fast as possible. New instinct is to stay in the ambiguous zone while you explore. Don't collapse to a solution too early. Let agents help you understand the solution space before you commit.</p>

              <h2>Getting Started</h2>
              <p>If you're a PM who hasn't worked this way yet, here's how to start:</p>
              <ul>
                <li><strong>Pick a small problem you actually have.</strong> Not an imaginary one. Something that's annoying you right now. A report you have to manually compile. A workflow that's tedious. A prototype you wish existed.</li>
                <li><strong>Spend 30 minutes writing context before you prompt.</strong> See the context curation section above for the full list.</li>
                <li><strong>Point an agent at it and watch what happens.</strong> Don't expect perfection. Expect a starting point. React to it. Guide it. Iterate.</li>
                <li><strong>Do this ten times.</strong> With different problems. Different levels of complexity. You'll develop intuition for what works, what context matters, how to evaluate output. This intuition is the new PM skill.</li>
              </ul>
              <p>The PMs who will thrive are the ones who understand problems so clearly that the solution becomes obvious to them and to the agents they work with. I switch between AI Studio, Cursor, Antigravity and Claude Code depending on the task. The tool matters less than building the muscle of working with agents daily.</p>

              <blockquote>
                "If your job was mostly translating customer needs into documents for engineers, that's a workflow. Workflows get automated. If your job was 'understand problems so deeply that the right solution becomes obvious,' you're more valuable than ever. Agents amplify that understanding into shipped product faster than any team ever could before."
              </blockquote>

              <p>The question every PM should ask: when the translation layer disappears, what's left?</p>
              <p>For the best PMs, the answer is everything that actually mattered. Understanding the problem. User empathy. Judgment. Taste.</p>
              <p className="article-closing">These were always part of the PM job. Now they're becoming the whole job.</p>

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
          <div className="insight-featured fade-in delay-1" onClick={() => onReadMore('ai-pm')} style={{ cursor: 'pointer' }}>
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
            <p className="tab-hero-sub">Senior AI Product Owner · Builder · Aeronautical Engineer</p>
          </div>
        </div>
      </section>

      <section className="tab-section fade-in delay-1">
        <div className="container">
          <div className="about-inner">

            <div className="about-bio">
              <p className="about-p">
                I&apos;m a Senior AI Product Owner at <strong>Invesco</strong>, a global investment management firm.
                I lead the design and delivery of AI-powered platforms — from intelligent agents and RAG systems
                to enterprise automation — with a focus on outcomes that matter to the business.
              </p>
              <p className="about-p">
                My background is in aeronautical engineering, which shapes how I approach complex systems:
                rigorously, with an eye for failure modes and a bias toward pragmatic solutions.
                I bring that same thinking to AI product development.
              </p>
              <p className="about-p">
                Beyond my day role, I build and document AI agents openly — sharing what I learn
                to help other product leaders and engineers navigate this shift confidently.
              </p>

              <div className="about-tags">
                <span className="tag tag-cyan">AI Product Leadership</span>
                <span className="tag tag-purple">Agent Design</span>
                <span className="tag tag-green">Enterprise Delivery</span>
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
                <div className="cred-icon"><img src="/invesco.jpeg" alt="Invesco" style={{ height: '28px', width: 'auto', objectFit: 'contain', borderRadius: '4px' }} /></div>
                <div>
                  <div className="cred-title">Senior AI Product Owner</div>
                  <div className="cred-sub">Invesco · Global Asset Management</div>
                </div>
              </div>
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
                  {['LangChain', 'LangGraph', 'Azure AI', 'RAG', 'Claude API', 'Copilot Studio'].map(t => (
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
    expertise: <ExpertiseTab />,
    agents:    <AgentsTab />,
    insights:  <InsightsTab onReadMore={handleReadMore} />,
    about:     <AboutTab />,
  }

  const articleContent = openArticle === 'ai-pm'
    ? <ArticlePage onBack={handleBack} />
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
