import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const SLIDES = [
  {
    title: 'Artistry Meets Art',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=2670&auto=format&fit=crop',
    link: '#services'
  },
  {
    title: 'Designed to Welcome',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2670&auto=format&fit=crop',
    link: '#services'
  },
  {
    title: 'Built for Brilliance',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2670&auto=format&fit=crop',
    link: '#services'
  },
  {
    title: 'Designs That Live With You',
    image: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?q=80&w=2000&auto=format&fit=crop',
    link: '#services'
  }
]

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % SLIDES.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section id="home" className="relative h-[95vh] w-full bg-brand-navy overflow-hidden">
      {/* Slides */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 w-full h-full"
        >
          <img
            src={SLIDES[currentIndex].image}
            alt={SLIDES[currentIndex].title}
            className="w-full h-full object-cover scale-105"
            style={{
              animation: 'zoomInSlow 6000ms infinite alternate'
            }}
          />
          {/* Subtle gradient overlay to mimic Vittaazio's linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.8)) */}
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
        </motion.div>
      </AnimatePresence>

      {/* Content Container */}
      <div className="absolute inset-x-0 bottom-24 z-10 max-w-7xl mx-auto px-6 lg:px-12 flex flex-col justify-end items-start">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <h2 className="text-white text-5xl md:text-7xl lg:text-8xl tracking-tight leading-[1] font-black italic max-w-3xl">
              {SLIDES[currentIndex].title}
            </h2>
            <div>
              <a
                href={SLIDES[currentIndex].link}
                className="btn-outline border border-brand-gold text-brand-gold uppercase text-xs md:text-sm px-10 py-3.5 tracking-[0.2em] font-black inline-block mt-4"
              >
                Discover More
              </a>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Pagination dots to match Swiper */}
      <div className="absolute right-6 lg:right-12 bottom-12 z-20 flex gap-3">
        {SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-3.5 h-3.5 rounded-full border border-black transition-all duration-300 ${
              idx === currentIndex ? 'bg-brand-gold scale-110' : 'bg-white/60 hover:bg-white'
            }`}
          />
        ))}
      </div>
      
      {/* Custom slow zoom effect */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes zoomInSlow {
          0% { transform: scale(1.02); }
          100% { transform: scale(1.08); }
        }
      `}} />
    </section>
  )
}

export default Hero
