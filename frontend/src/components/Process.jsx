import React from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'

const Process = () => {
  const steps = [
    {
      title: 'Consultation',
      description: 'Private meeting with our experts to define your vision and site requirements.'
    },
    {
      title: 'Design & Planning',
      description: 'Conceptual 3D visualization and precise architectural documentation.'
    },
    {
      title: 'Execution',
      description: 'Meticulous on-site management with skilled artisans and premium materials.'
    },
    {
      title: 'Handover',
      description: 'Rigorous quality audit followed by a seamless project delivery.'
    }
  ]

  return (
    <section id="how-it-works" className="py-24 bg-brand-offwhite relative overflow-hidden">
      {/* Technical Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(3,47,53,1) 1px, transparent 1px), linear-gradient(90deg, rgba(3,47,53,1) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      
      <div className="container-premium relative z-10">
        <div className="text-center mb-20">
          <span className="inline-block px-4 py-1 bg-brand-gold/10 text-brand-gold font-bold text-xs tracking-[0.3em] uppercase mb-6 border-l-2 border-brand-gold">
            Methodology
          </span>
          <h2 className="text-brand-teal italic font-black">Our Execution <span className="text-brand-gold not-italic">Pathway.</span></h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative group text-center"
            >
              <div className="w-20 h-20 bg-brand-teal rounded-[2rem] flex items-center justify-center text-brand-gold mx-auto mb-8 shadow-2xl group-hover:rotate-12 transition-transform duration-500">
                <span className="text-3xl font-montserrat font-black">{index + 1}</span>
              </div>
              <h4 className="text-xl font-black text-brand-teal uppercase tracking-tighter mb-4 italic group-hover:text-brand-gold transition-colors">{step.title}</h4>
              <p className="text-brand-teal/60 text-sm font-medium leading-relaxed italic">
                "{step.description}"
              </p>
              
              {/* Connector for desktop */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-[70%] w-full h-px bg-brand-gold/20"></div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Process
