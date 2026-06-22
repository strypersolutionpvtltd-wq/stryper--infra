import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState('All')

  const categories = ['All', 'Residential', 'Commercial', 'Infrastructure']

  const projects = [
    {
      title: 'Luxury Villa',
      slug: 'luxury-villa',
      location: 'Jaipur',
      category: 'Residential',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2553&auto=format&fit=crop'
    },
    {
      title: 'Modern IT Office',
      slug: 'modern-it-office',
      location: 'Bangalore',
      category: 'Commercial',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2569&auto=format&fit=crop'
    },
    {
      title: 'Heritage Hotel Fit-out',
      slug: 'heritage-hotel-fit-out',
      location: 'Udaipur',
      category: 'Infrastructure',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2670&auto=format&fit=crop'
    },
    {
      title: 'Minimalist Apartment',
      slug: 'minimalist-apartment',
      location: 'Jaipur',
      category: 'Residential',
      image: 'https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?q=80&w=2574&auto=format&fit=crop'
    },
    {
      title: 'Premium Banquet Hall',
      slug: 'premium-banquet-hall',
      location: 'Jaipur',
      category: 'Commercial',
      image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2674&auto=format&fit=crop'
    },
    {
      title: 'Industrial Plant Fit-out',
      slug: 'industrial-plant-fit-out',
      location: 'Neemrana',
      category: 'Infrastructure',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2670&auto=format&fit=crop'
    }
  ]

  const filteredProjects = activeCategory === 'All' 
    ? projects 
    : projects.filter(p => p.category === activeCategory)

  return (
    <section id="projects" className="py-24 bg-brand-offwhite relative overflow-hidden">
      {/* Technical Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(3,47,53,1) 1px, transparent 1px), linear-gradient(90deg, rgba(3,47,53,1) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      
      <div className="container-premium relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8 border-b border-brand-teal/10 pb-12">
          <div>
            <span className="inline-block px-4 py-1 bg-brand-gold/10 text-brand-gold font-bold text-xs tracking-[0.3em] uppercase mb-4 border-l-2 border-brand-gold">
              Portfolio
            </span>
            <h2 className="text-brand-teal italic font-black">Featured <span className="text-brand-gold not-italic">Works.</span></h2>
          </div>
          
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-8 py-3 rounded-sm text-xs font-black tracking-widest uppercase transition-all duration-300 ${
                  activeCategory === cat 
                    ? 'bg-brand-teal text-brand-gold shadow-lg' 
                    : 'bg-white text-brand-teal/50 hover:text-brand-teal'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.slug}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="group relative overflow-hidden rounded-[2rem] shadow-2xl cursor-pointer"
              >
                <Link to={`/project/${project.slug}`} className="block h-full w-full">
                  <div className="aspect-[4/5] overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                  </div>
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-teal via-brand-teal/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="absolute bottom-0 left-0 p-10 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="h-px w-8 bg-brand-gold"></span>
                        <p className="text-brand-gold font-bold text-xs uppercase tracking-[0.3em]">
                          {project.category}
                        </p>
                      </div>
                      <h3 className="text-white text-3xl font-black mb-4 leading-tight italic">{project.title}</h3>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-brand-offwhite/70 text-sm font-bold uppercase tracking-widest">
                          <MapPin size={16} className="text-brand-gold" />
                          {project.location}
                        </div>
                        <div className="w-12 h-12 bg-brand-gold rounded-full flex items-center justify-center text-brand-teal transform rotate-45 group-hover:rotate-0 transition-all duration-500">
                          <ArrowRight size={24} />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}

export default Projects
