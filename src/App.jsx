import React, { Suspense, lazy, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'
import ScrollToTop from './components/ScrollToTop'
import { incrementVisitorCount } from './data/store'

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home'))
const ServiceDetail = lazy(() => import('./pages/ServiceDetail'))
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'))
const DynamicPage = lazy(() => import('./pages/DynamicPage'))
const Careers = lazy(() => import('./pages/Careers'))
const Admin = lazy(() => import('./pages/Admin'))
const ProjectGallery = lazy(() => import('./pages/ProjectGallery'))
const Awards = lazy(() => import('./pages/Awards'))
const Blogs = lazy(() => import('./pages/Blogs'))

function App() {
  const location = useLocation()
  const isAdminPath = location.pathname === '/admin'

  useEffect(() => {
    incrementVisitorCount()
  }, [location])

  return (
    <div className="min-h-screen bg-brand-cream">
      <ScrollToTop />
      {!isAdminPath && <Navbar />}
      <Suspense fallback={
        <div className="flex items-center justify-center min-h-screen bg-brand-cream">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-brand-gold border-t-transparent rounded-none animate-spin mx-auto mb-4"></div>
            <p className="text-brand-teal font-black text-xs uppercase tracking-[0.4em]">Stryper Loading...</p>
          </div>
        </div>
      }>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/service/:slug" element={<ServiceDetail />} />
          <Route path="/project/:slug" element={<ProjectDetail />} />
          <Route path="/page/:slug" element={<DynamicPage />} />
          <Route path="/work-with-us" element={<Careers />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/project-gallery" element={<ProjectGallery />} />
          <Route path="/awards-recognition" element={<Awards />} />
          <Route path="/blogs" element={<Blogs />} />
        </Routes>
      </Suspense>
      {!isAdminPath && <Footer />}
      {!isAdminPath && <WhatsAppButton />}
    </div>
  )
}

export default App
