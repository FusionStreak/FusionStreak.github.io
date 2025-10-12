"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CalendarDays, MapPin, ExternalLink, ChevronDown } from "lucide-react";
import Link from "next/link";
import { experiences } from "./experiences";
import { useState } from "react";

export default function ExperiencePage() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // Parse date string in format 'YYYY-MM' safely to avoid timezone issues
  const parseDate = (dateString: string) => {
    const [year, month] = dateString.split("-").map(Number);
    // Create date at noon on the 15th to avoid timezone edge cases
    return new Date(year, month - 1, 15);
  };

  const formatDateRange = (startDate: string, endDate?: string) => {
    const start = parseDate(startDate).toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
    const end = endDate
      ? parseDate(endDate).toLocaleDateString("en-US", {
          month: "short",
          year: "numeric",
        })
      : "Present";
    return `${start} - ${end}`;
  };

  const getDuration = (startDate: string, endDate?: string) => {
    const start = parseDate(startDate);
    const end = endDate ? parseDate(endDate) : new Date();
    const months =
      (end.getFullYear() - start.getFullYear()) * 12 +
      (end.getMonth() - start.getMonth()) +
      1; // +1 to include both start and end months
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;

    if (years > 0 && remainingMonths > 0) {
      return `${years}y ${remainingMonths}m`;
    } else if (years > 0) {
      return `${years}y`;
    } else {
      return `${remainingMonths}m`;
    }
  };

  return (
    <div className="space-y-4 max-w-6xl mx-auto">
      {/* Desktop: Two-column layout, Mobile: Single column */}
      <div className="lg:grid lg:grid-cols-2 lg:gap-8">
        {/* Left Column: Timeline (all roles) */}
        <div className="relative">
          {/* Timeline line - vertical connecting all dots */}
          <div className="absolute top-0 left-8 lg:left-8 w-0.5 h-full bg-border" />

          {/* Timeline items */}
          <div className="space-y-6 relative">
            {experiences.map((experience, index) => {
              const isSelected = selectedIndex === index;
              const experienceYear = parseDate(
                experience.startDate
              ).getFullYear();
              const showYearMarker =
                index === 0 ||
                parseDate(experiences[index - 1].startDate).getFullYear() !==
                  experienceYear;

              return (
                <div key={index} className="relative">
                  {/* Year marker above experience when year changes */}
                  {showYearMarker && (
                    <div className="mb-2 text-sm font-bold text-primary">
                      {experienceYear}
                    </div>
                  )}

                  {/* Timeline dot */}
                  <div
                    className={`absolute left-8 -translate-x-1/2 w-6 h-6 rounded-full border-4 border-background z-10 transition-all cursor-pointer hover:scale-125 ${
                      isSelected
                        ? "bg-primary scale-125"
                        : "bg-muted hover:bg-primary/50"
                    } top-6`}
                    onClick={() => setSelectedIndex(isSelected ? null : index)}
                  />

                  {/* Compact role card */}
                  <div className="ml-20">
                    <Card
                      className={`transition-all cursor-pointer hover:shadow-lg ${
                        isSelected ? "ring-2 ring-primary shadow-lg" : ""
                      }`}
                      onClick={() =>
                        setSelectedIndex(isSelected ? null : index)
                      }
                    >
                      <CardHeader className="pb-3 space-y-2">
                        <CardTitle className="text-lg leading-tight">
                          {experience.title}
                        </CardTitle>
                        <CardDescription className="space-y-1">
                          <div className="flex items-center gap-2 font-medium text-primary">
                            {experience.company}
                            {experience.website && (
                              <Link
                                href={experience.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="inline-block hover:text-primary/80"
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
                                experience.endDate
                              )}{" "}
                              •{" "}
                              {getDuration(
                                experience.startDate,
                                experience.endDate
                              )}
                            </span>
                          </div>
                        </CardDescription>
                      </CardHeader>

                      {/* Mobile: Expanded content inline */}
                      {isSelected && (
                        <CardContent className="space-y-4 lg:hidden animate-in fade-in slide-in-from-top-2">
                          <p className="text-sm text-muted-foreground">
                            {experience.description}
                          </p>

                          {experience.achievements.length > 0 && (
                            <>
                              <Separator />
                              <div className="space-y-2">
                                <h4 className="text-sm font-semibold">
                                  Key Achievements:
                                </h4>
                                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                                  {experience.achievements.map(
                                    (achievement, idx) => (
                                      <li key={idx} className="leading-relaxed">
                                        {achievement}
                                      </li>
                                    )
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
                                  className="text-xs font-mono"
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
              );
            })}
          </div>
        </div>

        {/* Right Column: Details panel (desktop only) */}
        <div className="hidden lg:block">
          <div className="sticky top-8">
            {selectedIndex !== null ? (
              <Card className="shadow-lg animate-in fade-in slide-in-from-right-4">
                <CardHeader>
                  <CardTitle className="text-xl">
                    {experiences[selectedIndex].title}
                  </CardTitle>
                  <CardDescription className="space-y-2">
                    <div className="flex items-center gap-2 font-medium text-primary text-base">
                      {experiences[selectedIndex].company}
                      {experiences[selectedIndex].website && (
                        <Link
                          href={experiences[selectedIndex].website!}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block hover:text-primary/80"
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
                          experiences[selectedIndex].endDate
                        )}
                      </span>
                      <span>•</span>
                      <span>
                        {getDuration(
                          experiences[selectedIndex].startDate,
                          experiences[selectedIndex].endDate
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
                        <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                          {experiences[selectedIndex].achievements.map(
                            (achievement, idx) => (
                              <li key={idx} className="leading-relaxed">
                                {achievement}
                              </li>
                            )
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
                            className="text-xs font-mono"
                          >
                            {tech}
                          </Badge>
                        )
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="shadow-lg border-dashed">
                <CardContent className="flex items-center justify-center h-64 text-center p-6">
                  <div className="space-y-2">
                    <p className="text-muted-foreground">
                      Click on any experience to view details
                    </p>
                    <ChevronDown className="h-8 w-8 mx-auto text-muted-foreground animate-bounce" />
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
