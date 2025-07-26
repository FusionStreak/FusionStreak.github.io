import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink, Calendar } from "lucide-react";
import Link from "next/link";

interface Project {
    id: string;
    title: string;
    description: string;
    longDescription: string;
    technologies: string[];
    githubUrl?: string;
    liveUrl?: string;
    imageUrl?: string;
    featured: boolean;
    createdAt: string;
    status: "completed" | "in-progress" | "planning";
}

// You can easily extend this array to add more projects
const projects: Project[] = [
    {
        id: "1",
        title: "E-Commerce Platform",
        description: "A full-stack e-commerce solution with admin dashboard and payment integration.",
        longDescription: "Built a comprehensive e-commerce platform featuring user authentication, product catalog, shopping cart, order management, and Stripe payment integration. Includes an admin dashboard for inventory management and order tracking.",
        technologies: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Stripe", "Tailwind CSS"],
        githubUrl: "https://github.com/yourusername/ecommerce-platform",
        liveUrl: "https://your-ecommerce-demo.vercel.app",
        imageUrl: "/placeholder-project-1.jpg",
        featured: true,
        createdAt: "2024-01-15",
        status: "completed"
    },
    {
        id: "2",
        title: "Task Management App",
        description: "A collaborative task management application with real-time updates.",
        longDescription: "Developed a collaborative task management application with features like drag-and-drop kanban boards, real-time collaboration, team management, and deadline tracking. Built with modern React patterns and real-time WebSocket communication.",
        technologies: ["React", "Node.js", "Socket.io", "MongoDB", "Express", "Material-UI"],
        githubUrl: "https://github.com/yourusername/task-manager",
        liveUrl: "https://task-manager-demo.netlify.app",
        imageUrl: "/placeholder-project-2.jpg",
        featured: true,
        createdAt: "2023-11-20",
        status: "completed"
    },
    {
        id: "3",
        title: "Weather Dashboard",
        description: "A responsive weather dashboard with location-based forecasts and data visualization.",
        longDescription: "Created a weather dashboard that provides current weather conditions, 5-day forecasts, and interactive charts. Features geolocation support, search functionality, and responsive design with dark/light theme support.",
        technologies: ["React", "Chart.js", "OpenWeather API", "CSS Modules", "Axios"],
        githubUrl: "https://github.com/yourusername/weather-dashboard",
        liveUrl: "https://weather-dashboard-demo.vercel.app",
        imageUrl: "/placeholder-project-3.jpg",
        featured: false,
        createdAt: "2023-09-10",
        status: "completed"
    },
    {
        id: "4",
        title: "AI Chat Application",
        description: "An AI-powered chat application with multiple conversation models.",
        longDescription: "Building an intelligent chat application that integrates with various AI models. Features include conversation history, multiple AI personalities, message export, and customizable chat interfaces.",
        technologies: ["Next.js", "OpenAI API", "Vercel AI SDK", "Prisma", "SQLite", "Shadcn/ui"],
        githubUrl: "https://github.com/yourusername/ai-chat-app",
        imageUrl: "/placeholder-project-4.jpg",
        featured: true,
        createdAt: "2024-02-01",
        status: "in-progress"
    },
    {
        id: "5",
        title: "Portfolio Website",
        description: "This very website - a modern portfolio built with Next.js and MDX.",
        longDescription: "Designed and developed this portfolio website using Next.js, TypeScript, and MDX for the blog. Features include dark/light theme, responsive design, blog functionality, and optimized performance.",
        technologies: ["Next.js", "TypeScript", "MDX", "Tailwind CSS", "Shadcn/ui"],
        githubUrl: "https://github.com/FusionStreak/FusionStreak.github.io",
        liveUrl: "https://fusionstreak.github.io",
        imageUrl: "/placeholder-project-5.jpg",
        featured: false,
        createdAt: "2024-01-01",
        status: "completed"
    }
];

const statusColors = {
    completed: "bg-green-500",
    "in-progress": "bg-yellow-500",
    planning: "bg-blue-500"
};

export default function ProjectsPage() {
    const featuredProjects = projects.filter(project => project.featured);
    const otherProjects = projects.filter(project => !project.featured);

    return (
        <div className="space-y-12">
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
                    My Projects
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                    A collection of projects I&apos;ve worked on, showcasing my skills and passion for development.
                </p>
            </div>

            {/* Featured Projects */}
            {featuredProjects.length > 0 && (
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold">Featured Projects</h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {featuredProjects.map((project) => (
                            <Card key={project.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                                {project.imageUrl && (
                                    <div className="aspect-video relative bg-muted">
                                        {/* Placeholder for project image */}
                                        <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                                            Project Screenshot
                                        </div>
                                    </div>
                                )}
                                <CardHeader>
                                    <div className="flex items-start justify-between">
                                        <div className="space-y-1">
                                            <CardTitle className="flex items-center gap-2">
                                                {project.title}
                                                <div className={`w-2 h-2 rounded-full ${statusColors[project.status]}`} />
                                            </CardTitle>
                                            <CardDescription>{project.description}</CardDescription>
                                        </div>
                                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                            <Calendar className="h-3 w-3" />
                                            {new Date(project.createdAt).getFullYear()}
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <p className="text-sm text-muted-foreground line-clamp-3">
                                        {project.longDescription}
                                    </p>

                                    <div className="flex flex-wrap gap-1">
                                        {project.technologies.slice(0, 4).map((tech, idx) => (
                                            <Badge key={idx} variant="secondary" className="text-xs">
                                                {tech}
                                            </Badge>
                                        ))}
                                        {project.technologies.length > 4 && (
                                            <Badge variant="outline" className="text-xs">
                                                +{project.technologies.length - 4} more
                                            </Badge>
                                        )}
                                    </div>

                                    <div className="flex gap-2">
                                        {project.githubUrl && (
                                            <Button variant="outline" size="sm" asChild>
                                                <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                                                    <Github className="h-4 w-4 mr-2" />
                                                    Code
                                                </Link>
                                            </Button>
                                        )}
                                        {project.liveUrl && (
                                            <Button size="sm" asChild>
                                                <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                                                    <ExternalLink className="h-4 w-4 mr-2" />
                                                    Live Demo
                                                </Link>
                                            </Button>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            )}

            {/* Other Projects */}
            {otherProjects.length > 0 && (
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold">Other Projects</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {otherProjects.map((project) => (
                            <Card key={project.id} className="hover:shadow-md transition-shadow">
                                <CardHeader className="pb-3">
                                    <div className="flex items-start justify-between">
                                        <CardTitle className="text-lg flex items-center gap-2">
                                            {project.title}
                                            <div className={`w-2 h-2 rounded-full ${statusColors[project.status]}`} />
                                        </CardTitle>
                                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                            <Calendar className="h-3 w-3" />
                                            {new Date(project.createdAt).getFullYear()}
                                        </div>
                                    </div>
                                    <CardDescription className="text-sm">
                                        {project.description}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <div className="flex flex-wrap gap-1">
                                        {project.technologies.slice(0, 3).map((tech, idx) => (
                                            <Badge key={idx} variant="secondary" className="text-xs">
                                                {tech}
                                            </Badge>
                                        ))}
                                        {project.technologies.length > 3 && (
                                            <Badge variant="outline" className="text-xs">
                                                +{project.technologies.length - 3}
                                            </Badge>
                                        )}
                                    </div>

                                    <div className="flex gap-2">
                                        {project.githubUrl && (
                                            <Button variant="outline" size="sm" asChild className="flex-1">
                                                <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                                                    <Github className="h-3 w-3 mr-1" />
                                                    Code
                                                </Link>
                                            </Button>
                                        )}
                                        {project.liveUrl && (
                                            <Button size="sm" asChild className="flex-1">
                                                <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                                                    <ExternalLink className="h-3 w-3 mr-1" />
                                                    Demo
                                                </Link>
                                            </Button>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            )}

            {/* Call to Action */}
            <Card className="bg-muted/50">
                <CardHeader className="text-center">
                    <CardTitle>Interested in collaborating?</CardTitle>
                    <CardDescription>
                        I&apos;m always open to discussing new projects and opportunities.
                    </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                    <Button asChild>
                        <Link href="mailto:contact@example.com">Get In Touch</Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
