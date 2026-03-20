import { useEffect, useRef } from 'react'

const ROWS = [
  { then: 'Flight dynamics',          bridge: 'Systems thinking',           now: 'Agent architecture'       },
  { then: 'Wind tunnels',             bridge: 'Experiment frameworks',       now: 'Evals & benchmarks'       },
  { then: 'Failure mode analysis',    bridge: 'Risk & edge case mapping',    now: 'Hallucination modes'      },
  { then: 'Structural load limits',   bridge: 'Constraints & tradeoffs',     now: 'Token budgets'            },
  { then: 'Safety margins',           bridge: 'Acceptable failure rates',    now: 'Guardrails'               },
  { then: 'Design assurance',         bridge: 'QA & sign-off processes',     now: 'Red-teaming'              },
  { then: 'Iterative testing',        bridge: 'Build / measure / learn',     now: 'Ship / measure / iterate' },
]

export default function ContrastCard() {
  const rowRefs = useRef([])

  useEffect(() => {
    rowRefs.current.forEach((el, i) => {
      if (!el) return
      setTimeout(() => el.classList.add('cc-row--visible'), 120 * i)
    })
  }, [])

  return (
    <div className="cc-wrap">
      <style>{`
        .cc-wrap {
          margin-top: 40px;
          font-family: var(--font-mono);
          border: 0.5px solid var(--border-subtle);
          border-radius: 8px;
          overflow: hidden;
          background: rgba(6, 12, 24, 0.6);
        }
        .cc-heading {
          padding: 10px 16px;
          font-size: 10px;
          letter-spacing: 0.14em;
          color: var(--text-3);
          opacity: 0.7;
          border-bottom: 0.5px solid var(--border-subtle);
          text-align: center;
        }
        .cc-heading span.cc-h-then { color: rgba(245, 158, 11, 0.8); }
        .cc-heading span.cc-h-bridge { color: rgba(74, 222, 128, 0.8); }
        .cc-heading span.cc-h-now { color: rgba(0, 212, 255, 0.8); }
        .cc-heading span.cc-h-arrow { color: var(--text-3); opacity: 0.5; margin: 0 6px; }
        .cc-header {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          border-bottom: 0.5px solid var(--border-subtle);
        }
        .cc-col-head {
          padding: 10px 16px;
          font-size: 10px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--text-3);
        }
        .cc-col-head:first-child {
          border-right: 0.5px solid var(--border-subtle);
          color: var(--amber);
        }
        .cc-col-head.cc-col-bridge {
          border-right: 0.5px solid var(--border-subtle);
          color: rgba(74, 222, 128, 0.8);
        }
        .cc-col-head:last-child {
          color: var(--accent);
        }
        .cc-row {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          border-bottom: 0.5px solid rgba(20, 36, 58, 0.5);
          opacity: 0;
          transform: translateY(6px);
          transition: opacity 0.35s ease, transform 0.35s ease;
        }
        .cc-row--visible {
          opacity: 1;
          transform: translateY(0);
        }
        .cc-row:last-of-type {
          border-bottom: none;
        }
        .cc-cell {
          padding: 9px 16px;
          font-size: 12px;
          color: var(--text-2);
          line-height: 1.5;
        }
        .cc-cell:first-child {
          border-right: 0.5px solid rgba(20, 36, 58, 0.5);
          color: rgba(245, 158, 11, 0.65);
        }
        .cc-cell.cc-cell-bridge {
          border-right: 0.5px solid rgba(20, 36, 58, 0.5);
          color: rgba(74, 222, 128, 0.7);
        }
        .cc-cell:last-child {
          color: rgba(0, 212, 255, 0.8);
        }
        .cc-footer {
          border-top: 0.5px solid var(--border-subtle);
          padding: 12px 16px;
          font-size: 11px;
          color: var(--text-3);
          font-style: italic;
        }
        .cc-footer strong {
          color: var(--text-2);
          font-style: normal;
        }
      `}</style>

      <div className="cc-heading">
        <span className="cc-h-then">Aeronautical Engineer</span>
        <span className="cc-h-arrow">→</span>
        <span className="cc-h-bridge">AI Product Manager</span>
        <span className="cc-h-arrow">→</span>
        <span className="cc-h-now">AI Agent Builder</span>
      </div>

      <div className="cc-header">
        <div className="cc-col-head">▶ THEN</div>
        <div className="cc-col-head cc-col-bridge">▶ BRIDGE</div>
        <div className="cc-col-head">▶ NOW</div>
      </div>

      {ROWS.map((row, i) => (
        <div
          key={i}
          className="cc-row"
          ref={el => rowRefs.current[i] = el}
        >
          <div className="cc-cell">{row.then}</div>
          <div className="cc-cell cc-cell-bridge">{row.bridge}</div>
          <div className="cc-cell">{row.now}</div>
        </div>
      ))}

      <div className="cc-footer">
        "An AI product without an eval is an aircraft without instruments. You're flying. You just don't know where." — <strong>RAHIL POPAT</strong>
      </div>
    </div>
  )
}
