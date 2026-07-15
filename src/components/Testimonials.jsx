import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import { getTestimonials } from '../data/store'

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([])

  useEffect(() => {
    const load = async () => {
      setTestimonials(await getTestimonials())
    }
    load()
  }, [])

  return (
    <section className="py-24 bg-brand-cream/30 relative overflow-hidden">
      {/* Technical Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(3,47,53,1) 1px, transparent 1px), linear-gradient(90deg, rgba(3,47,53,1) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      
      <div className="container-premium relative z-10">
        <div className="text-center mb-20">
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="h-px w-8 bg-brand-gold"></span>
            <span className="text-[10px] font-black text-brand-gold uppercase tracking-[0.4em]">Testimonials</span>
            <span className="h-px w-8 bg-brand-gold"></span>
          </div>
          <h2 className="text-5xl md:text-6xl font-black text-brand-teal italic">What our <span className="text-brand-gold not-italic">clients say.</span></h2>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {testimonials.map((t, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              className="group bg-white p-10 border border-brand-teal/5 relative shadow-xl hover:border-brand-gold/30 transition-all duration-500"
            >
              <Quote className="absolute top-10 right-10 text-brand-teal/5 group-hover:text-brand-gold/10 transition-colors" size={60} />
              
              <div className="flex items-center gap-6 mb-8">
                <img 
                  src={t.image} 
                  alt={t.name} 
                  className="w-16 h-16 rounded-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 border-2 border-brand-gold/20"
                />
                <div>
                  <h4 className="font-black text-brand-teal text-lg leading-tight italic uppercase tracking-tighter">{t.name}</h4>
                  <p className="text-[10px] font-bold text-brand-gold uppercase tracking-widest mt-1">{t.role}</p>
                </div>
              </div>

              <p className="text-brand-teal/70 mb-8 leading-relaxed italic text-sm">
                "{t.text}"
              </p>

              <div className="flex gap-1">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} size={14} className="fill-brand-gold text-brand-gold" />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
