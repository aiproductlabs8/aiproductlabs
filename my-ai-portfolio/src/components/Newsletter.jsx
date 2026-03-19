import { useState } from 'react'

export default function Newsletter() {
  const [subscribed, setSubscribed] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubscribed(true)
  }

  return (
    <section id="newsletter">
      <div className="container">
        <div className="newsletter-inner reveal">
          <div className="newsletter-icon">📡</div>
          <h2 className="newsletter-title">Stay in the Loop</h2>
          <p className="newsletter-sub">
            Weekly notes on building AI agents, product thinking, and
            what I&apos;m shipping. No fluff — just the real stuff.
          </p>
          <form className="newsletter-form" onSubmit={handleSubmit}>
            <input
              className="newsletter-input"
              type="email"
              placeholder="you@example.com"
              required
              disabled={subscribed}
            />
            <button
              type="submit"
              className="btn btn-primary newsletter-btn"
              disabled={subscribed}
              style={subscribed ? {
                background: '#34d399',
                boxShadow: '0 0 20px rgba(52,211,153,0.35)',
              } : {}}
            >
              {subscribed ? '✓ Subscribed!' : 'Subscribe'}
            </button>
          </form>
          <p className="newsletter-note">No spam. Unsubscribe any time. ~500 readers.</p>
        </div>
      </div>
    </section>
  )
}
