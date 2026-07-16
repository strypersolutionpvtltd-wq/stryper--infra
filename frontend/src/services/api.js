/**
 * api.js — Centralized API service for Stryper frontend
 * All calls go to /api/* which Vite proxy forwards to backend:3001
 */

const BASE = '/api'

// ─── Token helpers ─────────────────────────────────────────────────────────────
export const getToken = () => localStorage.getItem('stryper_token')
export const setToken = (t) => localStorage.setItem('stryper_token', t)
export const clearToken = () => localStorage.removeItem('stryper_token')

const authHeaders = () => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${getToken()}`
})

const jsonHeaders = () => ({ 'Content-Type': 'application/json' })

// Generic fetch wrapper — safe JSON parse, never throws on bad gateway
const api = async (url, options = {}) => {
  const res = await fetch(BASE + url, options)
  if (!res.ok) {
    // Return a safe failure object instead of crashing on HTML error pages (502 etc.)
    return { success: false, message: `HTTP ${res.status}` }
  }
  return await res.json()
}

// ─── AUTH ──────────────────────────────────────────────────────────────────────
export const loginAdmin = async (password) => {
  try {
    const data = await api('/auth/login', {
      method: 'POST',
      headers: jsonHeaders(),
      body: JSON.stringify({ password })
    })
    if (data.success && data.data?.token) {
      setToken(data.data.token)
      return { success: true }
    }
    return { success: false, message: data.message || 'Invalid password' }
  } catch {
    return { success: false, message: 'Backend offline. Check if server is running.' }
  }
}

export const logoutAdmin = () => {
  clearToken()
  sessionStorage.removeItem('stryper_admin_authenticated')
}

// ─── PROJECTS ─────────────────────────────────────────────────────────────────
export const getProjects = async (category = '') => {
  try {
    const url = category && category !== 'All'
      ? `/projects?category=${encodeURIComponent(category)}`
      : '/projects'
    const data = await api(url)
    return data.success ? data.data : []
  } catch { return [] }
}

export const addProject = async (projectData) => {
  try {
    const data = await api('/projects', {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify(projectData)
    })
    return data
  } catch (e) {
    return { success: false, message: e.message }
  }
}

export const deleteProject = async (slug) => {
  try {
    const data = await api(`/projects/${slug}`, {
      method: 'DELETE',
      headers: authHeaders()
    })
    return data
  } catch (e) {
    return { success: false, message: e.message }
  }
}

// ─── BLOGS ────────────────────────────────────────────────────────────────────
export const getBlogs = async (category = '') => {
  try {
    const url = category && category !== 'All'
      ? `/blogs?category=${encodeURIComponent(category)}`
      : '/blogs'
    const data = await api(url)
    return data.success ? data.data : []
  } catch { return [] }
}

export const addBlog = async (blogData) => {
  try {
    const data = await api('/blogs', {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify(blogData)
    })
    return data
  } catch (e) {
    return { success: false, message: e.message }
  }
}

export const deleteBlog = async (slug) => {
  try {
    const data = await api(`/blogs/${slug}`, {
      method: 'DELETE',
      headers: authHeaders()
    })
    return data
  } catch (e) {
    return { success: false, message: e.message }
  }
}

// ─── TESTIMONIALS ─────────────────────────────────────────────────────────────
export const getTestimonials = async () => {
  try {
    const data = await api('/testimonials')
    return data.success ? data.data : []
  } catch { return [] }
}

export const addTestimonial = async (testimonialData) => {
  try {
    const data = await api('/testimonials', {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify(testimonialData)
    })
    return data
  } catch (e) {
    return { success: false, message: e.message }
  }
}

export const deleteTestimonial = async (id) => {
  try {
    const data = await api(`/testimonials/${id}`, {
      method: 'DELETE',
      headers: authHeaders()
    })
    return data
  } catch (e) {
    return { success: false, message: e.message }
  }
}

// ─── INQUIRIES ────────────────────────────────────────────────────────────────
export const getInquiries = async () => {
  try {
    const data = await api('/inquiries', {
      headers: authHeaders()
    })
    return data.success ? data.data : []
  } catch { return [] }
}

export const submitInquiry = async (inquiryData) => {
  try {
    const data = await api('/inquiries', {
      method: 'POST',
      headers: jsonHeaders(),
      body: JSON.stringify(inquiryData)
    })
    return data
  } catch (e) {
    return { success: false, message: e.message }
  }
}

export const deleteInquiry = async (id) => {
  try {
    const data = await api(`/inquiries/${id}`, {
      method: 'DELETE',
      headers: authHeaders()
    })
    return data
  } catch (e) {
    return { success: false, message: e.message }
  }
}

export const updateInquiryStatus = async (id, status) => {
  try {
    const data = await api(`/inquiries/${id}/status`, {
      method: 'PATCH',
      headers: authHeaders(),
      body: JSON.stringify({ status })
    })
    return data
  } catch (e) {
    return { success: false, message: e.message }
  }
}

// ─── CAREERS ──────────────────────────────────────────────────────────────────
export const getCareers = async () => {
  try {
    const data = await api('/careers', {
      headers: authHeaders()
    })
    return data.success ? data.data : []
  } catch { return [] }
}

export const submitCareer = async (formData) => {
  try {
    const res = await fetch(BASE + '/careers', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${getToken()}` },
      body: formData
    })
    if (!res.ok) return { success: false, message: `HTTP ${res.status}` }
    return await res.json()
  } catch (e) {
    return { success: false, message: e.message }
  }
}

export const deleteCareer = async (id) => {
  try {
    const data = await api(`/careers/${id}`, {
      method: 'DELETE',
      headers: authHeaders()
    })
    return data
  } catch (e) {
    return { success: false, message: e.message }
  }
}

export const updateCareerStatus = async (id, status) => {
  try {
    const data = await api(`/careers/${id}/status`, {
      method: 'PATCH',
      headers: authHeaders(),
      body: JSON.stringify({ status })
    })
    return data
  } catch (e) {
    return { success: false, message: e.message }
  }
}

// ─── NOTIFICATIONS ────────────────────────────────────────────────────────────
export const getNotifications = async () => {
  try {
    const data = await api('/notifications', {
      headers: authHeaders()
    })
    return data.success ? data.data : []
  } catch { return [] }
}

export const getUnreadCount = async () => {
  try {
    const data = await api('/notifications/unread-count', {
      headers: authHeaders()
    })
    return data.success ? data.data.count : 0
  } catch { return 0 }
}

export const markAllNotificationsRead = async () => {
  try {
    await api('/notifications/read', {
      method: 'PATCH',
      headers: authHeaders()
    })
  } catch {}
}

export const clearAllNotifications = async () => {
  try {
    await api('/notifications', {
      method: 'DELETE',
      headers: authHeaders()
    })
  } catch {}
}

// ─── STATS ────────────────────────────────────────────────────────────────────
export const getStats = async () => {
  try {
    const data = await api('/stats', {
      headers: authHeaders()
    })
    return data.success ? data.data : null
  } catch { return null }
}

// Get detailed visitor list for admin modal
export const getVisitDetails = async (page = 1, limit = 50) => {
  try {
    const data = await api(`/stats/visits?page=${page}&limit=${limit}`, {
      headers: authHeaders()
    })
    return data.success ? data.data : null
  } catch { return null }
}

// Track a page visit — called from App.jsx on every route change
export const trackVisit = async (url) => {
  try {
    // Get or create a persistent session ID for this browser session
    let sessionId = sessionStorage.getItem('stryper_sid')
    if (!sessionId) {
      sessionId = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
      sessionStorage.setItem('stryper_sid', sessionId)
    }
    await fetch('/api/stats/increment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        url: url || window.location.pathname,
        sessionId,
        referrer: document.referrer || 'Direct'
      })
    })
  } catch { /* never break UX */ }
}

// ─── IMAGE UPLOAD → CLOUDINARY ────────────────────────────────────────────────
export const uploadImage = async (file) => {
  try {
    const formData = new FormData()
    formData.append('image', file)
    const res = await fetch(BASE + '/upload/image', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${getToken()}` },
      body: formData
    })
    if (!res.ok) return null
    const data = await res.json()
    if (data.success) return data.data.url  // Cloudinary URL
    return null
  } catch { return null }
}
