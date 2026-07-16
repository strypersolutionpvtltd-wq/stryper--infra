// Unified Client-Side Data Store for Stryper website
// Uses localStorage to persist additions, updates, inquiries, and careers submissions

const DEFAULT_PROJECTS = [
  {
    slug: 'luxury-villa',
    title: 'Luxury Villa Restoration',
    location: 'Jaipur',
    category: 'Residential',
    client: 'Singhal Family',
    area: '12,500 sq.ft.',
    duration: '14 Months',
    description: 'A complete architectural and interior transformation of a sprawling private estate, combining traditional Rajasthani elements with ultra-modern luxury amenities.',
    features: ['Custom Italian Marble Flooring', 'Smart Home Automation', 'Bespoke Joinery', 'Landscape Integration'],
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2000&auto=format&fit=crop'
  },
  {
    slug: 'minimalist-apartment',
    title: 'Minimalist Penthouse',
    location: 'Delhi NCR',
    category: 'Residential',
    client: 'Kapoor Residence',
    area: '4,200 sq.ft.',
    duration: '5 Months',
    description: 'A sleek, minimalist approach to high-rise living. This project focused on maximizing natural light, clean lines, and integrated storage solutions.',
    features: ['Concealed Storage', 'Minimalist Lighting', 'Neutral Color Palette', 'High-end Fixtures'],
    image: 'https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?q=80&w=2000&auto=format&fit=crop'
  },
  {
    slug: 'heritage-hotel-fit-out',
    title: 'Heritage Palace Fit-out',
    location: 'Udaipur',
    category: 'Hospitality',
    client: 'Mewar Palace Resorts',
    area: '80,000 sq.ft.',
    duration: '22 Months',
    description: 'A sensitive yet extensive restoration and fit-out of a historic property, ensuring modern structural integrity while preserving its royal heritage.',
    features: ['Structural Reinforcement', 'Heritage Conservation', 'Luxury Suite Fit-outs', 'Custom Brass Fabrication'],
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2000&auto=format&fit=crop'
  },
  {
    slug: 'royal-boutique-hotel',
    title: 'Royal Boutique Hotel',
    location: 'Jodhpur',
    category: 'Hospitality',
    client: 'Desert Palms Group',
    area: '35,000 sq.ft.',
    duration: '12 Months',
    description: 'A premium boutique hotel featuring high-end modular fittings, carved wooden screens, and contemporary brass claddings.',
    features: ['Traditional Jali Partitions', 'Royal Suite Wood Joinery', 'Designer LED Mirrors', 'All-weather Outdoor Lounge'],
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=2000&auto=format&fit=crop'
  },
  {
    slug: 'modern-it-office',
    title: 'Smart Tech Workstations',
    location: 'Gurugram',
    category: 'Commercial',
    client: 'InnoTech Solutions',
    area: '45,000 sq.ft.',
    duration: '8 Months',
    description: 'A highly functional and agile workspace designed for a leading technology firm, fostering collaboration and productivity through open-plan layouts and ergonomic design.',
    features: ['Acoustic Meeting Pods', 'Ergonomic Workstations', 'Biophilic Design Elements', 'Advanced HVAC Systems'],
    image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2000&auto=format&fit=crop'
  },
  {
    slug: 'premium-banquet-hall',
    title: 'Grand Crystal Banquet',
    location: 'Jaipur',
    category: 'Commercial',
    client: 'Nirala Events',
    area: '25,000 sq.ft.',
    duration: '9 Months',
    description: 'A grand commercial space engineered for large-scale events, featuring advanced acoustic treatments, dynamic lighting rigs, and opulent finishes.',
    features: ['Crystal Chandeliers', 'Acoustic Wall Paneling', 'Heavy-duty HVAC', 'Commercial Kitchen Setup'],
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2000&auto=format&fit=crop'
  },
  {
    slug: 'industrial-plant-fit-out',
    title: 'Heavy Machining Center',
    location: 'Neemrana',
    category: 'Infrastructure',
    client: 'IndoAuto Components',
    area: '120,000 sq.ft.',
    duration: '18 Months',
    description: 'A heavy-duty industrial infrastructure project requiring precise fabrication, specialized flooring, and robust structural planning.',
    features: ['Epoxy Industrial Flooring', 'Heavy Machinery Foundations', 'Steel Fabrication', 'Safety Compliance Implementation'],
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2000&auto=format&fit=crop'
  },
  {
    slug: 'peb-logistics-shed',
    title: 'PEB Structural Warehouse',
    location: 'Bhiwadi',
    category: 'Infrastructure',
    client: 'Stellar Warehousing',
    area: '85,000 sq.ft.',
    duration: '10 Months',
    description: 'A high-span pre-engineered building shed built for large-scale logistics operations. Completed with high wind load planning and certified quality control.',
    features: ['PEB Steel Portal Frames', 'Double-lock Standing Seam Roof', 'High-density Epoxy Flooring', 'Fire Hydrant Infrastructure'],
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2000&auto=format&fit=crop'
  }
];

const DEFAULT_TESTIMONIALS = [
  {
    name: 'Vikram Malhotra',
    role: 'CEO, Malhotra Infra',
    text: 'Stryper handled our corporate office fit-out in Mumbai with extreme professionalism. Their site execution is unmatched in the industry.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&h=200&auto=format&fit=crop',
    rating: 5
  },
  {
    name: 'Ananya Iyer',
    role: 'Principal Architect, AI Design',
    text: 'Collaborating with Stryper on luxury residential projects in Bangalore has been a pleasure. Their attention to material quality is top-tier.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&h=200&auto=format&fit=crop',
    rating: 5
  },
  {
    name: 'Siddharth Saxena',
    role: 'MD, Saxena Hospitality',
    text: 'The infrastructure execution for our resort in Alibaug was delivered ahead of schedule. Truly a partner you can trust for large-scale sites.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&h=200&auto=format&fit=crop',
    rating: 5
  },
  {
    name: 'Meera Deshmukh',
    role: 'Homeowner, Jaipur',
    text: 'Their modular kitchen and wardrobe team changed our home completely. High quality materials, excellent fit, and very polite installation staff.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&h=200&auto=format&fit=crop',
    rating: 5
  },
  {
    name: 'Rajesh Kumar',
    role: 'VP Operations, Neemrana Logistics',
    text: 'Stryper fabricated our 80,000 sq ft PEB shed in record time. Incredible accuracy and structural safety compliance.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&h=200&auto=format&fit=crop',
    rating: 5
  },
  {
    name: 'Aditya Vikram Singh',
    role: 'Owner, Heritage Resort Jaipur',
    text: 'Restoring our heritage lounge was a complex job. Stryper preserved the history while bringing modern comfort and joinery elements.',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=200&h=200&auto=format&fit=crop',
    rating: 5
  }
];

const DEFAULT_BLOGS = [
  {
    slug: 'modular-kitchen-trends-2026',
    title: 'Modular Kitchen Trends for 2026',
    subtitle: 'Discover how smart cabinetry and Italian finishes are transforming modern homes.',
    category: 'Residential',
    image: 'https://images.unsplash.com/photo-1556909212-d5b604d0c90d?q=80&w=2000&auto=format&fit=crop',
    date: 'June 28, 2026',
    author: 'Sunidhi Rawat (Lead Architect)',
    content: 'Kitchens are no longer just utilitarian spaces. In 2026, the trend shifts towards seamless integrations, anti-fingerprint textures, smart sensory LED lighting, and L-shaped profiles. Incorporating German soft-close drawers and Italian quartz countertops not only enhances durability but adds a timeless prestige to your home.'
  },
  {
    slug: 'benefits-peb-industrial-sheds',
    title: 'The Economic & Structural Benefits of PEB Sheds',
    subtitle: 'Why industrial giants are selecting Pre-Engineered Buildings over traditional RCC.',
    category: 'Infrastructure',
    image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=2000&auto=format&fit=crop',
    date: 'June 15, 2026',
    author: 'Vikramjit Singh (Structural Specialist)',
    content: 'Pre-Engineered Buildings (PEB) have revolutionized industrial infrastructure. With high-tensile steel frames manufactured off-site, they offer quick erection, cost predictability, and superior seismic resistance. From manufacturing plants to cargo warehouses, PEB structures maximize clear-span layouts, giving operational freedom without column obstructions.'
  },
  {
    slug: 'office-acoustics-workplace-efficiency',
    title: 'Acoustics & Lighting in Modern Office Design',
    subtitle: 'Boost workplace productivity through biophilic design and smart acoustic paneling.',
    category: 'Commercial',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2000&auto=format&fit=crop',
    date: 'May 30, 2026',
    author: 'Amitabh Sharma (Corporate Consultant)',
    content: 'Open office layouts improve communication but often raise noise levels. By introducing WPC acoustic wall panels, floating fabric baffles, and linear cluster desks, companies can design a highly productive, low-noise environment. Coupled with human-centric lighting, this layout reduces stress and fatigue for high-performing tech teams.'
  }
];

// Helper to initialize local storage lists
const initializeStore = () => {
  const storeVersion = 'v1.1'; // Force update store defaults
  if (localStorage.getItem('stryper_store_version') !== storeVersion) {
    localStorage.removeItem('stryper_projects');
    localStorage.removeItem('stryper_testimonials');
    localStorage.removeItem('stryper_blogs');
    localStorage.setItem('stryper_store_version', storeVersion);
  }

  if (!localStorage.getItem('stryper_projects')) {
    localStorage.setItem('stryper_projects', JSON.stringify(DEFAULT_PROJECTS));
  }
  if (!localStorage.getItem('stryper_testimonials')) {
    localStorage.setItem('stryper_testimonials', JSON.stringify(DEFAULT_TESTIMONIALS));
  }
  if (!localStorage.getItem('stryper_blogs')) {
    localStorage.setItem('stryper_blogs', JSON.stringify(DEFAULT_BLOGS));
  }
  if (!localStorage.getItem('stryper_inquiries')) {
    localStorage.setItem('stryper_inquiries', JSON.stringify([
      {
        id: 'inq-1',
        name: 'Yashika Kanwar',
        email: 'yashika@myproject.com',
        phone: '+91 98765 43210',
        service: 'Full Home Interior',
        message: 'Looking to renovate a 4 BHK villa in Vaishali Nagar, Jaipur. Need smart wardrobes and a premium kitchen.',
        date: '2026-07-01T10:30:00Z',
        status: 'new'
      },
      {
        id: 'inq-2',
        name: 'Rahul Chhabra',
        email: 'rahul@chhabralogistics.com',
        phone: '+91 99999 88888',
        service: 'Industrial Fabrication',
        message: 'Need estimation for a PEB industrial warehouse of 50,000 sq ft near Bhiwadi industrial area.',
        date: '2026-07-02T05:15:00Z',
        status: 'new'
      }
    ]));
  }
  if (!localStorage.getItem('stryper_careers')) {
    localStorage.setItem('stryper_careers', JSON.stringify([
      {
        id: 'car-1',
        name: 'Devendra Sharma',
        email: 'devendra.arch@email.com',
        phone: '+91 94140 12345',
        position: 'Senior Architect',
        experience: '7 Years',
        portfolio: 'https://behance.net/devendra_designs',
        resumeName: 'Devendra_Resume_2026.pdf',
        resumeData: 'data:application/pdf;base64,JVBERi0xLjQK...', // Mock base64
        message: 'Excited about Stryper\'s premium projects. I have extensive experience in Jodhpur sandstone integrations.',
        date: '2026-07-01T14:45:00Z',
        status: 'new'
      }
    ]));
  }
  if (!localStorage.getItem('stryper_notifications')) {
    localStorage.setItem('stryper_notifications', JSON.stringify([
      { id: 'not-1', text: 'New project Brief submitted by Yashika Kanwar', date: '2026-07-01T10:30:00Z', read: false },
      { id: 'not-2', text: 'New job application from Devendra Sharma', date: '2026-07-01T14:45:00Z', read: false },
      { id: 'not-3', text: 'New project Brief submitted by Rahul Chhabra', date: '2026-07-02T05:15:00Z', read: false }
    ]));
  }
  if (!localStorage.getItem('stryper_admin_password')) {
    localStorage.setItem('stryper_admin_password', 'infra@@2026');
  }
  if (!localStorage.getItem('stryper_settings')) {
    localStorage.setItem('stryper_settings', JSON.stringify({
      phone: '+91 9565310410',
      email: 'info@stryperinterior.com',
      address: 'Pan India Projects',
      whatsapp: '9565310410',
      est: '2010',
      website: 'www.stryperinterior.com'
    }));
  }
};

// Execute initialization
if (typeof window !== 'undefined') {
  initializeStore();
}

export const getProjects = async () => {
  try {
    const res = await fetch('/api/projects');
    const data = await res.json();
    if (data.success && data.data) return data.data;
  } catch (e) {
    console.error("Failed to fetch projects from backend:", e.message);
  }
  if (typeof window === 'undefined') return DEFAULT_PROJECTS;
  return JSON.parse(localStorage.getItem('stryper_projects')) || DEFAULT_PROJECTS;
};

export const addProject = async (project) => {
  const newProject = {
    ...project,
    slug: project.slug || project.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')
  };
  
  if (typeof window !== 'undefined') {
    const projects = JSON.parse(localStorage.getItem('stryper_projects')) || DEFAULT_PROJECTS;
    projects.unshift(newProject);
    localStorage.setItem('stryper_projects', JSON.stringify(projects));
    addNotification(`New project added: ${newProject.title}`);
  }

  try {
    const token = localStorage.getItem('stryper_token');
    const res = await fetch('/api/projects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(newProject)
    });
    const data = await res.json();
    if (data.success) return data.data;
  } catch (e) {
    console.error("Failed to save project to backend:", e.message);
  }
  return newProject;
};

export const deleteProject = async (slugOrId) => {
  if (typeof window !== 'undefined') {
    const projects = JSON.parse(localStorage.getItem('stryper_projects')) || DEFAULT_PROJECTS;
    const filtered = projects.filter(p => p.slug !== slugOrId && p._id !== slugOrId);
    localStorage.setItem('stryper_projects', JSON.stringify(filtered));
    addNotification(`Project deleted`);
  }

  try {
    const token = localStorage.getItem('stryper_token');
    let id = slugOrId;
    if (slugOrId.length !== 24) {
      const res = await fetch('/api/projects');
      const data = await res.json();
      if (data.success) {
        const found = data.data.find(p => p.slug === slugOrId);
        if (found) id = found._id;
      }
    }
    await fetch(`/api/projects/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
  } catch (e) {
    console.error("Failed to delete project from backend:", e.message);
  }
};

export const getTestimonials = async () => {
  try {
    const res = await fetch('/api/testimonials');
    const data = await res.json();
    if (data.success && data.data) return data.data;
  } catch (e) {
    console.error("Failed to fetch testimonials from backend:", e.message);
  }
  if (typeof window === 'undefined') return DEFAULT_TESTIMONIALS;
  return JSON.parse(localStorage.getItem('stryper_testimonials')) || DEFAULT_TESTIMONIALS;
};

export const addTestimonial = async (testimonial) => {
  if (typeof window !== 'undefined') {
    const testimonials = JSON.parse(localStorage.getItem('stryper_testimonials')) || DEFAULT_TESTIMONIALS;
    testimonials.unshift(testimonial);
    localStorage.setItem('stryper_testimonials', JSON.stringify(testimonials));
    addNotification(`New client review added by ${testimonial.name}`);
  }

  try {
    const res = await fetch('/api/testimonials', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testimonial)
    });
    const data = await res.json();
    if (data.success) return data.data;
  } catch (e) {
    console.error("Failed to save testimonial to backend:", e.message);
  }
  return testimonial;
};

export const deleteTestimonial = async (idOrName) => {
  if (typeof window !== 'undefined') {
    const testimonials = JSON.parse(localStorage.getItem('stryper_testimonials')) || DEFAULT_TESTIMONIALS;
    const filtered = testimonials.filter(t => t.name !== idOrName && t._id !== idOrName);
    localStorage.setItem('stryper_testimonials', JSON.stringify(filtered));
    addNotification(`Testimonial deleted`);
  }

  try {
    const token = localStorage.getItem('stryper_token');
    let id = idOrName;
    if (idOrName.length !== 24) {
      const res = await fetch('/api/testimonials');
      const data = await res.json();
      if (data.success) {
        const found = data.data.find(t => t.name === idOrName);
        if (found) id = found._id;
      }
    }
    await fetch(`/api/testimonials/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
  } catch (e) {
    console.error("Failed to delete testimonial from backend:", e.message);
  }
};

export const getBlogs = async () => {
  try {
    const res = await fetch('/api/blogs');
    const data = await res.json();
    if (data.success && data.data) return data.data;
  } catch (e) {
    console.error("Failed to fetch blogs from backend:", e.message);
  }
  if (typeof window === 'undefined') return DEFAULT_BLOGS;
  return JSON.parse(localStorage.getItem('stryper_blogs')) || DEFAULT_BLOGS;
};

export const addBlog = async (blog) => {
  const newBlog = {
    ...blog,
    slug: blog.slug || blog.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
  };

  if (typeof window !== 'undefined') {
    const blogs = JSON.parse(localStorage.getItem('stryper_blogs')) || DEFAULT_BLOGS;
    blogs.unshift(newBlog);
    localStorage.setItem('stryper_blogs', JSON.stringify(blogs));
    addNotification(`New blog post published: ${newBlog.title}`);
  }

  try {
    const token = localStorage.getItem('stryper_token');
    const res = await fetch('/api/blogs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(newBlog)
    });
    const data = await res.json();
    if (data.success) return data.data;
  } catch (e) {
    console.error("Failed to save blog to backend:", e.message);
  }
  return newBlog;
};

export const deleteBlog = async (slugOrId) => {
  if (typeof window !== 'undefined') {
    const blogs = JSON.parse(localStorage.getItem('stryper_blogs')) || DEFAULT_BLOGS;
    const filtered = blogs.filter(b => b.slug !== slugOrId && b._id !== slugOrId);
    localStorage.setItem('stryper_blogs', JSON.stringify(filtered));
    addNotification(`Blog post deleted`);
  }

  try {
    const token = localStorage.getItem('stryper_token');
    let id = slugOrId;
    if (slugOrId.length !== 24) {
      const res = await fetch('/api/blogs');
      const data = await res.json();
      if (data.success) {
        const found = data.data.find(b => b.slug === slugOrId);
        if (found) id = found._id;
      }
    }
    await fetch(`/api/blogs/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
  } catch (e) {
    console.error("Failed to delete blog from backend:", e.message);
  }
};

export const getInquiries = async () => {
  const token = localStorage.getItem('stryper_token');
  if (token) {
    try {
      const res = await fetch('/api/inquiries', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success && data.data) {
        return data.data.map(inq => ({ id: inq._id, ...inq }));
      }
    } catch (e) {
      console.error("Failed to fetch inquiries from backend:", e.message);
    }
  }
  if (typeof window === 'undefined') return [];
  return JSON.parse(localStorage.getItem('stryper_inquiries')) || [];
};

export const addInquiry = async (inquiry) => {
  if (typeof window === 'undefined') return;
  const inquiries = JSON.parse(localStorage.getItem('stryper_inquiries')) || [];
  const newInq = {
    id: `inq-${Date.now()}`,
    ...inquiry,
    date: new Date().toISOString(),
    status: 'new'
  };
  inquiries.unshift(newInq);
  localStorage.setItem('stryper_inquiries', JSON.stringify(inquiries));
  addNotification(`New project Brief submitted by ${newInq.name}`);

  try {
    await fetch('/api/inquiries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: inquiry.name,
        email: inquiry.email,
        phone: inquiry.phone,
        service: inquiry.service,
        message: inquiry.message
      })
    });
  } catch (err) {
    console.error('Failed to post inquiry to backend:', err.message);
  }
};

export const deleteInquiryBackend = async (id) => {
  if (typeof window !== 'undefined') {
    const inquiries = JSON.parse(localStorage.getItem('stryper_inquiries')) || [];
    const filtered = inquiries.filter(i => i.id !== id && i._id !== id);
    localStorage.setItem('stryper_inquiries', JSON.stringify(filtered));
  }

  const token = localStorage.getItem('stryper_token');
  if (token && id && id.length === 24) {
    try {
      await fetch(`/api/inquiries/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
    } catch (e) {
      console.error("Failed to delete inquiry on backend:", e.message);
    }
  }
};

export const updateInquiryStatusBackend = async (id, status) => {
  if (typeof window !== 'undefined') {
    const inquiries = JSON.parse(localStorage.getItem('stryper_inquiries')) || [];
    const updated = inquiries.map(i => (i.id === id || i._id === id) ? { ...i, status } : i);
    localStorage.setItem('stryper_inquiries', JSON.stringify(updated));
  }

  const token = localStorage.getItem('stryper_token');
  if (token && id && id.length === 24) {
    try {
      await fetch(`/api/inquiries/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      });
    } catch (e) {
      console.error("Failed to update inquiry status on backend:", e.message);
    }
  }
};

export const getCareers = async () => {
  const token = localStorage.getItem('stryper_token');
  if (token) {
    try {
      const res = await fetch('/api/careers', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success && data.data) {
        return data.data.map(app => ({
          id: app._id,
          name: app.name,
          email: app.email,
          phone: app.phone,
          position: app.position,
          experience: app.experience || 'N/A',
          portfolio: app.portfolio || 'Not Provided',
          resumeName: app.resume_name || 'Resume',
          resumeData: app.resume_path ? `/uploads/resumes/${app.resume_path.split('/').pop()}` : null,
          message: app.message || '',
          date: app.createdAt,
          status: app.status
        }));
      }
    } catch (e) {
      console.error("Failed to fetch careers from backend:", e.message);
    }
  }
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem('stryper_careers');
  return stored ? JSON.parse(stored) : [];
};


export const addCareer = async (career) => {
  if (typeof window === 'undefined') return;
  const careers = JSON.parse(localStorage.getItem('stryper_careers')) || [];
  const newCar = {
    id: `car-${Date.now()}`,
    ...career,
    date: new Date().toISOString(),
    status: 'new'
  };
  careers.unshift(newCar);
  localStorage.setItem('stryper_careers', JSON.stringify(careers));
  addNotification(`New job application from ${newCar.name}`);

  try {
    const formData = new FormData();
    formData.append('name', career.name);
    formData.append('email', career.email);
    formData.append('phone', career.phone);
    formData.append('position', career.position || '');
    formData.append('experience', career.experience || '');
    formData.append('portfolio', career.portfolio || '');
    formData.append('message', career.message || '');
    if (career.resumeFile) {
      formData.append('resume', career.resumeFile);
    }
    await fetch('/api/careers', {
      method: 'POST',
      body: formData
    });
  } catch (err) {
    console.error('Failed to submit application to backend:', err.message);
  }
};

export const deleteCareerBackend = async (id) => {
  if (typeof window !== 'undefined') {
    const careers = JSON.parse(localStorage.getItem('stryper_careers')) || [];
    const filtered = careers.filter(c => c.id !== id && c._id !== id);
    localStorage.setItem('stryper_careers', JSON.stringify(filtered));
  }

  const token = localStorage.getItem('stryper_token');
  if (token && id && id.length === 24) {
    try {
      await fetch(`/api/careers/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
    } catch (e) {
      console.error("Failed to delete career application on backend:", e.message);
    }
  }
};

export const updateCareerStatusBackend = async (id, status) => {
  if (typeof window !== 'undefined') {
    const careers = JSON.parse(localStorage.getItem('stryper_careers')) || [];
    const updated = careers.map(c => (c.id === id || c._id === id) ? { ...c, status } : c);
    localStorage.setItem('stryper_careers', JSON.stringify(updated));
  }

  const token = localStorage.getItem('stryper_token');
  if (token && id && id.length === 24) {
    try {
      await fetch(`/api/careers/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      });
    } catch (e) {
      console.error("Failed to update career status on backend:", e.message);
    }
  }
};

export const getGallery = async () => {
  // Gallery route not implemented in backend yet
  return [];
};

export const addGallery = async (item) => {
  return item;
};

export const deleteGallery = async (id) => {
  // Gallery route not implemented in backend yet
};

export const getNotifications = () => {
  if (typeof window === 'undefined') return [];
  return JSON.parse(localStorage.getItem('stryper_notifications')) || [];
};

export const addNotification = (text) => {
  if (typeof window === 'undefined') return;
  const notifications = getNotifications();
  notifications.unshift({
    id: `not-${Date.now()}`,
    text,
    date: new Date().toISOString(),
    read: false
  });
  localStorage.setItem('stryper_notifications', JSON.stringify(notifications));
  window.dispatchEvent(new Event('stryper_notifications_updated'));
};

export const markNotificationsAsRead = () => {
  if (typeof window === 'undefined') return;
  const notifications = getNotifications();
  const updated = notifications.map(n => ({ ...n, read: true }));
  localStorage.setItem('stryper_notifications', JSON.stringify(updated));
  window.dispatchEvent(new Event('stryper_notifications_updated'));
};

export const clearNotifications = () => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('stryper_notifications', JSON.stringify([]));
  window.dispatchEvent(new Event('stryper_notifications_updated'));
};

export const incrementVisitorCount = async () => {
  if (typeof window === 'undefined') return;

  const pageViews = parseInt(localStorage.getItem('stryper_pageviews') || '0', 10);
  localStorage.setItem('stryper_pageviews', (pageViews + 1).toString());

  // Generate or reuse a sessionId to track unique visitors
  let sessionId = sessionStorage.getItem('stryper_session_id');
  if (!sessionId) {
    sessionId = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
    sessionStorage.setItem('stryper_session_id', sessionId);
    // Count as unique visitor only once per session
    const uniqueVisitors = parseInt(localStorage.getItem('stryper_visitors') || '0', 10);
    localStorage.setItem('stryper_visitors', (uniqueVisitors + 1).toString());
  }

  try {
    await fetch('/api/stats/increment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: window.location.pathname, sessionId })
    });
  } catch {
    // silent — analytics failure should never break the UI
  }
};

export const getTrafficStats = () => {
  if (typeof window === 'undefined') return { visitors: 116, pageviews: 293 };
  return {
    visitors: parseInt(localStorage.getItem('stryper_visitors') || '116', 10),
    pageviews: parseInt(localStorage.getItem('stryper_pageviews') || '293', 10)
  };
};

export const getAdminPassword = () => {
  if (typeof window === 'undefined') return 'infra@@2026';
  return localStorage.getItem('stryper_admin_password') || 'infra@@2026';
};

export const updateAdminPassword = (newPassword) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('stryper_admin_password', newPassword);
  addNotification(`Admin password updated`);
};

export const getSiteSettingsSync = () => {
  const defaultSettings = {
    phone: '+91 9565310410',
    email: 'gc@stryperinteriorandinfra.com',
    address: 'Pan India Projects',
    whatsapp: '918448590303',
    est: '2010',
    website: 'www.stryperinteriorandinfra.com'
  };
  if (typeof window === 'undefined') return defaultSettings;
  const stored = localStorage.getItem('stryper_settings');
  return stored ? JSON.parse(stored) : defaultSettings;
};

export const getSiteSettings = async () => {
  const token = localStorage.getItem('stryper_token');
  try {
    const url = token ? '/api/settings' : '/api/settings/public';
    const headers = token ? { 'Authorization': `Bearer ${token}` } : {};
    const res = await fetch(url, { headers });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (data.success && data.data) {
      return data.data;
    }
  } catch (e) {
    // silently fallback to localStorage — don't log on 502
  }
  return getSiteSettingsSync();
};

export const updateSiteSettings = async (newSettings) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('stryper_settings', JSON.stringify(newSettings));
    addNotification(`Site settings updated`);
    window.dispatchEvent(new Event('stryper_settings_updated'));
  }

  const token = localStorage.getItem('stryper_token');
  if (token) {
    try {
      await fetch('/api/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newSettings)
      });
    } catch (e) {
      console.error("Failed to save settings on backend:", e.message);
    }
  }
};

// API Integration Helpers for Admin page
export const loginAdminBackend = async (password) => {
  try {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password })
    });
    const data = await res.json();
    if (data.success && data.data?.token) {
      localStorage.setItem('stryper_token', data.data.token);
      return { success: true };
    }
    return { success: false, message: data.message || 'Login failed' };
  } catch (err) {
    console.error('Admin login error:', err);
    return { success: false, message: 'Server is currently offline or unreachable.' };
  }
};

export const changeAdminPasswordBackend = async (currentPassword, newPassword) => {
  const token = localStorage.getItem('stryper_token');
  if (!token) return { success: false, message: 'Not authenticated' };
  try {
    const res = await fetch('/api/auth/change-password', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ currentPassword, newPassword })
    });
    const data = await res.json();
    return { success: data.success, message: data.message };
  } catch (err) {
    console.error('Error changing password:', err);
    return { success: false, message: 'Server connection failed' };
  }
};

export const fetchStatsFromBackend = async () => {
  const token = localStorage.getItem('stryper_token');
  if (!token) return null;
  try {
    const res = await fetch('/api/stats', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const data = await res.json();
    if (data.success) return data.data;
    return null;
  } catch (err) {
    console.error('Error fetching admin stats:', err);
    return null;
  }
};

export const fetchCareersFromBackend = async () => {
  // Now handled directly in getCareers()
  return [];
};

export const uploadImageToBackend = async (file) => {
  const token = localStorage.getItem('stryper_token');
  if (!token) return null;
  try {
    const formData = new FormData();
    formData.append('image', file);
    const res = await fetch('/api/upload/image', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` },
      body: formData
    });
    const data = await res.json();
    if (data.success) return data.data?.url || data.data?.imageUrl || null;
  } catch (err) {
    console.error('Failed to upload image:', err);
  }
  return null;
};
