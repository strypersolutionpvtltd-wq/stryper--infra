import React from 'react'
import { motion } from 'framer-motion'

const Clients = () => {
  const clients = [
    { name: 'Taj Devi Ratn', logo: 'TD', color: '#8B0000' }, // Deep Red
    { name: 'JW Marriott Bangalore', logo: 'JW', color: '#002D62' }, // Navy Blue
    { name: 'Marriott Vashi', logo: 'MV', color: '#1B4D3E' }, // Emerald Green
    { name: 'Nirala Crystal Banquet', logo: 'NC', color: '#C5B358' }, // Gold
    { name: 'Express Inn Hotel Nasik', logo: 'EI', color: '#702963' }, // Byzantium
    { name: 'Taj Alibaug Resort & Spa', logo: 'TA', color: '#E49B0F' }, // Ochre
  ]

  // Duplicate for seamless scroll
  const duplicatedClients = [...clients, ...clients]

  return (
    <section id="clients" className="py-24 bg-[#F5F2EA] overflow-hidden border-y border-black/5 backdrop-blur-sm">
      <div className="container-premium mb-16 text-center">
        <h3 className="text-brand-teal text-xl font-black uppercase tracking-[0.4em] italic opacity-60">Trusted by Global Hospitality Brands</h3>
      </div>
      
      <div className="flex relative">
        <motion.div 
          animate={{ x: [0, -1000] }}
          transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
          className="flex gap-20 items-center whitespace-nowrap"
        >
          {duplicatedClients.map((client, index) => (
            <div key={index} className="flex items-center gap-6 group transition-all duration-500 hover:scale-105">
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center text-white font-black text-xl italic shadow-lg transition-transform group-hover:rotate-12"
                style={{ backgroundColor: client.color }}
              >
                {client.logo}
              </div>
              <span className="text-2xl font-black text-brand-teal uppercase tracking-tighter italic opacity-40 group-hover:opacity-100 transition-opacity">{client.name}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Clients
