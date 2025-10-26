'use client'

import {
  Card,
  CardContent,
  CardDescription,
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
import { ExternalLink, Calendar } from 'lucide-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithubSquare as GitHub } from '@fortawesome/free-brands-svg-icons'
import { DevpostIcon } from '@/components/devpost-icon'
import Link from 'next/link'
import { projects } from './projects'
import Image from 'next/image'

const statusColors = {
  completed: 'bg-green-500',
  'in-progress': 'bg-yellow-500',
  planning: 'bg-blue-500',
}

// Client-safe date formatter to prevent hydration mismatch
function formatDate(dateString: string) {
  try {
    return new Date(dateString).toLocaleDateString()
  } catch {
    return dateString
  }
}

export default function ProjectsPage() {
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

      {/* Projects Collage Grid */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {projects.map((project, index) => (
          <Dialog key={index}>
            <DialogTrigger asChild>
              <Card className="hover:border-primary/50 group relative aspect-square cursor-pointer overflow-hidden transition-all hover:shadow-lg">
                <div className="absolute inset-0 flex items-center justify-center p-4">
                  {project.imageUrl ? (
                    <>
                      <Image
                        src={project.imageUrl}
                        alt={project.title}
                        fill
                        className="object-cover opacity-20 transition-opacity group-hover:opacity-30"
                      />
                      <div className="relative z-10 text-center">
                        <h3 className="text-sm font-bold sm:text-base md:text-lg">
                          {project.title}
                        </h3>
                        <div
                          className={`mx-auto mt-2 h-2 w-2 rounded-full ${
                            statusColors[project.status]
                          }`}
                        />
                      </div>
                    </>
                  ) : (
                    <div className="text-center">
                      <h3 className="text-sm font-bold sm:text-base md:text-lg">
                        {project.title}
                      </h3>
                      <div
                        className={`mx-auto mt-2 h-2 w-2 rounded-full ${
                          statusColors[project.status]
                        }`}
                      />
                    </div>
                  )}
                </div>
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
                    <h4 className="mb-2 font-semibold">Project Details</h4>
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
