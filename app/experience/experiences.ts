export interface Experience {
  title: string
  company: string
  location: string
  startDate: string
  endDate?: string
  description: string
  achievements: string[]
  technologies: string[]
  website?: string
}

export const experiences: Experience[] = [
  {
    title: 'Software Developer',
    company: 'Sphyrna Security Inc.',
    location: 'Ottawa, ON',
    startDate: '2024-05',
    description:
      'Developing various internal tools and applications. As well as rewriting existing products in Rust to improve performance and security.',
    achievements: [
      "Rewrote and expanded the company's primary hardware testing suite from Bash to Rust, enabling reliable high-speed validation of network appliance throughput and data integrity. Eliminating memory safety issues and improving performance, stability, and scalability of internal QA processes.",
      'Designed and built a full-stack internal CRM application using Next.js, TypeScript, and Rust (Axum) to manage support tickets, IT alerts, deployments, and inventory. Led requirement-gathering sessions with management, defined database schemas, and delivered a production-ready system tailored to company-specific workflows.',
      "Expanded the team's expertise in Rust development through various demos and documentations, supporting the company-wide transition to modern technologies and modernizing legacy systems",
    ],
    technologies: [
      'Rust',
      'Axum',
      'Tokio',
      'SeaORM',
      'ReactJS',
      'Next.js',
      'TypeScript',
      'PostgreSQL',
      'Valkey/Redis',
      'Docker',
    ],
    website: 'https://sphyrnasecurity.com',
  },
  {
    title: 'Software Developer Intern',
    company: 'Sphyrna Security Inc.',
    location: 'Ottawa, ON',
    startDate: '2023-05',
    endDate: '2023-08',
    description:
      'Conducted extensive research on adapting bidirectional network applications, particularly video streaming, to facilitate unidirectional message transmission seamlessly between secure networks',
    achievements: [],
    technologies: ['C++'],
    website: 'https://sphyrnasecurity.com',
  },
  {
    title: 'Web Developer Intern',
    company: 'Sphyrna Security Inc.',
    location: 'Ottawa, ON',
    startDate: '2022-01',
    endDate: '2022-12',
    description:
      'Web Development Internship at Sphyrna Security Inc. focusing on Verity, a compliance management platform.',
    achievements: [
      'Designed and implemented a complete authentication system for a SaaS product, allowing for deployments in various customer environments',
      'Developed a versatile email notification system within the SaaS product, allowing for multi-language email templates for our multilingual clients',
      'Effectively managed and worked on customer-reported bugs and feature requests by prioritizing them based on impact and urgency.',
    ],
    technologies: ['ReactJS', 'NodeJS', 'JavaScript', 'ONgDB'],
    website: 'https://sphyrnasecurity.com',
  },
  {
    title: 'Software Developer Intern',
    company: 'Sphyrna Security Inc.',
    location: 'Ottawa, ON',
    startDate: '2021-05',
    endDate: '2021-08',
    description:
      'Research and Development Internship at Sphyrna Security Inc. focusing on cybersecurity solutions.',
    achievements: [
      'Implemented a protype application to securely transfer files between networks, without compromising security or compliance',
      "Leveraged low-level libraries for SFTP and XML validation, enhancing the device's security features and overall functionality.",
    ],
    technologies: ['C++'],
    website: 'https://sphyrnasecurity.com',
  },
]
