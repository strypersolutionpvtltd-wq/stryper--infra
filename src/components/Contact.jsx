import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Send, CheckCircle2 } from 'lucide-react'

const Contact = () => {
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitted(true)
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
                  <a href="tel:+919565310410" className="text-2xl font-black text-black hover:text-brand-gold transition-colors">+91 9565310410</a>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-black text-brand-gold flex items-center justify-center shadow-xl">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="text-brand-gold font-black uppercase tracking-widest text-[10px] mb-1">Official Email</h4>
                  <a href="mailto:gc@stryperinteriorandinfra.com" className="text-xl font-black text-black hover:text-brand-gold transition-colors">gc@stryperinteriorandinfra.com</a>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-black text-brand-gold flex items-center justify-center shadow-xl">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="text-brand-gold font-black uppercase tracking-widest text-[10px] mb-1">Presence</h4>
                  <p className="text-lg font-black text-black">Headquartered in Jaipur | Pan-India Capability</p>
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
              className="bg-black p-12 md:p-16 relative shadow-2xl overflow-hidden"
            >
              {/* Form Corner Accents */}
              <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-brand-gold m-8"></div>
              
              {isSubmitted ? (
                <div className="py-20 text-center relative z-10">
                  <div className="w-20 h-20 bg-brand-gold text-black flex items-center justify-center mx-auto mb-8 rotate-12">
                    <CheckCircle2 size={40} />
                  </div>
                  <h3 className="text-3xl font-black text-white mb-4 uppercase italic tracking-tighter">Request Received.</h3>
                  <p className="text-brand-gold font-bold text-sm tracking-widest uppercase">Our team will reach out within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-10 relative z-10">
                  <div className="space-y-2">
                    <h3 className="text-4xl font-black text-white italic tracking-tighter">Project <span className="text-brand-gold not-italic">Brief.</span></h3>
                    <p className="text-[10px] font-black text-brand-gold uppercase tracking-[0.4em] opacity-60">Submit your site details</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-10">
                    <div className="group">
                      <label className="text-[10px] font-black text-brand-gold uppercase tracking-widest mb-2 block opacity-80 group-focus-within:opacity-100 transition-opacity">Client Name</label>
                      <input 
                        type="text" 
                        required
                        placeholder="Yashika Kanwar" 
                        className="w-full px-0 py-3 bg-transparent border-b border-white/20 focus:border-brand-gold transition-all outline-none font-bold text-white placeholder:text-white/50"
                      />
                    </div>
                    <div className="group">
                      <label className="text-[10px] font-black text-brand-gold uppercase tracking-widest mb-2 block opacity-80 group-focus-within:opacity-100 transition-opacity">Contact Number</label>
                      <input 
                        type="tel" 
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
                      required
                      placeholder="client@project.com" 
                      className="w-full px-0 py-3 bg-transparent border-b border-white/20 focus:border-brand-gold transition-all outline-none font-bold text-white placeholder:text-white/50"
                    />
                  </div>

                  <div className="group">
                    <label className="text-[10px] font-black text-brand-gold uppercase tracking-widest mb-2 block opacity-80 group-focus-within:opacity-100 transition-opacity">Service Required</label>
                    <select className="w-full px-0 py-3 bg-transparent border-b border-white/20 focus:border-brand-gold transition-all outline-none font-bold text-white appearance-none cursor-pointer">
                      <option className="bg-black">Full Home Interior</option>
                      <option className="bg-black">Infrastructure Solution</option>
                      <option className="bg-black">Architectural Planning</option>
                      <option className="bg-black">Commercial Fit-out</option>
                      <option className="bg-black">Industrial Fabrication</option>
                    </select>
                  </div>

                  <button 
                    type="submit" 
                    className="w-full bg-brand-gold text-black font-black uppercase tracking-[0.3em] py-6 shadow-2xl hover:bg-white transition-colors flex items-center justify-center gap-4"
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
