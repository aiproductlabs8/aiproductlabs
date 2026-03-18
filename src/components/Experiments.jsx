const experiments = [
  {
    icon: '🔍',
    title: 'Requirements Analyser',
    desc: 'Paste a user story and this agent breaks it into acceptance criteria, flags ambiguity, and suggests test cases — like having a senior BA on call.',
    statusClass: 'status-live',
    statusLabel: 'Live',
    tagClass: 'tag-cyan',
    tagLabel: 'Claude · Python',
    delay: 'reveal-delay-1',
  },
  {
    icon: '🌐',
    title: 'Market Explorer',
    desc: 'Give it a product idea and it searches competitor landscapes, identifies gaps, and returns a structured market brief with citations and sizing data.',
    statusClass: 'status-dev',
    statusLabel: 'In Dev',
    tagClass: 'tag-purple',
    tagLabel: 'Multi-agent',
    delay: 'reveal-delay-2',
  },
  {
    icon: '💡',
    title: 'Idea Generator',
    desc: 'Combines trends, customer pain points, and technology constraints to generate novel product ideas ranked by feasibility and market pull.',
    statusClass: 'status-idea',
    statusLabel: 'Concept',
    tagClass: 'tag-orange',
    tagLabel: 'Experimental',
    delay: 'reveal-delay-3',
  },
]

export default function Experiments() {
  return (
    <section id="experiments">
      <div className="container">
        <div className="reveal">
          <span className="section-label">Agent Experiments</span>
          <h2 className="section-title">Things I&apos;m Building</h2>
          <p className="section-sub">Small, focused AI agents I&apos;ve prototyped while exploring what&apos;s possible.</p>
        </div>

        <div className="experiments-grid">
          {experiments.map((exp) => (
            <div key={exp.title} className={`exp-card reveal ${exp.delay}`}>
              <div className="exp-icon">{exp.icon}</div>
              <div className="exp-card-title">{exp.title}</div>
              <p className="exp-card-desc">{exp.desc}</p>
              <div className="exp-card-footer">
                <span className="exp-status">
                  <span className={`exp-status-dot ${exp.statusClass}`}></span>
                  {exp.statusLabel}
                </span>
                <span className={`tag ${exp.tagClass}`} style={{ fontSize: '10px' }}>{exp.tagLabel}</span>
                <a href="https://github.com/" className="exp-link" target="_blank" rel="noreferrer">
                  View repo
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
