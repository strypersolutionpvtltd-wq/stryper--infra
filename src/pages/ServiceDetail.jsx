import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, CheckCircle2, Ruler, Building2, Palette, Hammer, ClipboardCheck, Factory } from 'lucide-react'

const serviceData = {
  'interior-design': {
    title: 'Luxury Interior Design',
    description: 'Transforming residential and commercial spaces into high-end architectural masterpieces.',
    longDescription: 'Our interior design services go beyond aesthetics. We engineer environments that balance luxury with functionality. From modular kitchens to designer living spaces, every element is curated with precision.',
    features: ['Custom Furniture Design', 'Material Sourcing', '3D Visualization', 'Space Optimization'],
    icon: Palette,
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop'
  },
  'infrastructure': {
    title: 'Infrastructure Solutions',
    description: 'Robust planning and execution for large-scale industrial and commercial projects.',
    longDescription: 'We specialize in complex infrastructure sites, providing end-to-end execution. Our technical expertise ensures that large-scale projects are delivered with precision and durability.',
    features: ['Site Preparation', 'Structural Engineering', 'Industrial Fit-outs', 'Utility Integration'],
    icon: Building2,
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2000&auto=format&fit=crop'
  },
  'architecture': {
    title: 'Architectural Planning',
    description: 'Functional and innovative designs tailored to modern aesthetics and utility.',
    longDescription: 'Our architectural approach focuses on structural integrity and aesthetic innovation. We provide comprehensive blueprints and site planning for luxury homes and commercial hubs.',
    features: ['Blueprint Design', 'Zoning Analysis', 'Structural Planning', 'Permit Management'],
    icon: Ruler,
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop'
  },
  'fit-out': {
    title: 'Fit-Out Solutions',
    description: 'Premium custom joinery and specialized metal work for commercial and luxury sites.',
    longDescription: 'Execution-focused fit-outs that bring designs to life. We handle everything from specialized fabrication to high-end joinery with meticulous attention to detail.',
    features: ['Custom Joinery', 'Metal Fabrication', 'Lighting Installation', 'Flooring & Finishes'],
    icon: Hammer,
    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=2000&auto=format&fit=crop'
  },
  'project-management': {
    title: 'Project Management',
    description: 'Professional oversight ensuring timely delivery and uncompromising quality.',
    longDescription: 'Our project custodians ensure that every site is managed with technical precision. We handle timelines, vendor coordination, and quality audits to deliver a seamless handover.',
    features: ['Timeline Management', 'Quality Audits', 'Vendor Coordination', 'Cost Optimization'],
    icon: ClipboardCheck,
    image: 'https://images.unsplash.com/photo-1531973576160-7125cd663d86?q=80&w=2000&auto=format&fit=crop'
  },
  'fabrication': {
    title: 'Industrial Fabrication',
    description: 'High-precision metal and structural fabrication for specialized requirements.',
    longDescription: 'State-of-the-art fabrication services for industrial and architectural needs. We specialize in custom metalwork and structural elements that require technical mastery.',
    features: ['Steel Structures', 'Custom Metalwork', 'Welding & Assembly', 'Precision Cutting'],
    icon: Factory,
    image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=2000&auto=format&fit=crop'
  }
}

const ServiceDetail = () => {
  const { slug } = useParams()
  const service = serviceData[slug]

  if (!service) return <div>Service not found</div>

  return (
    <div className="bg-[#F2EDE4] min-h-screen pt-32 pb-24">
      {/* Technical Grid Pattern */}
      <div className="fixed inset-0 opacity-[0.1] pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,1) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

      <div className="container-premium relative z-10">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-black/50 hover:text-black transition-colors font-black uppercase tracking-widest text-xs mb-12"
        >
          <ArrowLeft size={16} /> Back to Hub
        </Link>

        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-4 mb-8">
              <span className="h-px w-12 bg-brand-gold"></span>
              <span className="text-[10px] font-black text-brand-gold uppercase tracking-[0.4em]">Expertise Detail</span>
            </div>
            
            <h1 className="text-black italic font-black text-5xl md:text-7xl mb-8 leading-tight">
              {service.title.split(' ').slice(0, -1).join(' ')} <span className="text-brand-gold not-italic">{service.title.split(' ').pop()}.</span>
            </h1>
            
            <p className="text-black/70 text-lg leading-relaxed font-medium italic mb-10">
              "{service.longDescription}"
            </p>

            <div className="grid sm:grid-cols-2 gap-6 mb-12">
              {service.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-4 group">
                  <div className="w-10 h-10 bg-black text-brand-gold flex items-center justify-center group-hover:rotate-12 transition-transform">
                    <CheckCircle2 size={16} />
                  </div>
                  <span className="text-black font-black text-[10px] uppercase tracking-[0.2em]">{feature}</span>
                </div>
              ))}
            </div>

            <a href="#contact" className="btn-gold !px-12 !py-6">Start This Project</a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative"
          >
            <div className="relative h-[600px] overflow-hidden shadow-2xl border border-black/5">
              <img 
                src={service.image} 
                alt={service.title} 
                className="w-full h-full object-cover transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-black/10"></div>
            </div>
            {/* Corner Accent */}
            <div className="absolute top-0 right-0 w-24 h-24 border-t-4 border-r-4 border-brand-gold m-10"></div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default ServiceDetail
