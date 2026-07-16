import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Menu, X, Phone, ChevronDown } from 'lucide-react'
import logo from '../assets/logo.png'
import { getSiteSettingsSync, getSiteSettings, getNotifications } from '../data/store'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [expandedMenu, setExpandedMenu] = useState(null)
  const [unreadCount, setUnreadCount] = useState(0)
  const [settings, setSettings] = useState(getSiteSettingsSync())
  
  const navigate = useNavigate()
  const location = useLocation()

  // Track unread notifications
  const updateNotifications = () => {
    const list = getNotifications()
    setUnreadCount(list.filter(n => !n.read).length)
  }

  useEffect(() => {
    updateNotifications()
    window.addEventListener('stryper_notifications_updated', updateNotifications)
    
    const loadSettings = async () => {
      const data = await getSiteSettings()
      if (data) {
        setSettings(data)
      }
    }
    loadSettings()

    const handleSettingsUpdate = () => {
      loadSettings()
    }
    window.addEventListener('stryper_settings_updated', handleSettingsUpdate)
    
    return () => {
      window.removeEventListener('stryper_notifications_updated', updateNotifications)
      window.removeEventListener('stryper_settings_updated', handleSettingsUpdate)
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Scroll to anchor on the same page or redirect and scroll
  useEffect(() => {
    const query = new URLSearchParams(location.search)
    const scrollTarget = query.get('scroll')
    if (scrollTarget && location.pathname === '/') {
      const timer = setTimeout(() => {
        const element = document.getElementById(scrollTarget)
        if (element) {
          const offset = 80
          const bodyRect = document.body.getBoundingClientRect().top
          const elementRect = element.getBoundingClientRect().top
          const elementPosition = elementRect - bodyRect
          const offsetPosition = elementPosition - offset
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
          
          // Clean search query after scrolling
          navigate('/', { replace: true })
        }
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [location, navigate])

  const handleNavClick = (e, href) => {
    if (href.startsWith('#')) {
      e.preventDefault()
      const targetId = href.substring(1)
      if (location.pathname === '/') {
        const element = document.getElementById(targetId)
        if (element) {
          const offset = 80
          const bodyRect = document.body.getBoundingClientRect().top
          const elementRect = element.getBoundingClientRect().top
          const elementPosition = elementRect - bodyRect
          const offsetPosition = elementPosition - offset
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
        }
      } else {
        navigate('/?scroll=' + targetId)
      }
      setIsOpen(false)
    }
  }

  const toggleMobileMenu = (menuName) => {
    if (expandedMenu === menuName) {
      setExpandedMenu(null)
    } else {
      setExpandedMenu(menuName)
    }
  }

  // Vittaazio-inspired luxury dropdown structures mapped to custom dynamic pages
  const menuData = [
    {
      name: 'Our Collections',
      href: '#',
      isMega: true,
      submenu: [
        {
          category: 'Residential',
          items: [
            { name: 'Luxury Wardrobes', slug: 'luxury-wardrobes' },
            { name: 'Modular Kitchens', slug: 'modular-kitchens' },
            { name: 'Vanity Solutions', slug: 'vanity-solutions' },
            { name: 'Wall Panels', slug: 'wall-panels' }
          ]
        },
        {
          category: 'Hospitality & Commercial',
          items: [
            { name: 'Hotel & Resorts Fit-Out', slug: 'hotel-resorts-fit-out' },
            { name: 'Office Workstations', slug: 'office-workstations' },
            { name: 'CEO & MD Tables', slug: 'ceo-md-tables' },
            { name: 'Retail Showrooms', slug: 'retail-showrooms' }
          ]
        },
        {
          category: 'Infrastructure & Fab',
          items: [
            { name: 'Industrial Sites', slug: 'industrial-sites' },
            { name: 'Fabrication & Metalwork', slug: 'fabrication-metalwork' },
            { name: 'Structural Planning', slug: 'structural-planning' },
            { name: 'Project Management', slug: 'project-management-detail' }
          ]
        }
      ]
    },
    {
      name: 'Our Story',
      href: '#',
      submenu: [
        { name: 'Our Vision', href: '#vision-mission' },
        { name: 'Design Ethos', href: '#about' },
        { name: 'Client Testimonials', slug: 'client-testimonials-detail' }
      ]
    },
    {
      name: 'Our Projects',
      href: '#',
      submenu: [
        { name: 'Residential Masterpieces', path: '/project-gallery?category=residential' },
        { name: 'Hospitality Projects', path: '/project-gallery?category=hospitality' },
        { name: 'Commercial Spaces', path: '/project-gallery?category=commercial' },
        { name: 'Project Gallery', path: '/project-gallery' }
      ]
    },
    {
      name: 'Inspiration',
      href: '#',
      submenu: [
        { name: 'Catalogue & Designs', slug: 'catalogue-designs' },
        { name: 'Custom Design Solutions', slug: 'custom-design-solutions-detail' },
        { name: 'Material Innovations', slug: 'material-innovations' }
      ]
    },
    {
      name: 'Blogs & Media',
      href: '#',
      submenu: [
        { name: 'Latest Blogs', path: '/blogs' },
        { name: 'Awards & Recognition', path: '/awards-recognition' }
      ]
    },
    {
      name: 'Contact Us',
      href: '#contact',
      submenu: [
        { name: 'Inquiry Form', slug: 'inquiry-form-detail' },
        { name: 'Work with Us', path: '/work-with-us' },
        { name: 'Admin Dashboard', path: '/admin', showBadge: true }
      ]
    }
  ]

  const isHomePage = location.pathname === '/'
  const showSolidNav = !isHomePage || isScrolled

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${showSolidNav ? 'bg-brand-teal/95 backdrop-blur-xl shadow-lg py-3 border-b border-white/5' : 'bg-transparent py-5 border-b border-transparent'}`}>
      {/* Centered container with max-width 1536px to give logo and links more breathing room */}
      <div className="max-w-[1536px] mx-auto w-full px-6 lg:px-12 flex justify-between items-center">
        <Link to="/" className="flex items-center group">
          <img 
            src={logo} 
            alt="Stryper Logo" 
            className={`w-auto object-contain transition-all duration-500 group-hover:scale-105 ${showSolidNav ? 'h-[36px] md:h-[40px]' : 'h-[46px] md:h-[52px]'}`}
          />
        </Link>

        {/* Desktop Nav - xl breakpoint prevents crowding on smaller monitors */}
        <div className="hidden xl:flex items-center gap-6 2xl:gap-8">
          <div className="flex items-center gap-4 2xl:gap-6">
            {menuData.map((menu) => (
              <div key={menu.name} className="relative group py-2">
                {menu.submenu ? (
                  <>
                    <button className="flex items-center gap-1 text-[10px] font-black text-brand-cream/85 hover:text-brand-gold transition-colors tracking-[0.18em] uppercase cursor-pointer">
                      {menu.name}
                      <ChevronDown size={10} className="text-brand-gold group-hover:rotate-180 transition-transform duration-300" />
                    </button>
                    
                    {menu.isMega ? (
                      /* Mega Menu for Collections */
                      <div className="absolute top-full left-0 hidden group-hover:grid grid-cols-3 gap-8 bg-brand-teal border border-brand-gold/10 p-8 w-[650px] shadow-2xl transition-all duration-300 backdrop-blur-xl">
                        {menu.submenu.map((sub, sIdx) => (
                          <div key={sIdx} className="space-y-4">
                            <h4 className="text-[10px] font-bold text-brand-gold tracking-[0.2em] uppercase border-b border-brand-gold/20 pb-2">
                              {sub.category}
                            </h4>
                            <ul className="space-y-2">
                              {sub.items.map((item, iIdx) => (
                                <li key={iIdx}>
                                  {item.path ? (
                                    <Link
                                      to={item.path}
                                      className="text-[11px] font-medium text-brand-cream/70 hover:text-brand-gold transition-colors block py-1"
                                    >
                                      {item.name}
                                    </Link>
                                  ) : item.slug ? (
                                    <Link
                                      to={`/page/${item.slug}`}
                                      className="text-[11px] font-medium text-brand-cream/70 hover:text-brand-gold transition-colors block py-1"
                                    >
                                      {item.name}
                                    </Link>
                                  ) : (
                                    <a
                                      href={item.href}
                                      onClick={(e) => handleNavClick(e, item.href)}
                                      className="text-[11px] font-medium text-brand-cream/70 hover:text-brand-gold transition-colors block py-1"
                                    >
                                      {item.name}
                                    </a>
                                  )}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    ) : (
                      /* Standard Dropdown - No gap to prevent mouse leave bug */
                      <div className="absolute top-full left-0 hidden group-hover:block bg-brand-teal border border-brand-gold/10 py-4 w-52 shadow-2xl transition-all duration-300 backdrop-blur-xl">
                        <ul className="space-y-1">
                          {menu.submenu.map((item, idx) => (
                            <li key={idx}>
                              {item.path ? (
                                <Link
                                  to={item.path}
                                  className="text-[11px] font-medium text-brand-cream/70 hover:text-brand-gold transition-colors flex items-center justify-between px-6 py-2 hover:bg-brand-navy"
                                >
                                  <span>{item.name}</span>
                                  {item.showBadge && unreadCount > 0 && (
                                    <span className="w-3.5 h-3.5 bg-brand-gold text-black rounded-full flex items-center justify-center text-[7px] font-black">{unreadCount}</span>
                                  )}
                                </Link>
                              ) : item.slug ? (
                                <Link
                                  to={`/page/${item.slug}`}
                                  className="text-[11px] font-medium text-brand-cream/70 hover:text-brand-gold transition-colors block px-6 py-2 hover:bg-brand-navy"
                                >
                                  {item.name}
                                </Link>
                              ) : (
                                <a
                                  href={item.href}
                                  onClick={(e) => handleNavClick(e, item.href)}
                                  className="text-[11px] font-medium text-brand-cream/70 hover:text-brand-gold transition-colors block px-6 py-2 hover:bg-brand-navy"
                                >
                                  {item.name}
                                </a>
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </>
                ) : (
                  <a
                    href={menu.href}
                    onClick={(e) => handleNavClick(e, menu.href)}
                    className="text-[10px] font-black text-brand-cream/85 hover:text-brand-gold transition-colors tracking-[0.18em] uppercase"
                  >
                    {menu.name}
                  </a>
                )}
              </div>
            ))}
          </div>
          
          <div className="h-6 w-px bg-white/10"></div>

          <div className="flex items-center gap-4 2xl:gap-6">
            <a href={`tel:${settings.phone}`} className="flex items-center gap-2 text-brand-cream hover:text-brand-gold transition-colors">
              <Phone size={14} className="text-brand-gold" />
              <span className="text-xs font-black tracking-widest uppercase">{settings.phone}</span>
            </a>
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="btn-gold !text-brand-gold hover:!text-black !py-3 !px-6 !text-[10px] tracking-widest shadow-none"
            >
              Book a Visit
            </a>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button className="xl:hidden text-brand-cream hover:text-brand-gold transition-colors" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="xl:hidden bg-brand-teal border-t border-white/10 absolute w-full left-0 top-full shadow-2xl max-h-[85vh] overflow-y-auto">
          <div className="flex flex-col p-8 gap-6">
            {menuData.map((menu) => (
              <div key={menu.name} className="w-full text-left">
                {menu.submenu ? (
                  <div>
                    <button
                      onClick={() => toggleMobileMenu(menu.name)}
                      className="flex justify-between items-center w-full text-xs font-black text-brand-cream hover:text-brand-gold transition-colors uppercase tracking-[0.2em] py-2"
                    >
                      <span>{menu.name}</span>
                      <ChevronDown size={14} className={`text-brand-gold transition-transform duration-300 ${expandedMenu === menu.name ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {expandedMenu === menu.name && (
                      <div className="pl-4 mt-2 border-l border-brand-gold/20 space-y-2 bg-brand-navy/30 py-2">
                        {menu.isMega ? (
                          menu.submenu.map((sub, sIdx) => (
                            <div key={sIdx} className="space-y-1 py-1">
                              <span className="text-[10px] font-bold text-brand-gold uppercase tracking-wider block opacity-80">{sub.category}</span>
                              {sub.items.map((item, iIdx) => (
                                <li key={iIdx}>
                                  {item.path ? (
                                    <Link
                                      to={item.path}
                                      onClick={() => setIsOpen(false)}
                                      className="text-[11px] text-brand-cream/70 hover:text-brand-gold flex items-center justify-between py-1 pl-2 pr-4"
                                    >
                                      <span>{item.name}</span>
                                      {item.showBadge && unreadCount > 0 && (
                                        <span className="w-3.5 h-3.5 bg-brand-gold text-black rounded-full flex items-center justify-center text-[7px] font-black">{unreadCount}</span>
                                      )}
                                    </Link>
                                  ) : item.slug ? (
                                    <Link
                                      to={`/page/${item.slug}`}
                                      onClick={() => setIsOpen(false)}
                                      className="text-[11px] text-brand-cream/70 hover:text-brand-gold block py-1 pl-2"
                                    >
                                      {item.name}
                                    </Link>
                                  ) : (
                                    <a
                                      href={item.href}
                                      onClick={(e) => { handleNavClick(e, item.href); setIsOpen(false); }}
                                      className="text-[11px] text-brand-cream/70 hover:text-brand-gold block py-1 pl-2"
                                    >
                                      {item.name}
                                    </a>
                                  )}
                                </li>
                              ))}
                            </div>
                          ))
                        ) : (
                          menu.submenu.map((item, idx) => (
                            <li key={idx} className="list-none">
                              {item.path ? (
                                <Link
                                  to={item.path}
                                  onClick={() => setIsOpen(false)}
                                  className="text-[11px] text-brand-cream/70 hover:text-brand-gold flex items-center justify-between py-1"
                                >
                                  <span>{item.name}</span>
                                  {item.showBadge && unreadCount > 0 && (
                                    <span className="w-3.5 h-3.5 bg-brand-gold text-black rounded-full flex items-center justify-center text-[7px] font-black">{unreadCount}</span>
                                  )}
                                </Link>
                              ) : item.slug ? (
                                <Link
                                  to={`/page/${item.slug}`}
                                  onClick={() => setIsOpen(false)}
                                  className="text-[11px] text-brand-cream/70 hover:text-brand-gold block py-1"
                                >
                                  {item.name}
                                </Link>
                              ) : (
                                <a
                                  href={item.href}
                                  onClick={(e) => { handleNavClick(e, item.href); setIsOpen(false); }}
                                  className="text-[11px] text-brand-cream/70 hover:text-brand-gold block py-1"
                                >
                                  {item.name}
                                </a>
                              )}
                            </li>
                          ))
                        )}
                      </div>
                    )}
                  </div>
                ) : (
                  <a
                    href={menu.href}
                    onClick={(e) => handleNavClick(e, menu.href)}
                    className="text-xs font-black text-brand-cream hover:text-brand-gold transition-colors uppercase tracking-[0.2em] block py-2"
                  >
                    {menu.name}
                  </a>
                )}
              </div>
            ))}
            
            <div className="h-px bg-white/10 w-full my-2"></div>
            
            <a href={`tel:${settings.phone}`} className="flex items-center justify-center gap-2 text-brand-cream hover:text-brand-gold transition-colors font-black text-xs uppercase tracking-widest py-2">
              <Phone size={16} className="text-brand-gold" />
              <span>{settings.phone}</span>
            </a>
            
            <a
              href="#contact"
              onClick={(e) => { handleNavClick(e, '#contact'); setIsOpen(false); }}
              className="btn-gold !text-brand-gold hover:!text-black py-4 text-center"
            >
              Book a Visit
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
