import { useState, useEffect, useRef } from 'react'
import './App.css'
import ContrastCard from './components/ContrastCard'
import FlightStatus from './components/FlightStatus'
import SignalBoard from './components/SignalBoard'
import AgentCanvas from './components/AgentCanvas'

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

const LinkedInIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
)

const XIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
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

/* ─── Boot sequence ──────────────────────────────────────── */
function BootSequence({ onComplete }) {
  const isReturn = typeof sessionStorage !== 'undefined' && sessionStorage.getItem('hasBooted') === '1'

  const FULL_LINES = [
    { content: 'INITIALISING LARGE LANGUAGE OPERATOR...', cls: 'boot-line--teal', delay: 0 },
    { content: 'LOADING CONTEXT WINDOW......... READY',   cls: 'boot-line--teal', delay: 300 },
    { content: 'CALIBRATING REASONING........... COMPLETE', cls: 'boot-line--teal', delay: 600 },
    { content: 'INJECTING DOMAIN KNOWLEDGE...... AERONAUTICS + AI', cls: 'boot-line--teal', delay: 900 },
    { content: 'ALIGNING VALUES................. PRAGMATIC > PERFECT', cls: 'boot-line--teal', delay: 1200 },
    { content: <span>LOADING GENIUS..................{' '}<span style={{ color: '#f59e0b' }}>ERROR 404</span></span>, cls: 'boot-line--teal', delay: 1500 },
    { content: <span>LOADING PRAGMATISM..............{' '}<span style={{ color: '#4ade80' }}>COMPLETE</span></span>, cls: 'boot-line--teal', delay: 1800 },
    { content: <span>OPERATOR........................{' '}<span style={{ color: '#fff', fontWeight: 500 }}>RAHIL POPAT</span></span>, cls: 'boot-line--teal', delay: 2100 },
    { content: 'READY FOR INFERENCE.', cls: 'boot-line--ready', delay: 2700 },
  ]

  const RETURN_LINES = [
    { content: 'OPERATOR RECOGNISED', cls: 'boot-line--teal', delay: 0 },
    { content: 'CONTEXT LOADED',      cls: 'boot-line--teal', delay: 300 },
    { content: 'READY FOR INFERENCE.', cls: 'boot-line--ready', delay: 900 },
  ]

  const LINES = isReturn ? RETURN_LINES : FULL_LINES
  const lastDelay = LINES[LINES.length - 1].delay

  const [visible, setVisible] = useState([])
  const [fading, setFading] = useState(false)

  useEffect(() => {
    setVisible([])
    const timers = []

    LINES.forEach((line) => {
      const t = setTimeout(() => {
        setVisible(prev => [...prev, line])
      }, line.delay)
      timers.push(t)
    })

    const fadeT = setTimeout(() => {
      setFading(true)
      const doneT = setTimeout(() => {
        sessionStorage.setItem('hasBooted', '1')
        onComplete()
      }, 650)
      timers.push(doneT)
    }, lastDelay + 520)
    timers.push(fadeT)

    return () => timers.forEach(clearTimeout)
  }, [])

  return (
    <div className={`boot-overlay${fading ? ' boot-overlay--fading' : ''}`}>
      <div className="boot-content">
        {visible.map((line, i) => (
          <div key={i} className={`boot-line ${line.cls}`}>{line.content}</div>
        ))}
        {visible.length < LINES.length && <span className="boot-cursor">█</span>}
      </div>
    </div>
  )
}

/* ─── HUD reticle ────────────────────────────────────────── */
function HudReticle() {
  return (
    <div className="hud-reticle-wrap" aria-hidden="true">
      <svg className="hud-reticle" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
        {/* Concentric rings */}
        <circle cx="200" cy="200" r="180" fill="none" stroke="currentColor" strokeWidth="0.6" strokeDasharray="4 8" />
        <circle cx="200" cy="200" r="130" fill="none" stroke="currentColor" strokeWidth="0.8" />
        <circle cx="200" cy="200" r="80"  fill="none" stroke="currentColor" strokeWidth="0.6" strokeDasharray="2 6" />
        <circle cx="200" cy="200" r="30"  fill="none" stroke="currentColor" strokeWidth="1" />
        {/* Crosshairs */}
        <line x1="200" y1="20"  x2="200" y2="80"  stroke="currentColor" strokeWidth="0.8" />
        <line x1="200" y1="320" x2="200" y2="380" stroke="currentColor" strokeWidth="0.8" />
        <line x1="20"  y1="200" x2="80"  y2="200" stroke="currentColor" strokeWidth="0.8" />
        <line x1="320" y1="200" x2="380" y2="200" stroke="currentColor" strokeWidth="0.8" />
        {/* Diagonal ticks */}
        <line x1="72"  y1="72"  x2="94"  y2="94"  stroke="currentColor" strokeWidth="0.6" />
        <line x1="328" y1="72"  x2="306" y2="94"  stroke="currentColor" strokeWidth="0.6" />
        <line x1="72"  y1="328" x2="94"  y2="306" stroke="currentColor" strokeWidth="0.6" />
        <line x1="328" y1="328" x2="306" y2="306" stroke="currentColor" strokeWidth="0.6" />
        {/* Compass tick marks on outer ring */}
        {[0,30,60,90,120,150,180,210,240,270,300,330].map(deg => {
          const r = Math.PI * deg / 180
          const inner = deg % 90 === 0 ? 165 : 172
          return (
            <line
              key={deg}
              x1={200 + Math.sin(r) * inner} y1={200 - Math.cos(r) * inner}
              x2={200 + Math.sin(r) * 180}   y2={200 - Math.cos(r) * 180}
              stroke="currentColor" strokeWidth={deg % 90 === 0 ? 1.2 : 0.6}
            />
          )
        })}
        {/* Centre dot */}
        <circle cx="200" cy="200" r="3" fill="currentColor" />
      </svg>
    </div>
  )
}

/* ─── Reading progress bar ───────────────────────────────── */
function ReadingProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement
      const scrolled = el.scrollTop
      const total = el.scrollHeight - el.clientHeight
      setProgress(total > 0 ? (scrolled / total) * 100 : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return <div className="reading-progress" style={{ width: `${progress}%` }} />
}

/* ─── Magnetic button ────────────────────────────────────── */
function MagneticBtn({ className, children, href, onClick, target, rel }) {
  const ref = useRef(null)

  const onMouseMove = (e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = (e.clientX - cx) * 0.28
    const dy = (e.clientY - cy) * 0.28
    el.style.transform = `translate(${dx}px, ${dy}px)`
  }

  const onMouseLeave = () => {
    if (ref.current) ref.current.style.transform = 'translate(0,0)'
  }

  const props = { ref, className, onMouseMove, onMouseLeave, style: { transition: 'transform 0.2s ease' } }

  return href
    ? <a href={href} target={target} rel={rel} {...props}>{children}</a>
    : <button onClick={onClick} {...props}>{children}</button>
}

/* ─── Scroll-reveal hook ─────────────────────────────────── */
function useScrollReveal(selector = '.reveal') {
  useEffect(() => {
    const els = document.querySelectorAll(selector)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('revealed')
            observer.unobserve(e.target)
          }
        })
      },
      { threshold: 0.12 }
    )
    els.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  })
}

/* ─── Constellation background ───────────────────────────── */
function ConstellationCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId

    const STARS = 90
    const LINK_DIST = 140
    let stars = []

    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }

    const init = () => {
      resize()
      stars = Array.from({ length: STARS }, () => ({
        x:  Math.random() * canvas.width,
        y:  Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        r:  Math.random() * 1.2 + 0.4,
      }))
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // draw links
      for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
          const dx = stars[i].x - stars[j].x
          const dy = stars[i].y - stars[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < LINK_DIST) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(34,211,238,${0.12 * (1 - dist / LINK_DIST)})`
            ctx.lineWidth = 0.5
            ctx.moveTo(stars[i].x, stars[i].y)
            ctx.lineTo(stars[j].x, stars[j].y)
            ctx.stroke()
          }
        }
      }

      // draw stars
      for (const s of stars) {
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(34,211,238,0.55)'
        ctx.fill()

        // move
        s.x += s.vx
        s.y += s.vy
        if (s.x < 0) s.x = canvas.width
        if (s.x > canvas.width) s.x = 0
        if (s.y < 0) s.y = canvas.height
        if (s.y > canvas.height) s.y = 0
      }

      animId = requestAnimationFrame(draw)
    }

    init()
    draw()
    window.addEventListener('resize', init)
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', init)
    }
  }, [])

  return <canvas ref={canvasRef} className="constellation-canvas" />
}

/* ─── Typewriter hook ────────────────────────────────────── */
function useTypewriter(texts, speed = 55) {
  const [displayed, setDisplayed] = useState(texts.map(() => ''))
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    if (phase >= texts.length) return
    const target = texts[phase]
    const current = displayed[phase]
    if (current.length >= target.length) {
      const t = setTimeout(() => setPhase(p => p + 1), 180)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => {
      setDisplayed(prev => {
        const next = [...prev]
        next[phase] = target.slice(0, current.length + 1)
        return next
      })
    }, speed)
    return () => clearTimeout(t)
  }, [displayed, phase, texts, speed])

  const done = phase >= texts.length
  return { displayed, done }
}

const TABS = [
  { id: 'about',    label: 'About' },
  { id: 'agents',   label: 'Agents' },
  { id: 'stack',    label: 'Stack' },
  { id: 'insights', label: 'Insights' },
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
              <span className="nav-bracket">[ </span>{t.label}<span className="nav-bracket"> ]</span>
            </button>
          ))}
        </div>

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
   AGENTS TAB
═══════════════════════════════════════════════════════════ */
const agents = [
  {
    icon: '🧠',
    title: 'Personal AI Research Assistant',
    desc: 'A 4-stage Python pipeline that reads your GitHub commits and tells you what tools you should have used. Monitors Brave Search, GitHub trending, and RSS feeds daily. Scores against your goal profile using Claude Haiku, synthesises with Claude Sonnet, delivers to your inbox at 07:00 UTC.',
    note: 'Runs on GitHub Actions. Costs ~$0.13/day.',
    tags: ['Claude API', 'Brave Search', 'GitHub Actions', 'Python'],
    tagClasses: ['tc-cyan', 'tc-orange', 'tc-purple', 'tc-green'],
    delay: 'delay-1',
    comingSoon: false,
    sys: 'ACTIVE',
    github: 'https://github.com/rahilpopat/personal-ai-research-assistant',
  },
  {
    icon: '📝',
    title: 'Meeting to PRD Agent',
    desc: 'Paste a meeting transcript, get a structured PRD. Two-stage Claude pipeline — first extracts decisions, requirements, and open questions from the raw transcript, then structures them into a complete PRD with problem statement, user stories, success metrics, and scope boundaries. Optional third stage scores the PRD for completeness and flags ambiguity.',
    note: 'In development. No integrations needed — just Claude.',
    tags: ['Claude API', 'Python', 'Product Management'],
    tagClasses: ['tc-cyan', 'tc-green', 'tc-purple'],
    delay: 'delay-1',
    comingSoon: false,
    sys: 'ACTIVE',
    github: 'https://github.com/rahilpopat/meeting-to-prd-agent/tree/master',
  },
  {
    icon: '📋',
    title: 'Jira Audit Agent',
    desc: 'An agent that connects to a Jira board via MCP, scores ticket quality, identifies backlog health issues, and surfaces a prioritised audit report. Built for PMs who inherit messy boards.',
    note: 'MCP integration with Jira.',
    tags: ['Claude API', 'MCP', 'Jira', 'Python'],
    tagClasses: ['tc-cyan', 'tc-purple', 'tc-orange', 'tc-green'],
    delay: 'delay-2',
    comingSoon: false,
    sys: 'ACTIVE',
    github: 'https://github.com/rahilpopat/jira-audit-agent/tree/master/jira-audit-agent',
  },
  {
    icon: '📰',
    title: 'Release Notes Drafter',
    desc: 'Paste ticket titles, commit messages, or a sprint changelog. Gets back polished, customer-facing release notes — segmented by audience. Handles tone switching between technical changelogs and marketing-friendly updates.',
    note: 'Every PM\'s least favourite Friday task.',
    tags: ['Claude API', 'Python', 'Jira'],
    tagClasses: ['tc-cyan', 'tc-green', 'tc-orange'],
    delay: 'delay-3',
    comingSoon: false,
    sys: 'ACTIVE',
    github: 'https://github.com/rahilpopat/release-notes-drafter',
  },
  {
    icon: '🧰',
    title: 'PM Toolkit',
    desc: 'Five AI-powered PM tools in one CLI. Rank backlogs with RICE scoring, surface hidden assumptions, extract decisions from meeting notes, synthesise retro feedback into themes, and refine rough user stories with acceptance criteria. One shared Claude API layer, five independent tools, no duplication.',
    note: 'One CLI. Five tools. Every messy PM artefact in, structured output out.',
    tags: ['Claude API', 'Python', 'Product Management'],
    tagClasses: ['tc-cyan', 'tc-green', 'tc-purple'],
    delay: 'delay-1',
    comingSoon: false,
    sys: 'ACTIVE',
    github: 'https://github.com/rahilpopat/pm-toolkit',
  },
  {
    icon: '🧭',
    title: 'Meridian — PM Co-Pilot',
    desc: 'A persistent memory agent that lives alongside real PM work. Builds a model of your product, team, and decisions over time. Surfaces insights proactively rather than waiting to be asked.',
    note: 'In the lab. The most ambitious build on the roadmap.',
    tags: ['Claude API', 'Agentic Memory', 'Python', 'OpenClaw'],
    tagClasses: ['tc-cyan', 'tc-purple', 'tc-green', 'tc-cyan'],
    delay: 'delay-3',
    comingSoon: true,
    sys: 'STANDBY',
  },
  {
    icon: '🎯',
    title: 'Stakeholder Brief Generator',
    desc: 'One feature, multiple audiences. Input a feature summary and stakeholder list — outputs tailored briefs for engineering, commercial, design, and leadership. Each brief reframes the same work through the lens that audience cares about.',
    note: 'Same update. Different language. Zero rewriting.',
    tags: ['Claude API', 'Python', 'Product Management'],
    tagClasses: ['tc-cyan', 'tc-green', 'tc-purple'],
    delay: 'delay-2',
    comingSoon: true,
    sys: 'STANDBY',
  },
  {
    icon: '🦞',
    title: 'OpenClaw Personal Research Assistant',
    desc: 'A personal AI research agent built with OpenClaw and Claude Code, running on a Raspberry Pi. Autonomously gathers and synthesises information to answer research queries on demand.',
    note: 'Runs on a Raspberry Pi. This was a choice I made.',
    tags: ['OpenClaw', 'Claude Code', 'Raspberry Pi'],
    tagClasses: ['tc-cyan', 'tc-purple', 'tc-green'],
    delay: 'delay-2',
    comingSoon: true,
    sys: 'ACTIVE',
  },
  {
    icon: '📦',
    title: 'Jarvis — Amazon FBA Agent',
    desc: 'A private multi-agent system that autonomously manages core FBA operations. Built on OpenClaw with Claude at the core. Handles research, monitoring, and decision support across the seller workflow.',
    note: 'Proprietary. Architecture only — business logic stays classified.',
    tags: ['OpenClaw', 'Claude API', 'Python', 'Amazon'],
    tagClasses: ['tc-cyan', 'tc-cyan', 'tc-purple', 'tc-orange'],
    delay: 'delay-3',
    comingSoon: false,
    sys: 'ACTIVE',
  },
]

function AgentsTab() {
  useScrollReveal()
  return (
    <div className="tab-content">
      <AgentCanvas />

      <section className="tab-section-hero fade-in">
        <div className="container">
          <div className="tab-hero-text">
            <span className="section-label">Agents</span>
            <h1 className="tab-hero-headline">AI Systems & Agents</h1>
            <p className="tab-hero-sub">
              Things I've built. Some of them worked.
            </p>
          </div>
        </div>
      </section>

      <section className="tab-section fade-in delay-1">
        <div className="container">
          <div className="agents-grid">
            {agents.map((agent, idx) => (
              <div key={idx} className={`agent-card fade-in ${agent.delay}${agent.comingSoon ? ' agent-card-soon' : ''}`}>
                <div className={`agent-sys${agent.sys === 'ACTIVE' ? ' agent-sys--active' : ' agent-sys--standby'}`}>SYS: {agent.sys}</div>
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
                {agent.note && <p className="agent-note">{agent.note}</p>}
                <div className="agent-card-footer">
                  <span className="agent-status">
                    <span className={`agent-status-dot${!agent.comingSoon ? ' agent-status-dot--active' : ''}`} />
                    {agent.comingSoon ? 'In the lab' : 'Active'}
                  </span>
                  {agent.github && (
                    <a href={agent.github} target="_blank" rel="noreferrer" className="agent-cta">
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
   STACK TAB
═══════════════════════════════════════════════════════════ */
const stackCategories = [
  {
    label: 'AI Models',
    tools: [
      { name: 'Claude (Sonnet / Opus)', desc: 'Powers every agent in the lab. Sonnet for speed, Opus for depth.', status: 'ACTIVE' },
      { name: 'OpenAI GPT-4o', desc: 'Benchmarking and comparison runs.', status: 'EXPLORING' },
    ],
  },
  {
    label: 'Agent Framework',
    tools: [
      { name: 'OpenClaw', desc: 'The backbone of Jarvis. Orchestrates multi-agent chains on a Raspberry Pi.', status: 'ACTIVE' },
      { name: 'Claude Code', desc: 'How I ship. Agentic coding from the terminal.', status: 'ACTIVE' },
      { name: 'BMad Method', desc: 'Structured project scaffolding with Claude Code. CLAUDE.md, rules, commands.', status: 'ACTIVE' },
    ],
  },
  {
    label: 'Infra & Hosting',
    tools: [
      { name: 'Raspberry Pi', desc: 'Jarvis runs 24/7 on a Pi. 6am cron, Telegram alerts, zero cloud costs.', status: 'ACTIVE' },
      { name: 'Railway', desc: 'Backend hosting for SaaS products.', status: 'ACTIVE' },
      { name: 'Render', desc: 'API deployment for the Amazon Product Checker.', status: 'ACTIVE' },
      { name: 'Vercel', desc: 'Frontend hosting. Fast deploys from GitHub.', status: 'ACTIVE' },
      { name: 'GitHub', desc: 'Everything lives here. Repos, CI, build logs.', status: 'ACTIVE' },
    ],
  },
  {
    label: 'Languages & Frameworks',
    tools: [
      { name: 'Python', desc: 'FastAPI backends, automation scripts, data pipelines.', status: 'ACTIVE' },
      { name: 'React', desc: 'Frontend for all SaaS products.', status: 'ACTIVE' },
      { name: 'Streamlit', desc: 'Internal dashboards and prototypes.', status: 'ACTIVE' },
    ],
  },
  {
    label: 'APIs & Data',
    tools: [
      { name: 'Keepa', desc: 'Price and BSR history for every ASIN Jarvis evaluates.', status: 'ACTIVE' },
      { name: 'Brave Search API', desc: 'Wholesaler discovery in the sourcing pipeline.', status: 'ACTIVE' },
      { name: 'Telegram Bot API', desc: 'How Jarvis talks to me. Alerts, approvals, daily briefings.', status: 'ACTIVE' },
      { name: 'Stripe', desc: 'Billing for the Product Checker. Freemium tiers.', status: 'ACTIVE' },
      { name: 'Clerk', desc: 'Auth for SaaS products. Drop-in, no custom auth code.', status: 'ACTIVE' },
    ],
  },
  {
    label: 'Products',
    tools: [
      { name: 'Jarvis', desc: 'Autonomous FBA sourcing system. 6 agents, daily cron, runs on a Pi.', status: 'ACTIVE' },
      { name: 'Amazon Product Checker', desc: 'Micro-SaaS for FBA sellers. React + FastAPI, Stripe billing.', status: 'ACTIVE' },
      { name: 'Meridian', desc: 'AI Chief of Staff for PMs. Multi-agent prioritisation engine.', status: 'EXPLORING' },
      { name: 'Financial Dashboard', desc: 'Personal net worth tracker. Streamlit, live ETF/crypto pricing.', status: 'ACTIVE' },
    ],
  },
]

function StackTab() {
  useScrollReveal()
  return (
    <div className="tab-content">
      <section className="tab-section-hero fade-in">
        <div className="container">
          <div className="tab-hero-text">
            <span className="section-label">Stack</span>
            <h1 className="tab-hero-headline">What I build with</h1>
            <p className="tab-hero-sub">
              The tools, frameworks and infrastructure behind everything shipped from this lab.
            </p>
          </div>
        </div>
      </section>

      {stackCategories.map((cat, ci) => (
        <section key={cat.label} className={`tab-section fade-in delay-${Math.min(ci + 1, 4)}`}>
          <div className="container">
            <div className="stack-cat-label">{cat.label}</div>
            <div className="stack-grid">
              {cat.tools.map(tool => (
                <div key={tool.name} className="stack-card">
                  <div className="stack-card-name">{tool.name}</div>
                  <p className="stack-card-desc">{tool.desc}</p>
                  <span className={`stack-pill${tool.status === 'EXPLORING' ? ' stack-pill--exploring' : ''}`}>
                    <span className={`stack-pill-dot${tool.status === 'EXPLORING' ? ' stack-pill-dot--exploring' : ''}`} />
                    {tool.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="tab-section fade-in delay-3">
        <div className="container">
          <div className="lab-status-card">
            <div className="lsc-title">STACK.LOG</div>
            <div className="lsc-divider">━━━━━━━━━━━━━━━━━━━━━━━━━━</div>
            <div className="lsc-row">
              <span className="lsc-key">LAST UPDATED: </span>
              <span className="lsc-val lsc-val--white">2026-04-12</span>
            </div>
            <div className="lsc-row">
              <span className="lsc-key">TOOLS TRACKED: </span>
              <span className="lsc-val lsc-val--accent">22</span>
            </div>
            <div className="lsc-row">
              <span className="lsc-key">STATUS: </span>
              <span className="lsc-val lsc-val--accent">BUILDING IN PUBLIC</span>
            </div>
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
    id: 'jira-audit-agent',
    category: 'Agent Build',
    catClass: 'tc-green',
    title: 'An AI Agent That Audits Your Jira Board Before Engineering Does',
    desc: 'Three independent checks — field completeness, AI quality scoring, and staleness detection — produce a single audit report. Only one check uses the Claude API. Auditing 20 tickets costs roughly $0.02.',
    date: 'Apr 2026',
    readTime: '6 min read',
    featured: true,
    delay: 'delay-1',
  },
  {
    id: 'meeting-to-prd',
    category: 'Agent Build',
    catClass: 'tc-green',
    title: 'Turning Meeting Transcripts Into PRDs Automatically',
    desc: 'A two-agent pipeline that takes a raw meeting transcript and produces a structured PRD — problem statement, user stories, acceptance criteria, and decisions. Split into Extractor and Writer for debuggability.',
    date: 'Apr 2026',
    readTime: '6 min read',
    featured: false,
    delay: 'delay-1',
  },
  {
    id: 'personal-ai-research-assistant',
    category: 'Agent Build',
    catClass: 'tc-green',
    title: 'I Built a Personal AI Agent That Reads My GitHub and Tells Me What to Build Next',
    desc: 'A 4-stage Python pipeline that monitors Brave Search, GitHub trending and RSS feeds daily — then scores and synthesises everything against your actual commits using Claude.',
    date: 'Apr 2026',
    readTime: '12 min read',
    featured: false,
    delay: 'delay-1',
  },
  {
    id: 'aero-to-ai',
    category: 'Career & Perspective',
    catClass: 'tc-cyan',
    title: 'From Aeronautical Engineering to AI Product Management',
    desc: 'The two worlds sound nothing alike. One involves flight dynamics and wind tunnels. The other involves sprint planning and model evaluation. But the discipline transfers more than you\'d think.',
    date: 'Mar 2026',
    readTime: '10 min read',
    featured: false,
    delay: 'delay-2',
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
    delay: 'delay-3',
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
            <p className="article-byline">By Rahil</p>
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
              <p>AI is in the early stages of building exactly this kind of rigour — and it desperately needs people who already understand why it matters. The emerging landscape of AI governance, safety evals, model cards, and deployment audits maps almost directly onto the design assurance frameworks I studied and worked within during my engineering years. If you have an aerospace background, you&apos;re not new to this conversation. You&apos;ve been living it.</p>

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
            <p className="article-byline">By Rahil</p>
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

function PersonalAiResearchAssistantPage({ onBack }) {
  return (
    <div className="tab-content fade-in">
      <section className="article-hero">
        <div className="container">
          <button className="article-back" onClick={onBack}>&larr; Back to Insights</button>
          <div className="article-header">
            <div className="article-header-meta">
              <span className="atag tc-green">Agent Build</span>
              <span className="article-date">Apr 2026 &middot; 12 min read</span>
            </div>
            <h1 className="article-title">I Built a Personal AI Agent That Reads My GitHub and Tells Me What to Build Next</h1>
            <p className="article-byline">By Rahil</p>
          </div>
        </div>
      </section>

      <section className="tab-section tab-section-last">
        <div className="container">
          <div className="article-body-wrap">
            <div className="article-body">

              <p>There&apos;s a problem nobody talks about when you&apos;re learning to build with AI.</p>
              <p>It&apos;s not the tools. It&apos;s not the APIs. It&apos;s not even the code.</p>
              <p>It&apos;s keeping up with a field that moves faster than you can read about it &mdash; and figuring out which parts of it actually matter to <em>you</em>, for what <em>you&apos;re</em> building, right now.</p>
              <p>I was spending too long reading newsletters, scrolling through Hacker News, saving articles I&apos;d never get back to. And none of it connected to what I was actually working on. TLDR AI doesn&apos;t know I&apos;m building agentic systems. Feedly doesn&apos;t know my GitHub. Perplexity answers questions I ask, but doesn&apos;t monitor anything on my behalf.</p>
              <p>The problem wasn&apos;t a lack of information. It was a lack of signal. Nothing was filtering the AI landscape through the lens of my actual projects and goals.</p>
              <p>So I built something that does.</p>

              <h2>What I Built</h2>
              <p>A Python pipeline called the <strong>Personal AI Research Assistant</strong> &mdash; a 4-stage automated system that runs every morning and delivers a personalised briefing directly to my inbox.</p>
              <p>Not a newsletter. Not a feed. A briefing that looks like this:</p>
              <blockquote>&ldquo;There&apos;s a new tool that does X. You built this manually in personal-ai-research-assistant last week. It could have saved you 4 hours. Here&apos;s how to get started.&rdquo;</blockquote>
              <p>Real repo names. Specific time estimates. And if it can&apos;t make a genuine connection to something I&apos;ve built &mdash; it says so honestly rather than making one up.</p>
              <p>That last part was a deliberate design decision. Hallucination in a research tool isn&apos;t just wrong &mdash; it&apos;s counterproductive. I&apos;d rather get fewer, more honest briefings than confident fabrications.</p>

              <h2>How It Works</h2>
              <p>The pipeline has four stages, each one feeding into the next.</p>

              <h3>Stage 1 &mdash; Monitor</h3>
              <p>Every morning it pulls from three source types:</p>
              <ul>
                <li><strong>Brave Search API</strong> &mdash; rotating queries on topics I care about: Claude Code, MCP servers, agentic frameworks, LLM evaluation</li>
                <li><strong>GitHub trending</strong> &mdash; repos created in the last 7 days with stars above 10, filtered by topic</li>
                <li><strong>RSS feeds</strong> &mdash; Hacker News, Simon Willison, Anthropic Blog, The Batch, AI News</li>
              </ul>
              <p>It also fetches my recent public commit history via the GitHub Events API. This isn&apos;t a source of news &mdash; it&apos;s context for the stages that follow.</p>
              <p>After deduplication, I typically end up with 50&ndash;80 raw items.</p>

              <h3>Stage 2 &mdash; Score</h3>
              <p>Not all 80 items are worth reading. Most aren&apos;t.</p>
              <p>I use <strong>Claude Haiku</strong> here &mdash; fast and cheap for bulk scoring. Each item gets passed to the model with my personal goal profile (skills, learning objectives, active projects, topics to exclude) and a summary of my last 40 commits.</p>
              <p>The scoring guide is simple: 10 means directly connected to something I&apos;m actively building. 7&ndash;9 means strong learning value. Below 7 gets dropped.</p>
              <p>Haiku for this stage isn&apos;t just a cost decision &mdash; it&apos;s the right model for the job. Scoring is pattern matching. I don&apos;t need deep reasoning here, I need speed across 80 items at fractions of a cent each.</p>
              <p>Items with a score of 7 or above pass through. Usually 5&ndash;8 survive.</p>

              <h3>Stage 3 &mdash; Synthesise</h3>
              <p>This is where the interesting work happens.</p>
              <p>The surviving items go to <strong>Claude Sonnet</strong>. Sonnet gets the item, my goal profile, and crucially &mdash; my last 40 commit messages pulled from the GitHub Events API.</p>
              <p>The prompt asks one question: <em>does this new tool connect to something I built manually?</em></p>
              <p>If yes &mdash; name the repo, estimate the hours it could have saved, suggest what I could build with that time.</p>
              <p>If no genuine match exists &mdash; flag it as a forward recommendation and don&apos;t fabricate a connection.</p>
              <p>I chose Sonnet here because synthesis requires actual reasoning. It needs to look at a commit message like &ldquo;feat: session 3 &mdash; scorer with commit-aware haiku scoring&rdquo; and understand what that work involved, then map a new tool onto that context. Haiku can score. Sonnet can reason.</p>

              <h3>Stage 4 &mdash; Deliver</h3>
              <p>The synthesised briefings get rendered into an HTML email via a Jinja2 template and sent to my inbox at 07:00 UTC every morning via GitHub Actions.</p>
              <p>No server. No Pi required for the core pipeline. Just a cron job on GitHub&apos;s infrastructure, running whether my laptop is open or not.</p>
              <p>The pipeline also writes a plain text <code>DAILY-INTEL.md</code> file &mdash; a version of the digest that future agents in my system can read without parsing HTML.</p>

              <h2>The Problem I Didn&apos;t Expect to Solve</h2>
              <p>Building a 4-stage pipeline isn&apos;t one session of work. It&apos;s multiple sessions across multiple days. And Claude Code &mdash; the tool I used to build this &mdash; has no persistent memory between sessions.</p>
              <p>Every time I opened a new session, it started fresh. No memory of what was built the day before, what decisions were made, what stage we were at.</p>
              <p>This was killing my flow. I was spending the first 10 minutes of every session re-explaining context.</p>
              <p>I solved it with two files.</p>
              <p><strong>CLAUDE.md</strong> &mdash; the permanent project spec. Architecture decisions, coding standards, the session plan, the rules Claude Code should always follow. Written once, read at the start of every session.</p>
              <p><strong>DECISIONS.md</strong> &mdash; a living session log. What was built, what changed, what the verify step showed, where we left off. Updated at the end of every session.</p>
              <p>The ritual is simple:</p>
              <ul>
                <li>Start every session: <em>&ldquo;Read CLAUDE.md and DECISIONS.md and tell me where we left off.&rdquo;</em></li>
                <li>End every session: <em>&ldquo;Update DECISIONS.md with what we built today.&rdquo;</em></li>
              </ul>
              <p>Claude Code reads both files and reconstructs the full project state in seconds. No repeated explanations. No drift. It picks up exactly where the last session ended.</p>
              <p>This isn&apos;t a technical innovation &mdash; it&apos;s discipline. But the difference between having this system and not having it is the difference between a project that compounds across sessions and one that resets every day.</p>

              <h2>What the Output Actually Looks Like</h2>
              <p>Right now, most briefings connect back to one repo &mdash; <code>personal-ai-research-assistant</code> &mdash; because that&apos;s what I&apos;ve been building. The more I ship publicly, the richer the connections get. That&apos;s the loop. The tool grows with you.</p>
              <p>Here&apos;s a real example from this week:</p>
              <blockquote>
                <em>Claude Code workflow docs that directly support your personal-ai-research-assistant project development patterns</em>
                <br /><br />
                <strong>You built this manually:</strong> rahilpopat/personal-ai-research-assistant<br />
                <strong>This could have saved you:</strong> 2&ndash;3 hours per session on debugging and refactoring<br />
                <strong>With that time:</strong> Apply these patterns to optimise your commit-aware synthesiser
              </blockquote>
              <p>Is every item that specific? Not yet. But when it lands, it genuinely changes what I pay attention to. That&apos;s the test.</p>

              <h2>What I Learned</h2>
              <p><strong>Finding the right problem is harder than building the solution.</strong></p>
              <p>I knew what was possible with the APIs available. Claude, Brave Search, GitHub &mdash; the building blocks were obvious. What took time was identifying the specific problem worth solving. Not &ldquo;I want an AI assistant&rdquo; but &ldquo;I want something that reads my commits and tells me what I should have built differently.&rdquo;</p>
              <p>That framing &mdash; <em>connect new tools to my actual work</em> &mdash; is what made this worth building. Without it I&apos;d have built another RSS reader with a Claude wrapper.</p>

              <p><strong>Use the right model for the right job.</strong></p>
              <p>Haiku for bulk scoring. Sonnet for synthesis. The cost difference is significant and so is the capability difference. Haiku can pattern-match 50 items against a profile quickly and cheaply. Sonnet can reason about a commit message and connect it to a new framework. Treating them as interchangeable would have either broken the output quality or made the daily cost unsustainable.</p>

              <p><strong>Hallucination is a design constraint, not just a risk.</strong></p>
              <p>The synthesiser&apos;s forward-only flag &mdash; where it explicitly declares it couldn&apos;t find a genuine connection rather than fabricating one &mdash; was the most important prompt engineering decision I made. A tool that confidently lies about what connects to your work is worse than no tool at all. Building honesty into the output format made the results trustworthy.</p>

              <p><strong>Ship something that runs without you.</strong></p>
              <p>The GitHub Actions cron job feels like a small thing. It isn&apos;t. There&apos;s a meaningful difference between a script you run manually and a system that runs whether you&apos;re working or not. The moment it sent its first automatic email was the moment it became a real product rather than a demo.</p>

              <h2>The Repo</h2>
              <p>The whole thing is open source. Fork it, edit two YAML files &mdash; <code>profile.yaml</code> with your skills and goals, <code>sources.yaml</code> with your topics &mdash; and it reads your commits and goals instead of mine.</p>
              <p>It costs roughly $0.15 a day to run. Haiku scoring 50 items plus Sonnet synthesising 8. Brave Search and GitHub are free tier.</p>
              <p><a href="https://github.com/rahilpopat/personal-ai-research-assistant" target="_blank" rel="noreferrer">github.com/rahilpopat/personal-ai-research-assistant</a></p>

              <h2>What&apos;s Next</h2>
              <p>The research assistant is Phase 1. The digest proved its value &mdash; now the next step is adding a Writer agent that reads the daily briefing and drafts a LinkedIn post about the most interesting find of the week. Same pattern, new agent. Each one reads from the last one&apos;s output file. No API calls between agents. Just files.</p>
              <p>The field is moving fast. The best way I&apos;ve found to keep up is to build things that help me keep up &mdash; and then build the next thing those things surface.</p>
              <p className="article-closing">That&apos;s the loop.</p>

            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function JiraAuditAgentPage({ onBack }) {
  return (
    <div className="tab-content fade-in">
      <section className="article-hero">
        <div className="container">
          <button className="article-back" onClick={onBack}>&larr; Back to Insights</button>
          <div className="article-header">
            <div className="article-header-meta">
              <span className="atag tc-green">Agent Build</span>
              <span className="article-date">Apr 2026 &middot; 6 min read</span>
            </div>
            <h1 className="article-title">An AI Agent That Audits Your Jira Board Before Engineering Does</h1>
            <p className="article-byline">By Rahil</p>
          </div>
        </div>
      </section>

      <section className="tab-section tab-section-last">
        <div className="container">
          <div className="article-body-wrap">
            <div className="article-body">

              <h2>The Problem</h2>
              <p>Every sprint has that moment. Engineering picks up a ticket, reads the description, and immediately has three questions. &ldquo;What does &lsquo;improve performance&rsquo; actually mean?&rdquo; &ldquo;Where are the acceptance criteria?&rdquo; &ldquo;This ticket hasn&apos;t been updated in three weeks &mdash; is anyone still working on this?&rdquo;</p>
              <p>The PM scrambles to fill in the gaps. The standup gets derailed. A story that should have taken two days takes four because the requirements weren&apos;t clear enough to start building from.</p>
              <p>The root cause isn&apos;t bad PMs or lazy engineers. It&apos;s that nobody systematically checks ticket quality before work begins. It&apos;s manual, it&apos;s tedious, and it falls through the cracks.</p>

              <h2>What I Built</h2>
              <p>Jira Audit Agent runs three independent checks against every ticket on your board and produces a single audit report telling you exactly what needs fixing before engineering picks it up.</p>
              <p>The three checks are deliberately different in how they work:</p>
              <p><strong>Field Checker</strong> &mdash; pure Python, no AI. Checks every ticket for missing description, no acceptance criteria, no story points, unassigned, no priority, no labels, no sprint. This is arithmetic, not judgement. It doesn&apos;t need an LLM, so it costs nothing to run.</p>
              <p><strong>Quality Scorer</strong> &mdash; Claude-powered. Reads each ticket description and scores it 1&ndash;10 for clarity, specificity, and actionability. A ticket that says &ldquo;improve dashboard performance&rdquo; gets a 4 with specific feedback: &ldquo;Replace &lsquo;improve performance&rsquo; with a target like &lsquo;reduce load time to under 2 seconds&rsquo;.&rdquo; It doesn&apos;t just flag the problem &mdash; it tells you how to fix it.</p>
              <p><strong>Staleness Detector</strong> &mdash; pure Python, no AI. Flags tickets with no activity in 14+ days, &ldquo;In Progress&rdquo; tickets idle for 7+ days, and tickets stuck in the same status for 30+ days. Again, date math &mdash; no LLM needed.</p>
              <p>The key design choice: only one of the three checks uses the Claude API. Field completeness and staleness are deterministic &mdash; there&apos;s no reason to pay for an LLM to do arithmetic. This means auditing 20 tickets costs roughly $0.02.</p>

              <h2>How It Works</h2>
              <pre><code>{`Tickets JSON → Field Checker (free)
             → Quality Scorer (Claude)  → Aggregated Audit Report
             → Staleness Detector (free)`}</code></pre>
              <pre><code>python3 -m src.cli examples/sample_tickets.json -o output/report.md</code></pre>
              <p>The report groups findings by severity &mdash; critical issues first, then warnings, then informational. A PM can scan the critical section in 30 seconds and know exactly which tickets need work before sprint planning.</p>

              <h2>What I Learned</h2>
              <p>Severity levels matter more than you&apos;d think. My first version was binary &mdash; pass or fail. But &ldquo;missing labels&rdquo; and &ldquo;missing acceptance criteria&rdquo; are not the same level of problem. A three-tier system (critical, warning, info) means the report is actionable rather than noisy. You fix the critical issues before planning. You fix warnings during the sprint. You ignore info items unless you&apos;re doing housekeeping.</p>
              <p>The loader abstraction was also a deliberate choice. V1 uses a local JSON file of sample tickets. But all ticket data flows through <code>loader.py</code>, which returns Pydantic models. When I add real Jira API support, I change one file. The field checker, quality scorer, staleness detector, and reporter don&apos;t know or care where the data came from.</p>

              <h2>Tech Stack</h2>
              <p>Python, Claude API (Sonnet for quality scoring), Click CLI, Pydantic, Jinja2. 33 passing tests. The <code>--skip-quality</code> flag runs field and staleness checks without an API key &mdash; useful for CI or quick checks.</p>

              <p><a href="https://github.com/rahilpopat/jira-agent" target="_blank" rel="noreferrer">&rarr; View on GitHub</a></p>

            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function MeetingToPrdPage({ onBack }) {
  return (
    <div className="tab-content fade-in">
      <section className="article-hero">
        <div className="container">
          <button className="article-back" onClick={onBack}>&larr; Back to Insights</button>
          <div className="article-header">
            <div className="article-header-meta">
              <span className="atag tc-green">Agent Build</span>
              <span className="article-date">Apr 2026 &middot; 6 min read</span>
            </div>
            <h1 className="article-title">Turning Meeting Transcripts Into PRDs Automatically</h1>
            <p className="article-byline">By Rahil</p>
          </div>
        </div>
      </section>

      <section className="tab-section tab-section-last">
        <div className="container">
          <div className="article-body-wrap">
            <div className="article-body">

              <h2>The Problem</h2>
              <p>Every PM knows this cycle. You sit in a 45-minute planning meeting. Decisions get made. User stories get discussed. Technical constraints surface. Then the meeting ends, and someone &mdash; usually you &mdash; has to spend another hour translating messy notes into a structured PRD that engineering can actually build from.</p>
              <p>The gap between &ldquo;we discussed it&rdquo; and &ldquo;it&apos;s written down clearly&rdquo; is where requirements get lost. The acceptance criteria that were obvious in the meeting become vague by the time they&apos;re documented. The edge case someone raised gets forgotten. The decision about scope gets remembered differently by three different people.</p>

              <h2>What I Built</h2>
              <p>Meeting to PRD Agent is a two-agent pipeline that takes a raw meeting transcript and produces a structured PRD &mdash; problem statement, user stories, acceptance criteria, technical constraints, dependencies, open questions, decisions, and stakeholders.</p>
              <p>The key design choice was splitting this into two agents instead of one:</p>
              <p><strong>Agent 1 (Extractor)</strong> reads the messy transcript and pulls out structured data. It doesn&apos;t write prose &mdash; it produces validated JSON against a Pydantic schema. If something wasn&apos;t discussed in the meeting, it says so. It never fabricates requirements.</p>
              <p><strong>Agent 2 (Writer)</strong> takes that structured JSON and produces the actual PRD using a Jinja2 template. The LLM generates the overview paragraph; everything else is rendered from the extracted data.</p>
              <p>Why two agents? Debuggability. If the PRD is wrong, you inspect the intermediate JSON. Was the extraction wrong, or was the writing wrong? You know exactly where the failure happened. You can also tune each prompt independently.</p>

              <h2>How It Works</h2>
              <pre><code>Transcript &rarr; Extractor Agent &rarr; Validated JSON &rarr; Writer Agent &rarr; Markdown PRD</code></pre>
              <p>You run it from the command line:</p>
              <pre><code>python3 -m src.cli meeting_notes.txt -o output/prd.md</code></pre>
              <p>The output is a markdown PRD with every section populated from what was actually discussed. Sections where nothing was said get &ldquo;None identified in meeting transcript&rdquo; &mdash; not invented content.</p>

              <h2>What I Learned</h2>
              <p>The biggest lesson was the gap between mocked tests and real API responses. All 21 tests passed with mocked data, but the first real API call failed because Claude returned user stories as plain strings instead of the structured objects the Pydantic schema expected. The fix was making the extraction prompt more explicit &mdash; including a concrete JSON example showing the exact shape of every field.</p>
              <p>This is the kind of thing you only discover by running against real data, and it&apos;s why the two-agent architecture paid off immediately. The extraction prompt needed work; the writing prompt was fine. One fix, one file, problem solved.</p>

              <h2>Tech Stack</h2>
              <p>Python, Claude API (Sonnet), Click CLI, Pydantic for validation, Jinja2 for templating. 21 passing tests. No web UI &mdash; CLI only, intentionally simple.</p>

              <p><a href="https://github.com/rahilpopat/meeting-to-prd-agent" target="_blank" rel="noreferrer">&rarr; View on GitHub</a></p>

            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function InsightsTab({ onReadMore }) {
  useScrollReveal()
  const [featured, ...rest] = insights

  return (
    <div className="tab-content">
      <AgentCanvas />

      <section className="tab-section-hero fade-in">
        <div className="container">
          <div className="tab-hero-text">
            <span className="section-label">Transmission Log</span>
            <h1 className="tab-hero-headline">Thinking Out Loud on AI</h1>
            <p className="tab-hero-sub">
              Thinking out loud on AI. Occasionally useful.
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
/* ─── Quote block ────────────────────────────────────────── */
const WRIGHT_QUOTE = "\u201CI didn\u2019t switch industries. I switched the medium. Complex systems, failure modes, tight constraints \u2014 the job description didn\u2019t change, just the altitude.\u201D"

function QuoteBlock({ size = 'large' }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect() } },
      { threshold: 0.2 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className={`quote-block quote-block--${size}${visible ? ' quote-block--visible' : ''}`}>
      <blockquote className="quote-text">{WRIGHT_QUOTE}</blockquote>
      <cite className="quote-attr">— Rahil</cite>
    </div>
  )
}

/* ─── Lab Status Card ────────────────────────────────────── */
const LAB_START = new Date('2020-03-01T00:00:00')

function LabStatusCard() {
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  const pad = n => String(n).padStart(2, '0')

  const labStatus = () => {
    const h = now.getHours()
    if (h >= 6  && h < 12) return 'OPEN'
    if (h >= 12 && h < 18) return 'ACTIVE'
    if (h >= 18 && h < 24) return 'AIRBORNE'
    return 'ACTIVE — UNEXPECTED'
  }

  const localTime = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`

  const mission = () => {
    const yrs = now.getFullYear() - LAB_START.getFullYear()
    const mos = now.getMonth() - LAB_START.getMonth() + yrs * 12
    const years = Math.floor(mos / 12)
    const months = mos % 12
    return `${years} YRS ${months} MOS`
  }

  return (
    <div className="lab-status-card">
      <div className="lsc-title">RAHIL.EXE</div>
      <div className="lsc-divider">━━━━━━━━━━━━━━━━━━━━</div>
      <div className="lsc-row">
        <span className="lsc-key">LAB STATUS: </span>
        <span className="lsc-val lsc-val--accent">{labStatus()}</span>
      </div>
      <div className="lsc-row">
        <span className="lsc-key">LOCAL TIME: </span>
        <span className="lsc-val lsc-val--white">{localTime}</span>
      </div>
      <div className="lsc-divider">━━━━━━━━━━━━━━━━━━━━</div>
      <div className="lsc-row">
        <span className="lsc-key">MISSION: </span>
        <span className="lsc-val lsc-val--white">{mission()}</span>
      </div>
      <div className="lsc-divider">━━━━━━━━━━━━━━━━━━━━</div>
      <div className="lsc-section-label">CURRENT MISSION</div>
      <div className="lsc-row">
        <span className="lsc-key">OBJECTIVE........ </span>
        <span className="lsc-val lsc-val--white">Build &amp; ship agents</span>
      </div>
      <div className="lsc-row">
        <span className="lsc-key">TOOLS............ </span>
        <span className="lsc-val lsc-val--white">Whatever works</span>
      </div>
      <div className="lsc-row">
        <span className="lsc-key">PLATFORM......... </span>
        <span className="lsc-val lsc-val--white">Wherever it runs</span>
      </div>
      <div className="lsc-row">
        <span className="lsc-key">ETA.............. </span>
        <span className="lsc-val lsc-val--white">Unknown</span>
      </div>
      <div className="lsc-building">
        <span className="lsc-dot" />
        CURRENTLY BUILDING
      </div>
    </div>
  )
}

function PassionStat() {
  const [show, setShow] = useState(false)
  const timerRef = useRef(null)

  const handleClick = () => {
    setShow(true)
    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => setShow(false), 2000)
  }

  useEffect(() => () => clearTimeout(timerRef.current), [])

  return (
    <div className="stat-row stat-row--passion" onClick={handleClick} style={{ cursor: 'pointer', position: 'relative', userSelect: 'none' }}>
      <span className="stat-key">PASSION.......... </span><span className="stat-val">∞</span>
      {show && (
        <span className="passion-tooltip">
          This field cannot be quantified. Engineering has tried.
        </span>
      )}
    </div>
  )
}

function AboutTab({ onNavigate, onOpenArticle }) {
  useScrollReveal()
  const TYPING_TEXTS = [
    'Rahil',
    'Agent Builder · Product Owner · Aeronautical Engineer · Thinks in Systems',
    'PM by day. Builder by compulsion. Aeronautical engineer by origin.',
    'Builder. AI products, agents, and everything in between.',
  ]
  const { displayed, done } = useTypewriter(TYPING_TEXTS, 48)
  const showSubtitle = displayed[0].length === TYPING_TEXTS[0].length
  const showTagline = displayed[1].length === TYPING_TEXTS[1].length
  const showBio = displayed[2].length === TYPING_TEXTS[2].length

  return (
    <div className="tab-content">
      <section className="tab-section-hero fade-in" style={{ position: 'relative', overflow: 'hidden' }}>
        <HudReticle />
        <div className="container">
          <div className="about-hero-inner">
            <div className="tab-hero-text">
              <span className="section-label">About</span>
              <h1 className="tab-hero-headline">
                {displayed[0]}
                {!showSubtitle && <span className="type-cursor" />}
              </h1>
              {showSubtitle && (
                <p className="tab-hero-sub" style={{ color: 'var(--accent)' }}>
                  {displayed[1]}
                  {!showTagline && <span className="type-cursor" />}
                </p>
              )}
              {showTagline && (
                <p className="tab-hero-sub" style={{ opacity: 0.65, marginTop: '4px' }}>
                  {displayed[2]}
                  {!done && <span className="type-cursor" />}
                </p>
              )}
              <FlightStatus />
            </div>
            <div className="about-hero-right">
              <QuoteBlock size="large" />
              <div className="social-links-row">
                <span className="social-links-label">FIND ME AT →</span>
                <div className="social-links-icons">
                  <a href="https://github.com/aiproductlabs8/aiproductlabs" target="_blank" rel="noreferrer" className="social-icon-btn" aria-label="GitHub">
                    <GitHubIcon />
                  </a>
                  <a href="https://www.linkedin.com/in/rahilpopat" target="_blank" rel="noreferrer" className="social-icon-btn" aria-label="LinkedIn">
                    <LinkedInIcon />
                  </a>
                  <a href="https://x.com/rahilpopat" target="_blank" rel="noreferrer" className="social-icon-btn" aria-label="X / Twitter">
                    <XIcon />
                  </a>
                </div>
                <p className="social-links-disclaimer">AI Product Labs is my personal lab — one builder,<br />experimenting and sharing in public.<br />Not a company, not a consultancy.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="tab-section fade-in delay-1 reveal">
        <div className="container">
          <div className="about-inner">

            <div className="about-bio">
              {showBio && (
                <p className="about-p about-p--lead">
                  {displayed[3]}
                  {!done && <span className="type-cursor type-cursor--teal" />}
                </p>
              )}
              <p className="about-p">
                My foundation is aeronautical engineering — which taught me to treat complex systems with rigour: mapping failure modes, thinking in feedback loops, and defaulting to pragmatic over perfect.
              </p>
              <p className="about-p">
                That lens carried into a decade in financial services as a Senior Product Owner, where I worked at the intersection of emerging technology and strategy — across digital assets, tokenisation, and innovation programmes where the constraints were just as tight and the stakes just as real.
              </p>
              <p className="about-p">
                Now I apply all of it to building AI agents. The tools changed. The discipline didn't.
              </p>
              <p className="about-p">
                AI is moving fast — and I'm learning in public. Every project, decision, and dead end gets documented here, because the best way to help other PMs and engineers navigate this space is to show the journey, not just the destination.
              </p>
              <div className="current-focus-card">
                <div className="cfc-header">
                  <span className="cfc-dot" />
                  <span className="cfc-label">CURRENT FOCUS</span>
                </div>
                <div className="cfc-row">
                  <span className="cfc-key">BUILDING......... </span>
                  <span className="cfc-val">Agents to solve real world problems</span>
                </div>
                <div className="cfc-row">
                  <span className="cfc-key">OBSESSING OVER... </span>
                  <span className="cfc-val">Claude Code &amp; agentic memory</span>
                </div>
                <div className="cfc-row">
                  <span className="cfc-key">EXPERIMENTING.... </span>
                  <span className="cfc-val">Can a Raspberry Pi run a useful agent?<span className="cfc-cursor">█</span></span>
                </div>
              </div>

              <div className="about-tags">
                {[
                  { label: 'Systems Engineering',   cls: 'tag-amber' },
                  { label: 'Failure Mode Analysis', cls: 'tag-amber' },
                  { label: 'Agent Design',          cls: 'tag-teal'  },
                  { label: 'Evaluation',            cls: 'tag-teal'  },
                  { label: 'Prompt Engineering',    cls: 'tag-teal'  },
                  { label: 'Tool Use & MCP',        cls: 'tag-teal'  },
                  { label: 'Agentic AI',            cls: 'tag-teal'  },
                  { label: 'Orchestration',         cls: 'tag-teal'  },
                  { label: 'RAG Systems',           cls: 'tag-teal'  },
                  { label: 'Claude Code',           cls: 'tag-cyan'  },
                  { label: 'Memory & Context',      cls: 'tag-cyan'  },
                  { label: 'Human-in-the-Loop',     cls: 'tag-cyan'  },
                ].map(({ label, cls }) => (
                  <span key={label} className={`tag ${cls}`}>{label}</span>
                ))}
              </div>

              <ContrastCard />
              <SignalBoard onNavigate={onNavigate} onOpenArticle={onOpenArticle} />
            </div>

            <div className="about-credentials">
              <LabStatusCard />

              <GitHubActivity />

              <div className="about-stack-card">
                <div className="about-stack-label">Current Stack</div>
                <div className="about-stack-items">
                  {['RAG', 'Claude API', 'OpenClaw', 'Claude Code', 'Raspberry Pi 5', 'VS Code', 'GitHub Copilot'].map(t => (
                    <span key={t} className="spill spill-cyan">{t}</span>
                  ))}
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
                  <div className="cred-title">Oxford Blockchain Strategy Programme</div>
                  <div className="cred-sub">University of Oxford</div>
                </div>
              </div>
              <div className="cred-card">
                <div className="cred-icon"><img src="/cspo.png" alt="Scrum Alliance" style={{ height: '28px', width: 'auto', objectFit: 'contain' }} /></div>
                <div>
                  <div className="cred-title">Certified Scrum Product Owner</div>
                  <div className="cred-sub">Scrum Alliance</div>
                </div>
              </div>
              <div className="cred-card">
                <div className="cred-icon">
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <polygon points="14,2 24,10 14,14" fill="rgba(0,212,255,0.7)" />
                    <polygon points="4,10 14,2 14,14" fill="rgba(0,212,255,0.4)" />
                    <polygon points="14,14 24,10 14,26" fill="rgba(0,212,255,0.5)" />
                    <polygon points="4,10 14,14 14,26" fill="rgba(0,212,255,0.25)" />
                    <polygon points="4,10 14,14 24,10" fill="rgba(0,212,255,0.9)" />
                  </svg>
                </div>
                <div>
                  <div className="cred-title">Certified Ethereum Developer</div>
                  <div className="cred-sub">ConsenSys</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  )
}

/* ─── GitHub Activity Widget ─────────────────────────────── */
function GitHubActivity() {
  const [commits, setCommits] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    fetch('https://api.github.com/users/aiproductlabs8/events/public?per_page=30')
      .then(r => {
        if (!r.ok) return Promise.reject(new Error(`HTTP ${r.status}`))
        return r.json()
      })
      .then(events => {
        if (!Array.isArray(events)) return Promise.reject(new Error('unexpected response'))
        const pushes = events
          .filter(e => e.type === 'PushEvent')
          .flatMap(e =>
            (e.payload?.commits ?? []).map(c => ({
              message: c.message.split('\n')[0].slice(0, 60),
              repo: e.repo.name.replace('aiproductlabs8/', ''),
              date: new Date(e.created_at),
            }))
          )
          .slice(0, 3)
        setCommits(pushes)
        setLoading(false)
      })
      .catch(() => { setError(true); setLoading(false) })
  }, [])

  const timeAgo = (date) => {
    const diff = Math.floor((Date.now() - date) / 1000)
    if (diff < 3600)  return `${Math.floor(diff / 60)}m ago`
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
    return `${Math.floor(diff / 86400)}d ago`
  }

  return (
    <div className="gh-widget">
      <div className="gh-widget-header">
        <GitHubIcon />
        <span>Latest from the lab</span>
        <span className="gh-live-dot" />
      </div>
      {loading && <p className="gh-state">Fetching commits…</p>}
      {(error || (!loading && !error && commits.length === 0)) && (
        <div className="gh-fallback">
          <div className="gh-fallback-line">LAB ACTIVITY: CLASSIFIED</div>
          <a
            href="https://github.com/aiproductlabs8"
            target="_blank"
            rel="noreferrer"
            className="gh-fallback-link"
          >
            CHECK GITHUB FOR LATEST COMMITS
          </a>
        </div>
      )}
      {!loading && !error && commits.map((c, i) => (
        <div key={i} className="gh-commit">
          <span className="gh-commit-dot">›</span>
          <div className="gh-commit-body">
            <span className="gh-commit-msg">{c.message}</span>
            <span className="gh-commit-meta">{c.repo} · {timeAgo(c.date)}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

/* ─── Footer ─────────────────────────────────────────────── */
function Footer({ onSwitch }) {
  return (
    <footer id="footer">
      <div className="container footer-inner">
        <button className="footer-logo" onClick={() => onSwitch('about')}>
          Rahil<span>.</span>
        </button>
        <div className="footer-nav">
          {TABS.map(t => (
            <button key={t.id} className="footer-nav-link" onClick={() => onSwitch(t.id)}>
              {t.label}
            </button>
          ))}
        </div>
        <span className="footer-copy">© {new Date().getFullYear()} Rahil · Built with Claude · All thoughts and insights are my own.</span>
        <span className="footer-disclaimer">Disclaimer: This is a personal website. The views expressed are my own and do not represent the views of my employer or any affiliated organization.</span>
        <span className="footer-mono">Built by Rahil. Powered by curiosity and Claude Code. The Raspberry Pi is load-bearing.</span>
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
  const [bootDone, setBootDone] = useState(false)

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
    agents:   <AgentsTab />,
    stack:    <StackTab />,
    insights: <InsightsTab onReadMore={handleReadMore} />,
    about:    <AboutTab onNavigate={handleSwitch} onOpenArticle={handleReadMore} />,
  }

  const articleContent = openArticle === 'aero-to-ai'
    ? <AeroToAiPage onBack={handleBack} />
    : openArticle === 'pm-fundamentals'
    ? <PmFundamentalsPage onBack={handleBack} />
    : openArticle === 'personal-ai-research-assistant'
    ? <PersonalAiResearchAssistantPage onBack={handleBack} />
    : openArticle === 'meeting-to-prd'
    ? <MeetingToPrdPage onBack={handleBack} />
    : openArticle === 'jira-audit-agent'
    ? <JiraAuditAgentPage onBack={handleBack} />
    : null

  return (
    <>
      {!bootDone && <BootSequence onComplete={() => setBootDone(true)} />}
      <ReadingProgress />
      <ConstellationCanvas />
      <Navbar active={activeTab} onSwitch={handleSwitch} />
      <main className={`main${!bootDone ? ' main--booting' : ''}`}>
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
