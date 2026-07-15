import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Send, CheckCircle2 } from 'lucide-react'
import { addInquiry, getSiteSettings, getSiteSettingsSync } from '../data/store'

const Contact = () => {
  const [settings, setSettings] = useState(getSiteSettingsSync())

  useEffect(() => {
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
    return () => window.removeEventListener('stryper_settings_updated', handleSettingsUpdate)
  }, [])

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: 'Full Home Interior',
    message: ''
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    addInquiry({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      service: formData.service,
      message: formData.message || 'Client initiated a direct consultation query.'
    })
    setIsSubmitted(true)
    setFormData({
      name: '',
      phone: '',
      email: '',
      service: 'Full Home Interior',
      message: ''
    })
    setTimeout(() => setIsSubmitted(false), 5000)
  }

  return (
    <section id="contact" className="py-24 bg-[#F2EDE4] relative overflow-hidden border-t border-black/5">
      {/* Technical Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.15]" style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,1) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      <div className="absolute top-0 right-0 text-[15rem] font-black text-black/[0.02] -mr-20 -mt-20 select-none uppercase pointer-events-none">Get in Touch</div>

      <div className="container-premium relative z-10">
        <div className="grid lg:grid-cols-12 gap-16 items-start">
          {/* Left: Contact Info */}
          <div className="lg:col-span-5 space-y-12">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <span className="h-px w-12 bg-brand-gold"></span>
                <span className="text-[10px] font-black text-brand-gold uppercase tracking-[0.4em]">Inquiry Hub</span>
              </div>
              <h2 className="text-black italic font-black text-5xl md:text-6xl mb-8 leading-tight">Ready to <span className="text-brand-gold not-italic">transform</span> your vision?</h2>
              <p className="text-black/70 text-lg leading-relaxed font-medium italic">
                "Book a private consultation with our principal designers. We specialize in turning complex infrastructure and luxury interior requirements into seamless executions."
              </p>
            </div>

            <div className="space-y-8 bg-white/40 p-10 border border-black/5 backdrop-blur-sm">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-black text-brand-gold flex items-center justify-center shadow-xl">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="text-brand-gold font-black uppercase tracking-widest text-[10px] mb-1">Direct Line</h4>
                  <a href={`tel:${settings.phone}`} className="text-2xl font-black text-black hover:text-brand-gold transition-colors">{settings.phone}</a>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-black text-brand-gold flex items-center justify-center shadow-xl">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="text-brand-gold font-black uppercase tracking-widest text-[10px] mb-1">Official Email</h4>
                  <a href={`mailto:${settings.email}`} className="text-xl font-black text-black hover:text-brand-gold transition-colors">{settings.email}</a>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-black text-brand-gold flex items-center justify-center shadow-xl">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="text-brand-gold font-black uppercase tracking-widest text-[10px] mb-1">Presence</h4>
                  <p className="text-lg font-black text-black">{settings.address}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Technical Form */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-black p-6 sm:p-10 md:p-16 relative shadow-2xl overflow-hidden"
            >
              {/* Form Corner Accents */}
              <div className="absolute top-0 right-0 w-10 h-10 sm:w-16 sm:h-16 border-t-4 border-r-4 border-brand-gold m-4 sm:m-8 pointer-events-none"></div>
              
              {isSubmitted ? (
                <div className="py-20 text-center relative z-10">
                  <div className="w-20 h-20 bg-brand-gold text-black flex items-center justify-center mx-auto mb-8 rotate-12">
                    <CheckCircle2 size={40} />
                  </div>
                  <h3 className="text-3xl font-black text-white mb-4 uppercase italic tracking-tighter">Request Received.</h3>
                  <p className="text-brand-gold font-bold text-sm tracking-widest uppercase">Our team will reach out within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-10 relative z-10">
                  <div className="space-y-2">
                    <h3 className="text-4xl font-black text-white italic tracking-tighter">Project <span className="text-brand-gold not-italic">Brief.</span></h3>
                    <p className="text-[10px] font-black text-brand-gold uppercase tracking-[0.4em] opacity-60">Submit your site details</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-10">
                    <div className="group">
                      <label className="text-[10px] font-black text-brand-gold uppercase tracking-widest mb-2 block opacity-80 group-focus-within:opacity-100 transition-opacity">Client Name</label>
                      <input 
                        type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Yashika Kanwar" 
                        className="w-full px-0 py-3 bg-transparent border-b border-white/20 focus:border-brand-gold transition-all outline-none font-bold text-white placeholder:text-white/50"
                      />
                    </div>
                    <div className="group">
                      <label className="text-[10px] font-black text-brand-gold uppercase tracking-widest mb-2 block opacity-80 group-focus-within:opacity-100 transition-opacity">Contact Number</label>
                      <input 
                        type="tel" 
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder="+91 00000 00000" 
                        className="w-full px-0 py-3 bg-transparent border-b border-white/20 focus:border-brand-gold transition-all outline-none font-bold text-white placeholder:text-white/50"
                      />
                    </div>
                  </div>

                  <div className="group">
                    <label className="text-[10px] font-black text-brand-gold uppercase tracking-widest mb-2 block opacity-80 group-focus-within:opacity-100 transition-opacity">Email Address</label>
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="client@project.com" 
                      className="w-full px-0 py-3 bg-transparent border-b border-white/20 focus:border-brand-gold transition-all outline-none font-bold text-white placeholder:text-white/50"
                    />
                  </div>

                  <div className="group">
                    <label className="text-[10px] font-black text-brand-gold uppercase tracking-widest mb-2 block opacity-80 group-focus-within:opacity-100 transition-opacity">Service Required</label>
                    <select 
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full px-0 py-3 bg-transparent border-b border-white/20 focus:border-brand-gold transition-all outline-none font-bold text-white cursor-pointer"
                    >
                      <option className="bg-black" value="Full Home Interior">Full Home Interior</option>
                      <option className="bg-black" value="Infrastructure Solution">Infrastructure Solution</option>
                      <option className="bg-black" value="Architectural Planning">Architectural Planning</option>
                      <option className="bg-black" value="Commercial Fit-out">Commercial Fit-out</option>
                      <option className="bg-black" value="Industrial Fabrication">Industrial Fabrication</option>
                    </select>
                  </div>

                  <div className="group">
                    <label className="text-[10px] font-black text-brand-gold uppercase tracking-widest mb-2 block opacity-80 group-focus-within:opacity-100 transition-opacity">Message / Scope</label>
                    <textarea 
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Describe your project scope..."
                      rows="2"
                      className="w-full px-0 py-3 bg-transparent border-b border-white/20 focus:border-brand-gold transition-all outline-none font-bold text-white placeholder:text-white/50 resize-none"
                    />
                  </div>

                  <button 
                    type="submit" 
                    className="w-full bg-brand-gold text-black font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-xs md:text-sm py-4 md:py-6 shadow-2xl hover:bg-white transition-colors flex items-center justify-center gap-4 cursor-pointer"
                  >
                    Initiate Consultation <Send size={18} />
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
