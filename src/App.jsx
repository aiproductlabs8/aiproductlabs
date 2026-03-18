import { useEffect } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import FeaturedProject from './components/FeaturedProject'
import Experiments from './components/Experiments'
import BlogSection from './components/BlogSection'
import Newsletter from './components/Newsletter'
import Footer from './components/Footer'

export default function App() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible')
            observer.unobserve(e.target)
          }
        })
      },
      { threshold: 0.12 }
    )
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <Navbar />
      <Hero />
      <FeaturedProject />
      <Experiments />
      <BlogSection />
      <Newsletter />
      <Footer />
    </>
  )
}
