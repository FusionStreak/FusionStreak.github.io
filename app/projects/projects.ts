export interface Project {
  title: string
  description: string
  longDescription: string[]
  technologies: string[]
  githubUrl?: string
  liveUrl?: string
  devpostUrl?: string
  imageUrl?: string
  featured: boolean
  createdAt: string
  status: 'completed' | 'in-progress' | 'planning'
  role?: string
}

// You can easily extend this array to add more projects
export const projects: Project[] = [
  {
    title: 'SumacSIS',
    description:
      'A full-featured Student Information System (SIS) designed to streamline academic management for educational institutions.',
    longDescription: [
      'Developing a free and open source Student Information System (SIS) for educational institutions, with the goal of providing a secure and accessible student management service.',
      'Working with a non-profit weekend language education program to learn their requirements and workflows for handling student records',
    ],
    technologies: [
      'ReactJS',
      'TypeScript',
      'Next.js',
      'Rust',
      'Actix-web',
      'SeaORM',
      'PostgreSQL',
    ],
    status: 'planning',
    createdAt: '2025-08-01',
    featured: true,
  },
  {
    title: 'Paneo',
    description:
      'Paneo is an open-source, self-hosted monitoring and visualization tool built for homelab enthusiasts.',
    longDescription: [
      'Building an open-source solution that enables homelab enthusiasts to track and manage servers, containers, and self-hosted applications.',
      'Integrating with Docker security tools to notify users of potential security faults in their services',
      'Implementing a service-agent design to allow for tracking of multiple nodes/servers from a single dashboard',
    ],
    technologies: [
      'ReactJS',
      'TypeScript',
      'Next.js',
      'Rust',
      'Axum',
      'tonic',
      'sqlx',
      'gRPC',
      'PostgreSQL',
    ],
    status: 'planning',
    createdAt: '2025-09-01',
    featured: true,
  },
  {
    title: 'Capstone: LEO Satelite Routing and Load Balancing',
    description:
      'A capstone project focused on developing a conceptual routing and load balancing system for LEO satellites, and simulating its performance.',
    longDescription: [
      'Developed a routing and load balancing system for Low Earth Orbit (LEO) satellites',
      'Enhanced LEOSIM, a Python Low Earth Orbit (LEO) network simulation tool, by implementing key features to address LEO Satellite network challenges',
      "Integrated traffic generation and simulation capabilities from multiple ground stations, improving the tool's representation of real-world scenarios.",
      'Led and organized regular team meetings, ensuring effective communication and collaboration among team members.',
      'Maintained clear and concise communication with the supervising professor, providing project updates, addressing concerns, and seeking guidance.',
    ],
    technologies: [
      'Python',
      'Pandas',
      'h3',
      'Panda3D',
      'NetworkX',
      'Network Simulation',
      'Routing Algorithms',
    ],
    imageUrl:
      'https://capstone.bitdegree.ca/NET/images/2024/GRP9_Simulation.jpg',
    featured: false,
    createdAt: '2023-09-01',
    status: 'completed',
    role: 'Team Lead & Developer',
  },
  {
    title: 'foodpad',
    description:
      'An app that allows user to keep track of their pantries, using React Native',
    longDescription: [
      'Implemented dynamic features that enable users to add groceries, select storage methods (fridge, pantry, freezer), and receive automated expiry date suggestions.',
      "Awarded Top 5 Hacks at McHacks, showcasing the project's innovation and technical merit within the hackathon environment.",
      'Received the Tree Hugger award, recognizing the project as the most environmentally conscious hack, highlighting its positive impact.',
    ],
    technologies: ['React Native', 'Expo', 'JavaScript'],
    githubUrl: 'https://github.com/ke-noel/foodpad',
    imageUrl:
      'https://d112y698adiu2z.cloudfront.net/photos/production/software_photos/001/802/858/datas/medium.png',
    devpostUrl: 'https://devpost.com/software/foodpad',
    featured: false,
    createdAt: '2022-01-01',
    status: 'completed',
    role: 'Frontend Developer',
  },
  {
    title: 'GoodStreams',
    description:
      'NET3010 Course project. A web app to keep track of watched movies and reviews. A parody of GoodReads.',
    longDescription: [
      'Designed general structure of the website',
      'Implemented backend functionality to communicate with MoviesDatabase API',
      'Designed the database to store user information',
    ],
    technologies: ['PHP', 'XAMPP/LAMPP', 'MySQL'],
    githubUrl: 'https://github.com/FusionStreak/GoodStreams',
    featured: false,
    createdAt: '2023-04-01',
    status: 'completed',
    role: 'Lead & Backend Developer',
    imageUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg'
  },
  {
    title: 'Vehichle Sensor Simulator',
    description:
      'NET 3001 Course project. An arduino project that simulates a vehicle sensor system.',
    longDescription: [],
    technologies: ['Arduino', 'C/C++'],
    githubUrl: 'https://github.com/FusionStreak/NET3001-Project',
    featured: false,
    createdAt: '2023-04-01',
    status: 'completed',
    role: 'Developer',
    imageUrl: 'https://cdn.jsdelivr.net/gh/selfhst/icons/webp/arduino.webp'
  },
  {
    title: 'Orion',
    description:
      'This is a visualization tool to help cities identify the roofs that are the best candidates for having solar panels.',
    longDescription: [
      'Part of OGP Summit Hackathon 2019',
      'Developed Python web-app, that processed building footprint data to show where solar roofing was possible',
      ' Developed a Python script, utilising Pandas, to process building footprint data and identify suitable roofs for solar panels',
      'Created a web application using Flask to visualize the processed data, allowing users to interactively explore potential solar panel installations',
    ],
    technologies: ['Python', 'Flask', 'Pandas'],
    githubUrl: 'https://github.com/ogp-summit-hackathon-sommet-pgo/Orion',
    liveUrl:
      'https://ogp-summit-hackathon-sommet-pgo.github.io/Orion/index.html',
    featured: false,
    createdAt: '2019-05-01',
    status: 'completed',
    imageUrl: 'https://avatars.githubusercontent.com/u/50467269'
  },
  {
    title: 'PlagueSim',
    description:
      'A simulation tool for modeling the spread of computer viruses',
    longDescription: [
      'Designed the general structure of the application through the use of UML diagrams',
      'Implemented core data structures and functionality in Java',
    ],
    technologies: ['Java', 'UML', 'Data Structures'],
    githubUrl: 'https://github.com/FusionStreak/MST_TermProject',
    featured: false,
    createdAt: '2021-10-26',
    status: 'completed',
    role: 'Lead Developer',
    imageUrl: 'https://cdn.jsdelivr.net/gh/selfhst/icons/webp/java.webp'
  },
  {
    title: 'FusionSnake',
    description:
      'A competitive bot snake that plays in the Battlesnake programming game, featuring intelligent pathfinding and survival strategies.',
    longDescription: [
      'Built a bot agent for the Battlesnake competitive programming challenge',
      'Implemented advanced pathfinding algorithms to navigate complex game boards',
      'Developed survival strategies including food acquisition and collision avoidance',
      'Deployed as a live web service with real-time game statistics tracking',
      'Competes in Standard and Duels game modes on the Battlesnake platform',
    ],
    technologies: ['Rust', 'Actix-web', 'Pathfinding Algorithms', 'Docker'],
    liveUrl: 'https://fusionsnake.sayfullaheid.me',
    githubUrl: 'https://github.com/FusionStreak/FusionSnake',
    featured: false,
    createdAt: '2024-06-01',
    status: 'in-progress',
    imageUrl: 'https://github.com/FusionStreak/FusionSnake/blob/main/.github/logo.png?raw=true',
  },
  {
    title: 'Personal Portfolio Website',
    description:
      'A personal portfolio website showcasing my projects, experiences, and blog posts.',
    longDescription: [
      'Developed a modern, responsive portfolio website to showcase software development skills',
      'Implemented dynamic project and experience displays with filtering capabilities',
      'Created an integrated blog system for sharing technical insights and tutorials',
      'Designed with accessibility and performance optimization in mind',
    ],
    technologies: ['Next.js', 'ReactJS', 'TypeScript', 'Tailwind CSS'],
    githubUrl: 'https://github.com/FusionStreak/FusionStreak.github.io',
    featured: true,
    createdAt: '2022-12-25',
    status: 'in-progress',
    imageUrl:
      '/logo.svg',
  },
  {
    title: 'harmonia',
    description:
      "Harmonia is a non-intrusive solution for managers to monitors teams' performance in real time.",
    longDescription: [
      'Developed a cognitive memory game using JavaScript that integrated with a Slack app, to perform daily check-ins on employee mental health',
    ],
    technologies: ['JavaScript'],
    devpostUrl: 'https://devpost.com/software/harmonia',
    imageUrl:
      'https://d112y698adiu2z.cloudfront.net/photos/production/software_thumbnail_photos/000/919/431/datas/medium.png',
    featured: false,
    createdAt: '2023-05-01',
    status: 'completed',
  },
]
