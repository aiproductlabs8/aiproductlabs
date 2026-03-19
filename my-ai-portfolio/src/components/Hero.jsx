export default function Hero() {
  return (
    <section id="hero">
      <div className="container">
        <div className="hero-inner">

          <div className="hero-content">
            <div className="reveal" style={{ marginBottom: '24px' }}>
              <img src="/aiproductlabs.png" alt="AI Product Labs" style={{ height: '80px', width: 'auto', mixBlendMode: 'lighten' }} />
            </div>
            <div className="hero-badge reveal">
              <span className="hero-badge-dot"></span>
              Open to collaboration &amp; new projects
            </div>

            <h1 className="hero-name reveal reveal-delay-1">
              [YOUR<br /><span className="accent-text">NAME]</span>
            </h1>

            <p className="hero-title reveal reveal-delay-2">
              AI Product Manager → AI Builder
            </p>

            <p className="hero-desc reveal reveal-delay-2">
              Building intelligent agents, shipping real products, and
              sharing everything I learn along the way. Obsessed with
              the intersection of product thinking and AI engineering.
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
                <div className="hero-stat-num">3<span>k</span></div>
                <div className="hero-stat-label">GitHub Stars</div>
              </div>
              <div>
                <div className="hero-stat-num">24<span>+</span></div>
                <div className="hero-stat-label">Articles</div>
              </div>
            </div>
          </div>

          <div className="hero-visual reveal reveal-delay-3">
            <div className="hero-card">
              <div className="hero-card-bar">
                <span className="dot dot-red"></span>
                <span className="dot dot-yellow"></span>
                <span className="dot dot-green-dot"></span>
                <span className="hero-card-title">agent_runner.py</span>
              </div>
              <div className="hero-card-body">
                <div className="term-line">
                  <span className="term-prompt">›</span>
                  <span className="term-cmd">python agent_runner.py --task analyze</span>
                </div>
                <div className="term-output term-green">✓ Agent initialized</div>
                <div className="term-output">Loading tools: 5/5</div>
                <div className="term-output term-purple">→ Reasoning step 1/3...</div>
                <div className="term-output">&nbsp; Retrieving context…</div>
                <div className="term-output">&nbsp; Analysing requirements…</div>
                <div className="term-output term-purple">→ Reasoning step 2/3...</div>
                <div className="term-output">&nbsp; Generating plan…</div>
                <div className="term-output term-green">✓ Plan complete — 4 tasks</div>
                <div className="term-output term-purple">→ Executing tasks...</div>
                <div className="term-output">&nbsp; [████████░░] 80%</div>
                <div className="term-line" style={{ marginTop: '4px' }}>
                  <span className="term-prompt">›</span>
                  <span className="term-cursor"></span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
