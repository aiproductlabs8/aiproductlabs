const blogPosts = [
  {
    tags: [
      { label: 'AI Agents', cls: 'tag-cyan' },
      { label: 'Deep Dive', cls: 'tag-purple' },
    ],
    title: 'How I Built a Self-Improving Prompt Pipeline Using Claude\'s Tool Use',
    excerpt: 'A walkthrough of the architecture behind an agent that critiques its own outputs, rewrites prompts, and evaluates improvements — entirely autonomously.',
    date: 'Mar 12, 2026',
    readTime: '8 min read',
    delay: 'reveal-delay-1',
  },
  {
    tags: [
      { label: 'Product', cls: 'tag-green' },
      { label: 'Opinion', cls: 'tag-orange' },
    ],
    title: 'PM to AI Builder: The Mental Model Shift Nobody Warns You About',
    excerpt: 'Moving from shaping product requirements to writing actual agents forced me to rewire how I think about ambiguity, reliability, and iteration speed.',
    date: 'Feb 27, 2026',
    readTime: '6 min read',
    delay: 'reveal-delay-2',
  },
]

const recentResearch = [
  { title: 'Claude Code in Production: Six Weeks In', date: 'March 15, 2026' },
  { title: 'Evaluating LLM Agents Without Ground Truth', date: 'March 3, 2026' },
  { title: 'The Minimal Viable Agent: What Actually Matters', date: 'February 19, 2026' },
]

const stackItems = [
  { icon: '🤖', name: 'Claude API', pct: '95%' },
  { icon: '🐍', name: 'Python', pct: '85%' },
  { icon: '⚡', name: 'FastAPI', pct: '70%' },
  { icon: '🗄️', name: 'PostgreSQL', pct: '65%' },
]

export default function BlogSection() {
  return (
    <section id="writing">
      <div className="container">
        <div className="reveal">
          <span className="section-label">Writing</span>
          <h2 className="section-title">From the Blog</h2>
          <p className="section-sub">Notes on AI product thinking, agent architectures, and building in public.</p>
        </div>

        <div className="writing-grid">

          <div className="blog-cards">
            {blogPosts.map((post) => (
              <a key={post.title} href="#" className={`blog-card reveal ${post.delay}`}>
                <div className="blog-card-body">
                  <div className="blog-card-tags">
                    {post.tags.map(t => (
                      <span key={t.label} className={`tag ${t.cls}`}>{t.label}</span>
                    ))}
                  </div>
                  <h3 className="blog-card-title">{post.title}</h3>
                  <p className="blog-card-excerpt">{post.excerpt}</p>
                  <div className="blog-card-meta">
                    <span>{post.date}</span>
                    <span className="blog-card-meta-sep">·</span>
                    <span>{post.readTime}</span>
                  </div>
                </div>
                <div className="blog-card-arrow">→</div>
              </a>
            ))}
          </div>

          <div className="writing-sidebar">

            <div className="sidebar-widget reveal reveal-delay-1">
              <div className="sidebar-widget-head">Latest Research</div>
              <ul className="sidebar-post-list">
                {recentResearch.map((post) => (
                  <li key={post.title} className="sidebar-post">
                    <div className="sidebar-post-title">{post.title}</div>
                    <div className="sidebar-post-date">{post.date}</div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="sidebar-widget reveal reveal-delay-2">
              <div className="sidebar-widget-head">Current Stack</div>
              <div className="stack-list">
                {stackItems.map((item) => (
                  <div key={item.name} className="stack-item">
                    <span className="stack-item-name">
                      <span className="stack-item-icon">{item.icon}</span>
                      {item.name}
                    </span>
                    <div className="stack-bar-wrap">
                      <div className="stack-bar" style={{ width: item.pct }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
