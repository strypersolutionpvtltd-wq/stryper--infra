import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  LayoutDashboard, FolderKanban, FileText, Inbox, Briefcase, Bell, Trash2, 
  Check, CheckSquare, Plus, Upload, Image as ImageIcon, Download, Eye, X, Globe, User, Phone, Mail, Award, ArrowLeft,
  Lock, Menu
} from 'lucide-react'
import { Link } from 'react-router-dom'
import {
  loginAdmin, logoutAdmin,
  getProjects, addProject, deleteProject,
  getBlogs, addBlog, deleteBlog,
  getTestimonials, addTestimonial, deleteTestimonial,
  getInquiries, submitInquiry, deleteInquiry as apiDeleteInquiry, updateInquiryStatus,
  getCareers, deleteCareer as apiDeleteCareer, updateCareerStatus,
  getNotifications, getUnreadCount, markAllNotificationsRead, clearAllNotifications,
  getStats,
  getVisitDetails,
  uploadImage
} from '../services/api'
// store.js fully removed — all data via api.js


const WhatsAppIcon = ({ size = 12, className }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
  >
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.966C16.59 2.019 14.12 1.012 11.49 1.012c-5.433 0-9.858 4.371-9.862 9.8-.001 1.716.467 3.39 1.353 4.876L1.879 20.8l5.22-1.369c-1.58 1.134-1.393.99-1.393.99zm11.082-7.534c-.302-.15-1.788-.875-2.056-.971-.268-.099-.463-.149-.658.15-.195.297-.753.94-.922 1.138-.169.196-.339.22-.641.071-1.053-.527-1.863-.929-2.601-1.564-.58-.5-1.495-1.92-1.495-1.92s-.1-.284.1-.482c.18-.178.3-.346.4-.495.1-.148.15-.247.2-.395.05-.15.025-.276-.012-.35-.038-.076-.302-.756-.462-1.144-.225-.544-.454-.472-.658-.472-.158 0-.339-.011-.539-.011-.2 0-.525.074-.8.375-.275.3-.8 1.138-.8 1.138s-.075.148-.075.297c0 .148.075.297.075.297.8 1.636 1.775 3.018 3.525 4.086 1.75 1.069 3.018 1.449 4.325 1.449.8 0 1.613-.1 2.313-.25.594-.124 1.788-.718 2.038-1.41.25-.693.25-1.287.175-1.41-.075-.124-.275-.199-.575-.349z" />
  </svg>
)

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Only restore session if token exists in localStorage
    const hasToken = !!localStorage.getItem('stryper_token')
    const hasSession = sessionStorage.getItem('stryper_admin_authenticated') === 'true'
    return hasToken && hasSession
  })
  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')
  const [projects, setProjects] = useState([])
  const [blogs, setBlogs] = useState([])
  const [testimonials, setTestimonials] = useState([])
  const [inquiries, setInquiries] = useState([])
  const [careers, setCareers] = useState([])
  const [notifications, setNotifications] = useState([])
  const [toast, setToast] = useState(null)
  const [isUploadingImage, setIsUploadingImage] = useState(false)

  const handleLoginSubmit = async (e) => {
    e.preventDefault()
    const result = await loginAdmin(password)
    if (result.success) {
      setIsAuthenticated(true)
      sessionStorage.setItem('stryper_admin_authenticated', 'true')
      setPasswordError('')
    } else {
      setPasswordError(result.message || 'Invalid Password. Please try again.')
    }
  }

  // Project Form State
  const [projectForm, setProjectForm] = useState({
    title: '',
    category: 'Residential',
    location: '',
    client: '',
    area: '',
    duration: '',
    description: '',
    features: ''
  })
  const [projectImage, setProjectImage] = useState(null)
  const [projDragActive, setProjDragActive] = useState(false)
  const projFileInputRef = useRef(null)

  // Blog Form State
  const [blogForm, setBlogForm] = useState({
    title: '',
    subtitle: '',
    category: 'Residential',
    author: 'Stryper Editorial',
    content: ''
  })
  const [blogImage, setBlogImage] = useState(null)
  const [blogDragActive, setBlogDragActive] = useState(false)
  const blogFileInputRef = useRef(null)

  // Testimonial Form State
  const [testimonialForm, setTestimonialForm] = useState({
    name: '',
    role: '',
    text: '',
    rating: 5,
    image: ''
  })

  // Settings Form State
  const [settingsForm, setSettingsForm] = useState({
    phone: '',
    email: '',
    address: '',
    whatsapp: '',
    est: '',
    website: ''
  })

  const [currentPasswordVal, setCurrentPasswordVal] = useState('')
  const [newPasswordVal, setNewPasswordVal] = useState('')
  const [confirmPasswordVal, setConfirmPasswordVal] = useState('')

  // Detail Modal State
  const [selectedInquiry, setSelectedInquiry] = useState(null)
  const [selectedCareer, setSelectedCareer] = useState(null)
  const [traffic, setTraffic] = useState({ visitors: 0, pageviews: 0 })
  const [visitModal, setVisitModal] = useState({ open: false, type: '', data: null, loading: false })

  // Load all data from MongoDB via API
  const loadData = async () => {
    const [proj, bl, test, inq, car, notifs, stats] = await Promise.all([
      getProjects(),
      getBlogs(),
      getTestimonials(),
      getInquiries(),
      getCareers(),
      getNotifications(),
      getStats()
    ])
    setProjects(proj)
    setBlogs(bl)
    setTestimonials(test)
    setInquiries(inq)
    setCareers(Array.isArray(car) ? car : [])
    setNotifications(notifs)
    if (stats) {
      setTraffic({ visitors: stats.visitors ?? 0, pageviews: stats.pageviews ?? 0 })
    }
  }

  useEffect(() => {
    if (!isAuthenticated) return

    // Verify token is still valid on mount — auto-logout if expired
    const verifySession = async () => {
      try {
        const res = await fetch('/api/auth/verify', {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('stryper_token')}` }
        })
        if (!res.ok) {
          // Token expired or missing — force re-login
          setIsAuthenticated(false)
          sessionStorage.removeItem('stryper_admin_authenticated')
          localStorage.removeItem('stryper_token')
          return
        }
        // Token valid — load data
        loadData()
        getSiteSettings().then(s => {
          if (s) setSettingsForm({
            phone: s.phone || '',
            email: s.email || '',
            address: s.address || '',
            whatsapp: s.whatsapp || '',
            est: s.est || '',
            website: s.website || ''
          })
        })
      } catch {
        // Backend offline — still show UI with empty data
        loadData()
      }
    }

    verifySession()

    // Poll notifications every 30s only while authenticated
    const interval = setInterval(async () => {
      const token = localStorage.getItem('stryper_token')
      if (!token) return
      const count = await getUnreadCount()
      if (count > 0) {
        const notifs = await getNotifications()
        setNotifications(notifs)
      }
    }, 30000)

    return () => clearInterval(interval)
  }, [isAuthenticated])

  const showToast = (message, action = null) => {
    setToast(action ? { message, ...action } : message)
    setTimeout(() => setToast(null), 7000)
  }

  // Handle Drag-and-drop for Project image
  const handleProjFileChange = async (e) => {
    const file = e.target.files[0]
    if (file) {
      setIsUploadingImage(true)
      const url = await uploadImage(file)
      if (url) {
        setProjectImage(url)
      } else {
        const reader = new FileReader()
        reader.onload = (event) => setProjectImage(event.target.result)
        reader.readAsDataURL(file)
      }
      setIsUploadingImage(false)
    }
  }

  const handleProjDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') setProjDragActive(true)
    else if (e.type === 'dragleave') setProjDragActive(false)
  }

  const handleProjDrop = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    setProjDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0]
      setIsUploadingImage(true)
      const url = await uploadImage(file)
      if (url) {
        setProjectImage(url)
      } else {
        const reader = new FileReader()
        reader.onload = (event) => setProjectImage(event.target.result)
        reader.readAsDataURL(file)
      }
      setIsUploadingImage(false)
    }
  }

  // Handle Drag-and-drop for Blog image
  const handleBlogFileChange = async (e) => {
    const file = e.target.files[0]
    if (file) {
      setIsUploadingImage(true)
      const url = await uploadImage(file)
      if (url) {
        setBlogImage(url)
      } else {
        const reader = new FileReader()
        reader.onload = (event) => setBlogImage(event.target.result)
        reader.readAsDataURL(file)
      }
      setIsUploadingImage(false)
    }
  }

  const handleBlogDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') setBlogDragActive(true)
    else if (e.type === 'dragleave') setBlogDragActive(false)
  }

  const handleBlogDrop = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    setBlogDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0]
      setIsUploadingImage(true)
      const url = await uploadImage(file)
      if (url) {
        setBlogImage(url)
      } else {
        const reader = new FileReader()
        reader.onload = (event) => setBlogImage(event.target.result)
        reader.readAsDataURL(file)
      }
      setIsUploadingImage(false)
    }
  }

  // Form Submissions
  const handleProjectSubmit = async (e) => {
    e.preventDefault()
    if (!projectImage) {
      alert('Please upload or paste an image URL for the project.')
      return
    }

    const featureList = projectForm.features
      .split(',')
      .map(item => item.trim())
      .filter(item => item.length > 0)

    const result = await addProject({
      title: projectForm.title,
      category: projectForm.category,
      location: projectForm.location,
      client: projectForm.client,
      area: projectForm.area,
      duration: projectForm.duration,
      description: projectForm.description,
      features: featureList.length > 0 ? featureList : ['Premium Site Planning', 'High-end Materials'],
      image: projectImage
    })

    if (!result || !result.success) {
      alert(result?.message || 'Failed to publish project. Please try again.')
      return
    }

    // Use slug returned by backend (it appends timestamp to ensure uniqueness)
    const savedSlug = result.data?.slug || projectForm.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')
    const addedTitle = projectForm.title

    setProjectForm({
      title: '',
      category: 'Residential',
      location: '',
      client: '',
      area: '',
      duration: '',
      description: '',
      features: ''
    })
    setProjectImage(null)
    loadData()
    showToast(`Project "${addedTitle}" has been successfully added to Stryper Gallery!`, {
      actionUrl: `/project/${savedSlug}`,
      actionLabel: 'View Live'
    })
  }

  const handleBlogSubmit = async (e) => {
    e.preventDefault()
    const defaultImg = 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2000'
    const addedTitle = blogForm.title

    const result = await addBlog({
      title: blogForm.title,
      subtitle: blogForm.subtitle,
      category: blogForm.category,
      author: blogForm.author,
      content: blogForm.content,
      image: blogImage || defaultImg
    })

    if (!result || !result.success) {
      alert(result?.message || 'Failed to publish blog. Please try again.')
      return
    }

    // Use slug returned by backend
    const savedSlug = result.data?.slug || addedTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-')

    setBlogForm({
      title: '',
      subtitle: '',
      category: 'Residential',
      author: 'Stryper Editorial',
      content: ''
    })
    setBlogImage(null)
    loadData()
    showToast(`Blog post "${addedTitle}" published!`, {
      actionUrl: `/blogs?slug=${savedSlug}`,
      actionLabel: 'View Live'
    })
  }

  // Delete handlers
  const deleteInquiry = async (id) => {
    await apiDeleteInquiry(id)
    loadData()
    showToast('Inquiry deleted')
  }

  const deleteCareer = async (id) => {
    await apiDeleteCareer(id)
    loadData()
    showToast('Career application deleted')
  }

  const handleDeleteProject = async (slugOrId) => {
    await deleteProject(slugOrId)
    loadData()
    showToast('Project deleted successfully!')
  }

  const handleDeleteBlog = async (slugOrId) => {
    await deleteBlog(slugOrId)
    loadData()
    showToast('Blog post deleted successfully!')
  }

  const handleDeleteTestimonial = async (idOrName) => {
    await deleteTestimonial(idOrName)
    loadData()
    showToast('Testimonial deleted successfully!')
  }

  const handleTestimonialSubmit = async (e) => {
    e.preventDefault()
    const defaultAvatar = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&h=200'
    await addTestimonial({
      name: testimonialForm.name,
      role: testimonialForm.role,
      text: testimonialForm.text,
      rating: parseInt(testimonialForm.rating, 10),
      image: testimonialForm.image || defaultAvatar
    })
    setTestimonialForm({ name: '', role: '', text: '', rating: 5, image: '' })
    loadData()
    showToast(`Review from "${testimonialForm.name}" has been published!`)
  }

  const handleSettingsSubmit = async (e) => {
    e.preventDefault()
    await updateSiteSettings(settingsForm)
    showToast('Site settings saved successfully!')
  }

  const handlePasswordChangeSubmit = async (e) => {
    e.preventDefault()
    if (newPasswordVal !== confirmPasswordVal) {
      alert('Passwords do not match!')
      return
    }
    const result = await changeAdminPasswordBackend(currentPasswordVal, newPasswordVal)
    if (result.success) {
      setCurrentPasswordVal('')
      setNewPasswordVal('')
      setConfirmPasswordVal('')
      showToast('Password updated successfully!')
    } else {
      alert(result.message || 'Failed to update password')
    }
  }

  const markNotificationRead = async () => {
    await markAllNotificationsRead()
    loadData()
  }

  const resetNotifications = async () => {
    await clearAllNotifications()
    loadData()
  }

  const unreadNotificationsCount = notifications.filter(n => !n.read).length

  if (!isAuthenticated) {
    return (
      <div className="bg-[#F7F4EF] min-h-screen flex items-center justify-center font-roboto text-brand-teal p-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md bg-black text-white p-8 md:p-10 border border-brand-gold/25 shadow-2xl relative"
        >
          {/* Decorative Gold Accent Line */}
          <div className="absolute top-0 left-0 w-full h-[3px] bg-brand-gold" />
          
          <div className="text-center space-y-4 mb-8">
            <div className="w-16 h-16 bg-brand-gold/10 text-brand-gold flex items-center justify-center rounded-full mx-auto border border-brand-gold/20">
              <Lock size={28} />
            </div>
            <div>
              <h2 className="text-brand-gold text-2xl font-black uppercase tracking-[0.2em] font-serif leading-none">Stryper Admin</h2>
              <span className="text-[9px] font-black tracking-widest text-white/40 uppercase block mt-2">Restricted Access Portal</span>
            </div>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-6">
            <div>
              <label className="text-[10px] font-black text-brand-gold uppercase tracking-wider mb-2 block">Enter Security Password</label>
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 focus:border-brand-gold/50 transition-colors outline-none font-bold text-sm text-white tracking-widest text-center"
              />
              {passwordError && (
                <p className="text-red-500 text-[10px] font-black uppercase tracking-wider mt-2 text-center">
                  {passwordError}
                </p>
              )}
            </div>

            <button 
              type="submit" 
              className="w-full bg-brand-gold text-black font-black uppercase tracking-[0.2em] text-xs py-4 hover:bg-white hover:text-black transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              Unlock Terminal
            </button>
          </form>

          <div className="mt-8 text-center">
            <Link 
              to="/" 
              className="text-[9px] font-black uppercase tracking-widest text-white/40 hover:text-brand-gold transition-colors"
            >
              ← Back to Homepage
            </Link>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="bg-[#F7F4EF] min-h-screen font-roboto text-brand-teal">
      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-[100] bg-black text-brand-gold py-4 px-6 border-l-4 border-brand-gold shadow-2xl flex items-center gap-6 max-w-md"
          >
            <Bell className="animate-swing shrink-0" size={18} />
            <div className="text-xs font-black uppercase tracking-wider text-left flex-1">
              <span className="text-white block font-bold text-[10px]">Stryper Notification</span>
              {typeof toast === 'string' ? toast : toast.message}
            </div>
            {typeof toast === 'object' && toast.actionUrl && (
              <a 
                href={toast.actionUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-brand-gold text-black px-3.5 py-2 text-[9px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-colors shrink-0 cursor-pointer shadow-md"
              >
                {toast.actionLabel || 'View'}
              </a>
            )}
            <button onClick={() => setToast(null)} className="text-white/40 hover:text-white ml-1 shrink-0 cursor-pointer">
              <X size={14} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Top Header (Fixed) */}
      <header className="lg:hidden w-full bg-black text-white h-16 flex items-center justify-between px-6 sm:px-10 border-b border-white/10 fixed top-0 left-0 z-40">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsMobileSidebarOpen(true)}
            className="text-white hover:text-brand-gold p-2 -ml-2 transition-colors focus:outline-none cursor-pointer flex items-center justify-center"
          >
            <Menu size={24} />
          </button>
          <h2 className="text-brand-gold text-sm font-black uppercase tracking-[0.2em] font-serif leading-none">Stryper Admin</h2>
        </div>
        {unreadNotificationsCount > 0 && (
          <span className="w-5 h-5 bg-brand-gold text-black rounded-full flex items-center justify-center text-[9px] font-black">
            {unreadNotificationsCount}
          </span>
        )}
      </header>

      {/* Mobile Sidebar Backdrop Overlay */}
      {isMobileSidebarOpen && (
        <div 
          onClick={() => setIsMobileSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
        />
      )}

      {/* Admin Container */}
      <div className="w-full flex flex-col lg:flex-row min-h-screen">
        {/* Left Sidebar */}
        <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-black text-white flex flex-col border-r border-white/10 shrink-0 pb-8 pt-6 lg:pt-24 transform transition-transform duration-300 lg:transform-none lg:static lg:flex lg:min-h-screen ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
          <div className="p-8 border-b border-white/10 flex items-center justify-between lg:flex-row flex-row">
            <div>
              <h2 className="text-brand-gold text-lg font-black uppercase tracking-[0.2em] font-serif leading-none">Stryper Admin</h2>
              <span className="text-[8px] font-black tracking-widest text-white/40 uppercase block mt-1">Management Hub</span>
            </div>
            <button onClick={() => setIsMobileSidebarOpen(false)} className="lg:hidden text-white/60 hover:text-white p-1 cursor-pointer">
              <X size={18} />
            </button>
          </div>
          
          <nav className="flex-1 p-4 space-y-1">
            <button 
              onClick={() => {
                setActiveTab('overview')
                setIsMobileSidebarOpen(false)
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 text-xs font-black uppercase tracking-widest transition-colors cursor-pointer ${activeTab === 'overview' ? 'bg-brand-gold text-black' : 'text-white/70 hover:bg-white/5 hover:text-white'}`}
            >
              <LayoutDashboard size={14} /> Overview
            </button>
            <button 
              onClick={() => {
                setActiveTab('inquiries')
                setIsMobileSidebarOpen(false)
              }}
              className={`w-full flex items-center justify-between px-4 py-3 text-xs font-black uppercase tracking-widest transition-colors cursor-pointer ${activeTab === 'inquiries' ? 'bg-brand-gold text-black' : 'text-white/70 hover:bg-white/5 hover:text-white'}`}
            >
              <span className="flex items-center gap-3"><Inbox size={14} /> Inquiries</span>
              {inquiries.length > 0 && (
                <span className={`text-[9px] px-2 py-0.5 font-bold ${activeTab === 'inquiries' ? 'bg-black text-brand-gold' : 'bg-white/10 text-white'}`}>{inquiries.length}</span>
              )}
            </button>
            <button 
              onClick={() => {
                setActiveTab('careers')
                setIsMobileSidebarOpen(false)
              }}
              className={`w-full flex items-center justify-between px-4 py-3 text-xs font-black uppercase tracking-widest transition-colors cursor-pointer ${activeTab === 'careers' ? 'bg-brand-gold text-black' : 'text-white/70 hover:bg-white/5 hover:text-white'}`}
            >
              <span className="flex items-center gap-3"><Briefcase size={14} /> Careers Apps</span>
              {careers.length > 0 && (
                <span className={`text-[9px] px-2 py-0.5 font-bold ${activeTab === 'careers' ? 'bg-black text-brand-gold' : 'bg-white/10 text-white'}`}>{careers.length}</span>
              )}
            </button>
            <button 
              onClick={() => {
                setActiveTab('manage-projects')
                setIsMobileSidebarOpen(false)
              }}
              className={`w-full flex items-center justify-between px-4 py-3 text-xs font-black uppercase tracking-widest transition-colors cursor-pointer ${activeTab === 'manage-projects' || activeTab === 'add-project' ? 'bg-brand-gold text-black' : 'text-white/70 hover:bg-white/5 hover:text-white'}`}
            >
              <span className="flex items-center gap-3"><FolderKanban size={14} /> Projects</span>
              <span className={`text-[9px] px-2 py-0.5 font-bold ${activeTab === 'manage-projects' || activeTab === 'add-project' ? 'bg-black text-brand-gold' : 'bg-white/10 text-white'}`}>{projects.length}</span>
            </button>
            <button 
              onClick={() => {
                setActiveTab('manage-blogs')
                setIsMobileSidebarOpen(false)
              }}
              className={`w-full flex items-center justify-between px-4 py-3 text-xs font-black uppercase tracking-widest transition-colors cursor-pointer ${activeTab === 'manage-blogs' || activeTab === 'add-blog' ? 'bg-brand-gold text-black' : 'text-white/70 hover:bg-white/5 hover:text-white'}`}
            >
              <span className="flex items-center gap-3"><FileText size={14} /> Blogs</span>
              <span className={`text-[9px] px-2 py-0.5 font-bold ${activeTab === 'manage-blogs' || activeTab === 'add-blog' ? 'bg-black text-brand-gold' : 'bg-white/10 text-white'}`}>{blogs.length}</span>
            </button>
            <button 
              onClick={() => {
                setActiveTab('testimonials')
                setIsMobileSidebarOpen(false)
              }}
              className={`w-full flex items-center justify-between px-4 py-3 text-xs font-black uppercase tracking-widest transition-colors cursor-pointer ${activeTab === 'testimonials' ? 'bg-brand-gold text-black' : 'text-white/70 hover:bg-white/5 hover:text-white'}`}
            >
              <span className="flex items-center gap-3"><Award size={14} /> Testimonials</span>
              <span className={`text-[9px] px-2 py-0.5 font-bold ${activeTab === 'testimonials' ? 'bg-black text-brand-gold' : 'bg-white/10 text-white'}`}>{testimonials.length}</span>
            </button>
            <button 
              onClick={() => {
                setActiveTab('settings')
                setIsMobileSidebarOpen(false)
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 text-xs font-black uppercase tracking-widest transition-colors cursor-pointer ${activeTab === 'settings' ? 'bg-brand-gold text-black' : 'text-white/70 hover:bg-white/5 hover:text-white'}`}
            >
              <Globe size={14} /> Site Settings
            </button>
            <button 
              onClick={() => {
                logoutAdmin()
                setIsAuthenticated(false)
                setIsMobileSidebarOpen(false)
                sessionStorage.removeItem('stryper_admin_authenticated')
              }}
              className="w-full flex items-center gap-3 px-4 py-3 text-xs font-black uppercase tracking-widest transition-colors text-red-400 hover:bg-red-950/20 hover:text-red-500 mt-8 cursor-pointer"
            >
              <Lock size={14} /> Log Out
            </button>
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-6 sm:p-10 lg:p-12 overflow-y-auto pt-20 lg:pt-24">
          {/* Tab content: Overview */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Heading */}
              <div>
                <h1 className="text-black font-black text-3xl md:text-4xl uppercase tracking-wider font-serif">Dashboard Overview</h1>
                <p className="text-black/50 text-xs font-black tracking-widest uppercase mt-1">Real-time statistics & activity logs</p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <button 
                  onClick={() => setActiveTab('inquiries')}
                  className="bg-white p-6 border border-black/5 shadow-md flex flex-col justify-between items-start text-left cursor-pointer hover:border-brand-gold/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 focus:outline-none w-full group"
                >
                  <span className="text-[10px] font-black text-brand-gold uppercase tracking-wider block group-hover:text-black transition-colors">Total Inquiries</span>
                  <span className="text-4xl font-black text-black mt-2 font-serif">{inquiries.length}</span>
                </button>
                <button 
                  onClick={() => setActiveTab('careers')}
                  className="bg-white p-6 border border-black/5 shadow-md flex flex-col justify-between items-start text-left cursor-pointer hover:border-brand-gold/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 focus:outline-none w-full group"
                >
                  <span className="text-[10px] font-black text-brand-gold uppercase tracking-wider block group-hover:text-black transition-colors">Careers Applications</span>
                  <span className="text-4xl font-black text-black mt-2 font-serif">{careers.length}</span>
                </button>
                <button 
                  onClick={() => setActiveTab('manage-projects')}
                  className="bg-white p-6 border border-black/5 shadow-md flex flex-col justify-between items-start text-left cursor-pointer hover:border-brand-gold/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 focus:outline-none w-full group"
                >
                  <span className="text-[10px] font-black text-brand-gold uppercase tracking-wider block group-hover:text-black transition-colors">Projects Live</span>
                  <span className="text-4xl font-black text-black mt-2 font-serif">{projects.length}</span>
                </button>
                <button 
                  onClick={() => setActiveTab('manage-blogs')}
                  className="bg-white p-6 border border-black/5 shadow-md flex flex-col justify-between items-start text-left cursor-pointer hover:border-brand-gold/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 focus:outline-none w-full group"
                >
                  <span className="text-[10px] font-black text-brand-gold uppercase tracking-wider block group-hover:text-black transition-colors">Published Blogs</span>
                  <span className="text-4xl font-black text-black mt-2 font-serif">{blogs.length}</span>
                </button>
              </div>

              {/* Site Traffic & Visitors — Clickable for detail */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <button
                  onClick={async () => {
                    setVisitModal({ open: true, type: 'visitors', data: null, loading: true })
                    const result = await getVisitDetails('unique', 1, 100)
                    setVisitModal({ open: true, type: 'visitors', data: result, loading: false })
                  }}
                  className="bg-white p-6 border border-black/5 shadow-md flex items-center justify-between cursor-pointer hover:border-brand-gold/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 w-full text-left group"
                >
                  <div>
                    <span className="text-[10px] font-black text-brand-gold uppercase tracking-wider block group-hover:text-black transition-colors">Total Unique Visitors</span>
                    <span className="text-3xl font-black text-black mt-2 block font-serif">{traffic.visitors}</span>
                    <span className="text-[10px] text-black/40 mt-1 block">Click to view details →</span>
                  </div>
                  <div className="w-12 h-12 bg-brand-gold/10 text-brand-gold flex items-center justify-center rounded-full group-hover:bg-brand-gold group-hover:text-white transition-all">
                    <User size={20} />
                  </div>
                </button>
                <button
                  onClick={async () => {
                    setVisitModal({ open: true, type: 'pageviews', data: null, loading: true })
                    const result = await getVisitDetails('all', 1, 100)
                    setVisitModal({ open: true, type: 'pageviews', data: result, loading: false })
                  }}
                  className="bg-white p-6 border border-black/5 shadow-md flex items-center justify-between cursor-pointer hover:border-brand-gold/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 w-full text-left group"
                >
                  <div>
                    <span className="text-[10px] font-black text-brand-gold uppercase tracking-wider block group-hover:text-black transition-colors">Total Page Views</span>
                    <span className="text-3xl font-black text-black mt-2 block font-serif">{traffic.pageviews}</span>
                    <span className="text-[10px] text-black/40 mt-1 block">Click to view details →</span>
                  </div>
                  <div className="w-12 h-12 bg-brand-gold/10 text-brand-gold flex items-center justify-center rounded-full group-hover:bg-brand-gold group-hover:text-white transition-all">
                    <Globe size={20} />
                  </div>
                </button>
              </div>

              {/* Visitor Detail Modal */}
              {visitModal.open && (
                <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4" onClick={() => setVisitModal({ open: false, type: '', data: null, loading: false })}>
                  <div className="bg-white w-full max-w-6xl max-h-[90vh] flex flex-col shadow-2xl" onClick={e => e.stopPropagation()}>
                    {/* Modal Header */}
                    <div className="flex items-center justify-between px-6 py-4 border-b border-black/10 bg-black text-white">
                      <div>
                        <h2 className="text-sm font-black uppercase tracking-widest text-brand-gold">
                          {visitModal.type === 'visitors' ? '👥 Unique Visitor Details' : '📄 Page View Details'}
                        </h2>
                        <p className="text-xs text-white/50 mt-0.5">All times shown in Indian Standard Time (IST)</p>
                      </div>
                      <button onClick={() => setVisitModal({ open: false, type: '', data: null, loading: false })} className="text-white/60 hover:text-white transition-colors">
                        <X size={20} />
                      </button>
                    </div>

                    {/* Modal Body */}
                    <div className="overflow-auto flex-1">
                      {visitModal.loading ? (
                        <div className="flex items-center justify-center h-48">
                          <div className="w-8 h-8 border-4 border-brand-gold border-t-transparent rounded-full animate-spin" />
                        </div>
                      ) : visitModal.data?.visits?.length > 0 ? (
                        <table className="w-full text-xs">
                          <thead className="bg-[#F7F4EF] sticky top-0">
                            <tr>
                              {['#', 'Page URL', 'Browser', 'OS', 'Device', 'IP Address', 'Referrer', 'Time (IST)'].map(h => (
                                <th key={h} className="text-left px-4 py-3 font-black uppercase tracking-wider text-black/60 whitespace-nowrap border-b border-black/10">{h}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {visitModal.data.visits.map((v, i) => {
                              // Browser icon emoji
                              const browserIcon = v.browser.includes('Chrome') ? '🌐'
                                : v.browser.includes('Firefox') ? '🦊'
                                : v.browser.includes('Edge') ? '🔷'
                                : v.browser.includes('Safari') ? '🧭'
                                : v.browser.includes('Opera') ? '🔴' : '🌐'
                              const deviceIcon = v.device === 'Mobile' ? '📱' : v.device === 'Tablet' ? '📲' : '💻'
                              return (
                                <tr key={v._id} className={`border-b border-black/5 hover:bg-brand-gold/5 transition-colors ${i % 2 === 0 ? 'bg-white' : 'bg-[#fafaf8]'}`}>
                                  <td className="px-4 py-3 text-black/40 font-mono">{i + 1}</td>
                                  <td className="px-4 py-3 font-mono text-black/70 max-w-[180px] truncate" title={v.url}>{v.url}</td>
                                  <td className="px-4 py-3 whitespace-nowrap">
                                    <span className="flex items-center gap-1.5">
                                      <span>{browserIcon}</span>
                                      <span className="font-semibold text-black">{v.browser}</span>
                                    </span>
                                  </td>
                                  <td className="px-4 py-3 whitespace-nowrap text-black/70">{v.os}</td>
                                  <td className="px-4 py-3 whitespace-nowrap">
                                    <span className="flex items-center gap-1">{deviceIcon} {v.device}</span>
                                  </td>
                                  <td className="px-4 py-3 font-mono text-black/50">{v.ip}</td>
                                  <td className="px-4 py-3 text-black/50 max-w-[120px] truncate" title={v.referrer}>{v.referrer}</td>
                                  <td className="px-4 py-3 whitespace-nowrap text-black/70 font-mono text-[10px]">{v.visitedAt}</td>
                                </tr>
                              )
                            })}
                          </tbody>
                        </table>
                      ) : (
                        <div className="flex items-center justify-center h-48 text-black/40">
                          <div className="text-center">
                            <Globe size={32} className="mx-auto mb-3 opacity-30" />
                            <p className="text-sm font-semibold">No visit data yet</p>
                            <p className="text-xs mt-1">Visits will appear here once users browse the site</p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Modal Footer */}
                    {visitModal.data && (
                      <div className="px-6 py-3 border-t border-black/10 bg-[#F7F4EF] flex items-center justify-between">
                        <span className="text-xs text-black/50">
                          Showing {visitModal.data.visits?.length || 0} of {visitModal.data.total || 0} records
                        </span>
                        <span className="text-xs text-black/40">All times in IST (UTC+5:30)</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Notifications panel */}
              <div className="bg-white p-6 sm:p-8 border border-black/5 shadow-md space-y-6">
                <div className="flex items-center justify-between border-b border-black/5 pb-4">
                  <div className="flex items-center gap-2">
                    <Bell className="text-brand-gold" size={16} />
                    <h3 className="text-black text-sm font-black uppercase tracking-wider">Recent Activity Logs</h3>
                  </div>
                  <div className="flex gap-4">
                    {unreadNotificationsCount > 0 && (
                      <button onClick={markNotificationRead} className="text-[10px] font-black uppercase tracking-widest text-brand-gold hover:text-black transition-colors flex items-center gap-1 cursor-pointer">
                        <CheckSquare size={12} /> Mark Read
                      </button>
                    )}
                    <button onClick={resetNotifications} className="text-[10px] font-black uppercase tracking-widest text-red-500 hover:text-red-700 transition-colors flex items-center gap-1 cursor-pointer">
                      <Trash2 size={12} /> Clear Logs
                    </button>
                  </div>
                </div>

                <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
                  {notifications.length === 0 ? (
                    <p className="text-black/40 text-xs italic text-center py-6">No recent activity logged.</p>
                  ) : (
                    notifications.map((notif) => (
                      <div key={notif._id} className={`p-4 border text-xs flex justify-between items-center transition-colors ${notif.read ? 'bg-black/[0.01] border-black/5 text-black/60' : 'bg-brand-gold/5 border-brand-gold/20 text-black font-semibold'}`}>
                        <div className="flex items-center gap-3">
                          <div className={`w-2.5 h-2.5 rounded-full ${notif.read ? 'bg-black/10' : 'bg-brand-gold animate-pulse'}`} />
                          <p>{notif.text}</p>
                        </div>
                        <span className="text-[9px] text-black/40 font-medium font-mono">{new Date(notif.createdAt).toLocaleTimeString()}</span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Tab content: Inquiries */}
          {activeTab === 'inquiries' && (
            <div className="space-y-8">
              {selectedInquiry ? (
                /* INLINE INQUIRY DETAIL CARD */
                <div className="bg-white p-8 border border-black/5 shadow-lg space-y-6">
                  <div className="flex items-center justify-between border-b border-black/10 pb-4">
                    <div>
                      <span className="bg-black text-brand-gold py-1 px-2.5 border border-brand-gold/10 font-black uppercase tracking-widest text-[9px]">
                        {selectedInquiry.service}
                      </span>
                      <h3 className="text-black text-2xl font-black font-serif uppercase tracking-tight pt-2">{selectedInquiry.name}</h3>
                      <span className="text-[9px] text-black/40 font-mono block">Submitted: {new Date(selectedInquiry.createdAt).toLocaleString()}</span>
                    </div>
                    <button 
                      onClick={() => setSelectedInquiry(null)}
                      className="border border-black/10 hover:border-black text-xs font-black uppercase tracking-widest px-4 py-2 flex items-center gap-1.5 transition-colors cursor-pointer bg-white"
                    >
                      <ArrowLeft size={14} /> Back to List
                    </button>
                  </div>

                  <div className="space-y-4 text-xs font-medium">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-y border-black/5 py-4 my-2">
                      <div className="flex items-center gap-3">
                        <Phone className="text-brand-gold w-4 h-4" />
                        <a href={`tel:${selectedInquiry.phone}`} className="font-bold text-black hover:underline">{selectedInquiry.phone}</a>
                      </div>
                      <div className="flex gap-2">
                        <a 
                          href={`tel:${selectedInquiry.phone}`}
                          className="bg-black text-brand-gold hover:bg-brand-gold hover:text-black py-1.5 px-3 text-[9px] font-black uppercase tracking-widest flex items-center gap-1.5 transition-colors"
                        >
                          <Phone size={10} /> Call Client
                        </a>
                        <a 
                          href={`https://wa.me/${selectedInquiry.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                            `Hello ${selectedInquiry.name}, thank you for submitting a Project Brief for "${selectedInquiry.service}" on Stryper. We have reviewed your details and would love to consult with you. When is a good time to speak?`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-[#25D366] text-white hover:bg-black hover:text-[#25D366] py-1.5 px-3 text-[9px] font-black uppercase tracking-widest flex items-center gap-1.5 transition-colors border border-transparent hover:border-[#25D366]"
                        >
                          <WhatsAppIcon size={12} /> WhatsApp
                        </a>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="text-brand-gold w-4 h-4" />
                      <a href={`mailto:${selectedInquiry.email}`} className="font-bold text-black hover:underline">{selectedInquiry.email}</a>
                    </div>
                  </div>

                  <div className="space-y-2 border-t border-black/10 pt-6">
                    <h4 className="text-[10px] font-black uppercase tracking-wider text-brand-champagne">Project brief / scope:</h4>
                    <p className="text-black/80 text-xs italic leading-relaxed bg-black/[0.01] p-4 border border-black/5">
                      "{selectedInquiry.message}"
                    </p>
                  </div>
                </div>
              ) : (
                /* REGULAR INQUIRIES LIST TABLE */
                <>
                  <div>
                    <h1 className="text-black font-black text-3xl md:text-4xl uppercase tracking-wider font-serif">Project Inquiries</h1>
                    <p className="text-black/50 text-xs font-black tracking-widest uppercase mt-1">Contact and consult briefs submitted by users</p>
                  </div>

                  <div className="bg-[#F7F4EF] md:bg-white md:border md:border-black/5 md:shadow-md overflow-hidden">
                    {inquiries.length === 0 ? (
                      <div className="bg-white p-16 text-center text-black/40 italic border border-black/5 shadow-sm md:border-0 md:shadow-none">
                        No project briefs submitted yet.
                      </div>
                    ) : (
                      <>
                        {/* Mobile view cards */}
                        <div className="space-y-4 md:hidden">
                          {inquiries.map((inq) => (
                            <div key={inq._id} className="bg-white p-5 border border-black/5 shadow-sm space-y-4">
                              <div className="flex justify-between items-start gap-4">
                                <div className="space-y-1">
                                  <p className="font-bold text-black text-sm">{inq.name}</p>
                                  <p className="text-[10px] text-black/50 truncate max-w-[180px]">{inq.email}</p>
                                </div>
                                <span className="bg-black text-brand-gold py-1 px-2 border border-brand-gold/10 font-bold uppercase tracking-wider text-[8px] shrink-0">
                                  {inq.service}
                                </span>
                              </div>
                              <div className="flex justify-between items-center text-[11px] border-t border-black/5 pt-3">
                                <span className="font-bold text-black">{inq.phone}</span>
                                <span className="text-black/40 font-mono">{new Date(inq.createdAt).toLocaleDateString()}</span>
                              </div>
                              <div className="flex gap-2 pt-2">
                                <button 
                                  onClick={async () => {
                                    setSelectedInquiry(inq)
                                    if (inq.status === 'new') {
                                      await updateInquiryStatus(inq._id, 'contacted')
                                      loadData()
                                    }
                                  }}
                                  className="flex-1 bg-black text-white hover:bg-brand-gold hover:text-black py-2.5 text-center font-bold uppercase tracking-widest text-[9px] transition-colors cursor-pointer"
                                >
                                  View Detail
                                </button>
                                <button 
                                  onClick={() => deleteInquiry(inq._id)}
                                  className="border border-red-200 text-red-500 hover:bg-red-50 py-2.5 px-4 font-bold uppercase tracking-widest text-[9px] transition-colors cursor-pointer"
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>

                            {/* Desktop view table */}
                        <div className="hidden md:block overflow-x-auto">
                          <table className="w-full text-left border-collapse">
                            <thead>
                              <tr className="bg-black text-brand-gold text-[10px] font-black tracking-widest uppercase border-b border-black/10">
                                <th className="py-4 px-6">Client</th>
                                <th className="py-4 px-6">Service</th>
                                <th className="py-4 px-6">Phone</th>
                                <th className="py-4 px-6">Date</th>
                                <th className="py-4 px-6 text-right">Actions</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-black/5 text-xs">
                              {inquiries.map((inq) => (
                                <tr key={inq._id} className="hover:bg-black/[0.01] transition-colors">
                                  <td className="py-4 px-6">
                                    <p className="font-bold text-black">{inq.name}</p>
                                    <p className="text-[10px] text-black/50">{inq.email}</p>
                                  </td>
                                  <td className="py-4 px-6">
                                    <span className="bg-black/[0.04] py-1 px-2 border border-black/5 font-bold uppercase tracking-wider text-[9px] text-brand-gold bg-black">
                                      {inq.service}
                                    </span>
                                  </td>
                                  <td className="py-4 px-6 font-bold">{inq.phone}</td>
                                  <td className="py-4 px-6 text-black/50 font-mono">{new Date(inq.createdAt).toLocaleDateString()}</td>
                                  <td className="py-4 px-6 text-right space-x-2">
                                    <button 
                                      onClick={async () => {
                                        setSelectedInquiry(inq)
                                        if (inq.status === 'new') {
                                          await updateInquiryStatus(inq._id, 'contacted')
                                          loadData()
                                        }
                                      }}
                                      className="bg-black text-white hover:bg-brand-gold hover:text-black py-1.5 px-3 font-bold uppercase tracking-widest text-[9px] transition-colors cursor-pointer"
                                    >
                                      View Detail
                                    </button>
                                    <button 
                                      onClick={() => deleteInquiry(inq._id)}
                                      className="border border-red-200 text-red-500 hover:bg-red-50 py-1.5 px-3 font-bold uppercase tracking-widest text-[9px] transition-colors cursor-pointer"
                                    >
                                      Delete
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </>
                    )}
                  </div>
                </>
              )}
            </div>
          )}

          {activeTab === 'careers' && (
            <div className="space-y-8">
              {selectedCareer ? (
                /* INLINE CANDIDATE DETAIL CARD */
                <div className="bg-white p-8 border border-black/5 shadow-lg space-y-6">
                  <div className="flex items-center justify-between border-b border-black/10 pb-4">
                    <div>
                      <span className="bg-black text-brand-gold py-1 px-2.5 border border-brand-gold/10 font-black uppercase tracking-widest text-[9px]">
                        {selectedCareer.position}
                      </span>
                      <h3 className="text-black text-2xl font-black font-serif uppercase tracking-tight pt-2">{selectedCareer.name}</h3>
                      <span className="text-[9px] text-black/40 font-mono block mb-2">Submitted: {new Date(selectedCareer.createdAt).toLocaleString()}</span>
                      <div className="flex items-center gap-2 mt-2">
                        <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 border ${
                          selectedCareer.status === 'shortlisted' ? 'bg-green-500/10 text-green-600 border-green-500/20' :
                          selectedCareer.status === 'rejected' ? 'bg-red-500/10 text-red-600 border-red-500/20' :
                          'bg-brand-gold/10 text-brand-gold border-brand-gold/20'
                        }`}>
                          {selectedCareer.status || 'new'}
                        </span>
                        <button
                          onClick={async () => {
                            await updateCareerStatus(selectedCareer._id, 'shortlisted')
                            setSelectedCareer({ ...selectedCareer, status: 'shortlisted' })
                            loadData()
                            showToast('Application Shortlisted!')
                          }}
                          className="bg-black text-white hover:bg-brand-gold hover:text-black py-0.5 px-2 font-bold uppercase tracking-widest text-[8px] transition-colors cursor-pointer"
                        >
                          Shortlist
                        </button>
                        <button
                          onClick={async () => {
                            await updateCareerStatus(selectedCareer._id, 'rejected')
                            setSelectedCareer({ ...selectedCareer, status: 'rejected' })
                            loadData()
                            showToast('Application Rejected.')
                          }}
                          className="border border-red-200 text-red-500 hover:bg-red-50 py-0.5 px-2 font-bold uppercase tracking-widest text-[8px] transition-colors cursor-pointer"
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                    <button 
                      onClick={() => setSelectedCareer(null)}
                      className="border border-black/10 hover:border-black text-xs font-black uppercase tracking-widest px-4 py-2 flex items-center gap-1.5 transition-colors cursor-pointer bg-white"
                    >
                      <ArrowLeft size={14} /> Back to List
                    </button>
                  </div>

                  <div className="space-y-4 text-xs font-medium">
                    <div className="flex items-center gap-3">
                      <User className="text-brand-gold w-4 h-4" />
                      <span className="font-bold text-black">Experience: {selectedCareer.experience}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-y border-black/5 py-4 my-2">
                      <div className="flex items-center gap-3">
                        <Phone className="text-brand-gold w-4 h-4" />
                        <a href={`tel:${selectedCareer.phone}`} className="font-bold text-black hover:underline">{selectedCareer.phone}</a>
                      </div>
                      <div className="flex gap-2">
                        <a 
                          href={`tel:${selectedCareer.phone}`}
                          className="bg-black text-brand-gold hover:bg-brand-gold hover:text-black py-1.5 px-3 text-[9px] font-black uppercase tracking-widest flex items-center gap-1.5 transition-colors"
                        >
                          <Phone size={10} /> Call Candidate
                        </a>
                        <a 
                          href={`https://wa.me/${selectedCareer.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                            `Hello ${selectedCareer.name}, thank you for applying for the position of "${selectedCareer.position}" at Stryper. We have reviewed your experience and resume. Let us know when you are available for an interview call.`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-[#25D366] text-white hover:bg-black hover:text-[#25D366] py-1.5 px-3 text-[9px] font-black uppercase tracking-widest flex items-center gap-1.5 transition-colors border border-transparent hover:border-[#25D366]"
                        >
                          <WhatsAppIcon size={12} /> WhatsApp
                        </a>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="text-brand-gold w-4 h-4" />
                      <a href={`mailto:${selectedCareer.email}`} className="font-bold text-black hover:underline">{selectedCareer.email}</a>
                    </div>
                    {selectedCareer.portfolio && selectedCareer.portfolio !== 'Not Provided' && (
                      <div className="flex items-center gap-3 pt-2">
                        <Globe className="text-brand-gold w-4 h-4" />
                        <a href={selectedCareer.portfolio} target="_blank" rel="noopener noreferrer" className="font-bold text-black underline hover:text-brand-gold transition-colors">
                          Portfolio Website
                        </a>
                      </div>
                    )}
                  </div>

                  <div className="border-t border-black/10 pt-6 space-y-3">
                    <h4 className="text-[10px] font-black uppercase tracking-wider text-brand-champagne">Resume / CV File:</h4>
                    <div className="flex items-center justify-between border border-black/10 bg-black/[0.01] p-4 text-xs font-bold">
                      <span className="flex items-center gap-2">
                        <FileText size={16} className="text-brand-gold" />
                        {selectedCareer.resume_path ? (
                          <a
                            href={`/api/careers/${selectedCareer._id}/resume`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="truncate max-w-[250px] underline hover:text-brand-gold transition-colors cursor-pointer"
                          >
                            {selectedCareer.resume_name || 'Resume'}
                          </a>
                        ) : (
                          <span className="truncate max-w-[250px] text-black/40">No resume uploaded</span>
                        )}
                      </span>
                      {selectedCareer.resume_path && (
                        <a
                          href={`/api/careers/${selectedCareer._id}/resume`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-black text-brand-gold hover:bg-brand-gold hover:text-black py-1.5 px-4 uppercase tracking-widest text-[9px] transition-colors flex items-center gap-1.5 cursor-pointer"
                        >
                          <Download size={10} /> Download Resume
                        </a>
                      )}
                    </div>
                  </div>

                  {selectedCareer.message && (
                    <div className="space-y-2 border-t border-black/10 pt-6">
                      <h4 className="text-[10px] font-black uppercase tracking-wider text-brand-champagne">Applicant Cover Letter:</h4>
                      <p className="text-black/80 text-xs italic leading-relaxed bg-black/[0.01] p-4 border border-black/5">
                        "{selectedCareer.message}"
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                /* REGULAR CANDIDATES LIST TABLE */
                <>
                  <div>
                    <h1 className="text-black font-black text-3xl md:text-4xl uppercase tracking-wider font-serif">Careers Applications</h1>
                    <p className="text-black/50 text-xs font-black tracking-widest uppercase mt-1">Applicant submissions with resumes and portfolio details</p>
                  </div>

                  <div className="bg-[#F7F4EF] md:bg-white md:border md:border-black/5 md:shadow-md overflow-hidden">
                    {careers.length === 0 ? (
                      <div className="bg-white p-16 text-center text-black/40 italic border border-black/5 shadow-sm md:border-0 md:shadow-none">
                        No job applications logged yet.
                      </div>
                    ) : (
                      <>
                        {/* Mobile view cards */}
                        <div className="space-y-4 md:hidden">
                          {careers.map((car) => (
                            <div key={car._id} className="bg-white p-5 border border-black/5 shadow-sm space-y-4">
                              <div className="flex justify-between items-start gap-4">
                                <div className="space-y-1">
                                  <p className="font-bold text-black text-sm">{car.name}</p>
                                  <p className="text-[10px] text-black/50 truncate max-w-[180px]">{car.email}</p>
                                </div>
                                <span className="bg-black text-brand-gold py-1 px-2 border border-brand-gold/10 font-bold uppercase tracking-wider text-[8px] shrink-0">
                                  {car.position}
                                </span>
                              </div>
                              <div className="flex justify-between items-center text-[11px] border-t border-black/5 pt-3">
                                <span className="font-bold text-brand-champagne">Exp: {car.experience}</span>
                                <span className="flex items-center gap-1.5 text-black/70 truncate max-w-[150px]">
                                  <FileText size={12} className="text-brand-gold shrink-0" />
                                  {car.resume_path ? (
                                    <a
                                      href={`/api/careers/${car._id}/resume`}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="font-bold underline truncate hover:text-brand-gold transition-colors"
                                    >
                                      {car.resume_name || 'Resume'}
                                    </a>
                                  ) : (
                                    <span className="text-black/30 italic">No file</span>
                                  )}
                                </span>
                              </div>
                              <div className="flex gap-2 pt-2">
                                <button 
                                  onClick={() => setSelectedCareer(car)}
                                  className="flex-1 bg-black text-white hover:bg-brand-gold hover:text-black py-2.5 text-center font-bold uppercase tracking-widest text-[9px] transition-colors cursor-pointer"
                                >
                                  View Candidate
                                </button>
                                <button 
                                  onClick={() => deleteCareer(car._id)}
                                  className="border border-red-200 text-red-500 hover:bg-red-50 py-2.5 px-4 font-bold uppercase tracking-widest text-[9px] transition-colors cursor-pointer"
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Desktop view table */}
                        <div className="hidden md:block overflow-x-auto">
                          <table className="w-full text-left border-collapse">
                            <thead>
                              <tr className="bg-black text-brand-gold text-[10px] font-black tracking-widest uppercase border-b border-black/10">
                                <th className="py-4 px-6">Candidate</th>
                                <th className="py-4 px-6">Target Role</th>
                                <th className="py-4 px-6">Experience</th>
                                <th className="py-4 px-6">Resume File</th>
                                <th className="py-4 px-6 text-right">Actions</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-black/5 text-xs">
                              {careers.map((car) => (
                                <tr key={car._id} className="hover:bg-black/[0.01] transition-colors">
                                  <td className="py-4 px-6">
                                    <p className="font-bold text-black">{car.name}</p>
                                    <p className="text-[10px] text-black/50">{car.email}</p>
                                  </td>
                                  <td className="py-4 px-6 font-bold uppercase tracking-wider text-[10px] text-black">{car.position}</td>
                                  <td className="py-4 px-6 font-bold text-brand-champagne">{car.experience}</td>
                                  <td className="py-4 px-6">
                                    <span className="flex items-center gap-1.5 text-black/70">
                                      <FileText size={12} className="text-brand-gold" />
                                      {car.resume_path ? (
                                        <a
                                          href={`/api/careers/${car._id}/resume`}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="font-bold underline truncate max-w-[150px] hover:text-brand-gold transition-colors"
                                        >
                                          {car.resume_name || 'Resume'}
                                        </a>
                                      ) : (
                                        <span className="text-black/30 italic text-[10px]">No file</span>
                                      )}
                                    </span>
                                  </td>
                                  <td className="py-4 px-6 text-right space-x-2">
                                    <button 
                                      onClick={() => setSelectedCareer(car)}
                                      className="bg-black text-white hover:bg-brand-gold hover:text-black py-1.5 px-3 font-bold uppercase tracking-widest text-[9px] transition-colors cursor-pointer"
                                    >
                                      View Candidate
                                    </button>
                                    <button 
                                      onClick={() => deleteCareer(car._id)}
                                      className="border border-red-200 text-red-500 hover:bg-red-50 py-1.5 px-3 font-bold uppercase tracking-widest text-[9px] transition-colors cursor-pointer"
                                    >
                                      Delete
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </>
                    )}
                  </div>
                </>
              )}
            </div>
          )}

          {/* Tab content: Manage Projects */}
          {activeTab === 'manage-projects' && (
            <div className="space-y-8">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-black font-black text-3xl md:text-4xl uppercase tracking-wider font-serif">Manage Projects</h1>
                  <p className="text-black/50 text-xs font-black tracking-widest uppercase mt-1">View and delete portfolio projects</p>
                </div>
                <button 
                  onClick={() => setActiveTab('add-project')}
                  className="bg-black text-brand-gold hover:bg-brand-gold hover:text-black py-2.5 px-6 font-black uppercase tracking-widest text-[10px] transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Plus size={14} /> Add New Project
                </button>
              </div>

              <div className="bg-white border border-black/5 shadow-md overflow-hidden">
                {projects.length === 0 ? (
                  <div className="p-16 text-center text-black/40 italic">
                    No projects available. Click "Add New Project" to create one.
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-black text-brand-gold text-[10px] font-black tracking-widest uppercase border-b border-black/10">
                          <th className="py-4 px-6">Project Image & Title</th>
                          <th className="py-4 px-6">Category</th>
                          <th className="py-4 px-6">Location</th>
                          <th className="py-4 px-6 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-black/5 text-xs font-medium">
                        {projects.map((proj) => (
                          <tr key={proj.slug} className="hover:bg-black/[0.01] transition-colors">
                            <td className="py-4 px-6 flex items-center gap-4">
                              <img src={proj.image} alt={proj.title} className="w-12 h-12 object-cover border border-black/10" />
                              <div>
                                <p className="font-bold text-black text-sm">{proj.title}</p>
                                <p className="text-[10px] text-black/40">Client: {proj.client}</p>
                              </div>
                            </td>
                            <td className="py-4 px-6">
                              <span className="bg-black text-brand-gold py-1 px-2.5 text-[9px] font-black uppercase tracking-widest">
                                {proj.category}
                              </span>
                            </td>
                            <td className="py-4 px-6">{proj.location}</td>
                            <td className="py-4 px-6 text-right">
                              <button 
                                onClick={() => handleDeleteProject(proj.slug)}
                                className="border border-red-200 text-red-500 hover:bg-red-50 py-1.5 px-3 font-bold uppercase tracking-widest text-[9px] transition-colors cursor-pointer"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Tab content: Manage Blogs */}
          {activeTab === 'manage-blogs' && (
            <div className="space-y-8">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-black font-black text-3xl md:text-4xl uppercase tracking-wider font-serif">Manage Blogs</h1>
                  <p className="text-black/50 text-xs font-black tracking-widest uppercase mt-1">View and delete blog posts</p>
                </div>
                <button 
                  onClick={() => setActiveTab('add-blog')}
                  className="bg-black text-brand-gold hover:bg-brand-gold hover:text-black py-2.5 px-6 font-black uppercase tracking-widest text-[10px] transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Plus size={14} /> Add New Blog Post
                </button>
              </div>

              <div className="bg-white border border-black/5 shadow-md overflow-hidden">
                {blogs.length === 0 ? (
                  <div className="p-16 text-center text-black/40 italic">
                    No blogs published yet. Click "Add New Blog Post" to publish one.
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-black text-brand-gold text-[10px] font-black tracking-widest uppercase border-b border-black/10">
                          <th className="py-4 px-6">Blog Banner & Title</th>
                          <th className="py-4 px-6">Category</th>
                          <th className="py-4 px-6">Date</th>
                          <th className="py-4 px-6 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-black/5 text-xs font-medium">
                        {blogs.map((b) => (
                          <tr key={b.slug} className="hover:bg-black/[0.01] transition-colors">
                            <td className="py-4 px-6 flex items-center gap-4">
                              <img src={b.image} alt={b.title} className="w-16 h-10 object-cover border border-black/10" />
                              <div>
                                <p className="font-bold text-black text-sm">{b.title}</p>
                                <p className="text-[10px] text-black/40">Author: {b.author}</p>
                              </div>
                            </td>
                            <td className="py-4 px-6">
                              <span className="bg-black text-brand-gold py-1 px-2.5 text-[9px] font-black uppercase tracking-widest">
                                {b.category}
                              </span>
                            </td>
                            <td className="py-4 px-6 font-mono text-black/50">{b.date}</td>
                            <td className="py-4 px-6 text-right">
                              <button 
                                onClick={() => handleDeleteBlog(b.slug)}
                                className="border border-red-200 text-red-500 hover:bg-red-50 py-1.5 px-3 font-bold uppercase tracking-widest text-[9px] transition-colors cursor-pointer"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Tab content: Manage Testimonials */}
          {activeTab === 'testimonials' && (
            <div className="space-y-8 max-w-6xl">
              <div>
                <h1 className="text-black font-black text-3xl md:text-4xl uppercase tracking-wider font-serif flex items-center gap-3">
                  <Award className="text-brand-gold w-8 h-8 shrink-0" /> Manage Testimonials
                </h1>
                <p className="text-black/50 text-xs font-black tracking-widest uppercase mt-1">Manage client reviews and testimonials displayed on home page</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start text-left">
                {/* Add Testimonial Form */}
                <form onSubmit={handleTestimonialSubmit} className="lg:col-span-7 bg-white p-6 sm:p-8 border border-black/5 shadow-md space-y-6">
                  <h3 className="text-black font-black text-lg uppercase tracking-wider border-b border-black/5 pb-2 font-serif">Add New Review</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="text-xs font-bold text-black/70 uppercase tracking-wide mb-2 block">Client Name</label>
                      <input 
                        type="text" 
                        required
                        value={testimonialForm.name}
                        onChange={(e) => setTestimonialForm({ ...testimonialForm, name: e.target.value })}
                        placeholder="e.g. Vikram Malhotra"
                        className="w-full px-4 py-3 bg-[#F8F9FA] border border-black/15 focus:border-black focus:bg-white transition-colors outline-none font-medium text-sm text-black"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-black/70 uppercase tracking-wide mb-2 block">Designation / Role</label>
                      <input 
                        type="text" 
                        required
                        value={testimonialForm.role}
                        onChange={(e) => setTestimonialForm({ ...testimonialForm, role: e.target.value })}
                        placeholder="e.g. CEO, Malhotra Infra"
                        className="w-full px-4 py-3 bg-[#F8F9FA] border border-black/15 focus:border-black focus:bg-white transition-colors outline-none font-medium text-sm text-black"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="text-xs font-bold text-black/70 uppercase tracking-wide mb-2 block">Rating (1 to 5 Stars)</label>
                      <select 
                        value={testimonialForm.rating}
                        onChange={(e) => setTestimonialForm({ ...testimonialForm, rating: e.target.value })}
                        className="w-full px-4 py-3 bg-[#F8F9FA] border border-black/15 focus:border-black focus:bg-white transition-colors outline-none font-medium text-sm text-black cursor-pointer"
                      >
                        <option value="5">5 Stars ⭐⭐⭐⭐⭐</option>
                        <option value="4">4 Stars ⭐⭐⭐⭐</option>
                        <option value="3">3 Stars ⭐⭐⭐</option>
                        <option value="2">2 Stars ⭐⭐</option>
                        <option value="1">1 Star ⭐</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-bold text-black/70 uppercase tracking-wide mb-2 block">Client Avatar URL (Optional)</label>
                      <input 
                        type="url" 
                        value={testimonialForm.image}
                        onChange={(e) => setTestimonialForm({ ...testimonialForm, image: e.target.value })}
                        placeholder="Paste image web URL..."
                        className="w-full px-4 py-3 bg-[#F8F9FA] border border-black/15 focus:border-black focus:bg-white transition-colors outline-none font-medium text-sm text-black"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-black/70 uppercase tracking-wide mb-2 block">Review Message</label>
                    <textarea 
                      required
                      value={testimonialForm.text}
                      onChange={(e) => setTestimonialForm({ ...testimonialForm, text: e.target.value })}
                      placeholder="Write the client's detailed feedback..."
                      rows="4"
                      className="w-full px-4 py-3 bg-[#F8F9FA] border border-black/15 focus:border-black focus:bg-white transition-colors outline-none font-medium text-sm text-black resize-none"
                    />
                  </div>

                  <button 
                    type="submit" 
                    className="w-full bg-black text-brand-gold hover:bg-brand-gold hover:text-black font-black uppercase tracking-[0.2em] text-xs py-4 transition-colors flex items-center justify-center gap-2 cursor-pointer border border-transparent hover:border-black"
                  >
                    <Plus size={16} /> Publish Review
                  </button>
                </form>

                {/* List Testimonials */}
                <div className="lg:col-span-5 space-y-6">
                  <div className="bg-white p-6 border border-brand-gold/20 shadow-md">
                    <span className="text-[10px] font-black text-brand-gold uppercase tracking-wider block border-b border-black/5 pb-3">Active Reviews ({testimonials.length})</span>
                    <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 mt-4">
                      {testimonials.map((t) => (
                        <div key={t._id || t.name} className="p-4 border border-black/5 bg-[#F8F9FA] space-y-3 relative text-left">
                          <button 
                            type="button" 
                            onClick={() => handleDeleteTestimonial(t._id || t.name)}
                            className="absolute top-3 right-3 text-red-500 hover:text-red-700 p-1 cursor-pointer transition-colors"
                            title="Delete Review"
                          >
                            <Trash2 size={14} />
                          </button>
                          
                          <div className="flex items-center gap-3">
                            <img src={t.image} alt={t.name} className="w-10 h-10 rounded-full object-cover border border-black/5" />
                            <div>
                              <h4 className="font-bold text-xs text-black">{t.name}</h4>
                              <p className="text-[9px] text-black/50">{t.role}</p>
                            </div>
                          </div>
                          
                          <div className="text-[10px] text-brand-gold flex gap-0.5">
                            {Array.from({ length: t.rating }).map((_, i) => (
                              <span key={i}>★</span>
                            ))}
                          </div>
                          
                          <p className="text-[10px] text-black/70 italic leading-relaxed">
                            "{t.text}"
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab content: Site Settings & Security */}
          {activeTab === 'settings' && (
            <div className="space-y-8 max-w-4xl">
              <div>
                <h1 className="text-black font-black text-3xl md:text-4xl uppercase tracking-wider font-serif flex items-center gap-3">
                  <Globe className="text-brand-gold w-8 h-8 shrink-0" /> Settings & Security
                </h1>
                <p className="text-black/50 text-xs font-black tracking-widest uppercase mt-1">Manage contact coordinates, branding information, and security credentials</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                {/* Contact and General Settings Form */}
                <form onSubmit={handleSettingsSubmit} className="bg-white p-6 sm:p-8 border border-black/5 shadow-md space-y-6 text-left">
                  <h3 className="text-black font-black text-lg uppercase tracking-wider border-b border-black/5 pb-2 font-serif">Site Coordinates</h3>
                  
                  <div>
                    <label className="text-xs font-bold text-black/70 uppercase tracking-wide mb-2 block">Primary Phone Number</label>
                    <input 
                      type="text" 
                      required
                      value={settingsForm.phone}
                      onChange={(e) => setSettingsForm({ ...settingsForm, phone: e.target.value })}
                      className="w-full px-4 py-3 bg-[#F8F9FA] border border-black/15 focus:border-black focus:bg-white transition-colors outline-none font-medium text-sm text-black"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-black/70 uppercase tracking-wide mb-2 block">Contact Email Address</label>
                    <input 
                      type="email" 
                      required
                      value={settingsForm.email}
                      onChange={(e) => setSettingsForm({ ...settingsForm, email: e.target.value })}
                      className="w-full px-4 py-3 bg-[#F8F9FA] border border-black/15 focus:border-black focus:bg-white transition-colors outline-none font-medium text-sm text-black"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-black/70 uppercase tracking-wide mb-2 block">Office Location / Address</label>
                    <input 
                      type="text" 
                      required
                      value={settingsForm.address}
                      onChange={(e) => setSettingsForm({ ...settingsForm, address: e.target.value })}
                      className="w-full px-4 py-3 bg-[#F8F9FA] border border-black/15 focus:border-black focus:bg-white transition-colors outline-none font-medium text-sm text-black"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-black/70 uppercase tracking-wide mb-2 block">WhatsApp Link ID</label>
                      <input 
                        type="text" 
                        required
                        value={settingsForm.whatsapp}
                        onChange={(e) => setSettingsForm({ ...settingsForm, whatsapp: e.target.value })}
                        className="w-full px-4 py-3 bg-[#F8F9FA] border border-black/15 focus:border-black focus:bg-white transition-colors outline-none font-medium text-sm text-black"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-black/70 uppercase tracking-wide mb-2 block">Est. Year</label>
                      <input 
                        type="text" 
                        required
                        value={settingsForm.est}
                        onChange={(e) => setSettingsForm({ ...settingsForm, est: e.target.value })}
                        className="w-full px-4 py-3 bg-[#F8F9FA] border border-black/15 focus:border-black focus:bg-white transition-colors outline-none font-medium text-sm text-black"
                      />
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    className="w-full bg-black text-brand-gold hover:bg-brand-gold hover:text-black font-black uppercase tracking-[0.2em] text-xs py-4 transition-colors flex items-center justify-center gap-2 cursor-pointer border border-transparent hover:border-black"
                  >
                    Save Coordinates
                  </button>
                </form>

                {/* Change Password Form */}
                <form onSubmit={handlePasswordChangeSubmit} className="bg-white p-6 sm:p-8 border border-black/5 shadow-md space-y-6 text-left">
                  <h3 className="text-black font-black text-lg uppercase tracking-wider border-b border-black/5 pb-2 font-serif">Security Portal</h3>
                  
                  <div>
                    <label className="text-xs font-bold text-black/70 uppercase tracking-wide mb-2 block">Current Password</label>
                    <input 
                      type="password" 
                      required
                      value={currentPasswordVal}
                      onChange={(e) => setCurrentPasswordVal(e.target.value)}
                      placeholder="Enter current password"
                      className="w-full px-4 py-3 bg-[#F8F9FA] border border-black/15 focus:border-black focus:bg-white transition-colors outline-none font-medium text-sm text-black"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-black/70 uppercase tracking-wide mb-2 block">New Terminal Password</label>
                    <input 
                      type="password" 
                      required
                      value={newPasswordVal}
                      onChange={(e) => setNewPasswordVal(e.target.value)}
                      placeholder="Enter new password"
                      className="w-full px-4 py-3 bg-[#F8F9FA] border border-black/15 focus:border-black focus:bg-white transition-colors outline-none font-medium text-sm text-black"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-black/70 uppercase tracking-wide mb-2 block">Confirm Password</label>
                    <input 
                      type="password" 
                      required
                      value={confirmPasswordVal}
                      onChange={(e) => setConfirmPasswordVal(e.target.value)}
                      placeholder="Confirm new password"
                      className="w-full px-4 py-3 bg-[#F8F9FA] border border-black/15 focus:border-black focus:bg-white transition-colors outline-none font-medium text-sm text-black"
                    />
                  </div>

                  <button 
                    type="submit" 
                    className="w-full bg-black text-brand-gold hover:bg-brand-gold hover:text-black font-black uppercase tracking-[0.2em] text-xs py-4 transition-colors flex items-center justify-center gap-2 cursor-pointer border border-transparent hover:border-black"
                  >
                    Update Password
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* Tab content: Add Project */}
          {activeTab === 'add-project' && (
            <div className="space-y-8 max-w-6xl">
              <div>
                <h1 className="text-black font-black text-3xl md:text-4xl uppercase tracking-wider font-serif flex items-center gap-3">
                  <FolderKanban className="text-brand-gold w-8 h-8 shrink-0" /> Add Project
                </h1>
                <p className="text-black/50 text-xs font-black tracking-widest uppercase mt-1">Publish completed projects directly to Stryper gallery</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">


                <form onSubmit={handleProjectSubmit} className="lg:col-span-7 bg-white p-6 sm:p-8 border border-black/5 shadow-md space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="text-xs font-bold text-black/70 uppercase tracking-wide mb-2 block">Project Title</label>
                    <input 
                      type="text" 
                      required
                      value={projectForm.title}
                      onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                      placeholder="e.g. Modern Corporate Hub"
                      className="w-full px-4 py-3 bg-[#F8F9FA] border border-black/15 focus:border-black focus:bg-white transition-colors outline-none font-medium text-sm text-black"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-black/70 uppercase tracking-wide mb-2 block">Category</label>
                    <select 
                      value={projectForm.category}
                      onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                      className="w-full px-4 py-3 bg-[#F8F9FA] border border-black/15 focus:border-black focus:bg-white transition-colors outline-none font-medium text-sm text-black cursor-pointer"
                    >
                      <option value="Residential">Residential</option>
                      <option value="Hospitality">Hospitality</option>
                      <option value="Commercial">Commercial</option>
                      <option value="Infrastructure">Infrastructure</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="text-xs font-bold text-black/70 uppercase tracking-wide mb-2 block">Location</label>
                    <input 
                      type="text" 
                      required
                      value={projectForm.location}
                      onChange={(e) => setProjectForm({ ...projectForm, location: e.target.value })}
                      placeholder="e.g. Jaipur, Rajasthan"
                      className="w-full px-4 py-3 bg-[#F8F9FA] border border-black/15 focus:border-black focus:bg-white transition-colors outline-none font-medium text-sm text-black"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-black/70 uppercase tracking-wide mb-2 block">Client Name</label>
                    <input 
                      type="text" 
                      required
                      value={projectForm.client}
                      onChange={(e) => setProjectForm({ ...projectForm, client: e.target.value })}
                      placeholder="e.g. Singhal Holdings Ltd"
                      className="w-full px-4 py-3 bg-[#F8F9FA] border border-black/15 focus:border-black focus:bg-white transition-colors outline-none font-medium text-sm text-black"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="text-xs font-bold text-black/70 uppercase tracking-wide mb-2 block">Area / Size</label>
                    <input 
                      type="text" 
                      required
                      value={projectForm.area}
                      onChange={(e) => setProjectForm({ ...projectForm, area: e.target.value })}
                      placeholder="e.g. 15,000 sq.ft."
                      className="w-full px-4 py-3 bg-[#F8F9FA] border border-black/15 focus:border-black focus:bg-white transition-colors outline-none font-medium text-sm text-black"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-black/70 uppercase tracking-wide mb-2 block">Project Duration</label>
                    <input 
                      type="text" 
                      required
                      value={projectForm.duration}
                      onChange={(e) => setProjectForm({ ...projectForm, duration: e.target.value })}
                      placeholder="e.g. 6 Months"
                      className="w-full px-4 py-3 bg-[#F8F9FA] border border-black/15 focus:border-black focus:bg-white transition-colors outline-none font-medium text-sm text-black"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-black/70 uppercase tracking-wide mb-2 block">Key Features (Comma Separated)</label>
                  <input 
                    type="text" 
                    value={projectForm.features}
                    onChange={(e) => setProjectForm({ ...projectForm, features: e.target.value })}
                    placeholder="e.g. Italian Flooring, Smart HVAC, CNC Partitions"
                    className="w-full px-4 py-3 bg-[#F8F9FA] border border-black/15 focus:border-black focus:bg-white transition-colors outline-none font-medium text-sm text-black"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-black/70 uppercase tracking-wide mb-2 block">Project Description</label>
                  <textarea 
                    required
                    value={projectForm.description}
                    onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                    placeholder="Describe the structural planning, architectural details, and layout brief..."
                    rows="4"
                    className="w-full px-4 py-3 bg-[#F8F9FA] border border-black/15 focus:border-black focus:bg-white transition-colors outline-none font-medium text-sm text-black resize-none"
                  />
                </div>

                {/* Drag-and-drop / URL Upload */}
                <div>
                  <label className="text-xs font-bold text-black/70 uppercase tracking-wide mb-2 block">Project Cover Image</label>
                  <div className="border border-black/10 p-5 bg-[#F8F9FA]">
                    {projectImage ? (
                      <div className="relative aspect-video max-h-[220px] w-full overflow-hidden border border-black/5 bg-black/5">
                        <img src={projectImage} alt="Preview" className="w-full h-full object-cover" />
                        <button 
                          type="button" 
                          onClick={() => setProjectImage(null)}
                          className="absolute top-3 right-3 bg-black hover:bg-brand-gold text-white hover:text-black p-2 transition-colors cursor-pointer"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                        {/* Drag zone */}
                        <div 
                          onDragEnter={handleProjDrag}
                          onDragOver={handleProjDrag}
                          onDragLeave={handleProjDrag}
                          onDrop={handleProjDrop}
                          onClick={() => projFileInputRef.current.click()}
                          className={`border-2 border-dashed p-6 text-center cursor-pointer transition-colors flex flex-col justify-center items-center h-[140px] bg-white ${
                            projDragActive ? 'border-brand-gold bg-brand-gold/5' : 'border-black/15 hover:border-black/50'
                          }`}
                        >
                          <input 
                            type="file"
                            ref={projFileInputRef}
                            onChange={handleProjFileChange}
                            accept="image/*"
                            className="hidden"
                          />
                          {isUploadingImage ? (
                            <>
                              <div className="w-6 h-6 border-2 border-brand-gold border-t-transparent rounded-full animate-spin mb-2" />
                              <span className="text-[11px] font-bold uppercase tracking-wider text-brand-gold">Uploading...</span>
                            </>
                          ) : (
                            <>
                              <Upload className="text-brand-gold w-6 h-6 mb-2" />
                              <span className="text-[11px] font-bold uppercase tracking-wider text-black">Upload Local Image</span>
                              <span className="text-[9px] text-black/40 mt-1 uppercase">Drag & Drop or click to browse</span>
                            </>
                          )}
                        </div>

                        {/* URL Zone */}
                        <div className="flex flex-col justify-center space-y-3">
                          <div className="flex items-center gap-3">
                            <div className="flex-1 h-[1px] bg-black/10" />
                            <span className="text-[9px] font-black uppercase text-black/30">OR</span>
                            <div className="flex-1 h-[1px] bg-black/10" />
                          </div>
                          
                          <div>
                            <label className="text-[9px] font-bold text-black/50 uppercase tracking-wider mb-1 block">Image Web URL</label>
                            <input 
                              type="url" 
                              placeholder="Paste image URL (e.g. Unsplash URL)..."
                              onChange={(e) => {
                                if (e.target.value.startsWith('http')) setProjectImage(e.target.value)
                              }}
                              className="w-full px-3 py-2 bg-white border border-black/15 focus:border-black transition-colors outline-none text-xs"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <button 
                  type="submit" 
                  className="w-full bg-black text-brand-gold hover:bg-brand-gold hover:text-black font-black uppercase tracking-[0.2em] text-xs py-4 transition-colors flex items-center justify-center gap-2 cursor-pointer border border-transparent hover:border-black"
                >
                  <Plus size={16} /> Publish Project
                </button>
              </form>

              {/* Right Column: Live Interactive Card Preview */}
              <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
                <div className="bg-white p-6 border border-black/5 shadow-md space-y-6">
                  <span className="text-[10px] font-black text-brand-gold uppercase tracking-wider block border-b border-black/5 pb-3">Project Card Preview</span>
                  <div className="relative aspect-[4/3] bg-black overflow-hidden shadow-lg">
                    <img 
                      src={projectImage || 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1000&auto=format&fit=crop'} 
                      alt="Project Preview" 
                      className="w-full h-full object-cover opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent"></div>
                    <div className="absolute bottom-6 left-6 right-6 text-white space-y-2 text-left">
                      <span className="text-[9px] font-black text-brand-gold uppercase tracking-[0.2em] block">
                        {projectForm.category || 'Residential'}
                      </span>
                      <h3 className="text-2xl font-black italic uppercase font-serif tracking-tight leading-tight">
                        {projectForm.title || 'Untitled Project'}
                      </h3>
                      <div className="flex items-center gap-4 text-[10px] uppercase font-bold text-white/60 tracking-wider">
                        <span>{projectForm.location || 'Location'}</span>
                        <span>•</span>
                        <span>{projectForm.area || 'Size'}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 bg-[#F8F9FA] p-4 border border-black/5 text-left">
                    <h4 className="text-xs font-black uppercase text-black/70">Submission Summary</h4>
                    <ul className="text-[10px] font-bold text-black/50 space-y-1.5 uppercase list-disc list-inside">
                      <li>Client: <span className="text-black/80">{projectForm.client || 'TBA'}</span></li>
                      <li>Duration: <span className="text-black/80">{projectForm.duration || 'TBA'}</span></li>
                      <li>Features: <span className="text-black/80">{projectForm.features || 'TBA'}</span></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      {/* Tab content: Add Blog */}
          {activeTab === 'add-blog' && (
            <div className="space-y-8 max-w-6xl">
              <div>
                <h1 className="text-black font-black text-3xl md:text-4xl uppercase tracking-wider font-serif flex items-center gap-3">
                  <FileText className="text-brand-gold w-8 h-8 shrink-0" /> Add Blog Post
                </h1>
                <p className="text-black/50 text-xs font-black tracking-widest uppercase mt-1">Publish architectural updates, designs, and case studies</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">


                <form onSubmit={handleBlogSubmit} className="lg:col-span-7 bg-white p-6 sm:p-8 border border-black/5 shadow-md space-y-6">
                <div>
                  <label className="text-xs font-bold text-black/70 uppercase tracking-wide mb-2 block">Blog Title</label>
                  <input 
                    type="text" 
                    required
                    value={blogForm.title}
                    onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                    placeholder="e.g. Smart Kitchen Planning Guide 2026"
                    className="w-full px-4 py-3 bg-[#F8F9FA] border border-black/15 focus:border-black focus:bg-white transition-colors outline-none font-medium text-sm text-black"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-black/70 uppercase tracking-wide mb-2 block">Subtitle / Executive Summary</label>
                  <input 
                    type="text" 
                    required
                    value={blogForm.subtitle}
                    onChange={(e) => setBlogForm({ ...blogForm, subtitle: e.target.value })}
                    placeholder="e.g. A breakdown of essential ergonomic zones and cabinet hardware integrations."
                    className="w-full px-4 py-3 bg-[#F8F9FA] border border-black/15 focus:border-black focus:bg-white transition-colors outline-none font-medium text-sm text-black"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="text-xs font-bold text-black/70 uppercase tracking-wide mb-2 block">Category</label>
                    <select 
                      value={blogForm.category}
                      onChange={(e) => setBlogForm({ ...blogForm, category: e.target.value })}
                      className="w-full px-4 py-3 bg-[#F8F9FA] border border-black/15 focus:border-black focus:bg-white transition-colors outline-none font-medium text-sm text-black cursor-pointer"
                    >
                      <option value="Residential">Residential</option>
                      <option value="Hospitality">Hospitality</option>
                      <option value="Commercial">Commercial</option>
                      <option value="Infrastructure">Infrastructure</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-black/70 uppercase tracking-wide mb-2 block">Author Name</label>
                    <input 
                      type="text" 
                      required
                      value={blogForm.author}
                      onChange={(e) => setBlogForm({ ...blogForm, author: e.target.value })}
                      placeholder="e.g. Sunidhi Rawat (Lead Architect)"
                      className="w-full px-4 py-3 bg-[#F8F9FA] border border-black/15 focus:border-black focus:bg-white transition-colors outline-none font-medium text-sm text-black"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-black/70 uppercase tracking-wide mb-2 block">Article Content</label>
                  <textarea 
                    required
                    value={blogForm.content}
                    onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                    placeholder="Write detailed article paragraphs..."
                    rows="6"
                    className="w-full px-4 py-3 bg-[#F8F9FA] border border-black/15 focus:border-black focus:bg-white transition-colors outline-none font-medium text-sm text-black resize-none"
                  />
                </div>

                {/* Drag-and-drop / URL Upload for Blog */}
                <div>
                  <label className="text-xs font-bold text-black/70 uppercase tracking-wide mb-2 block">Article Image</label>
                  <div className="border border-black/10 p-5 bg-[#F8F9FA]">
                    {blogImage ? (
                      <div className="relative aspect-video max-h-[220px] w-full overflow-hidden border border-black/5 bg-black/5">
                        <img src={blogImage} alt="Preview" className="w-full h-full object-cover" />
                        <button 
                          type="button" 
                          onClick={() => setBlogImage(null)}
                          className="absolute top-3 right-3 bg-black hover:bg-brand-gold text-white hover:text-black p-2 transition-colors cursor-pointer"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                        {/* Drag zone */}
                        <div 
                          onDragEnter={handleBlogDrag}
                          onDragOver={handleBlogDrag}
                          onDragLeave={handleBlogDrag}
                          onDrop={handleBlogDrop}
                          onClick={() => blogFileInputRef.current.click()}
                          className={`border-2 border-dashed p-6 text-center cursor-pointer transition-colors flex flex-col justify-center items-center h-[140px] bg-white ${
                            blogDragActive ? 'border-brand-gold bg-brand-gold/5' : 'border-black/15 hover:border-black/50'
                          }`}
                        >
                          <input 
                            type="file"
                            ref={blogFileInputRef}
                            onChange={handleBlogFileChange}
                            accept="image/*"
                            className="hidden"
                          />
                          {isUploadingImage ? (
                            <>
                              <div className="w-6 h-6 border-2 border-brand-gold border-t-transparent rounded-full animate-spin mb-2" />
                              <span className="text-[11px] font-bold uppercase tracking-wider text-brand-gold">Uploading...</span>
                            </>
                          ) : (
                            <>
                              <Upload className="text-brand-gold w-6 h-6 mb-2" />
                              <span className="text-[11px] font-bold uppercase tracking-wider text-black">Upload Local Image</span>
                              <span className="text-[9px] text-black/40 mt-1 uppercase">Drag & Drop or click to browse</span>
                            </>
                          )}
                        </div>

                        {/* URL Zone */}
                        <div className="flex flex-col justify-center space-y-3">
                          <div className="flex items-center gap-3">
                            <div className="flex-1 h-[1px] bg-black/10" />
                            <span className="text-[9px] font-black uppercase text-black/30">OR</span>
                            <div className="flex-1 h-[1px] bg-black/10" />
                          </div>
                          
                          <div>
                            <label className="text-[9px] font-bold text-black/50 uppercase tracking-wider mb-1 block">Image Web URL</label>
                            <input 
                              type="url" 
                              placeholder="Paste image URL (e.g. Unsplash URL)..."
                              onChange={(e) => {
                                if (e.target.value.startsWith('http')) setBlogImage(e.target.value)
                              }}
                              className="w-full px-3 py-2 bg-white border border-black/15 focus:border-black transition-colors outline-none text-xs"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <button 
                  type="submit" 
                  className="w-full bg-black text-brand-gold hover:bg-brand-gold hover:text-black font-black uppercase tracking-[0.2em] text-xs py-4 transition-colors flex items-center justify-center gap-2 cursor-pointer border border-transparent hover:border-black"
                >
                  <Plus size={16} /> Publish Blog Post
                </button>
              </form>

              {/* Right Column: Live Blog Card Preview */}
              <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
                <div className="bg-white p-6 border border-black/5 shadow-md space-y-6">
                  <span className="text-[10px] font-black text-brand-gold uppercase tracking-wider block border-b border-black/5 pb-3">Blog Card Preview</span>
                  <div className="relative aspect-[16/10] bg-black overflow-hidden shadow-lg">
                    <img 
                      src={blogImage || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=1000&auto=format&fit=crop'} 
                      alt="Blog Preview" 
                      className="w-full h-full object-cover opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4 text-white space-y-1 text-left">
                      <span className="text-[8px] font-black text-brand-gold uppercase tracking-[0.2em] block">
                        {blogForm.category || 'Category'} • {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                      </span>
                      <h3 className="text-lg font-black italic uppercase font-serif tracking-tight leading-tight">
                        {blogForm.title || 'Untitled Blog Post'}
                      </h3>
                      <p className="text-[9px] text-white/70 line-clamp-2 leading-relaxed">
                        {blogForm.subtitle || 'Article subtitle or short executive summary...'}
                      </p>
                      <span className="text-[8px] font-bold text-white/50 block pt-1">BY: {blogForm.author || 'Author'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      </div>
    </div>
  )
}

export default Admin
