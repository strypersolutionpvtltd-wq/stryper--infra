import React from 'react'
import Hero from '../components/Hero'
import About from '../components/About'
import Services from '../components/Services'
import Projects from '../components/Projects'
import CTA from '../components/CTA'
import Contact from '../components/Contact'

const Home = () => {
  return (
    <main>
      <Hero />
      <About />
      <Services />
      <Projects />
      <CTA />
      <Contact />
    </main>
  )
}

export default Home
