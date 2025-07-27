"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { ExternalLink, Calendar } from "lucide-react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithubSquare as GitHub } from '@fortawesome/free-brands-svg-icons';
import { DevpostIcon } from "@/components/devpost-icon";
import Link from "next/link";
import { projects } from "./projects";
import Image from "next/image";
import { useEffect, useState } from "react";

const statusColors = {
    completed: "bg-green-500",
    "in-progress": "bg-yellow-500",
    planning: "bg-blue-500"
};

// Client-safe date formatter to prevent hydration mismatch
function useSafeDate() {
    const [isClient, setIsClient] = useState(false);
    
    useEffect(() => {
        setIsClient(true);
    }, []);
    
    const formatYear = (dateString: string) => {
        if (!isClient) return '';
        return new Date(dateString).getFullYear().toString();
    };
    
    const formatDate = (dateString: string) => {
        if (!isClient) return '';
        return new Date(dateString).toLocaleDateString();
    };
    
    return { formatYear, formatDate };
}

export default function ProjectsPage() {
    const featuredProjects = projects.filter(project => project.featured);
    const otherProjects = projects.filter(project => !project.featured);
    const { formatYear, formatDate } = useSafeDate();

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
                    <Carousel
                        opts={{
                            align: "start",
                            loop: true,
                        }}
                        className="w-full"
                    >
                        <CarouselContent className="-ml-2 md:-ml-4">
                            {featuredProjects.map((project, index) => (
                                <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/2">
                                    <Card className="overflow-hidden hover:shadow-lg transition-shadow flex flex-col h-full">
                                        {project.imageUrl && (
                                            <div className="aspect-video relative bg-muted">
                                                <Image
                                                    src={project.imageUrl}
                                                    alt={project.title}
                                                    fill
                                                    className="object-cover"
                                                />
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
                                                    {formatYear(project.createdAt)}
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
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel>
                </div>
            )}

            {/* Other Projects */}
            {otherProjects.length > 0 && (
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold">Other Projects</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {otherProjects.map((project, index) => (
                            <Dialog key={index}>
                                <DialogTrigger asChild>
                                    <Card className="hover:shadow-md transition-shadow flex flex-col cursor-pointer">
                                        <CardHeader className="pb-3 flex-grow">
                                            <div className="flex items-start justify-between">
                                                <CardTitle className="text-lg flex items-center gap-2">
                                                    {project.title}
                                                    <div className={`w-2 h-2 rounded-full ${statusColors[project.status]}`} />
                                                </CardTitle>
                                                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                                    <Calendar className="h-3 w-3" />
                                                    {formatYear(project.createdAt)}
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
                                    </Card>
                                </DialogTrigger>
                                <DialogContent className="max-w-2xl">
                                    <DialogHeader>
                                        <DialogTitle className="flex items-center gap-2">
                                            {project.title}
                                            <div className={`w-2 h-2 rounded-full ${statusColors[project.status]}`} />
                                        </DialogTitle>
                                        <DialogDescription className="text-base">
                                            {project.description}
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="space-y-4">
                                        {project.longDescription.length > 0 && (
                                            <div>
                                                <h4 className="font-semibold mb-2">Project Details</h4>
                                                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                                                    {project.longDescription.map((point, idx) => (
                                                        <li key={idx}>{point}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                        
                                        <div>
                                            <h4 className="font-semibold mb-2">Technologies</h4>
                                            <div className="flex flex-wrap gap-1">
                                                {project.role && (
                                                    <Badge variant="outline" className="text-xs">
                                                        {project.role}
                                                    </Badge>
                                                )}
                                                {project.technologies.map((tech, idx) => (
                                                    <Badge key={idx} variant="secondary" className="text-xs">
                                                        {tech}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                            <Calendar className="h-3 w-3" />
                                            Created: {formatDate(project.createdAt)}
                                        </div>

                                        <div className="flex gap-2 flex-wrap">
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
                                        </div>
                                    </div>
                                </DialogContent>
                            </Dialog>
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
