import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  ArrowLeft, CheckCircle2, Phone, Calendar, ArrowRight, 
  Palette, Sliders, ShieldCheck, Layers, Layout, Maximize2 
} from 'lucide-react'

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
    image: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=2000&auto=format&fit=crop'
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
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=2000&auto=format&fit=crop'
  },
  'office-workstations': {
    title: 'Office Workstations',
    subtitle: 'Ergonomic, flexible layouts that boost workplace productivity.',
    description: 'Modular desk systems, linear workstations, and collaborative spaces engineered with integrated wire-management and acoustics.',
    features: ['Linear & Cluster Desks', 'Built-in Wire Trays', 'Acoustic Privacy Screens', 'Modular Storage Credenzas'],
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2000&auto=format&fit=crop'
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
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2000&auto=format&fit=crop'
  },
  'fabrication-metalwork': {
    title: 'Fabrication & Metalwork',
    subtitle: 'Custom precision metal fabrication for structural and architectural needs.',
    description: 'State-of-the-art MS, SS, and Aluminum fabrication including structural beams, designer metal partitions, and CNC cut panels.',
    features: ['Heavy Steel Fabrication', 'Architectural SS Screens', 'Custom Railings & Gates', 'Laser CNC Precision Cutting'],
    image: 'https://images.unsplash.com/photo-1535813547-99c456a41d4a?q=80&w=2000&auto=format&fit=crop'
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
  'project-gallery': {
    title: 'Project Gallery',
    subtitle: 'A curated showcase of our luxury interior and infrastructure marvels.',
    description: 'Explore our portfolio of completed projects across India. From modern residential spaces to heavy industrial fabrication sites, we deliver perfection at every scale.',
    features: ['Residential Masterpieces', 'Corporate & Commercial Hubs', 'PEB Industrial Structures', 'Hospitality & Luxury Resorts'],
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000&auto=format&fit=crop'
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
    image: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?q=80&w=2000&auto=format&fit=crop'
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
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop'
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

  // Interactive states for customizers
  const [kitchenFinish, setKitchenFinish] = useState('Emerald Lacquer')
  const [kitchenHardware, setKitchenHardware] = useState('Brass Knurled')
  const [kitchenCountertop, setKitchenCountertop] = useState('Carrara Quartz')

  const [activeSwatch, setActiveSwatch] = useState('fluted-teak')
  const [activeLayout, setActiveLayout] = useState('executive-cabin')
  const [activeCompliance, setActiveCompliance] = useState('steel-grade')

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

  // Interactive Widgets Render Logic
  const renderInteractiveSection = () => {
    if (slug === 'modular-kitchens' || slug === 'luxury-wardrobes') {
      return (
        <div className="mt-20 border-t border-brand-teal/10 pt-16">
          <div className="flex items-center gap-4 mb-6">
            <Palette className="text-brand-gold w-5 h-5" />
            <h3 className="text-black text-xl font-black uppercase tracking-wider italic">Material Finish Customizer</h3>
          </div>
          <p className="text-brand-teal/60 text-xs font-semibold uppercase tracking-widest mb-8">
            Configure custom cabinet finishes, hardware, and surfaces to preview engineering specs.
          </p>

          <div className="grid md:grid-cols-12 gap-10 items-start">
            {/* Control Panel */}
            <div className="md:col-span-5 space-y-6 bg-white p-8 border border-black/5 shadow-md">
              <div>
                <span className="text-[9px] font-black text-brand-gold uppercase tracking-wider block mb-2">1. Cabinet Finish</span>
                <div className="flex flex-wrap gap-2">
                  {['Emerald Lacquer', 'Charcoal Noir', 'Ivory Satin', 'Royal Walnut'].map(finish => (
                    <button
                      key={finish}
                      onClick={() => setKitchenFinish(finish)}
                      className={`px-3 py-1.5 text-[9px] font-black uppercase tracking-wider border transition-colors ${
                        kitchenFinish === finish ? 'bg-black text-brand-gold border-black' : 'bg-transparent border-black/10 hover:border-black/30'
                      }`}
                    >
                      {finish}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-[9px] font-black text-brand-gold uppercase tracking-wider block mb-2">2. Hardware Details</span>
                <div className="flex flex-wrap gap-2">
                  {['Brass Knurled', 'Gola Profile', 'Integrated Touch'].map(hardware => (
                    <button
                      key={hardware}
                      onClick={() => setKitchenHardware(hardware)}
                      className={`px-3 py-1.5 text-[9px] font-black uppercase tracking-wider border transition-colors ${
                        kitchenHardware === hardware ? 'bg-black text-brand-gold border-black' : 'bg-transparent border-black/10 hover:border-black/30'
                      }`}
                    >
                      {hardware}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-[9px] font-black text-brand-gold uppercase tracking-wider block mb-2">3. Countertop Surface</span>
                <div className="flex flex-wrap gap-2">
                  {['Carrara Quartz', 'Nero Marquina', 'Solid Teak Wood'].map(top => (
                    <button
                      key={top}
                      onClick={() => setKitchenCountertop(top)}
                      className={`px-3 py-1.5 text-[9px] font-black uppercase tracking-wider border transition-colors ${
                        kitchenCountertop === top ? 'bg-black text-brand-gold border-black' : 'bg-transparent border-black/10 hover:border-black/30'
                      }`}
                    >
                      {top}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Spec Sheet Display */}
            <div className="md:col-span-7 bg-black text-white p-8 border border-white/5 shadow-2xl relative">
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-brand-gold m-4"></div>
              <h4 className="text-brand-gold font-serif italic text-lg mb-4">Engineering Spec Summary</h4>
              
              <div className="space-y-4 text-xs">
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-white/50 uppercase tracking-widest text-[9px]">Composite Shell</span>
                  <span className="font-bold">{kitchenFinish} on HDHMR plywood</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-white/50 uppercase tracking-widest text-[9px]">Drawer Fittings</span>
                  <span className="font-bold">Hettich/Blum Soft-Close Systems</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-white/50 uppercase tracking-widest text-[9px]">Pull Profiles</span>
                  <span className="font-bold">{kitchenHardware} ergonomics</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-white/50 uppercase tracking-widest text-[9px]">Primary Counter</span>
                  <span className="font-bold">{kitchenCountertop} surface</span>
                </div>
              </div>

              {/* Performance Indicator Rings */}
              <div className="grid grid-cols-3 gap-4 pt-6 mt-6 border-t border-white/10 text-center">
                <div>
                  <span className="text-[16px] font-black text-brand-gold font-mono block">99%</span>
                  <span className="text-[8px] text-white/40 uppercase tracking-wider block mt-1">Water Proof</span>
                </div>
                <div>
                  <span className="text-[16px] font-black text-brand-gold font-mono block">95%</span>
                  <span className="text-[8px] text-white/40 uppercase tracking-wider block mt-1">Scratch Proof</span>
                </div>
                <div>
                  <span className="text-[16px] font-black text-brand-gold font-mono block">10 Yrs</span>
                  <span className="text-[8px] text-white/40 uppercase tracking-wider block mt-1">Warranty</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }

    if (slug === 'vanity-solutions' || slug === 'wall-panels') {
      const swatches = {
        'fluted-teak': {
          title: 'Fluted Teak Panel',
          thickness: '18mm',
          base: 'Charcoal Polymer composite',
          features: 'Durable PU Polish, Termite proof, Acoustic absorption coefficients',
          rating: '98%'
        },
        'charcoal-panel': {
          title: 'Acoustic Charcoal Cladding',
          thickness: '12mm',
          base: 'Recycled Bamboo coal fibers',
          features: 'Zero formaldehyde emission, dampness resistance, rich black textures',
          rating: '99%'
        },
        'gold-corian': {
          title: 'Calacatta Corian Solid Surface',
          thickness: '15mm',
          base: 'Acrylic-mineral compound',
          features: 'Seamless joint integration, non-porous structure, antibacterial surface',
          rating: '96%'
        },
        'brushed-metallic': {
          title: 'Brushed Brass Accent Profile',
          thickness: '2mm',
          base: 'High-purity T-6063 Aluminum',
          features: 'Anodized gold color profile, corrosion resistant, sharp edge transition fit',
          rating: '97%'
        }
      }

      return (
        <div className="mt-20 border-t border-brand-teal/10 pt-16">
          <div className="flex items-center gap-4 mb-6">
            <Sliders className="text-brand-gold w-5 h-5" />
            <h3 className="text-black text-xl font-black uppercase tracking-wider italic">Material Swatch Library</h3>
          </div>
          <p className="text-brand-teal/60 text-xs font-semibold uppercase tracking-widest mb-8">
            Click on individual catalog items to pull up architectural and composite parameters.
          </p>

          <div className="grid md:grid-cols-12 gap-10">
            {/* List of Swatches */}
            <div className="md:col-span-5 space-y-3">
              {Object.keys(swatches).map(key => (
                <button
                  key={key}
                  onClick={() => setActiveSwatch(key)}
                  className={`w-full text-left p-4 border transition-all duration-300 flex items-center justify-between ${
                    activeSwatch === key ? 'bg-black text-white border-black shadow-lg' : 'bg-white border-black/5 hover:border-black/30'
                  }`}
                >
                  <span className="text-xs font-black uppercase tracking-widest">{swatches[key].title}</span>
                  <span className={`text-[9px] font-black uppercase ${activeSwatch === key ? 'text-brand-gold' : 'text-brand-champagne'}`}>View Specs</span>
                </button>
              ))}
            </div>

            {/* Spec Panel */}
            <div className="md:col-span-7 bg-white p-8 border border-black/5 shadow-lg relative">
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-brand-gold m-4"></div>
              <span className="text-[8px] font-black text-brand-gold uppercase tracking-widest block mb-2">Composite Parameters</span>
              <h4 className="text-black text-xl font-black uppercase tracking-tight mb-4">{swatches[activeSwatch].title}</h4>

              <div className="space-y-4 text-xs font-medium border-t border-black/10 pt-4">
                <div className="flex justify-between py-1 border-b border-black/5">
                  <span className="text-black/50 uppercase tracking-widest text-[9px]">Nominal Thickness</span>
                  <span>{swatches[activeSwatch].thickness}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-black/5">
                  <span className="text-black/50 uppercase tracking-widest text-[9px]">Core Compound</span>
                  <span>{swatches[activeSwatch].base}</span>
                </div>
                <div className="py-1 border-b border-black/5">
                  <span className="text-black/50 uppercase tracking-widest text-[9px] block mb-1">Differentiators</span>
                  <span className="text-black/70 italic">"{swatches[activeSwatch].features}"</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-black/50 uppercase tracking-widest text-[9px]">Anti-Moisture Rating</span>
                  <span className="text-brand-champagne font-black">{swatches[activeSwatch].rating}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }

    if (slug === 'office-workstations' || slug === 'ceo-md-tables' || slug === 'retail-showrooms') {
      const layouts = {
        'executive-cabin': {
          title: 'CEO Executive Suite Layout',
          area: '250 sq.ft.',
          acoustics: 'NRC 0.65 Damping Panels',
          wire: 'Integrated dual-path routing credenzas',
          storage: 'Concealed touch cabinets + LED profiles'
        },
        'linear-cluster': {
          title: 'Collaborative Open Cluster',
          area: '400 sq.ft.',
          acoustics: '12mm PET felt desk partitions',
          wire: 'Continuous wire gutters with drop-in box',
          storage: 'Undermount slim metal drawer pedestals'
        },
        'conference-hub': {
          title: 'Premium Meeting Chamber',
          area: '350 sq.ft.',
          acoustics: 'Acoustic fluted panels, NRC 0.70',
          wire: 'Central table wire channel + HDMI connections',
          storage: 'Wall integrated sideboard credenza'
        }
      }

      return (
        <div className="mt-20 border-t border-brand-teal/10 pt-16">
          <div className="flex items-center gap-4 mb-6">
            <Layout className="text-brand-gold w-5 h-5" />
            <h3 className="text-black text-xl font-black uppercase tracking-wider italic">Ergonomic Floorplan Zones</h3>
          </div>
          <p className="text-brand-teal/60 text-xs font-semibold uppercase tracking-widest mb-8">
            Toggle between corporate setups to visualize wire routing and acoustic specs.
          </p>

          <div className="grid md:grid-cols-12 gap-10">
            {/* Zones */}
            <div className="md:col-span-4 space-y-3">
              {Object.keys(layouts).map(key => (
                <button
                  key={key}
                  onClick={() => setActiveLayout(key)}
                  className={`w-full text-left p-5 border text-xs font-black uppercase tracking-widest transition-all duration-300 ${
                    activeLayout === key ? 'bg-black text-white border-black' : 'bg-white border-black/5 hover:border-black/30'
                  }`}
                >
                  {layouts[key].title}
                </button>
              ))}
            </div>

            {/* details */}
            <div className="md:col-span-8 bg-black text-white p-8 border border-white/5 shadow-2xl relative">
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-brand-gold m-4"></div>
              <span className="text-[8px] font-black text-brand-gold uppercase tracking-widest block mb-2">Zone Layout Details</span>
              <h4 className="text-brand-gold font-serif italic text-lg mb-6">{layouts[activeLayout].title}</h4>

              <div className="space-y-4 text-xs">
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-white/50 uppercase tracking-widest text-[9px]">Typical Area</span>
                  <span className="font-bold">{layouts[activeLayout].area}</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-white/50 uppercase tracking-widest text-[9px]">Acoustic Damping</span>
                  <span className="font-bold">{layouts[activeLayout].acoustics}</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-2">
                  <span className="text-white/50 uppercase tracking-widest text-[9px]">Wire Management</span>
                  <span className="font-bold">{layouts[activeLayout].wire}</span>
                </div>
                <div className="flex justify-between pb-2">
                  <span className="text-white/50 uppercase tracking-widest text-[9px]">Smart Storage</span>
                  <span className="font-bold">{layouts[activeLayout].storage}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }

    if (slug === 'industrial-sites' || slug === 'fabrication-metalwork' || slug === 'structural-planning' || slug === 'project-management-detail') {
      const items = {
        'steel-grade': {
          title: 'High-Tensile Structural Steel',
          standards: 'IS 2062 E250 / E350 Grade',
          tolerances: 'ASME Section IX welding checks',
          desc: 'High yield strength steel sections custom-welded to support heavy overhead gantry cranes (up to 50 tons capacity).'
        },
        'peb-portal': {
          title: 'Portal Frame Construction',
          standards: 'AISC 360 / MBMA standard compliance',
          tolerances: 'Precision bolted joineries, ±1.5mm tolerance',
          desc: 'Tapered built-up columns and rafters forming portals that distribute structural load efficiently, yielding up to 60m clear-span layouts.'
        },
        'pmc-audit': {
          title: '120-Point PMC Site Audit Log',
          standards: 'ISO 9001:2015 Site Quality Standards',
          tolerances: 'NDT testing, Ultrasonic weld audit logs',
          desc: 'Complete inspection of foundation compaction, structural deflection checks under load, paint thickness DFT checks, and profile cladding waterproofing.'
        }
      }

      return (
        <div className="mt-20 border-t border-brand-teal/10 pt-16">
          <div className="flex items-center gap-4 mb-6">
            <ShieldCheck className="text-brand-gold w-5 h-5" />
            <h3 className="text-black text-xl font-black uppercase tracking-wider italic">Technical & PMC Compliance Board</h3>
          </div>
          <p className="text-brand-teal/60 text-xs font-semibold uppercase tracking-widest mb-8">
            Review technical codes, welding tolerances, and quality checklists for industrial sites.
          </p>

          <div className="grid md:grid-cols-12 gap-10">
            {/* compliance links */}
            <div className="md:col-span-5 space-y-3">
              {Object.keys(items).map(key => (
                <button
                  key={key}
                  onClick={() => setActiveCompliance(key)}
                  className={`w-full text-left p-4 border transition-all duration-300 flex items-center justify-between ${
                    activeCompliance === key ? 'bg-black text-white border-black' : 'bg-white border-black/5 hover:border-black/30'
                  }`}
                >
                  <span className="text-xs font-black uppercase tracking-widest">{items[key].title}</span>
                  <span className="text-[9px] font-black text-brand-gold uppercase">Inspect</span>
                </button>
              ))}
            </div>

            {/* specifications */}
            <div className="md:col-span-7 bg-white p-8 border border-black/5 shadow-md">
              <span className="text-[8px] font-black text-brand-gold uppercase tracking-widest block mb-2">Civil & PEB Specifications</span>
              <h4 className="text-black text-lg font-black uppercase tracking-tight mb-4">{items[activeCompliance].title}</h4>

              <div className="space-y-4 text-xs font-medium">
                <div className="flex justify-between py-1.5 border-b border-black/5">
                  <span className="text-black/50 uppercase tracking-widest text-[9px]">Technical Codes</span>
                  <span className="font-bold text-black">{items[activeCompliance].standards}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-black/5">
                  <span className="text-black/50 uppercase tracking-widest text-[9px]">Tolerance Limit</span>
                  <span className="font-bold text-black">{items[activeCompliance].tolerances}</span>
                </div>
                <div className="py-1.5">
                  <span className="text-black/50 uppercase tracking-widest text-[9px] block mb-1">Audit description</span>
                  <p className="text-black/70 italic">"{items[activeCompliance].desc}"</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
    return null
  }

  return (
    <div className="bg-brand-cream min-h-screen pt-32 pb-24 font-roboto text-brand-teal">
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
              <a href="tel:+919565310410" className="btn-outline !text-brand-teal !border-brand-teal/30 hover:!border-brand-gold flex items-center justify-center gap-2">
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

        {/* Render Interactive Slugs Widgets */}
        {renderInteractiveSection()}

      </div>
    </div>
  )
}
export default DynamicPage
