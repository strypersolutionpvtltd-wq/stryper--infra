import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ShieldCheck, Clock, Award } from 'lucide-react'

const HERO_IMAGES = [
  'https://images.unsplash.com/photo-1590069261209-f8e9b8642343?q=80&w=2670&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?q=80&w=2670&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2670&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=2670&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=2670&auto=format&fit=crop'
]

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % HERO_IMAGES.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section id="home" className="relative pt-32 md:pt-44 pb-32 overflow-hidden min-h-[90vh] flex items-center bg-brand-teal">
      {/* Background Slideshow */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {HERO_IMAGES.map((imgUrl, index) => (
          <div
            key={imgUrl}
            className="absolute inset-0"
            style={{
              opacity: index === currentImageIndex ? 1 : 0,
              transform: index === currentImageIndex ? 'scale(1.05)' : 'scale(1)',
              transition: 'opacity 1500ms ease-in-out, transform 1500ms ease-in-out'
            }}
          >
            <img
              src={imgUrl}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover"
              loading="eager"
            />
          </div>
        ))}
        {/* Technical Grid Pattern overlay on Hero (White lines on dark background) */}
        <div className="absolute inset-0 opacity-[0.08] pointer-events-none z-10" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

        {/* Deep, premium dark teal overlay for text readability - optimized for image visibility */}
        <div className="absolute inset-0 bg-[#032F35]/40 z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#032F35]/85 via-[#032F35]/40 to-transparent z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#032F35]/70 via-transparent to-black/25 z-10"></div>
      </div>

      <div className="container-premium relative z-10 w-full grid lg:grid-cols-12 gap-16 md:gap-24 items-center">
        {/* Left Side: Brand Narrative */}
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-4 mb-8">
              <span className="h-px w-12 bg-brand-gold"></span>
              <span className="text-[10px] font-black text-brand-gold uppercase tracking-[0.4em]">Est. 2023 | Jaipur</span>
            </div>
            
            <h1 className="text-white mb-8 tracking-tighter leading-[1] font-black italic">
              Legacy in <span className="text-brand-gold not-italic">Execution.</span>
              <br />
              Excellence in <span className="text-brand-gold not-italic">Design.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-brand-cream/80 mb-12 max-w-xl leading-relaxed font-medium text-justify-organic">
              At Stryper, we don't just design; we engineer environments. 
              Our team of master craftsmen and architects turn complex site requirements 
              into high-end architectural realities.
            </p>

            {/* Direct Conversion Pillars */}
            <div className="grid grid-cols-3 gap-6 mb-14 border-t border-white/10 pt-10">
              <div className="space-y-3">
                <ShieldCheck className="text-brand-gold" size={24} />
                <p className="text-[9px] font-black text-brand-cream uppercase tracking-[0.2em] leading-tight">Comprehensive<br/>10yr Warranty</p>
              </div>
              <div className="space-y-3">
                <Clock className="text-brand-gold" size={24} />
                <p className="text-[9px] font-black text-brand-cream uppercase tracking-[0.2em] leading-tight">Guaranteed<br/>45-Day Delivery</p>
              </div>
              <div className="space-y-3">
                <Award className="text-brand-gold" size={24} />
                <p className="text-[9px] font-black text-brand-cream uppercase tracking-[0.2em] leading-tight">Mastered over<br/>100+ Projects</p>
              </div>
            </div>

            {/* CTA Group */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="#contact" 
                className="btn-gold"
              >
                Request Consultation
              </a>
              <a 
                href="#projects" 
                className="px-6 py-3 md:px-10 md:py-4 bg-transparent text-white border-2 border-white/30 font-black text-[10px] md:text-xs tracking-[0.2em] rounded-none hover:bg-brand-gold hover:text-brand-teal hover:border-brand-gold transition-all duration-500 inline-flex items-center justify-center uppercase"
              >
                Our Site Portfolio
              </a>
            </div>
          </motion.div>
        </div>

        {/* Right Side: Floating Glassmorphic Execution Display */}
        <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-[400px]"
          >
            {/* Glassmorphic Card */}
            <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 p-10 md:p-12 shadow-[0_50px_100px_-20px_rgba(3,47,53,0.5)] overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
              
              <div className="relative z-10 space-y-8">
                <div className="border-b border-white/10 pb-6">
                  <span className="text-[9px] font-black text-brand-gold uppercase tracking-[0.4em]">Live Site Execution</span>
                  <div className="flex items-baseline gap-2 mt-2">
                    <span className="text-5xl font-black text-white italic tracking-tighter">100+</span>
                    <span className="text-xs font-bold text-brand-cream/80 uppercase tracking-wider">Sites Handover</span>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-brand-cream/60 font-medium">Active Supervision</span>
                    <span className="text-brand-gold font-black tracking-widest uppercase">12 Sites</span>
                  </div>
                  <div className="w-full bg-white/10 h-1.5 rounded-none overflow-hidden">
                    <div className="bg-brand-gold h-full w-[85%]"></div>
                  </div>

                  <div className="flex justify-between items-center text-xs">
                    <span className="text-brand-cream/60 font-medium">On-Time Delivery Rate</span>
                    <span className="text-brand-gold font-black tracking-widest uppercase">100%</span>
                  </div>
                  <div className="w-full bg-white/10 h-1.5 rounded-none overflow-hidden">
                    <div className="bg-brand-gold h-full w-full"></div>
                  </div>
                </div>

                <div className="pt-6 border-t border-white/10 flex items-center gap-6">
                  <div className="text-5xl font-black italic tracking-tighter text-brand-gold">3+</div>
                  <div className="h-10 w-px bg-white/15"></div>
                  <div className="uppercase tracking-[0.3em] font-black text-[9px] text-brand-cream leading-tight">
                    Years of<br/>Execution<br/>Expertise
                  </div>
                </div>
              </div>
            </div>
            
            {/* Ambient gold glow behind the card */}
            <div className="absolute -bottom-10 -left-10 w-44 h-44 bg-brand-gold/10 rounded-full blur-3xl -z-10"></div>
          </motion.div>
        </div>
      </div>

      {/* Decorative Texture */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-cream/[0.02] -skew-x-12 transform translate-x-20 pointer-events-none"></div>
    </section>
  )
}

export default Hero
