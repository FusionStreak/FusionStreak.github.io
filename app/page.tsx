"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import SplitText from "@/components/SplitText";
import { BattlesnakeStats } from "@/components/battlesnake-stats";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <div className="space-y-2">
          <SplitText
            text="Hello, I'm <primary>Sayfullah Eid</primary>"
            tag="h1"
            className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl"
            splitType="chars"
            delay={50}
            duration={0.8}
            from={{ opacity: 0, y: 50 }}
            to={{ opacity: 1, y: 0 }}
          />
          <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
            A passionate full-stack developer who loves building innovative
            solutions and sharing knowledge through code.
          </p>
        </div>
      </div>

      {/* Battlesnake Stats Widget */}
      <div className="w-full max-w-4xl">
        <BattlesnakeStats />
      </div>

      {/* Skills Section */}
      <Card className="w-full max-w-4xl">
        <CardHeader className="text-center">
          <CardTitle>Technical Skills</CardTitle>
          <CardDescription>Technologies and tools I work with</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <h4 className="font-semibold">Frontend</h4>
              <div className="flex flex-wrap gap-2">
                <Badge className="font-mono bg-secondary text-secondary-foreground hover:bg-secondary/80">
                  React
                </Badge>
                <Badge className="font-mono bg-secondary text-secondary-foreground hover:bg-secondary/80">
                  Next.js
                </Badge>
                <Badge className="font-mono bg-secondary text-secondary-foreground hover:bg-secondary/80">
                  TypeScript
                </Badge>
                <Badge className="font-mono bg-secondary text-secondary-foreground hover:bg-secondary/80">
                  Tailwind CSS
                </Badge>
              </div>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold">Backend</h4>
              <div className="flex flex-wrap gap-2">
                <Badge className="font-mono bg-secondary text-secondary-foreground hover:bg-secondary/80">
                  Node.js
                </Badge>
                <Badge className="font-mono bg-secondary text-secondary-foreground hover:bg-secondary/80">
                  Axum
                </Badge>
                <Badge className="font-mono bg-secondary text-secondary-foreground hover:bg-secondary/80">
                  Tokio
                </Badge>
                <Badge className="font-mono bg-secondary text-secondary-foreground hover:bg-secondary/80">
                  Rust
                </Badge>
                <Badge className="font-mono bg-secondary text-secondary-foreground hover:bg-secondary/80">
                  PostgreSQL
                </Badge>
              </div>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold">Tools & DevOps</h4>
              <div className="flex flex-wrap gap-2">
                <Badge className="font-mono bg-secondary text-secondary-foreground hover:bg-secondary/80">
                  Git
                </Badge>
                <Badge className="font-mono bg-secondary text-secondary-foreground hover:bg-secondary/80">
                  Docker
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
