export const initialHeroProfile = {
  firstName: 'Leang ',
  lastName: 'Honghav',
  greeting: "Hello, I'm",
  role: 'Product Designer | Based in Germany',
  clientsCount: '1.2k+',
  portraitImg: '/images/hero/profile.webp',
  talkCtaUrl: '#contact',
  projectCtaUrl: '#portfolio',
  socialLinks: [
    {
      name: 'Behance',
      url: 'https://behance.net',
      icon: 'fa-brands fa-behance',
      ariaLabel: 'Behance Profile',
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com',
      icon: 'fa-brands fa-linkedin-in',
      ariaLabel: 'LinkedIn Profile',
    },
    {
      name: 'Dribbble',
      url: 'https://dribbble.com',
      icon: 'fa-brands fa-dribbble',
      ariaLabel: 'Dribbble Profile',
    },
    {
      name: 'GitHub',
      url: 'https://github.com/leanghonghav168',
      icon: 'fa-brands fa-github',
      ariaLabel: 'GitHub Profile',
    },
  ],
};

export const initialAboutMe = {
  categoryTag: 'About Me',
  headline:
    'A passionate web designer turning ideas into visually stunning, user-friendly websites.',
  highlightWords: ['web designer', 'ideas'],
  bioText:
    "Hello! I'm Leang Honghav, a self-taught & award-winning Digital Designer & Developer with over fifteen years of work experience. I started in my children's room and got pro at renowned digital nexum AG agencies.",
  portraitImg: '/images/hero/profile.webp',
  isAvailableForWork: true,
  availableBadgeText: 'Available for Work',
  leftSpecialties: ['Logo Design', 'Branding Identity', 'Web Design'],
  rightSpecialties: ['Social Marketing', 'Digital Marketing', 'Product Design'],
};

export const initialSkills = [
  { name: 'HTML', percent: '95%', img: '/images/skills/html.png', category: 'Frontend', displayOrder: 1 },
  { name: 'BOOTSTRAP', percent: '75%', img: '/images/skills/bootstrap.png', category: 'Styling', displayOrder: 2 },
  { name: 'WORDPRESS', percent: '85%', img: '/images/skills/wordpress.png', category: 'CMS', displayOrder: 3 },
  { name: 'ADOBE XD', percent: '90%', img: '/images/skills/xd.png', category: 'Design', displayOrder: 4 },
  { name: 'FIGMA', percent: '80%', img: '/images/skills/figma.png', category: 'Design Systems', displayOrder: 5 },
  { name: 'PHOTOSHOP', percent: '75%', img: '/images/skills/photoshop.png', category: 'Creative', displayOrder: 6 },
  { name: 'CANVA', percent: '90%', img: '/images/skills/canva.png', category: 'Branding', displayOrder: 7 },
];

export const initialServices = [
  {
    title: 'Brand Identity Design',
    description: 'Liam gives you the blocks & kits you need to create a true website within minutes.',
    iconType: 'yinyang',
    displayOrder: 1,
  },
  {
    title: 'Website Design',
    description: 'Liam gives you the blocks & kits you need to create a true website within minutes.',
    iconType: 'layout',
    displayOrder: 2,
  },
  {
    title: 'Application Design',
    description: 'Liam gives you the blocks & kits you need to create a true website within minutes.',
    iconType: 'layers',
    displayOrder: 3,
  },
];

export const initialProjects = [
  {
    title: 'Basinik Finance App',
    subtitle: 'Next-Generation Wealth Management & Real-Time Portfolio Intelligence',
    client: 'Basinik Capital Group',
    timeline: '3 Months (2024)',
    role: 'Lead UI/UX & Frontend Architecture',
    impact: '+42% User Engagement',
    categoryTags: ['APP', 'DEVELOPMENT'],
    techStack: ['Nuxt 3', 'Vue 3', 'Tailwind CSS', 'PostgreSQL', 'Pinia'],
    img: '/images/projects/basinik-finance.jpg',
    description:
      'Basinik Finance is a unified wealth management application designed to give retail investors and portfolio managers real-time visibility into their asset allocation, automated portfolio balancing, and AI-driven market intelligence with bank-grade security.',
    deliverables: [
      'Engineered an enterprise design system in Figma with 150+ reusable components conforming to WCAG 2.1 AA standards.',
      'Constructed real-time asset tracking charts with Pinia state store and reactive WebSocket live ticker updates.',
      'Integrated biometric authentication, two-factor verification, and role-based permissions.',
      'Optimized SSR rendering pipeline to maintain fluid 60fps animations across all mobile screen sizes.',
    ],
    demoUrl: 'https://basinik.example.com',
    repoUrl: 'https://github.com/leanghonghav168/basinik-finance-app',
    displayOrder: 1,
    isFeatured: true,
  },
  {
    title: 'Oxilex Dashboard Design',
    subtitle: 'Comprehensive Event Operations, Seat Reservation & Analytics Dashboard',
    client: 'Oxilex Global Ltd.',
    timeline: '4 Months (2023)',
    role: 'Full-Stack Developer & UI Architect',
    impact: '100k+ Monthly Active Users',
    categoryTags: ['APP', 'DEVELOPMENT'],
    techStack: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Redis'],
    img: '/images/projects/oxilex-dashboard.jpg',
    description:
      'Oxilex is a comprehensive event operations dashboard created for venue managers and ticketing coordinators. It centralizes seat reservations, real-time ticket scanning statistics, attendee demographics, and financial revenue flows into an intuitive interface.',
    deliverables: [
      'Architected responsive grid layout with custom drag-and-drop widget arrangement and custom analytics panels.',
      'Constructed interactive heatmaps illustrating venue seat occupancy and VIP section ticket sales in real-time.',
      'Implemented dark and light mode toggle with smooth CSS variable transitions and zero layout shifts.',
      'Designed automated PDF ticketing dispatch system with instant QR verification for on-site staff.',
    ],
    demoUrl: 'https://oxilex.example.com',
    repoUrl: 'https://github.com/leanghonghav168/oxilex-dashboard',
    displayOrder: 2,
    isFeatured: true,
  },
  {
    title: 'Loan Management System',
    subtitle: 'Enterprise Loan Origination & Automated Credit Risk Assessment Portal',
    client: 'Apex Financial Services',
    timeline: '5 Months (2023)',
    role: 'Lead Frontend Engineer',
    impact: '60% Faster Processing',
    categoryTags: ['FINTECH', 'ENTERPRISE'],
    techStack: ['Nuxt 4', 'Next.js', 'PostgreSQL', 'Tailwind CSS', 'Redis'],
    img: '/images/projects/project-loan.png',
    description:
      'An enterprise fintech platform engineered to automate multi-tier credit scoring, borrower document verification, and debt amortization schedules for commercial and individual loan portfolios across international jurisdictions.',
    deliverables: [
      'Created a multi-step dynamic borrower application wizard with auto-save, draft recovery, and instant validation.',
      'Integrated Redis caching layer to power sub-50ms credit calculation metrics and amortization schedule generation.',
      'Implemented document upload scanner with virus detection and OCR status indicators.',
      'Built audit-trail compliance log complying with banking regulatory and KYC standards.',
    ],
    demoUrl: 'https://loan-system.example.com',
    repoUrl: 'https://github.com/leanghonghav168/loan-management-system',
    displayOrder: 3,
    isFeatured: false,
  },
  {
    title: 'Papa Food E-Commerce',
    subtitle: 'Multi-Vendor Food Ordering Ecosystem & Live Kitchen Delivery Tracker',
    client: 'Papa Food Group',
    timeline: '2.5 Months (2022)',
    role: 'UI/UX Designer & Vue Developer',
    impact: '$1.5M+ Annual GMV',
    categoryTags: ['ECOMMERCE', 'UI/UX'],
    techStack: ['Vue 3', 'Nuxt 3', 'Pinia', 'Stripe API', 'Tailwind CSS'],
    img: '/images/projects/project-food.png',
    description:
      'Papa Food is a customer-facing e-commerce application and merchant management ecosystem featuring live GPS driver tracking, instant menu customization, and Stripe payments integration.',
    deliverables: [
      'Engineered snappy product search with fuzzy matching, dietary preference filtering, and intelligent recommendations.',
      'Built an ultra-fast checkout flow reducing cart abandonment rates by 28%.',
      'Designed merchant portal for live kitchen order fulfillment and inventory management.',
      'Integrated Stripe Elements and Apple Pay for one-touch mobile payments.',
    ],
    demoUrl: 'https://papafood.example.com',
    repoUrl: 'https://github.com/leanghonghav168/papa-food-ecommerce',
    displayOrder: 4,
    isFeatured: false,
  },
];

export const initialWorkExperiences = [
  {
    period: '2022 - PRESENT',
    company: 'Nexum AG Agencies',
    location: 'Berlin, Germany',
    role: 'Lead UI/UX Designer & Product Architect',
    type: 'Full-time',
    isCurrent: true,
    description:
      'Spearheading design systems and high-impact digital experiences for enterprise SaaS and fintech platforms, bridging UX research with production code.',
    highlights: [
      'Engineered scalable multi-brand component libraries in Figma and Nuxt 3 with zero accessibility regressions.',
      'Led cross-functional collaboration with frontend engineers to ship responsive web apps used by 1.2M+ users.',
      'Reduced design-to-development handoff cycle by 40% through unified tokens and documentation.',
    ],
    skills: ['Figma', 'Design Systems', 'Nuxt 3', 'Vue 3', 'Tailwind CSS', 'TypeScript'],
    displayOrder: 1,
  },
  {
    period: '2020 - 2022',
    company: 'Basinik Technologies',
    location: 'Munich, Germany',
    role: 'Senior Frontend Developer & UI Designer',
    type: 'Full-time',
    isCurrent: false,
    description:
      'Designed and engineered rich interactive client dashboards, banking portals, and high-conversion landing applications.',
    highlights: [
      'Developed real-time financial tracking widgets with Chart.js and Pinia state management.',
      'Optimized Lighthouse Core Web Vitals to consistent 95+ scores across all major devices.',
      'Created micro-interactions and smooth page transitions with CSS animations.',
    ],
    skills: ['Vue.js', 'TypeScript', 'Pinia', 'REST APIs', 'PostgreSQL', 'SCSS'],
    displayOrder: 2,
  },
  {
    period: '2018 - 2020',
    company: 'Creative Mela Studio',
    location: 'Remote',
    role: 'UI/UX Designer & Web Developer',
    type: 'Contract',
    isCurrent: false,
    description:
      'Crafted brand identities, responsive websites, and custom web applications for international clients and digital agencies.',
    highlights: [
      'Delivered 30+ client projects from wireframing to production deployment on time and within budget.',
      'Transformed complex business workflows into intuitive, clean user journeys.',
    ],
    skills: ['Adobe XD', 'HTML5/CSS3', 'Bootstrap 5', 'WordPress', 'JavaScript'],
    displayOrder: 3,
  },
  {
    period: '2016 - 2018',
    company: 'Digital Craft Agency',
    location: 'Hamburg, Germany',
    role: 'Junior Web Designer',
    type: 'Full-time',
    isCurrent: false,
    description:
      'Supported senior creative leads with responsive web layouts, interactive prototypes, marketing collateral, and graphic assets.',
    highlights: [
      'Designed responsive email templates and social marketing assets for international brands.',
      'Collaborated on user research interviews and usability testing sessions.',
    ],
    skills: ['UI Design', 'Photoshop', 'Canva', 'Responsive Web', 'CSS3'],
    displayOrder: 4,
  },
];

export const initialEducations = [
  {
    period: '2014 - 2018',
    institution: 'Berlin University of Applied Sciences',
    location: 'Berlin, Germany',
    degree: 'B.Sc. in Interactive Media & Computer Science',
    description:
      'Comprehensive study in human-computer interaction (HCI), frontend architecture, visual design theory, data structures, and software engineering.',
    skills: ['HCI', 'Software Engineering', 'UI Architecture', 'User Research', 'Web Technologies'],
    displayOrder: 1,
  },
  {
    period: '2021',
    institution: 'Google Career Certificates',
    location: 'Online / Credential',
    degree: 'Google Professional UX Design Specialization',
    description:
      'In-depth specialization focusing on foundations of user experience (UX) design, wireframing, high-fidelity prototyping, and inclusive accessibility (WCAG).',
    skills: ['Design Thinking', 'Usability Testing', 'Figma Prototyping', 'Accessibility (WCAG)'],
    displayOrder: 2,
  },
  {
    period: '2023',
    institution: 'Vue School & Nuxt Academy',
    location: 'Online / Credential',
    degree: 'Advanced Vue 3 & Nuxt Master Certification',
    description:
      'Advanced masterclass covering Nuxt 3 composition API, SSR performance optimization, custom nitro modules, and modern component systems.',
    skills: ['Vue 3 Composition API', 'Nuxt 3 SSR', 'State Architecture', 'Performance Optimization'],
    displayOrder: 3,
  },
];

export const initialContactInfo = {
  categoryTag: 'Contact',
  title: 'Let’s connect',
  email: 'hello@henry.com',
  phoneNumbers: '+1 234 567 890 | +1 234 567 890',
  officeAddress: '2715 Ash Dr. San Joe, South Dakota 6548',
  formattedAddress: '2715 Ash Dr. San Joe, South<br class="d-none d-sm-inline" /> Dakota 6548',
  socialLinks: [
    {
      name: 'Behance',
      url: 'https://behance.net',
      icon: 'fa-brands fa-behance',
      ariaLabel: 'Follow on Behance',
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com',
      icon: 'fa-brands fa-linkedin-in',
      ariaLabel: 'Connect on LinkedIn',
    },
    {
      name: 'Dribbble',
      url: 'https://dribbble.com',
      icon: 'fa-brands fa-dribbble',
      ariaLabel: 'View on Dribbble',
    },
    {
      name: 'GitHub',
      url: 'https://github.com/leanghonghav168',
      icon: 'fa-brands fa-github',
      ariaLabel: 'Follow on GitHub',
    },
  ],
};

