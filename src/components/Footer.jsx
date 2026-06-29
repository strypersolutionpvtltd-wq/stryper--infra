import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'
import { Phone, Mail, MapPin } from 'lucide-react'
import chairmanImg from '../assets/chariman.jpg'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { name: 'Facebook', href: 'https://facebook.com', path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" },
    { name: 'Instagram', href: 'https://instagram.com', path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/company/stryper-solution-pvt-ltd/', path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0h.003z" },
    { name: 'Twitter', href: 'https://twitter.com', path: "M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" },
  ]

  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'How it Works', href: '/#how-it-works' },
    { name: 'Our Services', href: '/#services' },
    { name: 'Portfolio', href: '/#projects' },
    { name: 'About Us', href: '/#about' },
  ]

  const serviceList = [
    { name: 'Interior Design', slug: 'interior-design' },
    { name: 'Infrastructure', slug: 'infrastructure' },
    { name: 'Architecture', slug: 'architecture' },
    { name: 'Fit-Out Solutions', slug: 'fit-out' },
    { name: 'Project Management', slug: 'project-management' },
    { name: 'Fabrication', slug: 'fabrication' }
  ]

  return (
    <footer className="bg-brand-navy pt-24 pb-12 relative overflow-hidden text-brand-cream border-t border-white/5">
      {/* Technical Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      <div className="absolute top-0 right-0 text-[15rem] font-black text-white/[0.01] -mr-20 -mt-20 select-none uppercase pointer-events-none">STRYPER</div>

      <div className="container-premium relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20 pb-20 border-b border-white/10">
          {/* Company Brand Column */}
          <div className="space-y-10">
            <div className="flex items-center gap-4">
              <img src={logo} alt="Stryper" className="h-10 md:h-12 w-auto object-contain" />
              <div className="border-l border-brand-gold/50 pl-4">
                <h2 className="text-2xl font-black text-white leading-none tracking-tighter">STRYPER</h2>
                <p className="text-[10px] text-brand-gold tracking-[0.3em] font-bold mt-1 uppercase">INTERIOR & INFRA</p>
              </div>
            </div>
            <p className="text-brand-cream/60 leading-relaxed text-sm font-medium italic">
              "Transforming spaces and building futures with world-class craftsmanship and meticulous execution since 2023. Headquartered in Jaipur, serving Pan-India."
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 bg-white/5 rounded-none flex items-center justify-center text-white hover:bg-white hover:text-brand-navy transition-all duration-300 shadow-xl border border-white/5"
                >
                  <span className="sr-only">{social.name}</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d={social.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Navigation & Services Column */}
          <div className="space-y-12 lg:pl-10">
            <div>
              <h3 className="text-white text-lg font-black uppercase tracking-widest mb-6 italic">Navigate</h3>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-brand-cream/50 hover:text-brand-gold transition-colors text-sm font-bold uppercase tracking-widest flex items-center gap-2 group"
                    >
                      <span className="w-0 h-px bg-brand-gold group-hover:w-4 transition-all"></span>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-white text-lg font-black uppercase tracking-widest mb-6 italic">Expertise</h3>
              <ul className="space-y-3">
                {serviceList.map((service) => (
                  <li key={service.name}>
                    <Link 
                      to={`/service/${service.slug}`} 
                      className="text-brand-cream/50 hover:text-brand-gold transition-colors text-sm font-bold uppercase tracking-widest flex items-center gap-3 group"
                    >
                      <div className="w-2 h-2 bg-brand-gold group-hover:scale-125 transition-transform"></div>
                      {service.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact Details Column */}
          <div className="space-y-8">
            <h3 className="text-white text-lg font-black uppercase tracking-widest mb-10 italic">Concierge</h3>
            <div className="space-y-6">
              <div className="flex gap-5 items-start">
                <div className="w-10 h-10 bg-white/5 border border-white/10 text-brand-gold flex items-center justify-center flex-shrink-0">
                  <Phone size={18} />
                </div>
                <div>
                  <p className="text-[10px] text-brand-gold font-black uppercase tracking-widest mb-1">Call Support</p>
                  <a href="tel:+919565310410" className="text-white hover:text-brand-gold transition-colors font-black text-lg">
                    +91 9565310410
                  </a>
                </div>
              </div>
              <div className="flex gap-5 items-start">
                <div className="w-10 h-10 bg-white/5 border border-white/10 text-brand-gold flex items-center justify-center flex-shrink-0">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="text-[10px] text-brand-gold font-black uppercase tracking-widest mb-1">Email Inquiry</p>
                  <a href="mailto:gc@stryperinteriorandinfra.com" className="text-white hover:text-brand-gold transition-colors font-black text-sm">
                    gc@stryperinteriorandinfra.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Leadership Column */}
          <div className="space-y-8">
            <h3 className="text-white text-lg font-black uppercase tracking-widest italic">Leadership</h3>
            <div className="bg-white/5 border border-white/10 p-6 space-y-6">
              <div className="flex items-center gap-4">
                <div className="relative shrink-0">
                  <img
                    src={chairmanImg}
                    alt="Kartikey Niranjan"
                    className="w-14 h-14 rounded-full object-cover"
                    style={{ border: '2px solid #D4AF37' }}
                  />
                  <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-brand-gold flex items-center justify-center text-brand-navy">
                    <svg width="9" height="9" viewBox="0 0 10 10" fill="none"><path d="M5 1l1 2h2.2L6.6 4.4l.8 2.2L5 5.4 2.6 6.6l.8-2.2L1.8 3H4L5 1z" fill="currentColor"/></svg>
                  </span>
                </div>
                <div>
                  <p className="text-white font-black text-sm uppercase tracking-wider">Kartikey Niranjan</p>
                  <p className="text-brand-gold text-[10px] font-black uppercase tracking-widest mt-1">Chairman</p>
                  <p className="text-brand-cream/40 text-[9px] font-bold uppercase tracking-wider mt-0.5">Stryper Solution Pvt. Ltd.</p>
                </div>
              </div>

              <div className="border-t border-white/10 pt-4 space-y-2">
                {['HR Management', 'Business Operations', 'Workforce Management', 'Strategic Planning'].map((skill) => (
                  <div key={skill} className="flex items-center gap-2">
                    <span className="w-1 h-1 bg-brand-gold shrink-0" aria-hidden="true" />
                    <span className="text-[10px] text-brand-cream/60 font-bold uppercase tracking-wider">{skill}</span>
                  </div>
                ))}
              </div>

              <a
                href="https://www.linkedin.com/company/stryper-solution-pvt-ltd/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[10px] text-brand-cream/50 hover:text-brand-gold transition-colors font-bold uppercase tracking-wider"
              >
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0h.003z"/></svg>
                View LinkedIn Profile
              </a>
            </div>
          </div>
        </div>

        {/* Legal & Copyright */}
        <div className="pt-12 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-brand-cream/30 text-[10px] font-black uppercase tracking-[0.2em]">
            © {currentYear} Stryper Interior & Infra Solutions Private Limited
          </p>
          <div className="flex gap-10">
            <a href="#" className="text-brand-cream/30 hover:text-white text-[10px] font-black uppercase tracking-widest transition-colors">Privacy</a>
            <a href="#" className="text-brand-cream/30 hover:text-white text-[10px] font-black uppercase tracking-widest transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
