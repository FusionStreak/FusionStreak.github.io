import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CalendarDays, MapPin, ExternalLink } from "lucide-react";
import Link from "next/link";
import { experiences } from "./experiences";

export default function ExperiencePage() {
    return (
        <div className="space-y-8">
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
                    Professional Experience
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                    My journey through various roles and companies, building innovative solutions and growing as a developer.
                </p>
            </div>

            <div className="space-y-6">
                {experiences.map((experience, index) => (
                    <Card key={index} className="w-full">
                        <CardHeader>
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                <div className="space-y-1">
                                    <CardTitle className="text-xl">{experience.title}</CardTitle>
                                    <CardDescription className="flex items-center gap-4 text-base">
                                        <span className="font-medium text-primary">
                                            {experience.company}
                                            {experience.website && (
                                                <Link
                                                    href={experience.website}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="ml-1 inline-block"
                                                >
                                                    <ExternalLink className="h-3 w-3" />
                                                </Link>
                                            )}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <MapPin className="h-3 w-3" />
                                            {experience.location}
                                        </span>
                                    </CardDescription>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <CalendarDays className="h-4 w-4" />
                                    <span>
                                        {new Date(experience.startDate).toLocaleDateString('en-US', {
                                            month: 'short',
                                            year: 'numeric'
                                        })} - {
                                            experience.endDate
                                                ? new Date(experience.endDate).toLocaleDateString('en-US', {
                                                    month: 'short',
                                                    year: 'numeric'
                                                })
                                                : 'Present'
                                        }
                                    </span>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-muted-foreground">{experience.description}</p>

                            {   experience.achievements.length > 0 &&
                                <div className="space-y-3">
                                    <Separator className="my-4" />
                                    <h4 className="font-semibold">Key Achievements:</h4>
                                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                                        {experience.achievements.map((achievement, idx) => (
                                            <li key={idx}>{achievement}</li>
                                        ))}
                                    </ul>
                                </div>
                            }
                            <Separator className="my-4" />

                            <div className="space-y-3">
                                <h4 className="font-semibold">Technologies Used:</h4>
                                <div className="flex flex-wrap gap-2">
                                    {experience.technologies.map((tech, idx) => (
                                        <Badge key={idx} variant="default" className="font-mono">
                                            {tech}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Card className="bg-muted/50">
                <CardHeader>
                    <CardTitle>Want to work together?</CardTitle>
                    <CardDescription>
                        I&apos;m always interested in new opportunities and collaborations.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">
                        Feel free to reach out if you&apos;d like to discuss potential opportunities or just want to connect.
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
