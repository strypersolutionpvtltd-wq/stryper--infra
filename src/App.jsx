import React, { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'
import ScrollToTop from './components/ScrollToTop'

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home'))
const ServiceDetail = lazy(() => import('./pages/ServiceDetail'))
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'))

function App() {
  return (
    <div className="min-h-screen bg-brand-cream">
      <ScrollToTop />
      <Navbar />
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
        </Routes>
      </Suspense>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}

export default App
