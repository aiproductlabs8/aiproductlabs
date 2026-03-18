import { useState, useEffect, useRef } from 'react'
import './App.css'

/* ─── Navbar ─────────────────────────────────────────────── */
function Navbar() {
  const navRef = useRef(null)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (navRef.current) {
        navRef.current.style.padding = window.scrollY > 60 ? '12px 0' : '20px 0'
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav id="navbar" ref={navRef}>
      <div className="container nav-container">
        <a className="nav-logo" href="#hero">
          Rahil<span>.</span>
        </a>

        <ul className={`nav-links ${menuOpen ? 'nav-open' : ''}`}>
          <li><a href="#featured" onClick={() => setMenuOpen(false)}>Projects</a></li>
          <li><a href="#experiments" onClick={() => setMenuOpen(false)}>Experiments</a></li>
          <li><a href="#writing" onClick={() => setMenuOpen(false)}>Writing</a></li>
          <li><a href="#newsletter" onClick={() => setMenuOpen(false)}>Newsletter</a></li>
        </ul>

        <a
          href="mailto:hello@rahilpopat.com"
          className="btn btn-outline nav-cta"
        >
          Get in Touch
        </a>

        <button
          className="nav-hamburger"
          onClick={() => setMenuOpen(p => !p)}
          aria-label="Toggle menu"
        >
          <span style={{ transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : '' }} />
          <span style={{ opacity: menuOpen ? 0 : 1 }} />
          <span style={{ transform: menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : '' }} />
        </button>
      </div>
    </nav>
  )
}

/* ─── Hero ───────────────────────────────────────────────── */
function Hero() {
  return (
    <section id="hero">
      <div className="container">
        <div className="hero-inner">

          <div className="hero-content">
            <div className="hero-badge reveal">
              <span className="hero-badge-dot" />
              AI Product Manager → AI Builder
            </div>

            <h1 className="hero-name reveal reveal-delay-1">
              Rahil<br /><span className="accent-text">Popat</span>
            </h1>

            <p className="hero-title reveal reveal-delay-2">
              Building agents. Shipping products. Learning in public.
            </p>

            <p className="hero-desc reveal reveal-delay-2">
              I bridge the gap between product thinking and AI engineering.
              From zero-to-one AI products to autonomous multi-agent systems —
              I build things that matter and share everything along the way.
            </p>

            <div className="hero-cta reveal reveal-delay-3">
              <a href="#featured" className="btn btn-primary">View Projects</a>
              <a href="#writing" className="btn btn-outline">Read the Blog →</a>
            </div>

            <div className="hero-stats reveal reveal-delay-4">
              <div>
                <div className="hero-stat-num">12<span>+</span></div>
                <div className="hero-stat-label">AI Projects</div>
              </div>
              <div>
                <div className="hero-stat-num">5</div>
                <div className="hero-stat-label">Live Agents</div>
              </div>
              <div>
                <div className="hero-stat-num">3<span>k+</span></div>
                <div className="hero-stat-label">Subscribers</div>
              </div>
            </div>
          </div>

          <div className="hero-visual reveal reveal-delay-3">
            <div className="hero-card">
              <div className="hero-card-bar">
                <span className="dot dot-red" />
                <span className="dot dot-yellow" />
                <span className="dot dot-green-dot" />
                <span className="hero-card-title">agent_runner.py</span>
              </div>
              <div className="hero-card-body">
                <div className="term-line">
                  <span className="term-prompt">›</span>
                  <span className="term-cmd">python agent_runner.py --task ship</span>
                </div>
                <div className="term-output term-green">✓ Claude claude-sonnet-4-6 ready</div>
                <div className="term-output">Loading tools: 5/5</div>
                <div className="term-output term-purple">→ Reasoning step 1/3...</div>
                <div className="term-output">&nbsp; Analysing user feedback…</div>
                <div className="term-output">&nbsp; Mapping pain points…</div>
                <div className="term-output term-purple">→ Reasoning step 2/3...</div>
                <div className="term-output">&nbsp; Generating MVP spec…</div>
                <div className="term-output term-green">✓ Spec complete — shipping</div>
                <div className="term-output term-purple">→ Deploying to production...</div>
                <div className="term-output">&nbsp; [████████░░] 80%</div>
                <div className="term-line" style={{ marginTop: '4px' }}>
                  <span className="term-prompt">›</span>
                  <span className="term-cursor" />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

/* ─── Featured Project ───────────────────────────────────── */
const GitHubIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.1 3.3 9.43 7.88 10.97.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.54-3.87-1.54-.53-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.35.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.68 0-1.25.45-2.28 1.18-3.08-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.15 1.18a10.96 10.96 0 0 1 5.74 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.58.23 2.75.11 3.04.74.8 1.18 1.83 1.18 3.08 0 4.41-2.68 5.39-5.24 5.67.41.35.78 1.05.78 2.12v3.14c0 .31.21.67.8.56C20.2 21.43 23.5 17.1 23.5 12 23.5 5.65 18.35.5 12 .5Z" />
  </svg>
)

function FeaturedProject() {
  return (
    <section id="featured">
      <div className="container">
        <div className="reveal">
          <span className="section-label">Featured Project</span>
          <h2 className="section-title">AI Product Labs</h2>
          <p className="section-sub">
            A platform for rapid AI product experimentation — from idea to deployed MVP in 48 hours.
          </p>
        </div>

        <div className="featured-grid">

          <div className="featured-img-wrap reveal reveal-delay-1">
            <div className="featured-img-placeholder">
              <div className="featured-terminal">
                <div className="ft-bar">
                  <span className="dot dot-red" /><span className="dot dot-yellow" /><span className="dot dot-green-dot" />
                  <span className="ft-title">product_labs.py</span>
                </div>
                <div className="ft-body">
                  <div className="term-output term-green">✓ Pipeline initialised</div>
                  <div className="term-output">Scraping 142 user interviews…</div>
                  <div className="term-output term-purple">→ Clustering pain points…</div>
                  <div className="term-output term-green">✓ 8 clusters found</div>
                  <div className="term-output">Generating hypotheses…</div>
                  <div className="term-output term-green">✓ MVP_001 shipped 🚀</div>
                  <div className="term-output" style={{ color: '#f59e0b' }}>★ 47 users onboarded</div>
                </div>
              </div>
            </div>
          </div>

          <div className="reveal reveal-delay-2">
            <div className="featured-tag-row">
              <span className="tag tag-cyan">Featured</span>
              <span className="tag tag-purple">Multi-Agent</span>
              <span className="tag tag-green">Live</span>
            </div>

            <h3 className="featured-title">AI Product Labs</h3>

            <p className="featured-desc">
              An end-to-end platform that automates the journey from user insight to shipped product.
              Multi-agent pipelines scrape interviews, cluster pain points, generate MVP specs, and
              deploy — all orchestrated by Claude with zero human bottlenecks in the loop.
            </p>

            <div className="featured-meta">
              <div className="featured-meta-item">
                <span className="featured-meta-key">Stack</span>
                <span className="featured-meta-val">Claude API · React · Supabase</span>
              </div>
              <div className="featured-meta-item">
                <span className="featured-meta-key">Status</span>
                <span className="featured-meta-val" style={{ color: '#34d399' }}>● Live</span>
              </div>
              <div className="featured-meta-item">
                <span className="featured-meta-key">Time to MVP</span>
                <span className="featured-meta-val">48 hours</span>
              </div>
            </div>

            <div className="featured-cta">
              <a href="https://github.com/" target="_blank" rel="noreferrer" className="btn btn-primary">
                <GitHubIcon />
                View on GitHub
              </a>
              <a href="#" className="btn btn-outline">Live Demo →</a>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

/* ─── Agent Experiments ──────────────────────────────────── */
const experiments = [
  {
    icon: '🤖',
    title: 'Claude Voice Assistant',
    desc: 'Real-time voice agent that answers product questions using RAG over your documentation. WebRTC + Claude.',
    statusClass: 'status-live',
    statusLabel: 'Live',
    tagClass: 'tag-cyan',
    tagLabel: 'Claude · RAG',
    delay: 'reveal-delay-1',
  },
  {
    icon: '📄',
    title: 'PM Brief Generator',
    desc: 'Drop in a Jira ticket, get a full PRD with user stories, edge cases, and success metrics. Saves 2 hrs per brief.',
    statusClass: 'status-live',
    statusLabel: 'Live',
    tagClass: 'tag-green',
    tagLabel: 'Claude · Next.js',
    delay: 'reveal-delay-2',
  },
  {
    icon: '🔍',
    title: 'Competitor Intel Agent',
    desc: 'Monitors competitor changelogs and product pages autonomously. Surfaces strategic insights in a daily Slack digest.',
    statusClass: 'status-dev',
    statusLabel: 'Beta',
    tagClass: 'tag-purple',
    tagLabel: 'Multi-agent',
    delay: 'reveal-delay-3',
  },
  {
    icon: '✍️',
    title: 'AI Writing Coach',
    desc: "Paste your draft, get Hemingway-style edits that preserve your voice. Knows the difference between your style and bad writing.",
    statusClass: 'status-live',
    statusLabel: 'Live',
    tagClass: 'tag-cyan',
    tagLabel: 'Claude · React',
    delay: 'reveal-delay-1',
  },
  {
    icon: '📧',
    title: 'Cold Email Personaliser',
    desc: 'Feed it a LinkedIn profile, get a hyper-personalised cold email in under 10 seconds. 3× reply rate improvement.',
    statusClass: 'status-dev',
    statusLabel: 'Beta',
    tagClass: 'tag-orange',
    tagLabel: 'Claude · API',
    delay: 'reveal-delay-2',
  },
  {
    icon: '🗺️',
    title: 'Roadmap AI',
    desc: 'Turn customer feedback and OKRs into a prioritised, stakeholder-ready roadmap. Outputs Notion-ready markdown.',
    statusClass: 'status-idea',
    statusLabel: 'Concept',
    tagClass: 'tag-purple',
    tagLabel: 'Experimental',
    delay: 'reveal-delay-3',
  },
]

function Experiments() {
  return (
    <section id="experiments">
      <div className="container">
        <div className="reveal">
          <span className="section-label">Agent Experiments</span>
          <h2 className="section-title">Things I&apos;m Building</h2>
          <p className="section-sub">
            Real experiments. Some live, some beta, some just vibes. All built to learn.
          </p>
        </div>

        <div className="experiments-grid">
          {experiments.map((exp) => (
            <div key={exp.title} className={`exp-card reveal ${exp.delay}`}>
              <div className="exp-icon">{exp.icon}</div>
              <div className="exp-card-title">{exp.title}</div>
              <p className="exp-card-desc">{exp.desc}</p>
              <div className="exp-card-footer">
                <span className="exp-status">
                  <span className={`exp-status-dot ${exp.statusClass}`} />
                  {exp.statusLabel}
                </span>
                <span className={`tag ${exp.tagClass}`} style={{ fontSize: '10px' }}>{exp.tagLabel}</span>
                <a href="https://github.com/" className="exp-link" target="_blank" rel="noreferrer">
                  View repo
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Blog / Writing ─────────────────────────────────────── */
const blogPosts = [
  {
    tags: [
      { label: 'AI Strategy', cls: 'tag-cyan' },
      { label: 'Opinion', cls: 'tag-purple' },
    ],
    title: 'Why Every PM Will Need to Ship an Agent by 2027',
    excerpt: 'The role of Product Manager is evolving faster than anyone predicted. The builders who ship agents will define what comes next.',
    date: 'Mar 12, 2026',
    readTime: '6 min read',
    delay: 'reveal-delay-1',
  },
  {
    tags: [
      { label: 'Building', cls: 'tag-green' },
      { label: 'Case Study', cls: 'tag-orange' },
    ],
    title: 'How I Built a $0 AI Startup in a Weekend',
    excerpt: 'Claude + Cursor + Supabase + Vercel. No backend engineers, no budget, 200 users in 3 days. Here is the full breakdown.',
    date: 'Feb 27, 2026',
    readTime: '8 min read',
    delay: 'reveal-delay-2',
  },
]

const recentPosts = [
  { title: 'Claude Code in Production: Six Weeks In', date: 'March 15, 2026' },
  { title: 'The Honest Truth About AI Product-Market Fit', date: 'March 3, 2026' },
  { title: 'The Minimal Viable Agent: What Actually Matters', date: 'February 19, 2026' },
]

const stackItems = [
  { icon: '🤖', name: 'Claude API', pct: '95%' },
  { icon: '⚛️', name: 'React', pct: '85%' },
  { icon: '🐍', name: 'Python', pct: '80%' },
  { icon: '🗄️', name: 'Supabase', pct: '70%' },
]

function BlogSection() {
  return (
    <section id="writing">
      <div className="container">
        <div className="reveal">
          <span className="section-label">Writing</span>
          <h2 className="section-title">From the Blog</h2>
          <p className="section-sub">Notes on AI product thinking, agent architectures, and building in public.</p>
        </div>

        <div className="writing-grid">
          <div className="blog-cards">
            {blogPosts.map((post) => (
              <a key={post.title} href="#" className={`blog-card reveal ${post.delay}`}>
                <div className="blog-card-body">
                  <div className="blog-card-tags">
                    {post.tags.map(t => (
                      <span key={t.label} className={`tag ${t.cls}`}>{t.label}</span>
                    ))}
                  </div>
                  <h3 className="blog-card-title">{post.title}</h3>
                  <p className="blog-card-excerpt">{post.excerpt}</p>
                  <div className="blog-card-meta">
                    <span>{post.date}</span>
                    <span className="blog-card-meta-sep">·</span>
                    <span>{post.readTime}</span>
                  </div>
                </div>
                <div className="blog-card-arrow">→</div>
              </a>
            ))}
          </div>

          <div className="writing-sidebar">
            <div className="sidebar-widget reveal reveal-delay-1">
              <div className="sidebar-widget-head">Recent Posts</div>
              <ul className="sidebar-post-list">
                {recentPosts.map((post) => (
                  <li key={post.title} className="sidebar-post">
                    <div className="sidebar-post-title">{post.title}</div>
                    <div className="sidebar-post-date">{post.date}</div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="sidebar-widget reveal reveal-delay-2">
              <div className="sidebar-widget-head">Current Stack</div>
              <div className="stack-list">
                {stackItems.map((item) => (
                  <div key={item.name} className="stack-item">
                    <span className="stack-item-name">
                      <span className="stack-item-icon">{item.icon}</span>
                      {item.name}
                    </span>
                    <div className="stack-bar-wrap">
                      <div className="stack-bar" style={{ width: item.pct }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Newsletter ─────────────────────────────────────────── */
function Newsletter() {
  const [subscribed, setSubscribed] = useState(false)

  return (
    <section id="newsletter">
      <div className="container">
        <div className="newsletter-inner reveal">
          <div className="newsletter-icon">📡</div>
          <h2 className="newsletter-title">
            Get the AI builder<br />
            <span className="accent-text">playbook, weekly.</span>
          </h2>
          <p className="newsletter-sub">
            Real experiments, honest takes, and the frameworks I use to ship AI products fast.
            No fluff. Unsubscribe anytime.
          </p>
          <form
            className="newsletter-form"
            onSubmit={(e) => { e.preventDefault(); setSubscribed(true) }}
          >
            <input
              className="newsletter-input"
              type="email"
              placeholder="you@example.com"
              required
              disabled={subscribed}
            />
            <button
              type="submit"
              className="btn btn-primary newsletter-btn"
              disabled={subscribed}
              style={subscribed ? { background: '#34d399', boxShadow: '0 0 20px rgba(52,211,153,0.35)' } : {}}
            >
              {subscribed ? '✓ You\'re in!' : 'Subscribe'}
            </button>
          </form>
          <p className="newsletter-note">3,000+ AI builders. No spam. Unsubscribe anytime.</p>
        </div>
      </div>
    </section>
  )
}

/* ─── Footer ─────────────────────────────────────────────── */
function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-grid">

          <div className="footer-brand">
            <div className="footer-logo">Rahil<span>.</span></div>
            <p className="footer-brand-desc">
              AI Product Manager turned builder. Shipping agents,
              writing about it, and learning in public.
            </p>
            <div className="footer-social">
              <a href="https://github.com/" target="_blank" rel="noreferrer" className="social-btn" title="GitHub">
                <GitHubIcon />
              </a>
              <a href="https://twitter.com/" target="_blank" rel="noreferrer" className="social-btn" title="X / Twitter">𝕏</a>
              <a href="https://linkedin.com/" target="_blank" rel="noreferrer" className="social-btn" title="LinkedIn">in</a>
            </div>
          </div>

          <div>
            <div className="footer-col-title">Projects</div>
            <ul className="footer-links">
              <li><a href="#featured">AI Product Labs</a></li>
              <li><a href="#experiments">Voice Assistant</a></li>
              <li><a href="#experiments">PM Brief Generator</a></li>
              <li><a href="https://github.com/" target="_blank" rel="noreferrer">GitHub →</a></li>
            </ul>
          </div>

          <div>
            <div className="footer-col-title">Writing</div>
            <ul className="footer-links">
              <li><a href="#writing">Latest Posts</a></li>
              <li><a href="#writing">AI Strategy</a></li>
              <li><a href="#writing">Building in Public</a></li>
              <li><a href="#newsletter">Newsletter</a></li>
            </ul>
          </div>

          <div>
            <div className="footer-col-title">Contact</div>
            <ul className="footer-links">
              <li><a href="mailto:hello@rahilpopat.com">Email Me</a></li>
              <li><a href="https://linkedin.com/" target="_blank" rel="noreferrer">LinkedIn</a></li>
              <li><a href="https://twitter.com/" target="_blank" rel="noreferrer">Twitter / X</a></li>
              <li><a href="#">Book a Call</a></li>
            </ul>
          </div>

        </div>

        <div className="footer-bottom">
          <span>© 2026 Rahil Popat. Built with Claude &amp; curiosity.</span>
          <div className="footer-bottom-right">
            <a href="#">Privacy</a>
            <a href="#">RSS Feed</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

/* ─── App ────────────────────────────────────────────────── */
export default function App() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible')
            observer.unobserve(e.target)
          }
        })
      },
      { threshold: 0.12 }
    )
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <Navbar />
      <Hero />
      <FeaturedProject />
      <Experiments />
      <BlogSection />
      <Newsletter />
      <Footer />
    </>
  )
}
