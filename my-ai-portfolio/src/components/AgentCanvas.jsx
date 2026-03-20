import { useEffect, useRef, useState } from 'react'

const NODE_COLOURS = ['#00e5ff','#1D9E75','#7B61FF','#00ff9d','#00aaff','#39d0ff','#FFB800','#FF6B6B']
const LABELS = ['AGENT','EVAL','MEMORY','MCP','PLAN','THINK','ACT','OBSERVE','ROUTE','EMBED','PROMPT','CHAIN','TOOL','RAG','LLM','SCORE','LOOP','SPAWN','CALL','REASON']
const SIGNAL_TYPES = [
  { type: 'data', colour: '#00e5ff' },
  { type: 'eval', colour: '#1D9E75' },
  { type: 'mem',  colour: '#7B61FF' },
  { type: 'exec', colour: '#00ff9d' },
]
const STREAM_CHARS = 'ABCDEF0123456789>-=+·:.→⟶⟹'
const MAX_NODES = 55
const HEX_SIZE = 35

function hex(ctx, cx, cy, size) {
  ctx.beginPath()
  for (let i = 0; i < 6; i++) {
    const a = (Math.PI / 3) * i - Math.PI / 6
    const x = cx + size * Math.cos(a)
    const y = cy + size * Math.sin(a)
    i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
  }
  ctx.closePath()
}

function makeNode(W, H, x, y) {
  const roll = Math.random()
  const size = roll < 0.12 ? 'hub' : roll < 0.5 ? 'mid' : 'small'
  const r = size === 'hub' ? 5 + Math.random() * 3 : size === 'mid' ? 2.5 + Math.random() * 1.5 : 0.5 + Math.random() * 1.5
  return {
    x: x ?? Math.random() * W,
    y: y ?? Math.random() * H,
    vx: (Math.random() - 0.5) * 0.3,
    vy: (Math.random() - 0.5) * 0.3,
    r, size,
    colour: NODE_COLOURS[Math.floor(Math.random() * NODE_COLOURS.length)],
    label: Math.random() < 0.12 ? LABELS[Math.floor(Math.random() * LABELS.length)] : null,
    alpha: 0,
    born: Date.now(),
    ox: x ?? null, oy: y ?? null,
  }
}

function makeStream(W, H) {
  const fromLeft = Math.random() < 0.5
  const chars = Array.from({ length: 12 + Math.floor(Math.random() * 16) }, () =>
    STREAM_CHARS[Math.floor(Math.random() * STREAM_CHARS.length)]
  )
  return {
    x: fromLeft ? -chars.length * 8 : W + chars.length * 8,
    y: 20 + Math.random() * (H - 40),
    chars,
    dir: fromLeft ? 1 : -1,
    speed: 1.2 + Math.random() * 1.6,
    colour: Math.random() < 0.6 ? '#00e5ff' : '#1D9E75',
    alpha: 0,
    dead: false,
    fromLeft,
    W,
  }
}

export default function AgentCanvas() {
  const canvasRef = useRef(null)
  const stateRef = useRef({
    nodes: [], signals: [], streams: [], ripples: [],
    constellations: [], constFrame: 0,
    mouse: null, paused: false, rafId: null,
    frame: 0, statsFrame: 0,
  })
  const [stats, setStats] = useState({ nodes: 0, connections: 0, signals: 0, streams: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const s = stateRef.current

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = Math.min(160, canvas.offsetWidth * 0.16)
    }
    resize()
    window.addEventListener('resize', resize)

    // Seed initial nodes
    for (let i = 0; i < MAX_NODES; i++) s.nodes.push(makeNode(canvas.width, canvas.height))

    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      s.mouse = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }
    const onMouseLeave = () => { s.mouse = null }
    const onClick = (e) => {
      const rect = canvas.getBoundingClientRect()
      const cx = e.clientX - rect.left, cy = e.clientY - rect.top
      for (let i = 0; i < 6; i++) s.nodes.push(makeNode(canvas.width, canvas.height, cx + (Math.random()-0.5)*30, cy + (Math.random()-0.5)*30))
      s.ripples.push({ x: cx, y: cy, r: 0, colour: '#00e5ff', alpha: 0.6 })
      s.ripples.push({ x: cx, y: cy, r: 0, colour: '#1D9E75', alpha: 0.4, delay: 8 })
    }
    canvas.addEventListener('mousemove', onMouseMove)
    canvas.addEventListener('mouseleave', onMouseLeave)
    canvas.addEventListener('click', onClick)

    const draw = () => {
      if (s.paused) { s.rafId = requestAnimationFrame(draw); return }
      const W = canvas.width, H = canvas.height
      s.frame++

      ctx.clearRect(0, 0, W, H)
      ctx.fillStyle = '#020810'
      ctx.fillRect(0, 0, W, H)

      // ── Hex grid ──
      ctx.strokeStyle = 'rgba(29,158,117,0.04)'
      ctx.lineWidth = 0.8
      const hx = HEX_SIZE * Math.sqrt(3)
      const hy = HEX_SIZE * 1.5
      const cols = Math.ceil(W / hx) + 2
      const rows = Math.ceil(H / hy) + 2
      for (let row = -1; row < rows; row++) {
        for (let col = -1; col < cols; col++) {
          const cx = col * hx + (row % 2 === 0 ? 0 : hx / 2)
          const cy = row * hy
          hex(ctx, cx, cy, HEX_SIZE)
          ctx.stroke()
        }
      }

      // ── Mouse rings ──
      if (s.mouse) {
        for (let i = 1; i <= 3; i++) {
          ctx.strokeStyle = `rgba(0,229,255,0.04)`
          ctx.lineWidth = 0.5
          ctx.beginPath()
          ctx.arc(s.mouse.x, s.mouse.y, i * 22, 0, Math.PI * 2)
          ctx.stroke()
        }
        ctx.strokeStyle = 'rgba(0,229,255,0.12)'
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.arc(s.mouse.x, s.mouse.y, 60, 0, Math.PI * 2)
        ctx.stroke()
      }

      // ── Constellations ──
      s.constFrame++
      if (s.constFrame > (300 + Math.random() * 200) && s.nodes.length >= 3) {
        s.constFrame = 0
        const picks = []
        const pool = [...s.nodes].sort(() => Math.random() - 0.5)
        for (const n of pool) { if (picks.length < 3 + Math.floor(Math.random() * 3)) picks.push(n) }
        s.constellations.push({ nodes: picks, life: 80 + Math.random() * 60, age: 0 })
      }
      for (let i = s.constellations.length - 1; i >= 0; i--) {
        const c = s.constellations[i]
        c.age++
        const t = c.age / c.life
        const a = t < 0.3 ? t / 0.3 : t > 0.7 ? (1 - t) / 0.3 : 1
        ctx.strokeStyle = `rgba(29,158,117,${0.04 + 0.04 * a})`
        ctx.lineWidth = 0.5
        ctx.beginPath()
        c.nodes.forEach((n, idx) => idx === 0 ? ctx.moveTo(n.x, n.y) : ctx.lineTo(n.x, n.y))
        ctx.closePath()
        ctx.stroke()
        if (c.age >= c.life) s.constellations.splice(i, 1)
      }

      // ── Connection lines + count ──
      let connCount = 0
      const threshold = W * 0.25
      for (let i = 0; i < s.nodes.length; i++) {
        for (let j = i + 1; j < s.nodes.length; j++) {
          const a = s.nodes[i], b = s.nodes[j]
          const dx = b.x - a.x, dy = b.y - a.y
          const dist = Math.sqrt(dx*dx + dy*dy)
          if (dist < threshold) {
            const fade = (1 - dist / threshold) * Math.min(a.alpha, b.alpha)
            ctx.strokeStyle = `${a.colour}${Math.floor(fade * 0x18).toString(16).padStart(2,'0')}`
            ctx.lineWidth = 0.3
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke()
            connCount++
          }
        }
      }

      // ── Data streams ──
      for (let i = s.streams.length - 1; i >= 0; i--) {
        const st = s.streams[i]
        st.x += st.dir * st.speed
        st.alpha = Math.min(0.4, st.alpha + 0.02)
        ctx.font = '8px monospace'
        st.chars.forEach((ch, ci) => {
          const px = st.x + ci * 8 * st.dir
          const fade = ci / st.chars.length
          ctx.fillStyle = `${st.colour}${Math.floor(st.alpha * (0.3 + fade * 0.7) * 255).toString(16).padStart(2,'0')}`
          ctx.fillText(ch, px, st.y)
        })
        const edge = st.fromLeft ? st.x > W + 200 : st.x < -200
        if (edge) s.streams.splice(i, 1)
      }
      if (s.frame % 55 === 0 && s.streams.length < 6) {
        s.streams.push(makeStream(W, H))
      }

      // ── Ripples ──
      for (let i = s.ripples.length - 1; i >= 0; i--) {
        const rp = s.ripples[i]
        if (rp.delay) { rp.delay--; continue }
        rp.r += 2.5; rp.alpha -= 0.018
        if (rp.alpha <= 0) { s.ripples.splice(i, 1); continue }
        ctx.strokeStyle = `${rp.colour}${Math.floor(rp.alpha * 255).toString(16).padStart(2,'0')}`
        ctx.lineWidth = 1
        ctx.beginPath(); ctx.arc(rp.x, rp.y, rp.r, 0, Math.PI * 2); ctx.stroke()
      }

      // ── Signals ──
      for (let i = s.signals.length - 1; i >= 0; i--) {
        const sig = s.signals[i]
        sig.progress = Math.min(1, sig.progress + 0.016)
        sig.x = sig.sx + (sig.tx - sig.sx) * sig.progress
        sig.y = sig.sy + (sig.ty - sig.sy) * sig.progress
        sig.trail.push({ x: sig.x, y: sig.y })
        if (sig.trail.length > 24) sig.trail.shift()

        // Trail
        for (let t = 1; t < sig.trail.length; t++) {
          const ta = (t / sig.trail.length) * 0.6
          ctx.strokeStyle = `${sig.colour}${Math.floor(ta * 255).toString(16).padStart(2,'0')}`
          ctx.lineWidth = 1 + t / sig.trail.length
          ctx.beginPath()
          ctx.moveTo(sig.trail[t-1].x, sig.trail[t-1].y)
          ctx.lineTo(sig.trail[t].x, sig.trail[t].y)
          ctx.stroke()
        }

        // Glowing head
        const glow = ctx.createRadialGradient(sig.x, sig.y, 0, sig.x, sig.y, 10)
        glow.addColorStop(0, sig.colour + 'aa')
        glow.addColorStop(1, 'transparent')
        ctx.fillStyle = glow
        ctx.beginPath(); ctx.arc(sig.x, sig.y, 10, 0, Math.PI * 2); ctx.fill()
        ctx.fillStyle = '#ffffff'
        ctx.beginPath(); ctx.arc(sig.x, sig.y, 2, 0, Math.PI * 2); ctx.fill()

        if (sig.progress >= 1) {
          s.ripples.push({ x: sig.tx, y: sig.ty, r: 0, colour: sig.colour, alpha: 0.5 })
          s.signals.splice(i, 1)
        }
      }

      // Fire signals
      if (s.frame % 22 === 0 && s.signals.length < 30 && s.nodes.length >= 2) {
        const hubs = s.nodes.filter(n => n.size === 'hub' && n.alpha > 0.5)
        const pool = hubs.length >= 2 ? hubs : s.nodes.filter(n => n.alpha > 0.5)
        if (pool.length >= 2) {
          const a = pool[Math.floor(Math.random() * pool.length)]
          const near = pool.filter(b => {
            if (b === a) return false
            const dx = b.x - a.x, dy = b.y - a.y
            return Math.sqrt(dx*dx + dy*dy) < threshold
          })
          if (near.length) {
            const b = near[Math.floor(Math.random() * near.length)]
            const st = SIGNAL_TYPES[Math.floor(Math.random() * SIGNAL_TYPES.length)]
            s.signals.push({ x: a.x, y: a.y, sx: a.x, sy: a.y, tx: b.x, ty: b.y, progress: 0, colour: st.colour, trail: [] })
          }
        }
      }

      // ── Nodes ──
      const now = Date.now()
      for (let i = s.nodes.length - 1; i >= 0; i--) {
        const n = s.nodes[i]
        n.alpha = Math.min(1, (now - n.born) / 900)

        // Mouse repulsion
        if (s.mouse) {
          const dx = n.x - s.mouse.x, dy = n.y - s.mouse.y
          const dist = Math.sqrt(dx*dx + dy*dy)
          if (dist < 120 && dist > 0) {
            const force = (120 - dist) / 120 * 0.8
            n.vx += (dx / dist) * force
            n.vy += (dy / dist) * force
          }
        }

        // Dampen velocity
        n.vx *= 0.98; n.vy *= 0.98
        n.vx = Math.max(-1.2, Math.min(1.2, n.vx))
        n.vy = Math.max(-1.2, Math.min(1.2, n.vy))
        n.x += n.vx; n.y += n.vy
        if (n.x < 0 || n.x > W) { n.vx *= -1; n.x = Math.max(0, Math.min(W, n.x)) }
        if (n.y < 0 || n.y > H) { n.vy *= -1; n.y = Math.max(0, Math.min(H, n.y)) }

        if (n.alpha <= 0.02) continue

        // Hub glow rings
        if (n.size === 'hub') {
          for (let ri = 1; ri <= 2; ri++) {
            ctx.strokeStyle = `${n.colour}${Math.floor(n.alpha * 0.12 * 255).toString(16).padStart(2,'0')}`
            ctx.lineWidth = 0.5
            ctx.beginPath(); ctx.arc(n.x, n.y, n.r * (ri * 2.2), 0, Math.PI * 2); ctx.stroke()
          }
        }

        // Glow fill
        const glow = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 3.5)
        glow.addColorStop(0, n.colour + Math.floor(n.alpha * 0.35 * 255).toString(16).padStart(2,'0'))
        glow.addColorStop(1, 'transparent')
        ctx.fillStyle = glow
        ctx.beginPath(); ctx.arc(n.x, n.y, n.r * 3.5, 0, Math.PI * 2); ctx.fill()

        // Core
        ctx.fillStyle = n.colour + Math.floor(n.alpha * 0.9 * 255).toString(16).padStart(2,'0')
        ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2); ctx.fill()

        // Label
        if (n.label) {
          ctx.font = '8px monospace'
          ctx.fillStyle = `rgba(0,229,255,${n.alpha * 0.55})`
          ctx.fillText(n.label, n.x + n.r + 4, n.y + 3)
        }
      }

      // Trim excess nodes (keep max)
      while (s.nodes.length > MAX_NODES + 24) s.nodes.shift()

      // Spawn if below limit
      if (s.frame % 25 === 0 && s.nodes.length < MAX_NODES) {
        s.nodes.push(makeNode(W, H))
      }

      // Stats update
      s.statsFrame++
      if (s.statsFrame >= 45) {
        s.statsFrame = 0
        setStats({ nodes: s.nodes.length, connections: connCount, signals: s.signals.length, streams: s.streams.length })
      }

      s.rafId = requestAnimationFrame(draw)
    }

    s.rafId = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(s.rafId)
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('mousemove', onMouseMove)
      canvas.removeEventListener('mouseleave', onMouseLeave)
      canvas.removeEventListener('click', onClick)
    }
  }, [])

  return (
    <div style={{ position: 'relative', width: '100%', height: 'min(160px, 16vw)', background: '#020810', overflow: 'hidden', display: 'block', cursor: 'crosshair' }}>
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />

      {/* Corner brackets */}
      {[
        { top: 12, left: 12, borderTop: '1px solid', borderLeft: '1px solid', borderBottom: 'none', borderRight: 'none' },
        { top: 12, right: 12, borderTop: '1px solid', borderRight: '1px solid', borderBottom: 'none', borderLeft: 'none' },
        { bottom: 12, left: 12, borderBottom: '1px solid', borderLeft: '1px solid', borderTop: 'none', borderRight: 'none' },
        { bottom: 12, right: 12, borderBottom: '1px solid', borderRight: '1px solid', borderTop: 'none', borderLeft: 'none' },
      ].map((style, i) => (
        <div key={i} style={{ position: 'absolute', width: 20, height: 20, borderColor: 'rgba(0,229,255,0.4)', pointerEvents: 'none', ...style }} />
      ))}

      {/* Scanline */}
      <div style={{
        position: 'absolute', top: 0, left: 0, width: '100%', height: '2px',
        background: 'rgba(0,229,255,0.03)', pointerEvents: 'none',
        animation: 'acScanline 4s linear infinite',
      }} />


      {/* Bottom stats */}
      <div style={{
        position: 'absolute', bottom: 12, left: '50%', transform: 'translateX(-50%)',
        fontFamily: 'monospace', fontSize: '9px', color: 'rgba(29,158,117,0.5)',
        letterSpacing: '0.1em', pointerEvents: 'none', whiteSpace: 'nowrap',
      }}>
        NODES: {stats.nodes} · CONNECTIONS: {stats.connections} · SIGNALS: {stats.signals} · STREAMS: {stats.streams}
      </div>

      <style>{`
        @keyframes acScanline {
          from { top: -2px; }
          to   { top: 100%; }
        }
      `}</style>
    </div>
  )
}
