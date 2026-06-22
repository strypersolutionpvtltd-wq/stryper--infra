import React from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'

const About = () => {
  const values = [
    'Bespoke Design Narrative',
    'Premium Material Selection',
    'Transparent Commercials',
    'Agile Infrastructure Planning',
    'Uncompromising Execution',
    'Dedicated Project Custodian'
  ]

  return (
    <section id="about" className="py-32 bg-brand-cream relative overflow-hidden">
      {/* Technical Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(3,47,53,1) 1px, transparent 1px), linear-gradient(90deg, rgba(3,47,53,1) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      
      <div className="container-premium relative z-10">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          {/* Left - Narrative */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-4 mb-8">
              <span className="h-px w-12 bg-brand-gold"></span>
              <span className="text-[10px] font-black text-brand-gold uppercase tracking-[0.4em]">Our Professional Legacy</span>
            </div>
            
            <h2 className="text-brand-teal mb-10 leading-[1.1] font-black italic">
              Where engineering meets <span className="text-brand-gold not-italic font-black">Luxury.</span>
            </h2>
            
            <p className="text-lg text-brand-teal/60 mb-10 leading-relaxed font-medium text-justify-organic">
              Stryper Interior and Infra is built on a foundation of technical excellence and aesthetic precision. 
              Since 2023, we have successfully managed over 100 projects across India, delivering 
              end-to-end solutions that span from high-end residential fit-outs to complex industrial 
              infrastructure.
            </p>

            <div className="grid sm:grid-cols-2 gap-8 mb-12">
              {values.map((value, index) => (
                <div key={index} className="flex items-center gap-4 group">
                  <div className="w-10 h-10 bg-brand-cream rounded-none flex items-center justify-center border border-brand-teal/5 group-hover:border-brand-gold/30 transition-all">
                    <CheckCircle2 className="text-brand-gold" size={16} />
                  </div>
                  <span className="text-brand-teal font-black text-[10px] uppercase tracking-[0.2em]">{value}</span>
                </div>
              ))}
            </div>

            {/* Metrics */}
            <div className="flex flex-row flex-wrap items-center gap-8 sm:gap-20 border-t border-brand-teal/5 pt-12">
              <div>
                <h4 className="text-6xl font-black text-brand-teal italic tracking-tighter">3<span className="text-brand-gold not-italic">+</span></h4>
                <p className="text-[10px] font-black text-brand-gold uppercase tracking-[0.4em] mt-3">Years Legacy</p>
              </div>
              <div>
                <h4 className="text-6xl font-black text-brand-teal italic tracking-tighter">100<span className="text-brand-gold not-italic">+</span></h4>
                <p className="text-[10px] font-black text-brand-gold uppercase tracking-[0.4em] mt-3">Projects Done</p>
              </div>
            </div>
          </motion.div>

          {/* Right - Realistic Collage */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-10">
              <div className="space-y-10 pt-20">
                <div className="aspect-[3/4] overflow-hidden shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1600121848594-d8644e57abab?q=80&w=2670&auto=format&fit=crop"
                    alt="Execution Detail"
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                  />
                </div>
                <div className="aspect-square overflow-hidden shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2670&auto=format&fit=crop"
                    alt="Premium Layout"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="space-y-10">
                <div className="aspect-[2/3] overflow-hidden shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?q=80&w=2574&auto=format&fit=crop"
                    alt="Luxury Interior"
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-1000"
                  />
                </div>
                <div className="bg-brand-teal p-12 text-white shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold opacity-5 rotate-45 transform translate-x-16 -translate-y-16"></div>
                  <p className="text-2xl font-black italic tracking-tight leading-tight relative z-10">
                    "Craftsmanship is the language of excellence."
                  </p>
                  <div className="mt-8 h-1 w-12 bg-brand-gold"></div>
                </div>
              </div>
            </div>
            
            {/* Background Shape */}
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-brand-cream rounded-full blur-3xl opacity-50"></div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About
