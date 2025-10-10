"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ExternalLink, Calendar, ChevronRight } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithubSquare as GitHub } from "@fortawesome/free-brands-svg-icons";
import { DevpostIcon } from "@/components/devpost-icon";
import Link from "next/link";
import { projects } from "./projects";
import Image from "next/image";
import { useEffect, useState } from "react";
import type { CarouselApi } from "@/components/ui/carousel";

const statusColors = {
  completed: "bg-green-500",
  "in-progress": "bg-yellow-500",
  planning: "bg-blue-500",
};

// Client-safe date formatter to prevent hydration mismatch
function useSafeDate() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const formatYear = (dateString: string) => {
    if (!isClient) return "";
    return new Date(dateString).getFullYear().toString();
  };

  const formatDate = (dateString: string) => {
    if (!isClient) return "";
    return new Date(dateString).toLocaleDateString();
  };

  return { formatYear, formatDate };
}

export default function ProjectsPage() {
  const featuredProjects = projects.filter((project) => project.featured);
  const otherProjects = projects.filter((project) => !project.featured);
  const { formatYear, formatDate } = useSafeDate();

  // Featured carousel state
  const [featuredApi, setFeaturedApi] = useState<CarouselApi>();
  const [featuredCurrent, setFeaturedCurrent] = useState(0);
  const [featuredCount, setFeaturedCount] = useState(0);

  // Other projects carousel state (mobile only)
  const [otherApi, setOtherApi] = useState<CarouselApi>();
  const [otherCurrent, setOtherCurrent] = useState(0);
  const [otherCount, setOtherCount] = useState(0);

  useEffect(() => {
    if (!featuredApi) return;

    setFeaturedCount(featuredApi.scrollSnapList().length);
    setFeaturedCurrent(featuredApi.selectedScrollSnap());

    featuredApi.on("select", () => {
      setFeaturedCurrent(featuredApi.selectedScrollSnap());
    });
  }, [featuredApi]);

  useEffect(() => {
    if (!otherApi) return;

    setOtherCount(otherApi.scrollSnapList().length);
    setOtherCurrent(otherApi.selectedScrollSnap());

    otherApi.on("select", () => {
      setOtherCurrent(otherApi.selectedScrollSnap());
    });
  }, [otherApi]);

  return (
    <div className="space-y-12">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">
          My Projects
        </h1>
        <p className="mx-auto max-w-[700px] text-muted-foreground">
          A collection of projects I&apos;ve worked on, showcasing my skills and
          passion for development.
        </p>

        {/* Status Legend */}
        <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground pt-2">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span>Completed</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <span>In Progress</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500" />
            <span>Planning</span>
          </div>
        </div>
      </div>

      {/* Featured Projects */}
      {featuredProjects.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Featured Projects</h2>
            <p className="text-sm text-muted-foreground hidden sm:block">
              Use arrows to navigate
            </p>
            <p className="text-sm text-muted-foreground sm:hidden">
              Swipe to explore →
            </p>
          </div>
          <Carousel
            setApi={setFeaturedApi}
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {featuredProjects.map((project, index) => (
                <CarouselItem
                  key={index}
                  className="pl-2 md:pl-4 basis-[85%] sm:basis-[90%] md:basis-1/2 lg:basis-1/2"
                >
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
                            <div
                              className={`w-2 h-2 rounded-full ${
                                statusColors[project.status]
                              }`}
                            />
                          </CardTitle>
                          <CardDescription>
                            {project.description}
                          </CardDescription>
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
                      <div className="flex flex-wrap gap-2">
                        {project.role && (
                          <Badge
                            variant="outline"
                            className="text-xs font-semibold px-2.5 py-1"
                          >
                            {project.role}
                          </Badge>
                        )}
                        {project.technologies.slice(0, 4).map((tech, idx) => (
                          <Badge
                            key={idx}
                            variant="secondary"
                            className="text-xs font-semibold px-2.5 py-1"
                          >
                            {tech}
                          </Badge>
                        ))}
                        {project.technologies.length > 4 && (
                          <Badge
                            variant="outline"
                            className="text-xs font-semibold px-2.5 py-1"
                          >
                            +{project.technologies.length - 4} more
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter className="flex gap-2 items-center">
                      {project.githubUrl && (
                        <Button variant="outline" size="sm" asChild>
                          <Link
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <FontAwesomeIcon
                              icon={GitHub}
                              className="h-4 w-4 mr-2"
                            />
                            Code
                          </Link>
                        </Button>
                      )}
                      {project.liveUrl && (
                        <Button size="sm" asChild>
                          <Link
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Live Demo
                          </Link>
                        </Button>
                      )}
                      {project.devpostUrl && (
                        <Button variant="outline" size="sm" asChild>
                          <Link
                            href={project.devpostUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
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
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>

          {/* Pagination dots for mobile */}
          <div className="flex justify-center gap-2 pt-4 md:hidden">
            {Array.from({ length: featuredCount }).map((_, index) => (
              <button
                key={index}
                className={`h-2 rounded-full transition-all ${
                  index === featuredCurrent
                    ? "w-8 bg-primary"
                    : "w-2 bg-muted-foreground/30"
                }`}
                onClick={() => featuredApi?.scrollTo(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Other Projects */}
      {otherProjects.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Other Projects</h2>
            <p className="text-sm text-muted-foreground hidden md:block">
              Click cards for full details
            </p>
            <p className="text-sm text-muted-foreground sm:hidden">
              Swipe to explore →
            </p>
          </div>

          {/* Mobile: Carousel */}
          <div className="md:hidden">
            <Carousel
              setApi={setOtherApi}
              opts={{
                align: "start",
                loop: false,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-2">
                {otherProjects.map((project, index) => (
                  <CarouselItem
                    key={index}
                    className="pl-2 basis-[85%] sm:basis-[90%]"
                  >
                    <Dialog>
                      <DialogTrigger asChild>
                        <Card className="hover:shadow-lg hover:border-primary/50 transition-all flex flex-col cursor-pointer h-full group">
                          <CardHeader className="pb-3 flex-grow">
                            <div className="flex items-start justify-between">
                              <CardTitle className="text-lg flex items-center gap-2">
                                {project.title}
                                <div
                                  className={`w-2 h-2 rounded-full ${
                                    statusColors[project.status]
                                  }`}
                                />
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
                            <div className="flex flex-wrap gap-2">
                              {project.role && (
                                <Badge
                                  variant="outline"
                                  className="text-xs font-semibold px-2.5 py-1 shrink-0"
                                >
                                  {project.role}
                                </Badge>
                              )}
                              {project.technologies
                                .slice(0, 3)
                                .map((tech, idx) => (
                                  <Badge
                                    key={idx}
                                    variant="secondary"
                                    className="text-xs font-semibold px-2.5 py-1"
                                  >
                                    {tech}
                                  </Badge>
                                ))}
                              {project.technologies.length > 3 && (
                                <Badge
                                  variant="outline"
                                  className="text-xs font-semibold px-2.5 py-1"
                                >
                                  +{project.technologies.length - 3}
                                </Badge>
                              )}
                            </div>
                          </CardContent>
                          <CardFooter className="pt-0 pb-4">
                            <div className="flex items-center gap-1 text-xs text-muted-foreground group-hover:text-primary transition-colors">
                              <span>Tap for details</span>
                              <ChevronRight className="h-3 w-3" />
                            </div>
                          </CardFooter>
                        </Card>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle className="flex items-center gap-2">
                            {project.title}
                            <div
                              className={`w-2 h-2 rounded-full ${
                                statusColors[project.status]
                              }`}
                            />
                          </DialogTitle>
                          <DialogDescription className="text-base">
                            {project.description}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          {project.longDescription.length > 0 && (
                            <div>
                              <h4 className="font-semibold mb-2">
                                Project Details
                              </h4>
                              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                                {project.longDescription.map((point, idx) => (
                                  <li key={idx}>{point}</li>
                                ))}
                              </ul>
                            </div>
                          )}

                          <div>
                            <h4 className="font-semibold mb-2">Technologies</h4>
                            <div className="flex flex-wrap gap-2">
                              {project.role && (
                                <Badge
                                  variant="outline"
                                  className="text-xs font-semibold px-2.5 py-1"
                                >
                                  {project.role}
                                </Badge>
                              )}
                              {project.technologies.map((tech, idx) => (
                                <Badge
                                  key={idx}
                                  variant="secondary"
                                  className="text-xs font-semibold px-2.5 py-1"
                                >
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
                                <Link
                                  href={project.githubUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <FontAwesomeIcon
                                    icon={GitHub}
                                    className="h-4 w-4 mr-2"
                                  />
                                  Code
                                </Link>
                              </Button>
                            )}
                            {project.liveUrl && (
                              <Button size="sm" asChild>
                                <Link
                                  href={project.liveUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <ExternalLink className="h-4 w-4 mr-2" />
                                  Live Demo
                                </Link>
                              </Button>
                            )}
                            {project.devpostUrl && (
                              <Button variant="outline" size="sm" asChild>
                                <Link
                                  href={project.devpostUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <DevpostIcon className="h-4 w-4 mr-2" />
                                  Devpost
                                </Link>
                              </Button>
                            )}
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>

            {/* Pagination dots for mobile */}
            <div className="flex justify-center gap-2 pt-4">
              {Array.from({ length: otherCount }).map((_, index) => (
                <button
                  key={index}
                  className={`h-2 rounded-full transition-all ${
                    index === otherCurrent
                      ? "w-8 bg-primary"
                      : "w-2 bg-muted-foreground/30"
                  }`}
                  onClick={() => otherApi?.scrollTo(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Desktop: Masonry Grid */}
          <div className="hidden md:block">
            <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
              {otherProjects.map((project, index) => (
                <Dialog key={index}>
                  <DialogTrigger asChild>
                    <Card className="hover:shadow-lg hover:border-primary/50 transition-all flex flex-col cursor-pointer break-inside-avoid group">
                      <CardHeader className="pb-3 flex-grow">
                        <div className="flex items-start justify-between">
                          <CardTitle className="text-lg flex items-center gap-2">
                            {project.title}
                            <div
                              className={`w-2 h-2 rounded-full ${
                                statusColors[project.status]
                              }`}
                            />
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
                        <div className="flex flex-wrap gap-2">
                          {project.role && (
                            <Badge
                              variant="outline"
                              className="text-xs font-semibold px-2.5 py-1 shrink-0"
                            >
                              {project.role}
                            </Badge>
                          )}
                          {project.technologies.slice(0, 3).map((tech, idx) => (
                            <Badge
                              key={idx}
                              variant="secondary"
                              className="text-xs font-semibold px-2.5 py-1"
                            >
                              {tech}
                            </Badge>
                          ))}
                          {project.technologies.length > 3 && (
                            <Badge
                              variant="outline"
                              className="text-xs font-semibold px-2.5 py-1"
                            >
                              +{project.technologies.length - 3}
                            </Badge>
                          )}
                        </div>
                      </CardContent>
                      <CardFooter className="pt-0 pb-4">
                        <div className="flex items-center gap-1 text-xs text-muted-foreground group-hover:text-primary transition-colors">
                          <span>Click for details</span>
                          <ChevronRight className="h-3 w-3" />
                        </div>
                      </CardFooter>
                    </Card>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-2">
                        {project.title}
                        <div
                          className={`w-2 h-2 rounded-full ${
                            statusColors[project.status]
                          }`}
                        />
                      </DialogTitle>
                      <DialogDescription className="text-base">
                        {project.description}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      {project.longDescription.length > 0 && (
                        <div>
                          <h4 className="font-semibold mb-2">
                            Project Details
                          </h4>
                          <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                            {project.longDescription.map((point, idx) => (
                              <li key={idx}>{point}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <div>
                        <h4 className="font-semibold mb-2">Technologies</h4>
                        <div className="flex flex-wrap gap-2">
                          {project.role && (
                            <Badge
                              variant="outline"
                              className="text-xs font-semibold px-2.5 py-1"
                            >
                              {project.role}
                            </Badge>
                          )}
                          {project.technologies.map((tech, idx) => (
                            <Badge
                              key={idx}
                              variant="secondary"
                              className="text-xs font-semibold px-2.5 py-1"
                            >
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
                            <Link
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <FontAwesomeIcon
                                icon={GitHub}
                                className="h-4 w-4 mr-2"
                              />
                              Code
                            </Link>
                          </Button>
                        )}
                        {project.liveUrl && (
                          <Button size="sm" asChild>
                            <Link
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <ExternalLink className="h-4 w-4 mr-2" />
                              Live Demo
                            </Link>
                          </Button>
                        )}
                        {project.devpostUrl && (
                          <Button variant="outline" size="sm" asChild>
                            <Link
                              href={project.devpostUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
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
