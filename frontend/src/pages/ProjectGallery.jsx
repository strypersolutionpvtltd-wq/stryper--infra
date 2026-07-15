import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, ArrowRight, Layers, SlidersHorizontal } from 'lucide-react'
import { getProjects } from '../data/store'

const ProjectGallery = () => {
  const [projects, setProjects] = useState([])
  const [activeFilter, setActiveFilter] = useState('All')
  const location = useLocation()

  useEffect(() => {
    const load = async () => {
      setProjects(await getProjects())
    }
    load()
  }, [])

  // Parse query parameters for pre-selected category
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search)
    const categoryParam = queryParams.get('category')
    if (categoryParam) {
      // Capitalize first letter
      const cap = categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1).toLowerCase()
      if (['Residential', 'Hospitality', 'Commercial', 'Infrastructure'].includes(cap)) {
        setActiveFilter(cap)
      }
    } else {
      setActiveFilter('All')
    }
  }, [location])

  const categories = ['All', 'Residential', 'Hospitality', 'Commercial', 'Infrastructure']

  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(p => p.category.toLowerCase() === activeFilter.toLowerCase())

  return (
    <div className="bg-[#F2EDE4] min-h-screen pt-32 pb-24 font-roboto">
      {/* Subtle technical background grid */}
      <div className="fixed inset-0 opacity-[0.06] pointer-events-none z-0" style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,1) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

      <div className="container-premium relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="h-px w-12 bg-brand-gold"></span>
            <span className="text-[10px] font-black text-brand-gold uppercase tracking-[0.4em]">Curated Portfolio</span>
            <span className="h-px w-12 bg-brand-gold"></span>
          </div>
          <h1 className="text-black font-black text-4xl md:text-6xl mb-6 uppercase tracking-wider italic">
            Architectural <span className="text-brand-gold not-italic">Gallery</span>
          </h1>
          <p className="text-black/60 text-sm md:text-base font-medium leading-relaxed">
            Explore our design execution catalog, stretching from bespoke luxury residential villas to heavy-duty industrial PEB structural systems.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-black/10 pb-8 mb-12">
          <div className="flex items-center gap-2 text-brand-champagne font-black text-[10px] uppercase tracking-widest">
            <SlidersHorizontal size={14} className="text-brand-gold" /> Filter Projects
          </div>
          
          <div className="flex flex-wrap gap-2 md:gap-3 justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`py-2.5 px-6 text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 rounded-none border ${
                  activeFilter === cat 
                    ? 'bg-black text-brand-gold border-black shadow-md' 
                    : 'bg-transparent text-black/60 border-black/10 hover:border-black/30 hover:text-black'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Project Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                layout
                key={project.slug}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className="group bg-white border border-black/5 hover:border-brand-gold/30 transition-all duration-500 shadow-lg hover:shadow-2xl relative overflow-hidden flex flex-col justify-between"
              >
                {/* Image Wrap */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-black">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 bg-black text-brand-gold py-1.5 px-3 border border-brand-gold/10 text-[9px] font-black uppercase tracking-widest">
                    {project.category}
                  </div>
                </div>

                {/* Info Content */}
                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-1.5 text-black/50 text-[10px] font-bold uppercase tracking-wider">
                      <MapPin size={12} className="text-brand-gold" /> {project.location}
                    </div>
                    <h3 className="text-black text-xl font-black font-serif uppercase tracking-tight group-hover:text-brand-champagne transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-black/60 text-xs line-clamp-3 leading-relaxed font-medium">
                      {project.description}
                    </p>
                  </div>

                  <div className="border-t border-black/5 pt-5 flex items-center justify-between">
                    <div className="text-left">
                      <span className="text-[8px] font-black text-brand-gold uppercase tracking-widest block">Project Size</span>
                      <span className="text-xs font-bold text-black">{project.area}</span>
                    </div>
                    
                    <Link 
                      to={`/project/${project.slug}`}
                      className="inline-flex items-center justify-center w-8 h-8 bg-black text-brand-gold group-hover:bg-brand-gold group-hover:text-black transition-colors"
                    >
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-20 text-black/40 italic font-medium">
            No projects found in this category.
          </div>
        )}

      </div>
    </div>
  )
}

export default ProjectGallery
