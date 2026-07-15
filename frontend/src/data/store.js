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
};

// Execute initialization
if (typeof window !== 'undefined') {
  initializeStore();
}

export const getProjects = () => {
  if (typeof window === 'undefined') return DEFAULT_PROJECTS;
  return JSON.parse(localStorage.getItem('stryper_projects')) || DEFAULT_PROJECTS;
};

export const addProject = (project) => {
  if (typeof window === 'undefined') return;
  const projects = getProjects();
  const newProject = {
    ...project,
    slug: project.slug || project.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')
  };
  projects.unshift(newProject);
  localStorage.setItem('stryper_projects', JSON.stringify(projects));
  addNotification(`New project added: ${newProject.title}`);
  return newProject;
};

export const getTestimonials = () => {
  if (typeof window === 'undefined') return DEFAULT_TESTIMONIALS;
  return JSON.parse(localStorage.getItem('stryper_testimonials')) || DEFAULT_TESTIMONIALS;
};

export const addTestimonial = (testimonial) => {
  if (typeof window === 'undefined') return;
  const testimonials = getTestimonials();
  testimonials.unshift(testimonial);
  localStorage.setItem('stryper_testimonials', JSON.stringify(testimonials));
  addNotification(`New client review added by ${testimonial.name}`);
};

export const getBlogs = () => {
  if (typeof window === 'undefined') return DEFAULT_BLOGS;
  return JSON.parse(localStorage.getItem('stryper_blogs')) || DEFAULT_BLOGS;
};

export const addBlog = (blog) => {
  if (typeof window === 'undefined') return;
  const blogs = getBlogs();
  const newBlog = {
    ...blog,
    slug: blog.slug || blog.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
  };
  blogs.unshift(newBlog);
  localStorage.setItem('stryper_blogs', JSON.stringify(blogs));
  addNotification(`New blog post published: ${newBlog.title}`);
  return newBlog;
};

export const getInquiries = () => {
  if (typeof window === 'undefined') return [];
  return JSON.parse(localStorage.getItem('stryper_inquiries')) || [];
};

export const addInquiry = (inquiry) => {
  if (typeof window === 'undefined') return;
  const inquiries = getInquiries();
  const newInq = {
    id: `inq-${Date.now()}`,
    ...inquiry,
    date: new Date().toISOString(),
    status: 'new'
  };
  inquiries.unshift(newInq);
  localStorage.setItem('stryper_inquiries', JSON.stringify(inquiries));
  addNotification(`New project Brief submitted by ${newInq.name}`);
};

export const getCareers = () => {
  if (typeof window === 'undefined') return [];
  return JSON.parse(localStorage.getItem('stryper_careers')) || [];
};

export const addCareer = (career) => {
  if (typeof window === 'undefined') return;
  const careers = getCareers();
  const newCar = {
    id: `car-${Date.now()}`,
    ...career,
    date: new Date().toISOString(),
    status: 'new'
  };
  careers.unshift(newCar);
  localStorage.setItem('stryper_careers', JSON.stringify(careers));
  addNotification(`New job application from ${newCar.name}`);
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
  
  // Custom event to alert listeners across files
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

// Visitor Traffic Stats Tracking
export const incrementVisitorCount = () => {
  if (typeof window === 'undefined') return;
  
  // Track page views
  const pageViews = parseInt(localStorage.getItem('stryper_pageviews') || '254', 10);
  localStorage.setItem('stryper_pageviews', (pageViews + 1).toString());

  // Track unique visitors
  if (!sessionStorage.getItem('stryper_visited_session')) {
    sessionStorage.setItem('stryper_visited_session', 'true');
    const uniqueVisitors = parseInt(localStorage.getItem('stryper_visitors') || '114', 10);
    localStorage.setItem('stryper_visitors', (uniqueVisitors + 1).toString());
  }
};

export const getTrafficStats = () => {
  if (typeof window === 'undefined') return { visitors: 114, pageviews: 254 };
  return {
    visitors: parseInt(localStorage.getItem('stryper_visitors') || '114', 10),
    pageviews: parseInt(localStorage.getItem('stryper_pageviews') || '254', 10)
  };
};
