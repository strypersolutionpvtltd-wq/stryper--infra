import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Send, Upload, FileText, CheckCircle2, Link as LinkIcon, User, Mail, Phone, Briefcase } from 'lucide-react'
import { Link } from 'react-router-dom'
import { addCareer } from '../data/store'

const Careers = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: 'Senior Architect',
    experience: '',
    portfolio: '',
    message: ''
  })
  const [resume, setResume] = useState(null) // Stores { name, size, data }
  const [isDragActive, setIsDragActive] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [fileError, setFileError] = useState('')
  const fileInputRef = useRef(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // Handle file reading
  const processFile = (file) => {
    if (!file) return

    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
    if (!allowedTypes.includes(file.type)) {
      setFileError('Invalid file type. Please upload a PDF, DOC, or DOCX file.')
      setResume(null)
      return
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      setFileError('File too large. Max size is 5MB.')
      setResume(null)
      return
    }

    setFileError('')
    const reader = new FileReader()
    reader.onload = (event) => {
      setResume({
        name: file.name,
        size: (file.size / 1024).toFixed(1) + ' KB',
        data: event.target.result // Base64 string
      })
    }
    reader.readAsDataURL(file)
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    processFile(file)
  }

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragActive(true)
    } else if (e.type === 'dragleave') {
      setIsDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0])
    }
  }

  const removeResume = () => {
    setResume(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!resume) {
      setFileError('Please upload your resume to submit your application.')
      return
    }

    addCareer({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      position: formData.position,
      experience: formData.experience + ' Years',
      portfolio: formData.portfolio || 'Not Provided',
      resumeName: resume.name,
      resumeData: resume.data,
      message: formData.message || 'Applicant submitted resume via Careers portal.'
    })

    setIsSubmitted(true)
    setFormData({
      name: '',
      email: '',
      phone: '',
      position: 'Senior Architect',
      experience: '',
      portfolio: '',
      message: ''
    })
    setResume(null)
    setTimeout(() => setIsSubmitted(false), 5000)
  }

  const positions = [
    'Senior Architect',
    'Site Supervisor',
    'Structural Engineer',
    'Client Coordinator',
    'Interior Designer',
    '3D Visualizer / Drafter',
    'PMC Operations Lead',
    'Executive Intern'
  ]

  return (
    <div className="bg-[#F2EDE4] min-h-screen pt-32 pb-24 font-roboto">
      {/* Technical Grid Pattern */}
      <div className="fixed inset-0 opacity-[0.08] pointer-events-none z-0" style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,1) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

      <div className="container-premium relative z-10 max-w-4xl mx-auto">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-black/50 hover:text-black transition-colors font-black uppercase tracking-widest text-[10px] mb-8"
        >
          <ArrowLeft size={14} /> Back to Hub
        </Link>

        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="h-px w-12 bg-brand-gold"></span>
            <span className="text-[10px] font-black text-brand-gold uppercase tracking-[0.4em]">Work With Us</span>
            <span className="h-px w-12 bg-brand-gold"></span>
          </div>
          <h1 className="text-black font-black text-4xl md:text-6xl mb-6 uppercase tracking-wider italic">
            Join the <span className="text-brand-gold not-italic">Stryper</span> Team
          </h1>
          <p className="text-black/60 text-base md:text-lg max-w-xl mx-auto font-medium leading-relaxed">
            We are looking for elite architects, site supervisors, and structural engineers to execute luxury sites and pre-engineered marvels across India.
          </p>
        </div>

        <div className="bg-black p-6 sm:p-10 md:p-16 relative shadow-2xl overflow-hidden border border-white/5">
          {/* Decorative corners */}
          <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-brand-gold m-8"></div>
          <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-brand-gold m-8"></div>

          {isSubmitted ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-20 text-center relative z-10"
            >
              <div className="w-20 h-20 bg-brand-gold text-black flex items-center justify-center mx-auto mb-8 rotate-12">
                <CheckCircle2 size={40} />
              </div>
              <h3 className="text-3xl font-black text-white mb-4 uppercase italic tracking-tighter">Application Logged.</h3>
              <p className="text-brand-gold font-bold text-sm tracking-widest uppercase mb-2">Thank you for submitting your resume.</p>
              <p className="text-white/60 text-xs font-medium">Our HR lead will review your portfolio and details and contact you shortly.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8 relative z-10 text-white">
              <div className="space-y-2">
                <h3 className="text-3xl font-black text-white italic tracking-tighter">Submit <span className="text-brand-gold not-italic">Credentials.</span></h3>
                <p className="text-[10px] font-black text-brand-gold uppercase tracking-[0.4em] opacity-60">Careers submission portal</p>
              </div>

              {/* Grid 1: Name and Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="group">
                  <label className="text-[10px] font-black text-brand-gold uppercase tracking-widest mb-2 block opacity-80 group-focus-within:opacity-100 transition-opacity">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-0 top-3.5 text-white/30 w-4 h-4" />
                    <input 
                      type="text" 
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Kartik Sharma"
                      className="w-full pl-7 pr-0 py-3 bg-transparent border-b border-white/20 focus:border-brand-gold transition-all outline-none font-bold placeholder:text-white/30"
                    />
                  </div>
                </div>

                <div className="group">
                  <label className="text-[10px] font-black text-brand-gold uppercase tracking-widest mb-2 block opacity-80 group-focus-within:opacity-100 transition-opacity">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-0 top-3.5 text-white/30 w-4 h-4" />
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="kartik@gmail.com"
                      className="w-full pl-7 pr-0 py-3 bg-transparent border-b border-white/20 focus:border-brand-gold transition-all outline-none font-bold placeholder:text-white/30"
                    />
                  </div>
                </div>
              </div>

              {/* Grid 2: Contact and Experience */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="group">
                  <label className="text-[10px] font-black text-brand-gold uppercase tracking-widest mb-2 block opacity-80 group-focus-within:opacity-100 transition-opacity">
                    Contact Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-0 top-3.5 text-white/30 w-4 h-4" />
                    <input 
                      type="tel" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="+91 94140 XXXXX"
                      className="w-full pl-7 pr-0 py-3 bg-transparent border-b border-white/20 focus:border-brand-gold transition-all outline-none font-bold placeholder:text-white/30"
                    />
                  </div>
                </div>

                <div className="group">
                  <label className="text-[10px] font-black text-brand-gold uppercase tracking-widest mb-2 block opacity-80 group-focus-within:opacity-100 transition-opacity">
                    Total Experience (Years)
                  </label>
                  <div className="relative">
                    <Briefcase className="absolute left-0 top-3.5 text-white/30 w-4 h-4" />
                    <input 
                      type="number" 
                      name="experience"
                      value={formData.experience}
                      onChange={handleChange}
                      required
                      min="0"
                      max="40"
                      placeholder="e.g. 5"
                      className="w-full pl-7 pr-0 py-3 bg-transparent border-b border-white/20 focus:border-brand-gold transition-all outline-none font-bold placeholder:text-white/30"
                    />
                  </div>
                </div>
              </div>

              {/* Position selector */}
              <div className="group">
                <label className="text-[10px] font-black text-brand-gold uppercase tracking-widest mb-2 block opacity-80">
                  Target Position
                </label>
                <select 
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  className="w-full px-0 py-3 bg-transparent border-b border-white/20 focus:border-brand-gold transition-all outline-none font-bold appearance-none cursor-pointer"
                >
                  {positions.map(p => (
                    <option key={p} value={p} className="bg-black text-white">{p}</option>
                  ))}
                </select>
              </div>

              {/* Portfolio link */}
              <div className="group">
                <label className="text-[10px] font-black text-brand-gold uppercase tracking-widest mb-2 block opacity-80 group-focus-within:opacity-100 transition-opacity">
                  Portfolio / Website Link
                </label>
                <div className="relative">
                  <LinkIcon className="absolute left-0 top-3.5 text-white/30 w-4 h-4" />
                  <input 
                    type="url" 
                    name="portfolio"
                    value={formData.portfolio}
                    onChange={handleChange}
                    placeholder="https://behance.net/username or https://yourportfolio.com"
                    className="w-full pl-7 pr-0 py-3 bg-transparent border-b border-white/20 focus:border-brand-gold transition-all outline-none font-bold placeholder:text-white/30"
                  />
                </div>
              </div>

              {/* Resume Drag and Drop field */}
              <div className="group">
                <label className="text-[10px] font-black text-brand-gold uppercase tracking-widest mb-2 block opacity-80">
                  Upload Resume / CV
                </label>
                
                {!resume ? (
                  <div 
                    onDragEnter={handleDrag}
                    onDragOver={handleDrag}
                    onDragLeave={handleDrag}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current.click()}
                    className={`border-2 border-dashed rounded-none p-8 text-center cursor-pointer transition-all duration-300 ${
                      isDragActive ? 'border-brand-gold bg-brand-gold/5' : 'border-white/20 hover:border-brand-gold/50 hover:bg-white/[0.02]'
                    }`}
                  >
                    <input 
                      type="file" 
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      accept=".pdf,.doc,.docx"
                      className="hidden"
                    />
                    <Upload className="mx-auto mb-4 text-brand-gold animate-bounce" size={24} />
                    <p className="text-xs font-black uppercase tracking-widest text-brand-cream/80 mb-1">
                      Drag & Drop Resume
                    </p>
                    <p className="text-[10px] text-white/40 tracking-wider">
                      Supports PDF, DOC, or DOCX (Max 5MB)
                    </p>
                  </div>
                ) : (
                  <div className="flex items-center justify-between border border-brand-gold/30 bg-brand-gold/5 p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-brand-gold/20 text-brand-gold flex items-center justify-center">
                        <FileText size={20} />
                      </div>
                      <div className="text-left">
                        <p className="text-xs font-black uppercase tracking-wide text-white truncate max-w-xs sm:max-w-md">
                          {resume.name}
                        </p>
                        <p className="text-[9px] text-white/50 tracking-wider uppercase font-bold">
                          {resume.size}
                        </p>
                      </div>
                    </div>
                    <button 
                      type="button" 
                      onClick={removeResume}
                      className="text-white/40 hover:text-white font-bold text-[10px] uppercase tracking-widest px-3 py-1.5 border border-white/10 hover:border-white/30 transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                )}
                {fileError && <p className="text-red-400 text-xs font-medium mt-2">{fileError}</p>}
              </div>

              {/* Message */}
              <div className="group">
                <label className="text-[10px] font-black text-brand-gold uppercase tracking-widest mb-2 block opacity-80 group-focus-within:opacity-100 transition-opacity">
                  Message / Cover Letter (Optional)
                </label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Share a short note about why you are a fit for Stryper..."
                  rows="3"
                  className="w-full px-0 py-3 bg-transparent border-b border-white/20 focus:border-brand-gold transition-all outline-none font-bold placeholder:text-white/30 resize-none"
                />
              </div>

              <button 
                type="submit" 
                className="w-full bg-brand-gold text-black font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-xs md:text-sm py-4 md:py-6 shadow-2xl hover:bg-white transition-colors flex items-center justify-center gap-4 cursor-pointer"
              >
                Submit Application <Send size={18} />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

export default Careers
