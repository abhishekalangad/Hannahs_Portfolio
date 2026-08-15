import { StatItem, VentureItem, EducationItem, SkillCategory, AchievementItem, ModalDetailRecord } from '../types/portfolio';
import { getAge, getVentureYears } from '../utils/dateUtils';

// ============================================================
// DATA SOURCED EXCLUSIVELY FROM:
// "HANNAH ELANGOVAN RESUME - FINAL.md"
// ============================================================

// ── Dynamic computed strings (auto-update every year) ──────────────────────
const _ageLbl = () => getAge() + '-year-old';
const _ventYrs = () => getVentureYears();
const _bioStr = () =>
  `Innovatively driven, entrepreneurial ${_ageLbl()} with ${_ventYrs()} years of experience building and scaling a successful E Commerce business, seeking to leverage proven leadership, strategic problem-solving, and negotiation skills to excel in a rigorous legal education.`;

export const personalData = {
  name: "Hannah Elangovan",
  tagline: "E-Commerce Founder & Legal Scholar",
  get subheadline() { return _bioStr(); },
  get bio() { return _bioStr(); },
  email: "hannahpanthea@gmail.com",
  phone: "+94 778973708",
  linkedin: "https://linkedin.com/in/hannah-elangovan-186a54355",
  location: "Colombo, Sri Lanka",
  status: "Open for Strategic Advisory & Collaborations",
  references: [
    {
      name: "Mr. Abhishek K",
      role: "Full Stack Developer – Assimilate Technologies, Pune, MH, India",
      phone: "+918606243568",
      email: "abhishekalangad@gmail.com"
    },
    {
      name: "Dr. Sanjaya Gunasekara",
      role: "Medical Officer – Base Hospital Bibila",
      phone: "+940765575732",
      email: "sanjayaktl97@gmail.com"
    }
  ]
};

export const statsData: StatItem[] = [
  {
    get value() { return _ventYrs() + '+'; },
    label: "Years Scaling Ventures",
    description: "Founder & CEO of Web Mall (Pvt) Ltd — fashion, bags, apparel & lifestyle."
  },
  {
    value: "LL.B",
    label: "University of London",
    description: "Bachelor of Laws — July 2024 to Present."
  },
  {
    value: "All-Island",
    label: "British Performing Arts",
    description: "Winner of nationwide honors in British Performing Arts Festivals."
  },
  {
    value: "2025",
    label: "Global Keynote Speaker",
    description: "International Resource Person at ANTHA PRERNA 2025, Kochi Business School."
  }
];

// Ventures sourced directly from Resume Projects & Initiatives sections
export const venturesData: VentureItem[] = [
  {
    id: "web-mall",
    title: "Web Mall (Pvt) Ltd",
    role: "Founder & Chief Executive Officer",
    period: "2021 — Present",
    category: "E-Commerce",
    lottiePath: "lottie/online-shopping.json",
    badge: "Flagship Enterprise",
    shortDesc: "Founded and scaled an E-Commerce business dealing in fashion accessories, bags, apparel, ornaments and more.",
    highlights: [
      "Founded and registered Web Mall (Pvt) Ltd as a private limited company.",
      "Built and scaled multi-category digital retail spanning fashion accessories, bags, apparel, and lifestyle ornaments.",
      "Managed end-to-end operations: supplier sourcing, social media promotion, marketing, sales, and fulfilment.",
      "Proficient in social media platforms for product promotion, marketing, and sales.",
      "Utilised Canva and Prompt Engineering for creative assets and campaign automation."
    ],
    tags: ["E-Commerce", "Fashion Accessories", "Social Commerce", "Canva", "Prompt Engineering"],
    domain: "webmall.lk",
    metrics: [
      { label: "Active Scaling", get value() { return _ventYrs() + '+ Years'; } } as unknown as { label: string; value: string },
      { label: "Catalog", value: "Multi-Category" },
      { label: "Channel", value: "Social Commerce" }
    ]
  },
  {
    id: "antha-prerna",
    title: "ANTHA PRERNA 2025",
    role: "International Resource Person",
    period: "2025",
    category: "Keynotes & Summits",
    lottiePath: "lottie/business-presentation.json",
    badge: "Global Leadership",
    shortDesc: "Resource person at an international workshop focused on Entrepreneurship Development, Leadership Training, and Outbound Learning — Kochi Business School, Kerala, India.",
    highlights: [
      "Invited as international Resource Person at Kochi Business School, Cochin, Kerala, India.",
      "Workshop mission: 'Awaken the inner drive of aspiring professionals and mold them into the leaders of tomorrow.'",
      "Collaborated with an exceptional panel of global facilitators and thought leaders.",
      "Delivered sessions on entrepreneurship development, leadership training, and outbound learning."
    ],
    tags: ["Leadership Training", "Outbound Entrepreneurship", "International Keynote", "Kochi Business School"],
    domain: "kbs.edu.in",
    link: "https://kbs.edu.in/event/antha-prerna-2025-igniting-inner-drive-shaping-future-leaders.html",
    linkText: "Verify KBS Official Event",
    metrics: [
      { label: "Host", value: "Kochi Business School" },
      { label: "Location", value: "Kerala, India" },
      { label: "Year", value: "2025" }
    ]
  },
  {
    id: "daraz-summit",
    title: "Daraz Women in E-Commerce Summit",
    role: "Participant & Founder Delegate",
    period: "2022",
    category: "Keynotes & Summits",
    lottiePath: "lottie/shopping.json",
    badge: "Industry Summit",
    shortDesc: "Participated in sessions on digital marketplace scaling, e-commerce trends, and female entrepreneurship.",
    highlights: [
      "Engaged in sessions on digital marketplace scaling, e-commerce trends, and female entrepreneurship.",
      "Connected with South Asian e-commerce leaders and founders."
    ],
    tags: ["Digital Commerce", "Women Founders", "Daraz", "E-Commerce Summit"],
    domain: "daraz.lk/summit",
    metrics: [
      { label: "Organiser", value: "Daraz" },
      { label: "Category", value: "E-Commerce" }
    ]
  },
  {
    id: "drama-teaching",
    title: "Drama & Communication Teaching",
    role: "Dip.LCM (TD) Certified Teacher",
    period: "2023",
    category: "Pedagogy & Speech",
    lottiePath: "lottie/teacher.json",
    badge: "LCME London",
    shortDesc: "Diploma in Drama & Communication Teaching from the University of West London (LCME) — certified in speech pedagogy and rhetorical communication.",
    domain: "uwl.ac.uk/lcme",
    highlights: [
      "Awarded Dip.LCM (TD) — Drama and Communication Teaching by University of West London (LCME).",
      "Trained in vocal projection, communication theory, dramatic arts, and public speaking.",
      "Applied oratory and speech pedagogy to coaching and performance contexts."
    ],
    tags: ["Rhetoric", "Speech Pedagogy", "Drama Teaching", "LCME London"],
    metrics: [
      { label: "Awarding Body", value: "Univ of West London" },
      { label: "Credential", value: "Dip.LCM (TD)" }
    ]
  }
];

// Education sourced directly from Resume EDUCATION section
export const educationData: EducationItem[] = [
  {
    id: "uol-llb",
    degree: "Bachelor of Laws (LL.B)",
    institution: "University of London",
    period: "July 2024 — Present",
    status: "Currently Reading",
    badge: "Core Law Degree",
    lottiePath: "lottie/justice.json",
    desc: "Rigorous British legal education emphasising corporate governance, international business law, legal system methodology, and commercial contracts.",
    details: [
      "Pursuing the LL.B as an External Programmes candidate of the University of London.",
      "Bridging jurisprudential analysis with entrepreneurial and commercial contexts."
    ],
    modules: ["Contract Law", "Commercial Law", "Public Law", "Legal Systems & Method"]
  },
  {
    id: "lcme-drama",
    degree: "Dip.LCM (TD) Drama & Communication Teaching",
    institution: "University of West London (LCME)",
    period: "2023",
    status: "Completed",
    badge: "Teaching Diploma",
    lottiePath: "lottie/teacher.json",
    desc: "Professional diploma in Drama and Communication Teaching from the London College of Music Examinations body of the University of West London.",
    details: [
      "Certified in vocal projection, communication theory, dramatic arts, and public speaking pedagogy."
    ],
    modules: ["Vocal Dynamics", "Rhetorical Articulation", "Communication Theory", "Performance Pedagogy"]
  },
  {
    id: "special-needs",
    degree: "Diploma in Special Needs Education",
    institution: "London School of Business & Social Sciences",
    period: "2023",
    status: "Completed",
    badge: "Social Sciences",
    lottiePath: "lottie/teacher.json",
    desc: "Comprehensive study of inclusive pedagogy, behavioural analysis, and empathetic leadership.",
    details: [
      "Cultivated deep empathetic intelligence and inclusive problem-solving skills."
    ],
    modules: ["Inclusive Pedagogy", "Behavioural Psychology", "Adaptive Communication", "Empathetic Negotiation"]
  },
  {
    id: "lyceum-ol",
    degree: "Cambridge International Ordinary Level",
    institution: "Lyceum International School, Nugegoda",
    period: "2021",
    status: "Completed",
    badge: "Foundation",
    lottiePath: "lottie/business-presentation.json",
    desc: "Cambridge International O/Level examinations — strong academic foundation in analytical and literary disciplines.",
    details: [
      "Active participant in debate, drama, and extra-curricular academic activities."
    ],
    modules: ["English Language", "Mathematics", "Physics"]
  }
];

// Skills sourced from SKILLS section of Resume
export const skillCategories: SkillCategory[] = [
  {
    title: "Legal Knowledge & Research",
    subtitle: "Corporate Governance, Contracts & IP",
    icon: "Scale",
    skills: [
      { name: "Corporate Governance & Compliance", level: 88 },
      { name: "Contract Law & Legal Research", level: 85 },
      { name: "Intellectual Property Rights", level: 82 },
      { name: "Basic Legal Knowledge (Applied)", level: 90 },
      { name: "Commercial Negotiation", level: 92 }
    ]
  },
  {
    title: "Digital & Enterprise Skills",
    subtitle: "E-Commerce, Marketing & Technology",
    icon: "TrendingUp",
    skills: [
      { name: "E-Commerce Operations & Sales", level: 95 },
      { name: "Social Media Marketing", level: 93 },
      { name: "Prompt Engineering", level: 90 },
      { name: "Canva (Visual Design)", level: 92 },
      { name: "Microsoft Office", level: 88 }
    ]
  }
];

// Soft Skills from Resume
export const softSkills = [
  "Communication", "Problem-Solving", "Adaptability", "Leadership",
  "Creativity", "Strategic Planning", "Organisational Skills",
  "Critical Thinking", "Article Writing", "Time Management",
  "Public Speaking", "Conference Speaking", "Supervisory Skills"
];

// Achievements sourced from Resume ACHIEVEMENTS section
export const achievementsData: AchievementItem[] = [
  {
    title: "All-Island Winner — British Performing Arts Festivals",
    category: "Oratory & Performance",
    year: "Multiple Years",
    desc: "Awarded top nationwide honors across diverse competitive categories in British Performing Arts Festivals.",
    icon: "Trophy"
  },
  {
    title: "Inter-House Drama Competition",
    category: "Theatrical Performance",
    year: "School Level",
    desc: "Won the inter-house drama competition at school level, demonstrating stage presence and leadership.",
    icon: "Drama"
  },
  {
    title: "Founder of Web Mall (Pvt) Ltd",
    category: "Youth Entrepreneurship",
    year: "2021",
    desc: "Established and registered an e-commerce corporation at age 18, navigating logistics, payments, and product sourcing.",
    icon: "Building"
  }
];

// Languages from Resume SKILLS section
export const languagesData = [
  { name: "English",  fluency: "Fluent / Primary",      badge: "Primary Rhetoric" },
  { name: "Sinhala",  fluency: "Native / Fluent",        badge: "Bilingual Fluency" },
  { name: "Hindi",    fluency: "Working Conversational", badge: "Regional Business" }
];

// Modal dossiers — content drawn from Resume descriptions
export const modalDetailsData: Record<string, ModalDetailRecord> = {
  "web-mall": {
    title: "Web Mall (Pvt) Ltd — Enterprise Dossier",
    subtitle: "Flagship Corporate Enterprise",
    period: "2021 — Present",
    narrative: [
      "Hannah Elangovan is the Founder and CEO of Web Mall Private Limited — an E-Commerce business dealing in fashion accessories, bags, apparel, ornaments, and more.",
      `With ${_ventYrs()} years of active scaling, Hannah has managed all aspects of the business: product sourcing, digital marketing across social platforms, customer relations, and operational management.`,
      "She deploys Canva for visual brand assets and leverages Prompt Engineering for efficient content creation and automation."
    ],
    highlights: [
      "Founded and registered Web Mall (Pvt) Ltd as a private limited company.",
      "Multi-category e-commerce: fashion accessories, bags, apparel, ornaments & lifestyle.",
      "Proficient in social media platforms for product promotion, marketing and sales.",
      "Utilises Canva for creative content and Prompt Engineering for automation.",
      `${_ventYrs()}+ years of continuous operational scaling.`
    ],
    link: "https://web-mall-sand.vercel.app",
    linkText: "Visit Web Mall Website",
    iframeUrl: "https://web-mall-sand.vercel.app",
    instagramLinks: [
      "https://www.instagram.com/webmalll.lk",
      "https://www.instagram.com/webmall.official"
    ]
  },
  "antha-prerna": {
    title: "ANTHA PRERNA 2025 — Keynote Dossier",
    subtitle: "International Resource Person",
    period: "2025",
    narrative: [
      "Hannah was a Resource Person at ANTHA PRERNA 2025, an international workshop held at Kochi Business School, Cochin, Kerala, India.",
      "The event brought together an exceptional panel of global facilitators and thought leaders, all united by one mission: to 'awaken the inner drive of aspiring professionals and mold them into the leaders of tomorrow.'",
      "Hannah contributed sessions focused on Entrepreneurship Development, Leadership Training, and Outbound Learning."
    ],
    highlights: [
      "International Resource Person at Kochi Business School, Kerala, India.",
      "Workshop focus: Entrepreneurship Development, Leadership Training, Outbound Learning.",
      "Collaborated with a global panel of facilitators and thought leaders.",
      "Officially documented on the Kochi Business School event page."
    ],
    link: "https://kbs.edu.in/event/antha-prerna-2025-igniting-inner-drive-shaping-future-leaders.html",
    linkText: "Verify on Kochi Business School Website"
  },
  "keynote-antha": {
    title: "ANTHA PRERNA 2025 — Keynote Dossier",
    subtitle: "International Resource Person",
    period: "2025",
    narrative: [
      "Hannah was a Resource Person at ANTHA PRERNA 2025, an international workshop held at Kochi Business School, Cochin, Kerala, India.",
      "The event brought together an exceptional panel of global facilitators and thought leaders, all united by one mission: to 'awaken the inner drive of aspiring professionals and mold them into the leaders of tomorrow.'",
      "Hannah contributed sessions focused on Entrepreneurship Development, Leadership Training, and Outbound Learning."
    ],
    highlights: [
      "International Resource Person at Kochi Business School, Kerala, India.",
      "Workshop focus: Entrepreneurship Development, Leadership Training, Outbound Learning.",
      "Collaborated with a global panel of facilitators and thought leaders.",
      "Officially documented on the Kochi Business School event page."
    ],
    link: "https://kbs.edu.in/event/antha-prerna-2025-igniting-inner-drive-shaping-future-leaders.html",
    linkText: "Verify on Kochi Business School Website"
  },
  "daraz-summit": {
    title: "Daraz Women in E-Commerce Summit 2022",
    subtitle: "Participant & Founder Delegate",
    period: "2022",
    narrative: [
      "Hannah participated in the Daraz Women in E-Commerce Summit in 2022.",
      "She engaged in sessions on digital marketplace scaling, e-commerce trends, and female entrepreneurship — gaining practical insight directly applicable to scaling Web Mall (Pvt) Ltd."
    ],
    highlights: [
      "Sessions on digital marketplace scaling.",
      "E-commerce trends and best practices.",
      "Female entrepreneurship and leadership development."
    ]
  },
  "drama-teaching": {
    title: "Dip.LCM (TD) Drama & Communication Teaching",
    subtitle: "Professional Teaching Credential",
    period: "2023",
    narrative: [
      "Hannah holds the Dip.LCM (TD) qualification in Drama and Communication Teaching, awarded by the University of West London through the London College of Music Examinations (LCME).",
      "This credential certifies her in speech pedagogy, vocal projection, communication theory, and dramatic arts instruction."
    ],
    highlights: [
      "Dip.LCM (TD) — Drama and Communication Teaching.",
      "Awarded by University of West London (LCME), 2023.",
      "Certified in vocal projection, communication theory, and dramatic arts.",
      "Applied oratory skills to professional speaking and coaching contexts."
    ]
  },
  "resume": {
    title: "Hannah Elangovan — Official Resume & Profile",
    subtitle: "E-Commerce Founder & Legal Scholar",
    period: "July 2024 — Present",
    narrative: [
      _bioStr(),
      "Currently pursuing a Bachelor of Laws (LL.B) at the University of London, bringing together practical enterprise execution, speech pedagogy, special needs education, and international keynote experience."
    ],
    highlights: [
      `Objective: Entrepreneurial ${_ageLbl()} leveraging proven leadership & strategic problem solving in legal education.`,
      "Current Education: Bachelor of Laws (LL.B) — University of London (July 2024 – Present).",
      "Education Credentials: Dip.LCM (TD) Drama & Communication Teaching (Univ of West London, 2023), Diploma in Special Needs Education (2023), Cambridge O/Level (Lyceum, 2021).",
      "Keynote Project: ANTHA PRERNA 2025 International Resource Person at Kochi Business School, Kerala, India.",
      "Initiative: Founder & CEO of Web Mall (Pvt) Ltd — E-Commerce business in fashion accessories, bags, apparel, & ornaments.",
      "Skills & Tools: Microsoft Office, Social Commerce Marketing & Sales, Canva, Prompt Engineering, Languages (English, Sinhala, Hindi).",
      "Soft Skills: Public Speaking, Strategic Planning, Critical Thinking, Contract & Legal Foundations, Leadership, Article Writing.",
      "Honors: All-Island Winner at British Performing Arts Festivals, Inter-House Drama Winner.",
      "Professional References: Mr. Abhishek K (Full Stack Developer, Assimilate Tech) & Dr. Sanjaya Gunasekara (Medical Officer, Base Hospital Bibila)."
    ],
    link: "/resume.pdf",
    linkText: "Download PDF Resume"
  }
};
