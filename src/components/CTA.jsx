import React from 'react'
import { motion } from 'framer-motion'
import { Phone, ArrowRight } from 'lucide-react'

const CTA = () => {
  const scrollToContact = () => {
    const element = document.querySelector('#contact')
    if (element) {
      const offset = 80
      const bodyRect = document.body.getBoundingClientRect().top
      const elementRect = element.getBoundingClientRect().top
      const elementPosition = elementRect - bodyRect
      const offsetPosition = elementPosition - offset
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
    }
  }

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/90 to-secondary/90 z-10"></div>
        <img
          src="https://images.unsplash.com/photo-1600607687644-c7171b42498f?q=80&w=2574&auto=format&fit=crop"
          alt="Luxury Interior"
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 w-32 h-32 border-2 border-gold/30 rounded-full animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-40 h-40 border-2 border-gold/20 rounded-full animate-pulse delay-75"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          {/* Main Heading */}
          <h2 className="text-4xl md:text-6xl font-montserrat font-bold text-white mb-6 leading-tight">
            Ready To Transform
            <br />
            <span className="text-gradient-gold">Your Space?</span>
          </h2>

          {/* Subtext */}
          <p className="text-lg md:text-xl text-textGray max-w-3xl mx-auto mb-10 leading-relaxed">
            Let's bring your vision to life with our expert design and execution services. 
            Get a free consultation today!
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToContact}
              className="bg-gold hover:bg-gold-light text-primary px-6 py-3 md:px-10 md:py-5 rounded-md font-bold text-sm md:text-lg transition-colors flex items-center gap-3 shadow-2xl group"
            >
              Book Consultation
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
            </motion.button>

            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="tel:+919565310410"
              className="border-2 border-gold text-gold hover:bg-gold hover:text-primary px-6 py-3 md:px-10 md:py-5 rounded-md font-bold text-sm md:text-lg transition-colors flex items-center gap-3 shadow-2xl"
            >
              <Phone size={20} />
              Call Now
            </motion.a>
          </div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-12 glass rounded-xl p-6 inline-block"
          >
            <p className="text-textGray mb-2">
              Call us directly at
            </p>
            <a href="tel:+919565310410" className="text-gold font-bold text-2xl font-montserrat hover:text-gold-light transition-colors">
              +91 9565310410
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default CTA
