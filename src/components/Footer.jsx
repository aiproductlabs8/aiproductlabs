const GitHubIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.1 3.3 9.43 7.88 10.97.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.54-3.87-1.54-.53-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.35.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.68 0-1.25.45-2.28 1.18-3.08-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.15 1.18a10.96 10.96 0 0 1 5.74 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.58.23 2.75.11 3.04.74.8 1.18 1.83 1.18 3.08 0 4.41-2.68 5.39-5.24 5.67.41.35.78 1.05.78 2.12v3.14c0 .31.21.67.8.56C20.2 21.43 23.5 17.1 23.5 12 23.5 5.65 18.35.5 12 .5Z" />
  </svg>
)

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-grid">

          <div className="footer-brand">
            <div className="footer-logo">[YOUR NAME]<span>.</span></div>
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
              <li><a href="#featured">Research Agent</a></li>
              <li><a href="#experiments">Req. Analyser</a></li>
              <li><a href="#experiments">Market Explorer</a></li>
              <li><a href="https://github.com/" target="_blank" rel="noreferrer">GitHub →</a></li>
            </ul>
          </div>

          <div>
            <div className="footer-col-title">Writing</div>
            <ul className="footer-links">
              <li><a href="#writing">Latest Posts</a></li>
              <li><a href="#writing">AI Agents</a></li>
              <li><a href="#writing">Product</a></li>
              <li><a href="#newsletter">Newsletter</a></li>
            </ul>
          </div>

          <div>
            <div className="footer-col-title">Contact</div>
            <ul className="footer-links">
              <li><a href="mailto:hello@example.com">Email Me</a></li>
              <li><a href="https://linkedin.com/" target="_blank" rel="noreferrer">LinkedIn</a></li>
              <li><a href="https://twitter.com/" target="_blank" rel="noreferrer">Twitter / X</a></li>
              <li><a href="#">Book a Call</a></li>
            </ul>
          </div>

        </div>

        <div className="footer-bottom">
          <span>© 2026 [YOUR NAME]. Built with curiosity.</span>
          <div className="footer-bottom-right">
            <a href="#">Privacy</a>
            <a href="#">RSS Feed</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
