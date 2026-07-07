import React, { useState } from 'react'
import { motion as motionFramer, AnimatePresence } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const COLLECTIONS = [
  {
    num: '01',
    title: 'Modular Kitchen',
    subtitle: 'Culinary Masterpieces',
    description: 'Precision-engineered luxury kitchens combining high-end Italian finishes with custom ergonomic layouts.',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=2670&auto=format&fit=crop',
    slug: 'modular-kitchens'
  },
  {
    num: '02',
    title: 'Luxury Wardrobe',
    subtitle: 'Tailored Reflections',
    description: 'Seamless walk-in closets and modular wardrobes detailed with premium glass, leather, and integrated lighting.',
    image: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?q=80&w=2000&auto=format&fit=crop',
    slug: 'luxury-wardrobes'
  },
  {
    num: '03',
    title: 'Vanity Solutions',
    subtitle: 'Personal Sanctuaries',
    description: 'Sophisticated washroom vanities and dresser units crafted for ultimate morning refinement and daily calm.',
    image: 'https://images.unsplash.com/photo-1620626011761-996317b6979a?q=80&w=2000&auto=format&fit=crop',
    slug: 'vanity-solutions'
  },
  {
    num: '04',
    title: 'Hospitality Fit-Outs',
    subtitle: 'Immersive Welcomes',
    description: 'Bespoke lounge, lobby, and suite furnishings engineered to deliver high-end international guest experiences.',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=2670&auto=format&fit=crop',
    slug: 'hotel-resorts-fit-out'
  },
  {
    num: '05',
    title: 'Office Architecture',
    subtitle: 'Built for Brilliance',
    description: 'Modern executive tables, workstations, and meeting room furniture built to elevate corporate efficiency.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2670&auto=format&fit=crop',
    slug: 'office-workstations'
  }
]

const Services = () => {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <section id="services" className="py-24 bg-brand-cream relative overflow-hidden font-roboto">
      {/* Subtle Grid Accent */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(3,47,53,1) 1px, transparent 1px), linear-gradient(90deg, rgba(3,47,53,1) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-20 border-b border-brand-teal/10 pb-10">
          <div className="space-y-4">
            <span className="text-[10px] font-black tracking-[0.4em] uppercase text-brand-gold block">
              Luxury Divisions
            </span>
            <h2 className="text-5xl md:text-7xl font-black uppercase text-brand-teal tracking-tighter italic font-serif">
              Timeless Creations
            </h2>
          </div>
          <p className="text-brand-teal/60 font-medium max-w-sm text-sm leading-relaxed text-left lg:text-right italic">
            "Crafted for connoisseurs of luxury and fine living, transforming spaces into expressions of art."
          </p>
        </div>

        {/* Staggered Split-Screen Interactive Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-stretch">
          
          {/* Left Column: Numbered List of Divisions */}
          <div className="lg:col-span-5 flex flex-col justify-center divide-y divide-brand-teal/10">
            {COLLECTIONS.map((item, idx) => {
              const isActive = idx === activeIndex
              return (
                <div
                  key={item.title}
                  onMouseEnter={() => setActiveIndex(idx)}
                  onClick={() => setActiveIndex(idx)}
                  className="py-6 cursor-pointer group transition-all duration-300 first:pt-0 last:pb-0"
                >
                  <div className="flex items-start gap-6">
                    {/* Index Number */}
                    <span className={`text-xl font-serif italic ${isActive ? 'text-brand-gold font-bold scale-110' : 'text-brand-teal/40 group-hover:text-brand-champagne'} transition-all duration-300`}>
                      {item.num}
                    </span>
                    
                    {/* Title & Subtitle */}
                    <div className="space-y-2 flex-1">
                      <h3 className={`text-xl md:text-2xl font-serif font-black uppercase tracking-tight transition-colors duration-300 ${isActive ? 'text-brand-gold' : 'text-brand-teal group-hover:text-brand-champagne'}`}>
                        {item.title}
                      </h3>
                      
                      {/* Expanded description on Active state with smooth Framer animation */}
                      <motionFramer.div
                        initial={false}
                        animate={{ height: isActive ? 'auto' : 0, opacity: isActive ? 1 : 0 }}
                        transition={{ duration: 0.4, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <p className="text-brand-teal/70 text-xs md:text-sm leading-relaxed pt-2">
                          {item.description}
                        </p>
                        
                        {/* Direct Page Link */}
                        <div className="pt-4 flex">
                          <a
                            href={`/page/${item.slug}`}
                            className="inline-flex items-center gap-2 text-[10px] font-black tracking-[0.2em] uppercase text-brand-gold hover:text-brand-teal transition-colors"
                          >
                            <span>Explore Collection</span>
                            <ArrowRight size={12} />
                          </a>
                        </div>
                      </motionFramer.div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Right Column: Dynamic Framed Preview Image */}
          <div className="lg:col-span-7 flex items-center justify-center">
            <div className="relative w-full aspect-[4/3] md:aspect-[16/10] bg-black overflow-hidden shadow-[0_30px_70px_rgba(0,0,0,0.2)]">
              
              {/* Dynamic Image Crossfade */}
              <AnimatePresence mode="wait">
                <motionFramer.div
                  key={activeIndex}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  className="absolute inset-0 w-full h-full"
                >
                  <img
                    src={COLLECTIONS[activeIndex].image}
                    alt={COLLECTIONS[activeIndex].title}
                    className="w-full h-full object-cover"
                  />
                  {/* Subtle dark tint */}
                  <div className="absolute inset-0 bg-black/15"></div>
                </motionFramer.div>
              </AnimatePresence>

              {/* Decorative Frame borders to emphasize luxury modular crafting */}
              <div className="absolute inset-0 border border-white/10 m-6 pointer-events-none"></div>
              <div className="absolute bottom-10 right-10 z-10 bg-brand-cream border border-brand-teal/5 py-2 px-4 shadow-lg select-none">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-teal">
                  {COLLECTIONS[activeIndex].subtitle}
                </span>
              </div>

            </div>
          </div>

        </div>

        {/* Global Action Link */}
        <div className="text-center pt-16">
          <a
            href="#projects"
            className="btn-gold !text-xs px-16 py-3.5 tracking-[0.25em]"
          >
            Explore Full Range
          </a>
        </div>

      </div>
    </section>
  )
}

export default Services
