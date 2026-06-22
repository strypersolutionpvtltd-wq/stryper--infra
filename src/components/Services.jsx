import React from 'react'
import { motion } from 'framer-motion'
import { Palette, Building2, Ruler, Hammer, ClipboardCheck } from 'lucide-react'

const Services = () => {
  const services = [
    {
      icon: Palette,
      title: 'Full Home Interior',
      description: 'End-to-end luxury solutions from modular kitchens to designer living spaces.',
      image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop'
    },
    {
      icon: Building2,
      title: 'Infrastructure Solutions',
      description: 'Robust planning and execution for large-scale industrial projects.',
      image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2000&auto=format&fit=crop'
    },
    {
      icon: Ruler,
      title: 'Architectural Planning',
      description: 'Functional and innovative designs tailored to modern aesthetics.',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop'
    },
    {
      icon: Hammer,
      title: 'Fit-out & Fabrication',
      description: 'Premium custom joinery and specialized metal work services.',
      image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=2000&auto=format&fit=crop'
    },
    {
      icon: ClipboardCheck,
      title: 'Project Management',
      description: 'Professional oversight to ensure timely delivery and quality.',
      image: 'https://images.unsplash.com/photo-1531973576160-7125cd663d86?q=80&w=2000&auto=format&fit=crop'
    }
  ]

  return (
    <section id="services" className="section-padding bg-brand-cream relative overflow-hidden">
      {/* Technical Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(3,47,53,1) 1px, transparent 1px), linear-gradient(90deg, rgba(3,47,53,1) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      
      <div className="container-premium relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-20">
          <div className="max-w-2xl">
            <div className="flex items-center gap-4 mb-6">
              <span className="h-px w-12 bg-brand-gold"></span>
              <span className="text-[10px] font-black text-brand-gold uppercase tracking-[0.4em]">Our Core Capabilities</span>
            </div>
            <h2 className="text-brand-teal italic font-black text-5xl md:text-7xl">Holistic <span className="text-brand-gold not-italic">Execution.</span></h2>
          </div>
          <p className="text-brand-teal/60 font-medium leading-relaxed max-w-sm italic">
            "Delivering high-precision design and infrastructure across residential, commercial, and industrial sectors since 2023."
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="group relative h-[500px] overflow-hidden shadow-2xl"
            >
              {/* Image Background */}
              <img 
                src={service.image} 
                alt={service.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-teal via-brand-teal/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
              
              {/* Content Overlay */}
              <div className="absolute inset-0 p-10 flex flex-col justify-end">
                <div className="w-14 h-14 bg-brand-gold flex items-center justify-center text-brand-teal mb-6 transform -rotate-12 group-hover:rotate-0 transition-transform duration-500">
                  <service.icon size={24} />
                </div>
                <h3 className="text-2xl font-black text-white mb-4 uppercase tracking-tighter italic">
                  {service.title}
                </h3>
                <p className="text-white/70 text-sm leading-relaxed max-w-xs transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  {service.description}
                </p>
              </div>
              
              {/* Corner Accent */}
              <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-brand-gold m-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </motion.div>
          ))}
        </div>

        {/* Legacy Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 bg-brand-teal p-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-10"
        >
          <div className="relative z-10">
            <h3 className="text-white text-3xl font-black mb-2 uppercase italic tracking-tighter">5 Years of <span className="text-brand-gold">On-Site Mastery.</span></h3>
            <p className="text-brand-gold font-black tracking-[0.3em] uppercase text-[10px]">Serving Pan-India since 2023</p>
          </div>
          <a href="#contact" className="btn-gold shadow-2xl hover:scale-105 transition-transform z-10 whitespace-nowrap">
            Schedule a Site Visit
          </a>
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #D4AF37 0px, #D4AF37 1px, transparent 1px, transparent 10px)' }}></div>
        </motion.div>
      </div>
    </section>
  )
}

export default Services
