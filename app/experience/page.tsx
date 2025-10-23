'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { CalendarDays, MapPin, ExternalLink, ChevronDown } from 'lucide-react'
import Link from 'next/link'
import { experiences } from './experiences'
import { useState } from 'react'

export default function ExperiencePage() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  // Parse date string in format 'YYYY-MM' safely to avoid timezone issues
  const parseDate = (dateString: string) => {
    const [year, month] = dateString.split('-').map(Number)
    // Create date at noon on the 15th to avoid timezone edge cases
    return new Date(year, month - 1, 15)
  }

  const formatDateRange = (startDate: string, endDate?: string) => {
    const start = parseDate(startDate).toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric',
    })
    const end = endDate
      ? parseDate(endDate).toLocaleDateString('en-US', {
          month: 'short',
          year: 'numeric',
        })
      : 'Present'
    return `${start} - ${end}`
  }

  const getDuration = (startDate: string, endDate?: string) => {
    const start = parseDate(startDate)
    const end = endDate ? parseDate(endDate) : new Date()
    const months =
      (end.getFullYear() - start.getFullYear()) * 12 +
      (end.getMonth() - start.getMonth()) +
      1 // +1 to include both start and end months
    const years = Math.floor(months / 12)
    const remainingMonths = months % 12

    if (years > 0 && remainingMonths > 0) {
      return `${years}y ${remainingMonths}m`
    } else if (years > 0) {
      return `${years}y`
    } else {
      return `${remainingMonths}m`
    }
  }

  return (
    <div className="mx-auto max-w-6xl space-y-4">
      {/* Desktop: Two-column layout, Mobile: Single column */}
      <div className="lg:grid lg:grid-cols-2 lg:gap-8">
        {/* Left Column: Timeline (all roles) */}
        <div className="relative">
          {/* Timeline line - vertical connecting all dots */}
          <div className="bg-border absolute top-0 left-8 h-full w-0.5 lg:left-8" />

          {/* Timeline items */}
          <div className="relative space-y-6">
            {experiences.map((experience, index) => {
              const isSelected = selectedIndex === index
              const experienceYear = parseDate(
                experience.startDate,
              ).getFullYear()
              const showYearMarker =
                index === 0 ||
                parseDate(experiences[index - 1].startDate).getFullYear() !==
                  experienceYear

              return (
                <div key={index} className="relative">
                  {/* Year marker above experience when year changes */}
                  {showYearMarker && (
                    <div className="text-primary mb-2 text-sm font-bold">
                      {experienceYear}
                    </div>
                  )}

                  {/* Timeline dot */}
                  <div
                    className={`border-background absolute left-8 z-10 h-6 w-6 -translate-x-1/2 cursor-pointer rounded-full border-4 transition-all hover:scale-125 ${
                      isSelected
                        ? 'bg-primary scale-125'
                        : 'bg-muted hover:bg-primary/50'
                    } top-6`}
                    onClick={() => setSelectedIndex(isSelected ? null : index)}
                  />

                  {/* Compact role card */}
                  <div className="ml-20">
                    <Card
                      className={`cursor-pointer transition-all hover:shadow-lg ${
                        isSelected ? 'ring-primary shadow-lg ring-2' : ''
                      }`}
                      onClick={() =>
                        setSelectedIndex(isSelected ? null : index)
                      }
                    >
                      <CardHeader className="space-y-2 pb-3">
                        <CardTitle className="text-lg leading-tight">
                          {experience.title}
                        </CardTitle>
                        <CardDescription className="space-y-1">
                          <div className="text-primary flex items-center gap-2 font-medium">
                            {experience.company}
                            {experience.website && (
                              <Link
                                href={experience.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="hover:text-primary/80 inline-block"
                              >
                                <ExternalLink className="h-3 w-3" />
                              </Link>
                            )}
                          </div>
                          <div className="flex flex-col gap-1 text-xs">
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {experience.location}
                            </span>
                            <span className="flex items-center gap-1">
                              <CalendarDays className="h-3 w-3" />
                              {formatDateRange(
                                experience.startDate,
                                experience.endDate,
                              )}{' '}
                              •{' '}
                              {getDuration(
                                experience.startDate,
                                experience.endDate,
                              )}
                            </span>
                          </div>
                        </CardDescription>
                      </CardHeader>

                      {/* Mobile: Expanded content inline */}
                      {isSelected && (
                        <CardContent className="animate-in fade-in slide-in-from-top-2 space-y-4 lg:hidden">
                          <p className="text-muted-foreground text-sm">
                            {experience.description}
                          </p>

                          {experience.achievements.length > 0 && (
                            <>
                              <Separator />
                              <div className="space-y-2">
                                <h4 className="text-sm font-semibold">
                                  Key Achievements:
                                </h4>
                                <ul className="text-muted-foreground list-inside list-disc space-y-1 text-sm">
                                  {experience.achievements.map(
                                    (achievement, idx) => (
                                      <li key={idx} className="leading-relaxed">
                                        {achievement}
                                      </li>
                                    ),
                                  )}
                                </ul>
                              </div>
                            </>
                          )}

                          <Separator />

                          <div className="space-y-2">
                            <h4 className="text-sm font-semibold">
                              Technologies:
                            </h4>
                            <div className="flex flex-wrap gap-1.5">
                              {experience.technologies.map((tech, idx) => (
                                <Badge
                                  key={idx}
                                  variant="secondary"
                                  className="font-mono text-xs"
                                >
                                  {tech}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </CardContent>
                      )}
                    </Card>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Right Column: Details panel (desktop only) */}
        <div className="hidden lg:block">
          <div className="sticky top-8">
            {selectedIndex !== null ? (
              <Card className="animate-in fade-in slide-in-from-right-4 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl">
                    {experiences[selectedIndex].title}
                  </CardTitle>
                  <CardDescription className="space-y-2">
                    <div className="text-primary flex items-center gap-2 text-base font-medium">
                      {experiences[selectedIndex].company}
                      {experiences[selectedIndex].website && (
                        <Link
                          href={experiences[selectedIndex].website!}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-primary/80 inline-block"
                        >
                          <ExternalLink className="h-3 w-3" />
                        </Link>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {experiences[selectedIndex].location}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <CalendarDays className="h-3 w-3" />
                        {formatDateRange(
                          experiences[selectedIndex].startDate,
                          experiences[selectedIndex].endDate,
                        )}
                      </span>
                      <span>•</span>
                      <span>
                        {getDuration(
                          experiences[selectedIndex].startDate,
                          experiences[selectedIndex].endDate,
                        )}
                      </span>
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    {experiences[selectedIndex].description}
                  </p>

                  {experiences[selectedIndex].achievements.length > 0 && (
                    <>
                      <Separator />
                      <div className="space-y-2">
                        <h4 className="font-semibold">Key Achievements:</h4>
                        <ul className="text-muted-foreground list-inside list-disc space-y-2 text-sm">
                          {experiences[selectedIndex].achievements.map(
                            (achievement, idx) => (
                              <li key={idx} className="leading-relaxed">
                                {achievement}
                              </li>
                            ),
                          )}
                        </ul>
                      </div>
                    </>
                  )}

                  <Separator />

                  <div className="space-y-2">
                    <h4 className="font-semibold">Technologies:</h4>
                    <div className="flex flex-wrap gap-2">
                      {experiences[selectedIndex].technologies.map(
                        (tech, idx) => (
                          <Badge
                            key={idx}
                            variant="secondary"
                            className="font-mono text-xs"
                          >
                            {tech}
                          </Badge>
                        ),
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="border-dashed shadow-lg">
                <CardContent className="flex h-64 items-center justify-center p-6 text-center">
                  <div className="space-y-2">
                    <p className="text-muted-foreground">
                      Click on any experience to view details
                    </p>
                    <ChevronDown className="text-muted-foreground mx-auto h-8 w-8 animate-bounce" />
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
