import React from 'react'
import { MessageCircle } from 'lucide-react'
import { motion } from 'framer-motion'

const WHATSAPP_NUMBER = '918448590303'

const WhatsAppButton = () => {
  const message = encodeURIComponent('Hi! I would like to know more about your interior and infrastructure services.')
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`

  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-2xl flex items-center justify-center"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.5, type: 'spring', stiffness: 200 }}
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Chat on WhatsApp"
    >
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
      >
        <MessageCircle size={26} />
      </motion.div>
    </motion.a>
  )
}

export default WhatsAppButton
