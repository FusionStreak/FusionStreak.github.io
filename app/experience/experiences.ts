export interface Experience {
    title: string;
    company: string;
    location: string;
    startDate: string;
    endDate?: string;
    description: string;
    achievements: string[];
    technologies: string[];
    website?: string;
}

export const experiences: Experience[] = [
    {
        title: 'Rust Developer',
        company: 'Sphyrna Security Inc.',
        location: 'Ottawa, ON',
        startDate: '2024-05',
        description: 'Developing various internal tools and applications. As well as rewriting existing products in Rust to improve performance and security.',
        achievements: [
            "Developed a robust Rust-based testing tool stress testing of network security appliance products, measuring bandwidth and reliability under various loads.",
            "Created a full-stack internal web application for managing customer support tickets, IT alerts, product deployments, and inventory. Integrating with GitLab, Teams, and Outlook.",
            "Expanded the team's expertise in Rust development, supporting the company-wide transition to more memory-safe technologies and modernizing legacy systems."
        ],
        technologies: [
            "Rust",
            "Axum",
            "Tokio",
            "SeaORM",
            "ReactJS",
            "Next.js",
            "TypeScript",
            "PostgreSQL",
            "Valkey/Redis",
            "Docker",
        ],
        website: 'https://sphyrnasecurity.com'
    },
    {
        title: 'Software Developer Intern',
        company: 'Sphyrna Security Inc.',
        location: 'Ottawa, ON',
        startDate: '2023-05',
        endDate: '2023-08',
        description: 'Conducted extensive research on adapting bidirectional network applications, particularly video streaming, to facilitate unidirectional message transmission seamlessly between secure networks',
        achievements: [],
        technologies: [
            "C++",
        ],
        website: 'https://sphyrnasecurity.com'
    },
    {
        title: 'Web Developer Intern',
        company: 'Sphyrna Security Inc.',
        location: 'Ottawa, ON',
        startDate: '2022-01',
        endDate: '2022-12',
        description: 'Web Development Internship at Sphyrna Security Inc. focusing on Verity, a compliance management platform.',
        achievements: [
            "Designed and implemented a comprehensive authentication system for a web application, incorporating Multi-Factor Authentication (MFA)",
            "Engineered a versatile email notification system within the web application, allowing seamless customization for each customer based on their specific needs.",

        ],
        technologies: [
            "ReactJS",
            "NodeJS",
            "JavaScript",
            "ONgDB"
        ],
        website: 'https://sphyrnasecurity.com'
    },
    {
        title: 'Software Developer Intern',
        company: 'Sphyrna Security Inc.',
        location: 'Ottawa, ON',
        startDate: '2021-05',
        endDate: '2021-08',
        description: 'Research and Development Internship at Sphyrna Security Inc. focusing on cybersecurity solutions.',
        achievements: [
            "Implemented a protype application to securely transfer files between networks, without compromising security or compliance",
            "Leveraged low-level libraries for SFTP and XML validation, enhancing the device's security features and overall functionality."
        ],
        technologies: [
            "C++",
        ],
        website: 'https://sphyrnasecurity.com'
    }
];