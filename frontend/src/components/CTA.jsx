import React from 'react'
import { motion } from 'framer-motion'

const CTA = () => {
  return (
    <section className="relative w-full h-[60vh] md:h-[70vh] bg-brand-navy flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2670&auto=format&fit=crop" 
          alt="Future of Luxury Living" 
          className="w-full h-full object-cover"
        />
        {/* Vittaazio dark tint overlay */}
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Centered Content (hpsec5-data) */}
      <div className="relative z-10 text-center space-y-10 px-6 max-w-4xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl lg:text-7xl font-black uppercase text-white tracking-wider italic font-serif leading-tight"
        >
          Discover the Art of Luxury Living
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <a 
            href="#contact" 
            className="btn-outline !text-sm px-16 py-4 tracking-[0.25em] border border-brand-gold text-brand-gold hover:text-black"
          >
            Book a visit
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default CTA
