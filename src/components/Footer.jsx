import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.png'
import { Phone, Mail, MapPin } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (!email) {
      setError('Please enter email id')
    } else {
      setError('')
      alert('Subscription successful!')
      setEmail('')
    }
  }

  return (
    <footer className="bg-brand-navy text-white pt-20 pb-8 border-t border-white/5 relative overflow-hidden font-roboto">
      
      {/* Footer Top Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 pb-16 border-b border-white/10 relative z-10">
        
        {/* Column 1: About Us */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 mb-6">
            <img src={logo} alt="Stryper" className="h-8 w-auto object-contain" />
            <h2 className="text-xl font-black tracking-tight text-white uppercase italic font-serif">Stryper</h2>
          </div>
          <h3 className="text-xs font-black tracking-[0.2em] uppercase text-brand-gold">About us</h3>
          <p className="text-white/60 text-sm leading-relaxed text-justify-organic">
            Stryper has been exhibiting an unparalleled passion, modernity, and innovation in the arena of modular furniture, premium interiors, and high-end infrastructure since 2023. Headquartered in Jaipur, we deliver pan-India.
          </p>
          <a href="#about" className="text-brand-gold hover:text-white text-xs font-bold uppercase tracking-wider block pt-2">
            read more
          </a>
        </div>

        {/* Column 2: Subscription Form */}
        <div className="space-y-4">
          <h3 className="text-xs font-black tracking-[0.2em] uppercase text-brand-gold mb-6">
            Subscribe to keep updated
          </h3>
          <form onSubmit={handleSubscribe} className="space-y-3">
            <div className="flex items-center border border-white/20 bg-black/40 px-3 py-1 rounded-none">
              <input 
                type="email" 
                placeholder="your e-mail address" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent border-none text-white text-sm py-2 focus:outline-none"
              />
              <button 
                type="submit"
                className="bg-brand-gold text-black font-black text-xs tracking-wider px-4 py-2 hover:bg-white hover:text-black transition-colors"
              >
                SUBSCRIBE
              </button>
            </div>
            {error && <span className="text-red-400 text-xs block">{error}</span>}
          </form>
        </div>

        {/* Column 3: Get in Touch & Socials */}
        <div className="space-y-4">
          <h3 className="text-xs font-black tracking-[0.2em] uppercase text-brand-gold mb-6">
            Get in Touch
          </h3>
          <div className="space-y-3 text-sm text-white/70">
            <p className="flex items-center gap-3">
              <Phone size={14} className="text-brand-gold" />
              <a href="tel:+919565310410" className="hover:text-brand-gold">+91 9565310410</a>
            </p>
            <p className="flex items-center gap-3">
              <Mail size={14} className="text-brand-gold" />
              <a href="mailto:gc@stryperinteriorandinfra.com" className="hover:text-brand-gold">gc@stryperinteriorandinfra.com</a>
            </p>
            <p className="flex items-start gap-3">
              <MapPin size={14} className="text-brand-gold mt-1 shrink-0" />
              <span>Jaipur, Rajasthan, India</span>
            </p>
          </div>

          <div className="flex gap-3 pt-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-white hover:bg-brand-gold hover:text-black transition-all">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/>
              </svg>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-white hover:bg-brand-gold hover:text-black transition-all">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-white hover:bg-brand-gold hover:text-black transition-all">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.163a3.003 3.003 0 00-2.11-2.108C19.518 3.5 12 3.5 12 3.5s-7.518 0-9.388.555A3.003 3.003 0 00.5 6.163C0 8.033 0 12 0 12s0 3.967.5 5.837a3.003 3.003 0 002.11 2.108c1.87.555 9.388.555 9.388.555s7.518 0 9.388-.555a3.003 3.003 0 002.11-2.108c.5-1.87.5-5.837.5-5.837s0-3.967-.5-5.837zm-14.249 9.39V8.448L15.47 12l-6.22 3.555z"/>
              </svg>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-white hover:bg-brand-gold hover:text-black transition-all">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.23 0H1.77C.8 0 0 .77 0 1.72v20.56C0 23.23.8 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.2 0 22.23 0zM7.12 20.45H3.56V9h3.56v11.45zM5.34 7.58c-1.14 0-2.06-.92-2.06-2.06 0-1.14.92-2.06 2.06-2.06 1.14 0 2.06.92 2.06 2.06 0 1.14-.92 2.06-2.06 2.06zm15.11 12.87h-3.56v-5.6c0-1.34-.03-3.05-1.86-3.05-1.86 0-2.14 1.45-2.14 2.95v5.7h-3.56V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29z"/>
              </svg>
            </a>
          </div>
        </div>

      </div>

      {/* Footer Bottom Row */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
        <div className="flex flex-wrap gap-6 text-xs text-white/40">
          <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
          <a href="#" className="hover:text-white transition-colors">Legal notice</a>
          <a href="#" className="hover:text-white transition-colors">Privacy policy</a>
          <a href="#" className="hover:text-white transition-colors">FAQs</a>
          <a href="#" className="hover:text-white transition-colors">Sitemap</a>
          <a href="#" className="hover:text-white transition-colors">Terms & Conditions</a>
        </div>
        <p className="text-xs text-white/30 tracking-[0.1em]">
          &copy; Stryper {currentYear}
        </p>
      </div>

    </footer>
  )
}

export default Footer
