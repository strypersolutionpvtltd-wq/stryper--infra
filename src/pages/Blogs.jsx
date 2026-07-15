import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import { ArrowLeft, BookOpen, Calendar, User, X, SlidersHorizontal, BookMarked } from 'lucide-react'
import { getBlogs } from '../data/store'

const Blogs = () => {
  const [blogs, setBlogs] = useState([])
  const [activeFilter, setActiveFilter] = useState('All')
  const [selectedBlog, setSelectedBlog] = useState(null)
  const location = useLocation()

  useEffect(() => {
    const load = async () => {
      const allBlogs = await getBlogs()
      setBlogs(allBlogs)
      
      const queryParams = new URLSearchParams(location.search)
      const slugToOpen = queryParams.get('slug')
      if (slugToOpen) {
        const found = allBlogs.find(b => b.slug === slugToOpen)
        if (found) {
          setSelectedBlog(found)
        }
      }
    }
    load()
  }, [location.search])

  const categories = ['All', 'Residential', 'Commercial', 'Infrastructure']

  const filteredBlogs = activeFilter === 'All'
    ? blogs
    : blogs.filter(b => b.category.toLowerCase() === activeFilter.toLowerCase())

  // Estimate reading time helper
  const getReadTime = (content) => {
    const words = content.split(/\s+/).length
    const wpm = 200 // average reading speed
    const minutes = Math.ceil(words / wpm)
    return `${minutes} Min Read`
  }

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
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="h-px w-12 bg-brand-gold"></span>
            <span className="text-[10px] font-black text-brand-gold uppercase tracking-[0.4em]">Design & Engineering Insight</span>
            <span className="h-px w-12 bg-brand-gold"></span>
          </div>
          <h1 className="text-black font-black text-4xl md:text-6xl mb-6 uppercase tracking-wider italic">
            Latest <span className="text-brand-gold not-italic">Blogs</span>
          </h1>
          <p className="text-black/60 text-sm md:text-base font-medium leading-relaxed">
            Case histories, structural planning blueprints, and custom interior setup strategies compiled by our specialists.
          </p>
        </div>

        {/* Filter Toolbar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-black/10 pb-8 mb-12">
          <div className="flex items-center gap-2 text-brand-champagne font-black text-[10px] uppercase tracking-widest">
            <SlidersHorizontal size={14} className="text-brand-gold" /> Filter Categories
          </div>
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`py-2 px-5 text-[9px] font-black uppercase tracking-[0.2em] transition-all duration-300 rounded-none border ${
                  activeFilter === cat 
                    ? 'bg-black text-brand-gold border-black' 
                    : 'bg-transparent text-black/60 border-black/10 hover:border-black/30 hover:text-black'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Blogs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredBlogs.map((blog, index) => (
              <motion.div
                layout
                key={blog.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="group bg-white border border-black/5 hover:border-brand-gold/30 transition-all duration-500 shadow-md hover:shadow-xl flex flex-col justify-between"
              >
                {/* Image wrapping */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-black">
                  <img 
                    src={blog.image} 
                    alt={blog.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 bg-black text-brand-gold py-1 px-2.5 border border-brand-gold/10 text-[8px] font-black uppercase tracking-widest">
                    {blog.category}
                  </div>
                </div>

                {/* Content info */}
                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-4 text-black/50 text-[9px] font-bold uppercase tracking-wider">
                      <span className="flex items-center gap-1"><Calendar size={11} className="text-brand-gold" /> {blog.date}</span>
                      <span>•</span>
                      <span>{getReadTime(blog.content)}</span>
                    </div>
                    <h3 className="text-black text-lg font-black font-serif uppercase tracking-tight group-hover:text-brand-champagne transition-colors line-clamp-2">
                      {blog.title}
                    </h3>
                    <p className="text-black/60 text-xs font-medium line-clamp-3 leading-relaxed">
                      {blog.subtitle}
                    </p>
                  </div>

                  <div className="border-t border-black/5 pt-5 flex items-center justify-between">
                    <span className="text-[9px] font-black text-black/40 uppercase tracking-wider flex items-center gap-1.5">
                      <User size={12} className="text-brand-gold" /> {blog.author.split('(')[0].trim()}
                    </span>
                    <button
                      onClick={() => setSelectedBlog(blog)}
                      className="text-[9px] font-black text-brand-gold hover:text-black uppercase tracking-widest inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      Read Article <BookOpen size={12} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredBlogs.length === 0 && (
          <div className="text-center py-20 text-black/40 italic">
            No articles published under this category yet.
          </div>
        )}
      </div>

      {/* Full screen reader modal */}
      <AnimatePresence>
        {selectedBlog && (
          <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 md:p-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 20 }}
              className="bg-white max-w-3xl w-full h-[85vh] sm:h-[80vh] border border-black/5 shadow-2xl relative flex flex-col"
            >
              {/* Header Close button */}
              <button
                onClick={() => setSelectedBlog(null)}
                className="absolute top-6 right-6 z-20 w-8 h-8 bg-black text-white hover:bg-brand-gold hover:text-black flex items-center justify-center rounded-full transition-colors cursor-pointer shadow-md"
              >
                <X size={16} />
              </button>

              {/* Scrollable container */}
              <div className="overflow-y-auto flex-1 p-6 sm:p-10 md:p-12 space-y-8 scroll-smooth">
                {/* Meta details */}
                <div className="space-y-4">
                  <span className="bg-black text-brand-gold py-1 px-3 border border-brand-gold/10 font-black uppercase tracking-widest text-[9px] inline-block">
                    {selectedBlog.category}
                  </span>
                  <h2 className="text-black text-2xl sm:text-4xl font-black font-serif uppercase tracking-tight leading-tight">
                    {selectedBlog.title}
                  </h2>
                  <p className="text-brand-champagne font-bold text-sm sm:text-base tracking-wide uppercase italic">
                    "{selectedBlog.subtitle}"
                  </p>
                  
                  <div className="flex flex-wrap items-center gap-6 text-[9px] font-black uppercase tracking-wider text-black/40 border-y border-black/10 py-3 mt-4">
                    <span className="flex items-center gap-1.5"><Calendar size={13} className="text-brand-gold" /> {selectedBlog.date}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1.5"><User size={13} className="text-brand-gold" /> {selectedBlog.author}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1.5"><BookMarked size={13} className="text-brand-gold" /> {getReadTime(selectedBlog.content)}</span>
                  </div>
                </div>

                {/* Article Image */}
                <div className="aspect-[16/9] w-full overflow-hidden bg-black border border-black/5 shadow-md">
                  <img 
                    src={selectedBlog.image} 
                    alt={selectedBlog.title} 
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content body */}
                <div className="prose max-w-none text-black/80 text-sm sm:text-base leading-relaxed text-justify-organic space-y-6 font-medium">
                  {selectedBlog.content.split('\n\n').map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>

                <div className="border-t border-black/10 pt-8 text-center">
                  <button
                    onClick={() => setSelectedBlog(null)}
                    className="btn-gold !text-[10px] !py-3 !px-12 cursor-pointer"
                  >
                    Close Article
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Blogs
