import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, MapPin, CheckCircle2 } from 'lucide-react'

const projectData = {
  'luxury-villa': {
    title: 'Luxury Villa',
    location: 'Jaipur',
    category: 'Residential',
    client: 'Private Owner',
    area: '12,500 sq.ft.',
    duration: '14 Months',
    description: 'A complete architectural and interior transformation of a sprawling private estate, combining traditional Rajasthani elements with ultra-modern luxury amenities.',
    features: ['Custom Italian Marble Flooring', 'Smart Home Automation', 'Bespoke Joinery', 'Landscape Integration'],
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2553&auto=format&fit=crop'
  },
  'modern-it-office': {
    title: 'Modern IT Office',
    location: 'Bangalore',
    category: 'Commercial',
    client: 'Global Tech Corp',
    area: '45,000 sq.ft.',
    duration: '8 Months',
    description: 'A highly functional and agile workspace designed for a leading technology firm, fostering collaboration and productivity through open-plan layouts and ergonomic design.',
    features: ['Acoustic Meeting Pods', 'Ergonomic Workstations', 'Biophilic Design Elements', 'Advanced HVAC Systems'],
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2569&auto=format&fit=crop'
  },
  'heritage-hotel-fit-out': {
    title: 'Heritage Hotel Fit-out',
    location: 'Udaipur',
    category: 'Infrastructure',
    client: 'Royal Heritage Group',
    area: '80,000 sq.ft.',
    duration: '22 Months',
    description: 'A sensitive yet extensive restoration and fit-out of a historic property, ensuring modern structural integrity while preserving its royal heritage.',
    features: ['Structural Reinforcement', 'Heritage Conservation', 'Luxury Suite Fit-outs', 'Custom Brass Fabrication'],
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2670&auto=format&fit=crop'
  },
  'minimalist-apartment': {
    title: 'Minimalist Apartment',
    location: 'Jaipur',
    category: 'Residential',
    client: 'Private Client',
    area: '4,200 sq.ft.',
    duration: '5 Months',
    description: 'A sleek, minimalist approach to high-rise living. This project focused on maximizing natural light, clean lines, and integrated storage solutions.',
    features: ['Concealed Storage', 'Minimalist Lighting', 'Neutral Color Palette', 'High-end Fixtures'],
    image: 'https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?q=80&w=2574&auto=format&fit=crop'
  },
  'premium-banquet-hall': {
    title: 'Premium Banquet Hall',
    location: 'Jaipur',
    category: 'Commercial',
    client: 'Nirala Crystal',
    area: '25,000 sq.ft.',
    duration: '9 Months',
    description: 'A grand commercial space engineered for large-scale events, featuring advanced acoustic treatments, dynamic lighting rigs, and opulent finishes.',
    features: ['Crystal Chandeliers', 'Acoustic Wall Paneling', 'Heavy-duty HVAC', 'Commercial Kitchen Setup'],
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2674&auto=format&fit=crop'
  },
  'industrial-plant-fit-out': {
    title: 'Industrial Plant Fit-out',
    location: 'Neemrana',
    category: 'Infrastructure',
    client: 'Manufacturing Solutions Inc.',
    area: '120,000 sq.ft.',
    duration: '18 Months',
    description: 'A heavy-duty industrial infrastructure project requiring precise fabrication, specialized flooring, and robust structural planning.',
    features: ['Epoxy Industrial Flooring', 'Heavy Machinery Foundations', 'Steel Fabrication', 'Safety Compliance Implementation'],
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2670&auto=format&fit=crop'
  }
}

const ProjectDetail = () => {
  const { slug } = useParams()
  const project = projectData[slug]

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
