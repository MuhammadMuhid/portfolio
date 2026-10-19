export const profile = {
  name: 'Muhammad Muhid',
  role: 'Software Engineer',
  email: 'muhammadmuhid42@gmail.com',
  phone: '+92 315 2091610',
  phoneHref: 'tel:+923152091610',
  linkedin: 'https://www.linkedin.com/in/muhammad-muhid-595151262/',
  resume: './Muhammad-Muhid-Resume.pdf',
  photo: './images/muhammad-muhid.jpg',
  summary: 'Software Engineer involved in maintaining internal business dashboards, workflow automation, and business system integrations. Experienced with Zapier, GoHighLevel, webhooks, and AI-assisted software development.',
  introduction: 'I started in WordPress and front-end development. Today, I work on business dashboards, software integrations, and automation solutions - connecting the interface to the systems behind it.',
};

export const migrationMetrics = [
  { value: 47, digits: 2, label: 'Database tables', detail: 'Migrated from the legacy platform' },
  { value: 28, digits: 2, label: 'Webhooks', detail: 'Part of the platform migration' },
  { value: 7, digits: 2, label: 'Scheduled jobs', detail: 'Included in the system cutover' },
  { value: 0, digits: 1, label: 'Downtime', detail: 'During the live migration' },
];

export const projects = [
  {
    id: 'bi', number: '01', name: 'A new foundation.\nThe same live business.', title: 'Internal BI platform migration',
    type: 'BUSINESS SYSTEMS', year: '2026', kind: 'migration',
    description: 'A live PHP/MySQL business intelligence platform, migrated to Next.js and Supabase without downtime.',
    tools: ['Next.js', 'Supabase', 'Webhooks'],
    note: 'Internal platform / private implementation',
    context: 'Maintaining and modernizing an internal business intelligence platform as Software Engineer at Thecwaly.',
    contributions: [
      'Migrated 47 tables, 28 webhooks, and 7 scheduled jobs from PHP/MySQL to Next.js and Supabase with no downtime.',
      'Reconciled dashboard figures against the legacy system before cutover to confirm parity.',
      'Traced silent webhook failures and blocked a proposed backfill after finding corrupt source data.',
      'Built an admin panel for Facebook API accounts and credentials with server-side token masking.',
      'Used AI-assisted development tools to support implementation, testing, verification, and ongoing maintenance.',
      'Built and maintained Zapier and GoHighLevel automations feeding the data pipelines.'
    ]
  },
  {
    id: 'travel', number: '02', name: 'A digital home\nfor the next journey.', title: 'Carr World Travel',
    type: 'WEB DEVELOPMENT', year: 'WEBSITE PROJECT', kind: 'travel',
    description: 'A WordPress website project built with Divi, Advanced Custom Fields, and custom front-end code.',
    tools: ['WordPress', 'Divi', 'ACF', 'Forminator'],
    url: 'https://carrworldtravel.com', note: 'carrworldtravel.com',
    context: 'A website project listed in my portfolio, combining WordPress tools and front-end implementation.',
    contributions: [
      'Used Divi and Advanced Custom Fields within the WordPress implementation.',
      'Worked with HTML, CSS, and JavaScript for the front end.',
      'Included Forminator in the project toolset.'
    ]
  },
  {
    id: 'lesscode', number: '03', name: 'Thoughtful interfaces.\nFlexible foundations.', title: 'Lesscode',
    type: 'WEB DEVELOPMENT', year: 'WEBSITE PROJECT', kind: 'lesscode',
    description: 'A WordPress website project bringing Elementor, dynamic content, and front-end development together.',
    tools: ['WordPress', 'Elementor', 'ACF', 'JavaScript'],
    url: 'https://lesscode.io', note: 'lesscode.io',
    context: 'A website project listed in my portfolio, using Elementor and Advanced Custom Fields.',
    contributions: [
      'Worked with Elementor for the WordPress website implementation.',
      'Used Advanced Custom Fields in the project.',
      'Worked with HTML, CSS, and JavaScript for front-end development.'
    ]
  },
];

export const experience = [
  { role: 'Software Engineer', company: 'Thecwaly', dates: 'JUL 2026 - PRESENT', summary: 'Internal business dashboards, workflow automation, and integrations.', items: [
    'Migrated the live internal BI platform from PHP/MySQL to Next.js and Supabase, covering 47 tables, 28 webhooks, and 7 scheduled jobs.',
    'Verified dashboard parity, investigated webhook failures, and built a credentials admin panel with server-side token masking.',
    'Maintain Zapier and GoHighLevel data pipelines, with AI-assisted implementation, testing, and verification.'
  ]},
  { role: 'CMS Developer', company: 'HZ Tech', dates: 'FEB 2026 - JUN 2026', summary: 'Responsive WordPress, Shopify, and GoHighLevel implementation.', items: [
    'Built responsive websites from Figma and PSD designs using Elementor, Divi, Kadence, WPBakery, HTML, CSS, and JavaScript.',
    'Integrated ACF with PHP for dynamic content and custom post types; developed forms with Forminator.',
    'Built GoHighLevel landing page sections and customized Shopify themes.'
  ]},
  { role: 'WordPress Developer', company: 'KGT Global', dates: 'SEP 2025 - FEB 2026', summary: 'Responsive websites, dynamic content, and WooCommerce.', items: [
    'Designed and customized websites using Elementor and Divi Builder.',
    'Integrated ACF and Dynamic Content for custom post types in the Theme Builder.',
    'Worked with WooCommerce products, categories, product page customization, and WordPress plugins.'
  ]}
];

export const skillGroups = [
  { name: 'Interfaces', label: 'WEB & FRONT END', tools: ['WordPress', 'HTML5', 'CSS3', 'JavaScript', 'Bootstrap', 'Tailwind CSS', 'Next.js'], description: 'Responsive interfaces, dynamic content, and the front end of business systems.' },
  { name: 'Automation', label: 'CONNECTED SYSTEMS', tools: ['Zapier', 'GoHighLevel', 'Webhooks', 'Close CRM'], description: 'Business workflows and integrations that connect the tools behind the interface.' },
  { name: 'Data & delivery', label: 'PLATFORMS & LANGUAGES', tools: ['Supabase', 'SQL', 'Python', 'C#', 'C++', 'Git', 'GitHub', 'Vercel', 'cPanel'], description: 'The data, programming, and delivery tools behind my development work.' }
];

export const academicProjects = [
  { name: 'School Management System', tools: 'C# / SQL SERVER', text: 'Developed a school management system using SQL Server and C#, featuring a user-friendly interface and data validation mechanisms.' },
  { name: 'Network University Management System', tools: 'CISCO PACKET TRACER', text: 'Created a network topology using hierarchical network design, correct device cabling, VLANs, port assignments, subnetting, and IP addressing.' }
];
