import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CalendarDays, MapPin, ExternalLink } from "lucide-react";
import Link from "next/link";

interface Experience {
    id: string;
    title: string;
    company: string;
    location: string;
    startDate: string;
    endDate?: string;
    description: string;
    achievements: string[];
    technologies: string[];
    website?: string;
}

// You can easily extend this array to add more experiences
const experiences: Experience[] = [
    {
        id: "1",
        title: "Senior Full Stack Developer",
        company: "Tech Solutions Inc.",
        location: "San Francisco, CA",
        startDate: "2022-01",
        endDate: undefined, // Current position
        description: "Leading development of scalable web applications and mentoring junior developers.",
        achievements: [
            "Architected and implemented a microservices-based platform serving 1M+ users",
            "Reduced application load time by 40% through optimization and caching strategies",
            "Led a team of 5 developers and established code review processes",
            "Implemented CI/CD pipelines reducing deployment time by 60%"
        ],
        technologies: ["React", "Node.js", "TypeScript", "PostgreSQL", "AWS", "Docker"],
        website: "https://techsolutions.com"
    },
    {
        id: "2",
        title: "Full Stack Developer",
        company: "Digital Innovations",
        location: "New York, NY",
        startDate: "2020-06",
        endDate: "2021-12",
        description: "Developed and maintained multiple client projects using modern web technologies.",
        achievements: [
            "Built 10+ responsive web applications for various clients",
            "Collaborated with design team to implement pixel-perfect UIs",
            "Integrated third-party APIs and payment gateways",
            "Maintained 99% uptime for production applications"
        ],
        technologies: ["React", "Next.js", "Python", "Django", "MySQL", "Heroku"],
        website: "https://digitalinnovations.com"
    },
    {
        id: "3",
        title: "Frontend Developer",
        company: "StartupXYZ",
        location: "Austin, TX",
        startDate: "2019-01",
        endDate: "2020-05",
        description: "Focused on creating intuitive user interfaces and improving user experience.",
        achievements: [
            "Developed responsive web applications using React and Vue.js",
            "Improved website performance resulting in 25% increase in user engagement",
            "Collaborated with UX designers to implement accessibility features",
            "Created reusable component library adopted across multiple projects"
        ],
        technologies: ["React", "Vue.js", "JavaScript", "SASS", "Webpack", "Jest"],
        website: "https://startupxyz.com"
    }
];

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
                    <Card key={experience.id} className="w-full">
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

                            <div className="space-y-3">
                                <h4 className="font-semibold">Key Achievements:</h4>
                                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                                    {experience.achievements.map((achievement, idx) => (
                                        <li key={idx}>{achievement}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className="space-y-3">
                                <h4 className="font-semibold">Technologies Used:</h4>
                                <div className="flex flex-wrap gap-2">
                                    {experience.technologies.map((tech, idx) => (
                                        <Badge key={idx} variant="secondary">
                                            {tech}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                        {index < experiences.length - 1 && (
                            <div className="px-6 pb-6">
                                <Separator />
                            </div>
                        )}
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
                        You can find my contact information in the footer or reach out through my social media profiles.
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
