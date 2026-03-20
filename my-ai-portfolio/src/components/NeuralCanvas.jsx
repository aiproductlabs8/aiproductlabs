import { useEffect, useRef, useState } from 'react'

const NODE_COLOURS = ['#00e5ff', '#1D9E75', '#7B61FF', '#00ff9d', '#0088ff', '#39d0ff']
const LABELS = ['AGENT','EVAL','MEMORY','TOOLS','MCP','PLAN','THINK','ACT','OBSERVE','ROUTE','SCORE','EMBED','PROMPT','CHAIN','LOOP']
const MAX_NODES = 60
const GRID_SIZE = 40
const CONNECTION_RATIO = 0.28

function makeNode(w, h, immediate = false) {
  const colour = NODE_COLOURS[Math.floor(Math.random() * NODE_COLOURS.length)]
  return {
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.35,
    vy: (Math.random() - 0.5) * 0.35,
    r: 2.5 + Math.random() * 2,
    colour,
    label: Math.random() < 0.18 ? LABELS[Math.floor(Math.random() * LABELS.length)] : null,
    labelOpacity: 0,
    alpha: immediate ? 1 : 0,
    born: immediate ? -9999 : Date.now(),
  }
}

export default function NeuralCanvas({ tagline = 'AGENTS · MEMORY · ORCHESTRATION · EVALS' }) {
  const canvasRef = useRef(null)
  const stateRef = useRef({
    nodes: [],
    signals: [],
    scanX: 0,
    paused: false,
    rafId: null,
    overlayOpacity: 0,
  })
  const [stats, setStats] = useState({ nodes: 0, connections: 0, signals: 0 })
  const [paused, setPaused] = useState(false)

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

    // Seed 20 nodes immediately
    for (let i = 0; i < 20; i++) s.nodes.push(makeNode(canvas.width, canvas.height, true))

    // Gradually spawn the rest
    let spawnCount = 20
    const spawnInterval = setInterval(() => {
      if (spawnCount >= MAX_NODES) { clearInterval(spawnInterval); return }
      s.nodes.push(makeNode(canvas.width, canvas.height, false))
      spawnCount++
    }, 120)

    const fireSignal = () => {
      if (s.nodes.length < 2) return
      const a = s.nodes[Math.floor(Math.random() * s.nodes.length)]
      const nearby = s.nodes.filter(b => {
        if (b === a) return false
        const dx = b.x - a.x, dy = b.y - a.y
        return Math.sqrt(dx*dx + dy*dy) < canvas.width * CONNECTION_RATIO
      })
      if (!nearby.length) return
      const b = nearby[Math.floor(Math.random() * nearby.length)]
      s.signals.push({ x: a.x, y: a.y, tx: b.x, ty: b.y, sx: a.x, sy: a.y, progress: 0, colour: a.colour, ripple: 0, arrived: false })
    }
    const signalInterval = setInterval(fireSignal, 600)

    const draw = () => {
      if (s.paused) { s.rafId = requestAnimationFrame(draw); return }
      const W = canvas.width, H = canvas.height
      ctx.clearRect(0, 0, W, H)

      // Background
      ctx.fillStyle = '#050d1a'
      ctx.fillRect(0, 0, W, H)

      // Grid
      ctx.strokeStyle = 'rgba(29,158,117,0.06)'
      ctx.lineWidth = 1
      for (let x = 0; x < W; x += GRID_SIZE) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke()
      }
      for (let y = 0; y < H; y += GRID_SIZE) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke()
      }

      // Scanline
      s.scanX = (s.scanX + 0.4) % W
      const scan = ctx.createLinearGradient(s.scanX - 60, 0, s.scanX + 60, 0)
      scan.addColorStop(0, 'rgba(0,229,255,0)')
      scan.addColorStop(0.5, 'rgba(0,229,255,0.04)')
      scan.addColorStop(1, 'rgba(0,229,255,0)')
      ctx.fillStyle = scan
      ctx.fillRect(s.scanX - 60, 0, 120, H)

      const now = Date.now()
      let connCount = 0

      // Connections
      for (let i = 0; i < s.nodes.length; i++) {
        for (let j = i + 1; j < s.nodes.length; j++) {
          const a = s.nodes[i], b = s.nodes[j]
          const dx = b.x - a.x, dy = b.y - a.y
          const dist = Math.sqrt(dx*dx + dy*dy)
          if (dist < W * CONNECTION_RATIO) {
            const fade = 1 - dist / (W * CONNECTION_RATIO)
            ctx.strokeStyle = `rgba(0,229,255,${0.06 * fade * Math.min(a.alpha, b.alpha)})`
            ctx.lineWidth = 0.5
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke()
            connCount++
          }
        }
      }

      // Nodes
      for (const n of s.nodes) {
        const age = (now - n.born) / 800
        n.alpha = Math.min(1, n.alpha + (age > 0 ? 0.02 : 0))

        n.x += n.vx; n.y += n.vy
        if (n.x < 0 || n.x > W) { n.vx *= -1; n.x = Math.max(0, Math.min(W, n.x)) }
        if (n.y < 0 || n.y > H) { n.vy *= -1; n.y = Math.max(0, Math.min(H, n.y)) }

        if (n.alpha <= 0) continue

        // Glow
        const glow = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 4)
        glow.addColorStop(0, n.colour + Math.floor(n.alpha * 0x33).toString(16).padStart(2,'0'))
        glow.addColorStop(1, 'transparent')
        ctx.fillStyle = glow
        ctx.beginPath(); ctx.arc(n.x, n.y, n.r * 4, 0, Math.PI * 2); ctx.fill()

        // Core dot
        ctx.fillStyle = n.colour + Math.floor(n.alpha * 0xCC).toString(16).padStart(2,'0')
        ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2); ctx.fill()

        // Label
        if (n.label) {
          n.labelOpacity = Math.min(0.6, n.labelOpacity + 0.01)
          ctx.font = '9px monospace'
          ctx.fillStyle = `rgba(0,229,255,${n.labelOpacity * n.alpha})`
          ctx.fillText(n.label, n.x + n.r + 4, n.y + 3)
        }
      }

      // Signals
      for (let i = s.signals.length - 1; i >= 0; i--) {
        const sig = s.signals[i]
        sig.progress = Math.min(1, sig.progress + 0.018)
        sig.x = sig.sx + (sig.tx - sig.sx) * sig.progress
        sig.y = sig.sy + (sig.ty - sig.sy) * sig.progress

        // Trail
        const trailLen = 0.12
        const t0 = Math.max(0, sig.progress - trailLen)
        const tx0 = sig.sx + (sig.tx - sig.sx) * t0
        const ty0 = sig.sy + (sig.ty - sig.sy) * t0
        const trail = ctx.createLinearGradient(tx0, ty0, sig.x, sig.y)
        trail.addColorStop(0, 'rgba(0,229,255,0)')
        trail.addColorStop(1, sig.colour + 'cc')
        ctx.strokeStyle = trail
        ctx.lineWidth = 1.5
        ctx.beginPath(); ctx.moveTo(tx0, ty0); ctx.lineTo(sig.x, sig.y); ctx.stroke()

        // Leading dot glow
        const dotGlow = ctx.createRadialGradient(sig.x, sig.y, 0, sig.x, sig.y, 8)
        dotGlow.addColorStop(0, sig.colour + 'cc')
        dotGlow.addColorStop(1, 'transparent')
        ctx.fillStyle = dotGlow
        ctx.beginPath(); ctx.arc(sig.x, sig.y, 8, 0, Math.PI * 2); ctx.fill()

        ctx.fillStyle = '#fff'
        ctx.beginPath(); ctx.arc(sig.x, sig.y, 2, 0, Math.PI * 2); ctx.fill()

        // Arrival ripple
        if (sig.progress >= 1) {
          if (!sig.arrived) { sig.arrived = true; sig.ripple = 0 }
          sig.ripple += 0.06
          const rAlpha = Math.max(0, 0.5 - sig.ripple * 0.5)
          ctx.strokeStyle = sig.colour + Math.floor(rAlpha * 255).toString(16).padStart(2,'0')
          ctx.lineWidth = 1
          ctx.beginPath(); ctx.arc(sig.tx, sig.ty, sig.ripple * 20, 0, Math.PI * 2); ctx.stroke()
          if (sig.ripple > 1) s.signals.splice(i, 1)
        }
      }

      // Overlay fade-in
      s.overlayOpacity = Math.min(1, s.overlayOpacity + 0.008)

      setStats({ nodes: s.nodes.length, connections: connCount, signals: s.signals.length })
      s.rafId = requestAnimationFrame(draw)
    }

    s.rafId = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(s.rafId)
      clearInterval(spawnInterval)
      clearInterval(signalInterval)
      window.removeEventListener('resize', resize)
    }
  }, [])

  const handleSpawn = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const s = stateRef.current
    for (let i = 0; i < 8; i++) s.nodes.push(makeNode(canvas.width, canvas.height, false))
  }

  const handlePause = () => {
    stateRef.current.paused = !stateRef.current.paused
    setPaused(p => !p)
  }

  return (
    <div style={{ position: 'relative', width: '100%', height: `min(160px, 16vw)`, background: '#050d1a', overflow: 'hidden', display: 'block' }}>
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />


      {/* Bottom left stats */}
      <div style={{
        position: 'absolute', bottom: '14px', left: '16px',
        fontFamily: 'monospace', fontSize: '10px', color: 'rgba(29,158,117,0.55)',
        letterSpacing: '0.08em', pointerEvents: 'none',
      }}>
        NODES: {stats.nodes} | CONNECTIONS: {stats.connections} | SIGNALS: {stats.signals}
      </div>

      {/* Bottom right buttons */}
      <div style={{ position: 'absolute', bottom: '10px', right: '14px', display: 'flex', gap: '8px' }}>
        <button onClick={handleSpawn} style={{
          fontFamily: 'monospace', fontSize: '10px', color: 'rgba(0,229,255,0.7)',
          background: 'transparent', border: '0.5px solid rgba(0,229,255,0.3)',
          borderRadius: '4px', padding: '5px 10px', cursor: 'pointer', letterSpacing: '0.08em',
          transition: 'border-color 0.2s, color 0.2s',
        }}
          onMouseEnter={e => { e.target.style.borderColor = 'rgba(0,229,255,0.7)'; e.target.style.color = '#00e5ff' }}
          onMouseLeave={e => { e.target.style.borderColor = 'rgba(0,229,255,0.3)'; e.target.style.color = 'rgba(0,229,255,0.7)' }}
        >
          SPAWN AGENTS
        </button>
        <button onClick={handlePause} style={{
          fontFamily: 'monospace', fontSize: '10px', color: 'rgba(0,229,255,0.7)',
          background: 'transparent', border: '0.5px solid rgba(0,229,255,0.3)',
          borderRadius: '4px', padding: '5px 10px', cursor: 'pointer', letterSpacing: '0.08em',
          transition: 'border-color 0.2s, color 0.2s',
        }}
          onMouseEnter={e => { e.target.style.borderColor = 'rgba(0,229,255,0.7)'; e.target.style.color = '#00e5ff' }}
          onMouseLeave={e => { e.target.style.borderColor = 'rgba(0,229,255,0.3)'; e.target.style.color = 'rgba(0,229,255,0.7)' }}
        >
          {paused ? 'RESUME' : 'PAUSE'}
        </button>
      </div>

      <style>{`
        @keyframes ncFadeIn {
          from { opacity: 0; transform: translate(-50%, -46%); }
          to   { opacity: 1; transform: translate(-50%, -50%); }
        }
      `}</style>
    </div>
  )
}
