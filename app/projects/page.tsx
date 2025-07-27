import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Calendar } from "lucide-react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithubSquare as GitHub } from '@fortawesome/free-brands-svg-icons';
import { DevpostIcon } from "@/components/devpost-icon";
import Link from "next/link";
import { projects } from "./projects";
import Image from "next/image";

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
                        {featuredProjects.map((project, index) => (
                            <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow flex flex-col">
                                {project.imageUrl && (
                                    <div className="aspect-video relative bg-muted">
                                        {/* Placeholder for project image */}
                                        <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                                            <Image
                                                src={project.imageUrl}
                                                alt={project.title}
                                                layout="fill"
                                                objectFit="cover"
                                                className="object-cover"
                                            />
                                        </div>
                                    </div>
                                )}
                                <CardHeader className="flex-grow">
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
                                    <div className="space-y-2 mt-4">
                                        <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                                            {project.longDescription.map((point, idx) => (
                                                <li key={idx}>{point}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-4 mt-auto">
                                    <div className="flex flex-wrap gap-1">
                                        {project.role && (
                                                    <Badge variant="outline" className="text-xs">
                                                        {project.role}
                                                    </Badge>
                                                )}
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
                                </CardContent>
                                <CardFooter className="flex gap-2 items-center">
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
                                        {project.devpostUrl && (
                                            <Button variant="outline" size="sm" asChild>
                                                <Link href={project.devpostUrl} target="_blank" rel="noopener noreferrer">
                                                    <DevpostIcon className="h-4 w-4 mr-2" />
                                                    Devpost
                                                </Link>
                                            </Button>
                                        )}
                                </CardFooter>
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
                        {otherProjects.map((project, index) => (
                            <Card key={index} className="hover:shadow-md transition-shadow flex flex-col">
                                <CardHeader className="pb-3 flex-grow">
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
                                <CardContent className="space-y-3 mt-auto">
                                    <div className="flex flex-wrap gap-1">
                                        {project.role && (
                                            <Badge variant="outline" className="text-xs shrink-0">
                                                {project.role}
                                            </Badge>
                                        )}
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
                                </CardContent>
                                <CardFooter className="flex gap-2 items-center">
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
                                        {project.devpostUrl && (
                                            <Button variant="outline" size="sm" asChild>
                                                <Link href={project.devpostUrl} target="_blank" rel="noopener noreferrer">
                                                    <DevpostIcon className="h-4 w-4 mr-2" />
                                                    Devpost
                                                </Link>
                                            </Button>
                                        )}
                                </CardFooter>
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
