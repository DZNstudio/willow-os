import {
  TeamMember,
  ToolCategory,
  Project,
  Client,
  Trend,
  Campaign,
  ActivityItem,
} from './types';

// ── Design Tokens ──────────────────────────────────────────────
export const colors = {
  willow: '#00796B',
  willowDark: '#004D40',
  willowLight: '#E0F2F1',
  accent: '#FF6F00',
  accentLight: '#FFF3E0',
  success: '#4CAF50',
  warning: '#FFC107',
  danger: '#F44336',
  phases: {
    Discovery: '#7C4DFF',
    Design: '#00BCD4',
    Build: '#FF9800',
    Review: '#E91E63',
    Launch: '#4CAF50',
  },
  stages: {
    lead: '#90CAF9',
    proposal: '#FFE082',
    active: '#A5D6A7',
    completed: '#CE93D8',
  },
} as const;

// ── Team ───────────────────────────────────────────────────────
export const team: TeamMember[] = [
  {
    name: 'Dominika',
    role: 'Lead Graphic Designer & Brand Specialist',
    tools: [
      'Adobe Photoshop', 'Adobe Illustrator', 'Adobe InDesign',
      'Affinity Designer', 'Affinity Photo', 'Canva',
    ],
    skills: [
      'Brand identity', 'Logo design', 'Print design',
      'Visual storytelling', 'Marketing materials', 'Spline 3D',
      'Quality sign-off',
    ],
    color: '#00796B',
    initials: 'D',
    delegationAreas: [
      'Brand identity & logo design',
      'Graphic design & print collateral',
      'Photoshop/Illustrator/Affinity work',
      'Visual direction & creative sign-off',
      'Spline 3D asset creation',
      'Marketing materials & pitch decks',
      'Liaison with backend developers',
    ],
  },
  {
    name: 'Kelly',
    role: 'Marketing & Social Media Specialist',
    tools: [
      'Canva', 'Adobe Express', 'Social scheduling tools',
      'Email marketing platforms',
    ],
    skills: [
      'Content creation', 'Campaign planning',
      'Social media management', 'Community engagement',
      'Inbound marketing', 'Email marketing',
    ],
    color: '#E91E63',
    initials: 'K',
    delegationAreas: [
      'Social media content creation',
      'Canva & Adobe Express assets',
      'Email marketing campaigns',
      'Social scheduling & publishing',
      'Campaign content execution',
      'Community management',
      'Inbound marketing',
    ],
  },
  {
    name: 'Cynthia',
    role: 'Project Manager & Junior Designer',
    tools: ['Figma', 'Monday.com', 'Google Calendar'],
    skills: [
      'Project management', 'Sprint tracking',
      'Client communication', 'UI/UX design',
      'Front-end web development', 'App UI/UX',
    ],
    color: '#7C4DFF',
    initials: 'C',
    delegationAreas: [
      'Project management & sprint tracking',
      'Client communication & briefing',
      'Workflow coordination & delivery',
      'UI/UX design execution in Figma',
      'Front-end web development',
      'App UI/UX (front-end)',
      'Front-end animation implementation',
    ],
  },
];

// ── Tool Library ───────────────────────────────────────────────
export const toolCategories: ToolCategory[] = [
  {
    name: 'Graphic Design & Image Editing',
    icon: '🎨',
    tools: [
      { rank: 1, name: 'Adobe Photoshop', bestFor: 'Raster editing, photo retouching, complex digital art' },
      { rank: 2, name: 'Adobe Illustrator', bestFor: 'Vector graphics, logos, icons, illustrations' },
      { rank: 3, name: 'Affinity Designer', bestFor: 'Professional vector design, budget-friendly Illustrator alternative' },
      { rank: 4, name: 'Affinity Photo', bestFor: 'Professional photo editing, Photoshop alternative' },
      { rank: 5, name: 'Adobe InDesign', bestFor: 'Print layout, magazines, brochures, digital documents' },
      { rank: 6, name: 'Canva', bestFor: 'Quick template-driven social graphics, presentations, marketing materials' },
      { rank: 7, name: 'Adobe Express', bestFor: 'Rapid AI-assisted content creation' },
      { rank: 8, name: 'GIMP', bestFor: 'Free open-source photo editing' },
      { rank: 9, name: 'Inkscape', bestFor: 'Free open-source vector graphics' },
    ],
  },
  {
    name: 'UI/UX & Prototyping',
    icon: '📐',
    tools: [
      { rank: 1, name: 'Figma', bestFor: 'Primary tool for UI design, prototyping, and team collaboration' },
      { rank: 2, name: 'Framer', bestFor: 'High-fidelity interactive prototypes and web publishing' },
      { rank: 3, name: 'Sketch', bestFor: 'Mac-based UI design and design systems' },
      { rank: 4, name: 'UXPin', bestFor: 'Advanced code-based prototypes' },
      { rank: 5, name: 'Uizard', bestFor: 'AI-powered UI generation from text or sketches' },
      { rank: 6, name: 'Balsamiq', bestFor: 'Low-fidelity wireframing' },
      { rank: 7, name: 'Miro', bestFor: 'UX research, user journey mapping, collaborative whiteboarding' },
      { rank: 8, name: 'Maze', bestFor: 'Remote user testing and feedback' },
    ],
  },
  {
    name: 'Website Builders',
    icon: '🌐',
    tools: [
      { rank: 1, name: 'Webflow', bestFor: 'Advanced custom, code-based design' },
      { rank: 2, name: 'Framer', bestFor: 'Design-led sites with animation and interaction' },
      { rank: 3, name: 'Squarespace', bestFor: 'Stylish, professional, visually strong sites' },
      { rank: 4, name: 'Shopify', bestFor: 'E-commerce and online stores' },
      { rank: 5, name: 'Wix', bestFor: 'Usability, creative freedom, large template library' },
      { rank: 6, name: 'WordPress.com', bestFor: 'Content-heavy sites and blogging' },
      { rank: 7, name: 'Hostinger', bestFor: 'Budget option with strong AI features' },
      { rank: 8, name: 'GoDaddy', bestFor: 'Fast basic site launch' },
      { rank: 9, name: 'SITE123', bestFor: 'Beginner-friendly, quick builds' },
      { rank: 10, name: 'IONOS', bestFor: 'Affordable with solid business tools' },
    ],
  },
  {
    name: 'AI Vibe Coding & Development',
    icon: '🤖',
    tools: [
      { rank: 1, name: 'Lovable.dev', bestFor: 'Full-stack web apps from natural language prompts' },
      { rank: 2, name: 'Variant.com', bestFor: 'Design-to-code platform with high-fidelity output, use where possible', preferred: true },
      { rank: 3, name: 'Bolt.new', bestFor: 'Rapid prototyping and full-stack development' },
      { rank: 4, name: 'v0 by Vercel', bestFor: 'React UI component generation' },
      { rank: 5, name: 'Framer', bestFor: 'Design to live website' },
      { rank: 6, name: 'Cursor', bestFor: 'AI-powered code editor for refining vibe-coded builds' },
      { rank: 7, name: 'Replit', bestFor: 'Cloud-based development, deployment, and hosting' },
      { rank: 8, name: 'Windsurf', bestFor: 'AI-powered IDE with agentic Cascade assistant' },
      { rank: 9, name: 'Claude Code', bestFor: 'Complex intelligent builds via command line' },
      { rank: 10, name: 'Figma Make', bestFor: 'Figma designs to production-ready code' },
      { rank: 11, name: 'Wix Harmony', bestFor: 'Visual drag-and-drop plus vibe coding prompts' },
      { rank: 12, name: 'Tempo Labs', bestFor: 'Rapid React UI generation and error fixing' },
    ],
  },
  {
    name: 'No-Code & App Building',
    icon: '🧩',
    tools: [
      { rank: 1, name: 'Bubble', bestFor: 'Complex data-driven web applications' },
      { rank: 2, name: 'Webflow', bestFor: 'Design and deploy responsive websites' },
      { rank: 3, name: 'FlutterFlow', bestFor: 'Native mobile and cross-platform apps' },
      { rank: 4, name: 'Softr', bestFor: 'Apps and portals from Airtable or Google Sheets' },
      { rank: 5, name: 'Glide', bestFor: 'Internal tools and dashboards from spreadsheets' },
      { rank: 6, name: 'Adalo', bestFor: 'Native mobile apps, drag-and-drop' },
      { rank: 7, name: 'Bravo Studio', bestFor: 'Figma designs to native iOS and Android apps' },
      { rank: 8, name: 'WeWeb', bestFor: 'Scalable front-end web apps' },
      { rank: 9, name: 'Retool', bestFor: 'Internal tools connected to existing databases' },
      { rank: 10, name: 'OutSystems', bestFor: 'Enterprise-grade scalable applications' },
    ],
  },
  {
    name: '3D, Animation & Advanced Effects',
    icon: '✨',
    tools: [
      { rank: 1, name: 'Spline', bestFor: '3D design and animation for web, embedded directly into sites' },
      { rank: 2, name: 'Framer', bestFor: 'Parallax scrolling, scroll-triggered animations, micro-interactions' },
      { rank: 3, name: 'Webflow', bestFor: 'Scroll animations, CMS-driven interactions' },
      { rank: 4, name: 'Lottie / LottieFiles', bestFor: 'Lightweight vector animations for web and app' },
      { rank: 5, name: 'Three.js', bestFor: 'Advanced 3D graphics in the browser (developer-level)' },
    ],
  },
  {
    name: 'Design Inspiration & Reference',
    icon: '💡',
    tools: [
      { rank: 1, name: 'Mobbin', bestFor: 'Leading library of real-world mobile and web UI patterns from top apps' },
      { rank: 2, name: 'Savee', bestFor: 'Curated visual inspiration for mood boarding and visual direction' },
    ],
  },
];

// ── Sample Projects ────────────────────────────────────────────
export const sampleProjects: Project[] = [
  {
    id: 'proj-001',
    name: 'Harlow & Co Brand Refresh',
    client: 'Harlow & Co',
    phase: 'Design',
    status: 'active',
    description: 'Complete brand identity refresh including logo, colour palette, typography, and brand guidelines.',
    sprints: [
      {
        id: 'spr-001', name: 'Discovery & Research', number: 1,
        startDate: '2026-04-06', endDate: '2026-04-17',
        deliverables: [
          { id: 'd-001', name: 'Brand audit report', owner: 'Dominika', deadline: '2026-04-10', status: 'complete' },
          { id: 'd-002', name: 'Competitor analysis', owner: 'Kelly', deadline: '2026-04-14', status: 'complete' },
          { id: 'd-003', name: 'Mood board & direction', owner: 'Dominika', deadline: '2026-04-17', status: 'complete' },
        ],
        milestone: { id: 'm-001', name: 'Discovery Sign-off', date: '2026-04-17', completed: true },
      },
      {
        id: 'spr-002', name: 'Visual Identity Design', number: 2,
        startDate: '2026-04-20', endDate: '2026-05-01',
        deliverables: [
          { id: 'd-004', name: 'Logo concepts x3', owner: 'Dominika', deadline: '2026-04-25', status: 'in-progress' },
          { id: 'd-005', name: 'Colour & typography system', owner: 'Dominika', deadline: '2026-04-28', status: 'pending' },
          { id: 'd-006', name: 'Brand guidelines draft', owner: 'Dominika', deadline: '2026-05-01', status: 'pending' },
        ],
        milestone: { id: 'm-002', name: 'Client Presentation', date: '2026-05-01', completed: false },
      },
    ],
  },
  {
    id: 'proj-002',
    name: 'GreenLeaf Shopify Store',
    client: 'GreenLeaf Organics',
    phase: 'Build',
    status: 'active',
    description: 'E-commerce Shopify build with custom theme, product catalogue, and checkout flow.',
    sprints: [
      {
        id: 'spr-003', name: 'Store Setup & Theme', number: 1,
        startDate: '2026-04-13', endDate: '2026-04-24',
        deliverables: [
          { id: 'd-007', name: 'Shopify store setup', owner: 'Cynthia', deadline: '2026-04-16', status: 'in-progress' },
          { id: 'd-008', name: 'Custom theme design', owner: 'Dominika', deadline: '2026-04-21', status: 'pending' },
          { id: 'd-009', name: 'Product catalogue upload', owner: 'Kelly', deadline: '2026-04-24', status: 'pending' },
        ],
      },
    ],
  },
  {
    id: 'proj-003',
    name: 'Foundation Ventures Website',
    client: 'Foundation Ventures',
    phase: 'Discovery',
    status: 'active',
    description: 'Premium agency website with Spline 3D hero, parallax scrolling, and case study CMS.',
    sprints: [
      {
        id: 'spr-004', name: 'Discovery & Wireframing', number: 1,
        startDate: '2026-04-27', endDate: '2026-05-08',
        deliverables: [
          { id: 'd-010', name: 'Sitemap & IA', owner: 'Cynthia', deadline: '2026-04-30', status: 'pending' },
          { id: 'd-011', name: 'Wireframes', owner: 'Cynthia', deadline: '2026-05-05', status: 'pending' },
          { id: 'd-012', name: 'Copy brief', owner: 'Kelly', deadline: '2026-05-08', status: 'pending' },
        ],
      },
    ],
  },
];

// ── Sample Clients ─────────────────────────────────────────────
export const sampleClients: Client[] = [
  { id: 'cli-001', name: 'Harlow & Co', type: 'Brand', stage: 'active', projects: ['proj-001'], entryPoint: 'Brand discovery & identity system', upsell: 'Brand guidelines, collateral suite, web design', value: '\u00A35,500' },
  { id: 'cli-002', name: 'GreenLeaf Organics', type: 'E-Commerce', stage: 'active', projects: ['proj-002'], entryPoint: 'Shopify build', upsell: 'Email marketing, paid social, UX optimisation', value: '\u00A38,000' },
  { id: 'cli-003', name: 'Foundation Ventures', type: 'Web', stage: 'active', projects: ['proj-003'], entryPoint: 'Custom website build', upsell: 'CMS, maintenance retainer, SEO', value: '\u00A312,000' },
  { id: 'cli-004', name: 'The Willow Room', type: 'Hospitality', stage: 'lead', projects: [], entryPoint: 'Brand identity + website', upsell: 'Social management, content creation', value: '\u00A37,500' },
  { id: 'cli-005', name: 'Carter Plumbing', type: 'SME', stage: 'proposal', projects: [], entryPoint: 'Website redesign', upsell: 'Social media retainer', value: '\u00A32,800' },
  { id: 'cli-006', name: 'Bright Studios', type: 'Brand', stage: 'completed', projects: [], entryPoint: 'Brand refresh', upsell: 'Web design', value: '\u00A34,200' },
];

// ── Sample Trends ──────────────────────────────────────────────
export const sampleTrends: Trend[] = [
  {
    id: 'tr-001', name: 'Bento Grid Layouts', week: 'W15 2026',
    description: 'Modular, card-based grid layouts inspired by Japanese bento boxes. Creates visual hierarchy with mixed-size content blocks.',
    disciplines: ['Web Design', 'UI/UX'], tools: ['Figma', 'Webflow', 'Framer'],
    example: 'Apply to Foundation Ventures homepage, showcase services in bento grid with 3D Spline assets.',
    status: 'implement',
  },
  {
    id: 'tr-002', name: 'Organic Shapes & Blobs', week: 'W15 2026',
    description: 'Soft, flowing organic shapes replacing hard geometric forms. Adds warmth and approachability.',
    disciplines: ['Graphic Design', 'Branding', 'Web Design'], tools: ['Illustrator', 'Figma', 'Spline'],
    example: 'Integrate into Harlow & Co brand refresh as background texture elements.',
    status: 'implement',
  },
  {
    id: 'tr-003', name: 'AI-Generated Texture Packs', week: 'W15 2026',
    description: 'Custom textures generated via Midjourney/DALL-E for unique brand assets and backgrounds.',
    disciplines: ['Graphic Design', 'Branding'], tools: ['Midjourney', 'Photoshop'],
    example: 'Create bespoke texture set for The Willow Room hospitality brand.',
    status: 'watch',
  },
  {
    id: 'tr-004', name: 'Scroll-Triggered 3D Reveals', week: 'W14 2026',
    description: 'Interactive 3D elements that animate and reveal on scroll using Spline + Framer.',
    disciplines: ['Web Design', 'Motion/3D'], tools: ['Spline', 'Framer', 'Three.js'],
    example: 'Hero section for Foundation Ventures website, 3D logo reveal on scroll.',
    status: 'implement',
  },
  {
    id: 'tr-005', name: 'Variable Font Animations', week: 'W14 2026',
    description: 'Typography that morphs weight, width, and slant on hover or scroll for dynamic visual impact.',
    disciplines: ['Web Design', 'UI/UX', 'Branding'], tools: ['CSS', 'Framer', 'Webflow'],
    example: 'Apply to agency website section headers for premium feel.',
    status: 'watch',
  },
];

// ── Sample Campaign ────────────────────────────────────────────
export const sampleCampaigns: Campaign[] = [
  {
    id: 'cmp-001', name: 'Q2 Agency Awareness Push', objective: 'Generate 15 qualified leads for web design services',
    audience: 'SME owners and marketing managers in the Midlands',
    channels: ['LinkedIn', 'Instagram', 'Email'],
    timeline: 'April 14 – May 23, 2026',
    creativeDirection: 'Clean, professional, portfolio-led. Show before/after transformations. Teal & white palette.',
    delegation: [
      { member: 'Kelly', tasks: ['Social content calendar', 'Post scheduling', 'Community engagement', 'Email sequences'] },
      { member: 'Dominika', tasks: ['Campaign visuals', 'Case study graphics', 'Portfolio carousel assets'] },
      { member: 'Cynthia', tasks: ['Landing page build', 'UTM tracking setup', 'Weekly performance report'] },
    ],
    metrics: ['Leads generated', 'Website traffic from social', 'Email open rate', 'LinkedIn engagement rate'],
    status: 'active',
  },
];

// ── Sample Activity Feed ───────────────────────────────────────
export const sampleActivity: ActivityItem[] = [
  { id: 'act-001', action: 'completed', subject: 'Brand audit report', time: '2 hours ago', actor: 'Dominika' },
  { id: 'act-002', action: 'started', subject: 'Logo concepts x3', time: '3 hours ago', actor: 'Dominika' },
  { id: 'act-003', action: 'published', subject: 'Instagram carousel post', time: '5 hours ago', actor: 'Kelly' },
  { id: 'act-004', action: 'updated', subject: 'Sprint board for GreenLeaf', time: 'Yesterday', actor: 'Cynthia' },
  { id: 'act-005', action: 'sent', subject: 'Proposal to Carter Plumbing', time: 'Yesterday', actor: 'Cynthia' },
  { id: 'act-006', action: 'reviewed', subject: 'Competitor analysis deck', time: '2 days ago', actor: 'Kelly' },
];

// ── Client Type Strategies ─────────────────────────────────────
export const clientTypeStrategies: Record<string, { lead: string; entry: string; upsell: string }> = {
  SME: {
    lead: 'Lead with speed, clarity, and value.',
    entry: 'Website redesign or brand refresh package',
    upsell: 'Ongoing social media management retainer',
  },
  Brand: {
    lead: 'Lead with strategy and process.',
    entry: 'Brand discovery and identity system',
    upsell: 'Brand guidelines, collateral suite, and web design',
  },
  Web: {
    lead: 'Lead with portfolio and technical credibility.',
    entry: 'Custom website build',
    upsell: 'CMS setup, ongoing maintenance retainer, and SEO',
  },
  'E-Commerce': {
    lead: 'Lead with conversion and revenue focus.',
    entry: 'Shopify build or redesign',
    upsell: 'Email marketing setup, paid social creative, and UX optimisation',
  },
  Hospitality: {
    lead: 'Lead with visual excellence and brand feel.',
    entry: 'Brand identity or website redesign with premium motion and 3D',
    upsell: 'Ongoing content creation and social management',
  },
};

// ── Project Discovery Questions ────────────────────────────────
export const projectDiscoverySteps = [
  {
    id: 'client',
    title: 'Client Details',
    description: 'Who is this project for?',
    fields: [
      { key: 'clientName', label: 'Client / Company Name', type: 'text' as const, placeholder: 'e.g. Harlow & Co', required: true },
      { key: 'clientWebsite', label: 'Website URL', type: 'text' as const, placeholder: 'e.g. https://harlow.co' },
      { key: 'clientType', label: 'Client Type', type: 'select' as const, options: ['SME', 'Brand', 'Web', 'E-Commerce', 'Hospitality'] },
    ],
  },
  {
    id: 'project',
    title: 'Project Overview',
    description: 'What are we building?',
    fields: [
      { key: 'projectType', label: 'Project Type', type: 'select' as const, options: ['Website Design & Build', 'Brand Identity', 'Shopify / E-Commerce', 'UI/UX Design', 'App Design', 'Marketing Campaign', 'Social Media', 'Full Rebrand', 'Other'], required: true },
      { key: 'projectDescription', label: 'Brief Description', type: 'textarea' as const, placeholder: 'Describe what the client needs in 2\u20133 sentences...' },
    ],
  },
  {
    id: 'goals',
    title: 'Objectives & Audience',
    description: 'What does success look like?',
    fields: [
      { key: 'objectives', label: 'Primary Objectives', type: 'textarea' as const, placeholder: 'What does the client want to achieve? (e.g. increase online sales by 30%, establish brand presence, generate leads...)' },
      { key: 'targetAudience', label: 'Target Audience', type: 'textarea' as const, placeholder: 'Who is the end user? (age, location, interests, behaviours, B2B/B2C...)' },
      { key: 'competitors', label: 'Key Competitors', type: 'textarea' as const, placeholder: 'List 3\u20135 competitors (names or URLs)' },
    ],
  },
  {
    id: 'scope',
    title: 'Budget & Timeline',
    description: 'What are the constraints?',
    fields: [
      { key: 'budget', label: 'Budget Range', type: 'select' as const, options: ['Under \u00a32,000', '\u00a32,000 \u2013 \u00a35,000', '\u00a35,000 \u2013 \u00a310,000', '\u00a310,000 \u2013 \u00a320,000', '\u00a320,000+', 'TBD / Not confirmed'] },
      { key: 'timeline', label: 'Target Launch / Deadline', type: 'text' as const, placeholder: 'e.g. End of June 2026, or 8 weeks from kickoff' },
    ],
  },
  {
    id: 'assets',
    title: 'Existing Assets & Tech',
    description: 'What do we have to work with?',
    fields: [
      { key: 'brandAssets', label: 'Existing Brand Assets', type: 'textarea' as const, placeholder: 'Logo, brand guidelines, fonts, photography, copy? (list what exists)' },
      { key: 'techRequirements', label: 'Technical Requirements', type: 'textarea' as const, placeholder: 'CMS preference (Webflow, Shopify, WordPress), hosting, integrations, APIs...' },
      { key: 'existingPresence', label: 'Existing Online Presence', type: 'textarea' as const, placeholder: 'Current website URL, social channels, email list size, analytics setup...' },
    ],
  },
  {
    id: 'success',
    title: 'Success & Notes',
    description: 'How do we measure success?',
    fields: [
      { key: 'successMetrics', label: 'Success Metrics', type: 'textarea' as const, placeholder: 'How will we know this project succeeded? (KPIs, targets, benchmarks...)' },
      { key: 'additionalNotes', label: 'Additional Notes', type: 'textarea' as const, placeholder: 'Anything else we should know - preferences, constraints, past experiences, inspiration sites...' },
    ],
  },
];

// ── Navigation Items ───────────────────────────────────────────
export const navItems = [
  { label: 'Dashboard', href: '/', icon: 'home' },
  { label: 'Projects', href: '/projects', icon: 'folder' },
  { label: 'Team', href: '/team', icon: 'users' },
  { label: 'Clients', href: '/clients', icon: 'briefcase' },
  { label: 'Tools', href: '/tools', icon: 'wrench' },
  { label: 'Trends', href: '/trends', icon: 'trending' },
  { label: 'Campaigns', href: '/campaigns', icon: 'megaphone' },
  { label: 'Agency Ops', href: '/ops', icon: 'settings' },
] as const;

// ── Vibe Coding Methodology ────────────────────────────────────
export const vibeCodingMethodology = {
  preferredPlatform: 'Variant.com',
  preferredNote: 'Use Variant where possible for higher-fidelity output. Evaluate Variant first before falling back to Lovable, Bolt, or other vibe coding tools.',
  rules: [
    {
      title: 'Reference-First Workflow',
      description: 'Never start a vibe coding session with a blank prompt. Treat AI the same way you treat a brief - give it direction before expecting output.',
      tips: [
        'Sketch a rough wireframe (even on paper) before prompting',
        'Pull up a site you like - study the layout, then feed screenshots into the AI tool',
        'Drop in screenshots of layouts, hero sections, colour palettes, and component examples',
        'Paste raw HTML from a component you want to match',
        'Use Savee for mood boarding and visual direction; use Mobbin for UI patterns',
        'The more visual context you give, the closer the output gets to what\u2019s in your head',
      ],
    },
    {
      title: 'Specific Feedback, Not Vague Direction',
      description: '\u201CMake it look better\u201D is like a client saying \u201Cmake it pop.\u201D Be precise with every iteration. Think design review, not wishful thinking.',
      tips: [
        'Use pixel values: \u201CReduce left/right padding in the hero to 32px\u201D not \u201Cfix the spacing\u201D',
        'Use exact sizes: \u201CIncrease heading to 48px semi-bold\u201D not \u201Cmake the font bigger\u201D',
        'Reference specific components: \u201CThe CTA button in the navbar\u201D not \u201Cthe button\u201D',
        'Use hex codes for colours: \u201CChange to #00796B\u201D not \u201Cmake it greener\u201D',
        'The more specific you are, the fewer rounds of back-and-forth',
      ],
    },
    {
      title: 'Kill the Default Font',
      description: 'Almost every AI tool defaults to Inter. It\u2019s a fine font, but it\u2019s become the universal signal for \u201Cthis was AI-generated.\u201D',
      tips: [
        'Tell the AI tool your font choice upfront: e.g. \u201CUse Satoshi for headings, DM Sans for body\u201D',
        'If you don\u2019t have a font in mind, experiment - try 2\u20133 options and pick what fits',
        'If you do use Inter, be creative: Inter Display, all caps, tightened letter spacing',
        'Make a deliberate choice - never accept the default',
      ],
    },
    {
      title: 'Kill the Default Gradients & Colours',
      description: 'AI tools gravitate toward blue-purple gradients. Every vibe-coded project ends up with the same gradient hero and purple accent buttons.',
      tips: [
        'Remove gradients entirely - flat colours are cleaner and harder to mess up',
        'Go to coolors.co, generate a palette you like, screenshot the hex codes',
        'Drop the screenshot into chat: \u201CReplace the colour palette with the colours from this image\u201D',
        'Be explicit: \u201CUse the lightest colour as background, darkest for text, midtones for accents and buttons\u201D',
        'Never ship the default AI colour palette',
      ],
    },
    {
      title: 'Remove Emojis & Fix Spacing',
      description: 'AI scatters emojis across the UI and uses generic spacing that feels slightly off. Individually small, but stacked together they scream \u201CAI-generated.\u201D',
      tips: [
        'Remove all emojis - replace with proper icons or cut entirely',
        'Tighten padding and margins - AI is too generous with white space',
        'Go through every section and ask: \u201CIs this how I would have designed it?\u201D',
        'These are 5-minute fixes that completely change the overall feel',
      ],
    },
    {
      title: 'Taste Is the 20% That Matters',
      description: 'AI does 80% of the work. Your taste as a designer is the other 20%. That 20% is the difference between AI slop and something that looks designed.',
      tips: [
        'Browse Savee and Mobbin daily - at least 10 minutes studying good design',
        'The better your taste, the better your references, the better the output - it\u2019s a loop',
        'No amount of prompting tricks will save you if you don\u2019t know what good looks like',
        'The tool isn\u2019t the advantage - everyone has the same tools. Taste is the advantage.',
      ],
    },
  ],
};
