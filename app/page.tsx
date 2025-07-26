import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Github, Linkedin, Mail, ExternalLink } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center space-y-12">
      {/* Hero Section */}
      <div className="text-center space-y-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
            Hello, I&apos;m{" "}
            <span className="text-primary">Sayfullah Eid</span>
          </h1>
          <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
            A passionate full-stack developer who loves building innovative solutions and sharing knowledge through code.
          </p>
        </div>

        <div className="flex justify-center space-x-4">
          <Button asChild>
            <Link href="/projects">
              View My Work
              <ExternalLink className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/blog">Read My Blog</Link>
          </Button>
        </div>

        {/* Social Links */}
        <div className="flex justify-center space-x-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="https://github.com/FusionStreak" target="_blank" rel="noopener noreferrer">
              <Github className="h-5 w-5" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link href="https://linkedin.com/in/sayfullah-eid" target="_blank" rel="noopener noreferrer">
              <Linkedin className="h-5 w-5" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link href="mailto:contact@example.com">
              <Mail className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>

      {/* Skills Section */}
      <Card className="w-full max-w-4xl">
        <CardHeader className="text-center">
          <CardTitle>Technical Skills</CardTitle>
          <CardDescription>
            Technologies and tools I work with
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <h4 className="font-semibold">Frontend</h4>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">React</Badge>
                <Badge variant="secondary">Next.js</Badge>
                <Badge variant="secondary">TypeScript</Badge>
                <Badge variant="secondary">Tailwind CSS</Badge>
              </div>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold">Backend</h4>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">Node.js</Badge>
                <Badge variant="secondary">Python</Badge>
                <Badge variant="secondary">PostgreSQL</Badge>
                <Badge variant="secondary">MongoDB</Badge>
              </div>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold">Tools & DevOps</h4>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">Git</Badge>
                <Badge variant="secondary">Docker</Badge>
                <Badge variant="secondary">AWS</Badge>
                <Badge variant="secondary">Vercel</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle>Latest Projects</CardTitle>
            <CardDescription>
              Check out my recent work and side projects
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link href="/projects">View Projects</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle>Professional Experience</CardTitle>
            <CardDescription>
              Learn about my professional journey and roles
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link href="/experience">View Experience</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
