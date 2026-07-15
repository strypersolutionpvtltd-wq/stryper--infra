import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const SLIDES = [
  {
    category: 'Wall Panels',
    title: 'Crafting Lifestyle',
    description: 'Curated to complement modern living, each panel brings warmth, depth, and character to every room. Thoughtfully designed, it transforms plain walls into timeless expressions of lifestyle, elevating everyday spaces with elegance and intention.',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2574&auto=format&fit=crop'
  },
  {
    category: 'Wardrobes',
    title: 'Crafting Reflections',
    description: 'Designed to be more than simple storage. Each piece reflects thoughtful craftsmanship that combines elegance with practicality. From seamless finishes to intelligent organisation, every element is created to enhance daily living. The result is a refined space that mirrors both style and function effortlessly.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2670&auto=format&fit=crop'
  },
  {
    category: 'Hospitality',
    title: 'Crafting Experiences',
    description: 'Creating moments that linger long after the stay. From personalised service to thoughtful details, it’s the art of making every guest feel valued. Each interaction becomes a memory, each space a story, and every touchpoint an experience crafted with care, warmth, and authenticity.',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2670&auto=format&fit=crop'
  }
]

const Projects = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % SLIDES.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section id="projects" className="relative w-full h-[85vh] bg-brand-navy overflow-hidden">
      {/* Full width background image transitions */}
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
            className="w-full h-full object-cover scale-100"
          />
          {/* Vittaazio dark overlay */}
          <div className="absolute inset-0 bg-black/60"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80"></div>
        </motion.div>
      </AnimatePresence>

      {/* Centered content overlay to match Vittaazio hpsec4-slider-list-data */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 max-w-4xl mx-auto z-10 text-white">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6 md:space-y-8"
          >
            {/* Category */}
            <p className="text-xs md:text-sm font-black tracking-[0.4em] uppercase text-brand-gold">
              {SLIDES[currentIndex].category}
            </p>
            
            {/* Main Title */}
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight italic font-serif text-white">
              {SLIDES[currentIndex].title}
            </h2>
            
            {/* Description */}
            <p className="text-brand-cream/80 text-sm md:text-lg leading-relaxed max-w-2xl mx-auto font-medium">
              {SLIDES[currentIndex].description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Pagination bullets to match Vittaazio */}
      <div className="absolute inset-x-0 bottom-12 z-20 flex justify-center gap-3">
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
    </section>
  )
}

export default Projects
