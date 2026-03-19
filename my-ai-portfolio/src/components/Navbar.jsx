import { useEffect, useRef, useState } from 'react'

export default function Navbar() {
  const navRef = useRef(null)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (navRef.current) {
        navRef.current.style.padding = window.scrollY > 60 ? '12px 0' : '20px 0'
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMenu = () => setMenuOpen(prev => !prev)

  return (
    <nav id="navbar" ref={navRef}>
      <div className="container">
        <a className="nav-logo" href="#hero">
          <img src="/aiproductlabs.png" alt="AI Product Labs" style={{ height: '36px', width: 'auto', mixBlendMode: 'lighten' }} />
        </a>

        <ul
          className="nav-links"
          style={menuOpen ? {
            display: 'flex',
            flexDirection: 'column',
            position: 'absolute',
            top: '72px',
            left: '0',
            right: '0',
            background: 'rgba(6,12,24,0.97)',
            padding: '24px',
            gap: '20px',
            borderBottom: '1px solid #1c2e45',
          } : {}}
        >
          <li><a href="#featured">Projects</a></li>
          <li><a href="#experiments">Experiments</a></li>
          <li><a href="#writing">Writing</a></li>
          <li><a href="#newsletter">Newsletter</a></li>
        </ul>

        <a
          href="https://github.com/"
          target="_blank"
          rel="noreferrer"
          className="btn btn-outline nav-cta"
          style={menuOpen ? { display: 'inline-flex', margin: '0 24px 24px' } : {}}
        >
          GitHub →
        </a>

        <button className="nav-hamburger" onClick={toggleMenu} aria-label="Toggle menu">
          <span style={{ transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : '' }} />
          <span style={{ opacity: menuOpen ? '0' : '' }} />
          <span style={{ transform: menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : '' }} />
        </button>
      </div>
    </nav>
  )
}
