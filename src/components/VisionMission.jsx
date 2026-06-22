import React from 'react'
import { motion } from 'framer-motion'
import { Target, Eye, Heart, Award } from 'lucide-react'

const VisionMission = () => {
  const values = [
    { icon: Heart, title: 'Integrity', description: 'Transparent and ethical execution in every site we manage.' },
    { icon: Award, title: 'Innovation', description: 'Engineering-led design solutions for complex spaces.' },
    { icon: Target, title: 'Precision', description: 'Meticulous attention to detail from foundation to finish.' },
    { icon: Eye, title: 'Vision', description: 'Creating future-ready infrastructure with sustainable practices.' }
  ]

  return (
    <section className="py-32 bg-brand-cream relative overflow-hidden">
      {/* Technical Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(3,47,53,1) 1px, transparent 1px), linear-gradient(90deg, rgba(3,47,53,1) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      
      <div className="container-premium relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-24 gap-10">
          <div className="max-w-2xl">
            <div className="flex items-center gap-4 mb-8 text-center md:text-left justify-center md:justify-start">
              <span className="h-px w-12 bg-brand-gold"></span>
              <span className="text-[10px] font-black text-brand-gold uppercase tracking-[0.4em]">Our Purpose</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-brand-teal italic text-center md:text-left">Vision & <span className="text-brand-gold not-italic">Mission.</span></h2>
          </div>
          <div className="h-20 w-px bg-brand-teal/10 hidden md:block"></div>
          <p className="text-brand-teal/50 font-medium text-center md:text-left max-w-sm uppercase tracking-widest text-[10px] leading-loose">
            Redefining the standard of luxury execution and industrial infrastructure across the Indian landscape.
          </p>
        </div>

        {/* Mission & Vision Grid */}
        <div className="grid lg:grid-cols-2 gap-12 mb-24">
          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-brand-cream p-12 md:p-16 relative overflow-hidden group shadow-2xl shadow-brand-teal/5 hover:shadow-brand-teal/10 transition-all duration-700"
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-brand-gold/5 -mr-20 -mt-20 group-hover:scale-110 transition-transform duration-700"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-6 mb-10">
                <div className="w-16 h-16 bg-brand-teal text-brand-gold flex items-center justify-center">
                  <Target size={32} strokeWidth={1.5} />
                </div>
                <h3 className="text-3xl font-black text-brand-teal uppercase tracking-tighter italic">
                  Our Mission
                </h3>
              </div>
              <p className="text-brand-teal/70 text-lg leading-relaxed font-medium text-justify-organic">
                To deliver high-precision, cost-effective, and timely projects through innovation and technical mastery. 
                We strive to exceed expectations through rigorous execution and sustainable on-site practices.
              </p>
            </div>
          </motion.div>

          {/* Vision */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-brand-teal p-12 md:p-16 text-white relative overflow-hidden group shadow-2xl shadow-brand-teal/20"
          >
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-brand-gold/10 -mr-20 -mb-20 group-hover:scale-110 transition-transform duration-700"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-6 mb-10">
                <div className="w-16 h-16 bg-brand-gold text-brand-teal flex items-center justify-center">
                  <Eye size={32} strokeWidth={1.5} />
                </div>
                <h3 className="text-3xl font-black uppercase tracking-tighter italic text-brand-gold">
                  Our Vision
                </h3>
              </div>
              <p className="text-brand-offwhite/70 text-lg leading-relaxed font-medium text-justify-organic">
                To redefine the architectural landscape of India with creative design and exceptional 
                craftsmanship. We envision becoming the gold standard for integrated interior and 
                infrastructure solutions.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Core Values */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-10 border border-brand-teal/5 hover:border-brand-gold/30 hover:bg-brand-cream transition-all duration-500 group"
            >
              <div className="w-12 h-12 bg-brand-cream border border-brand-gold/20 flex items-center justify-center text-brand-gold mb-8 group-hover:bg-brand-teal group-hover:text-brand-gold group-hover:rotate-[360deg] transition-all duration-700 shadow-xl">
                <value.icon size={20} strokeWidth={2} />
              </div>
              <h4 className="text-sm font-black text-brand-teal mb-4 uppercase tracking-[0.2em]">
                {value.title}
              </h4>
              <p className="text-brand-teal/50 text-[11px] font-bold uppercase tracking-widest leading-loose">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default VisionMission
