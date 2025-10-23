'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import SplitText from '@/components/SplitText'
import { skillCategories } from '@/app/skills/skills'

export default function HomePage() {
  return (
    <div className="flex flex-col items-center space-y-12">
      {/* Hero Section */}
      <div className="max-w-4xl space-y-6 text-center">
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

      {/* Skills Section - More Prominent */}
      <div className="w-full max-w-5xl">
        <Card className="from-background via-primary/5 to-primary/10 border-primary/20 bg-gradient-to-br">
          <CardHeader className="pb-8 text-center">
            <CardTitle className="text-3xl font-bold md:text-4xl">
              Technical Expertise
            </CardTitle>
            <CardDescription className="text-base md:text-lg">
              Technologies and tools I use to build modern applications
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {skillCategories.map((category) => {
                const IconComponent = category.icon
                return (
                  <Card
                    key={category.title}
                    className="bg-background/50 border-border/50 backdrop-blur"
                  >
                    <CardHeader>
                      <div className="flex items-center gap-2">
                        <div className="bg-primary/10 rounded-lg p-2">
                          <IconComponent className="text-primary h-5 w-5" />
                        </div>
                        <CardTitle className="text-xl">
                          {category.title}
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {category.skills.map((skill) => (
                          <Badge
                            key={skill}
                            className="bg-complementary/20 text-foreground border-primary/30 font-mono"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
