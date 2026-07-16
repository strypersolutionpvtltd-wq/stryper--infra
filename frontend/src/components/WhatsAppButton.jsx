import React, { useState, useEffect } from 'react'
import { MessageCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import { getSiteSettingsSync, getSiteSettings } from '../data/store'

const WhatsAppButton = () => {
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

  const whatsappNum = settings?.whatsapp || '918448590303'
  const rawPhone = String(whatsappNum).replace(/[^0-9]/g, '')
  const phoneNumber = rawPhone.length === 10 ? `91${rawPhone}` : rawPhone
  const message = encodeURIComponent('Hi! I would like to know more about your interior and infrastructure services.')
  
  return (
    <motion.a
      href={`https://wa.me/${phoneNumber}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#20ba5a] text-white w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-colors group"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <MessageCircle size={28} className="animate-pulse" />
      <span className="absolute right-16 bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
        Chat with us
      </span>
    </motion.a>
  )
}

export default WhatsAppButton
