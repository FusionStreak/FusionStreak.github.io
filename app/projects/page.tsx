'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { ExternalLink, Calendar, ChevronRight } from 'lucide-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithubSquare as GitHub } from '@fortawesome/free-brands-svg-icons'
import { DevpostIcon } from '@/components/devpost-icon'
import Link from 'next/link'
import { projects } from './projects'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import type { CarouselApi } from '@/components/ui/carousel'

const statusColors = {
  completed: 'bg-green-500',
  'in-progress': 'bg-yellow-500',
  planning: 'bg-blue-500',
}

// Client-safe date formatter to prevent hydration mismatch
function useSafeDate() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const formatYear = (dateString: string) => {
    if (!isClient) return ''
    return new Date(dateString).getFullYear().toString()
  }

  const formatDate = (dateString: string) => {
    if (!isClient) return ''
    return new Date(dateString).toLocaleDateString()
  }

  return { formatYear, formatDate }
}

export default function ProjectsPage() {
  const featuredProjects = projects.filter((project) => project.featured)
  const otherProjects = projects.filter((project) => !project.featured)
  const { formatYear, formatDate } = useSafeDate()

  // Featured carousel state
  const [featuredApi, setFeaturedApi] = useState<CarouselApi>()
  const [featuredCurrent, setFeaturedCurrent] = useState(0)
  const [featuredCount, setFeaturedCount] = useState(0)

  // Other projects carousel state (mobile only)
  const [otherApi, setOtherApi] = useState<CarouselApi>()
  const [otherCurrent, setOtherCurrent] = useState(0)
  const [otherCount, setOtherCount] = useState(0)

  useEffect(() => {
    if (!featuredApi) return

    setFeaturedCount(featuredApi.scrollSnapList().length)
    setFeaturedCurrent(featuredApi.selectedScrollSnap())

    featuredApi.on('select', () => {
      setFeaturedCurrent(featuredApi.selectedScrollSnap())
    })
  }, [featuredApi])

  useEffect(() => {
    if (!otherApi) return

    setOtherCount(otherApi.scrollSnapList().length)
    setOtherCurrent(otherApi.selectedScrollSnap())

    otherApi.on('select', () => {
      setOtherCurrent(otherApi.selectedScrollSnap())
    })
  }, [otherApi])

  return (
    <div className="space-y-8">
      {/* Status Legend */}
      <div className="text-muted-foreground flex items-center justify-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-green-500" />
          <span>Completed</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-yellow-500" />
          <span>In Progress</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-blue-500" />
          <span>Planning</span>
        </div>
      </div>

      {/* Featured Projects */}
      {featuredProjects.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Featured Projects</h2>
            <p className="text-muted-foreground hidden text-sm sm:block">
              Use arrows to navigate
            </p>
            <p className="text-muted-foreground text-sm sm:hidden">
              Swipe to explore →
            </p>
          </div>
          <Carousel
            setApi={setFeaturedApi}
            opts={{
              align: 'start',
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {featuredProjects.map((project, index) => (
                <CarouselItem
                  key={index}
                  className="basis-[85%] pl-2 sm:basis-[90%] md:basis-1/2 md:pl-4 lg:basis-1/2"
                >
                  <Card className="flex h-full flex-col overflow-hidden transition-shadow hover:shadow-lg">
                    {project.imageUrl && (
                      <div className="bg-muted relative aspect-video">
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
                              className={`h-2 w-2 rounded-full ${
                                statusColors[project.status]
                              }`}
                            />
                          </CardTitle>
                          <CardDescription>
                            {project.description}
                          </CardDescription>
                        </div>
                        <div className="text-muted-foreground flex items-center gap-1 text-xs">
                          <Calendar className="h-3 w-3" />
                          {formatYear(project.createdAt)}
                        </div>
                      </div>
                      <div className="mt-4 space-y-2">
                        <ul className="text-muted-foreground list-inside list-disc space-y-1 text-sm">
                          {project.longDescription.map((point, idx) => (
                            <li key={idx}>{point}</li>
                          ))}
                        </ul>
                      </div>
                    </CardHeader>
                    <CardContent className="mt-auto space-y-4">
                      <div className="flex flex-wrap gap-2">
                        {project.role && (
                          <Badge
                            variant="outline"
                            className="px-2.5 py-1 text-xs font-semibold"
                          >
                            {project.role}
                          </Badge>
                        )}
                        {project.technologies.slice(0, 4).map((tech, idx) => (
                          <Badge
                            key={idx}
                            variant="secondary"
                            className="px-2.5 py-1 text-xs font-semibold"
                          >
                            {tech}
                          </Badge>
                        ))}
                        {project.technologies.length > 4 && (
                          <Badge
                            variant="outline"
                            className="px-2.5 py-1 text-xs font-semibold"
                          >
                            +{project.technologies.length - 4} more
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter className="flex items-center gap-2">
                      {project.githubUrl && (
                        <Button variant="outline" size="sm" asChild>
                          <Link
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <FontAwesomeIcon
                              icon={GitHub}
                              className="mr-2 h-4 w-4"
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
                            <ExternalLink className="mr-2 h-4 w-4" />
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
                            <DevpostIcon className="mr-2 h-4 w-4" />
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

          {/* Pagination dots */}
          <div className="flex justify-center gap-2 pt-4">
            {Array.from({ length: featuredCount }).map((_, index) => (
              <button
                key={index}
                className={`h-2 rounded-full transition-all ${
                  index === featuredCurrent
                    ? 'bg-primary w-8'
                    : 'bg-muted-foreground/30 w-2'
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
            <p className="text-muted-foreground hidden text-sm md:block">
              Click cards for full details
            </p>
            <p className="text-muted-foreground text-sm sm:hidden">
              Swipe to explore →
            </p>
          </div>

          {/* Mobile: Carousel */}
          <div className="md:hidden">
            <Carousel
              setApi={setOtherApi}
              opts={{
                align: 'start',
                loop: false,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-2">
                {otherProjects.map((project, index) => (
                  <CarouselItem
                    key={index}
                    className="basis-[85%] pl-2 sm:basis-[90%]"
                  >
                    <Dialog>
                      <DialogTrigger asChild>
                        <Card className="hover:border-primary/50 group flex h-full cursor-pointer flex-col transition-all hover:shadow-lg">
                          <CardHeader className="flex-grow pb-3">
                            <div className="flex items-start justify-between">
                              <CardTitle className="flex items-center gap-2 text-lg">
                                {project.title}
                                <div
                                  className={`h-2 w-2 rounded-full ${
                                    statusColors[project.status]
                                  }`}
                                />
                              </CardTitle>
                              <div className="text-muted-foreground flex items-center gap-1 text-xs">
                                <Calendar className="h-3 w-3" />
                                {formatYear(project.createdAt)}
                              </div>
                            </div>
                            <CardDescription className="text-sm">
                              {project.description}
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="mt-auto space-y-3">
                            <div className="flex flex-wrap gap-2">
                              {project.role && (
                                <Badge
                                  variant="outline"
                                  className="shrink-0 px-2.5 py-1 text-xs font-semibold"
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
                                    className="px-2.5 py-1 text-xs font-semibold"
                                  >
                                    {tech}
                                  </Badge>
                                ))}
                              {project.technologies.length > 3 && (
                                <Badge
                                  variant="outline"
                                  className="px-2.5 py-1 text-xs font-semibold"
                                >
                                  +{project.technologies.length - 3}
                                </Badge>
                              )}
                            </div>
                          </CardContent>
                          <CardFooter className="pt-0 pb-4">
                            <div className="text-muted-foreground group-hover:text-primary flex items-center gap-1 text-xs transition-colors">
                              <span>Tap for details</span>
                              <ChevronRight className="h-3 w-3" />
                            </div>
                          </CardFooter>
                        </Card>
                      </DialogTrigger>
                      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle className="flex items-center gap-2">
                            {project.title}
                            <div
                              className={`h-2 w-2 rounded-full ${
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
                              <h4 className="mb-2 font-semibold">
                                Project Details
                              </h4>
                              <ul className="text-muted-foreground list-inside list-disc space-y-1 text-sm">
                                {project.longDescription.map((point, idx) => (
                                  <li key={idx}>{point}</li>
                                ))}
                              </ul>
                            </div>
                          )}

                          <div>
                            <h4 className="mb-2 font-semibold">Technologies</h4>
                            <div className="flex flex-wrap gap-2">
                              {project.role && (
                                <Badge
                                  variant="outline"
                                  className="px-2.5 py-1 text-xs font-semibold"
                                >
                                  {project.role}
                                </Badge>
                              )}
                              {project.technologies.map((tech, idx) => (
                                <Badge
                                  key={idx}
                                  variant="secondary"
                                  className="px-2.5 py-1 text-xs font-semibold"
                                >
                                  {tech}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div className="text-muted-foreground flex items-center gap-1 text-xs">
                            <Calendar className="h-3 w-3" />
                            Created: {formatDate(project.createdAt)}
                          </div>

                          <div className="flex flex-wrap gap-2">
                            {project.githubUrl && (
                              <Button variant="outline" size="sm" asChild>
                                <Link
                                  href={project.githubUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <FontAwesomeIcon
                                    icon={GitHub}
                                    className="mr-2 h-4 w-4"
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
                                  <ExternalLink className="mr-2 h-4 w-4" />
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
                                  <DevpostIcon className="mr-2 h-4 w-4" />
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
                      ? 'bg-primary w-8'
                      : 'bg-muted-foreground/30 w-2'
                  }`}
                  onClick={() => otherApi?.scrollTo(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Desktop: Masonry Grid */}
          <div className="hidden md:block">
            <div className="columns-1 gap-4 space-y-4 md:columns-2 lg:columns-3">
              {otherProjects.map((project, index) => (
                <Dialog key={index}>
                  <DialogTrigger asChild>
                    <Card className="hover:border-primary/50 group flex cursor-pointer break-inside-avoid flex-col transition-all hover:shadow-lg">
                      <CardHeader className="flex-grow pb-3">
                        <div className="flex items-start justify-between">
                          <CardTitle className="flex items-center gap-2 text-lg">
                            {project.title}
                            <div
                              className={`h-2 w-2 rounded-full ${
                                statusColors[project.status]
                              }`}
                            />
                          </CardTitle>
                          <div className="text-muted-foreground flex items-center gap-1 text-xs">
                            <Calendar className="h-3 w-3" />
                            {formatYear(project.createdAt)}
                          </div>
                        </div>
                        <CardDescription className="text-sm">
                          {project.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="mt-auto space-y-3">
                        <div className="flex flex-wrap gap-2">
                          {project.role && (
                            <Badge
                              variant="outline"
                              className="shrink-0 px-2.5 py-1 text-xs font-semibold"
                            >
                              {project.role}
                            </Badge>
                          )}
                          {project.technologies.slice(0, 3).map((tech, idx) => (
                            <Badge
                              key={idx}
                              variant="secondary"
                              className="px-2.5 py-1 text-xs font-semibold"
                            >
                              {tech}
                            </Badge>
                          ))}
                          {project.technologies.length > 3 && (
                            <Badge
                              variant="outline"
                              className="px-2.5 py-1 text-xs font-semibold"
                            >
                              +{project.technologies.length - 3}
                            </Badge>
                          )}
                        </div>
                      </CardContent>
                      <CardFooter className="pt-0 pb-4">
                        <div className="text-muted-foreground group-hover:text-primary flex items-center gap-1 text-xs transition-colors">
                          <span>Click for details</span>
                          <ChevronRight className="h-3 w-3" />
                        </div>
                      </CardFooter>
                    </Card>
                  </DialogTrigger>
                  <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-2">
                        {project.title}
                        <div
                          className={`h-2 w-2 rounded-full ${
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
                          <h4 className="mb-2 font-semibold">
                            Project Details
                          </h4>
                          <ul className="text-muted-foreground list-inside list-disc space-y-1 text-sm">
                            {project.longDescription.map((point, idx) => (
                              <li key={idx}>{point}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <div>
                        <h4 className="mb-2 font-semibold">Technologies</h4>
                        <div className="flex flex-wrap gap-2">
                          {project.role && (
                            <Badge
                              variant="outline"
                              className="px-2.5 py-1 text-xs font-semibold"
                            >
                              {project.role}
                            </Badge>
                          )}
                          {project.technologies.map((tech, idx) => (
                            <Badge
                              key={idx}
                              variant="secondary"
                              className="px-2.5 py-1 text-xs font-semibold"
                            >
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="text-muted-foreground flex items-center gap-1 text-xs">
                        <Calendar className="h-3 w-3" />
                        Created: {formatDate(project.createdAt)}
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {project.githubUrl && (
                          <Button variant="outline" size="sm" asChild>
                            <Link
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <FontAwesomeIcon
                                icon={GitHub}
                                className="mr-2 h-4 w-4"
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
                              <ExternalLink className="mr-2 h-4 w-4" />
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
                              <DevpostIcon className="mr-2 h-4 w-4" />
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
  )
}
