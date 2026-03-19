import { useEffect } from 'react';

export default function FlightStatus() {
  useEffect(() => {
    const timings = [
      { id: 's1', delay: 300 },
      { id: 'c1', delay: 700 },
      { id: 's2', delay: 1000 },
      { id: 'c2', delay: 1400 },
      { id: 's3', delay: 1700 },
    ];
    const timeouts = timings.map(({ id, delay }) =>
      setTimeout(() => {
        const el = document.getElementById(id);
        if(el) el.classList.add('visible');
      }, delay)
    );
    return () => timeouts.forEach(clearTimeout);
  }, []);

  return (
    <div style={{
      width: '100%',
      marginTop: '1.5rem',
      marginBottom: '0.5rem',
    }}>
      <style>{`
        .fs-wrap {
          display: flex;
          align-items: center;
          gap: 0;
          width: 100%;
        }
        .fs-step {
          display: flex;
          flex-direction: column;
          align-items: center;
          flex: 1;
          opacity: 0;
          transform: translateY(8px);
          transition: opacity 0.5s ease, transform 0.5s ease;
        }
        .fs-step.visible {
          opacity: 1;
          transform: translateY(0);
        }
        .fs-icon {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: monospace;
          font-size: 13px;
          flex-shrink: 0;
        }
        .fs-icon-done {
          border: 0.5px solid rgba(0,229,255,0.25);
          color: rgba(0,229,255,0.6);
          background: rgba(0,229,255,0.04);
        }
        .fs-icon-active {
          border: 0.5px solid rgba(0,229,255,0.6);
          background: rgba(0,229,255,0.08);
        }
        .fs-label {
          font-family: monospace;
          font-size: 9px;
          letter-spacing: 1.5px;
          text-align: center;
          margin-top: 8px;
        }
        .fs-label-done { color: rgba(0,229,255,0.45); }
        .fs-label-active { color: #00e5ff; }
        .fs-sub {
          font-family: monospace;
          font-size: 8px;
          color: rgba(180,200,220,0.3);
          text-align: center;
          margin-top: 3px;
          letter-spacing: 0.5px;
        }
        .fs-connector {
          flex: 1;
          height: 0.5px;
          background: rgba(0,229,255,0.08);
          margin-bottom: 28px;
          position: relative;
          overflow: hidden;
        }
        .fs-connector-fill {
          position: absolute;
          top: 0; left: 0;
          height: 100%;
          width: 0%;
          background: rgba(0,229,255,0.25);
          transition: width 0.6s ease;
        }
        .fs-connector-fill.visible { width: 100%; }
        .fs-active-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #4ade80;
          margin: 0 auto 5px;
          animation: fs-pulse 2s infinite;
        }
        @keyframes fs-pulse {
          0%,100% {
            opacity: 1;
            box-shadow: 0 0 0 0 rgba(74,222,128,0.4);
          }
          50% {
            opacity: 0.6;
            box-shadow: 0 0 0 4px rgba(74,222,128,0);
          }
        }
        .fs-ai-text {
          font-family: monospace;
          font-size: 13px;
          font-weight: 500;
          line-height: 1;
        }
        .fs-ai-main { color: #00e5ff; }
        .fs-ai-rest { color: rgba(0,229,255,0.3); }
        .fs-preflight {
          font-family: monospace;
          font-size: 8px;
          color: rgba(0,229,255,0.35);
          text-align: center;
          margin-top: 4px;
          letter-spacing: 1px;
        }
      `}</style>

      <div className="fs-wrap">
        <div className="fs-step" id="s1">
          <div className="fs-icon fs-icon-done">✓</div>
          <div className="fs-label fs-label-done">
            SYSTEMS READY
          </div>
          <div className="fs-sub">Foundations complete</div>
        </div>

        <div className="fs-connector">
          <div className="fs-connector-fill" id="c1"></div>
        </div>

        <div className="fs-step" id="s2">
          <div className="fs-icon fs-icon-done">✓</div>
          <div className="fs-label fs-label-done">
            READY FOR TAKEOFF
          </div>
          <div className="fs-sub">Runway cleared</div>
        </div>

        <div className="fs-connector">
          <div className="fs-connector-fill" id="c2"></div>
        </div>

        <div className="fs-step" id="s3">
          <div className="fs-active-dot"></div>
          <div className="fs-icon fs-icon-active">
            <span className="fs-ai-text">
              <span className="fs-ai-main">AI</span>
              <span className="fs-ai-rest">(BORNE)</span>
            </span>
          </div>
          <div className="fs-label fs-label-active">
            AI(BORNE)
          </div>
          <div className="fs-preflight">
            Pre-flight checks: complete.
          </div>
        </div>
      </div>
    </div>
  );
}
