import React, { useState } from 'react'
import { Play, X } from 'lucide-react'

const About = () => {
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <section id="about" className="py-24 bg-brand-cream relative overflow-hidden">
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(3,47,53,1) 1px, transparent 1px), linear-gradient(90deg, rgba(3,47,53,1) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left: Canvas Title */}
          <div className="lg:col-span-3 text-center lg:text-right">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase text-brand-teal tracking-tighter leading-none italic font-serif">
              A canvas <br className="hidden lg:block" /> of craft
            </h2>
          </div>

          {/* Center: Video Preview Container */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div 
              onClick={() => setIsPlaying(true)}
              className="relative w-full max-w-[480px] aspect-[4/5] bg-black cursor-pointer group shadow-[0_20px_50px_rgba(0,0,0,0.15)] overflow-hidden"
            >
              {/* Vittaazio crafting preview placeholder image */}
              <img 
                src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=2000&auto=format&fit=crop" 
                alt="Crafting Premium Interiors" 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-80"
              />
              
              {/* Subtle background overlay to pop the play button */}
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-all duration-300"></div>

              {/* Centered Play Button */}
              <div className="absolute bottom-10 left-10 w-16 h-16 bg-white/10 backdrop-blur-md rounded-full border border-white/20 flex items-center justify-center text-white group-hover:scale-110 group-hover:bg-brand-gold group-hover:text-black transition-all duration-300 shadow-xl">
                <Play size={24} fill="currentColor" className="ml-1" />
              </div>

              {/* Crafting Grid lines overlay (aesthetic) */}
              <div className="absolute inset-0 border border-brand-gold/10 m-4 pointer-events-none"></div>
            </div>
            
            {/* Ambient gold background decor layout like Vittaazio */}
            <div className="absolute top-[-20px] left-[-20px] right-[20px] bottom-[20px] border border-brand-gold/10 -z-10 pointer-events-none"></div>
          </div>

          {/* Right: Narrative Description */}
          <div className="lg:col-span-4 space-y-6">
            <p className="text-xs font-black tracking-[0.3em] uppercase text-brand-champagne">
              Crafting Experiences
            </p>
            <div className="space-y-4 text-brand-teal/80 text-sm md:text-base leading-relaxed text-justify-organic">
              <p>
                At Stryper, spaces feel alive with quiet confidence and thoughtful care. Every creation is shaped with attention, intention, and a calm that lingers. We focus on crafting environments that feel personal, welcoming, and balanced, where every detail contributes to a sense of harmony.
              </p>
              <p>
                True beauty for us is subtle and lived in. It is found in the moments when a space invites you to pause, breathe, and simply be. Each environment tells a story, reflecting skill, devotion, and care in ways that endure over time.
              </p>
              <p>
                Stryper is more than a brand. It is a way of living with purpose, shaping spaces that carry personality, comfort, and timeless elegance, giving life to surroundings that feel both intimate and alive.
              </p>
            </div>

            {/* Custom arrow link to match Vittaazio */}
            <div className="pt-6">
              <a 
                href="#services" 
                className="group relative inline-flex items-center text-brand-champagne hover:text-brand-gold font-bold text-sm tracking-wider uppercase transition-colors"
              >
                <span>Know More</span>
                {/* Arrow animation mimicking Vittaazio right-arrow */}
                <span className="ml-4 w-12 h-[1px] bg-brand-champagne group-hover:bg-brand-gold relative transition-all duration-300">
                  <span className="absolute right-0 top-[-3px] w-2 h-2 border-t border-r border-brand-champagne group-hover:border-brand-gold rotate-45"></span>
                </span>
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Video Modal Overlay */}
      {isPlaying && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <button 
            onClick={() => setIsPlaying(false)}
            className="absolute top-6 right-6 text-white hover:text-brand-gold transition-colors cursor-pointer"
          >
            <X size={36} />
          </button>
          
          <div className="w-full max-w-4xl aspect-video bg-black overflow-hidden shadow-2xl relative">
            {/* Embedded Vimeo/YouTube video for premium modular craftsmanship */}
            <iframe 
              className="w-full h-full"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" 
              title="Modular Furniture Craftsmanship"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </section>
  )
}

export default About
