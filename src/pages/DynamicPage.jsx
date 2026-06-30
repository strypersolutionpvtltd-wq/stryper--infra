import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, CheckCircle2, Phone, Calendar, ArrowRight } from 'lucide-react'

const PAGE_DATA = {
  // Residential
  'luxury-wardrobes': {
    title: 'Luxury Wardrobes',
    subtitle: 'Bespoke storage systems engineered for high-end walk-in experiences.',
    description: 'Our wardrobes combine high-quality German hardware with Italian-inspired finishes. Customized to fit your space, layout, and style.',
    features: ['Walk-in Closets', 'Sliding & Hinged Wardrobes', 'LED Smart Lighting Integration', 'Premium Leather & Glass Finishes'],
    image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?q=80&w=2000&auto=format&fit=crop'
  },
  'modular-kitchens': {
    title: 'Modular Kitchens',
    subtitle: 'High-precision ergonomic kitchens designed for modern lifestyles.',
    description: 'Engineered with moisture-resistant materials and smart storage accessories to ensure cooking is an absolute pleasure.',
    features: ['Soft-close Tandem Drawers', 'Italian Marble Countertops', 'Built-in Appliances Integration', 'Anti-scratch Acrylic Shutters'],
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=2000&auto=format&fit=crop'
  },
  'vanity-solutions': {
    title: 'Vanity Solutions',
    subtitle: 'Premium bathroom vanity designs that elevate your daily routine.',
    description: 'Water-resistant, elegant bathroom storage cabinets combined with high-end designer basins and touch-sensor LED mirrors.',
    features: ['Moisture-resistant Plywood', 'Quartz & Corian Countertops', 'Floating & Under-counter Cabinets', 'Integrated Basin Lighting'],
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=2000&auto=format&fit=crop'
  },
  'wall-panels': {
    title: 'Wall Panels & Decor',
    subtitle: 'Architectural wall treatments that define space and texture.',
    description: 'Transform plain walls into focal points with wood fluted panels, acoustic paneling, veneer claddings, and metallic profiles.',
    features: ['WPC Fluted Panels', 'Premium Charcoal Claddings', 'Veneer & PU Polish Panels', 'Integrated Profile Lighting'],
    image: 'https://images.unsplash.com/photo-1618219944342-824e40a13285?q=80&w=2000&auto=format&fit=crop'
  },
  // Hospitality & Commercial
  'hotel-resorts-fit-out': {
    title: 'Hotel & Resorts Fit-Out',
    subtitle: 'End-to-end fit-out solutions for premium hospitality sites.',
    description: 'We deliver custom contract furniture, lobby joinery, suite interiors, and wall claddings for hotels and resorts across India.',
    features: ['Lobby & Reception Paneling', 'Suite Fit-outs', 'Contract Furniture Production', 'Acoustic Wall Treatments'],
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2000&auto=format&fit=crop'
  },
  'office-workstations': {
    title: 'Office Workstations',
    subtitle: 'Ergonomic, flexible layouts that boost workplace productivity.',
    description: 'Modular desk systems, linear workstations, and collaborative spaces engineered with integrated wire-management and acoustics.',
    features: ['Linear & Cluster Desks', 'Built-in Wire Trays', 'Acoustic Privacy Screens', 'Modular Storage Credenzas'],
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2000&auto=format&fit=crop'
  },
  'ceo-md-tables': {
    title: 'CEO & MD Executive Tables',
    subtitle: 'Prestigious executive desks designed for leadership spaces.',
    description: 'Statement executive desks made with premium veneers, leather writing pads, soft-closing wire boxes, and architectural bases.',
    features: ['Veneer & Leather Tops', 'Ergonomic Leadership Desks', 'Integrated Wire Management', 'Matching Back Credenzas'],
    image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=2000&auto=format&fit=crop'
  },
  'retail-showrooms': {
    title: 'Retail Showrooms',
    subtitle: 'High-traffic retail environments engineered for brand conversion.',
    description: 'Display fixtures, specialized branding backdrops, metal display racks, and cash counter designs for modern retail stores.',
    features: ['Custom Display Fixtures', 'Aesthetic Acrylic Racks', 'LED Accent Lighting', 'Premium Billing Counters'],
    image: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?q=80&w=2000&auto=format&fit=crop'
  },
  // Infrastructure & Fab
  'industrial-sites': {
    title: 'Industrial Sites',
    subtitle: 'Heavy-duty PEB structural fabrication and industrial construction.',
    description: 'Complete civil and structural infrastructure services, industrial PEB sheds, heavy machinery foundations, and factory fit-outs.',
    features: ['PEB Steel Structures', 'Machine Foundation Foundations', 'Industrial Sheds Fabrication', 'Heavy Duty Flooring'],
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2000&auto=format&fit=crop'
  },
  'fabrication-metalwork': {
    title: 'Fabrication & Metalwork',
    subtitle: 'Custom precision metal fabrication for structural and architectural needs.',
    description: 'State-of-the-art MS, SS, and Aluminum fabrication including structural beams, designer metal partitions, and CNC cut panels.',
    features: ['Heavy Steel Fabrication', 'Architectural SS Screens', 'Custom Railings & Gates', 'Laser CNC Precision Cutting'],
    image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=2000&auto=format&fit=crop'
  },
  'structural-planning': {
    title: 'Structural Planning',
    subtitle: 'Advanced structural engineering drawings and site analysis.',
    description: 'Providing comprehensive structural designs, load calculations, stability certificates, and structural drawings for safety and durability.',
    features: ['Foundation Layouts', 'Load Analysis & Calculation', 'Stability Certificates', 'RCC & Steel Drawings'],
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2000&auto=format&fit=crop'
  },
  'project-management-detail': {
    title: 'Project Management & PMC',
    subtitle: 'Professional end-to-end site coordination and quality assurance.',
    description: 'Our PMC division ensures project delivery on time, under budget, and complying with the highest standards of safety and quality.',
    features: ['Daily Site Coordination', 'BOM & Cost Control', 'Quality Audits & Checklists', 'Safety Protocol Management'],
    image: 'https://images.unsplash.com/photo-1531973576160-7125cd663d86?q=80&w=2000&auto=format&fit=crop'
  },
  // Our Story
  'leadership-team': {
    title: 'Our Leadership Team',
    subtitle: 'The visionary minds driving engineering and design excellence.',
    description: 'Meet the executive team and senior architects leading Stryper\'s mission to deliver uncompromising infrastructure and luxury interiors across India.',
    features: ['Architectural Directors', 'Technical Head Engineers', 'Dedicated PMC Lead managers', 'Quality Assurance team'],
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=2000&auto=format&fit=crop'
  },
  'client-testimonials-detail': {
    title: 'Client Testimonials',
    subtitle: 'What our premium residential and industrial partners say.',
    description: 'Explore written reviews and case histories from clients who selected Stryper for their complex sites and luxury projects.',
    features: ['100+ Satisfied Clients', 'Jaipur & Delhi NCR Projects', 'Corporate Partner Reviews', 'Industrial Site References'],
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2000&auto=format&fit=crop'
  },
  // Inspiration
  'catalogue-designs': {
    title: 'Catalogue & Designs',
    subtitle: 'Download our comprehensive 2026 design lookbook.',
    description: 'Get inspired by our collection of modular furniture layouts, partition patterns, materials selections, and infrastructure case studies.',
    features: ['2026 Kitchen Lookbook', 'Wardrobe Access Profiles', 'Office Workstations Catalog', 'Steel Fabrication Designs'],
    image: 'https://images.unsplash.com/photo-1506806732259-39c2d0268443?q=80&w=2000&auto=format&fit=crop'
  },
  'custom-design-solutions-detail': {
    title: 'Custom Design Solutions',
    subtitle: 'Tailor-made structural and interior spaces built to your exact specifications.',
    description: 'If standard modules don\'t fit your needs, our expert team designs bespoke solutions, custom engineering every component for a perfect fit.',
    features: ['Unique Layout Planning', 'Bespoke Material Matching', 'Specialized Size Fabrications', 'Collaborative Design Process'],
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=2000&auto=format&fit=crop'
  },
  'material-innovations': {
    title: 'Material Innovations',
    subtitle: 'Next-generation materials engineered for longevity.',
    description: 'We source anti-fingerprint laminates, carbon wood paneling, premium polymer-based composite structures, and rust-resistant structural coatings.',
    features: ['Anti-Fingerprint Acrylics', 'Moisture Proof WPC Base', 'High Tensile Structural MS', 'Eco-friendly Low VOC Finishes'],
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2000&auto=format&fit=crop'
  },
  // Blogs & Media
  'latest-blogs': {
    title: 'Latest Blogs & Design Trends',
    subtitle: 'Insights on architecture, civil work, and interior design.',
    description: 'Articles written by our top architects and engineers discussing modern design tips, PEB planning guidelines, and home remodeling strategies.',
    features: ['Weekly Design Tips', 'Structural Safety Guides', 'PEB Shed Project Insights', 'Smart Kitchen Layout Trends'],
    image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2000&auto=format&fit=crop'
  },
  'awards-recognition': {
    title: 'Awards & Recognition',
    subtitle: 'Celebrating three years of technical and architectural milestones.',
    description: 'Stryper has been recognized in regional design awards for excellence in modular execution and structural reliability.',
    features: ['Jaipur Architecture Awards', 'Best Modular Interior nominee', 'Safety First PMC Recognition', 'ISO 9001:2015 Compliant'],
    image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=2000&auto=format&fit=crop'
  },
  // Contact Us
  'inquiry-form-detail': {
    title: 'Submit Inquiry',
    subtitle: 'Connect with a project custodian to estimate your project.',
    description: 'Fill out our structural or interior detail form, and a dedicated Stryper engineer will schedule a site visit or estimate within 24 hours.',
    features: ['Fast 24hr Quotation', 'Free Initial Estimate', 'Dedicated Project Manager', 'Jaipur-wide Site Audits'],
    image: 'https://images.unsplash.com/photo-1423666639041-f56000c27a9a?q=80&w=2000&auto=format&fit=crop'
  },
  'work-with-us': {
    title: 'Work With Us',
    subtitle: 'Join Stryper\'s technical and design execution team.',
    description: 'We are constantly looking for talented site supervisors, senior architects, structural engineers, and client coordinators. Apply today.',
    features: ['Career Growth Path', 'Agile Work Culture', 'Large Scale Projects', 'Competitive Compensation'],
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2000&auto=format&fit=crop'
  }
}

const DynamicPage = () => {
  const { slug } = useParams()
  const page = PAGE_DATA[slug]

  if (!page) {
    return (
      <div className="min-h-screen bg-brand-cream flex items-center justify-center pt-32">
        <div className="text-center p-8 max-w-md">
          <h2 className="text-2xl font-black text-brand-teal uppercase tracking-widest mb-4">Page Not Found</h2>
          <p className="text-brand-teal/60 mb-8 font-medium">The page you are looking for does not exist or has been moved.</p>
          <Link to="/" className="btn-gold">Back to Home</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-brand-cream min-h-screen pt-32 pb-24">
      {/* Technical Grid Pattern */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none z-0" style={{ backgroundImage: 'linear-gradient(rgba(3,47,53,1) 1px, transparent 1px), linear-gradient(90deg, rgba(3,47,53,1) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

      <div className="container-premium relative z-10">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-brand-teal/50 hover:text-brand-teal transition-colors font-black uppercase tracking-[0.2em] text-[10px] mb-12"
        >
          <ArrowLeft size={14} /> Back to Hub
        </Link>

        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-4 mb-8">
              <span className="h-px w-12 bg-brand-gold"></span>
              <span className="text-[10px] font-black text-brand-gold uppercase tracking-[0.4em]">Stryper Premium</span>
            </div>
            
            <h1 className="text-brand-teal font-black text-4xl md:text-6xl mb-6 leading-tight uppercase tracking-wider">
              {page.title}
            </h1>

            <p className="text-brand-gold text-lg md:text-xl font-bold uppercase tracking-[0.1em] mb-8 leading-relaxed">
              {page.subtitle}
            </p>
            
            <p className="text-brand-teal/70 text-base leading-relaxed font-medium mb-10 text-justify-organic">
              {page.description}
            </p>

            <div className="grid sm:grid-cols-2 gap-6 mb-12">
              {page.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-4 group">
                  <div className="w-8 h-8 bg-brand-teal text-brand-gold flex items-center justify-center transition-transform group-hover:rotate-12">
                    <CheckCircle2 size={14} />
                  </div>
                  <span className="text-brand-teal font-black text-[10px] uppercase tracking-[0.15em]">{feature}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 border-t border-brand-teal/10 pt-10">
              <a href="tel:+919565310410" className="btn-outline flex items-center justify-center gap-2">
                <Phone size={14} /> Call Custodian
              </a>
              <Link to="/?scroll=contact" className="btn-gold flex items-center justify-center gap-2">
                <Calendar size={14} /> Book Site Audit <ArrowRight size={12} />
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative h-[450px] md:h-[550px] shadow-2xl border border-brand-teal/5 overflow-hidden"
          >
            <img 
              src={page.image} 
              alt={page.title} 
              className="w-full h-full object-cover"
            />
            {/* Elegant overlay frame */}
            <div className="absolute inset-0 border-[16px] border-brand-cream/10 pointer-events-none"></div>
            <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-brand-gold m-8"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-brand-gold m-8"></div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default DynamicPage
