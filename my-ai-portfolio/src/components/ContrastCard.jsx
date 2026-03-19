import { useEffect, useRef } from 'react'

const ROWS = [
  { then: 'Flight dynamics',          now: 'Agent architecture'       },
  { then: 'Wind tunnels',             now: 'Evals & benchmarks'       },
  { then: 'Failure mode analysis',    now: 'Hallucination modes'      },
  { then: 'Structural load limits',   now: 'Token budgets'            },
  { then: 'Safety margins',           now: 'Guardrails'               },
  { then: 'Design assurance',         now: 'Red-teaming'              },
  { then: 'Iterative testing',        now: 'Ship / measure / iterate' },
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
        .cc-header {
          display: grid;
          grid-template-columns: 1fr 1fr;
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
        .cc-col-head:last-child {
          color: var(--accent);
        }
        .cc-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
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

      <div className="cc-header">
        <div className="cc-col-head">▶ THEN</div>
        <div className="cc-col-head">▶ NOW</div>
      </div>

      {ROWS.map((row, i) => (
        <div
          key={i}
          className="cc-row"
          ref={el => rowRefs.current[i] = el}
        >
          <div className="cc-cell">{row.then}</div>
          <div className="cc-cell">{row.now}</div>
        </div>
      ))}

      <div className="cc-footer">
        "That's still the job." — <strong>RAHIL POPAT</strong>
      </div>
    </div>
  )
}
