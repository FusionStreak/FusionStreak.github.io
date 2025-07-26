import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Mail } from "lucide-react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faSquareLinkedin as LinkedIn, faGithubSquare as GitHub} from '@fortawesome/free-brands-svg-icons';

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
            </Link>
          </Button>
          <Button variant="secondary" asChild>
            <Link href="/blog">Read My Blog</Link>
          </Button>
        </div>

        {/* Social Links */}
        <div className="flex justify-center space-x-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="https://github.com/FusionStreak" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={GitHub} className="h-7 w-7" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link href="https://linkedin.com/in/sayfullah-eid" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={LinkedIn} className="h-7 w-7" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link href="mailto:mail@sayfullaheid.me" rel="noopener noreferrer">
              <Mail className="h-7 w-7" />
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
                <Badge className="font-mono">React</Badge>
                <Badge className="font-mono">Next.js</Badge>
                <Badge className="font-mono">TypeScript</Badge>
                <Badge className="font-mono">Tailwind CSS</Badge>
              </div>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold">Backend</h4>
              <div className="flex flex-wrap gap-2">
                <Badge className="font-mono">Node.js</Badge>
                <Badge className="font-mono">Axum</Badge>
                <Badge className="font-mono">Tokio</Badge>
                <Badge className="font-mono">Rust</Badge>
                <Badge className="font-mono">PostgreSQL</Badge>
              </div>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold">Tools & DevOps</h4>
              <div className="flex flex-wrap gap-2">
                <Badge className="font-mono">Git</Badge>
                <Badge className="font-mono">Docker</Badge>
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
