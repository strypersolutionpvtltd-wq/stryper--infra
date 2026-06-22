import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X, Phone } from 'lucide-react'
import logo from '../assets/logo.png'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'How it works', href: '#how-it-works' },
    { name: 'Our Services', href: '#services' },
    { name: 'Projects', href: '#projects' },
    { name: 'About', href: '#about' },
  ]

  const scrollToSection = (e, href) => {
    e.preventDefault()
    const element = document.querySelector(href)
    if (element) {
      const offset = 80
      const bodyRect = document.body.getBoundingClientRect().top
      const elementRect = element.getBoundingClientRect().top
      const elementPosition = elementRect - bodyRect
      const offsetPosition = elementPosition - offset
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
      setIsOpen(false)
    }
  }

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-brand-teal/95 backdrop-blur-xl shadow-lg py-1 border-b border-white/5' : 'bg-transparent py-4 border-b border-transparent'}`}>
      <div className="container-premium flex justify-between items-center">
        <Link to="/" className="flex items-center group">
          <img 
            src={logo} 
            alt="Stryper Logo" 
            className={`w-auto object-contain transition-all duration-500 group-hover:scale-105 ${isScrolled ? 'h-14 sm:h-16 md:h-18' : 'h-16 sm:h-20 md:h-24'}`}
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          <div className="flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="text-[10px] font-black text-brand-cream/80 hover:text-brand-gold transition-colors tracking-[0.25em] uppercase"
              >
                {link.name}
              </a>
            ))}
          </div>
          
          <div className="h-6 w-px bg-white/10"></div>

          <div className="flex items-center gap-6">
            <a href="tel:+919565310410" className="flex items-center gap-2 text-brand-cream hover:text-brand-gold transition-colors">
              <Phone size={14} className="text-brand-gold" />
              <span className="text-xs font-black tracking-widest uppercase">+91 9565310410</span>
            </a>
            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, '#contact')}
              className="btn-gold !py-3 !px-6 !text-[9px] shadow-none"
            >
              Get Estimate
            </a>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button className="lg:hidden text-brand-cream hover:text-brand-gold transition-colors" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-brand-teal border-t border-white/10 absolute w-full left-0 top-full shadow-2xl">
          <div className="flex flex-col p-8 gap-6 text-center">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="text-xs font-black text-brand-cream hover:text-brand-gold transition-colors uppercase tracking-[0.2em]"
              >
                {link.name}
              </a>
            ))}
            <a href="tel:+919565310410" className="flex items-center justify-center gap-2 text-brand-cream hover:text-brand-gold transition-colors font-black text-xs uppercase tracking-widest">
              <Phone size={16} className="text-brand-gold" />
              <span>+91 9565310410</span>
            </a>
            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, '#contact')}
              className="btn-gold py-4"
            >
              Get Free Estimate
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
