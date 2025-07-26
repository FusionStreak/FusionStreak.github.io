import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Calendar } from "lucide-react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faGithubSquare as GitHub} from '@fortawesome/free-brands-svg-icons';
import Link from "next/link";
import { projects } from "./projects";

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
                                                    <FontAwesomeIcon icon={GitHub} className="h-4 w-4 mr-2" />
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
                                                    <FontAwesomeIcon icon={GitHub} className="h-3 w-3 mr-1" />
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
                        <Link href="mailto:mail@sayfullaheid.me">Get In Touch</Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
