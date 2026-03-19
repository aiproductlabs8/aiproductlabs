const GitHubIcon = () => (
  <svg className="icon-github" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.1 3.3 9.43 7.88 10.97.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.54-3.87-1.54-.53-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.35.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.68 0-1.25.45-2.28 1.18-3.08-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.15 1.18a10.96 10.96 0 0 1 5.74 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.58.23 2.75.11 3.04.74.8 1.18 1.83 1.18 3.08 0 4.41-2.68 5.39-5.24 5.67.41.35.78 1.05.78 2.12v3.14c0 .31.21.67.8.56C20.2 21.43 23.5 17.1 23.5 12 23.5 5.65 18.35.5 12 .5Z" />
  </svg>
)

export default function FeaturedProject() {
  return (
    <section id="featured">
      <div className="container">
        <div className="reveal">
          <span className="section-label">Featured Project</span>
          <h2 className="section-title">Highlighted Work</h2>
          <p className="section-sub">The project I&apos;m most proud of — built end-to-end with modern AI tooling.</p>
        </div>

        <div className="featured-grid">

          <div className="featured-img-wrap reveal reveal-delay-1">
            <div className="featured-img-placeholder">🤖</div>
          </div>

          <div className="reveal reveal-delay-2">
            <div className="featured-tag-row">
              <span className="tag tag-cyan">Featured</span>
              <span className="tag tag-purple">Multi-Agent</span>
              <span className="tag tag-green">Open Source</span>
            </div>

            <h3 className="featured-title">Autonomous Research Agent</h3>

            <p className="featured-desc">
              An end-to-end AI agent that takes a high-level research question,
              decomposes it into subtasks, searches the web, synthesises findings,
              and produces a structured report — all without human intervention.
              Built with Claude, tool use, and a lightweight orchestration layer.
            </p>

            <div className="featured-meta">
              <div className="featured-meta-item">
                <span className="featured-meta-key">Stack</span>
                <span className="featured-meta-val">Python · Claude API</span>
              </div>
              <div className="featured-meta-item">
                <span className="featured-meta-key">Status</span>
                <span className="featured-meta-val" style={{ color: '#34d399' }}>Live</span>
              </div>
              <div className="featured-meta-item">
                <span className="featured-meta-key">Stars</span>
                <span className="featured-meta-val">★ 847</span>
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
