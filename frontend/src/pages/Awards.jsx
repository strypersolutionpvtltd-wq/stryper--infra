import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowLeft, Award, ShieldCheck, Trophy, Sparkles, Star } from 'lucide-react'

const Awards = () => {
  const honorLog = [
    {
      year: '2026',
      title: 'Jaipur Architecture & Design Honors',
      award: 'Winner: Best Modular Interior Execution',
      description: 'Awarded for technical precision, ergonomics, and seamless design execution in the Modular Kitchens and Wardrobes segment across residential estates in Jaipur.',
      icon: Trophy
    },
    {
      year: '2025',
      title: 'National Infrastructure Safety Awards',
      award: 'Winner: Safety First PMC Operations',
      description: 'Recognized for executing zero-defect pre-engineered structural steel log sheds and industrial plant fit-outs in Neemrana and Jodhpur zones.',
      icon: ShieldCheck
    },
    {
      year: '2024',
      title: 'Regional MSME Business Excellence Awards',
      award: 'Honorable Mention: Quality & Technical Erection',
      description: 'Commended for innovation in precision fabrication, SS partition profiles, and customized structural layout planning.',
      icon: Sparkles
    }
  ]

  const certifications = [
    { title: 'ISO 9001:2015 Certified', desc: 'Complies with international quality management systems for civil planning, interior joinery manufacturing, and site execution.' },
    { title: 'ASME Section IX Standard', desc: 'Welding and structural metal fabrication compliance, audited annually by leading structural planning organizations.' },
    { title: '120-Point Quality PMC Audit', desc: 'Proprietary project management checklist implemented at all industrial, commercial, and residential sites.' }
  ]

  return (
    <div className="bg-[#F2EDE4] min-h-screen pt-32 pb-24 font-roboto text-brand-teal">
      {/* Technical Grid Pattern */}
      <div className="fixed inset-0 opacity-[0.06] pointer-events-none z-0" style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,1) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

      <div className="container-premium relative z-10">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-black/50 hover:text-black transition-colors font-black uppercase tracking-widest text-[10px] mb-12"
        >
          <ArrowLeft size={14} /> Back to Hub
        </Link>

        {/* Header */}
        <div className="text-center mb-20 max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="h-px w-12 bg-brand-gold"></span>
            <span className="text-[10px] font-black text-brand-gold uppercase tracking-[0.4em]">Honors & Credentials</span>
            <span className="h-px w-12 bg-brand-gold"></span>
          </div>
          <h1 className="text-black font-black text-4xl md:text-6xl mb-6 uppercase tracking-wider italic">
            Awards & <span className="text-brand-gold not-italic">Recognition</span>
          </h1>
          <p className="text-black/60 text-sm md:text-base font-medium leading-relaxed">
            Celebrating technical milestones, safety accolades, and quality excellence achieved by Stryper since 2023.
          </p>
        </div>

        {/* Awards timeline grid */}
        <div className="space-y-12 max-w-4xl mx-auto mb-24">
          {honorLog.map((item, index) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group bg-white p-8 sm:p-10 border border-black/5 hover:border-brand-gold/30 transition-all duration-500 shadow-lg flex flex-col md:flex-row gap-8 items-start relative overflow-hidden"
              >
                {/* Year Marker */}
                <div className="flex items-center gap-4 md:flex-col md:items-start shrink-0">
                  <span className="text-4xl md:text-5xl font-black text-brand-gold font-serif leading-none">{item.year}</span>
                  <div className="w-10 h-10 bg-black text-brand-gold flex items-center justify-center rotate-6 group-hover:rotate-12 transition-transform shadow-md">
                    <Icon size={18} />
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-3 flex-1">
                  <h3 className="text-black font-black text-xs uppercase tracking-widest text-brand-champagne">{item.title}</h3>
                  <h4 className="text-black font-serif italic text-lg sm:text-xl font-bold leading-tight uppercase">
                    {item.award}
                  </h4>
                  <p className="text-black/70 text-xs sm:text-sm leading-relaxed font-medium">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Certifications & standards */}
        <div className="border-t border-black/10 pt-20">
          <div className="text-center mb-16">
            <h2 className="text-black font-black text-3xl uppercase tracking-wider font-serif">Technical Certifications</h2>
            <p className="text-black/50 text-[10px] font-black tracking-widest uppercase mt-1">Sustaining quality compliance at every site</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-8 border border-black/5 shadow-md flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="w-8 h-8 rounded-full bg-brand-gold/10 text-brand-gold flex items-center justify-center">
                    <Award size={16} />
                  </div>
                  <h3 className="text-black font-black text-sm uppercase tracking-wider">{cert.title}</h3>
                  <p className="text-black/60 text-xs leading-relaxed font-medium">
                    {cert.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}

export default Awards
