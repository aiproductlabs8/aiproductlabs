import { useEffect } from 'react';

export default function SignalBoard({ onNavigate, onOpenArticle }) {
  useEffect(() => {
    const rows = ['sb-r1', 'sb-r2', 'sb-r3', 'sb-r4', 'sb-r5', 'sb-r6', 'sb-r7'];
    const timeouts = rows.map((id, i) =>
      setTimeout(() => {
        const el = document.getElementById(id);
        if(el) el.classList.add('sb-visible');
      }, 200 + i * 200)
    );
    return () => timeouts.forEach(clearTimeout);
  }, []);

  return (
    <div style={{
      background: '#060d1a',
      borderRadius: '16px',
      padding: '2rem',
      fontFamily: 'monospace',
      width: '100%',
      marginTop: '2rem',
    }}>
      <style>{`
        .sb-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.5rem;
        }
        .sb-header-left {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .sb-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #4ade80;
          animation: sb-pulse 2s infinite;
          flex-shrink: 0;
        }
        @keyframes sb-pulse {
          0%,100% { opacity: 1; }
          50%      { opacity: 0.3; }
        }
        .sb-title {
          font-size: 10px;
          letter-spacing: 2px;
          color: rgba(0,229,255,0.5);
        }
        .sb-view-all {
          font-size: 9px;
          letter-spacing: 2px;
          color: rgba(0,229,255,0.35);
          cursor: pointer;
          border-bottom: 0.5px solid rgba(0,229,255,0.2);
          padding-bottom: 1px;
          transition: color 0.2s;
          background: none;
          border-top: none;
          border-left: none;
          border-right: none;
          font-family: monospace;
        }
        .sb-view-all:hover { color: rgba(0,229,255,0.7); }
        .sb-divider {
          height: 0.5px;
          background: rgba(0,229,255,0.1);
        }
        .sb-col-headers {
          display: grid;
          grid-template-columns: 80px 1fr 170px 90px;
          gap: 1rem;
          padding: 8px 12px;
        }
        .sb-col-h {
          font-size: 8px;
          letter-spacing: 2px;
          color: rgba(0,229,255,0.25);
        }
        .sb-row {
          display: grid;
          grid-template-columns: 80px 1fr 170px 90px;
          gap: 1rem;
          padding: 14px 12px;
          border-bottom: 0.5px solid rgba(0,229,255,0.06);
          align-items: center;
          cursor: pointer;
          opacity: 0;
          transform: translateY(4px);
          transition: opacity 0.4s ease,
                      transform 0.4s ease,
                      background 0.2s;
        }
        .sb-row:last-child { border-bottom: none; }
        .sb-row.sb-visible {
          opacity: 1;
          transform: translateY(0);
        }
        .sb-row:hover { background: rgba(0,229,255,0.03); }
        .sb-flight {
          font-size: 11px;
          color: rgba(0,229,255,0.4);
          letter-spacing: 1px;
        }
        .sb-title-wrap {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }
        .sb-row-title {
          font-size: 12px;
          color: rgba(220,240,255,0.8);
        }
        .sb-row-title-dim {
          font-size: 12px;
          color: rgba(180,200,220,0.3);
          font-style: italic;
        }
        .sb-read {
          font-size: 9px;
          letter-spacing: 1px;
          color: rgba(180,200,220,0.3);
        }
        .sb-cat {
          font-size: 9px;
          letter-spacing: 1px;
        }
        .sb-cat-career { color: rgba(0,229,255,0.5); }
        .sb-cat-pm     { color: rgba(180,200,220,0.4); }
        .sb-cat-next   { color: rgba(245,158,11,0.4); }
        .sb-status-live {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 9px;
          letter-spacing: 1.5px;
          color: rgba(0,229,255,0.7);
        }
        .sb-live-dot {
          width: 5px; height: 5px;
          border-radius: 50%;
          background: #4ade80;
          animation: sb-pulse 2s infinite;
          flex-shrink: 0;
        }
        .sb-status-filing {
          font-size: 9px;
          letter-spacing: 1.5px;
          color: rgba(245,158,11,0.45);
        }
        .sb-arrow {
          font-size: 11px;
          color: rgba(0,229,255,0.3);
          transition: color 0.2s, transform 0.2s;
          display: inline-block;
        }
        .sb-row:hover .sb-arrow {
          color: rgba(0,229,255,0.8);
          transform: translateX(3px);
        }
        .sb-footer {
          margin-top: 1rem;
          padding-top: 1rem;
          border-top: 0.5px solid rgba(0,229,255,0.06);
          display: flex;
          justify-content: flex-end;
        }
        .sb-footer-link {
          font-size: 9px;
          letter-spacing: 2px;
          color: rgba(0,229,255,0.3);
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: color 0.2s;
          background: none;
          border: none;
          font-family: monospace;
        }
        .sb-footer-link:hover { color: rgba(0,229,255,0.6); }
      `}</style>

      <div className="sb-header">
        <div className="sb-header-left">
          <div className="sb-dot"></div>
          <div className="sb-title">
            LAB TRANSMISSIONS — AI · PRODUCT · AGENTS
          </div>
        </div>
        <button
          className="sb-view-all"
          onClick={() => onNavigate('insights')}
        >
          VIEW ALL →
        </button>
      </div>

      <div className="sb-divider"></div>

      <div className="sb-col-headers">
        <div className="sb-col-h">FLIGHT</div>
        <div className="sb-col-h">TRANSMISSION</div>
        <div className="sb-col-h">CATEGORY</div>
        <div className="sb-col-h">STATUS</div>
      </div>

      <div className="sb-divider"></div>

      <div>
        <div
          className="sb-row"
          id="sb-r1"
          onClick={() => onOpenArticle('pm-toolkit')}
        >
          <div className="sb-flight">INS-007</div>
          <div className="sb-title-wrap">
            <div className="sb-row-title">
              PM Toolkit: Five AI Tools for the Work PMs Do
            </div>
            <div className="sb-read">8 MIN READ</div>
          </div>
          <div className="sb-cat sb-cat-career">
            AGENT BUILD
          </div>
          <div className="sb-status-live">
            <div className="sb-live-dot"></div>
            LIVE <span className="sb-arrow">→</span>
          </div>
        </div>

        <div
          className="sb-row"
          id="sb-r2"
          onClick={() => onOpenArticle('release-notes-drafter')}
        >
          <div className="sb-flight">INS-006</div>
          <div className="sb-title-wrap">
            <div className="sb-row-title">
              Why I Built an AI That Writes Release Notes
            </div>
            <div className="sb-read">6 MIN READ</div>
          </div>
          <div className="sb-cat sb-cat-career">
            AGENT BUILD
          </div>
          <div className="sb-status-live">
            <div className="sb-live-dot"></div>
            LIVE <span className="sb-arrow">→</span>
          </div>
        </div>

        <div
          className="sb-row"
          id="sb-r3"
          onClick={() => onOpenArticle('jira-audit-agent')}
        >
          <div className="sb-flight">INS-005</div>
          <div className="sb-title-wrap">
            <div className="sb-row-title">
              An AI Agent That Audits Your Jira Board
            </div>
            <div className="sb-read">6 MIN READ</div>
          </div>
          <div className="sb-cat sb-cat-career">
            AGENT BUILD
          </div>
          <div className="sb-status-live">
            <div className="sb-live-dot"></div>
            LIVE <span className="sb-arrow">→</span>
          </div>
        </div>

        <div
          className="sb-row"
          id="sb-r4"
          onClick={() => onOpenArticle('meeting-to-prd')}
        >
          <div className="sb-flight">INS-004</div>
          <div className="sb-title-wrap">
            <div className="sb-row-title">
              Turning Meeting Transcripts Into PRDs Automatically
            </div>
            <div className="sb-read">6 MIN READ</div>
          </div>
          <div className="sb-cat sb-cat-career">
            AGENT BUILD
          </div>
          <div className="sb-status-live">
            <div className="sb-live-dot"></div>
            LIVE <span className="sb-arrow">→</span>
          </div>
        </div>

        <div
          className="sb-row"
          id="sb-r5"
          onClick={() => onOpenArticle('personal-ai-research-assistant')}
        >
          <div className="sb-flight">INS-003</div>
          <div className="sb-title-wrap">
            <div className="sb-row-title">
              I Built a Personal AI Agent That Reads My GitHub
            </div>
            <div className="sb-read">12 MIN READ</div>
          </div>
          <div className="sb-cat sb-cat-career">
            AGENT BUILD
          </div>
          <div className="sb-status-live">
            <div className="sb-live-dot"></div>
            LIVE <span className="sb-arrow">→</span>
          </div>
        </div>

        <div
          className="sb-row"
          id="sb-r6"
          onClick={() => onOpenArticle('aero-to-ai')}
        >
          <div className="sb-flight">INS-001</div>
          <div className="sb-title-wrap">
            <div className="sb-row-title">
              From Aeronautical Engineering to AI PM
            </div>
            <div className="sb-read">10 MIN READ</div>
          </div>
          <div className="sb-cat sb-cat-career">
            CAREER &amp; PERSPECTIVE
          </div>
          <div className="sb-status-live">
            <div className="sb-live-dot"></div>
            LIVE <span className="sb-arrow">→</span>
          </div>
        </div>

        <div
          className="sb-row"
          id="sb-r7"
          onClick={() => onOpenArticle('pm-fundamentals')}
        >
          <div className="sb-flight">INS-002</div>
          <div className="sb-title-wrap">
            <div className="sb-row-title">
              PM Fundamentals Every PM Should Know
            </div>
            <div className="sb-read">8 MIN READ</div>
          </div>
          <div className="sb-cat sb-cat-pm">
            PRODUCT MANAGEMENT
          </div>
          <div className="sb-status-live">
            <div className="sb-live-dot"></div>
            LIVE <span className="sb-arrow">→</span>
          </div>
        </div>
      </div>

      <div className="sb-footer">
        <button
          className="sb-footer-link"
          onClick={() => onNavigate('insights')}
        >
          ALL TRANSMISSIONS →
        </button>
      </div>
    </div>
  );
}
