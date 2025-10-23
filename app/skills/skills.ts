import {
  Code2,
  Database,
  Server,
  Braces,
  Container,
  type LucideIcon,
  EthernetPort,
} from 'lucide-react'

export interface SkillCategory {
  title: string
  icon: LucideIcon
  skills: string[]
}

export const skillCategories: SkillCategory[] = [
  {
    title: 'Frontend',
    icon: Code2,
    skills: ['React', 'Next.js', 'Tailwind CSS', 'ShandCN UI'],
  },
  {
    title: 'Backend',
    icon: Server,
    skills: ['Actix', 'Axum', 'Tokio', 'SeaORM', 'Node.js'],
  },
  {
    title: 'Database',
    icon: Database,
    skills: ['PostgreSQL', 'ONgDB', 'Valkey/Redis'],
  },
  {
    title: 'Languages',
    icon: Braces,
    skills: ['TypeScript', 'Rust', 'JavaScript', 'Python', 'Java', 'C++'],
  },
  {
    title: 'DevOps',
    icon: Container,
    skills: ['Docker', 'GitHub Actions', 'CI/CD', 'Git', 'VS Code'],
  },
  {
    title: 'IT Skills',
    icon: EthernetPort,
    skills: ['Linux', 'Routing', 'Firewalls', 'Switching', 'Virtualization'],
  },
]
