import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, MapPin, CheckCircle2 } from 'lucide-react'
import { getProjects } from '../data/store'

const ProjectDetail = () => {
  const { slug } = useParams()
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const list = getProjects()
    const found = list.find(p => p.slug === slug)
    setProject(found)
    setLoading(false)
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F2EDE4] flex items-center justify-center font-black text-xs uppercase tracking-widest">
        Loading Details...
      </div>
    )
  }

  if (!project) return <div className="min-h-screen flex items-center justify-center bg-[#F2EDE4] font-black text-2xl uppercase">Project not found</div>

  return (
    <div className="bg-[#F2EDE4] min-h-screen pt-32 pb-24">
      {/* Technical Grid Pattern */}
      <div className="fixed inset-0 opacity-[0.1] pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,1) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

      <div className="container-premium relative z-10">
        <Link 
          to="/#projects" 
          className="inline-flex items-center gap-2 text-black/50 hover:text-black transition-colors font-black uppercase tracking-widest text-xs mb-12"
        >
          <ArrowLeft size={16} /> Back to Portfolio
        </Link>

        <div className="grid lg:grid-cols-12 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5"
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="h-px w-12 bg-brand-gold"></span>
              <span className="text-[10px] font-black text-brand-gold uppercase tracking-[0.4em]">{project.category}</span>
            </div>
            
            <h1 className="text-black italic font-black text-5xl md:text-6xl mb-8 leading-tight">
              {project.title}
            </h1>
            
            <p className="text-black/70 text-lg leading-relaxed font-medium italic mb-10">
              "{project.description}"
            </p>

            {/* Project Specs */}
            <div className="grid grid-cols-2 gap-y-8 mb-12 border-y border-black/10 py-8">
              <div>
                <p className="text-[10px] font-black text-brand-gold uppercase tracking-widest mb-1">Location</p>
                <p className="font-bold text-black flex items-center gap-1"><MapPin size={14} className="text-brand-gold" /> {project.location}</p>
              </div>
              <div>
                <p className="text-[10px] font-black text-brand-gold uppercase tracking-widest mb-1">Client</p>
                <p className="font-bold text-black">{project.client}</p>
              </div>
              <div>
                <p className="text-[10px] font-black text-brand-gold uppercase tracking-widest mb-1">Area</p>
                <p className="font-bold text-black">{project.area}</p>
              </div>
              <div>
                <p className="text-[10px] font-black text-brand-gold uppercase tracking-widest mb-1">Duration</p>
                <p className="font-bold text-black">{project.duration}</p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-black text-lg font-black uppercase tracking-widest mb-6 italic">Key Deliverables</h3>
              {project.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-4 group">
                  <div className="w-8 h-8 bg-black text-brand-gold flex items-center justify-center group-hover:rotate-12 transition-transform shadow-md">
                    <CheckCircle2 size={14} />
                  </div>
                  <span className="text-black font-bold text-xs uppercase tracking-[0.1em]">{feature}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="lg:col-span-7 relative"
          >
            <div className="relative aspect-[4/5] md:aspect-auto md:h-[800px] overflow-hidden shadow-2xl border border-black/5">
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
              />
            </div>
            {/* Corner Accent */}
            <div className="absolute top-0 right-0 w-32 h-32 border-t-8 border-r-8 border-brand-gold m-8 mix-blend-difference pointer-events-none"></div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default ProjectDetail
