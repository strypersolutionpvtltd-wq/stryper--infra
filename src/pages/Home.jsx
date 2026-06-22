import React from 'react'
import Hero from '../components/Hero'
import Clients from '../components/Clients'
import Process from '../components/Process'
import Services from '../components/Services'
import About from '../components/About'
import Projects from '../components/Projects'
import VisionMission from '../components/VisionMission'
import Testimonials from '../components/Testimonials'
import Contact from '../components/Contact'

const Home = () => {
  return (
    <main>
      <Hero />
      <Clients />
      <Process />
      <Services />
      <About />
      <Projects />
      <VisionMission />
      <Testimonials />
      <Contact />
    </main>
  )
}

export default Home
