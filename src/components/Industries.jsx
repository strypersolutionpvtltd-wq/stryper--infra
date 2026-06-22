import React from 'react'
import { motion } from 'framer-motion'
import { Building, Home, Store, Hotel, Factory, Warehouse } from 'lucide-react'

const Industries = () => {
  const industries = [
    {
      icon: Building,
      title: 'Corporate Offices',
      description: 'Modern workspace solutions for IT companies and corporate environments'
    },
    {
      icon: Home,
      title: 'Real Estate',
      description: 'Premium residential projects and real estate developments'
    },
    {
      icon: Store,
      title: 'Retail',
      description: 'Innovative retail spaces and commercial showrooms'
    },
    {
      icon: Hotel,
      title: 'Hospitality',
      description: 'Luxury hotels, resorts, and hospitality infrastructure'
    },
    {
      icon: Factory,
      title: 'Industrial',
      description: 'Industrial facilities and manufacturing units'
    },
    {
      icon: Warehouse,
      title: 'Manufacturing',
      description: 'Warehouse and logistics infrastructure solutions'
    }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-montserrat font-bold text-brand-dark mb-4">
            Industries <span className="text-gradient-gold">We Serve</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-gold to-brand-purple mx-auto mb-6"></div>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            We deliver tailored interior and infrastructure solutions across a diverse range of industries
          </p>
        </motion.div>

        {/* Industries Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {industries.map((industry, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="relative group"
            >
              <div className="bg-brand-dark rounded-2xl p-10 h-full text-center overflow-hidden border border-white/5 group-hover:border-gold/30 transition-all duration-500 shadow-2xl">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-brand-purple rounded-full transform translate-x-16 -translate-y-16 blur-3xl"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-gold rounded-full transform -translate-x-12 translate-y-12 blur-3xl"></div>
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <div className="w-20 h-20 bg-gradient-to-br from-brand-purple/20 to-brand-magenta/20 rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-xl border border-white/5">
                    <industry.icon className="text-gold" size={36} />
                  </div>
                  <h3 className="text-2xl font-montserrat font-black text-white mb-4 group-hover:text-gold transition-colors">
                    {industry.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">
                    {industry.description}
                  </p>
                </div>

                {/* Bottom Accent */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-gold to-brand-purple transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 bg-gold/10 rounded-2xl p-8 text-center"
        >
          <h3 className="text-2xl font-montserrat font-bold text-primary mb-2">
            10+ Industries Served
          </h3>
          <p className="text-gray-700">
            With precision, innovation, and end-to-end project excellence
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default Industries
