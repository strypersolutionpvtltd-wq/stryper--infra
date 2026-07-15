import React from 'react'
import { motion } from 'framer-motion'
import { Lightbulb, Layers } from 'lucide-react'

const BrandPartners = () => {
  const partners = [
    {
      name: 'Mirzapur Qaleen',
      description: 'Premium handcrafted carpets and rugs, delivering artisanal quality and timeless elegance for luxury interiors.',
      icon: Layers,
      color: 'from-brand-purple to-brand-magenta'
    },
    {
      name: 'Phoenix Lighting',
      description: 'Innovative lighting solutions designed to enhance ambiance, energy efficiency, and architectural aesthetics.',
      icon: Lightbulb,
      color: 'from-gold to-gold-light'
    },
    {
      name: 'Mirzapur Kaleen & Rugs',
      description: 'Bespoke rugs and floor coverings with rich heritage craftsmanship, tailored for residential and commercial spaces.',
      icon: Layers,
      color: 'from-brand-purple to-gold'
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
            Our Brand <span className="text-gradient-gold">Partners</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-gold to-brand-purple mx-auto mb-6"></div>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Collaborating with industry leaders to deliver exceptional quality
          </p>
        </motion.div>

        {/* Partners Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {partners.map((partner, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group relative"
            >
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 h-full shadow-lg hover:shadow-2xl transition-all border border-gray-100 overflow-hidden">
                {/* Background Decoration */}
                <div className={`absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br ${partner.color} opacity-10 rounded-full group-hover:scale-150 transition-transform duration-500`}></div>
                
                {/* Icon */}
                <div className={`w-16 h-16 bg-gradient-to-br ${partner.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform relative z-10`}>
                  <partner.icon className="text-white" size={28} />
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-2xl font-montserrat font-bold text-primary mb-4 group-hover:text-gold transition-colors">
                    {partner.name}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {partner.description}
                  </p>
                </div>

                {/* Bottom Accent */}
                <div className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r ${partner.color} transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left`}></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Partnership Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 bg-gradient-to-r from-brand-dark to-brand-purple rounded-2xl p-10 text-center shadow-2xl border border-white/5"
        >
          <h3 className="text-2xl font-montserrat font-bold text-white mb-4">
            Premium Quality Through Trusted Partnerships
          </h3>
          <p className="text-gray-400 max-w-3xl mx-auto italic">
            We collaborate with the finest brands in the industry to ensure every project 
            receives materials and solutions of uncompromising quality and excellence.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default BrandPartners
